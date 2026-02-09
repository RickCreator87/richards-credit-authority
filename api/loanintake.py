---

api/loanintake.py (updated to use loanerledger + agreement_generator)

`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

from .loanerledger import buildledger_entry
from .agreementgenerator import buildagreement_payload

app = FastAPI(title="Loan Intake API")


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


@app.post("/intake")
async def loan_intake(request: LoanRequest):
  if not request.attestaccuracy or not request.attestgovernance:
    raise HTTPException(
      status_code=400,
      detail="Attestations must be accepted before submission."
    )

  if request.kyc_status != "verified":
    raise HTTPException(
      status_code=400,
      detail="KYC must be verified before loan can proceed."
    )

  ledgerentry = buildledger_entry(request.dict())
  agreementpayload = buildagreement_payload(request.dict())

  return {
    "status": "received",
    "loan_request": request.dict(),
    "ledgerentry": ledgerentry,
    "agreementpayload": agreementpayload
  }

```py

---

api/loanintake.py (updated to use loanerledger + agreement_generator)

`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

from .loanerledger import buildledger_entry
from .agreementgenerator import buildagreement_payload

app = FastAPI(title="Loan Intake API")


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


@app.post("/intake")
async def loan_intake(request: LoanRequest):
  if not request.attestaccuracy or not request.attestgovernance:
    raise HTTPException(
      status_code=400,
      detail="Attestations must be accepted before submission."
    )

  if request.kyc_status != "verified":
    raise HTTPException(
      status_code=400,
      detail="KYC must be verified before loan can proceed."
    )

  ledgerentry = buildledger_entry(request.dict())
  agreementpayload = buildagreement_payload(request.dict())

  return {
    "status": "received",
    "loan_request": request.dict(),
    "ledgerentry": ledgerentry,
    "agreementpayload": agreementpayload
  }
```
