automation/afr-checker.js

```javascript
/**
 * Richards Credit Authority - AFR (Applicable Federal Rate) Checker
 * Version: 1.0.0
 * Description: Validates loan rates against IRS Applicable Federal Rates
 * Author: RCA Engineering Team
 * Last Updated: 2026-01-15
 */

'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Load AFR rules from compliance configuration
const AFR_RULES_PATH = path.join(__dirname, '../compliance/afr-rules.yaml');
let afrRules;

try {
    const fileContents = fs.readFileSync(AFR_RULES_PATH, 'utf8');
    afrRules = yaml.load(fileContents);
} catch (e) {
    console.error('Error loading AFR rules:', e);
    // Fallback to default structure
    afrRules = {
        afr_structure: {
            short_term: { rates: [] },
            mid_term: { rates: [] },
            long_term: { rates: [] }
        }
    };
}

class AFRChecker {
    constructor(config = {}) {
        this.config = {
            imputedInterestThreshold: 10000, // $10,000 de minimis exception
            giftLoanException: 10000,
            compensationLoanException: 10000,
            corporationShareholderException: 10000,
            ...config
        };
        
        this.currentAFR = this._loadCurrentAFR();
    }

    /**
     * Main validation method
     * @param {Object} loanData - Loan information
     * @returns {Object} AFR compliance result
     */
    check(loanData) {
        const results = {
            compliant: true,
            warnings: [],
            errors: [],
            imputedInterest: 0,
            requiresReporting: false,
            applicableAFR: null,
            applicableRateType: null
        };

        try {
            // Step 1: Determine applicable AFR
            const afrInfo = this._getApplicableAFR(loanData.termMonths);
            results.applicableAFR = afrInfo.rate;
            results.applicableRateType = afrInfo.type;

            // Step 2: Check if loan is below market
            const isBelowMarket = loanData.interestRate < afrInfo.rate;
            
            if (!isBelowMarket) {
                results.notes = ['Loan rate meets or exceeds AFR'];
                return results;
            }

            // Step 3: Check for exceptions
            const exceptionCheck = this._checkExceptions(loanData);
            if (exceptionCheck.exempt) {
                results.exempt = true;
                results.exemptionReason = exceptionCheck.reason;
                return results;
            }

            // Step 4: Calculate imputed interest
            const imputedCalc = this._calculateImputedInterest(loanData, afrInfo.rate);
            results.imputedInterest = imputedCalc.annualImputedInterest;
            results.forgoneInterest = imputedCalc.forgoneInterest;

            // Step 5: Determine reporting requirements
            results.requiresReporting = results.imputedInterest > 0;
            
            // Step 6: Determine tax consequences
            results.taxConsequences = this._determineTaxConsequences(loanData);

            // Step 7: Compliance determination
            if (results.imputedInterest > 0) {
                results.compliant = false;
                results.errors.push({
                    code: 'BELOW_MARKET_LOAN',
                    message: `Loan rate ${(loanData.interestRate * 100).toFixed(3)}% is below AFR ${(afrInfo.rate * 100).toFixed(3)}%`,
                    severity: 'WARNING'
                });
            }

            return results;

        } catch (error) {
            console.error('AFR check error:', error);
            return {
                compliant: false,
                errors: [{
                    code: 'CHECK_ERROR',
                    message: error.message
                }]
            };
        }
    }

    /**
     * Determines applicable AFR based on loan term
     */
    _getApplicableAFR(termMonths) {
        const termYears = termMonths / 12;
        let rateType, rate;

        if (termYears <= 3) {
            rateType = 'short_term';
        } else if (termYears <= 9) {
            rateType = 'mid_term';
        } else {
            rateType = 'long_term';
        }

        // Get most recent rate
        const rates = afrRules.afr_structure[rateType]?.rates || [];
        const currentRate = rates[rates.length - 1];

        if (currentRate) {
            rate = currentRate.year;
        } else {
            // Fallback rates if YAML not loaded
            const fallbackRates = {
                short_term: 0.0482,
                mid_term: 0.0427,
                long_term: 0.0452
            };
            rate = fallbackRates[rateType];
        }

        return {
            type: rateType,
            term: `${termYears.toFixed(1)} years`,
            rate: rate,
            allRates: currentRate || {}
        };
    }

    /**
     * Checks for exceptions to imputed interest rules
     */
    _checkExceptions(loanData) {
        const exceptions = [];

        // $10,000 De minimis exception (IRC 7872(c)(2))
        if (loanData.loanAmount <= this.config.imputedInterestThreshold) {
            exceptions.push({
                type: 'DE_MINIMIS',
                code: 'IRC_7872_c_2',
                description: 'Aggregate loan amount $10,000 or less'
            });
        }

        // Gift loans exception
        if (loanData.loanType === 'gift_loan' && loanData.loanAmount <= this.config.giftLoanException) {
            if (!loanData.taxAvoidancePurpose) {
                exceptions.push({
                    type: 'GIFT_LOAN',
                    code: 'IRC_7872_c_2_B',
                    description: 'Gift loan not for tax avoidance'
                });
            }
        }

        // Compensation-related loans
        if (loanData.loanPurpose === 'compensation' && loanData.loanAmount <= this.config.compensationLoanException) {
            exceptions.push({
                type: 'COMPENSATION_LOAN',
                code: 'IRC_7872_c_3',
                description: 'Compensation-related loan, employee cannot obtain elsewhere'
            });
        }

        // Corporation-shareholder loans
        if (loanData.loanType === 'corporation_shareholder' && loanData.loanAmount <= this.config.corporationShareholderException) {
            exceptions.push({
                type: 'CORPORATION_SHAREHOLDER',
                code: 'IRC_7872_c_3_C',
                description: 'Corporation-shareholder loan below threshold'
            });
        }

        // Loans secured by residence (qualified residence interest)
        if (loanData.securedBy === 'qualified_residence') {
            exceptions.push({
                type: 'QUALIFIED_RESIDENCE',
                code: 'IRC_7872_h',
                description: 'Loan secured by qualified residence'
            });
        }

        // Loans where interest would be deductible
        if (loanData.deductibleInterest) {
            exceptions.push({
                type: 'DEDUCTIBLE_INTEREST',
                code: 'IRC_7872_c_2_B_ii',
                description: 'Interest would be deductible if charged'
            });
        }

        // Check if any exception fully exempts the loan
        const fullExemptions = ['DE_MINIMIS', 'QUALIFIED_RESIDENCE', 'DEDUCTIBLE_INTEREST'];
        const applicableExemption = exceptions.find(e => fullExemptions.includes(e.type));

        return {
            exempt: !!applicableExemption,
            reason: applicableExemption?.description,
            allExceptions: exceptions
        };
    }

    /**
     * Calculates imputed interest
     */
    _calculateImputedInterest(loanData, afrRate) {
        const statedRate = loanData.interestRate;
        const loanAmount = loanData.loanAmount;
        
        // Calculate forgone interest
        const forgoneInterest = (afrRate - statedRate) * loanAmount;
        
        // Annual imputed interest
        const annualImputedInterest = Math.max(0, forgoneInterest);
        
        // Present value calculation for term loans
        let presentValue = loanAmount;
        if (loanData.termMonths > 12) {
            const monthlyRate = afrRate / 12;
            const numPayments = loanData.termMonths;
            presentValue = this._calculatePresentValue(
                this._calculatePayment(loanAmount, statedRate, numPayments),
                monthlyRate,
                numPayments
            );
        }

        return {
            statedInterest: statedRate * loanAmount,
            afrInterest: afrRate * loanAmount,
            forgoneInterest: forgoneInterest,
            annualImputedInterest: annualImputedInterest,
            presentValue: presentValue,
            deemedTransfer: loanAmount - presentValue
        };
    }

    /**
     * Determines tax consequences for different loan types
     */
    _determineTaxConsequences(loanData) {
        const consequences = {
            lender: [],
            borrower: []
        };

        switch (loanData.loanType) {
            case 'gift_loan':
                consequences.lender.push({
                    type: 'INTEREST_INCOME',
                    amount: 'imputed_interest',
                    form: '1040 Schedule B'
                });
                consequences.borrower.push({
                    type: 'GIFT',
                    amount: 'imputed_interest',
                    form: '709 Gift Tax Return if over annual exclusion'
                });
                break;

            case 'compensation':
                consequences.lender.push({
                    type: 'INTEREST_INCOME',
                    amount: 'imputed_interest',
                    form: '1040 Schedule B'
                });
                consequences.borrower.push({
                    type: 'COMPENSATION_INCOME',
                    amount: 'imputed_interest',
                    form: 'W-2 or 1099-MISC'
                });
                break;

            case 'corporation_shareholder':
                consequences.lender.push({
                    type: 'INTEREST_INCOME',
                    amount: 'imputed_interest',
                    form: '1120 Corporate Return'
                });
                consequences.borrower.push({
                    type: 'DIVIDEND_INCOME',
                    amount: 'imputed_interest',
                    form: '1040 Schedule B'
                });
                break;

            case 'partnership':
                consequences.lender.push({
                    type: 'INTEREST_INCOME',
                    amount: 'imputed_interest',
                    form: '1065 Partnership Return'
                });
                consequences.borrower.push({
                    type: 'GUARANTEED_PAYMENT_OR_DISTRIBUTIVE_SHARE',
                    amount: 'imputed_interest',
                    form: '1065 K-1'
                });
                break;

            default:
                consequences.lender.push({
                    type: 'INTEREST_INCOME',
                    amount: 'imputed_interest',
                    form: '1040 Schedule B'
                });
                consequences.borrower.push({
                    type: 'INTEREST_EXPENSE_OR_OTHER',
                    amount: 'imputed_interest',
                    form: 'Dependent on use of funds'
                });
        }

        return consequences;
    }

    /**
     * Calculates monthly payment
     */
    _calculatePayment(principal, annualRate, months) {
        const monthlyRate = annualRate / 12;
        if (monthlyRate === 0) return principal / months;
        
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
               (Math.pow(1 + monthlyRate, months) - 1);
    }

    /**
     * Calculates present value of payment stream
     */
    _calculatePresentValue(payment, monthlyRate, months) {
        if (monthlyRate === 0) return payment * months;
        
        return payment * (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate;
    }

    /**
     * Generates AFR comparison report
     */
    generateReport(loans) {
        const report = {
            generatedAt: new Date().toISOString(),
            reportPeriod: {
                start: loans[0]?.originationDate,
                end: loans[loans.length - 1]?.originationDate
            },
            summary: {
                totalLoans: loans.length,
                belowMarketLoans: 0,
                totalImputedInterest: 0,
                exemptLoans: 0
            },
            details: []
        };

        for (const loan of loans) {
            const checkResult = this.check(loan);
            
            if (!checkResult.compliant) report.summary.belowMarketLoans++;
            if (checkResult.exempt) report.summary.exemptLoans++;
            report.summary.totalImputedInterest += checkResult.imputedInterest;

            report.details.push({
                loanId: loan.loanId,
                borrower: loan.borrowerName,
                loanAmount: loan.loanAmount,
                statedRate: loan.interestRate,
                afrRate: checkResult.applicableAFR,
                compliant: checkResult.compliant,
                exempt: checkResult.exempt,
                imputedInterest: checkResult.imputedInterest,
                requiresReporting: checkResult.requiresReporting
            });
        }

        return report;
    }

    /**
     * Updates AFR rates from IRS source
     */
    async updateAFRFromIRS() {
        try {
            // In production, scrape or API call to IRS
            // IRS publishes monthly in Revenue Rulings
            const irsData = await this._fetchIRSData();
            
            // Update YAML file
            this._updateAFRFile(irsData);
            
            // Reload current AFR
            this.currentAFR = this._loadCurrentAFR();
            
            return {
                success: true,
                updatedRates: irsData
            };
        } catch (error) {
            console.error('Failed to update AFR from IRS:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Fetches current AFR from IRS (mock)
     */
    async _fetchIRSData() {
        // Mock implementation - in production, parse IRS Revenue Ruling
        return {
            month: '2026-02',
            short_term: 0.0495,
            mid_term: 0.0438,
            long_term: 0.0463
        };
    }

    /**
     * Updates AFR YAML file
     */
    _updateAFRFile(irsData) {
        // Implementation to update afr-rules.yaml
        // This would append new rates to the rates array for each term
    }

    /**
     * Loads current AFR from rules file
     */
    _loadCurrentAFR() {
        const result = {};
        
        for (const [termType, config] of Object.entries(afrRules.afr_structure || {})) {
            const rates = config.rates || [];
            if (rates.length > 0) {
                result[termType] = rates[rates.length - 1];
            }
        }
        
        return result;
    }
}

// Export module
module.exports = AFRChecker;

// CLI interface
if (require.main === module) {
    const checker = new AFRChecker();
    
    const testLoan = {
        loanId: 'LOAN-001',
        loanAmount: 50000,
        interestRate: 0.02, // 2% - well below AFR
        termMonths: 60,
        loanType: 'demand',
        loanPurpose: 'personal',
        borrowerName: 'John Doe'
    };
    
    const result = checker.check(testLoan);
    console.log('AFR Check Result:', JSON.stringify(result, null, 2));
}
```
