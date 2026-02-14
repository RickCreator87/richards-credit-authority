Risk Scoring Engine

**Location**: `src/risk/`

Modular credit risk scoring with explainability and fairness checking.

#### Features
- Pluggable risk models
- Score explainability (JSON breakdown)
- Fairness testing (demographic parity)
- Model versioning (SemVer)
- Bureau data pipeline integration

#### Scoring Pipeline

```typescript
import { RiskScoringEngine, ModelStore, FairnessChecker } from './src/risk';

// Configure scoring pipeline
const pipeline = new RiskScoringEngine({
  models: [
    { id: "credit-score-model", weight: 0.30, version: "2.1.0" },
    { id: "payment-history-model", weight: 0.25, version: "1.8.0" },
    { id: "affordability-model", weight: 0.25, version: "3.0.0" },
    { id: "behavioral-model", weight: 0.20, version: "1.2.0" }
  ]
});

// Generate score
const score = await pipeline.calculateScore(applicantData);

// Get explainability report
const explanation = score.getExplanation();

// Check fairness
const fairness = await FairnessChecker.checkDemographicParity(score, protectedClasses);
```
