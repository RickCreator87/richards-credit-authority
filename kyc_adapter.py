KYC Integration Module: Identity & Compliance Bridge
To automate the kyc_status check within the pipeline, we implement a Service Adapter. This module connects the Governance Engine to a verification provider (e.g., Persona, Stripe Identity, or a custom GitDigital manual-gate for early stages).
This ensures that no credit is extended to an unverified founder_id, satisfying the minkycstatus: "verified" rule in your Governance Profile.
1. KYC Adapter Logic (kyc_adapter.py)
This module handles the handshake with the verification service and normalizes the response for the pipeline.
import os
import requests

def verify_founder_identity(founder_id):
    """
    Connects to the identity provider to fetch the current verification status.
    """
    api_key = os.getenv('KYC_PROVIDER_KEY')
    # Example endpoint for a KYC provider
    provider_url = f"https://api.kycprovider.com/v1/verify/{founder_id}"
    
    try:
        response = requests.get(provider_url, headers={"Authorization": f"Bearer {api_key}"})
        response.raise_for_status()
        data = response.json()
        
        # Normalize status to your Core Entity schema
        # (notstarted | in_progress | verified | rejected)
        return {
            "founder_id": founder_id,
            "status": data.get("status", "notstarted"),
            "provider": "External_KYC_Alpha",
            "lastcheckedat": data.get("updated_at")
        }
    except requests.exceptions.RequestException as e:
        # Fallback to 'notstarted' or 'error' to prevent accidental approval
        return {"founder_id": founder_id, "status": "error", "notes": str(e)}

2. Updated Governance Flow
The pipeline now follows a "Gatekeeper" pattern:
 * Identity Fetch: The kyc_adapter retrieves the current KYCRecord.
 * Audit Update: The system logs the specific timestamp the KYC check was performed.
 * Logic Gate: The evaluate_loan.py script receives this KYCRecord as an input object. If status != "verified", the pipeline terminates before any financial ledger entries are drafted.
3. Audit & Governance Layer: KYC Logs
Every KYC check—even failed ones—must be logged to satisfy audit requirements. This prevents "status tampering" by ensuring a clear paper trail of the verification source.
| Event Type | Founder ID | Provider Status | System Mapping | Timestamp |
|---|---|---|---|---|
| KYC_POLL | founderrichard | COMPLETE_SUCCESS | verified | 2026-02-14T15:10:00Z |
| KYC_POLL | guest_082 | FAILED_DOC_EXPIRED | rejected | 2026-02-14T16:05:00Z |
4. Security Hardening
 * Idempotency: The adapter includes a lastcheckedat field. If a check was performed within the last 24 hours, the system can be configured to use the cached record to save on API costs.
 * Encrypted Secrets: The KYC_PROVIDER_KEY is stored in GitHub Secrets and is only injected into the runner's environment during the Execute Governance Engine step.

