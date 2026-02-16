


### governance/review-procedure.md
```markdown
# Richards Credit Authority - Review Procedure

**Document ID:** RCA-GOV-REV-001  
**Version:** 1.0.0  
**Effective Date:** January 1, 2026  
**Owner:** Chief Risk Officer  
**Review Cycle:** Annual

---

## 1. Purpose

This document establishes standardized review procedures for Richards Credit Authority (RCA) to ensure quality, compliance, and continuous improvement across all operations. These procedures apply to credit decisions, operational processes, documentation, and system changes.

---

## 2. Review Types

### 2.1 Credit Review
Evaluation of loan decisions, underwriting quality, and portfolio performance.

### 2.2 Operational Review
Assessment of process efficiency, control effectiveness, and resource utilization.

### 2.3 Compliance Review
Verification of regulatory adherence, policy compliance, and risk management.

### 2.4 Technical Review
Examination of system changes, security controls, and data integrity.

### 2.5 Documentation Review
Validation of policy accuracy, procedure completeness, and regulatory alignment.

---

## 3. Credit Review Procedures

### 3.1 Pre-Funding Review (Quality Control)

**Objective**: Verify loan decisions meet quality standards before funding.

**Scope**: Random sampling plus targeted selection based on risk factors.

**Sampling Methodology**:
- Random: 10% of all approved loans
- Targeted: 100% of loans with:
  - Exceptions to policy
  - High-risk characteristics
  - New underwriter approvals
  - Jumbo loan amounts (>$1M)

**Review Team**: Quality Control Analysts (independent of production)

**Timeline**: Within 24 hours of approval, prior to funding.

**Review Checklist**:

| Category | Items | Weight |
|----------|-------|--------|
| Credit Analysis | Credit report review, score validation, tradeline analysis | 20% |
| Income Verification | Documentation completeness, calculation accuracy | 20% |
| Asset Verification | Source of funds, seasoning, large deposits | 15% |
| Collateral | Appraisal review, value reasonableness, property eligibility | 15% |
| Compliance | Disclosure timing, regulatory adherence, fair lending | 20% |
| Documentation | File completeness, signature verification, dates | 10% |

**Defect Rating**:
- **Critical**: Material misrepresentation, fraud, or regulatory violation
- **Major**: Significant guideline deviation without proper authority
- **Minor**: Documentation omission or clerical error
- **Informational**: Best practice recommendation

**Disposition**:
- **Pass**: No material defects, proceed to funding
- **Pass with Conditions**: Minor defects, clear conditions before funding
- **Fail**: Material defects, escalate to QC Manager and Underwriting Manager

### 3.2 Post-Close Credit Review

**Objective**: Validate funded loans and identify trends.

**Frequency**: Monthly

**Sample Size**: 10% of prior month's production (minimum 50 files)

**Review Elements**:
- Underwriting decision accuracy
- Documentation completeness
- Compliance with approval conditions
- Data integrity in system of record

**Reporting**:
- Individual file reports
- Monthly summary statistics
- Trend analysis
- Underwriter scorecards

### 3.3 Portfolio Review

**Objective**: Assess portfolio performance and risk characteristics.

**Frequency**: Quarterly

**Review Committee**: Risk Committee

**Analysis Components**:
- Delinquency trends by product, geography, vintage
- Credit score migration
- Loan modification activity
- Loss severity analysis
- Concentration risk assessment

**Action Items**:
- Policy adjustments
- Underwriting guideline updates
- Pricing modifications
- Risk limit adjustments

---

## 4. Operational Review Procedures

### 4.1 Process Review

**Objective**: Evaluate operational efficiency and control effectiveness.

**Frequency**: Bi-annual for core processes

**Methodology**:
1. Process mapping and documentation review
2. Control testing (design and operating effectiveness)
3. Key performance indicator analysis
4. Stakeholder interviews
5. Benchmarking against industry standards

**Review Areas**:
- Loan origination workflow
- Servicing operations
- Default management
- Vendor management
- Technology operations

**Deliverables**:
- Process assessment report
- Control gap analysis
- Efficiency recommendations
- Implementation roadmap

### 4.2 Key Performance Indicator (KPI) Review

**Review Frequency**: Monthly

**KPI Categories**:

| Category | Metrics | Target | Reviewer |
|----------|---------|--------|----------|
| Efficiency | Cycle time, cost per loan, productivity | Industry top quartile | Operations |
| Quality | Error rates, rework percentage, defect density | <2% | Quality Control |
| Customer | Satisfaction scores, complaint rates, NPS | >50 | Customer Experience |
| Financial | Cost to originate, pull-through rate, revenue/employee | Budget +5% | Finance |

**Escalation Triggers**:
- 3 consecutive months below target
- Single month >20% below target
- Regulatory or compliance impact

---

## 5. Compliance Review Procedures

### 5.1 Regulatory Compliance Review

**Objective**: Ensure adherence to applicable laws and regulations.

**Frequency**: Continuous monitoring with quarterly assessments

**Review Areas**:
- Truth in Lending (TILA)
- Real Estate Settlement Procedures (RESPA)
- Equal Credit Opportunity (ECOA)
- Fair Housing Act (FHA)
- Home Mortgage Disclosure Act (HMDA)
- Gramm-Leach-Bliley Act (GLBA)
- Bank Secrecy Act (BSA)
- State-specific requirements

**Testing Methodology**:
- Sample testing (statistically valid)
- Transaction testing
- Policy and procedure review
- Training effectiveness assessment

**Findings Classification**:
- **Level 1**: Material weakness requiring immediate remediation
- **Level 2**: Significant deficiency requiring management attention
- **Level 3**: Control gap requiring process improvement
- **Level 4**: Observation for monitoring

### 5.2 Fair Lending Review

**Objective**: Monitor for discriminatory patterns or practices.

**Frequency**: Quarterly analysis, annual comprehensive review

**Analysis Components**:
- Disparate treatment testing (applicants with similar credit profiles)
- Disparate impact analysis (policy effects on protected classes)
- Steering analysis (product placement)
- Pricing analysis (rate and fee disparities)
- Redlining analysis (geographic patterns)

**Data Elements**:
- Protected class information (where legally permissible)
- Application data
- Decision outcomes
- Pricing details
- Geographic data

**Remediation**:
- Policy changes
- Training enhancements
- Pricing adjustments
- Community outreach

---

## 6. Technical Review Procedures

### 6.1 Code Review

**Objective**: Ensure software quality, security, and maintainability.

**Scope**: All production code changes

**Review Requirements**:
| Change Type | Reviewers Required | Approval Required |
|-------------|-------------------|-------------------|
| Critical path | 2 senior developers + security | Tech Lead |
| Feature | 1 senior developer | Senior Developer |
| Bug fix | 1 peer developer | Peer |
| Documentation | 1 technical writer | Tech Lead |

**Review Checklist**:
- [ ] Code follows style guidelines
- [ ] Security vulnerabilities addressed
- [ ] Performance implications considered
- [ ] Unit tests included and passing
- [ ] Integration tests included
- [ ] Documentation updated
- [ ] No hardcoded credentials
- [ ] Error handling implemented
- [ ] Logging appropriate
- [ ] Backward compatibility maintained

### 6.2 Security Review

**Objective**: Identify and mitigate security risks.

**Types**:
- **Architecture Review**: Design-phase security assessment
- **Code Review**: Security-focused code examination
- **Penetration Testing**: Annual external assessment
- **Vulnerability Scanning**: Monthly automated scans

**Security Review Board**:
- Chief Information Security Officer (Chair)
- Security Architect
- Application Security Engineer
- Compliance Officer
- Legal Counsel (for privacy issues)

---

## 7. Documentation Review Procedures

### 7.1 Policy Review

**Objective**: Maintain accurate, current, and compliant policies.

**Frequency**:
- Annual comprehensive review
- Ad hoc for regulatory changes
- Triggered by significant events

**Review Process**:
1. **Initiation**: Compliance or Risk Management identifies need
2. **Research**: Regulatory updates, industry best practices
3. **Drafting**: Policy owner updates document
4. **Review**: Stakeholder review (Legal, Compliance, Operations)
5. **Approval**: Authorized signatory approval
6. **Communication**: Distribution and training
7. **Implementation**: Effective date enforcement

### 7.2 Procedure Review

**Objective**: Ensure procedures reflect actual practices.

**Frequency**: Bi-annual

**Review Methodology**:
- Observation of actual processes
- Interviews with process participants
- Comparison to documented procedures
- Gap identification and resolution

---

## 8. Review Governance

### 8.1 Review Calendar

| Review Type | Frequency | Responsible Party | Due Date |
|-------------|-----------|-------------------|----------|
| Pre-Funding QC | Daily | QC Team | Before funding |
| Post-Close QC | Monthly | QC Manager | 15th of month |
| Portfolio Review | Quarterly | Risk Committee | Quarter + 30 days |
| Operational Review | Bi-annual | Operations Manager | June 30, Dec 31 |
| Compliance Review | Quarterly | Compliance Officer | Quarter + 45 days |
| Fair Lending Review | Quarterly | Fair Lending Officer | Quarter + 30 days |
| Technical Security Review | Annual | CISO | Annually |
| Policy Review | Annual | Policy Owner | Anniversary date |

### 8.2 Review Committees

**Credit Committee**:
- Chief Risk Officer (Chair)
- Chief Underwriter
- Senior Underwriters
- Quality Control Manager
- Compliance Officer

**Risk Committee**:
- Chief Executive Officer (Chair)
- Chief Risk Officer
- Chief Financial Officer
- Chief Operating Officer
- General Counsel

**Technology Committee**:
- Chief Information Officer (Chair)
- Chief Information Security Officer
- Chief Technology Officer
- Enterprise Architect
- Business Unit Representatives

---

## 9. Review Documentation

### 9.1 Review Workpapers

**Required Elements**:
- Review scope and objectives
- Sampling methodology
- Evidence collected
- Analysis performed
- Findings and conclusions
- Recommendations
- Management responses
- Follow-up tracking

**Retention**: 7 years for credit reviews, 3 years for operational reviews

### 9.2 Review Reports

**Distribution**:
- Executive Summary: Board and Senior Management
- Detailed Findings: Department Heads
- Individual File Reviews: Responsible Underwriters/Processors

**Report Contents**:
- Executive summary
- Scope and methodology
- Findings (rated by severity)
- Recommendations with timelines
- Management responses
- Appendices (supporting data)

---

## 10. Issue Management

### 10.1 Finding Tracking

**Tracking System**: Centralized issue tracking database

**Fields**:
- Finding ID
- Review type and date
- Description
- Severity rating
- Root cause
- Responsible party
- Target remediation date
- Status (Open/In Progress/Closed)
- Verification method

### 10.2 Escalation

**Timeline**:
- Level 1 findings: Immediate notification to CRO
- Level 2 findings: 24-hour notification to department head
- Level 3 findings: Weekly tracking
- Level 4 findings: Monthly monitoring

**Overdue Escalation**:
- 7 days overdue: Department head notification
- 14 days overdue: CRO notification
- 30 days overdue: Board Risk Committee notification

---

## 11. Quality Assurance

### 11.1 Review Quality Metrics

- **Review Accuracy**: % of findings validated by subsequent review
- **Review Timeliness**: % of reviews completed within SLA
- **Finding Closure**: % of findings closed within target date
- **Repeat Findings**: % of findings that recur within 12 months

### 11.2 Reviewer Qualifications

**Minimum Requirements**:
- Relevant industry experience (3+ years)
- Professional certification (where applicable)
- Annual training (16 hours minimum)
- Independence from reviewed activities

---

## 12. Continuous Improvement

### 12.1 Review Process Enhancement

- Annual assessment of review procedures
- Industry benchmarking
- Technology enablement
- Stakeholder feedback incorporation

### 12.2 Lessons Learned

- Post-review debriefs
- Trend analysis
- Best practice sharing
- Training program updates

---

## 13. Appendices

### Appendix A: Review Checklist Templates
[Standardized checklists by review type]

### Appendix B: Sampling Methodology
[Statistical sampling procedures]

### Appendix C: Report Templates
[Standard report formats]

### Appendix D: Issue Tracking Procedures
[Detailed tracking system instructions]

---

**Approval:**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Chief Risk Officer | [REDACTED] | 2024-01-01 | ___________ |
| Chief Compliance Officer | [REDACTED] | 2026-01-01 | ___________ |
| Chief Operating Officer | [REDACTED] | 2026-01-01 | ___________ |

---

*This document is subject to annual review and update.*
```
