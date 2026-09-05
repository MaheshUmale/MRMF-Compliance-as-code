/**
 * RBI Model Risk Management (MRM) Compliance-as-Code Types
 * Corporate & Institutional Banking (CIB)
 */

export type UserRole = 
  | 'CRO' 
  | 'IMV_LEAD' 
  | 'CREDIT_UNDERWRITER' 
  | 'TREASURY_HEAD' 
  | 'RBI_AUDITOR';

export interface UserPersona {
  role: UserRole;
  name: string;
  title: string;
  department: string;
  badgeColor: string;
  permissions: {
    canApproveTier1Models: boolean;
    canTriggerEmergencyCircuitBreakers: boolean;
    canSanctionCreditFacilities: boolean;
    canOverrideModelDecisions: boolean;
    canTriggerModelValidation: boolean;
    canExportRBIReturns: boolean;
    canEditComplianceRules: boolean;
  };
}

export type ModelTier = 'TIER_1_CRITICAL' | 'TIER_2_HIGH' | 'TIER_3_MODERATE';
export type ModelStatus = 
  | 'PRODUCTION' 
  | 'SHADOW' 
  | 'CHALLENGER' 
  | 'HALTED_CIRCUIT_BREAKER' 
  | 'PENDING_VALIDATION';

export interface ModelInventoryItem {
  id: string;
  modelCode: string;
  modelName: string;
  modelType: 'CORPORATE_PD_ECL' | 'CROSS_BORDER_LIQUIDITY_FORECAST' | 'FX_BASIS_ARBITRAGE' | 'SUPPLY_CHAIN_WORKING_CAPITAL_SCORER';
  tier: ModelTier;
  owner: string;
  validator: string;
  version: string;
  deployedAt: string;
  status: ModelStatus;
  rbiComplianceScore: number; // 0 - 100
  rbiComplianceStatus: 'FULL_COMPLIANCE' | 'ACTION_REQUIRED' | 'UNDER_REVIEW';
  psiScore: number; // Population Stability Index
  csiScore: number; // Characteristic Stability Index
  ksStatistic: number; // Kolmogorov-Smirnov
  aucRoc: number;
  brierScore: number;
  telemetryDigest: string; // SHA-256
  lastStressTestDate: string;
  nextAnnualReviewDue: string;
  description: string;
  features: string[];
  activeChallengerModelId?: string;
}

export interface ShapAttribution {
  feature: string;
  featureLabel: string;
  impact: number; // Positive (increases PD/risk) or Negative (decreases risk/improves score)
  direction: 'RISK_INCREASING' | 'RISK_DECREASING';
  description: string;
  rawValue: string;
  contributionPct: number;
}

export interface AdverseActionCode {
  code: string;
  rbiRuleRef: string;
  title: string;
  description: string;
  mitigationSuggestion: string;
}

export interface CorporateCreditApplication {
  id: string;
  applicationNo: string;
  companyName: string;
  leiNumber: string; // Legal Entity Identifier
  panMasked: string;
  industry: string;
  requestedLimitINR: number; // in Crores
  facilityType: 'WORKING_CAPITAL_CONSORTIUM' | 'CROSS_BORDER_TRADE_LINE' | 'SYNDICATED_TERM_LOAN' | 'FOREIGN_CURRENCY_TERM_LOAN';
  financialMetrics: {
    annualRevenueINR: number; // in Crores
    dscr: number; // Debt Service Coverage Ratio
    debtToEquity: number;
    currentRatio: number;
    ebitdaMarginPct: number;
    gstReconciliationVariancePct: number;
    exportReceivablesPct: number;
    promoterPledgePct: number;
    esgRating: 'A' | 'AA' | 'BBB' | 'BB' | 'CCC';
    daysSalesOutstanding: number;
  };
  evaluation: {
    modelUsedId: string;
    modelVersion: string;
    basePdPct: number;
    calibratedPdPct: number;
    lgdPct: number;
    expectedLossINR: number; // in Crores
    internalRating: 'AAA' | 'AA' | 'A+' | 'A' | 'BBB+' | 'BBB' | 'BB' | 'B' | 'D';
    decision: 'APPROVED' | 'MANUAL_REVIEW_REQUIRED' | 'REJECTED' | 'CONDITIONAL_APPROVAL';
    approvedLimitINR: number;
    pricingSpreadBps: number; // Spread over RBI Repo rate
    shapAttributions: ShapAttribution[];
    adverseActionCodes: AdverseActionCode[];
    telemetryDigest: string;
    timestamp: string;
    complianceChecksPassed: boolean;
    fourEyesApprovedBy?: string;
    reviewNotes?: string;
  };
}

export interface LiquidityTelemetryEvent {
  id: string;
  nostroAccount: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  partnerBank: string;
  jurisdiction: string;
  currentBalanceMillion: number;
  targetBufferMillion: number;
  intradayVolatilityIndex: number;
  crossCurrencyBasisBps: number;
  rbiLcrBufferRatioPct: number; // Min 100% under RBI guidelines
  psiDrift: number; // < 0.10 normal, 0.10-0.25 elevated, > 0.25 critical
  driftStatus: 'NORMAL' | 'ELEVATED_WATCH' | 'CRITICAL_DRIFT';
  lastSweepTime: string;
  predictedOutflowNext4HoursMillion: number;
  haircutAppliedPct: number;
  championModelId: string;
  challengerModelId: string;
}

export interface ComplianceRule {
  id: string;
  code: string;
  category: 'EXPLAINABILITY' | 'DRIFT_TELEMETRY' | 'GOVERNANCE_RBAC' | 'STRESS_TESTING' | 'CROSS_BORDER_LIQUIDITY';
  title: string;
  rbiDraftRef: string;
  description: string;
  enforcementMode: 'ENFORCED_BLOCKING' | 'AUDIT_FLAG' | 'AUTO_REMEDIATION_TRIGGER';
  status: 'COMPLIANT' | 'WARNING' | 'BREACH';
  thresholdMetric: string;
  currentValue: string;
  lastEvaluated: string;
  autoRemediationAction: string;
  codeSnippet: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  targetEntity: string;
  details: string;
  sha256Digest: string;
  verified: boolean;
}

export interface RemediationWorkflowItem {
  id: string;
  triggeredAt: string;
  modelId: string;
  modelName: string;
  nostroAccount?: string;
  reason: string;
  triggerMetric: string;
  triggerValue: number;
  threshold: number;
  status: 'AUTO_EXECUTED' | 'AWAITING_CRO_SIGN_OFF' | 'RESOLVED';
  remediationType: 
    | 'CHAMPION_TO_CHALLENGER_FAILOVER' 
    | 'DYNAMIC_HAIRCUT_HIKE' 
    | 'LIQUIDITY_CIRCUIT_BREAKER_TRIPPED' 
    | 'MODEL_FREEZE_MANUAL_QUEUE';
  resolutionSummary?: string;
  auditHash: string;
}
