---

api/loaner_ledger.py – Loaner Ledger module

`python
from datetime import datetime
from typing import Dict, Any


def buildledgerentry(loan: Dict[str, Any]) -> Dict[str, Any]:
  return {
    "entry_id": f"loan-{int(datetime.utcnow().timestamp())}",
    "timestamp": datetime.utcnow().isoformat() + "Z",
    "loantype": loan["loantype"],
    "amount": loan["loan_amount"],
    "borrower": loan["full_name"],
    "relationship": loan["relationship"],
    "milestone": loan.get("milestone"),
    "purpose": loan["purpose"],
    "repaymentsource": loan["repaymentsource"],
    "repaymenthorizon": loan["repaymenthorizon"],
    "status": "pending-approval"
  }

```py

---

api/loaner_ledger.py – Loaner Ledger module

`python
from datetime import datetime
from typing import Dict, Any


def buildledgerentry(loan: Dict[str, Any]) -> Dict[str, Any]:
  return {
    "entry_id": f"loan-{int(datetime.utcnow().timestamp())}",
    "timestamp": datetime.utcnow().isoformat() + "Z",
    "loantype": loan["loantype"],
    "amount": loan["loan_amount"],
    "borrower": loan["full_name"],
    "relationship": loan["relationship"],
    "milestone": loan.get("milestone"),
    "purpose": loan["purpose"],
    "repaymentsource": loan["repaymentsource"],
    "repaymenthorizon": loan["repaymenthorizon"],
    "status": "pending-approval"
  }
```
