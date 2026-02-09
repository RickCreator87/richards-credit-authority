⭐ /js/authority.js
This file handles:

- Form serialization  
- JSON payload building (matches your schema)  
- Threshold preview logic  
- Loan preview generation  
- Lane routing (GitDigital vs Generic)  

`javascript
// authority.js
// Richard's Credit Authority – Frontend Logic (Static Prototype)

// -----------------------------
// Utility: Serialize form to JSON
// -----------------------------
export function formToJSON(form) {
  const data = new FormData(form);
  const json = {};

  for (const [key, value] of data.entries()) {
    // Convert checkboxes to booleans
    if (value === "on") {
      json[key] = true;
    } else {
      json[key] = value;
    }
  }

  return json;
}

// -----------------------------
// Threshold Logic (Static)
// -----------------------------
export function computeThresholds(loanAmount) {
  const totalCapacity = 25000;
  const currentUtilization = 12500;

  const projected = currentUtilization + loanAmount;
  const utilizationPct = (projected / totalCapacity) * 100;

  let status = "healthy";
  if (utilizationPct >= 80 && utilizationPct < 100) status = "warning";
  if (utilizationPct >= 100) status = "exceeded";

  return {
    totalCapacity,
    currentUtilization,
    projected,
    utilizationPct,
    status
  };
}

// -----------------------------
// Loan Preview Generator
// -----------------------------
export function generatePreview(payload) {
  return `
Richard extends a ${payload.loantype.replace("-", " ")} loan of $${payload.loanamount}
to support "${payload.milestone || payload.purpose}". Repayment horizon: ${
    payload.repayment_horizon
  } months, repaid from ${payload.repayment_source}.
This loan requires governance review and will not be disbursed until a signed agreement is executed.
  `.trim();
}

// -----------------------------
// Attach to GitDigital Loan Form
// -----------------------------
export function attachGitDigitalForm() {
  const form = document.querySelector("#loan-form-gitdigital");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = formToJSON(form);
    payload.loan_type = "gitdigital-products";

    const thresholds = computeThresholds(Number(payload.loan_amount));
    const preview = generatePreview(payload);

    console.log("Loan Payload:", payload);
    console.log("Thresholds:", thresholds);
    console.log("Preview:", preview);

    alert("Draft loan submitted (static prototype). Check console for payload.");
  });
}

// Auto-init
document.addEventListener("DOMContentLoaded", () => {
  attachGitDigitalForm();
});
```

```js
⭐ /js/authority.js
This file handles:

- Form serialization  
- JSON payload building (matches your schema)  
- Threshold preview logic  
- Loan preview generation  
- Lane routing (GitDigital vs Generic)  

`javascript
// authority.js
// Richard's Credit Authority – Frontend Logic (Static Prototype)

// -----------------------------
// Utility: Serialize form to JSON
// -----------------------------
export function formToJSON(form) {
  const data = new FormData(form);
  const json = {};

  for (const [key, value] of data.entries()) {
    // Convert checkboxes to booleans
    if (value === "on") {
      json[key] = true;
    } else {
      json[key] = value;
    }
  }

  return json;
}

// -----------------------------
// Threshold Logic (Static)
// -----------------------------
export function computeThresholds(loanAmount) {
  const totalCapacity = 25000;
  const currentUtilization = 12500;

  const projected = currentUtilization + loanAmount;
  const utilizationPct = (projected / totalCapacity) * 100;

  let status = "healthy";
  if (utilizationPct >= 80 && utilizationPct < 100) status = "warning";
  if (utilizationPct >= 100) status = "exceeded";

  return {
    totalCapacity,
    currentUtilization,
    projected,
    utilizationPct,
    status
  };
}

// -----------------------------
// Loan Preview Generator
// -----------------------------
export function generatePreview(payload) {
  return `
Richard extends a ${payload.loantype.replace("-", " ")} loan of $${payload.loanamount}
to support "${payload.milestone || payload.purpose}". Repayment horizon: ${
    payload.repayment_horizon
  } months, repaid from ${payload.repayment_source}.
This loan requires governance review and will not be disbursed until a signed agreement is executed.
  `.trim();
}

// -----------------------------
// Attach to GitDigital Loan Form
// -----------------------------
export function attachGitDigitalForm() {
  const form = document.querySelector("#loan-form-gitdigital");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = formToJSON(form);
    payload.loan_type = "gitdigital-products";

    const thresholds = computeThresholds(Number(payload.loan_amount));
    const preview = generatePreview(payload);

    console.log("Loan Payload:", payload);
    console.log("Thresholds:", thresholds);
    console.log("Preview:", preview);

    alert("Draft loan submitted (static prototype). Check console for payload.");
  });
}

// Auto-init
document.addEventListener("DOMContentLoaded", () => {
  attachGitDigitalForm();
});
```
```
