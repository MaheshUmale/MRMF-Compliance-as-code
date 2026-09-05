# Mathematical Rationale & Quantitative Formulations
## RBI Model Risk Management (MRM) Framework

This document details the quantitative foundations, mathematical equations, and statistical properties governing the algorithms implemented in the **RBI MRM Compliance-as-Code Platform**.

---

## 1. Population Stability Index (PSI)

### 1.1 Definition & Intuition
The **Population Stability Index (PSI)** is a symmetric statistical metric based on Kullback-Leibler (KL) divergence used to detect population shifts between an initial benchmark distribution (e.g. training or calibration data) and an observed empirical distribution (e.g. recent production scoring traffic).

Let:
* $Q = (q_1, q_2, \dots, q_K)$ be the reference/expected probability mass function partitioned into $K$ discrete intervals (deciles or custom quantile buckets).
* $P = (p_1, p_2, \dots, p_K)$ be the observed/actual probability mass function over the identical $K$ bins.

The Population Stability Index is formulated as:

$$PSI = \sum_{k=1}^{K} (p_k - q_k) \times \ln\left( \frac{p_k}{q_k} \right)$$

### 1.2 Derivation from Relative Entropy (Kullback-Leibler Divergence)
Recall that the directional Kullback-Leibler divergence from $Q$ to $P$ is:

$$D_{KL}(P \parallel Q) = \sum_{k=1}^{K} p_k \ln\left( \frac{p_k}{q_k} \right)$$

And from $P$ to $Q$ is:

$$D_{KL}(Q \parallel P) = \sum_{k=1}^{K} q_k \ln\left( \frac{q_k}{p_k} \right) = - \sum_{k=1}^{K} q_k \ln\left( \frac{p_k}{q_k} \right)$$

Summing both directional divergences yields the symmetric J-divergence:

$$J(P, Q) = D_{KL}(P \parallel Q) + D_{KL}(Q \parallel P) = \sum_{k=1}^{K} (p_k - q_k) \ln\left( \frac{p_k}{q_k} \right) \equiv PSI$$

### 1.3 Handling Zero-Frequency Bins (Laplace Smoothing)
When dealing with production streaming data over short time windows (e.g. 15-minute Nostro settlement bursts), certain bins may observe zero counts ($p_k = 0$). To prevent indeterminate logarithmic evaluations ($\ln(0)$ or division by zero), we enforce additive Laplace smoothing:

$$\tilde{p}_k = \frac{N_{p, k} + \alpha}{N_p + K \cdot \alpha}, \quad \alpha = 0.0001$$

### 1.4 Regulatory Thresholds for Banking Models
* **$PSI < 0.10$**: Stable. No significant distribution change; model calibration holds.
* **$0.10 \le PSI < 0.25$**: Moderate shift. Triggers heightened telemetry and warning alerts to the Head of Validation.
* **$PSI \ge 0.25$**: Significant distributional drift. Statutory trigger point; requires immediate champion-to-challenger model failover or recalibration.

---

## 2. Deterministic SHAP (Shapley Additive exPlanations)

### 2.1 Game-Theoretic Foundation
SHAP decomposes a machine learning model's output $f(x)$ for an applicant vector $x \in \mathbb{R}^M$ by attributing marginal payoffs to each feature based on **Shapley values from cooperative game theory**.

The classic Shapley value for feature $i$ across a set of features $F = \{1, 2, \dots, M\}$ is defined as:

$$\phi_i(x) = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|! \, (|F| - |S| - 1)!}{|F|!} \left[ f_x(S \cup \{i\}) - f_x(S) \right]$$

Where:
* $S$ is a subset of features excluding feature $i$.
* $f_x(S)$ is the conditional expectation of the model prediction given the feature subset $S$:
  $$f_x(S) = \mathbb{E}[f(X) \mid X_S = x_S]$$

### 2.2 Axiomatic Properties Critical for Regulatory Compliance
1. **Efficiency (Local Accuracy)**:
   The sum of all feature attributions plus the base expected value $\phi_0 = \mathbb{E}[f(X)]$ strictly equals the model output:
   $$f(x) = \phi_0 + \sum_{i=1}^{M} \phi_i(x)$$
   *Regulatory Impact*: Guarantees that explainability decomposes 100% of the applicant's risk score without unallocated residual error.

2. **Symmetry**:
   If two features contribute identically to all possible subsets, their attributions are equal:
   $$\text{If } f_x(S \cup \{i\}) = f_x(S \cup \{j\}) \quad \forall S \subseteq F \setminus \{i, j\}, \quad \text{then } \phi_i(x) = \phi_j(x)$$

3. **Dummy / Null Feature**:
   If a feature has no impact on any marginal subset, its attribution is strictly zero:
   $$\text{If } f_x(S \cup \{i\}) = f_x(S) \quad \forall S \subseteq F \setminus \{i\}, \quad \text{then } \phi_i(x) = 0$$

4. **Additivity**:
   For an ensemble model $f(x) = \sum_{t=1}^T w_t g_t(x)$, the attributions sum linearly:
   $$\phi_i(f) = \sum_{t=1}^T w_t \phi_i(g_t)$$

### 2.3 Logistic Scale vs. Probability Space
In credit default modeling where the model outputs Probability of Default $PD \in (0, 1)$, raw Shapley values are calculated in the **log-odds (logit)** space:

$$\text{logit}(PD) = \ln\left(\frac{PD}{1 - PD}\right) = \phi_0 + \sum_{i=1}^{M} \phi_i(x)$$

The final probability is then retrieved via the logistic sigmoid transform:

$$PD = \frac{1}{1 + e^{-(\phi_0 + \sum_{i=1}^M \phi_i(x))}}$$

---

## 3. Kolmogorov-Smirnov (KS) Statistic

### 3.1 Mathematical Definition
The **Kolmogorov-Smirnov (KS)** statistic measures the maximum vertical distance between the empirical cumulative distribution function of bad borrowers (defaulters, $F_{\text{bad}}$) and good borrowers (non-defaulters, $F_{\text{good}}$):

$$KS = \max_{s \in \mathcal{S}} \Big| F_{\text{bad}}(s) - F_{\text{good}}(s) \Big| \times 100$$

Where $s$ ranges across all cutoff score thresholds in the score support $\mathcal{S}$.

### 3.2 RBI Benchmark Thresholds
* **$KS < 30\%$**: Inadequate separation power; model rejected by Independent Model Validation (IMV).
* **$30\% \le KS < 40\%$**: Weak separation; conditional approval with mandatory capital buffers.
* **$40\% \le KS < 60\%$**: **RBI Standard for Tier-1 Commercial Credit Models**. Strong separation without overfitting.
* **$KS \ge 60\%$**: Potential target leakage or overfitting; triggers audit review.

---

## 4. Basel III / IV Advanced IRB Capital Adequacy Equations

### 4.1 Asset Value Correlation ($R$)
For corporate borrowers, correlation with the systematic economic factor depends non-linearly on the Probability of Default:

$$R = 0.12 \times \left( \frac{1 - e^{-50 \cdot PD}}{1 - e^{-50}} \right) + 0.24 \times \left[ 1 - \left( \frac{1 - e^{-50 \cdot PD}}{1 - e^{-50}} \right) \right]$$

For Small and Medium Enterprises (SMEs) with annual sales $S \in [5 \text{ Cr}, 50 \text{ Cr}]$, a firm-size adjustment is applied:

$$R_{\text{SME}} = R - 0.04 \times \left( 1 - \frac{\min(\max(5, S), 50) - 5}{45} \right)$$

### 4.2 Maturity Adjustment Factor ($b$)
$$b = \big( 0.11852 - 0.05478 \times \ln(PD) \big)^2$$

### 4.3 Capital Requirement Ratio ($K$)
$$K = \left[ LGD \times \Phi\left( \frac{\Phi^{-1}(PD) + \sqrt{R} \times \Phi^{-1}(0.999)}{\sqrt{1 - R}} \right) - (LGD \times PD) \right] \times \left( \frac{1 + (M - 2.5) \cdot b}{1 - 1.5 \cdot b} \right)$$

Where $\Phi$ is the standard normal cumulative distribution function and $\Phi^{-1}$ is its inverse (quantile function).

---

## 5. Liquidity Coverage Ratio (LCR) Buffer Equations

The intraday Nostro Liquidity Coverage Ratio under stressed market conditions is formulated as:

$$LCR(t) = \frac{\mathcal{B}_{\text{clear}}(t) + \mathcal{S}_{\text{SLF}}(t)}{\sum_{c \in \mathcal{C}} \mathcal{O}_{\text{net}, c}^{\text{stress}}(t)} \times 100\%$$

Where:
* $\mathcal{B}_{\text{clear}}(t)$ is the aggregate balance across international Nostro accounts.
* $\mathcal{S}_{\text{SLF}}(t)$ is immediately accessible standby liquidity from RBI's Standing Liquidity Facility.
* $\mathcal{O}_{\text{net}, c}^{\text{stress}}(t)$ is the stressed intraday net outflow in currency $c$.

* **Statutory Minimum Regulatory Requirement**: $LCR \ge 100\%$.
* **Automated Remediation Sweep Trigger**: Initiated whenever $LCR(t) < 100\%$.
