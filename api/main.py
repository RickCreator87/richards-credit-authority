



---

api/main.py – unified FastAPI app / routing map

`python
from fastapi import FastAPI
from .loanintake import app as loanapp
from .thresholdengine import app as thresholdapp
from .preview import app as preview_app
from .kycvalidator import app as kycapp

app = FastAPI(title="Richard's Credit Authority – API")

app.mount("/loan", loan_app)
app.mount("/thresholds", threshold_app)
app.mount("/preview", preview_app)
app.mount("/kyc", kyc_app)```py

---
```py
api/main.py – unified FastAPI app / routing map

`python
from fastapi import FastAPI
from .loanintake import app as loanapp
from .thresholdengine import app as thresholdapp
from .preview import app as preview_app
from .kycvalidator import app as kycapp

app = FastAPI(title="Richard's Credit Authority – API")

app.mount("/loan", loan_app)
app.mount("/thresholds", threshold_app)
app.mount("/preview", preview_app)
app.mount("/kyc", kyc_app)
```
