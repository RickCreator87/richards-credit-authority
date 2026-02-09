```md
richard-credit-authority/
├─ schema/
│  ├─ identity.schema.json
│  ├─ authority.schema.json
│  ├─ tax.schema.json
│  ├─ workflow.schema.json
│  ├─ validation.schema.json
│
├─ authority/
│  ├─ authority-map.yaml
│
├─ validation/
│  ├─ rules.yaml
│  ├─ validate.config.yaml
│
├─ workflows/
│  ├─ new-loan.yaml
│  ├─ update-ledger.yaml
│  ├─ generate-agreement.yaml
│  ├─ compliance-check.yaml
│
├─ workflow/
│  ├─ engine.md          # design + contract (you can later back it with code)
│
├─ tax/
│  ├─ federal/
│  │  ├─ rules.yaml
│  │  ├─ forms.yaml
│  │  ├─ afr.yaml
│  ├─ state/
│  │  ├─ colorado/
│  │  │  ├─ rules.yaml
│  │  │  ├─ forms.yaml
│  │  │  ├─ special-cases.yaml
│  │
│  ├─ validation.yaml
│
├─ integrations/
│  ├─ ledger.yaml
│  ├─ agreements.yaml
│  ├─ vault.yaml
│  ├─ api.yaml
│
├─ governance/
│  ├─ roles.md
│  ├─ approvals.md
│  ├─ audit-log.md
│
├─ .github/
│  ├─ workflows/
│  │  ├─ validate-authority.yml
│  │  ├─ validate-tax.yml
│  │  ├─ validate-workflows.yml
│
├─ .husky/
│  ├─ pre-commit
│  ├─ pre-push
│
├─ CONTRIBUTING.md
├─ README.md
```


richard-credit-authority/
├─ schema/
│  ├─ identity.schema.json
│  ├─ authority.schema.json
│  ├─ tax.schema.json
│  ├─ workflow.schema.json
│  ├─ validation.schema.json
│
├─ authority/
│  ├─ authority-map.yaml
│
├─ validation/
│  ├─ rules.yaml
│  ├─ validate.config.yaml
│
├─ workflows/
│  ├─ new-loan.yaml
│  ├─ update-ledger.yaml
│  ├─ generate-agreement.yaml
│  ├─ compliance-check.yaml
│
├─ workflow/
│  ├─ engine.md          # design + contract (you can later back it with code)
│
├─ tax/
│  ├─ federal/
│  │  ├─ rules.yaml
│  │  ├─ forms.yaml
│  │  ├─ afr.yaml
│  ├─ state/
│  │  ├─ colorado/
│  │  │  ├─ rules.yaml
│  │  │  ├─ forms.yaml
│  │  │  ├─ special-cases.yaml
│  │
│  ├─ validation.yaml
│
├─ integrations/
│  ├─ ledger.yaml
│  ├─ agreements.yaml
│  ├─ vault.yaml
│  ├─ api.yaml
│
├─ governance/
│  ├─ roles.md
│  ├─ approvals.md
│  ├─ audit-log.md
│
├─ .github/
│  ├─ workflows/
│  │  ├─ validate-authority.yml
│  │  ├─ validate-tax.yml
│  │  ├─ validate-workflows.yml
│
├─ .husky/
│  ├─ pre-commit
│  ├─ pre-push
│
├─ CONTRIBUTING.md
├─ README.md
