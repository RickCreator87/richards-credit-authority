

---

Dockerfile

`dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY api/ ./api/
COPY schema/ ./schema/

RUN pip install --no-cache-dir fastapi uvicorn[standard] pydantic jsonschema

EXPOSE 8000

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]

```py

---

Dockerfile

`dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY api/ ./api/
COPY schema/ ./schema/

RUN pip install --no-cache-dir fastapi uvicorn[standard] pydantic jsonschema

EXPOSE 8000

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```
