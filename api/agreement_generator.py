---

api/agreement_generator.py – Agreement Generator module

`python
from typing import Dict, Any


def buildagreementpayload(loan: Dict[str, Any]) -> Dict[str, Any]:
  return {
    "template": "founder-loan-gitdigital",
    "variables": {
      "borrowername": loan["fullname"],
      "loanamount": loan["loanamount"],
      "loantype": loan["loantype"],
      "purpose": loan["purpose"],
      "repaymenthorizon": loan["repaymenthorizon"],
      "relationship": loan["relationship"]
    },
    "requires_signatures": ["borrower", "co-founder", "organization"],
    "status": "draft"
  }
```py

---

api/agreement_generator.py – Agreement Generator module

`python
from typing import Dict, Any


def buildagreementpayload(loan: Dict[str, Any]) -> Dict[str, Any]:
  return {
    "template": "founder-loan-gitdigital",
    "variables": {
      "borrowername": loan["fullname"],
      "loanamount": loan["loanamount"],
      "loantype": loan["loantype"],
      "purpose": loan["purpose"],
      "repaymenthorizon": loan["repaymenthorizon"],
      "relationship": loan["relationship"]
    },
    "requires_signatures": ["borrower", "co-founder", "organization"],
    "status": "draft"
  }
```
