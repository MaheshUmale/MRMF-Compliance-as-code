# Architectural Decision Records (ADRs)
## RBI Model Risk Management (MRM) Compliance-as-Code Platform

---

### Table of Contents
1. [ADR-001: Declarative Policy Enforcement via CI/CD Policy-as-Code](#adr-001-declarative-policy-enforcement-via-cicd-policy-as-code)
2. [ADR-002: Deterministic Local SHAP Explainability Engine](#adr-002-deterministic-local-shap-explainability-engine)
3. [ADR-003: Real-Time Sliding-Window Streaming Telemetry & Autonomous Circuit Breaker](#adr-003-real-time-sliding-window-streaming-telemetry--autonomous-circuit-breaker)
4. [ADR-004: Cryptographic SHA-256 Hashing for Supervisory Audit Ledger](#adr-004-cryptographic-sha-256-hashing-for-supervisory-audit-ledger)
5. [ADR-005: Strict Four-Eyes Segregation of Duties (RBAC Matrix)](#adr-005-strict-four-eyes-segregation-of-duties-rbac-matrix)
6. [ADR-006: Server-Side Gemini AI Integration for Supervisory Return Synthesis](#adr-006-server-side-gemini-ai-integration-for-supervisory-return-synthesis)

---

### ADR-001: Declarative Policy Enforcement via CI/CD Policy-as-Code

* **Status**: ACCEPTED
* **Date**: 2026-09-04
* **Decision Drivers**:
  * RBI Draft MRM Circular Section 3.1 & 4.1 requiring formal model inventory, validation gates, and pre-deployment certification.
  * Prevention of undocumented or unvalidated models reaching production environments.
* **Context**:
  Historically, model deployment required retrospective review meetings and Word/Excel sign-off documents. This model frequently resulted in uncalibrated or unvalidated models being promoted by engineering teams under tight commercial deadlines.
* **Decision**:
  Embed declarative, machine-readable validation policies into the CI/CD pipeline. No model container can be packaged, tagged, or deployed without passing automated gates:
  1. Automated Kolmogorov-Smirnov test: $KS \ge 40.0\%$.
  2. Automated Discriminatory Power test: $AUC \ge 0.75$.
  3. Feature Schema and Metadata completeness check.
  4. Separation of duties verification (Developer ID $\neq$ Validator ID).
* **Consequences**:
  * *Positive*: Deployment is blocked automatically if mathematical or governance policies are violated; audit trail is generated automatically.
  * *Negative*: Emergency hotfixes must still traverse validation pipelines, requiring emergency fast-track validation procedures.
* **Compliance Mapping**: RBI Draft MRM Para 3.2, 4.1.

---

### ADR-002: Deterministic Local SHAP Explainability Engine

* **Status**: ACCEPTED
* **Date**: 2026-09-04
* **Decision Drivers**:
  * RBI Fair Lending Practices & Adverse Action Mandates.
  * Requirement for borrower-facing transparency on credit sanctions $> ₹50$ Crores.
* **Context**:
  Gradient-boosted decision trees and ensemble algorithms used in corporate credit assessment function as black boxes. Traditional global feature importance measures (e.g. Gini importance) explain the model overall, but cannot explain why an individual loan was conditionally approved or declined.
* **Decision**:
  Implement local Shapley Additive exPlanations (SHAP) executed deterministically for every corporate credit application. Total SHAP feature vector contributions must sum to the log-odds of the score. Risk-elevating variables that cross threshold limits automatically trigger standardized Adverse Action Codes (e.g., `RBI-AAC-012`).
* **Consequences**:
  * *Positive*: Complete transparency for borrowers and supervisory examiners; eliminate discrimination or bias; generate actionable mitigation covenants.
  * *Negative*: Higher computational latency per scoring request compared to raw inference (mitigated by TreeSHAP optimizations).
* **Compliance Mapping**: RBI Draft MRM Para 4.2(b), RBI Large Exposures Framework.

---

### ADR-003: Real-Time Sliding-Window Streaming Telemetry & Autonomous Circuit Breaker

* **Status**: ACCEPTED
* **Date**: 2026-09-04
* **Decision Drivers**:
  * RBI Master Direction on Intraday Liquidity Risk Management & Nostro Buffers.
  * Rapid market fluctuations causing forecasting drift in Nostro clearing balances.
* **Context**:
  Cross-border clearing accounts (USD in New York, EUR in Frankfurt, GBP in London) can deplete rapidly during macroeconomic stress. Batch-processing daily drift audits identifies liquidity depletion hours after losses occur.
* **Decision**:
  Deploy high-frequency streaming telemetry over 15-minute sliding windows calculating the Population Stability Index (PSI).
  * If $PSI \ge 0.25$ or $LCR < 100\%$, trip an automated circuit breaker.
  * Execute zero-downtime hot failover to a pre-calibrated, volatility-damped challenger model.
  * Automatically trigger a liquidity sweep from domestic RBI reserve facilities.
* **Consequences**:
  * *Positive*: Protects intraday bank solvency and eliminates human reaction latency during clearing crises.
  * *Negative*: Requires pre-allocating compute and continuous calibration for hot challenger models.
* **Compliance Mapping**: RBI Master Direction on Intraday Liquidity Management, Para 4.4, 5.2.

---

### ADR-004: Cryptographic SHA-256 Hashing for Supervisory Audit Ledger

* **Status**: ACCEPTED
* **Date**: 2026-09-04
* **Decision Drivers**:
  * Section 5.1 of RBI MRM Framework: Non-repudiation and immutable traceability.
  * Supervisory on-site examination verification requirements.
* **Context**:
  Traditional relational database audit logs can be modified or truncated by database administrators, leaving banks vulnerable to insider tampering or regulatory sanctions during inspections.
* **Decision**:
  Generate an immutable cryptographic digest for every inference:
  $$\text{Hash} = \text{SHA-256}(\text{Inputs} \,\|\, \text{ModelVersion} \,\|\, \text{Score} \,\|\, \text{SHAP} \,\|\, \text{Timestamp})$$
  Store this digest in a tamper-evident sequential audit ledger. Provide an on-site examiner verification console that recomputes hashes from raw records to mathematically prove ledger integrity.
* **Consequences**:
  * *Positive*: Mathematical proof of tamper-resistance; simplifies external RBI inspection cycles.
  * *Negative*: Minimal storage overhead for cryptographic hashes.
* **Compliance Mapping**: RBI Draft MRM Para 5.1, Information Technology Act (Digital Signatures).

---

### ADR-005: Strict Four-Eyes Segregation of Duties (RBAC Matrix)

* **Status**: ACCEPTED
* **Date**: 2026-09-04
* **Decision Drivers**:
  * Pillar 2 Supervisory Guidelines on Three Lines of Defense.
  * Prevention of self-approval by model developers and credit underwriters.
* **Context**:
  In many institutions, developers possess permissions to deploy models, or underwriters can sanction loans without second-line risk validation.
* **Decision**:
  Enforce mathematical role-based access control (RBAC):
  * **Line 1 (Developer/Underwriter)**: Cannot approve models; cannot finalize credit sanctions $> ₹50$ Cr without Checker.
  * **Line 2A (IMV Lead)**: Cannot write model code; holds exclusive authority to certify mathematical validity.
  * **Line 2B (Chief Risk Officer)**: Holds exclusive authority for Tier-1 approvals, emergency failovers, and supervisory attestations.
  * **Line 3 (RBI Auditor)**: Read-only cryptographic inspection access without mutation privileges.
* **Consequences**:
  * *Positive*: Complete compliance with regulatory maker-checker standards; eliminates operational fraud.
  * *Negative*: Requires multiple stakeholders for critical actions.
* **Compliance Mapping**: RBI Draft MRM Para 4.1, BCBS Corporate Governance Guidelines.

---

### ADR-006: Server-Side Gemini AI Integration for Supervisory Return Synthesis

* **Status**: ACCEPTED
* **Date**: 2026-09-04
* **Decision Drivers**:
  * Requirement for quarterly Department of Supervision (DoS) Model Governance returns (Form MRM-CIB-01).
  * Extreme manual labor involved in synthesizing hundreds of model validation and drift reports.
* **Context**:
  Synthesizing quarterly regulatory returns across multiple wholesale divisions requires 4 to 6 weeks of manual cross-department reconciliation.
* **Decision**:
  Utilize server-side Google Gemini models (`@google/genai` SDK) to ingest quarterly quantitative telemetry (KS, AUC, PSI distributions, drift incidents, adverse action frequencies) and generate an inspection-grade Supervisory Audit Memorandum matching RBI statutory standards.
* **Consequences**:
  * *Positive*: Reduces quarterly return synthesis time from weeks to seconds while maintaining objective, rigorous audit standards.
  * *Negative*: Requires server-side API key management and fallback templates if the external service is unreachable.
* **Compliance Mapping**: RBI Department of Supervision (DoS) Quarterly Regulatory Returns.
