# Architecture & System Topology Specification
## RBI Model Risk Management (MRM) Compliance-as-Code Platform

---

## 1. Architectural Philosophy: Compliance-as-Code

Traditional banking compliance is a **reactive, post-hoc audit discipline**. Quants develop models in isolated environments, write hundreds of pages of static Microsoft Word and Excel documentation, and present these to Model Risk Management Committees (MRMC). Once approved, model code is handed over to IT for production deployment. Over subsequent quarters:
* Distribution shifts occur undetected.
* Hyperparameter changes or weight recalculations happen without independent validation.
* Regulatory inspections uncover uncalibrated credit scores long after millions of dollars in loans are sanctioned.

The **Compliance-as-Code** philosophy shifts model governance from a **post-deployment inspection** to an **automated, compile-time and runtime gatekeeper**:
1. **Declarative Rulebooks**: Regulatory constraints (e.g. $KS \ge 40\%$, $AUC \ge 0.75$, $LGD \ge 45\%$, zero adverse demographic impact) are codified as machine-readable policy definitions.
2. **Deterministic CI/CD Gates**: Code artifacts and model weight containers cannot compile or promote without cryptographically verified independent model validation (IMV) attestations.
3. **Telemetry-Driven Circuit Breakers**: Production scoring streams are continuously piped through rolling statistical sensors; any distribution divergence trips automated failover to pre-calibrated hot challenger models.
4. **Cryptographic Immutability**: All decisions, attributions, and supervisory returns are cryptographically sealed with SHA-256 digests.

---

## 2. Multi-Tiered System Topology

```
+===================================================================================================+
|                                    1. CLIENT & PRESENTATION LAYER                                 |
+===================================================================================================+
|                                                                                                   |
|   +-------------------------------------------------------------------------------------------+   |
|   |                        React 19 + Tailwind CSS + Lucide + Recharts                        |   |
|   |   - Executive MRM Cockpit               - Automated Wholesale Underwriting Console        |   |
|   |   - Interactive Governance Workflows    - Real-Time Nostro Liquidity Telemetry Monitor    |   |
|   |   - Supervisory Return Synthesizer      - Cryptographic Forensic Audit Ledger             |   |
|   +-------------------------------------------------------------------------------------------+   |
|                                                  |                                                |
+==================================================|================================================+
                                                   | HTTPS / WSS / REST
                                                   v
+===================================================================================================+
|                                  2. APPLICATION & REVERSE PROXY LAYER                             |
+===================================================================================================+
|                                                                                                   |
|   +-------------------------------------------------------------------------------------------+   |
|   |                       Cloud Run Container Gateway (Port 3000 Ingress)                     |   |
|   |   - Express.js HTTP/API Routing Hub                                                       |   |
|   |   - Vite SPA Middleware (Development Mode) / Static Asset Handler (Production Mode)       |   |
|   |   - RBAC Four-Eyes Segregation of Duties Interceptor                                      |   |
|   +-------------------------------------------------------------------------------------------+   |
|                                                  |                                                |
+==================================================|================================================+
                                                   |
         +-----------------------------------------+----------------------------------------+
         |                                         |                                        |
         v                                         v                                        v
+========================+       +===================================+       +======================+
| 3. COMPLIANCE-AS-CODE  |       | 4. INFERENCE & EXPLAINABILITY     |       | 5. STREAMING DRIFT   |
|    POLICY ENGINE       |       |    ENGINE                         |       |    CIRCUIT BREAKER   |
+========================+       +===================================+       +======================+
| * Model Ledger Registry|       | * Wholesale Corporate Credit PD   |       | * SWIFT MT950 Feeds  |
| * Tiering Categorizer  |       |   Scorer (A-IRB Basel Formula)    |       | * 15-Min Sliding PSI |
| * IMV Gate Enforcement |       | * Deterministic TreeSHAP Vectors  |       | * CSI Distribution   |
| * KS / AUC Verification|       | * Statutory Adverse Action Codes  |       | * Hot Challenger Bus |
| * Hot Challenger Bind  |       | * Mitigation Covenant Generator   |       | * LCR Auto-Sweep     |
+========================+       +===================================+       +======================+
         |                                         |                                        |
         +-----------------------------------------+----------------------------------------+
                                                   |
                                                   v
+===================================================================================================+
|                               6. IMMUTABLE CRYPTOGRAPHIC LEDGER & STORAGE                         |
+===================================================================================================+
|                                                                                                   |
|   +-------------------------------------------------------------------------------------------+   |
|   |                         SHA-256 Tamper-Evident Ledger Daemon                              |   |
|   |   - In-Memory & Cloud Datastore Persistence                                               |   |
|   |   - Per-Inference Cryptographic Digest: H(Features || Score || SHAP || ModelHash || Time) |   |
|   |   - Verification Engine for Supervisory On-Site Examinations                              |   |
|   +-------------------------------------------------------------------------------------------+   |
|                                                  |                                                |
+==================================================|================================================+
                                                   |
                                                   v
+===================================================================================================+
|                              7. REGULATORY REPORTING & AI AUDITOR GATEWAY                         |
+===================================================================================================+
|                                                                                                   |
|   +-------------------------------------------------------------------------------------------+   |
|   |                Google Gemini 2.5 Server-Side Intelligence (@google/genai SDK)             |   |
|   |   - Form MRM-CIB-01 Automated Serialization (Quarterly Supervisory Return)                |   |
|   |   - Objective Quantitative Vulnerability & Calibration Review                             |   |
|   |   - Board Risk Committee Digital Signature Signing Bridge                                 |   |
|   |   - RBI DAKSH / Electronic Supervisory Submission Formatting                              |   |
|   +-------------------------------------------------------------------------------------------+   |
|                                                                                                   |
+===================================================================================================+
```

---

## 3. Subsystem Breakdown

### Subsystem A: Model Registration & Tiering Matrix
* **Tier-1 Critical**: Any model with direct financial sanctioning authority $> ₹50$ Crores, intraday balance allocation $> ₹100$ Crores, or automated trading algorithms. Requires full Independent Model Validation (IMV), continuous streaming telemetry, and pre-bound hot challenger.
* **Tier-2 Substantial**: Models influencing credit limits between ₹10 Cr and ₹50 Cr, or pricing models. Requires annual IMV and monthly drift audits.
* **Tier-3 Low**: Internal process optimization models without borrower or balance-sheet impact.

### Subsystem B: Independent Model Validation (IMV) Four-Eyes Gate
To satisfy Section 4.1 of the RBI Draft Framework:
* The IMV team reports through a direct reporting line to the Chief Risk Officer, completely separated from commercial line-of-business quants.
* The validation suite independently runs Out-Of-Time (OOT) stress datasets against the model, verifying:
  $$\text{Discriminatory Power: } KS \ge 40.0\%, \quad AUC \ge 0.75$$
  $$\text{Calibration Accuracy: } \text{Brier Score} \le 0.10$$

### Subsystem C: Wholesale Credit Appraisal & Deterministic SHAP Decomposition
When a corporate loan proposal (e.g. ₹250 Crores syndicated term facility) is submitted:
1. **LEI & Corporate Structure**: Confirms active status on GLEIF and checks MCA registries.
2. **GSTN Reconciliation**: Verifies reported sales against GST 3B/1 returns; discrepancies $> 5\%$ trigger risk elevation.
3. **Scoring**: Computes Probability of Default (PD) and Loss Given Default (LGD $\ge 45\%$).
4. **Explainability**: Runs deterministic SHAP decomposition:
   * Promoter Share Encumbrance $> 12\%$ contributes positive default risk ($+0.120$).
   * Robust DSCR ($1.42x$) contributes risk mitigation ($-0.320$).
5. **Adverse Action Generator**: Emits standard statutory codes (e.g. `RBI-AAC-012`) with prescribed credit covenants.
6. **Maker-Checker Sign-off**: Underwriter (Maker) proposes; Chief Risk Officer (Checker) approves.

### Subsystem D: Cross-Border Liquidity Drift & Autonomous Failover
Multi-currency Nostro clearing accounts face extreme volatility during currency basis widening (e.g. USD SOFR vs. INR MIFOR):
1. Telemetry ingest aggregates SWIFT MT950 and Fedwire statements every 15 minutes.
2. The drift sensor compares current transaction distribution against historical reference baselines, outputting Population Stability Index (PSI).
3. If $PSI \ge 0.25$ or the Liquidity Coverage Ratio buffer drops below $100\%$:
   * **Circuit Breaker Trips**: Halts unhedged exposures.
   * **Hot Challenger Promoted**: Switches inference routing to the volatility-damped challenger model in under 50 milliseconds.
   * **Liquidity Sweep**: Automatically requests top-up from domestic RBI Standing Liquidity Facility (SLF) to restore the Nostro buffer above $110\%$.

---

## 4. Latency & Performance Profile

| Operation | Target Latency | P99 Observed | Resilience / Fallback |
|---|---|---|---|
| Single Credit PD Scoring + SHAP | $< 250$ ms | $180$ ms | Fallback to cached linear scorecard |
| Cryptographic Digest Sealing | $< 5$ ms | $2.1$ ms | Synchronous in-memory hash queue |
| Nostro 15-Min PSI Computation | $< 500$ ms | $120$ ms | Laplace-smoothed binning fallback |
| Champion-to-Challenger Failover | $< 100$ ms | $42$ ms | Zero-downtime routing table switch |
| Gemini Supervisory Audit Memo | $< 8$ s | $4.2$ s | Fallback to pre-formatted statutory template |

---

## 5. Security & Cryptographic Integrity Specifications

1. **Cryptographic Algorithm**: SHA-256 (`crypto.createHash('sha256')`).
2. **Digest Payload Composition**:
   $$\text{Digest} = \mathcal{H}\Big(\text{ModelID} \,\|\, \text{ModelVersion} \,\|\, \text{ApplicantLEI} \,\|\, \text{InputsJSON} \,\|\, \text{PD} \,\|\, \text{LGD} \,\|\, \text{SHAPVector} \,\|\, \text{TimestampISO}\Big)$$
3. **Tamper Detection**: An independent verification process recalculates the hash from the raw stored payload and asserts equality against the recorded digest. Any modification yields a mismatched digest, invalidating the transaction block.
