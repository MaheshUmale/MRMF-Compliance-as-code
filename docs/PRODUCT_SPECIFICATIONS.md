# Product Specifications & Functional Capabilities
## RBI Model Risk Management (MRM) Compliance-as-Code Platform

---

## 1. Executive Product Overview
The **RBI MRM Compliance-as-Code Platform** is an enterprise-grade quantitative risk governance application designed for Scheduled Commercial Banks, All-India Financial Institutions (AIFIs), and Tier-1 NBFCs operating in India and cross-border financial centers.

### Target Personas & Primary Use Cases

| Persona | Title / Division | Primary In-App Activities | Key In-App Views |
|---|---|---|---|
| **USR-CRO-0001** | Chief Risk Officer (Senior Management) | Tier-1 model approvals, Four-eyes credit sign-offs, Emergency failovers, Board return digital attestation | All Views (Full Executive Authority) |
| **USR-IMV-3309** | Lead Independent Model Validator (2nd Line) | Benchmark stress testing, Out-Of-Time (OOT) test suites, KS/AUC certification | Blueprints, Workflows, Audit |
| **USR-CREDIT-4412**| Senior Wholesale Credit Underwriter (1st Line) | Corporate loan underwriting (> ₹50 Cr), LEI cross-verification, SHAP feature review | Corporate Lending, Workflows |
| **USR-TRSY-8820** | Head of Global Treasury & Nostro Clearing | Intraday Nostro monitoring (USD, EUR, GBP, JPY), Drift analysis, Challenger failovers | Cross-Border Liquidity, Workflows |
| **USR-QUANT-7721** | Model Development Quant (1st Line Builder) | Model registration, feature engineering, CI/CD policy-as-code configuration | Blueprints, Workflows |
| **USR-RBI-9901** | RBI Supervisory Inspector (3rd Line Audit) | On-site examination, cryptographic ledger verification, Form MRM-CIB-01 inspection | Regulatory Returns, Audit Ledger |

---

## 2. Core Functional Modules

### Module 1: Compliance-as-Code Blueprints & Model Inventory
* **Model Registry**: Central repository of all production, staging, and retired quantitative models.
* **Automatic Tiering Engine**: Rules assign Tier-1 Critical status if credit exposure exceeds ₹50 Crores or intraday liquidity operations exceed ₹100 Crores.
* **Independent Model Validation (IMV) Pipeline**:
  * Evaluates Kolmogorov-Smirnov ($KS \ge 40.0\%$).
  * Evaluates Area Under Curve ($AUC \ge 0.75$).
  * Evaluates Brier score calibration accuracy ($\le 0.10$).
* **Hot Challenger Pre-Binding**: Enforces zero-downtime architecture by requiring every Tier-1 Champion model to have a validated Challenger model bound in standby.

### Module 2: Automated Corporate Credit Underwriting & SHAP Explainability Engine
* **Entity Verification**: Validates Legal Entity Identifier (LEI) and cross-checks GSTN filings against financial statements.
* **Basel III A-IRB PD/LGD Scoring**: Evaluates borrower financial vector (DSCR, Debt/Equity, Promoter Pledge %, EBITDA margin, Working Capital Days).
* **Deterministic SHAP Decomposition**: Calculates marginal risk contribution for each feature, displaying positive (mitigating) and negative (elevating) waterfall charts.
* **Statutory Adverse Action Disclosures**:
  * `RBI-AAC-012`: Elevated Share Encumbrance (Promoter pledge $> 12\%$).
  * `RBI-AAC-008`: Tight Debt Service Buffer (DSCR $< 1.30x$).
  * `RBI-AAC-019`: Stretched Working Capital Cycle ($> 120$ days).
* **Mandatory Mitigation Covenants**: Recommends legally binding covenants (e.g. personal guarantees, debt-service reserve accounts, margin call triggers).
* **Four-Eyes Maker-Checker Sanctioning**: Enforces segregation between Credit Underwriter and Chief Risk Officer.

### Module 3: Cross-Border Liquidity Drift & Autonomous Failover
* **Streaming Telemetry**: Monitors Nostro balances across USD (JPMorgan Chase NY), EUR (Deutsche Bank Frankfurt), GBP (HSBC London), and JPY (MUFG Tokyo).
* **15-Minute Sliding PSI Sensors**: Evaluates distribution shifts on real-time transaction velocities.
* **Autonomous Circuit Breakers**:
  * $PSI < 0.10$: Normal.
  * $0.10 \le PSI < 0.25$: Warning alert to Treasury Head.
  * $PSI \ge 0.25$ or $LCR < 100\%$: Circuit breaker trips; triggers automated champion-challenger failover and reserve sweep.
* **Hitless Failover**: Reroutes inference to the pre-calibrated challenger model in $< 50$ milliseconds.
* **Reserve Buffer Sweep**: Restores Nostro liquidity buffers above $110\%$ via RBI domestic facilities.

### Module 4: Supervisory Reporting & Gemini AI Auditor
* **Quarterly Return Synthesis (Form MRM-CIB-01)**: Aggregates model inventories, scoring volumes, validation metrics, drift incidents, and adverse action counts.
* **Gemini AI Supervisory Specialist**: Synthesizes an objective, inspection-grade audit memorandum assessing model vulnerability, macroeconomic sensitivity, and governance compliance.
* **Board Digital Attestation**: Enables the Chief Risk Officer to apply a SHA-256 digital signature certifying the accuracy of the filing.
* **Filing Dispatch**: Formats return payloads for the RBI DAKSH electronic supervisory portal.

### Module 5: Cryptographic Audit Ledger & Forensic Examiner
* **Tamper-Evident Hashing**: Computes SHA-256 digests over all inference inputs, outputs, SHAP vectors, model versions, and timestamps.
* **Integrity Verifier**: Allows supervisory auditors to verify ledger blocks cryptographically.
* **Filter & Search**: Allows searching by borrower LEI, model code, or date range.

### Module 6: Interactive System Workflows & Governance Simulator
* **Interactive Sequenced Workflows**: Step-by-step interactive walkthrough of 5 institutional banking workflows.
* **Auto-Play Simulation**: Automated lifecycle walkthrough for presentations and training.
* **Live Payload Inspector**: Real-time JSON payload and cryptographic digest inspector for each step.
* **RBI Circular Cross-Walk**: Maps each step to the exact paragraph of the RBI Draft MRM guidelines.

---

## 3. Failure Handling & Resilience Matrix

| Failure Mode | System Behavior | Recovery Procedure |
|---|---|---|
| **Data Ingestion Feed Interrupted** | Telemetry bus switches to fallback SWIFT GPI API; raises P1 alert. | Re-establishes primary socket; backfills missing messages. |
| **Model Validation Gate Failure ($KS < 40\%$)** | CI/CD build fails; model promotion blocked; CRO notified. | Developer recalibrates features and re-submits to IMV. |
| **Nostro PSI Drift Spike ($\ge 0.25$)** | Circuit breaker trips; traffic routes to Hot Challenger; alerts sent. | Challenger operates with $+200$ bps haircut until Champion is recalibrated. |
| **Audit Ledger Digest Mismatch** | Tamper alarm sounds; block flagged as CORRUPTED; supervisory alert. | Forensic examination of database transaction logs. |
| **Gemini AI Service Timeout** | System falls back to pre-rendered statutory regulatory memorandum template. | Automatic retry with exponential backoff on subsequent requests. |
