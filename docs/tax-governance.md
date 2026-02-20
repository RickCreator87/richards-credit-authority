# Tax Governance & Reporting Framework
**Entity:** Richard Duane Kindler (Individual) / GitDigital LLC (Corporate)
**Jurisdiction:** United States (Federal & State)
**Scope:** Internal Lending, Interest Accrual, and Digital Asset Basis Tracking

---

## 1. Internal Lending Logic (The "Arms-Length" Principle)
To maintain compliance with IRS standards, all loans from the **Credit Authority** to **GitDigital LLC** are treated as "Arms-Length" transactions. 
* **Interest Rates:** Rates are set based on the Applicable Federal Rate (AFR) or a minimum of **5% APR** to ensure the loan is not classified as a gift.
* **Documentation:** Every drawdown from the credit authority must be matched by a Promissory Note stored in the `records/` directory (or linked securely).

## 2. Characterization of Funds
| Transaction Type | Tax Treatment | Reporting Form |
| :--- | :--- | :--- |
| **Shareholder Loan** | Non-taxable principal; Taxable interest. | Form 1099-INT |
| **Capital Contribution** | Increase in Cost Basis; Non-taxable. | Schedule K-1 |
| **Staking/DeFi Yield** | Ordinary Income at time of receipt. | Form 1040 / Schedule C |

## 3. Digital Asset Cost Basis
* **Inventory Method:** Specific Identification or FIFO (First-In, First-Out) is used for all asset transfers between the Authority and the LLC.
* **Fair Market Value (FMV):** The USD value of any digital asset (SOL, USDC, etc.) is recorded at the precise timestamp of the transfer using a reputable oracle (e.g., Pyth or Chainlink) or exchange API.

## 4. Compliance Schedule
* **Annual Review:** Every January, a summary of total interest paid by GitDigital LLC to Richard Duane Kindler will be generated.
* **1099-INT Issuance:** GitDigital LLC will issue a 1099-INT to the Authority for any interest payments exceeding **$10 USD** in a fiscal year.
* **Self-Employment Tax:** Analysis is performed to ensure lending activity does not inadvertently trigger unintended Self-Employment tax levels unless specifically structured as a trade/business.

## 5. Record Keeping
All digital transaction hashes (TXIDs) serve as the primary audit trail. These are mirrored in the `lending-authority.json` log to ensure the "Source of Truth" is immutable and verifiable.

---
**Note:** This document is an internal governance framework and does not replace the advice of a Certified Public Accountant (CPA).

