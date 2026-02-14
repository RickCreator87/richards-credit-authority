automation/generate-1099.js

```javascript
/**
 * Richards Credit Authority - 1099-INT Generation Module
 * Version: 1.0.0
 * Description: Generates IRS Form 1099-INT for interest income reporting
 * Author: RCA Engineering Team
 * Last Updated: 2026-01-15
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const axios = require('axios');

// IRS thresholds for 1099-INT reporting (2024 tax year)
const IRS_THRESHOLDS = {
    interestIncome: 10.00,        // Box 1
    earlyWithdrawalPenalty: 0.00,  // Box 2 (always report if applicable)
    usSavingsBondInterest: 0.00,   // Box 3 (always report if applicable)
    federalTaxWithheld: 0.00,      // Box 4 (always report if applicable)
    investmentExpenses: 0.00,      // Box 5 (always report if applicable)
    foreignTaxPaid: 0.00,          // Box 6 (always report if applicable)
    foreignCountry: 'N/A',         // Box 7
    taxExemptInterest: 0.00,       // Box 8 (always report if applicable)
    specifiedPrivateActivity: 0.00 // Box 9 (always report if applicable)
};

class Form1099Generator {
    constructor(config = {}) {
        this.config = {
            taxYear: config.taxYear || new Date().getFullYear() - 1,
            outputDir: config.outputDir || path.join(__dirname, '../output/tax_forms'),
            payerInfo: {
                name: 'Richards Credit Authority',
                address: '123 Financial Plaza',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                phone: '(555) 123-4567',
                tin: '12-3456789', // RCA's EIN
                email: 'taxreporting@rca.com'
            },
            ...config
        };
        
        this.ensureOutputDirectory();
    }

    /**
     * Main generation method
     * @param {Object} options - Generation options
     * @returns {Promise<Object>} Generation results
     */
    async generate(options = {}) {
        console.log(`Starting 1099-INT generation for tax year ${this.config.taxYear}...`);
        
        const results = {
            taxYear: this.config.taxYear,
            generated: 0,
            errors: [],
            files: [],
            summary: {
                totalInterestReported: 0,
                totalForms: 0,
                thresholdExceeded: 0
            }
        };

        try {
            // Step 1: Retrieve interest recipients
            const recipients = await this._getInterestRecipients(options);
            console.log(`Found ${recipients.length} potential recipients`);
            
            // Step 2: Calculate interest income for each
            const calculatedRecipients = await this._calculateInterestIncome(recipients);
            
            // Step 3: Filter by threshold
            const reportableRecipients = calculatedRecipients.filter(r => 
                r.box1InterestIncome >= IRS_THRESHOLDS.interestIncome
            );
            
            results.summary.thresholdExceeded = reportableRecipients.length;
            
            // Step 4: Generate individual forms
            for (const recipient of reportableRecipients) {
                try {
                    const formData = await this._generateForm(recipient);
                    results.generated++;
                    results.summary.totalInterestReported += formData.box1InterestIncome;
                    results.files.push(formData.filePath);
                } catch (error) {
                    results.errors.push({
                        recipient: recipient.borrowerId,
                        error: error.message
                    });
                }
            }

            // Step 5: Generate summary file
            await this._generateSummaryFile(reportableRecipients);
            
            // Step 6: Generate IRS e-file transmission
            const efileData = await this._generateIRSFile(reportableRecipients);
            results.irsFile = efileData.filePath;

            // Step 7: Generate payer summary (Form 1096 equivalent)
            await this._generatePayerSummary(reportableRecipients);

            results.summary.totalForms = results.generated;
            results.success = results.errors.length === 0;
            
            console.log(`Generated ${results.generated} 1099-INT forms`);
            return results;

        } catch (error) {
            console.error('1099 generation error:', error);
            throw error;
        }
    }

    /**
     * Retrieves borrowers who received interest income
     */
    async _getInterestRecipients(options) {
        // In production, query loan servicing database
        // Mock implementation for structure
        
        const query = `
            SELECT DISTINCT
                b.borrower_id,
                b.first_name,
                b.last_name,
                b.ssn,
                b.address_line1,
                b.address_line2,
                b.city,
                b.state,
                b.zip_code,
                b.email,
                b.phone,
                l.loan_id,
                l.account_number
            FROM borrowers b
            JOIN loans l ON b.borrower_id = l.borrower_id
            JOIN loan_transactions t ON l.loan_id = t.loan_id
            WHERE t.transaction_type = 'INTEREST_PAYMENT'
            AND t.transaction_date >= $1
            AND t.transaction_date <= $2
            AND b.tax_reporting_required = true
            AND b.ssn IS NOT NULL
        `;
        
        const startDate = `${this.config.taxYear}-01-01`;
        const endDate = `${this.config.taxYear}-12-31`;
        
        // Mock data for demonstration
        return [
            {
                borrowerId: 'BOR-001',
                firstName: 'John',
                lastName: 'Doe',
                ssn: '123-45-6789',
                addressLine1: '123 Main St',
                city: 'Anytown',
                state: 'NY',
                zipCode: '12345',
                accountNumber: 'LOAN-001'
            },
            {
                borrowerId: 'BOR-002',
                firstName: 'Jane',
                lastName: 'Smith',
                ssn: '987-65-4321',
                addressLine1: '456 Oak Ave',
                city: 'Othercity',
                state: 'CA',
                zipCode: '90210',
                accountNumber: 'LOAN-002'
            }
        ];
    }

    /**
     * Calculates total interest income for each recipient
     */
    async _calculateInterestIncome(recipients) {
        const calculated = [];
        
        for (const recipient of recipients) {
            // In production, sum all interest payments for the tax year
            // Mock calculation
            
            const interestData = await this._queryInterestPayments(
                recipient.borrowerId,
                this.config.taxYear
            );
            
            calculated.push({
                ...recipient,
                box1InterestIncome: interestData.totalInterest,
                box2EarlyWithdrawalPenalty: interestData.earlyWithdrawalPenalty || 0,
                box3UsSavingsBondInterest: 0,
                box4FederalTaxWithheld: interestData.taxWithheld || 0,
                box5InvestmentExpenses: 0,
                box6ForeignTaxPaid: 0,
                box7ForeignCountry: '',
                box8TaxExemptInterest: 0,
                box9SpecifiedPrivateActivity: 0,
                accountNumber: recipient.accountNumber,
                payerTin: this.config.payerInfo.tin
            });
        }
        
        return calculated;
    }

    /**
     * Queries interest payments for a borrower
     */
    async _queryInterestPayments(borrowerId, taxYear) {
        // Mock query - in production, aggregate from transaction history
        return {
            totalInterest: Math.random() * 5000 + 100, // Random between 100 and 5100
            earlyWithdrawalPenalty: 0,
            taxWithheld: 0
        };
    }

    /**
     * Generates individual 1099-INT form
     */
    async _generateForm(recipient) {
        const formId = `1099INT-${this.config.taxYear}-${recipient.borrowerId}`;
        const fileName = `${formId}.pdf`;
        const filePath = path.join(this.config.outputDir, fileName);

        // Form data structure matching IRS Form 1099-INT
        const formData = {
            taxYear: this.config.taxYear,
            formId: formId,
            
            // Payer information (RCA)
            payerName: this.config.payerInfo.name,
            payerAddress: this.config.payerInfo.address,
            payerCity: this.config.payerInfo.city,
            payerState: this.config.payerInfo.state,
            payerZip: this.config.payerInfo.zipCode,
            payerTin: this.config.payerInfo.tin,
            payerPhone: this.config.payerInfo.phone,
            
            // Recipient information
            recipientTin: recipient.ssn,
            recipientName: `${recipient.firstName} ${recipient.lastName}`,
            recipientAddress: recipient.addressLine1,
            recipientAddress2: recipient.addressLine2 || '',
            recipientCity: recipient.city,
            recipientState: recipient.state,
            recipientZip: recipient.zip_code,
            recipientAccountNumber: recipient.accountNumber,
            
            // Income boxes
            box1InterestIncome: recipient.box1InterestIncome,
            box2EarlyWithdrawalPenalty: recipient.box2EarlyWithdrawalPenalty,
            box3UsSavingsBondInterest: recipient.box3UsSavingsBondInterest,
            box4FederalTaxWithheld: recipient.box4FederalTaxWithheld,
            box5InvestmentExpenses: recipient.box5InvestmentExpenses,
            box6ForeignTaxPaid: recipient.box6ForeignTaxPaid,
            box7ForeignCountry: recipient.box7ForeignCountry,
            box8TaxExemptInterest: recipient.box8TaxExemptInterest,
            box9SpecifiedPrivateActivity: recipient.box9SpecifiedPrivateActivity,
            
            // Filing information
            corrected: false,
            void: false,
            fatcaFilingRequirement: false,
            secondTinNotice: false
        };

        // Generate PDF (mock - in production, use PDF library like PDFKit or puppeteer)
        // await this._generatePDF(formData, filePath);
        
        // Generate CSV record for bulk processing
        await this._appendToMasterCSV(formData);

        return {
            formId: formId,
            borrowerId: recipient.borrowerId,
            filePath: filePath,
            box1InterestIncome: formData.box1InterestIncome,
            generatedAt: new Date().toISOString()
        };
    }

    /**
     * Generates master CSV file for all forms
     */
    async _appendToMasterCSV(formData) {
        const csvPath = path.join(this.config.outputDir, `1099INT_${this.config.taxYear}_master.csv`);
        
        const csvWriter = createObjectCsvWriter({
            path: csvPath,
            header: [
                { id: 'taxYear', title: 'Tax_Year' },
                { id: 'payerTin', title: 'Payer_TIN' },
                { id: 'recipientTin', title: 'Recipient_TIN' },
                { id: 'recipientName', title: 'Recipient_Name' },
                { id: 'recipientAddress', title: 'Street_Address' },
                { id: 'recipientCity', title: 'City' },
                { id: 'recipientState', title: 'State' },
                { id: 'recipientZip', title: 'ZIP' },
                { id: 'box1InterestIncome', title: 'Box_1_Interest_Income' },
                { id: 'box2EarlyWithdrawalPenalty', title: 'Box_2_Early_Withdrawal_Penalty' },
                { id: 'box3UsSavingsBondInterest', title: 'Box_3_US_Savings_Bond_Interest' },
                { id: 'box4FederalTaxWithheld', title: 'Box_4_Federal_Tax_Withheld' },
                { id: 'box5InvestmentExpenses', title: 'Box_5_Investment_Expenses' },
                { id: 'box6ForeignTaxPaid', title: 'Box_6_Foreign_Tax_Paid' },
                { id: 'box7ForeignCountry', title: 'Box_7_Foreign_Country' },
                { id: 'box8TaxExemptInterest', title: 'Box_8_Tax_Exempt_Interest' },
                { id: 'box9SpecifiedPrivateActivity', title: 'Box_9_Specified_Private_Activity' },
                { id: 'accountNumber', title: 'Account_Number' },
                { id: 'fatcaFilingRequirement', title: 'FATCA_Requirement' },
                { id: 'corrected', title: 'Corrected' }
            ],
            append: fs.existsSync(csvPath)
        });

        await csvWriter.writeRecords([formData]);
    }

    /**
     * Generates IRS e-file format (Publication 1220)
     */
    async _generateIRSFile(recipients) {
        const fileName = `RCA_1099INT_${this.config.taxYear}_IRS.txt`;
        const filePath = path.join(this.config.outputDir, fileName);
        
        let fileContent = '';
        
        // Transmitter "T" Record (mock)
        fileContent += this._generateTRecord();
        
        // Payer "A" Record
        fileContent += this._generateARecord();
        
        // Payee "B" Records
        for (const recipient of recipients) {
            fileContent += this._generateBRecord(recipient);
        }
        
        // End of Payer "C" Record
        fileContent += this._generateCRecord(recipients.length);
        
        // End of Transmitter "F" Record
        fileContent += this._generateFRecord();
        
        fs.writeFileSync(filePath, fileContent);
        
        return {
            filePath: filePath,
            recordCount: recipients.length,
            format: 'IRS Publication 1220'
        };
    }

    /**
     * Generates payer summary (Form 1096 equivalent)
     */
    async _generatePayerSummary(recipients) {
        const summary = {
            taxYear: this.config.taxYear,
            payerName: this.config.payerInfo.name,
            payerTin: this.config.payerInfo.tin,
            totalForms: recipients.length,
            totalBox1: recipients.reduce((sum, r) => sum + r.box1InterestIncome, 0),
            totalBox4: recipients.reduce((sum, r) => sum + r.box4FederalTaxWithheld, 0),
            formType: '1099-INT'
        };

        const filePath = path.join(this.config.outputDir, `1096_Summary_${this.config.taxYear}.json`);
        fs.writeFileSync(filePath, JSON.stringify(summary, null, 2));
        
        return summary;
    }

    /**
     * Generates summary report
     */
    async _generateSummaryFile(recipients) {
        const summary = {
            generationDate: new Date().toISOString(),
            taxYear: this.config.taxYear,
            totalRecipients: recipients.length,
            totalInterest: recipients.reduce((sum, r) => sum + r.box1InterestIncome, 0),
            averageInterest: recipients.length > 0 ? 
                recipients.reduce((sum, r) => sum + r.box1InterestIncome, 0) / recipients.length : 0,
            stateBreakdown: this._calculateStateBreakdown(recipients),
            thresholdAnalysis: {
                totalRecipients: recipients.length,
                overThreshold: recipients.filter(r => r.box1InterestIncome >= IRS_THRESHOLDS.interestIncome).length,
                thresholdAmount: IRS_THRESHOLDS.interestIncome
            }
        };

        const filePath = path.join(this.config.outputDir, `Summary_${this.config.taxYear}.json`);
        fs.writeFileSync(filePath, JSON.stringify(summary, null, 2));
    }

    /**
     * Calculates state breakdown
     */
    _calculateStateBreakdown(recipients) {
        const breakdown = {};
        for (const recipient of recipients) {
            const state = recipient.state;
            if (!breakdown[state]) {
                breakdown[state] = { count: 0, totalInterest: 0 };
            }
            breakdown[state].count++;
            breakdown[state].totalInterest += recipient.box1InterestIncome;
        }
        return breakdown;
    }

    // IRS e-file format generators (simplified mocks)
    _generateTRecord() {
        return `T2019${this.config.payerInfo.tin.padEnd(9)}RCA transmitter record...\n`;
    }

    _generateARecord() {
        return `A2019${this.config.payerInfo.tin.padEnd(9)}${this.config.payerInfo.name.padEnd(40)}...\n`;
    }

    _generateBRecord(recipient) {
        const amount = Math.round(recipient.box1InterestIncome * 100).toString().padStart(12, '0');
        return `B2019${recipient.ssn.replace(/-/g, '').padEnd(9)}${recipient.lastName.padEnd(40)}${amount}...\n`;
    }

    _generateCRecord(count) {
        return `C${count.toString().padStart(8, '0')}...\n`;
    }

    _generateFRecord() {
        return `F...\n`;
    }

    /**
     * Ensures output directory exists
     */
    ensureOutputDirectory() {
        if (!fs.existsSync(this.config.outputDir)) {
            fs.mkdirSync(this.config.outputDir, { recursive: true });
        }
    }

    /**
     * Validates generated forms
     */
    async validateForms(filePath) {
        // In production, validate against IRS schema
        return {
            valid: true,
            errors: []
        };
    }
}

// Export module
module.exports = Form1099Generator;

// CLI interface
if (require.main === module) {
    const generator = new Form1099Generator({
        taxYear: parseInt(process.argv[2]) || new Date().getFullYear() - 1
    });
    
    generator.generate()
        .then(results => {
            console.log('Generation Results:', JSON.stringify(results, null, 2));
        })
        .catch(error => {
            console.error('Generation failed:', error);
            process.exit(1);
        });
}
```
