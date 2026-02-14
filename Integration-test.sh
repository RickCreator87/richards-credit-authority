### Integration Tests

```bash
# Run full scenario tests
npm run test:integration

# Test scenario: Create Account → Fund → Borrow → Repay
npm run test:scenario -- --name loan-lifecycle
```

### Chaos Testing

```bash
# Run chaos scenarios
npm run chaos:run

# Specific chaos scenarios
npm run chaos:run -- --scenarios default-surge,early-payment-spike
```
