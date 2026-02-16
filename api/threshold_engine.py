
---
~~~

⭐ /api/threshold_engine.py
Static threshold engine for now — later you’ll wire it to your ledger.

`python

threshold_engine.py

Richard's Credit Authority – Threshold Engine (Prototype)

from fastapi import FastAPI

app = FastAPI(title="Threshold Engine")

TOTAL_CAPACITY = 25000
CURRENT_UTILIZATION = 12500
GITDIGITAL_CAPACITY = 15000
GITDIGITAL_USAGE = 10000


@app.get("/thresholds/personal")
def personal_thresholds():
    return {
        "totalcapacity": TOTALCAPACITY,
        "currentutilization": CURRENTUTILIZATION,
        "remaining": TOTALCAPACITY - CURRENTUTILIZATION,
        "soft_cap": 0.80,
        "hard_cap": 1.00
    }


@app.get("/thresholds/gitdigital")
def gitdigital_thresholds():
    return {
        "maxallocation": GITDIGITALCAPACITY,
        "currentusage": GITDIGITALUSAGE,
        "remaining": GITDIGITALCAPACITY - GITDIGITALUSAGE,
        "utilizationpct": GITDIGITALUSAGE / GITDIGITAL_CAPACITY
    }

```py

---
~~~

⭐ /api/threshold_engine.py
Static threshold engine for now — later you’ll wire it to your ledger.

`python

threshold_engine.py

Richard's Credit Authority – Threshold Engine (Prototype)

from fastapi import FastAPI

app = FastAPI(title="Threshold Engine")

TOTAL_CAPACITY = 25000
CURRENT_UTILIZATION = 12500
GITDIGITAL_CAPACITY = 15000
GITDIGITAL_USAGE = 10000


@app.get("/thresholds/personal")
def personal_thresholds():
    return {
        "totalcapacity": TOTALCAPACITY,
        "currentutilization": CURRENTUTILIZATION,
        "remaining": TOTALCAPACITY - CURRENTUTILIZATION,
        "soft_cap": 0.80,
        "hard_cap": 1.00
    }


@app.get("/thresholds/gitdigital")
def gitdigital_thresholds():
    return {
        "maxallocation": GITDIGITALCAPACITY,
        "currentusage": GITDIGITALUSAGE,
        "remaining": GITDIGITALCAPACITY - GITDIGITALUSAGE,
        "utilizationpct": GITDIGITALUSAGE / GITDIGITAL_CAPACITY
    }
```
