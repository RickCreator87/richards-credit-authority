```md
sequenceDiagram
    participant U as User / Founder
    participant WF as Workflow Engine
    participant VAL as Validation Rules
    participant AUTH as Authority Map
    participant LED as Loaner Ledger
    participant AGR as Agreements Repo
    participant TAX as Tax Rules

    U->>WF: Trigger new-loan workflow
    WF->>AUTH: Check required authority level
    AUTH-->>WF: Required level + approvals

    WF->>VAL: Run capacity_check + afr_minimum_interest
    VAL->>TAX: Fetch AFR + tax constraints
    TAX-->>VAL: AFR + rules
    VAL-->>WF: Validation result

    WF->>AGR: Draft agreement
    AGR-->>WF: Agreement ID

    WF->>LED: Create loan entry
    LED-->>WF: Ledger entry ID

    WF-->>U: Loan created + agreement + ledger refs
