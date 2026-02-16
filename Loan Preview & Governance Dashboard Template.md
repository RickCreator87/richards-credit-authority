Loan Preview & Governance Dashboard Template
This template acts as the Human-Readable Layer. It aggregates the JSON outputs from the logic engine and the KYC adapter into a clear "Executive Summary." This is the view a founder or trustee sees before the final automation commit.
Loan Application Preview: {{ application_id }}
1. Core Application Summary
2. 
| Field | Details |
|---|---|
| Founder | {{ founder_name }} ({{ founder_id }}) |
| Lane | {{ lane_id }} |
| Requested Amount | {{ requested_amount }} {{ currency }} |
| Repayment Horizon | {{ repayment_horizon_months }} Months |
| Purpose | {{ purpose_summary }} |

2. Governance & Compliance Status
> Current Status: {{ governance_status_badge }}
> 
 * KYC Verification: {{ kyc_status_icon }} {{ kyc_status }} (Verified via {{ kyc_provider }} on {{ kyc_last_check }})
 * Credit Utilization: {{ utilization_percent }}% of lane capacity used.
 * Rule Compliance: * [x] Milestone Alignment (Required for gitdigital_products)
   * [x] Supporting Links Validated
   * [x] Threshold Check: Under {{ max_threshold }} (No trustee signature required)
3. Proposed Ledger Impact
If approved, the following double-entry transaction will be posted to the immutable ledger:

| Account | Direction | Amount |
|---|---|---|
| LoansReceivable_Founder | DEBIT | {{ requested_amount }} {{ currency }} |
| Cash_Bank | CREDIT | {{ requested_amount }} {{ currency }} |

Memo: Disbursement for Application {{ application_id }} — Lane: {{ lane_id }}
4. Supporting Documentation
 * [Source Repository]({{ repo_link }})
 * [KYC Audit Trail]({{ kyc_link }})
 * [Governance Rule Set]({{ governance_link }})
Implementation Logic
The "Preview Page" on RickCreator87.github.io will function by:
 * Fetching the application.json from the GitHub Actions artifact.
 * Mapping the values to this Markdown structure using a static site generator (like Jekyll or Hugo) or a simple React component.
 * Color-Coding the status badges:
   * Approved = Green
   * Under Review = Amber
   * Rejected/Incomplete = Red
Audit Log Entry

| Type | ID | Description | Result |
|---|---|---|---|
| UI_RENDER | preview_772 | Rendered human-readable preview for approval. | SUCCESS |
