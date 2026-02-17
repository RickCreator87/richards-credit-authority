Here is the canonical COMPETENCY_ENGINE.md file – a single source of truth ready to be placed in your .github or docs folder. It includes all tables, definitions, and workflows in a clean, au```markdown
# Unified Governance & Promotion Framework
## The Competency Engine (Audit‑Grade Specification)

**Version:** 1.0  
**Status:** Active  
**Last Updated:** 2026-02-16  
**Owner:** Org Governance Team  

---

## Overview
This document defines the **core competencies, promotion gates, and cross‑team validation** required for every contributor. It is a living specification – all changes must be proposed via PR and reviewed by the Governance Council.

---

## 1. Horizontal Competency Threads (The Four Non‑Negotiables)
*Every contributor – regardless of team – must demonstrate mastery across these four horizontal threads. They define **how** work is executed, not **what** work is done.*

### 1.1 Governance & Audit
| Level       | Definition     | Observable Behaviors                                                                 |
|-------------|----------------|--------------------------------------------------------------------------------------|
| Apprentice  | Execution      | Follows checklists; produces clean, complete metadata; no missing tags.              |
| Journeyman  | Autonomy       | Identifies gaps; self‑corrects audit trails; improves checklists.                    |
| Master      | Strategy       | Designs audit frameworks; defines “Evidence of Quality”; sets governance standards.  |

### 1.2 Documentation
| Level       | Definition     | Observable Behaviors                                                                 |
|-------------|----------------|--------------------------------------------------------------------------------------|
| Apprentice  | Execution      | Records what was done (tickets, logs).                                               |
| Journeyman  | Autonomy       | Explains how and why (runbooks, KBs, diagrams).                                      |
| Master      | Strategy       | Defines IA, style guides, documentation standards; reviews for clarity.              |

### 1.3 Communication
| Level       | Definition     | Observable Behaviors                                                                 |
|-------------|----------------|--------------------------------------------------------------------------------------|
| Apprentice  | Execution      | Reports status; asks for help early.                                                 |
| Journeyman  | Autonomy       | Communicates risks; proposes options; manages expectations.                          |
| Master      | Strategy       | Negotiates cross‑team priorities; mentors seniors; resolves conflicts.               |

### 1.4 Tool Literacy
| Level       | Definition     | Observable Behaviors                                                                 |
|-------------|----------------|--------------------------------------------------------------------------------------|
| Apprentice  | Execution      | Uses tools as instructed (CRUD).                                                     |
| Journeyman  | Autonomy       | Automates repetitive tasks; optimizes workflows.                                     |
| Master      | Strategy       | Selects tooling stack; ensures integration; defines lifecycle.                       |

---

## 2. Promotion Readiness & Evidence Artifacts
*Promotion is not subjective. It is evidence‑driven and audit‑verifiable.*

### 2.1 Apprentice → Journeyman (The Independence Gate)
**Ready Signal:** Contributor operates with **<10% oversight** on standard tasks.

**Mandatory Evidence Artifacts:**
- **Ticket History:** 20+ successfully closed tasks with complete metadata.
- **Runbook Contribution:** One new or significantly updated runbook/KB article.
- **Peer Review Log:** Participation in 5+ peer reviews (code, docs, design).

### 2.2 Journeyman → Master (The Architect Gate)
**Ready Signal:** Contributor is sought out by other teams; can independently manage a major failure or pivot.

**Mandatory Evidence Artifacts:**
- **Strategic Proposal:** An RFC/design doc that resulted in measurable improvement.
- **Mentorship Record:** Documented growth of at least one Apprentice.
- **Incident/Audit Leadership:** Led a post‑mortem or compliance audit to completion.

---

## 3. Team‑to‑Team Dependency Map (Cross‑Functional Interfaces)
*A Master must understand not only their domain but the interfaces that bind teams together.*

| Lead Team       | Dependent Team  | Interface / Artifact                     |
|-----------------|-----------------|------------------------------------------|
| PMT             | Development     | Sprint Backlog (Prioritized Truth)       |
| Development     | SRE/DevOps      | Deployment Manifest & Golden Signals     |
| Security        | Everyone        | SRA & SCA Scan                           |
| Data            | AI/Automation   | Clean Feature Set & Data Lineage         |
| Tech Writing    | Customer Service| Internal Knowledge Base                  |
| Maintenance     | Product (PMT)   | Maintenance Window Approval              |
| HR              | All Leads       | Performance Calibration Record            |

*This map becomes the **cross‑team validation layer** for Master‑level promotions.*

---

## 4. Badge Authority Integration (Governance‑Aligned Credentialing)
*Badges are not decorative – they are governance signals.*

- **Apprentice Badge** – Automatically issued upon completing Tool Literacy + Policy onboarding.
- **Journeyman Badge** – Requires same‑team Master sign‑off on Independence Gate artifacts.
- **Master Badge** – Requires cross‑team Master sign‑off from a dependent team (see Section 3). Ensures architectural decisions align with ecosystem interfaces.

*This creates a **federated trust network** across the org.*

---

## 5. Automated Evaluation Workflow (The Digital Twin of Performance)
*Your org becomes self‑auditing through automated triggers.*

### 5.1 Metadata Check
If a PR/ticket closes without required tags (Documentation, Security, Risk)  
→ Contributor is flagged for a **Governance Refresher**.

### 5.2 Velocity Tracker
If a Journeyman’s MTTR exceeds baseline for 2 consecutive sprints  
→ A **Capability Review** is scheduled with HRBP.

### 5.3 Innovation Trigger
When a contributor submits a Strategic Proposal to the Master Repo  
→ The **Master‑Level Evaluation Workflow** initiates automatically.

*This creates a closed‑loop performance system – no surprises, no ambiguity.*

---

## Revision History
| Date       | Version | Author | Change Description |
|------------|---------|--------|---------------------|
| 2026-02-16 | 1.0     | Governance Team | Initial release.   |

---

*This document is maintained in the `.github` repository. All pull requests must update the version and revision history.*
```

