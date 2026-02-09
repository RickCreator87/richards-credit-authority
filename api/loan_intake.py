

---

⭐ /api/loan_intake.py
FastAPI endpoint for:

- receiving loan requests  
- validating against your JSON schema  
- preparing KYC + ledger + agreement payloads  

`python

loan_intake.py

Richard's Credit Authority – Loan Intake API (Prototype)

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, ValidationError
from typing import Optional
import json
from pathlib import Path

app = FastAPI(title="Richard's Credit Authority – Loan Intake API")

---------------------------------------

Load JSON Schema (for reference)

---------------------------------------
schemapath = Path(file_).parent / "../schema/loan-request.json"
schema = json.loads(schemapath.readtext())


---------------------------------------

Pydantic Model (mirrors schema)

---------------------------------------
class LoanRequest(BaseModel):
    loan_type: str
    milestone: Optional[str]
    loan_amount: float
    purpose: str
    repayment_source: str
    repayment_horizon: str
    full_name: str
    email: EmailStr
    relationship: str
    kyc_status: str
    attest_accuracy: bool
    attest_governance: bool


---------------------------------------

Loan Intake Endpoint

---------------------------------------
@app.post("/loan/intake")
async def loan_intake(request: LoanRequest):
    # Validate attestations
    if not request.attestaccuracy or not request.attestgovernance:
        raise HTTPException(
            status_code=400,
            detail="Attestations must be accepted before submission."
        )

    # Prepare downstream payloads
    kyc_payload = {
        "fullname": request.fullname,
        "email": request.email,
        "kycstatus": request.kycstatus
    }

    ledger_payload = {
        "loantype": request.loantype,
        "amount": request.loan_amount,
        "relationship": request.relationship,
        "milestone": request.milestone,
        "purpose": request.purpose
    }

    agreement_payload = {
        "borrower": request.full_name,
        "loanamount": request.loanamount,
        "loantype": request.loantype,
        "repaymenthorizon": request.repaymenthorizon,
        "purpose": request.purpose
    }

    return {
        "status": "received",
        "loan_request": request.dict(),
        "kycpayload": kycpayload,
        "ledgerpayload": ledgerpayload,
        "agreementpayload": agreementpayload
    }
```


```py

---

⭐ /api/loan_intake.py
FastAPI endpoint for:

- receiving loan requests  
- validating against your JSON schema  
- preparing KYC + ledger + agreement payloads  

`python

loan_intake.py

Richard's Credit Authority – Loan Intake API (Prototype)

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, ValidationError
from typing import Optional
import json
from pathlib import Path

app = FastAPI(title="Richard's Credit Authority – Loan Intake API")

---------------------------------------

Load JSON Schema (for reference)

---------------------------------------
schemapath = Path(file_).parent / "../schema/loan-request.json"
schema = json.loads(schemapath.readtext())


---------------------------------------

Pydantic Model (mirrors schema)

---------------------------------------
class LoanRequest(BaseModel):
    loan_type: str
    milestone: Optional[str]
    loan_amount: float
    purpose: str
    repayment_source: str
    repayment_horizon: str
    full_name: str
    email: EmailStr
    relationship: str
    kyc_status: str
    attest_accuracy: bool
    attest_governance: bool


---------------------------------------

Loan Intake Endpoint

---------------------------------------
@app.post("/loan/intake")
async def loan_intake(request: LoanRequest):
    # Validate attestations
    if not request.attestaccuracy or not request.attestgovernance:
        raise HTTPException(
            status_code=400,
            detail="Attestations must be accepted before submission."
        )

    # Prepare downstream payloads
    kyc_payload = {
        "fullname": request.fullname,
        "email": request.email,
        "kycstatus": request.kycstatus
    }

    ledger_payload = {
        "loantype": request.loantype,
        "amount": request.loan_amount,
        "relationship": request.relationship,
        "milestone": request.milestone,
        "purpose": request.purpose
    }

    agreement_payload = {
        "borrower": request.full_name,
        "loanamount": request.loanamount,
        "loantype": request.loantype,
        "repaymenthorizon": request.repaymenthorizon,
        "purpose": request.purpose
    }

    return {
        "status": "received",
        "loan_request": request.dict(),
        "kycpayload": kycpayload,
        "ledgerpayload": ledgerpayload,
        "agreementpayload": agreementpayload
    }
```
