import { 
  UserPersona, 
  ModelInventoryItem, 
  CorporateCreditApplication, 
  LiquidityTelemetryEvent, 
  ComplianceRule, 
  AuditLogEntry, 
  RemediationWorkflowItem 
} from '../types';

export const USER_PERSONAS: Record<string, UserPersona> = {
  CRO: {
    role: 'CRO',
    name: 'Dr. Vikramaditya Sen',
    title: 'Chief Risk Officer & Chair, MRM Committee',
    department: 'Enterprise Risk Management & Regulatory Affairs',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
    permissions: {
      canApproveTier1Models: true,
      canTriggerEmergencyCircuitBreakers: true,
      canSanctionCreditFacilities: true,
      canOverrideModelDecisions: true,
      canTriggerModelValidation: true,
      canExportRBIReturns: true,
      canEditComplianceRules: true,
    }
  },
  IMV_LEAD: {
    role: 'IMV_LEAD',
    name: 'Ananya Deshmukh, FRM',
    title: 'Lead Independent Model Validation (IMV)',
    department: 'Quantitative Validation & Supervisory Stress Testing',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40',
    permissions: {
      canApproveTier1Models: false,
      canTriggerEmergencyCircuitBreakers: false,
      canSanctionCreditFacilities: false,
      canOverrideModelDecisions: false,
      canTriggerModelValidation: true,
      canExportRBIReturns: true,
      canEditComplianceRules: true,
    }
  },
  CREDIT_UNDERWRITER: {
    role: 'CREDIT_UNDERWRITER',
    name: 'Rajesh K. Nambiar',
    title: 'Senior Director, Large Corporate Credit Sanctions',
    department: 'Wholesale & Institutional Banking Group',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40',
    permissions: {
      canApproveTier1Models: false,
      canTriggerEmergencyCircuitBreakers: false,
      canSanctionCreditFacilities: true,
      canOverrideModelDecisions: false,
      canTriggerModelValidation: false,
      canExportRBIReturns: false,
      canEditComplianceRules: false,
    }
  },
  TREASURY_HEAD: {
    role: 'TREASURY_HEAD',
    name: 'Sorabjee Patel',
    title: 'Head of Global Markets & Cross-Border Liquidity',
    department: 'Institutional Treasury & International Banking Unit (IBU)',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/40',
    permissions: {
      canApproveTier1Models: false,
      canTriggerEmergencyCircuitBreakers: true,
      canSanctionCreditFacilities: false,
      canOverrideModelDecisions: false,
      canTriggerModelValidation: false,
      canExportRBIReturns: true,
      canEditComplianceRules: false,
    }
  },
  RBI_AUDITOR: {
    role: 'RBI_AUDITOR',
    name: 'P. Venkatraman',
    title: 'RBI Supervisory College Lead Inspector',
    department: 'Reserve Bank of India - Department of Supervision (DoS)',
    badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/40',
    permissions: {
      canApproveTier1Models: false,
      canTriggerEmergencyCircuitBreakers: false,
      canSanctionCreditFacilities: false,
      canOverrideModelDecisions: false,
      canTriggerModelValidation: false,
      canExportRBIReturns: true,
      canEditComplianceRules: false,
    }
  }
};

export const INITIAL_MODELS: ModelInventoryItem[] = [
  {
    id: 'MOD-CORP-PD-01',
    modelCode: 'RB-MRM-CIB-PD-01',
    modelName: 'Institutional Corporate Credit PD & ECL Engine v3.4',
    modelType: 'CORPORATE_PD_ECL',
    tier: 'TIER_1_CRITICAL',
    owner: 'CIB Wholesale Risk Analytics',
    validator: 'Model Validation Group (IMV - External/Independent)',
    version: '3.4.2-prod',
    deployedAt: '2026-02-15',
    status: 'PRODUCTION',
    rbiComplianceScore: 98.4,
    rbiComplianceStatus: 'FULL_COMPLIANCE',
    psiScore: 0.042,
    csiScore: 0.051,
    ksStatistic: 54.8,
    aucRoc: 0.892,
    brierScore: 0.038,
    telemetryDigest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    lastStressTestDate: '2026-08-10',
    nextAnnualReviewDue: '2027-02-15',
    description: 'Automated credit appraisal and probability of default engine for corporate exposures > ₹50 Cr with mandatory SHAP explainability decomposition.',
    features: ['DSCR', 'Debt/Equity', 'Promoter Pledge %', 'GST Variance %', 'Export Receivables', 'EBITDA Margin', 'ESG Rating'],
    activeChallengerModelId: 'MOD-CORP-PD-02-CHAL'
  },
  {
    id: 'MOD-LIQ-NOSTRO-02',
    modelCode: 'RB-MRM-TREAS-NOSTRO-02',
    modelName: 'Cross-Border Nostro Liquidity & Intraday Buffer Forecaster',
    modelType: 'CROSS_BORDER_LIQUIDITY_FORECAST',
    tier: 'TIER_1_CRITICAL',
    owner: 'Global Treasury Quantitative Desk',
    validator: 'Internal Independent Model Validation Unit',
    version: '2.1.0-prod',
    deployedAt: '2026-01-20',
    status: 'PRODUCTION',
    rbiComplianceScore: 88.2,
    rbiComplianceStatus: 'ACTION_REQUIRED',
    psiScore: 0.185, // Elevated drift!
    csiScore: 0.210,
    ksStatistic: 48.2,
    aucRoc: 0.841,
    brierScore: 0.062,
    telemetryDigest: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    lastStressTestDate: '2026-07-28',
    nextAnnualReviewDue: '2027-01-20',
    description: 'Intraday multi-currency Nostro account forecast engine controlling cross-border sweeps under RBI LCR/NSFR and FEMA FX limits.',
    features: ['USD/INR 30d Volatility', 'Fed-RBI Rate Spread', 'SWIFT Inbound Queue Volume', 'Cross-Currency Basis Bps', 'Intraday Outflow Velocity'],
    activeChallengerModelId: 'MOD-LIQ-CHALLENGER-02'
  },
  {
    id: 'MOD-CORP-PD-02-CHAL',
    modelCode: 'RB-MRM-CIB-PD-CHAL',
    modelName: 'Challenger Gradient-Boosted Corporate Credit Scorer v4.0-RC',
    modelType: 'CORPORATE_PD_ECL',
    tier: 'TIER_1_CRITICAL',
    owner: 'Quantitative Research Lab',
    validator: 'Under IMV Backtesting',
    version: '4.0.0-rc3',
    deployedAt: '2026-08-01',
    status: 'CHALLENGER',
    rbiComplianceScore: 94.0,
    rbiComplianceStatus: 'UNDER_REVIEW',
    psiScore: 0.021,
    csiScore: 0.033,
    ksStatistic: 57.2,
    aucRoc: 0.914,
    brierScore: 0.029,
    telemetryDigest: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
    lastStressTestDate: '2026-08-15',
    nextAnnualReviewDue: '2027-08-01',
    description: 'Challenger model trained on macro shock scenarios including supply chain disruption indices and high-frequency GST electronic toll data.',
    features: ['DSCR', 'Debt/Equity', 'Promoter Pledge %', 'E-Way Bill Velocity', 'GST Variance %', 'Export Receivables']
  },
  {
    id: 'MOD-FX-BASIS-03',
    modelCode: 'RB-MRM-TREAS-FXB-03',
    modelName: 'Cross-Currency USD/INR Basis Swap Pricing & VaR Model',
    modelType: 'FX_BASIS_ARBITRAGE',
    tier: 'TIER_2_HIGH',
    owner: 'Institutional Treasury FX Trading',
    validator: 'Market Risk Oversight',
    version: '1.9.4',
    deployedAt: '2025-11-10',
    status: 'PRODUCTION',
    rbiComplianceScore: 99.1,
    rbiComplianceStatus: 'FULL_COMPLIANCE',
    psiScore: 0.058,
    csiScore: 0.063,
    ksStatistic: 61.0,
    aucRoc: 0.930,
    brierScore: 0.022,
    telemetryDigest: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    lastStressTestDate: '2026-08-20',
    nextAnnualReviewDue: '2026-11-10',
    description: 'Calculates counterparty credit risk and mark-to-market margins on cross-border offshore currency swap lines.',
    features: ['MIFOR Curve', 'SOFR Compounded', 'RBI FX Intervention Indicator', '3M Tenor Basis']
  }
];

export const INITIAL_CREDIT_APPLICATIONS: CorporateCreditApplication[] = [
  {
    id: 'APP-CIB-2026-8812',
    applicationNo: 'CIB/LN/2026/8812',
    companyName: 'Bharat Infra Logistics & Terminal Ports Ltd',
    leiNumber: '335800G94U8372KV8912',
    panMasked: 'AABCB****E',
    industry: 'Ports & Infrastructure SPV',
    requestedLimitINR: 350.0, // ₹350 Crores
    facilityType: 'SYNDICATED_TERM_LOAN',
    financialMetrics: {
      annualRevenueINR: 2450.0,
      dscr: 1.84,
      debtToEquity: 1.45,
      currentRatio: 1.62,
      ebitdaMarginPct: 28.5,
      gstReconciliationVariancePct: 1.2,
      exportReceivablesPct: 42.0,
      promoterPledgePct: 4.5,
      esgRating: 'AA',
      daysSalesOutstanding: 44
    },
    evaluation: {
      modelUsedId: 'MOD-CORP-PD-01',
      modelVersion: '3.4.2-prod',
      basePdPct: 0.85,
      calibratedPdPct: 0.92,
      lgdPct: 35.0,
      expectedLossINR: 1.12,
      internalRating: 'AA',
      decision: 'APPROVED',
      approvedLimitINR: 350.0,
      pricingSpreadBps: 185, // 1.85% over repo
      complianceChecksPassed: true,
      telemetryDigest: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      timestamp: '2026-09-02T10:14:22Z',
      fourEyesApprovedBy: 'Dr. Vikramaditya Sen (CRO)',
      shapAttributions: [
        {
          feature: 'DSCR',
          featureLabel: 'Debt Service Coverage Ratio (1.84x)',
          impact: -0.45,
          direction: 'RISK_DECREASING',
          description: 'Robust cash flows comfortably cover scheduled debt amortisation.',
          rawValue: '1.84x',
          contributionPct: 38
        },
        {
          feature: 'EBITDA_MARGIN',
          featureLabel: 'EBITDA Margin (28.5%)',
          impact: -0.32,
          direction: 'RISK_DECREASING',
          description: 'High infrastructure operating margin shields against tariff adjustments.',
          rawValue: '28.5%',
          contributionPct: 27
        },
        {
          feature: 'PROMOTER_PLEDGE',
          featureLabel: 'Promoter Share Pledge (4.5%)',
          impact: -0.18,
          direction: 'RISK_DECREASING',
          description: 'Negligible promoter pledge meets RBI prudential containment benchmarks (<15%).',
          rawValue: '4.5%',
          contributionPct: 15
        },
        {
          feature: 'EXPORT_RECEIVABLES',
          featureLabel: 'Export Forex Receivables (42.0%)',
          impact: +0.12,
          direction: 'RISK_INCREASING',
          description: 'Slight cross-border currency volatility exposure on terminal receipts.',
          rawValue: '42.0%',
          contributionPct: 10
        },
        {
          feature: 'GST_VARIANCE',
          featureLabel: 'GST Tax Variance (1.2%)',
          impact: -0.12,
          direction: 'RISK_DECREASING',
          description: 'Tight reconciliation between GSTR-1, GSTR-3B, and audited books.',
          rawValue: '1.2%',
          contributionPct: 10
        }
      ],
      adverseActionCodes: []
    }
  },
  {
    id: 'APP-CIB-2026-9041',
    applicationNo: 'CIB/LN/2026/9041',
    companyName: 'Kaveri Global Agro-Chemicals Consortium',
    leiNumber: '894500X97K1209PQ4321',
    panMasked: 'AAGCK****R',
    industry: 'Specialty Chemicals & Exports',
    requestedLimitINR: 180.0,
    facilityType: 'CROSS_BORDER_TRADE_LINE',
    financialMetrics: {
      annualRevenueINR: 920.0,
      dscr: 1.15,
      debtToEquity: 3.10,
      currentRatio: 1.08,
      ebitdaMarginPct: 11.2,
      gstReconciliationVariancePct: 6.8, // Warning flag
      exportReceivablesPct: 68.0,
      promoterPledgePct: 38.0, // High risk flag
      esgRating: 'BB',
      daysSalesOutstanding: 89
    },
    evaluation: {
      modelUsedId: 'MOD-CORP-PD-01',
      modelVersion: '3.4.2-prod',
      basePdPct: 3.40,
      calibratedPdPct: 5.15,
      lgdPct: 45.0,
      expectedLossINR: 4.17,
      internalRating: 'BB',
      decision: 'CONDITIONAL_APPROVAL',
      approvedLimitINR: 110.0, // Cut back from 180 Cr
      pricingSpreadBps: 340,
      complianceChecksPassed: true,
      telemetryDigest: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      timestamp: '2026-09-03T14:30:11Z',
      reviewNotes: 'Approved subject to mandatory 20% cash collateral on cross-border LC line and promoter pledge reduction covenant within 90 days.',
      shapAttributions: [
        {
          feature: 'PROMOTER_PLEDGE',
          featureLabel: 'Promoter Share Pledge (38.0%)',
          impact: +0.72,
          direction: 'RISK_INCREASING',
          description: 'Promoter encumbrance exceeds RBI safe threshold of 20%, amplifying governance risk.',
          rawValue: '38.0%',
          contributionPct: 35
        },
        {
          feature: 'DEBT_TO_EQUITY',
          featureLabel: 'Debt to Equity Ratio (3.10x)',
          impact: +0.48,
          direction: 'RISK_INCREASING',
          description: 'High financial leverage above CIB threshold of 2.50x.',
          rawValue: '3.10x',
          contributionPct: 24
        },
        {
          feature: 'GST_VARIANCE',
          featureLabel: 'GST vs Financials Discrepancy (6.8%)',
          impact: +0.41,
          direction: 'RISK_INCREASING',
          description: 'High variance detected between GST electronic returns and filed balance sheet.',
          rawValue: '6.8%',
          contributionPct: 20
        },
        {
          feature: 'DSCR',
          featureLabel: 'DSCR (1.15x)',
          impact: +0.25,
          direction: 'RISK_INCREASING',
          description: 'Thin debt service margin leaves little room for interest rate spikes.',
          rawValue: '1.15x',
          contributionPct: 12
        },
        {
          feature: 'EXPORT_RECEIVABLES',
          featureLabel: 'Export Receivables (68.0%)',
          impact: -0.18,
          direction: 'RISK_DECREASING',
          description: 'Forex inflows partially buffer domestic cyclicality.',
          rawValue: '68.0%',
          contributionPct: 9
        }
      ],
      adverseActionCodes: [
        {
          code: 'RBI-AAC-012',
          rbiRuleRef: 'RBI Master Circular on Advances - Sec 7.1',
          title: 'Excessive Promoter Encumbrance',
          description: 'Promoter share pledge of 38.0% triggers mandatory credit limit containment.',
          mitigationSuggestion: 'De-pledge promoter shares to below 20% prior to full tranche drawdown.'
        },
        {
          code: 'RBI-AAC-028',
          rbiRuleRef: 'RBI Master Direction - Large Exposures Framework',
          title: 'High Leverage & Thin DSCR Buffer',
          description: 'Debt/Equity of 3.1x exceeds internal risk appetite; DSCR 1.15x under stress is non-conforming.',
          mitigationSuggestion: 'Infuse subordinate mezzanine capital or provide corporate parent guarantee.'
        }
      ]
    }
  },
  {
    id: 'APP-CIB-2026-9150',
    applicationNo: 'CIB/LN/2026/9150',
    companyName: 'Narmada Energy & Clean Fuels SPV',
    leiNumber: '724500Y88L9901MN2345',
    panMasked: 'AABCN****P',
    industry: 'Renewable Power & Grid Infrastructure',
    requestedLimitINR: 500.0,
    facilityType: 'FOREIGN_CURRENCY_TERM_LOAN',
    financialMetrics: {
      annualRevenueINR: 3100.0,
      dscr: 1.68,
      debtToEquity: 1.80,
      currentRatio: 1.40,
      ebitdaMarginPct: 34.0,
      gstReconciliationVariancePct: 0.9,
      exportReceivablesPct: 15.0,
      promoterPledgePct: 0.0,
      esgRating: 'A',
      daysSalesOutstanding: 52
    },
    evaluation: {
      modelUsedId: 'MOD-CORP-PD-01',
      modelVersion: '3.4.2-prod',
      basePdPct: 0.70,
      calibratedPdPct: 0.74,
      lgdPct: 30.0,
      expectedLossINR: 1.11,
      internalRating: 'AAA',
      decision: 'APPROVED',
      approvedLimitINR: 500.0,
      pricingSpreadBps: 160,
      complianceChecksPassed: true,
      telemetryDigest: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      timestamp: '2026-09-04T02:18:00Z',
      fourEyesApprovedBy: 'Dr. Vikramaditya Sen (CRO)',
      shapAttributions: [
        {
          feature: 'PROMOTER_PLEDGE',
          featureLabel: 'Zero Promoter Pledge (0.0%)',
          impact: -0.52,
          direction: 'RISK_DECREASING',
          description: 'Pristine governance structure with no encumbrance on institutional holdings.',
          rawValue: '0.0%',
          contributionPct: 34
        },
        {
          feature: 'EBITDA_MARGIN',
          featureLabel: 'EBITDA Margin (34.0%)',
          impact: -0.44,
          direction: 'RISK_DECREASING',
          description: 'Superior power-purchase agreement (PPA) cash margin profile.',
          rawValue: '34.0%',
          contributionPct: 29
        },
        {
          feature: 'DSCR',
          featureLabel: 'DSCR (1.68x)',
          impact: -0.38,
          direction: 'RISK_DECREASING',
          description: 'Strong cash coverage of debt service obligations.',
          rawValue: '1.68x',
          contributionPct: 25
        },
        {
          feature: 'ESG_RATING',
          featureLabel: 'ESG Rating (A)',
          impact: -0.18,
          direction: 'RISK_DECREASING',
          description: 'Qualifies for green finance concessionary capital weighting.',
          rawValue: 'A (Top Tier)',
          contributionPct: 12
        }
      ],
      adverseActionCodes: []
    }
  }
];

export const INITIAL_LIQUIDITY_TELEMETRY: LiquidityTelemetryEvent[] = [
  {
    id: 'LIQ-NOSTRO-USD-01',
    nostroAccount: 'JPMorgan Chase NY (USD Nostro - Clearing)',
    currency: 'USD',
    partnerBank: 'JPMorgan Chase N.A.',
    jurisdiction: 'United States (Federal Reserve Fedwire)',
    currentBalanceMillion: 142.5,
    targetBufferMillion: 180.0,
    intradayVolatilityIndex: 14.8,
    crossCurrencyBasisBps: -28.4,
    rbiLcrBufferRatioPct: 114.2,
    psiDrift: 0.182, // Amber zone
    driftStatus: 'ELEVATED_WATCH',
    lastSweepTime: '2026-09-04T04:10:00Z',
    predictedOutflowNext4HoursMillion: 65.0,
    haircutAppliedPct: 3.5,
    championModelId: 'MOD-LIQ-NOSTRO-02',
    challengerModelId: 'MOD-LIQ-CHALLENGER-02'
  },
  {
    id: 'LIQ-NOSTRO-EUR-02',
    nostroAccount: 'Deutsche Bank AG Frankfurt (EUR Nostro - TARGET2)',
    currency: 'EUR',
    partnerBank: 'Deutsche Bank AG',
    jurisdiction: 'European Union (ECB / Bundesbank)',
    currentBalanceMillion: 98.2,
    targetBufferMillion: 90.0,
    intradayVolatilityIndex: 8.4,
    crossCurrencyBasisBps: -12.1,
    rbiLcrBufferRatioPct: 128.5,
    psiDrift: 0.048,
    driftStatus: 'NORMAL',
    lastSweepTime: '2026-09-04T03:45:00Z',
    predictedOutflowNext4HoursMillion: 22.0,
    haircutAppliedPct: 1.0,
    championModelId: 'MOD-LIQ-NOSTRO-02',
    challengerModelId: 'MOD-LIQ-CHALLENGER-02'
  },
  {
    id: 'LIQ-NOSTRO-GBP-03',
    nostroAccount: 'HSBC Bank plc London (GBP Nostro - CHAPS)',
    currency: 'GBP',
    partnerBank: 'HSBC UK Bank plc',
    jurisdiction: 'United Kingdom (Bank of England)',
    currentBalanceMillion: 45.0,
    targetBufferMillion: 60.0,
    intradayVolatilityIndex: 22.6,
    crossCurrencyBasisBps: -41.2,
    rbiLcrBufferRatioPct: 98.4, // Breached 100% LCR buffer!
    psiDrift: 0.284, // Red zone drift!
    driftStatus: 'CRITICAL_DRIFT',
    lastSweepTime: '2026-09-04T04:05:00Z',
    predictedOutflowNext4HoursMillion: 38.0,
    haircutAppliedPct: 8.0,
    championModelId: 'MOD-LIQ-NOSTRO-02',
    challengerModelId: 'MOD-LIQ-CHALLENGER-02'
  },
  {
    id: 'LIQ-NOSTRO-JPY-04',
    nostroAccount: 'MUFG Bank Tokyo (JPY Nostro - BOJ-NET)',
    currency: 'JPY',
    partnerBank: 'MUFG Bank Ltd',
    jurisdiction: 'Japan (Bank of Japan)',
    currentBalanceMillion: 1250.0,
    targetBufferMillion: 1100.0,
    intradayVolatilityIndex: 6.2,
    crossCurrencyBasisBps: -8.5,
    rbiLcrBufferRatioPct: 135.0,
    psiDrift: 0.035,
    driftStatus: 'NORMAL',
    lastSweepTime: '2026-09-04T02:30:00Z',
    predictedOutflowNext4HoursMillion: 140.0,
    haircutAppliedPct: 1.0,
    championModelId: 'MOD-LIQ-NOSTRO-02',
    challengerModelId: 'MOD-LIQ-CHALLENGER-02'
  }
];

export const COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'RUL-EXP-01',
    code: 'RBI-MRM-2025-C04',
    category: 'EXPLAINABILITY',
    title: 'Algorithmic Credit Explainability & SHAP Decomposition',
    rbiDraftRef: 'Draft Circular on Model Risk Governance (2025) - Cl. 4.2(b): Transparency in Automated Underwriting',
    description: 'Every automated institutional credit decision > ₹50 Cr must generate feature attribution vectors (SHAP/LIME) and clear adverse action codes prior to sanction.',
    enforcementMode: 'ENFORCED_BLOCKING',
    status: 'COMPLIANT',
    thresholdMetric: 'Mandatory SHAP vectors present',
    currentValue: '100% Generated (0 unexplainable decisions)',
    lastEvaluated: '2026-09-04T04:15:00Z',
    autoRemediationAction: 'Block automated loan sanction and re-route to Senior Credit Committee.',
    codeSnippet: `rule "Enforce_SHAP_Telemetry_Gate" {
  when application.requestedLimitINR >= 50.0
  then require(evaluation.shapAttributions.length >= 3)
  assert(evaluation.telemetryDigest != null)
}`
  },
  {
    id: 'RUL-DRIFT-02',
    code: 'RBI-MRM-2025-L02',
    category: 'DRIFT_TELEMETRY',
    title: 'Cross-Border Liquidity Drift & PSI Population Stability Barrier',
    rbiDraftRef: 'RBI Master Direction - Prudential Norms on Liquidity Risk & Nostro Management Sec 8.4',
    description: 'Tier-1 liquidity forecasting models must continuously evaluate Population Stability Index (PSI) against 30-day baseline. PSI >= 0.25 triggers automated champion-challenger failover.',
    enforcementMode: 'AUTO_REMEDIATION_TRIGGER',
    status: 'WARNING',
    thresholdMetric: 'PSI < 0.25 (Critical Breached in GBP Nostro)',
    currentValue: 'GBP Nostro PSI: 0.284 [ALERT]',
    lastEvaluated: '2026-09-04T04:12:00Z',
    autoRemediationAction: 'Auto-Trigger Champion-to-Challenger Failover + Emergency Nostro Top-Up Sweep.',
    codeSnippet: `rule "Liquidity_PSI_Drift_Circuit_Breaker" {
  when stream.psiDrift >= 0.25
  then executeAction("FAILOVER_TO_CHALLENGER_MODEL")
  escalateTo("TREASURY_HEAD", "CRO")
}`
  },
  {
    id: 'RUL-GOV-03',
    code: 'RBI-MRM-2025-G01',
    category: 'GOVERNANCE_RBAC',
    title: 'Independent Model Validation (IMV) Gating & Segregation of Duties',
    rbiDraftRef: 'Draft Circular on Model Risk Governance (2025) - Cl. 2.1: Operational Independence of IMV',
    description: 'Model developers and wholesale credit originators are strictly prohibited from approving Tier-1 models or deploying weights without IMV sign-off and CRO attestation.',
    enforcementMode: 'ENFORCED_BLOCKING',
    status: 'COMPLIANT',
    thresholdMetric: 'Maker-Checker Segregation Verified',
    currentValue: 'Enforced via RBAC (0 self-approvals)',
    lastEvaluated: '2026-09-04T04:00:00Z',
    autoRemediationAction: 'Immediate revocation of deployment token and immutable alert dispatched to Internal Audit.',
    codeSnippet: `rule "Maker_Checker_RBAC_Enforcement" {
  when model.statusChange == "PRODUCTION"
  assert(user.role == "CRO" && model.validatorSignature != null)
}`
  },
  {
    id: 'RUL-STRESS-04',
    code: 'RBI-MRM-2025-S03',
    category: 'STRESS_TESTING',
    title: 'Supervisory Macro-Stress Scenario Calibration',
    rbiDraftRef: 'RBI Guidance Note on Stress Testing - Basel III Pillar 2 (Internal Capital Adequacy Assessment)',
    description: 'All wholesale credit and liquidity models must withstand adverse RBI stress scenarios (300 bps rate shock, 15% currency depreciation, 35% supply chain disruption).',
    enforcementMode: 'AUDIT_FLAG',
    status: 'COMPLIANT',
    thresholdMetric: 'Stress Test Frequency <= 90 Days',
    currentValue: 'Last Executed: 25 Days Ago (Pass: 1.4x Capital Cushion)',
    lastEvaluated: '2026-08-10T18:00:00Z',
    autoRemediationAction: 'Downgrade model tier approval to conditional status.',
    codeSnippet: `rule "Quarterly_Macro_Stress_Testing" {
  when (today - model.lastStressTestDate) > 90.days
  then flagModel("NON_COMPLIANT_STRESS_OVERDUE")
}`
  },
  {
    id: 'RUL-CBL-05',
    code: 'RBI-MRM-2025-CB05',
    category: 'CROSS_BORDER_LIQUIDITY',
    title: 'Minimum Intraday LCR & Cross-Border Nostro Buffer Floor',
    rbiDraftRef: 'RBI Guidelines on Liquidity Coverage Ratio (LCR) & Monitoring Tools - Annex 3',
    description: 'Cross-border Nostro currency clearing buffers must never breach 100% of the intraday stress outflow threshold.',
    enforcementMode: 'AUTO_REMEDIATION_TRIGGER',
    status: 'WARNING',
    thresholdMetric: 'Nostro LCR Buffer >= 100%',
    currentValue: 'GBP Nostro LCR: 98.4% [BREACH]',
    lastEvaluated: '2026-09-04T04:14:00Z',
    autoRemediationAction: 'Trigger autonomous INR/GBP cross-currency basis hedge and Nostro injection.',
    codeSnippet: `rule "Nostro_LCR_Floor_Enforcement" {
  when event.rbiLcrBufferRatioPct < 100.0
  then executeRemediation("TRIGGER_INR_GBP_RESERVE_SWEEP")
}`
  }
];

export const INITIAL_REMEDIATION_QUEUE: RemediationWorkflowItem[] = [
  {
    id: 'REM-2026-0904-01',
    triggeredAt: '2026-09-04T04:12:15Z',
    modelId: 'MOD-LIQ-NOSTRO-02',
    modelName: 'Cross-Border Nostro Liquidity Forecaster',
    nostroAccount: 'HSBC Bank London (GBP Nostro)',
    reason: 'Critical Population Stability Index (PSI) drift breach (0.284 >= 0.25) & LCR Buffer dropped to 98.4%',
    triggerMetric: 'PSI Drift',
    triggerValue: 0.284,
    threshold: 0.25,
    status: 'AWAITING_CRO_SIGN_OFF',
    remediationType: 'CHAMPION_TO_CHALLENGER_FAILOVER',
    resolutionSummary: 'Automated failover prepared: Promote challenger model MOD-LIQ-CHALLENGER-02 with calibrated UK BoE rate pass-through weights.',
    auditHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f'
  },
  {
    id: 'REM-2026-0903-02',
    triggeredAt: '2026-09-03T18:45:00Z',
    modelId: 'MOD-CORP-PD-01',
    modelName: 'Corporate Credit PD & ECL Engine',
    reason: 'Characteristic Stability Index (CSI) spike on promoter pledge variable due to market-wide volatility.',
    triggerMetric: 'Promoter Pledge CSI',
    triggerValue: 0.165,
    threshold: 0.15,
    status: 'AUTO_EXECUTED',
    remediationType: 'DYNAMIC_HAIRCUT_HIKE',
    resolutionSummary: 'Automated 150 bps dynamic risk-weight haircut applied to corporate applicants with promoter pledge > 20%.',
    auditHash: '3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-2026-0419',
    timestamp: '2026-09-04T04:12:15Z',
    actor: 'Compliance-as-Code Telemetry Daemon',
    role: 'IMV_LEAD',
    action: 'POLICY_BREACH_TRIGGERED',
    targetEntity: 'Rule: RBI-MRM-2025-L02 / MOD-LIQ-NOSTRO-02',
    details: 'Population Stability Index (PSI) exceeded 0.25 threshold on GBP Nostro stream. Auto-remediation workflow queued for CRO sign-off.',
    sha256Digest: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    verified: true
  },
  {
    id: 'AUD-2026-0418',
    timestamp: '2026-09-04T02:18:00Z',
    actor: 'Dr. Vikramaditya Sen',
    role: 'CRO',
    action: 'CREDIT_FACILITY_SANCTION_APPROVED',
    targetEntity: 'APP-CIB-2026-9150 (Narmada Energy SPV)',
    details: 'Sanctioned ₹500 Cr FCTL facility based on Tier-1 PD model evaluation (AAA, 0.74% PD). SHAP explainability audit verified.',
    sha256Digest: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    verified: true
  },
  {
    id: 'AUD-2026-0417',
    timestamp: '2026-09-03T18:45:00Z',
    actor: 'Autonomous Risk Controller',
    role: 'IMV_LEAD',
    action: 'DYNAMIC_HAIRCUT_ENFORCED',
    targetEntity: 'MOD-CORP-PD-01 Weights Calibration',
    details: 'Executed dynamic collateral haircut hike following CSI promoter pledge warning.',
    sha256Digest: '3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a2b1c',
    verified: true
  },
  {
    id: 'AUD-2026-0416',
    timestamp: '2026-09-03T14:30:11Z',
    actor: 'Rajesh K. Nambiar',
    role: 'CREDIT_UNDERWRITER',
    action: 'ADVERSE_ACTION_ISSUED',
    targetEntity: 'APP-CIB-2026-9041 (Kaveri Agro)',
    details: 'Generated formal RBI-AAC-012 & RBI-AAC-028 adverse action notices citing promoter pledge and high leverage. Approved limit scaled from ₹180 Cr to ₹110 Cr.',
    sha256Digest: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    verified: true
  }
];
