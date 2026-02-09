---

api/kyc_validator.py – KYC stub

`python
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI(title="KYC Validator Stub")


class KYCRequest(BaseModel):
  full_name: str
  email: EmailStr


@app.post("/check")
def check_kyc(req: KYCRequest):

Stub: always returns verified for now
  return {
    "fullname": req.fullname,
    "email": req.email,
    "status": "verified",
    "source": "stub"
  }

```py

---

api/kyc_validator.py – KYC stub

`python
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI(title="KYC Validator Stub")


class KYCRequest(BaseModel):
  full_name: str
  email: EmailStr


@app.post("/check")
def check_kyc(req: KYCRequest):

Stub: always returns verified for now
  return {
    "fullname": req.fullname,
    "email": req.email,
    "status": "verified",
    "source": "stub"
  }
```
