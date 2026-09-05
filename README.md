# RBI Model Risk Management (MRM) Compliance-as-Code Platform
### Institutional Banking Architecture for Commercial & Wholesale Banking (CIB)

[![Regulatory Standard](https://img.shields.io/badge/Regulatory%20Standard-RBI%20MRM%20Framework%202025-00bcd4?style=flat-square)](https://rbi.org.in)
[![Basel Standard](https://img.shields.io/badge/Basel%20Accords-Basel%20III%20%2F%20IV%20IRB-00897b?style=flat-square)](https://bis.org)
[![Security Standard](https://img.shields.io/badge/Integrity-SHA--256%20Cryptographic%20Audit%20Ledger-43a047?style=flat-square)]()
[![Model Governance](https://img.shields.io/badge/Explainability-Deterministic%20SHAP%20Attributions-3949ab?style=flat-square)]()
[![Four-Eyes](https://img.shields.io/badge/Controls-Four--Eyes%20Maker--Checker%20RBAC-f4511e?style=flat-square)]()

---

## Executive Summary & Regulatory Rationale

The **Reserve Bank of India (RBI)** issued comprehensive draft guidelines on **Model Risk Management (MRM)** to govern the escalating deployment of artificial intelligence, machine learning, and advanced quantitative algorithms across Regulated Entities (REs)—including Scheduled Commercial Banks, All-India Financial Institutions (AIFIs), and Tier-1 Non-Banking Financial Companies (NBFCs).

### The Critical Industry Problem
Historically, banking model governance has functioned as an **asynchronous, retrospective exercise**:
1. **Spreadsheet-Driven Inventories**: Models are tracked in static Excel ledgers with obsolete metadata, disconnected from production code repositories.
2. **Post-Hoc Manual Audits**: Model drift, algorithmic bias, and validation failures are discovered quarters or years after deployment during manual inspections.
3. **Black-Box Credit Decisions**: Complex gradient-boosted trees and neural networks sanitize loans without providing borrowers or supervisory bodies mathematically verifiable adverse action rationales.
4. **Silent FX & Liquidity Drift**: High-frequency intraday Nostro clearing flows diverge under macroeconomic stress, depleting statutory Liquidity Coverage Ratio (LCR) buffers before risk officers are alerted.
5. **Maker-Checker Breaches**: Developers retain production deployment privileges, violating statutory four-eyes segregation of duties.

### The Solution: Compliance-as-Code
The **RBI MRM Compliance-as-Code Platform** transforms regulatory compliance from a manual checklist into **declarative, automated, runtime-enforced software policies**:
* **Declarative CI/CD Gates**: Machine learning pipelines cannot compile or deploy models without automated validation of Kolmogorov-Smirnov ($KS \ge 40.0\%$), AUC-ROC ($\ge 0.75$), and demographic bias constraints.
* **Deterministic SHAP Explainability**: Every credit underwriting run (> ₹50 Cr) decomposes Probability of Default (PD) into exact additive Shapley vectors with mandatory statutory adverse action notices.
* **Continuous Streaming Drift Telemetry**: High-frequency 15-minute sliding sensors calculate Population Stability Index (PSI). Breaches ($\ge 0.25$) trip automated circuit breakers for zero-downtime champion-to-challenger failover.
* **Tamper-Evident Cryptographic Ledger**: Every inference, SHAP attribution, and validation decision is sealed with SHA-256 digests and timestamped in an immutable audit ledger.
* **Autonomous Supervisory Reporting (Form MRM-CIB-01)**: Generates statutory RBI returns with Gemini-powered supervisory inspection memorandums and digital Board attestation.

---

## Technical Documentation & User Guides Index

| Document | Description | Key Focus Areas |
|---|---|---|
| **[User Guide & How-To Manual](./docs/USER_GUIDE.md)** | Step-by-step onboarding guide with screenshots | 5-Minute Quickstart, UI Screenshots, Persona Guides, FAQs |
| **[System Architecture & Topology](./docs/ARCHITECTURE.md)** | Technical architecture & layer specifications | Cloud Run container, CI/CD policy gates, latency SLAs |
| **[Mathematical Rationale & Proofs](./docs/MATHEMATICAL_RATIONALE.md)** | Quantitative formulas and derivations | PSI/CSI (Kullback-Leibler), SHAP, KS, Basel III IRB, LCR |
| **[Architectural Decision Records (ADRs)](./docs/ADR.md)** | Formal ADR-001 through ADR-006 logs | Policy-as-Code, SHAP, Drift Telemetry, SHA-256, Gemini AI |
| **[Product Specifications](./docs/PRODUCT_SPECIFICATIONS.md)** | Enterprise functional breakdown | 6 core modules, API schemas, and resilience matrix |

---

## High-Level System Architecture & Topology

```
+--------------------------------------------------------------------------------------------------------------------+
|                                      INSTITUTIONAL CLIENT & REGULATORY FACING LAYER                               |
|                                                                                                                    |
|   +---------------------+   +-----------------------+   +----------------------+   +---------------------------+   |
|   |  Credit Underwriter |   |   IMV Validation Lead |   |  Chief Risk Officer  |   |    RBI External Auditor   |   |
|   |   (Maker / Line 1)  |   |     (2nd Line Assessor)|   | (Senior Signatory)   |   |    (3rd Line Supervisor)  |   |
|   +----------+----------+   +-----------+-----------+   +----------+-----------+   +-------------+-------------+   |
+--------------|--------------------------|--------------------------|-----------------------------|-----------------+
               |                          |                          |                             |
               v                          v                          v                             v
+--------------------------------------------------------------------------------------------------------------------+
|                                    APPLICATION API GATEWAY & RBAC FOUR-EYES ENFORCER                               |
|  - Role-Based Access Control (RBAC) Matrix       - Mutual TLS / OAuth 2.0 Client Tokens    - Strict Maker-Checker  |
+--------------------------------------------------------------------------------------------------------------------+
       |                                       |                                         |
       v                                       v                                         v
+-----------------------+       +-------------------------------+       +------------------------------------+
|   COMPLIANCE-AS-CODE  |       |   PRODUCTION INFERENCE &      |       |    STREAMING TELEMETRY & DRIFT     |
|   CI/CD POLICY ENGINE |       |   EXPLAINABILITY ENGINE       |       |    CIRCUIT-BREAKER BUS             |
+-----------------------+       +-------------------------------+       +------------------------------------+
| * Model Ledger & Tiers|       | * Wholesale Corporate Credit  |       | * 15-Min Sliding Inflow/Outflow    |
| * IMV Gate Checks     |       |   PD/LGD Scoring (> ₹50 Cr)   |       | * Continuous PSI & CSI Computations|
| * KS / AUC Thresholds |       | * Deterministic SHAP Engine   |       | * Automated Circuit Breakers       |
| * Declarative Rules   |       | * Adverse Action Generator    |       | * Zero-Downtime Challenger Routing |
+-----------------------+       +-------------------------------+       +------------------------------------+
       |                                       |                                         |
       +---------------------------------------+-----------------------------------------+
                                               |
                                               v
+--------------------------------------------------------------------------------------------------------------------+
|                                      ENTERPRISE DATA & CRYPTOGRAPHIC LEDGER                                        |
|  +-----------------------------------+  +------------------------------------+  +-------------------------------+  |
|  |     Model Metadata Repository     |  |   Immutable SHA-256 Audit Ledger   |  |   Core Treasury & Nostro DB   |  |
|  | (Weights, Feature Maps, OOT Data) |  | (Sealed Inferences & Decisions)   |  | (USD, EUR, GBP, JPY Balances) |  |
|  +-----------------------------------+  +------------------------------------+  +-------------------------------+  |
+--------------------------------------------------------------------------------------------------------------------+
                                               |
                                               v
+--------------------------------------------------------------------------------------------------------------------+
|                                   SUPERVISORY REPORTING & AI EXAMINATION GATEWAY                                   |
|  * Statutory Form MRM-CIB-01 Auto-Synthesis      * Gemini-Powered Supervisory Auditor      * RBI DAKSH / XBRL API  |
+--------------------------------------------------------------------------------------------------------------------+
```

---

## Detailed Component Architecture & Data Flow

### 1. Ingestion & Pre-Scoring Triangulation
* **Borrower Entity Validation**: Validates Legal Entity Identifiers (LEI) against the Global Legal Entity Identifier Foundation (GLEIF) repository.
* **Regulatory Reconciliation**: Cross-validates Goods and Services Tax Network (GSTN) returns, Ministry of Corporate Affairs (MCA) filings, and audited balance sheets. Reconciliations with variance $> 5.0\%$ trigger statutory warning flags.

### 2. Algorithmic PD/LGD Scoring & Macro-Stress Calibration
* Evaluates Debt Service Coverage Ratio (DSCR), Debt-to-Equity, Promoter Pledge %, Working Capital Cycle, and EBITDA margins.
* Implements the **Basel III Advanced Internal Ratings-Based (A-IRB)** formula, incorporating Through-The-Cycle (TTC) macroeconomic stress scenarios (e.g., $+150$ bps RBI repo hike, $25\%$ currency depreciation).
* Enforces a non-negotiable **Loss Given Default (LGD) floor of $45.0\%$** for corporate exposures.

### 3. Deterministic SHAP Explainability Engine
* Uses local **Shapley Additive exPlanations (SHAP)** to decompose the non-linear credit score log-odds into transparent marginal contributions:
$$\ln\left(\frac{PD}{1 - PD}\right) = \phi_0 + \sum_{i=1}^{M} \phi_i(x)$$
* Guarantees deterministic, reproducible attributions across identical borrower vectors.
* Generates mandatory **Statutory Adverse Action Codes** (e.g., `RBI-AAC-012: Elevated Share Encumbrance`) if specific risk factors cross statutory boundaries.

### 4. Real-Time Nostro Liquidity Telemetry & Circuit Breakers
* Continuously streams intraday SWIFT MT950 and Fedwire statements across clearing accounts:
  * **USD**: JPMorgan Chase, New York
  * **EUR**: Deutsche Bank, Frankfurt
  * **GBP**: HSBC, London
  * **JPY**: MUFG Bank, Tokyo
* Evaluates the **Population Stability Index (PSI)** in 15-minute rolling windows:
$$PSI = \sum_{k=1}^{K} \left( Actual_k - Expected_k \right) \times \ln\left(\frac{Actual_k}{Expected_k}\right)$$
* Automated Circuit-Breaker Thresholds:
  * $PSI < 0.10$: **Normal Stability** (Routine operations).
  * $0.10 \le PSI < 0.25$: **Elevated Watch** (Collateral haircut $+100$ bps, alerts to Treasury Head).
  * $PSI \ge 0.25$ or $LCR < 100\%$: **Critical Drift Breach** (Automated traffic rerouting to pre-calibrated hot challenger model and standing reserve liquidity sweeps).

### 5. Supervisory Reporting Gateway & Gemini AI Auditor
* Synthesizes all quarterly scoring logs, explainability distributions, and drift remediation records into **Form MRM-CIB-01**.
* Invokes server-side **Gemini AI** to perform deep qualitative evaluation of quantitative telemetry, producing a formal supervisory audit memorandum matching RBI Department of Supervision inspection standards.
* Facilitates cryptographic digital attestation by the **Chief Risk Officer** and exports filing-ready packages for the **RBI DAKSH** electronic supervisory portal.

---

## Mathematical Formulations & Quantitative Logic

### 1. Population Stability Index (PSI)
Used to quantify the degree of shift between a baseline (training) reference distribution and an observed (production runtime) sample:

$$PSI = \sum_{i=1}^{B} \left( P_{i} - Q_{i} \right) \cdot \ln\left(\frac{P_{i}}{Q_{i}}\right)$$

Where:
* $B$ is the number of distribution bins (typically 10 deciles).
* $P_i$ is the actual production frequency in bin $i$: $P_i = \frac{N_{actual, i}}{N_{actual, total}}$.
* $Q_i$ is the expected reference frequency in bin $i$: $Q_i = \frac{N_{ref, i}}{N_{ref, total}}$.

#### Regulatory Calibration Bounds
| PSI Range | Classification | Statutory Action |
|---|---|---|
| **$PSI < 0.10$** | Insignificant Drift | Normal operation; routine monitoring. |
| **$0.10 \le PSI < 0.25$** | Moderate Drift | Elevated surveillance; warning dispatched to IMV Lead. |
| **$PSI \ge 0.25$** | Critical Structural Shift | Circuit breaker trips; mandatory champion-challenger failover. |

---

### 2. Characteristic Stability Index (CSI)
Measures individual feature drift across discrete risk variables:

$$CSI_j = \sum_{k=1}^{K_j} \left( Actual_{j,k} - Expected_{j,k} \right) \cdot \ln\left(\frac{Actual_{j,k}}{Expected_{j,k}}\right)$$

Variables with $CSI_j \ge 0.20$ are flagged as primary root causes of model instability.

---

### 3. Kolmogorov-Smirnov (KS) Statistic
Evaluates the model's discriminatory power by determining the maximum vertical separation between the cumulative distribution functions of defaulters ($F_{bad}$) and non-defaulters ($F_{good}$):

$$KS = \max_{s} \left| F_{bad}(s) - F_{good}(s) \right| \times 100$$

* **RBI Minimum Gate Threshold**: $KS \ge 40.0\%$ for wholesale corporate credit scoring models. Models exhibiting $KS < 40.0\%$ are barred from promotion to production.

---

### 4. Area Under the Receiver Operating Characteristic (AUC-ROC)
Measures the ranking capability across all classification thresholds:

$$AUC = \int_{0}^{1} TPR(FPR^{-1}(t)) \, dt$$

* **Acceptable Production Standard**: $AUC \ge 0.75$.
* **Benchmark Target for Tier-1 Models**: $AUC \ge 0.85$.

---

### 5. Basel III Capital Requirement for Corporate Exposures (IRB Approach)
Capital adequacy requirements ($K$) are calculated using the asymptotic single-risk factor (ASRF) model:

$$K = \left[ LGD \times \Phi\left( \frac{\Phi^{-1}(PD) + \sqrt{R} \times \Phi^{-1}(0.999)}{\sqrt{1 - R}} \right) - (LGD \times PD) \right] \times \left( \frac{1 + (M - 2.5) \times b}{1 - 1.5 \times b} \right)$$

Where:
* $PD$ = Calibrated Through-The-Cycle Probability of Default.
* $LGD$ = Loss Given Default (regulatory minimum floor of $45\%$).
* $R$ = Asset correlation function for corporates:
  $$R = 0.12 \times \left( \frac{1 - e^{-50 \cdot PD}}{1 - e^{-50}} \right) + 0.24 \times \left[ 1 - \left( \frac{1 - e^{-50 \cdot PD}}{1 - e^{-50}} \right) \right]$$
* $b$ = Maturity adjustment factor: $b = (0.11852 - 0.05478 \times \ln(PD))^2$.
* $M$ = Effective facility maturity (standardized at 2.5 years).

---

### 6. Liquidity Coverage Ratio (LCR) Buffer Formula
To maintain solvency across high-value Nostro accounts under intraday stress:

$$LCR_{Nostro} = \frac{\text{Total Available High-Quality Liquid Clearing Assets}}{\text{Total Stressed Net Intraday Outflows over 30 Days}} \times 100\%$$

* **RBI Regulatory Floor**: $100.0\%$.
* **Internal Bank Operational Buffer**: $\ge 110.0\%$.

---

## Architectural Decision Records (ADRs)

### [ADR-001] Declarative Policy Enforcement via CI/CD Policy-as-Code
* **Status**: ACCEPTED
* **Context**: Traditional model governance relies on manual committee meetings and spreadsheets, creating a delay between model deployment and regulatory inspection.
* **Decision**: Embed declarative YAML/JSON policies directly into automated CI/CD pipelines. All Tier-1 models must pass automated validation (KS $\ge 40$, AUC $\ge 0.75$, zero missing feature tests) before production containerization.
* **Consequences**: Eliminates human approval bypasses; ensures code artifacts match validated mathematical weights.
* **RBI Alignment**: Section 3.1 & 4.1 of RBI Draft MRM Framework.

### [ADR-002] Deterministic Local SHAP Explainability Engine
* **Status**: ACCEPTED
* **Context**: Credit underwritings $> ₹50$ Cr require statutory disclosures under RBI Fair Lending regulations.
* **Decision**: Implement TreeSHAP/LinearSHAP with pinned random seeds and deterministic background distribution baselines to guarantee exact additivity and eliminate explanation variance.
* **Consequences**: Enables immediate generation of statutory Adverse Action notices (e.g., `RBI-AAC-012`) with actionable mitigation covenants for borrowers.
* **RBI Alignment**: Section 4.2(b) (Algorithmic Credit Transparency).

### [ADR-003] Real-Time Sliding-Window Streaming Telemetry & Autonomous Circuit Breaker
* **Status**: ACCEPTED
* **Context**: Intraday liquidity shocks occur rapidly across global clearing windows (New York, London, Frankfurt).
* **Decision**: Deploy 15-minute streaming telemetry calculating PSI on rolling inflow/outflow transaction streams. If PSI $\ge 0.25$, trip an automated circuit breaker and route traffic to a pre-calibrated hot challenger model.
* **Consequences**: Guarantees zero downtime while preventing compounding model errors during currency crises.
* **RBI Alignment**: Master Direction on Intraday Liquidity Risk Management & Nostro Buffers.

### [ADR-004] Cryptographic SHA-256 Hashing for Supervisory Audit Ledger
* **Status**: ACCEPTED
* **Context**: Supervisory examiners require guarantees that model parameters, applicant data, and risk scores were not modified retroactively.
* **Decision**: Hash each inference request, response, feature vector, SHAP contribution, and model hash using SHA-256 into a tamper-evident audit ledger.
* **Consequences**: Any data tampering breaks the hash chain, immediately alerting the internal audit lead and external regulators.
* **RBI Alignment**: Section 5.1 (Immutable Algorithmic Traceability).

### [ADR-005] Strict Four-Eyes Segregation of Duties (RBAC Matrix)
* **Status**: ACCEPTED
* **Context**: Risk of conflicts of interest when model developers approve their own models or underwrite credit.
* **Decision**: Enforce cryptographic segregation between First Line (Developers, Underwriters), Second Line (IMV Lead, CRO), and Third Line (Internal/External Auditors).
* **Consequences**: Underwriters cannot approve loans without CRO sign-off; Developers cannot approve validation certificates.
* **RBI Alignment**: Section 4.1 (Organizational Independence & Segregation of Duties).

### [ADR-006] Server-Side Gemini AI Integration for Supervisory Return Synthesis
* **Status**: ACCEPTED
* **Context**: Formulating detailed quarterly supervisory returns and audit memorandums takes weeks of manual work.
* **Decision**: Utilize Google Gemini server-side via the `@google/genai` SDK to ingest quarterly telemetry metrics and generate formal, inspection-grade supervisory audit memorandums adhering strictly to RBI formatting.
* **Consequences**: Cuts regulatory reporting compilation from 6 weeks to under 3 minutes with full provenance tracking.
* **RBI Alignment**: Department of Supervision (DoS) Model Governance Inspection Return.

---

## 5 End-to-End System Workflows

```
  +-----------------------------------------------------------------------------------------------+
  | WORKFLOW 1: Compliance-as-Code Lifecycle                                                      |
  | Model Ingestion  -->  IMV Four-Eyes  -->  Declarative CI/CD  -->  Hot-Standby  -->  Telemetry |
  +-----------------------------------------------------------------------------------------------+
  | WORKFLOW 2: Corporate Credit Underwriting (> ₹50 Cr)                                          |
  | LEI / GST Cross  -->  Basel PD/LGD   -->  SHAP Waterfall     -->  Adverse Action--> Four-Eyes |
  +-----------------------------------------------------------------------------------------------+
  | WORKFLOW 3: Cross-Border Liquidity Drift & Failover                                           |
  | SWIFT MT950 Feed -->  15-Min PSI Calc-->  Circuit Breaker   -->  Challenger    --> Reserve Swp|
  +-----------------------------------------------------------------------------------------------+
  | WORKFLOW 4: Quarterly Supervisory Return & AI Auditor                                         |
  | Metric Aggregation--> Form MRM-CIB-01 --> Gemini AI Audit    -->  CRO Board Sig --> DAKSH/XBRL|
  +-----------------------------------------------------------------------------------------------+
  | WORKFLOW 5: Four-Eyes Maker-Checker Governance                                                |
  | Line 1 (Develop) -->  Line 2A (IMV)  -->  Line 2B (CRO Exec) -->  Line 3 (RBI External Audit) |
  +-----------------------------------------------------------------------------------------------+
```

1. **Compliance-as-Code Lifecycle Pipeline**: Model registration, Tiering classification, independent model validation benchmark tests, declarative CI/CD policy gates, zero-downtime hot-standby deployment, and continuous PSI drift sensors.
2. **Automated Corporate Credit Underwriting & SHAP Explainability Engine**: LEI verification, GST turnover cross-reconciliation, Basel III PD/LGD stress calibration, deterministic SHAP feature decomposition, statutory Adverse Action notices, and four-eyes sanctioning.
3. **Real-Time Cross-Border Liquidity Drift & Autonomous Remediation**: Multi-currency SWIFT ingestion, rolling 15-minute PSI computations, circuit-breaker tripping, hitless champion-to-challenger routing, and domestic reserve buffer sweeps.
4. **Quarterly Supervisory Reporting & AI Regulatory Examination**: Continuous telemetry compilation into statutory Form MRM-CIB-01, Gemini-powered audit memorandum synthesis, Board Risk Committee digital attestation, and electronic transmission.
5. **Four-Eyes Maker-Checker & Segregation of Duties Governance**: Enforces mathematical separation of powers between Line 1 (Business/Quants), Line 2 (Validation/CRO), and Line 3 (Supervisory Audit).

---

## Product Feature Matrix

| Feature Module | Core Capabilities | Regulatory Driver | Primary Users |
|---|---|---|---|
| **Compliance-as-Code Blueprints** | Automated Tiering, CI/CD policy gates, KS/AUC automated verification, Hot Challenger binding | RBI MRM Para 3.1, 4.1 | Quant Quants, DevOps, IMV Lead |
| **Corporate Credit Engine** | LEI validation, GST triangulation, Basel III A-IRB PD scoring, LGD floor enforcement, Covenants | RBI Large Exposures Framework | Senior Credit Underwriters, CRO |
| **Deterministic SHAP Explainer** | Local Shapley attribution, Waterfall charts, Adverse Action codes (`RBI-AAC-XXX`), Disclosures | RBI MRM Para 4.2(b) | Underwriters, Compliance, Borrowers |
| **Cross-Border Nostro Monitor** | USD, EUR, GBP, JPY intraday feeds, 15-min streaming PSI, LCR buffer tracker | RBI Intraday Liquidity Direction | Head of Global Treasury, CRO |
| **Autonomous Circuit Breakers** | Automated traffic shifting, Volatility damping, Collateral haircuts, Reserve liquidity sweeps | RBI MRM Para 4.4, 5.2 | Treasury Desk, Risk Officers |
| **Supervisory Return Engine** | Form MRM-CIB-01 synthesis, Gemini AI Audit Memorandum, Digital Board Attestation | RBI Dept of Supervision | CRO, Board Risk Committee |
| **Cryptographic Audit Ledger** | SHA-256 digest sealing, Tamper-detection proofs, Immutable historical inference inspection | RBI MRM Para 5.1 | Internal Audit, RBI Inspector |
| **Interactive Governance Simulator**| 5 sequenced end-to-end workflow walkthroughs, live JSON telemetry inspector, playback controls | Institutional Education | Executive Leadership, Regulators |

---

## Role-Based Access Control (RBAC) Matrix

| Persona & Role | Tier-1 Model Approval | Run Validation Tests | Execute Credit Sanctions | Authorize Failover | File Supervisory Returns | Inspect Cryptographic Logs |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Model Quant Developer** (`USR-QUANT-7721`) | ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | 👁️ Read-Only |
| **IMV Lead** (`USR-IMV-3309`) | ❌ Forbidden | ✅ Authoritative | ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | ✅ Full Access |
| **Credit Underwriter** (`USR-CREDIT-4412`)| ❌ Forbidden | ❌ Forbidden | 📝 Propose Only | ❌ Forbidden | ❌ Forbidden | 👁️ Read-Only |
| **Chief Risk Officer** (`USR-CRO-0001`) | ✅ Full Sign-off | ✅ Full Sign-off | ✅ Final Sanction | ✅ Authoritative | ✅ Digital Attestation | ✅ Full Access |
| **Head of Global Treasury** (`USR-TRSY-8820`)| ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | ✅ Authoritative | ❌ Forbidden | 👁️ Read-Only |
| **RBI Supervisory Auditor** (`USR-RBI-9901`)| ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | 🛡️ Immutable Read |

---

## Getting Started & Verification

### Prerequisites
* Node.js v20+
* NPM or Bun

### Installation & Local Run
```bash
# 1. Install dependencies
npm install

# 2. Run TypeScript check & linter
npm run lint

# 3. Start development server (Port 3000)
npm run dev

# 4. Production build & bundle
npm run build
npm start
```

### Environment Variables
```env
# Optional: Google Gemini API Key for Server-Side Supervisory AI Auditor
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Regulatory References & Bibliography
* **Reserve Bank of India (RBI)**: *Draft Framework on Model Risk Management for Regulated Entities*, Department of Regulation.
* **Reserve Bank of India (RBI)**: *Master Direction – Reserve Bank of India (Internal Ratings Based Approach for Credit Risk) Directions*.
* **Reserve Bank of India (RBI)**: *Master Direction – Intraday Liquidity Risk Management and Nostro Monitoring*.
* **Basel Committee on Banking Supervision (BCBS)**: *Pillar 2 Supervisory Review Process and Sound Practices for Model Governance*.
* **Lundberg, S. M., & Lee, S.-I.**: *A Unified Approach to Interpreting Model Predictions (SHAP)*, Advances in Neural Information Processing Systems (NeurIPS).
