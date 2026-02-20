# Security Policy

## 🛡️ Security Philosophy
The **Richards Credit Authority (RCA)** is the root of trust for the GitDigital ecosystem. Maintaining the integrity of these governance documents is our highest priority. We believe in proactive transparency and responsible disclosure.

## 🤝 Supported Versions
Only the `main` branch is considered the "Source of Truth." All other branches are for development or staging and should not be relied upon for compliance audits.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## 📩 Reporting a Vulnerability
If you discover a security vulnerability, a data leak (PII), or a flaw in the lending logic that could lead to financial exploitation, please do **not** open a public GitHub issue.

Instead, please report it via one of the following private channels:
* **Primary Contact:** Richard Duane Kindler
* **Preferred Method:** [Insert your professional email or a secure DM link here]
* **GPG Key:** [Insert GPG Key ID if applicable]

We aim to acknowledge all reports within **48 hours** and provide a resolution plan within **7 days**.

## 🚫 Scope
This policy covers:
1. **Data Integrity:** Errors in `schemas/` that could misrepresent lending capacity.
2. **Identity Security:** Unauthorized commits or compromised GPG signatures.
3. **Compliance Leaks:** Accidental exposure of sensitive tax or KYC data.

## 🔒 Security Best Practices for This Repo
* **No PII:** Never commit actual Social Security Numbers, physical addresses, or private bank details. Use references or hashes.
* **Signed Commits:** All contributors (if any) must use GPG-signed commits to ensure the audit trail is untampered.
* **Secret Scanning:** We use GitHub Secret Scanning to prevent the accidental upload of private keys or API tokens.

---
*Thank you for helping keep the GitDigital ecosystem secure.*



# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
