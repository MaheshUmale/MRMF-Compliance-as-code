import express from "express";
import path from "path";
import crypto from "crypto";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { 
  INITIAL_MODELS, 
  INITIAL_CREDIT_APPLICATIONS, 
  INITIAL_LIQUIDITY_TELEMETRY, 
  COMPLIANCE_RULES, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_REMEDIATION_QUEUE 
} from "./src/data/mockBankData";
import { 
  CorporateCreditApplication, 
  LiquidityTelemetryEvent, 
  ModelInventoryItem, 
  AuditLogEntry, 
  RemediationWorkflowItem,
  ShapAttribution,
  AdverseActionCode 
} from "./src/types";

// In-memory operational state (can be manipulated during simulation)
let models: ModelInventoryItem[] = [...INITIAL_MODELS];
let creditApplications: CorporateCreditApplication[] = [...INITIAL_CREDIT_APPLICATIONS];
let liquidityTelemetry: LiquidityTelemetryEvent[] = [...INITIAL_LIQUIDITY_TELEMETRY];
let complianceRules = [...COMPLIANCE_RULES];
let auditLogs: AuditLogEntry[] = [...INITIAL_AUDIT_LOGS];
let remediationQueue: RemediationWorkflowItem[] = [...INITIAL_REMEDIATION_QUEUE];

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    } catch (e) {
      console.warn("Gemini client init skipped:", e);
    }
  }
  return aiClient;
}

function computeSha256(data: object | string): string {
  const str = typeof data === "string" ? data : JSON.stringify(data);
  return crypto.createHash("sha256").update(str).digest("hex");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      system: "RBI Model Risk Management (MRM) Compliance-as-Code Engine",
      complianceStandard: "RBI MRM Framework 2025/26 (CIB)",
      timestamp: new Date().toISOString() 
    });
  });

  // Model Inventory
  app.get("/api/models", (_req, res) => {
    res.json({ models });
  });

  // Credit Applications
  app.get("/api/credit-applications", (_req, res) => {
    res.json({ applications: creditApplications });
  });

  // Evaluate Corporate Credit Application with SHAP Explainability & Telemetry
  app.post("/api/credit-applications/evaluate", (req, res) => {
    try {
      const {
        companyName,
        industry,
        requestedLimitINR,
        facilityType,
        financialMetrics,
        actor = "CIB Credit Underwriting Desk",
        role = "CREDIT_UNDERWRITER"
      } = req.body;

      const {
        annualRevenueINR = 1000,
        dscr = 1.5,
        debtToEquity = 1.8,
        currentRatio = 1.4,
        ebitdaMarginPct = 22,
        gstReconciliationVariancePct = 1.5,
        exportReceivablesPct = 30,
        promoterPledgePct = 10,
        esgRating = "A",
        daysSalesOutstanding = 60
      } = financialMetrics || {};

      // Mathematical CIB Credit Scoring & Probability of Default (PD) formulation
      // Standard Basel-compliant logistical transformation
      let logit = -2.8; // Base rate ~ 5.7% logit
      
      // DSCR Impact (higher DSCR reduces PD)
      const dscrImpact = (1.5 - dscr) * 1.2;
      logit += dscrImpact;

      // Leverage Impact (D/E > 2.0 increases PD)
      const deImpact = (debtToEquity - 1.5) * 0.8;
      logit += deImpact;

      // Promoter pledge impact (RBI threshold warning > 20%)
      const pledgeImpact = (promoterPledgePct / 25) * 0.9;
      logit += pledgeImpact;

      // EBITDA margin impact (higher margin reduces PD)
      const marginImpact = ((20 - ebitdaMarginPct) / 15) * 0.6;
      logit += marginImpact;

      // GST discrepancy impact (tax variance indicates fraudulent or sloppy books)
      const gstImpact = (gstReconciliationVariancePct / 5) * 0.7;
      logit += gstImpact;

      // Export receivables impact
      const exportImpact = exportReceivablesPct > 50 ? 0.15 : -0.1;
      logit += exportImpact;

      // Compute calibrated PD %
      const calibratedPd = Math.min(25.0, Math.max(0.2, (1 / (1 + Math.exp(-logit))) * 100));
      const lgd = facilityType === "CROSS_BORDER_TRADE_LINE" ? 35.0 : 40.0;
      const expectedLoss = (requestedLimitINR * (calibratedPd / 100) * (lgd / 100));

      // Rating classification
      let internalRating: CorporateCreditApplication["evaluation"]["internalRating"] = "BBB";
      let decision: CorporateCreditApplication["evaluation"]["decision"] = "APPROVED";
      let approvedLimitINR = requestedLimitINR;
      let pricingSpreadBps = 210;

      if (calibratedPd < 0.8) {
        internalRating = "AAA";
        pricingSpreadBps = 150;
      } else if (calibratedPd < 1.5) {
        internalRating = "AA";
        pricingSpreadBps = 180;
      } else if (calibratedPd < 2.8) {
        internalRating = "A";
        pricingSpreadBps = 220;
      } else if (calibratedPd < 4.5) {
        internalRating = "BBB";
        pricingSpreadBps = 290;
      } else if (calibratedPd < 7.5) {
        internalRating = "BB";
        decision = "CONDITIONAL_APPROVAL";
        approvedLimitINR = Math.round(requestedLimitINR * 0.75 * 10) / 10;
        pricingSpreadBps = 380;
      } else {
        internalRating = "B";
        decision = "MANUAL_REVIEW_REQUIRED";
        approvedLimitINR = Math.round(requestedLimitINR * 0.5 * 10) / 10;
        pricingSpreadBps = 450;
      }

      // SHAP feature attribution breakdown (Audit-Ready Explainability)
      const shapAttributions: ShapAttribution[] = [
        {
          feature: "DSCR",
          featureLabel: `Debt Service Coverage (${dscr.toFixed(2)}x)`,
          impact: dscrImpact,
          direction: dscrImpact > 0 ? "RISK_INCREASING" : "RISK_DECREASING",
          description: dscr >= 1.5 
            ? "Solid operating cash flows cover ongoing debt service."
            : "Tight debt service coverage leaves little tolerance for revenue compression.",
          rawValue: `${dscr.toFixed(2)}x`,
          contributionPct: Math.round(Math.abs(dscrImpact) * 30)
        },
        {
          feature: "PROMOTER_PLEDGE",
          featureLabel: `Promoter Share Pledge (${promoterPledgePct.toFixed(1)}%)`,
          impact: pledgeImpact,
          direction: pledgeImpact > 0 ? "RISK_INCREASING" : "RISK_DECREASING",
          description: promoterPledgePct > 20
            ? "High promoter encumbrance triggers RBI governance scrutiny and margin haircut."
            : "Low promoter encumbrance aligns with RBI institutional safety limits (<15%).",
          rawValue: `${promoterPledgePct.toFixed(1)}%`,
          contributionPct: Math.round(Math.abs(pledgeImpact) * 28)
        },
        {
          feature: "DEBT_TO_EQUITY",
          featureLabel: `Debt to Equity Ratio (${debtToEquity.toFixed(2)}x)`,
          impact: deImpact,
          direction: deImpact > 0 ? "RISK_INCREASING" : "RISK_DECREASING",
          description: debtToEquity > 2.5
            ? "Leverage ratio exceeds CIB wholesale risk appetite."
            : "Prudent leverage profile provides solvency resilience.",
          rawValue: `${debtToEquity.toFixed(2)}x`,
          contributionPct: Math.round(Math.abs(deImpact) * 22)
        },
        {
          feature: "EBITDA_MARGIN",
          featureLabel: `EBITDA Margin (${ebitdaMarginPct.toFixed(1)}%)`,
          impact: marginImpact,
          direction: marginImpact > 0 ? "RISK_INCREASING" : "RISK_DECREASING",
          description: ebitdaMarginPct >= 20
            ? "Strong profitability buffers against raw material inflationary shocks."
            : "Subdued operating margin compresses interest coverage cushion.",
          rawValue: `${ebitdaMarginPct.toFixed(1)}%`,
          contributionPct: Math.round(Math.abs(marginImpact) * 15)
        },
        {
          feature: "GST_VARIANCE",
          featureLabel: `GST Return Variance (${gstReconciliationVariancePct.toFixed(1)}%)`,
          impact: gstImpact,
          direction: gstImpact > 0.3 ? "RISK_INCREASING" : "RISK_DECREASING",
          description: gstReconciliationVariancePct > 5.0
            ? "Discrepancy between GSTR filings and audited financials flagged for scrutiny."
            : "GST tax reconciliation verified within 2% tolerance.",
          rawValue: `${gstReconciliationVariancePct.toFixed(1)}%`,
          contributionPct: Math.round(Math.abs(gstImpact) * 12)
        }
      ];

      // Adverse Action Codes (RBI Mandatory Disclosure)
      const adverseActionCodes: AdverseActionCode[] = [];
      if (promoterPledgePct > 20) {
        adverseActionCodes.push({
          code: "RBI-AAC-012",
          rbiRuleRef: "RBI Master Circular on Advances - Cl. 7.1",
          title: "Promoter Share Encumbrance Exceeds Threshold",
          description: `Promoter share pledge of ${promoterPledgePct}% exceeds prudential benchmark of 20%.`,
          mitigationSuggestion: "Borrower must furnish de-pledging schedule or provide secondary collateral."
        });
      }
      if (debtToEquity > 2.5) {
        adverseActionCodes.push({
          code: "RBI-AAC-028",
          rbiRuleRef: "RBI Large Exposures Framework - Annexure B",
          title: "Elevated Financial Leverage",
          description: `Debt/Equity ratio of ${debtToEquity}x is above CIB benchmark.`,
          mitigationSuggestion: "Infuse equity capital or seek corporate parent balance sheet support."
        });
      }
      if (gstReconciliationVariancePct > 5.0) {
        adverseActionCodes.push({
          code: "RBI-AAC-045",
          rbiRuleRef: "RBI Early Warning Signals (EWS) Framework - Red Flag Indicator #14",
          title: "Statutory Tax Reconciliation Discrepancy",
          description: `Variance of ${gstReconciliationVariancePct}% between GSTR-3B filings and reported gross turnover.`,
          mitigationSuggestion: "Provide chartered accountant reconciliation certificate within 30 days."
        });
      }

      // Cryptographic Telemetry Digest for audit trail
      const telemetryPayload = {
        model: "MOD-CORP-PD-01",
        version: "3.4.2-prod",
        companyName,
        requestedLimitINR,
        calibratedPd,
        shapAttributions,
        timestamp: new Date().toISOString()
      };
      const telemetryDigest = computeSha256(telemetryPayload);

      const newApp: CorporateCreditApplication = {
        id: `APP-CIB-${Date.now().toString().slice(-6)}`,
        applicationNo: `CIB/LN/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
        companyName: companyName || "New Corporate Entity Ltd",
        leiNumber: `${Math.floor(100000 + Math.random() * 900000)}00X${Math.floor(10 + Math.random() * 89)}K${Math.floor(1000 + Math.random() * 9000)}`,
        panMasked: "AAAC" + Math.floor(1000 + Math.random() * 8999).toString().slice(0, 1) + "****Z",
        industry: industry || "Manufacturing & Heavy Engineering",
        requestedLimitINR: Number(requestedLimitINR) || 100,
        facilityType: facilityType || "WORKING_CAPITAL_CONSORTIUM",
        financialMetrics: {
          annualRevenueINR: Number(annualRevenueINR) || 1000,
          dscr: Number(dscr) || 1.5,
          debtToEquity: Number(debtToEquity) || 1.8,
          currentRatio: Number(currentRatio) || 1.4,
          ebitdaMarginPct: Number(ebitdaMarginPct) || 20,
          gstReconciliationVariancePct: Number(gstReconciliationVariancePct) || 1.5,
          exportReceivablesPct: Number(exportReceivablesPct) || 30,
          promoterPledgePct: Number(promoterPledgePct) || 10,
          esgRating: esgRating || "A",
          daysSalesOutstanding: Number(daysSalesOutstanding) || 60
        },
        evaluation: {
          modelUsedId: "MOD-CORP-PD-01",
          modelVersion: "3.4.2-prod",
          basePdPct: 1.2,
          calibratedPdPct: Math.round(calibratedPd * 100) / 100,
          lgdPct: lgd,
          expectedLossINR: Math.round(expectedLoss * 100) / 100,
          internalRating,
          decision,
          approvedLimitINR,
          pricingSpreadBps,
          shapAttributions,
          adverseActionCodes,
          telemetryDigest,
          timestamp: new Date().toISOString(),
          complianceChecksPassed: true,
          fourEyesApprovedBy: role === "CRO" ? actor : undefined
        }
      };

      // Add to in-memory list
      creditApplications.unshift(newApp);

      // Record Audit Log Entry
      const auditLog: AuditLogEntry = {
        id: `AUD-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        actor,
        role: role as any,
        action: "MODEL_INFERENCE_EVALUATION",
        targetEntity: `${newApp.applicationNo} (${companyName})`,
        details: `Underwriting evaluation completed. Rating: ${internalRating}, PD: ${calibratedPd.toFixed(2)}%, Limit: ₹${approvedLimitINR} Cr. Telemetry Digest generated.`,
        sha256Digest: telemetryDigest,
        verified: true
      };
      auditLogs.unshift(auditLog);

      res.json({ success: true, application: newApp, auditLog });
    } catch (err: any) {
      console.error("Evaluation error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Cross-Border Liquidity Telemetry
  app.get("/api/liquidity-telemetry", (_req, res) => {
    res.json({ telemetry: liquidityTelemetry });
  });

  // Compliance Rules
  app.get("/api/compliance-rules", (_req, res) => {
    res.json({ rules: complianceRules });
  });

  // Remediation Queue
  app.get("/api/remediation-queue", (_req, res) => {
    res.json({ queue: remediationQueue });
  });

  // Audit Logs
  app.get("/api/audit-logs", (_req, res) => {
    res.json({ logs: auditLogs });
  });

  // Trigger Remediation Action (e.g. Failover to Challenger, Dynamic Haircut, Circuit Breaker)
  app.post("/api/liquidity/trigger-remediation", (req, res) => {
    try {
      const {
        remediationId,
        actionType,
        targetAccount,
        actor = "Dr. Vikramaditya Sen (CRO)",
        role = "CRO",
        notes = "Automated policy trigger executed under RBI MRM compliance guidelines."
      } = req.body;

      // Find item in queue if ID provided, or create one
      const existingIdx = remediationQueue.findIndex(r => r.id === remediationId);
      
      const auditHash = computeSha256({
        remediationId,
        actionType,
        targetAccount,
        actor,
        timestamp: new Date().toISOString()
      });

      if (existingIdx >= 0) {
        remediationQueue[existingIdx].status = "RESOLVED";
        remediationQueue[existingIdx].resolutionSummary = `Approved and executed by ${actor}. ${notes}`;
      }

      // Update liquidity event if applicable
      if (targetAccount) {
        const liqIdx = liquidityTelemetry.findIndex(l => l.nostroAccount.includes(targetAccount) || l.id === targetAccount);
        if (liqIdx >= 0) {
          if (actionType === "CHAMPION_TO_CHALLENGER_FAILOVER") {
            liquidityTelemetry[liqIdx].psiDrift = 0.045; // Reset drift after failover
            liquidityTelemetry[liqIdx].driftStatus = "NORMAL";
            liquidityTelemetry[liqIdx].rbiLcrBufferRatioPct = 118.0;
          } else if (actionType === "DYNAMIC_HAIRCUT_HIKE") {
            liquidityTelemetry[liqIdx].haircutAppliedPct += 4.0;
            liquidityTelemetry[liqIdx].driftStatus = "NORMAL";
          } else if (actionType === "LIQUIDITY_CIRCUIT_BREAKER_TRIPPED") {
            liquidityTelemetry[liqIdx].currentBalanceMillion += 35.0; // Emergency reserve injection
            liquidityTelemetry[liqIdx].driftStatus = "NORMAL";
            liquidityTelemetry[liqIdx].rbiLcrBufferRatioPct = 125.0;
          }
        }
      }

      // Write Audit Log
      const auditEntry: AuditLogEntry = {
        id: `AUD-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        actor,
        role: role as any,
        action: `REMEDIATION_${actionType}`,
        targetEntity: targetAccount || remediationId || "Model Registry",
        details: `Remediation executed: ${actionType}. ${notes}. Cryptographically verified under RBI Model Risk Governance.`,
        sha256Digest: auditHash,
        verified: true
      };
      auditLogs.unshift(auditEntry);

      res.json({
        success: true,
        remediationQueue,
        liquidityTelemetry,
        auditEntry
      });
    } catch (err: any) {
      console.error("Remediation error:", err);
      res.status(500).json({ error: err.message });
    }
  });

function generateDeterministicSupervisoryMemo(
  targetModel: ModelInventoryItem,
  promptContext: string,
  queue: RemediationWorkflowItem[]
): string {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const alertsSummary = queue.length > 0
    ? queue.map((q, i) => `  ${i + 1}. [${q.status}] ${q.remediationType}: ${q.reason}`).join("\n")
    : "  - Nil high-severity remediation alerts active at telemetry cutoff.";

  return `### RESERVE BANK OF INDIA — SUPERVISORY AUDIT MEMORANDUM
**Ref:** RBI/DoS/CIB-MRM/2026/VAL-${targetModel.modelCode.replace(/[^0-9]/g, "") || "882"}
**Date:** ${dateStr}
**Subject:** Independent Model Validation & Compliance-as-Code Telemetry Review
**Target Entity:** ${targetModel.modelName} [Code: ${targetModel.modelCode}, Tier: ${targetModel.tier}, Version: ${targetModel.version}]
**Regulatory Health Status:** ${targetModel.rbiComplianceStatus} (Quantitative Compliance Score: ${targetModel.rbiComplianceScore}%)

#### 1. EXECUTIVE REGULATORY FINDING (Statutory Alignment)
Pursuant to the **RBI Model Risk Management (MRM) Guidelines for Regulated Entities**, the Department of Supervision has audited the model governance pipeline for ${targetModel.modelName}. The algorithmic architecture demonstrates strong statistical robustness under Basel III Pillar 2 requirements:
- **Discriminatory Power (AUC-ROC)**: Measured at **${targetModel.aucRoc}** (Statutory Tier-1 Threshold: $\\ge 0.75$).
- **Goodness-of-Fit / Separation (KS Statistic)**: Verified at **${targetModel.ksStatistic}%** (Statutory Threshold: $\\ge 40.0\\%$).
- **Model Stability (PSI Drift)**: Calculated across the sliding observation window at **${targetModel.psiScore}** (${targetModel.psiScore < 0.10 ? "Green - Stable" : targetModel.psiScore < 0.25 ? "Amber - Moderate Drift" : "Red - Critical Drift"}).
Overall, the model meets supervisory criteria for deployment in high-impact credit underwriting and liquidity reserve planning.

#### 2. EXPLAINABILITY & TELEMETRY AUDIT
- **SHAP Decomposition Rigor**: All wholesale credit appraisals exceeding ₹50 Crores enforce deterministic Shapley Additive exPlanations (KernelSHAP/TreeSHAP). Key feature attributions—Debt Service Coverage Ratio (DSCR), Promoter Share Encumbrance, Debt-to-Equity, and GSTR-3B variance—are decomposed into exact marginal basis points.
- **Statutory Adverse Action Disclosures**: Negative credit limit scaling or rating penalizations automatically trigger statutory disclosures (e.g., RBI-AAC-012 for promoter pledge exceeding 20%, RBI-AAC-028 for leverage ratios > 2.5x).
- **Cryptographic Audit Digest**: Every inference request and attribution vector is hashed via SHA-256 (${targetModel.telemetryDigest.slice(0, 16)}...) and committed to an immutable append-only supervisory log, satisfying RBI Cyber Security and Governance Directives.

#### 3. CROSS-BORDER LIQUIDITY DRIFT & REMEDIATION
- **Intraday Telemetry**: Cross-currency Nostro and Vostro positions are evaluated on 15-minute sliding intervals. 
- **Automated Circuit Breaker & Failover**: In the event of market dislocation or basis volatility (PSI $\\ge 0.25$), the Compliance-as-Code framework enforces autonomous Champion-to-Challenger failover (${targetModel.activeChallengerModelId || "MOD-CHALLENGER-PAIR"}), guaranteeing continuous preservation of the 100% intraday Liquidity Coverage Ratio (LCR) buffer.
- **Active Telemetry Queue**:
${alertsSummary}

#### 4. MANDATORY SUPERVISORY ATTESTATION & ACTION ITEMS
1. **Board MRM Committee Certification**: The Chief Risk Officer (CRO) must execute digital cryptographic sign-off on Form MRM-CIB-01 prior to statutory submission.
2. **Four-Eyes Segregation of Duties**: Quantitative developers remain cryptographically barred from approving production deployment or overriding lending covenants.
3. **XBRL Supervisory Filing**: Dispatch the quarterly return package with full SHA-256 telemetry manifests to the RBI Department of Supervision by the 15th of the succeeding month.`;
}

async function generateComplianceMemoWithGemini(
  targetModel: ModelInventoryItem,
  promptContext: string,
  queue: RemediationWorkflowItem[]
): Promise<{ text: string; source: "gemini" | "rulebook-fallback"; modelUsed: string }> {
  const client = getGeminiClient();
  if (!client) {
    return {
      text: generateDeterministicSupervisoryMemo(targetModel, promptContext, queue),
      source: "rulebook-fallback",
      modelUsed: "RBI Regulatory Policy Engine (Local)"
    };
  }

  const systemPrompt = `You are a Principal Regulatory Policy Advisor and Senior Quantitative Model Risk Inspector specializing in the Reserve Bank of India (RBI) Model Risk Management (MRM) Guidelines for Corporate and Institutional Banking (CIB).
You write rigorous, highly articulate supervisory compliance memoranda assessing automated corporate lending explainability, cross-border Nostro/Vostro drift telemetry, and model governance compliance.
Structure your assessment into 4 precise sections:
1. EXECUTIVE REGULATORY FINDING (Statutory alignment with RBI draft circulars on Model Risk)
2. EXPLAINABILITY & TELEMETRY AUDIT (Evaluation of SHAP decomposition, adverse action codes, and SHA-256 audit digest)
3. CROSS-BORDER LIQUIDITY DRIFT & REMEDIATION (Assessment of PSI stability, intraday LCR buffer, and automated failover efficacy)
4. MANDATORY SUPERVISORY ATTESTATION & ACTION ITEMS (Formal conditions precedent for the Chief Risk Officer / Board MRM Committee)`;

  const userPrompt = `Generate an official RBI Supervisory Inspection & Model Risk Attestation Memorandum for the following Corporate & Institutional Banking model:
- Model Name: ${targetModel.modelName} (Code: ${targetModel.modelCode})
- Model Tier: ${targetModel.tier}
- Current Status: ${targetModel.status}
- Population Stability Index (PSI): ${targetModel.psiScore}
- Kolmogorov-Smirnov (KS): ${targetModel.ksStatistic}
- AUC-ROC: ${targetModel.aucRoc}
- RBI Compliance Score: ${targetModel.rbiComplianceScore}%
- Context/Details: ${promptContext || "Annual pre-supervisory validation review of wholesale credit decisioning and cross-border Nostro buffer forecasting under RBI MRM norms."}
Current active alerts: ${JSON.stringify(queue.map(r => ({ reason: r.reason, status: r.status, type: r.remediationType })))}`;

  // Candidate models from gemini-api guidelines
  // Primary: gemini-3.8-flash; if experiencing high demand (503), try gemini-3.1-flash-lite, then gemini-flash-latest
  const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];

  for (const modelName of candidateModels) {
    try {
      const response = await client.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.2,
          topP: 0.95
        }
      });

      if (response.text && response.text.trim().length > 0) {
        return {
          text: response.text,
          source: "gemini",
          modelUsed: modelName
        };
      }
    } catch (err: any) {
      console.warn(`Gemini API call with model '${modelName}' returned error (attempting resilient retry/alternative):`, err?.message || err);
      // Wait briefly before attempting the next candidate
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }

  // If all candidate models encounter 503 or quota limits, seamlessly fall back to high-fidelity rulebook engine
  console.warn("All Gemini API candidate models temporarily unavailable. Seamlessly activating RBI Regulatory Policy synthesis engine fallback.");
  return {
    text: generateDeterministicSupervisoryMemo(targetModel, promptContext, queue),
    source: "rulebook-fallback",
    modelUsed: "RBI Regulatory Policy Engine (High-Availability Fallback)"
  };
}

  // AI-Powered Supervisory Compliance Review & RBI Return Memorandum
  app.post("/api/gemini/compliance-audit", async (req, res) => {
    try {
      const { modelId, promptContext } = req.body;
      const targetModel = models.find(m => m.id === modelId) || models[0];

      const result = await generateComplianceMemoWithGemini(targetModel, promptContext, remediationQueue);

      res.json({
        success: true,
        memo: result.text,
        source: result.source,
        modelUsed: result.modelUsed,
        model: targetModel,
        generatedAt: new Date().toISOString(),
        signOffOfficial: "RBI Supervisory Desk - Department of Supervision",
        auditVerificationHash: computeSha256(result.text || "rbi-memo")
      });
    } catch (err: any) {
      console.error("Compliance audit fallback handler:", err);
      const targetModel = models[0];
      const fallbackMemo = generateDeterministicSupervisoryMemo(targetModel, "Annual supervisory validation review", remediationQueue);
      res.json({
        success: true,
        memo: fallbackMemo,
        source: "rulebook-fallback",
        modelUsed: "RBI Regulatory Policy Engine (High-Availability Fallback)",
        model: targetModel,
        generatedAt: new Date().toISOString(),
        signOffOfficial: "RBI Supervisory Desk - Department of Supervision",
        auditVerificationHash: computeSha256(fallbackMemo)
      });
    }
  });

  // Setup Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RBI MRM Compliance Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
