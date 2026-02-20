# Compliance & Governance Framework

## Overview
This document outlines the operational standards for **Richard's Credit Authority**. It serves as the bridge between traditional KYC requirements and GitDigital's on-chain activities.

## Identity Verification (KYC)
All entities interacting with this authority must undergo verification through the following steps:
1. **Document Verification:** Government-issued ID.
2. **On-Chain Linkage:** Association of a specific Solana/Ethereum wallet address.
3. **Risk Scoring:** Assessment based on the internal `risk-profile.md` metrics.

## Anti-Money Laundering (AML)
* **Thresholds:** Any transaction exceeding $10,000 USD equivalent triggers a secondary manual audit.
* **Sanctions Screening:** All participant addresses are screened against global watchlists.

## Reporting
Tax obligations are tracked via the `tax-governance.md` file, ensuring all interest earned from private lending is reported to the appropriate authorities.
