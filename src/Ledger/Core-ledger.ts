Core Ledger (Double-Entry)

**Location**: `src/ledger/`

Immutable double-entry ledger enforcing `Assets = Liabilities + Equity`.

#### Features
- ACID-compliant transactions
- Event sourcing for full audit trail
- Real-time invariant checking
- Sub-second transaction settlement
- Multi-currency support

#### Transaction Example

```typescript
import { Ledger, Transaction, AccountType } from './src/ledger';

// Create a loan disbursement transaction
const transaction = new Transaction({
  id: "txn-001",
  timestamp: new Date(),
  entries: [
    {
      accountId: "loan-12345",
      accountType: AccountType.LOAN_RECEIVABLE,
      debit: 10000.00,
      credit: 0.00,
      currency: "USD"
    },
    {
      accountId: "bank-operating",
      accountType: AccountType.ASSET,
      debit: 0.00,
      credit: 10000.00,
      currency: "USD"
    }
  ],
  metadata: {
    type: "LOAN_DISBURSEMENT",
    loanId: "loan-12345",
    applicantId: "app-98765"
  }
});

// Post transaction
await Ledger.postTransaction(transaction);

// Verify invariant
const invariant = await Ledger.verifyInvariant();
console.log(`Ledger balanced: ${invariant.isBalanced}`);
```

