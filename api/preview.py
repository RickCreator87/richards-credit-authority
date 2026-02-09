

---

⭐ /api/preview.py
Generates the human‑readable preview text.

`python

preview.py

Richard's Credit Authority – Loan Preview Generator

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Loan Preview Generator")


class PreviewRequest(BaseModel):
    loan_type: str
    loan_amount: float
    milestone: str | None = None
    purpose: str
    repayment_horizon: str
    repayment_source: str


@app.post("/preview")
def generate_preview(req: PreviewRequest):
    milestone_text = f' for milestone "{req.milestone}"' if req.milestone else ""

    text = (
        f"Richard extends a {req.loantype.replace('-', ' ')} loan of ${req.loanamount}"
        f"{milestonetext}, with a repayment horizon of {req.repaymenthorizon} months, "
        f"repaid from {req.repayment_source}. This loan requires governance review and "
        f"will not be disbursed until a signed agreement is executed."
    )

    return {"preview": text}


```py

---

⭐ /api/preview.py
Generates the human‑readable preview text.

`python

preview.py

Richard's Credit Authority – Loan Preview Generator

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Loan Preview Generator")


class PreviewRequest(BaseModel):
    loan_type: str
    loan_amount: float
    milestone: str | None = None
    purpose: str
    repayment_horizon: str
    repayment_source: str


@app.post("/preview")
def generate_preview(req: PreviewRequest):
    milestone_text = f' for milestone "{req.milestone}"' if req.milestone else ""

    text = (
        f"Richard extends a {req.loantype.replace('-', ' ')} loan of ${req.loanamount}"
        f"{milestonetext}, with a repayment horizon of {req.repaymenthorizon} months, "
        f"repaid from {req.repayment_source}. This loan requires governance review and "
        f"will not be disbursed until a signed agreement is executed."
    )

    return {"preview": text}
```
