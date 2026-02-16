Governance Logic Engine: evaluate_loan.py
This script acts as the Logic component of your automation pipeline. It ingests the LoanApplication, references the GovernanceProfile, and determines if the application transitions to a Loan or requires manual intervention.
import json
import datetime
import uuid

def evaluate_application(application_json, governance_profile, kyc_record, current_utilization):
    app = json.loads(application_json)
    rules = governance_profile['rules']
    
    # 1. KYC Check
    if kyc_record['status'] != rules['minkycstatus']:
        return {"status": "rejected", "reason": "KYC status insufficient."}

    # 2. Utilization Check
    requested = app['requested_amount']
    if (current_utilization + requested) > rules['maxutilizationpercent']:
        return {"status": "rejected", "reason": "Exceeds max utilization threshold."}

    # 3. Lane-Specific Validation
    lane_id = app['laneid']
    lane_rules = rules['lanespecificrules'].get(lane_id, {})
    
    if lane_rules.get('requiresupportinglinks') and not app['supporting_links']:
        return {"status": "under_review", "reason": "Missing supporting documentation."}

if len(required_approvers) > 0:
        return {"status": "under_review", "approvers": required_approvers}
        return {"status": "under_review", "approvers": required_approvers}

    # 5. Success: Generate Loan & Ledger Objects
    return generate_disbursement_package(app)

def generate_disbursement_package(app):
    loan_id = f"loan{datetime.datetime.now().year}_{uuid.uuid4().hex[:4]}"
    
    loan_output = {
        "loanid": loan_id,
        "applicationid": app['applicationid'],
        "principal_amount": app['requested_amount'],
        "status": "active",
        "approval_timestamp": datetime.datetime.utcnow().isoformat() + "Z"
    }
    
    ledger_entry = {
        "entryid": f"led{datetime.datetime.now().year}_{uuid.uuid4().hex[:4]}",
        "loanid": loan_id,
        "entry_type": "disbursement",
        "amount": app['requested_amount'],
        "direction": "debit",
        "accountdebit": "LoansReceivableFounder",
        "accountcredit": "CashBank"
    }
    
    return {"status": "approved", "loan": loan_output, "ledger": ledger_entry}

Integration Blueprint: The "Audit-First" Workflow
To ensure the technical reliability required by the GitDigital Architect role, the output of this script should be handled by a secondary Governance Layer before the ledger is finalized.
 * Stage 1 (Evaluation): The script runs in a restricted GitHub Action environment.
 * Stage 2 (Commitment): If status == "approved", the action uses a GitHub App Token to commit the new Loan and LedgerEntry to a private ledger-storage repository.
 * Stage 3 (Audit): A permanent record is written to the Audit Log, creating a cryptographic link between the original application and the financial movement.
Operational Audit Log Template
To be appended to audit.log after every execution:
| Field | Value |
|---|---|
| Transaction ID | ${{ github.run_id }} |
| Application ID | app2026_0001 |
| Governance Result | APPROVED |
| Authorized By | system-governance-bot |
| Ledger Hash | sha256:e3b0c442... |
