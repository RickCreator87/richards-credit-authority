---

api/threshold_engine.py (unchanged, but namespaced)

`python
from fastapi import FastAPI

app = FastAPI(title="Threshold Engine")

TOTAL_CAPACITY = 25000
CURRENT_UTILIZATION = 12500
GITDIGITAL_CAPACITY = 15000
GITDIGITAL_USAGE = 10000


@app.get("/personal")
def personal_thresholds():
  return {
    "totalcapacity": TOTALCAPACITY,
    "currentutilization": CURRENTUTILIZATION,
    "remaining": TOTALCAPACITY - CURRENTUTILIZATION,
    "soft_cap": 0.80,
    "hard_cap": 1.00
  }


@app.get("/gitdigital")
def gitdigital_thresholds():
  return {
    "maxallocation": GITDIGITALCAPACITY,
    "currentusage": GITDIGITALUSAGE,
    "remaining": GITDIGITALCAPACITY - GITDIGITALUSAGE,
    "utilizationpct": GITDIGITALUSAGE / GITDIGITAL_CAPACITY
  }
```py

---

api/threshold_engine.py (unchanged, but namespaced)

`python
from fastapi import FastAPI

app = FastAPI(title="Threshold Engine")

TOTAL_CAPACITY = 25000
CURRENT_UTILIZATION = 12500
GITDIGITAL_CAPACITY = 15000
GITDIGITAL_USAGE = 10000


@app.get("/personal")
def personal_thresholds():
  return {
    "totalcapacity": TOTALCAPACITY,
    "currentutilization": CURRENTUTILIZATION,
    "remaining": TOTALCAPACITY - CURRENTUTILIZATION,
    "soft_cap": 0.80,
    "hard_cap": 1.00
  }


@app.get("/gitdigital")
def gitdigital_thresholds():
  return {
    "maxallocation": GITDIGITALCAPACITY,
    "currentusage": GITDIGITALUSAGE,
    "remaining": GITDIGITALCAPACITY - GITDIGITALUSAGE,
    "utilizationpct": GITDIGITALUSAGE / GITDIGITAL_CAPACITY
  }
```
