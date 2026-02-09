flowchart LR
    ID[Identity Layer\nrichard-identity.yaml]
    AUTH[Authority Layer\nloaner-profile.yaml + authority-map.yaml]
    TAX[Tax Rules\nfederal + colorado]
    WF[Workflow Engine\nworkflows/*.yaml]
    VAL[Validation Rules\nvalidation/rules.yaml]
    LEDGER[(Loaner Ledger Repo)]
    AGREEMENTS[(Agreements Repo)]
    VAULT[(Obsidian Governance Vault)]

    ID --> AUTH
    AUTH --> WF
    TAX --> VAL
    VAL --> WF

    WF --> LEDGER
    WF --> AGREEMENTS
    WF --> VAULT
