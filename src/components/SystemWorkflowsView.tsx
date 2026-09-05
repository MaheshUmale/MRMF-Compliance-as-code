import React, { useState } from 'react';
import { 
  GitBranch, 
  Workflow, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  FileCode, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Sliders, 
  Database, 
  Lock, 
  UserCheck, 
  FileText, 
  Sparkles, 
  Coins, 
  Eye, 
  Play, 
  RotateCcw, 
  Code2, 
  Server, 
  Radio,
  ChevronRight,
  ShieldAlert,
  Building2,
  Share2,
  Terminal,
  Activity,
  ArrowDown
} from 'lucide-react';
import { UserPersona } from '../types';

interface SystemWorkflowsViewProps {
  activePersona: UserPersona;
}

interface WorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  actor: string;
  roleRequired: string;
  rbiReference: string;
  description: string;
  policyGateCheck: string;
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING' | 'CRITICAL_GATE';
  inputData: Record<string, any>;
  outputData: Record<string, any>;
  failureHandling: string;
  keyArtifact: string;
}

interface WorkflowDefinition {
  id: string;
  title: string;
  badge: string;
  shortDesc: string;
  icon: any;
  targetDomain: string;
  rbiCircular: string;
  steps: WorkflowStep[];
  talkingPoints: {
    problem: string;
    solution: string;
    rbiComplianceImpact: string;
  };
}

export const SystemWorkflowsView: React.FC<SystemWorkflowsViewProps> = ({ activePersona }) => {
  // Available Workflows
  const WORKFLOWS: WorkflowDefinition[] = [
    {
      id: 'COMPLIANCE_AS_CODE_LIFECYCLE',
      title: 'End-to-End "Compliance-as-Code" Model Governance Pipeline',
      badge: 'PIPELINE ARCHITECTURE',
      shortDesc: 'Automated CI/CD policy gates, independent model validation (IMV), and continuous telemetry from training to production.',
      icon: Layers,
      targetDomain: 'Wholesale & Enterprise Quantitative Risk',
      rbiCircular: 'RBI Draft MRM Circular Section 3.1 & 4.1 (Governance Framework)',
      talkingPoints: {
        problem: 'Traditional banks rely on static annual Excel checklists and retrospective internal audit committees, which miss real-time algorithmic drift and permit self-approval by developers.',
        solution: 'Our Compliance-as-Code framework embeds declarative policy rules directly into automated CI/CD pipelines. Models cannot be promoted without automated independent model validation (IMV) and cryptographic proofs.',
        rbiComplianceImpact: 'Directly enforces statutory four-eyes segregation of duties and eliminates the gap between model deployment and regulatory inspection.'
      },
      steps: [
        {
          id: 'CAC-01',
          stepNumber: 1,
          title: 'Model Registration & Tiering Classification',
          subtitle: 'Institutional Model Ledger Entry',
          actor: 'Model Development Quant / Data Science Team',
          roleRequired: 'Developer (Cannot approve)',
          rbiReference: 'RBI MRM Para 3.2: Comprehensive Model Inventory',
          description: 'Developer commits trained weights, feature schema, training dataset manifest, and code artifacts. The platform assigns Tier-1 Critical status if used in credit sanctions > ₹50 Cr or intraday liquidity operations.',
          policyGateCheck: 'Rule CAC-001: Automatic Tier-1 classification if financial exposure exceeds ₹50 Cr threshold.',
          status: 'COMPLETED',
          inputData: {
            modelName: 'Wholesale Corporate PD Scorer',
            modelCode: 'RB-MRM-CIB-PD-01',
            weightsHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            features: ['DSCR', 'Debt_to_Equity', 'Promoter_Pledge_Pct', 'GST_Variance', 'EBITDA_Margin']
          },
          outputData: {
            assignedTier: 'TIER_1_CRITICAL',
            registryId: 'REG-2026-0904-01',
            imvRequired: true,
            status: 'PENDING_INDEPENDENT_VALIDATION'
          },
          failureHandling: 'If code lacks feature metadata or documentation, pipeline aborts automatically before test execution.',
          keyArtifact: 'Immutable Model Metadata Manifest with Training Data Hash'
        },
        {
          id: 'CAC-02',
          stepNumber: 2,
          title: 'Independent Model Validation (IMV) Four-Eyes Gate',
          subtitle: 'Operational Segregation of Duties',
          actor: 'Lead Independent Model Validator (IMV)',
          roleRequired: 'IMV_LEAD (Strictly segregated from developers)',
          rbiReference: 'RBI MRM Para 4.1: Independent Review & Validation',
          description: 'IMV team independently benchmarks the candidate model using out-of-time (OOT) stress datasets, verifying Kolmogorov-Smirnov (KS >= 40.0), AUC-ROC (>= 0.75), and Brier calibration accuracy.',
          policyGateCheck: 'Rule CAC-004: Segregation of duties check. Developer and Validator user IDs must be strictly disjoint.',
          status: 'COMPLETED',
          inputData: {
            candidateModel: 'RB-MRM-CIB-PD-01 v3.4.2',
            stressDataset: '2020-2024 Macro-Economic Stress OOT Dataset',
            developerId: 'USR-QUANT-7721'
          },
          outputData: {
            ksStatistic: 52.8,
            aucRoc: 0.884,
            brierScore: 0.082,
            imvVerdict: 'PASSED',
            validatorSignature: 'Siddharth Iyer (IMV_LEAD)'
          },
          failureHandling: 'If KS < 40.0 or developer attempts to approve, deployment is blocked and reported to CRO.',
          keyArtifact: 'Independent Validation Technical Dossier & Digital Attestation'
        },
        {
          id: 'CAC-03',
          stepNumber: 3,
          title: 'Automated Compliance-as-Code CI/CD Policy Testing',
          subtitle: 'Declarative Gate Validation',
          actor: 'CI/CD Compliance Engine',
          roleRequired: 'Automated Enforcement Daemon',
          rbiReference: 'RBI MRM Para 4.2: Automated Decisioning Verification',
          description: 'Before containerization, the automated test suite executes 250+ unit and adversarial tests against declarative policy specifications (e.g. adverse action disclosures, SHAP deterministic check, zero demographic bias).',
          policyGateCheck: 'Rule CAC-002: SHAP attribution variance must be zero for identical inputs (deterministic explainability).',
          status: 'COMPLETED',
          inputData: {
            adversarialScenarios: 250,
            stressScenarios: ['150 bps Repo Hike', '25% INR Depreciation', 'Export Slowdown']
          },
          outputData: {
            testsPassed: 250,
            testsFailed: 0,
            policyHash: 'pol-sha256-4c7a8b9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
            deploymentReady: true
          },
          failureHandling: 'Any failed policy check results in immediate build rejection with statutory violation trace.',
          keyArtifact: 'Signed CI/CD Compliance Test Matrix Report'
        },
        {
          id: 'CAC-04',
          stepNumber: 4,
          title: 'Production Staging & Champion-Challenger Binding',
          subtitle: 'Zero-Downtime Hot-Standby Architecture',
          actor: 'Chief Risk Officer (CRO) & Treasury DevOps',
          roleRequired: 'CRO Approval Mandatory',
          rbiReference: 'RBI MRM Para 5.2: Model Versioning & Deployment Governance',
          description: 'Model is deployed to production runtime as the active "Champion". Concurrently, the prior vetted version or an alternative parametric model is bound as the active "Challenger" ready for immediate failover.',
          policyGateCheck: 'Rule CAC-005: Every Tier-1 Production Model must have a pre-calibrated Hot Challenger bound.',
          status: 'COMPLETED',
          inputData: {
            championModelId: 'RB-MRM-CIB-PD-01 (v3.4.2)',
            challengerModelId: 'RB-MRM-CIB-PD-01-CHALLENGER (v3.3.8)',
            failoverThresholdPSI: 0.25
          },
          outputData: {
            liveEndpoint: '/api/v1/inference/corporate-pd',
            trafficAllocation: 'Champion: 90% | Challenger Shadow: 10%',
            state: 'PRODUCTION_ACTIVE'
          },
          failureHandling: 'If no challenger is configured, deployment is held in staging.',
          keyArtifact: 'Dual-Engine Container Manifest & Routing Table'
        },
        {
          id: 'CAC-05',
          stepNumber: 5,
          title: 'Continuous Real-Time Telemetry & Drift Sensors',
          subtitle: 'Continuous Population Stability Monitoring',
          actor: 'Real-Time Telemetry Daemon',
          roleRequired: 'Continuous Background Service',
          rbiReference: 'RBI MRM Para 5.3: Ongoing Monitoring & Drift Remediation',
          description: 'Telemetry sensor computes Population Stability Index (PSI) and Characteristic Stability Index (CSI) across every scoring inference stream. Any distribution shift triggers automated alerts or circuit-breakers.',
          policyGateCheck: 'Rule CAC-003: PSI < 0.10 (Normal), 0.10 - 0.25 (Elevated Watch), >= 0.25 (Automated Failover Trigger).',
          status: 'ACTIVE',
          inputData: {
            sampleFrequency: 'Continuous 15-Minute Windows',
            monitoredMetrics: ['PSI Drift', 'Intraday Outflows', 'LCR Buffer Ratio']
          },
          outputData: {
            currentPSI: 0.084,
            healthStatus: 'STABLE_COMPLIANT',
            lastAuditHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b'
          },
          failureHandling: 'If PSI >= 0.25, system trips circuit breaker and prompts CRO for hitless failover.',
          keyArtifact: 'Real-Time Telemetry Stream & Audit Ledger Event'
        }
      ]
    },
    {
      id: 'CORPORATE_LENDING_EXPLAINABILITY',
      title: 'Automated Corporate Credit Underwriting & SHAP Explainability Engine',
      badge: 'CREDIT SANCTIONS > ₹50 CR',
      shortDesc: 'End-to-end wholesale loan appraisal with mandatory SHAP feature attribution, statutory adverse actions, and four-eyes sign-off.',
      icon: FileText,
      targetDomain: 'Corporate Banking & Large Wholesale Consortium Facilities',
      rbiCircular: 'RBI Draft MRM Circular Section 4.2(b) (Algorithmic Credit Transparency)',
      talkingPoints: {
        problem: 'Corporate credit black-box models frequently sanction risky loans or decline viable enterprises without traceable mathematical justification, exposing banks to litigation and RBI penalties.',
        solution: 'Every institutional underwriting run decomposes the final Probability of Default (PD) into exact SHAP vectors (e.g. +0.485 risk impact from promoter pledge > 20%), attaching statutory adverse action codes.',
        rbiComplianceImpact: 'Guarantees 100% compliance with RBI statutory borrower disclosure guidelines and establishes a tamper-evident audit trail for credit committees.'
      },
      steps: [
        {
          id: 'CLE-01',
          stepNumber: 1,
          title: 'Borrower Data Ingestion & Statutory Triangulation',
          subtitle: 'LEI & Regulatory Cross-Verification',
          actor: 'Senior Corporate Credit Underwriter',
          roleRequired: 'CREDIT_UNDERWRITER',
          rbiReference: 'RBI Guidelines on Large Exposures Framework (LEF)',
          description: 'Underwriter inputs audited financial statements, consortium limits, and MCA/GST filings. The system validates the Legal Entity Identifier (LEI) and cross-checks GST returns against balance sheet turnover.',
          policyGateCheck: 'GST reconciliation variance must be flagged if discrepancy exceeds 5.0%.',
          status: 'COMPLETED',
          inputData: {
            entity: 'Zenith Heavy Logistics & Maritime Ltd',
            lei: '335800G94U8372KV8912',
            facilityRequested: 'Syndicated Term Loan: ₹250 Crores',
            dscr: 1.42,
            debtToEquity: 2.2,
            promoterPledgePct: 14.0
          },
          outputData: {
            leiVerified: true,
            gstDiscrepancy: '2.1% (Acceptable)',
            inputHash: 'hash-inputs-8873612879a'
          },
          failureHandling: 'If LEI is invalid or lapsed, application cannot proceed to scoring engine.',
          keyArtifact: 'Validated Financial Feature Vector'
        },
        {
          id: 'CLE-02',
          stepNumber: 2,
          title: 'Algorithmic PD/LGD Scoring & Macro-Stress Calibration',
          subtitle: 'Tier-1 Probability of Default Engine',
          actor: 'Corporate PD Scorer Model (RB-MRM-CIB-PD-01)',
          roleRequired: 'Automated Scoring Engine',
          rbiReference: 'Basel III Internal Ratings-Based (IRB) Approach',
          description: 'The production credit model evaluates the borrower vector, outputting base default probability (PD) and through-the-cycle (TTC) calibrated PD incorporating macro stress assumptions.',
          policyGateCheck: 'Calibrated PD must factor minimum regulatory Loss Given Default (LGD) floor of 45%.',
          status: 'COMPLETED',
          inputData: {
            rawPDInput: 'Validated Feature Vector',
            macroScenario: 'Baseline + 50 bps RBI Repo Stress'
          },
          outputData: {
            basePD: '1.24%',
            calibratedPD: '1.48%',
            lgd: '45.0%',
            expectedLoss: '₹1.67 Crores',
            internalRating: 'A+'
          },
          failureHandling: 'If calibrated PD > 4.5%, loan decision automatically switches to CONDITIONAL or REJECTED.',
          keyArtifact: 'Quantitative Risk Scorecard & Capital Adequacy Requirement'
        },
        {
          id: 'CLE-03',
          stepNumber: 3,
          title: 'Deterministic SHAP Feature Vector Attribution',
          subtitle: 'Local Explainability Decomposition',
          actor: 'Audit-Ready Explainability Module',
          roleRequired: 'Deterministic SHAP Telemetry Bus',
          rbiReference: 'RBI MRM Para 4.2(b): Transparent Explanations for Credit Decisions',
          description: 'The algorithm breaks down the PD score into positive (risk-mitigating) and negative (risk-elevating) SHAP contributions. For instance, strong DSCR (1.42x) lowers PD by -0.320, while leverage adds +0.180.',
          policyGateCheck: 'Total sum of SHAP feature contributions must mathematically reconcile to the log-odds of the score.',
          status: 'COMPLETED',
          inputData: {
            rawScoreLogOdds: -4.18,
            baseValue: -3.85
          },
          outputData: {
            topMitigators: ['DSCR 1.42x (-0.320)', 'EBITDA Margin 24% (-0.210)'],
            topElevators: ['Debt/Equity 2.2x (+0.180)', 'Promoter Pledge 14% (+0.120)'],
            reconciledSum: '100% Exact Match'
          },
          failureHandling: 'If SHAP calculation exhibits non-deterministic jitter, inference is halted.',
          keyArtifact: 'Audit-Ready SHAP Waterfall Feature Vector'
        },
        {
          id: 'CLE-04',
          stepNumber: 4,
          title: 'Statutory Adverse Action Disclosure Generation',
          subtitle: 'Mandatory RBI Justification Codes',
          actor: 'Statutory Compliance Gate',
          roleRequired: 'Automated Regulatory Policy Engine',
          rbiReference: 'RBI Fair Lending Practices & Adverse Action Mandate',
          description: 'If any individual metric crosses regulatory caution zones (e.g. promoter pledge > 12%), statutory Adverse Action Codes (e.g. RBI-AAC-012) are auto-generated with mandatory covenant recommendations.',
          policyGateCheck: 'Mandatory generation of minimum 2 actionable mitigation covenants if score requires conditionality.',
          status: 'COMPLETED',
          inputData: {
            promoterPledge: 14.0,
            threshold: 12.0
          },
          outputData: {
            adverseActionGenerated: 'RBI-AAC-012: Elevated Share Encumbrance',
            mitigationCovenant: 'Promoter personal guarantee required + margin call trigger at 18%'
          },
          failureHandling: 'No loan can be conditionally sanctioned without explicit mitigation covenants.',
          keyArtifact: 'Statutory Adverse Action & Covenant Notice'
        },
        {
          id: 'CLE-05',
          stepNumber: 5,
          title: 'Cryptographic SHA-256 Digest Sealing',
          subtitle: 'Tamper-Evident Inference Record',
          actor: 'Ledger Security Daemon',
          roleRequired: 'Immutable Audit Subsystem',
          rbiReference: 'RBI MRM Section 5.1: Immutable Algorithmic Traceability',
          description: 'The complete inference dossier (inputs, outputs, model version, SHAP attributions, timestamp) is hashed using SHA-256 and committed to the internal audit ledger for supervisory verification.',
          policyGateCheck: 'Digest must be verifiable against source inputs via cryptographic verification test.',
          status: 'COMPLETED',
          inputData: {
            applicationPayload: 'Zenith Logistics Dossier + SHAP Vectors'
          },
          outputData: {
            telemetryDigest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            ledgerTimestamp: '2026-09-04T12:45:00Z',
            sealStatus: 'SEAL_INTACT'
          },
          failureHandling: 'If hash generation fails or ledger is unreachable, loan sanction cannot be finalized.',
          keyArtifact: 'Cryptographic Audit Block in Ledger'
        },
        {
          id: 'CLE-06',
          stepNumber: 6,
          title: 'Four-Eyes Sanction & Sign-Off Gate',
          subtitle: 'CRO / Credit Committee Attestation',
          actor: 'Chief Risk Officer (CRO)',
          roleRequired: 'CRO / CREDIT_COMMITTEE (Maker-Checker)',
          rbiReference: 'RBI Board Governance & Credit Sanctioning Authorities',
          description: 'Credit Underwriter (Maker) proposes facility sanction. Final sign-off requires independent review and digital attestation by the Chief Risk Officer (Checker), completing four-eyes segregation.',
          policyGateCheck: 'Sanction button disabled until CRO persona is active and all compliance gates green.',
          status: 'COMPLETED',
          inputData: {
            proposedFacility: '₹250 Crores',
            pricing: 'RBI Repo + 185 bps',
            underwriter: 'Rajesh Mehta (Credit Underwriter)'
          },
          outputData: {
            sanctionStatus: 'SANCTIONED_WITH_FOUR_EYES_APPROVAL',
            signedBy: 'Ananya Deshmukh (Chief Risk Officer)',
            facilityLetterDispatched: true
          },
          failureHandling: 'If CRO declines or requests covenants, dossier returns to underwriter.',
          keyArtifact: 'Executed Facility Sanction Letter with Digital Signatures'
        }
      ]
    },
    {
      id: 'CROSS_BORDER_LIQUIDITY_REMEDIATION',
      title: 'Real-Time Cross-Border Liquidity Drift & Autonomous Remediation',
      badge: 'NOSTRO CLEARING DESK',
      shortDesc: 'High-frequency PSI drift sensors across USD/EUR/GBP accounts, automatic circuit breakers, and champion-challenger failover.',
      icon: Coins,
      targetDomain: 'Global Markets, Treasury & Nostro Clearing Desks',
      rbiCircular: 'RBI Master Direction on Intraday Liquidity Risk Management & Nostro Buffers',
      talkingPoints: {
        problem: 'Global currency shocks (e.g. sudden SOFR/MIFOR basis widening or NY clearing backlogs) cause forecasting models to drift silently, depleting Nostro balances below RBI minimum LCR floors.',
        solution: 'Continuous 15-minute streaming sensors calculate the Population Stability Index (PSI). If PSI breaches 0.25 or LCR dips below 100%, the platform autonomously executes hitless champion-to-challenger failover and liquidity sweeps.',
        rbiComplianceImpact: 'Satisfies RBI real-time intraday monitoring requirements and ensures systemic cross-border solvency under volatile macro conditions.'
      },
      steps: [
        {
          id: 'CBL-01',
          stepNumber: 1,
          title: 'High-Frequency Inflow/Outflow Telemetry Ingestion',
          subtitle: 'SWIFT MT950 & Fedwire Intraday Feeds',
          actor: 'Global Treasury Telemetry Collector',
          roleRequired: 'TREASURY_HEAD / Automated Telemetry',
          rbiReference: 'RBI Master Direction: Intraday Liquidity Monitoring',
          description: 'Streaming connectors continuously aggregate intraday debit/credit statements across multi-currency clearing accounts (USD JPMorgan NY, EUR Deutsche Bank Frankfurt, GBP HSBC London, JPY MUFG Tokyo).',
          policyGateCheck: 'Data ingestion lag must remain under 30 seconds for Tier-1 Nostro accounts.',
          status: 'COMPLETED',
          inputData: {
            accountsMonitored: ['USD-JPM-NY', 'EUR-DB-FFT', 'GBP-HSBC-LDN', 'JPY-MUFG-TKO'],
            totalNostroBalanceINR: '₹4,850 Crores Equivalent'
          },
          outputData: {
            usdBalance: '$420.5M',
            eurBalance: '€185.0M',
            gbpBalance: '£95.0M',
            streamLatencyMs: 180
          },
          failureHandling: 'If feed drops, fallback to secondary SWIFT GPI API with immediate alert.',
          keyArtifact: 'Intraday Liquidity Telemetry Stream'
        },
        {
          id: 'CBL-02',
          stepNumber: 2,
          title: 'Continuous Population Stability Index (PSI) Calculation',
          subtitle: 'Algorithmic Distribution Shift Detection',
          actor: 'Drift Detection Engine',
          roleRequired: 'Automated Real-Time Sensor',
          rbiReference: 'RBI MRM Para 5.3: Quantitative Drift Thresholds',
          description: 'The drift engine compares the current 4-hour transaction distribution against the historical baseline training distribution, calculating Population Stability Index (PSI) and Cross-Currency Basis.',
          policyGateCheck: 'PSI < 0.10: Normal | 0.10 - 0.25: Elevated Watch | >= 0.25: Critical Breach & Remediation.',
          status: 'COMPLETED',
          inputData: {
            baselineDistribution: 'Q2 2026 Calibrated FX Flow Matrix',
            observedDistribution: 'Last 4 Hours Realized Transactions'
          },
          outputData: {
            usdNostroPSI: 0.185,
            statusUSD: 'ELEVATED_WATCH',
            sofrMiforBasis: '28 bps'
          },
          failureHandling: 'If drift calculation encounters zero-frequency bins, apply Laplace smoothing.',
          keyArtifact: 'Real-Time PSI Matrix & Stability Vector'
        },
        {
          id: 'CBL-03',
          stepNumber: 3,
          title: 'Threshold Breach & Circuit-Breaker Triggering',
          subtitle: 'Autonomous Incident Detection',
          actor: 'Compliance-as-Code Circuit Breaker Daemon',
          roleRequired: 'Policy Enforcement Subsystem',
          rbiReference: 'RBI MRM Para 4.4: Dynamic Model Safeguards & Circuit Breakers',
          description: 'When market volatility spikes (e.g. PSI jumps to 0.295 or LCR buffer drops to 94%), the circuit breaker trips automatically, placing the champion model under caution and arming the hot challenger.',
          policyGateCheck: 'Immediate dispatch of priority alerts to CRO and Head of Global Treasury.',
          status: 'COMPLETED',
          inputData: {
            breachMetric: 'USD Nostro PSI: 0.295 (Threshold: 0.250)',
            lcrBuffer: '94.2% (RBI Floor: 100.0%)'
          },
          outputData: {
            remediationIncidentId: 'REM-2026-0904-88',
            actionQueued: 'CHAMPION_TO_CHALLENGER_FAILOVER',
            status: 'AWAITING_CRO_SIGN_OFF'
          },
          failureHandling: 'Automatic fail-safe lock prevents new algorithmic FX exposures until sign-off.',
          keyArtifact: 'Automated Remediation Workflow Ticket'
        },
        {
          id: 'CBL-04',
          stepNumber: 4,
          title: 'Hitless Champion-to-Challenger Model Failover',
          subtitle: 'Zero-Downtime Algorithmic Switch',
          actor: 'Chief Risk Officer / Head of Global Treasury',
          roleRequired: 'CRO / TREASURY_HEAD (Authorized Signatory)',
          rbiReference: 'RBI MRM Para 5.2: Contingency Planning & Challenger Activation',
          description: 'Authorized officer clicks "Authorize & Execute Failover". The platform seamlessly shifts inference routing to the pre-calibrated Hot Challenger model (with volatility damping) without dropping in-flight transactions.',
          policyGateCheck: 'Challenger must have an active IMV certification within the last 90 days.',
          status: 'ACTIVE',
          inputData: {
            retiringChampion: 'MOD-LIQ-NOSTRO-02 (v2.8)',
            promotingChallenger: 'MOD-LIQ-CHALLENGER-02 (v3.1 Volatility Damped)'
          },
          outputData: {
            trafficSwitched: '100% Routed to Challenger',
            haircutApplied: '+200 bps Collateral Haircut Injected',
            executionTimeMs: 42
          },
          failureHandling: 'If challenger fails smoke test, fall back to statutory conservative ruleset.',
          keyArtifact: 'Executed Failover Audit Record'
        },
        {
          id: 'CBL-05',
          stepNumber: 5,
          title: 'Reserve Buffer Sweep & Solvency Rebalancing',
          subtitle: 'Liquidity Coverage Ratio Restoration',
          actor: 'Treasury Settlement Bot',
          roleRequired: 'Automated Core Banking Interface',
          rbiReference: 'RBI Reserve Bank Master Directions on Liquidity Management',
          description: 'System triggers an automated liquidity sweep from domestic RBI surplus reserve accounts into the offshore Nostro buffer, raising the intraday LCR buffer comfortably back above 115%.',
          policyGateCheck: 'Post-sweep LCR buffer must exceed 110% minimum cushion.',
          status: 'PENDING',
          inputData: {
            topUpAmount: '$45.0 Million',
            fundingSource: 'RBI Domestic Standing Liquidity Facility (SLF)'
          },
          outputData: {
            restoredBalance: '$465.5M',
            restoredLCR: '118.5%',
            settlementReference: 'SWIFT-MT202-998127391'
          },
          failureHandling: 'If counterparty bank limits reached, split sweep across secondary partner.',
          keyArtifact: 'Settlement Confirmation & Updated Balance Ledger'
        }
      ]
    },
    {
      id: 'SUPERVISORY_REPORTING_AI_AUDITOR',
      title: 'Quarterly Supervisory Reporting & AI Regulatory Examination',
      badge: 'FORM MRM-CIB-01',
      shortDesc: 'Automated synthesis of regulatory returns, Gemini-powered inspection memorandums, and digital Board attestation.',
      icon: Activity,
      targetDomain: 'Regulatory Affairs, Board MRM Committee & Supervisory Oversight',
      rbiCircular: 'RBI Department of Supervision (DoS) Model Governance Return',
      talkingPoints: {
        problem: 'Compiling quarterly model risk returns takes months of manual cross-department reconciliation, resulting in delayed filings and audit observations from RBI inspection officers.',
        solution: 'Our platform auto-aggregates all scoring logs, SHAP explainability distributions, and drift incidents into standard Form MRM-CIB-01. Gemini generates formal supervisory inspection memos with cryptographic hashes.',
        rbiComplianceImpact: 'Reduces regulatory return preparation from 6 weeks to 3 minutes, fully pre-validated against RBI inspection guidelines.'
      },
      steps: [
        {
          id: 'SRA-01',
          stepNumber: 1,
          title: 'Automated Return Aggregation (Form MRM-CIB-01)',
          subtitle: 'Continuous Telemetry Compilation',
          actor: 'Supervisory Reporting Engine',
          roleRequired: 'Automated Regulatory Subsystem',
          rbiReference: 'RBI Department of Supervision (DoS) Quarterly Return',
          description: 'Platform queries the cryptographic audit ledger, extracting model inventory metrics, average KS statistics, AUC-ROC, drift alerts, and mandatory SHAP compliance rates for the reporting quarter.',
          policyGateCheck: 'Return must account for 100% of Tier-1 wholesale model scoring runs during the quarter.',
          status: 'COMPLETED',
          inputData: {
            reportingQuarter: 'Q3-2026',
            entityLEI: '335800G94U8372KV8912',
            modelCount: 4
          },
          outputData: {
            totalScoredVolumeINR: '₹4,250 Crores',
            shapComplianceRate: '100.0%',
            adverseActionCodesDispatched: 18,
            driftIncidentsResolved: 3
          },
          failureHandling: 'If any model run lacks cryptographic digest, flag audit exception in Section D.',
          keyArtifact: 'Draft Form MRM-CIB-01 Data Payload'
        },
        {
          id: 'SRA-02',
          stepNumber: 2,
          title: 'AI Supervisory Model Risk Auditor (Powered by Gemini)',
          subtitle: 'Inspection-Grade Synthesis',
          actor: 'Gemini AI Supervisory Specialist',
          roleRequired: 'Server-Side Enterprise Intelligence',
          rbiReference: 'RBI Supervisory Examination Standard Operating Procedure',
          description: 'The Gemini model analyzes all metrics, model validation reports, and drift events to synthesize a formal, objective, inspection-grade Supervisory Audit Memorandum identifying potential model vulnerabilities.',
          policyGateCheck: 'AI output must follow prescribed statutory RBI memorandum formatting and cite relevant circulars.',
          status: 'COMPLETED',
          inputData: {
            modelDossier: 'RB-MRM-CIB-PD-01',
            telemetrySummary: 'KS=52.8, AUC=0.884, PSI=0.084'
          },
          outputData: {
            memoStatus: 'VERIFIED_AUDIT_MEMORANDUM',
            findings: 'Model satisfies capital adequacy buffers with acceptable calibration margin.',
            actionableRecommendations: 'Annual re-benchmarking recommended before Q1 2027.'
          },
          failureHandling: 'In case of AI service timeout, fall back to standard template generator.',
          keyArtifact: 'Official Supervisory Audit Inspection Memorandum'
        },
        {
          id: 'SRA-03',
          stepNumber: 3,
          title: 'Board Committee Digital Attestation',
          subtitle: 'Statutory Accountability Sign-Off',
          actor: 'Chief Risk Officer (CRO)',
          roleRequired: 'CRO (Authorizing Officer)',
          rbiReference: 'RBI Governance: Board & Senior Management Responsibilities',
          description: 'The Chief Risk Officer reviews the synthesized return, inspects exception logs, and applies a cryptographic digital signature certifying that independent validation and segregation of duties were maintained.',
          policyGateCheck: 'Signature valid only if attested by verified CRO persona with active token.',
          status: 'COMPLETED',
          inputData: {
            officerName: 'Ananya Deshmukh',
            role: 'CRO',
            declarationText: 'Certified under the authority of the Board Model Risk Management Committee'
          },
          outputData: {
            attestationTimestamp: '2026-09-04T12:50:22Z',
            digitalSignatureHash: 'sig-sha256-883a99b2c1d0e4f5a6b7c8d9e0f1a2b3',
            attestationStatus: 'SIGNED'
          },
          failureHandling: 'Unsigned returns are rejected at the filing gateway.',
          keyArtifact: 'Digitally Attested Board MRM Declaration'
        },
        {
          id: 'SRA-04',
          stepNumber: 4,
          title: 'Electronic Dispatch & Cryptographic Receipt',
          subtitle: 'RBI DAKSH / XBRL Gateway Integration',
          actor: 'Regulatory Submission Bridge',
          roleRequired: 'Automated Regulatory Bridge',
          rbiReference: 'RBI DAKSH Electronic Filing Guidelines',
          description: 'The finalized, attested return is serialized into audit-ready JSON/XBRL format and packaged with its SHA-256 seal for transmission to the Reserve Bank of India Department of Supervision.',
          policyGateCheck: 'Package hash must match internal cryptographic audit ledger entry.',
          status: 'COMPLETED',
          inputData: {
            filingId: 'RBI-MRM-2026-Q3-335800G94U8372KV8912',
            format: 'JSON / XBRL Form MRM-CIB-01'
          },
          outputData: {
            dispatchStatus: 'SUCCESSFULLY_FILED',
            acknowledgementNumber: 'RBI-ACK-982173491823',
            filingTimestamp: '2026-09-04T12:51:00Z'
          },
          failureHandling: 'Retry on transmission failure with automated queuing and alert.',
          keyArtifact: 'RBI Official Acknowledgement Receipt & Downloadable Return'
        }
      ]
    },
    {
      id: 'RBAC_SEGREGATION_MATRIX',
      title: 'Four-Eyes Maker-Checker & Segregation of Duties (RBAC) Governance',
      badge: 'GOVERNANCE & CONTROLS',
      shortDesc: 'Mathematical role matrix preventing self-approval and enforcing independent supervisory gates across all institutional personas.',
      icon: UserCheck,
      targetDomain: 'Enterprise Risk Management, Internal Audit & Compliance Oversight',
      rbiCircular: 'RBI Draft MRM Circular Section 4.1 (Organizational Independence)',
      talkingPoints: {
        problem: 'In many financial institutions, model developers hold administrator rights allowing them to calibrate weights, execute underwriting decisions, and self-certify compliance without checks.',
        solution: 'Our RBAC architecture strictly isolates authorities. A Quant Developer cannot approve an IMV review; a Credit Underwriter cannot override a model without CRO sign-off; and Treasury cannot execute failovers without validation.',
        rbiComplianceImpact: 'Directly fulfills the core Pillar 2 mandate for complete organizational segregation of the First Line (Business/Quant), Second Line (IMV/CRO), and Third Line (Audit/RBI).'
      },
      steps: [
        {
          id: 'RBAC-01',
          stepNumber: 1,
          title: 'Line 1: Model Development (Quant Engineering)',
          subtitle: 'Model Builders & Algorithm Designers',
          actor: 'Model Development Quant',
          roleRequired: 'Developer (1st Line of Defense)',
          rbiReference: 'RBI MRM Para 4.1: Model Developer Restrictions',
          description: 'Responsible for data cleansing, model training, and documentation. Explicitly prohibited from granting validation approvals or self-certifying model suitability for production deployment.',
          policyGateCheck: 'CANNOT approve Tier-1 models, CANNOT sanction credit, CANNOT file RBI returns.',
          status: 'COMPLETED',
          inputData: { permittedAction: 'Code & Feature Engineering', restrictedAction: 'Production Approval' },
          outputData: { restrictionEnforced: true, accessLevel: 'READ_DEVELOP_ONLY' },
          failureHandling: 'System denies any attempt to promote code directly to production.',
          keyArtifact: 'Developer Activity Log'
        },
        {
          id: 'RBAC-02',
          stepNumber: 2,
          title: 'Line 2A: Independent Model Validation (IMV Lead)',
          subtitle: 'Independent Quantitative Assessor',
          actor: 'Lead Independent Model Validator (IMV)',
          roleRequired: 'IMV_LEAD (2nd Line of Defense)',
          rbiReference: 'RBI MRM Para 4.1(b): Operational Independence of IMV',
          description: 'Reports independently to the Chief Risk Officer outside business reporting lines. Conducts conceptual soundness reviews, stress testing, and adversarial benchmarking.',
          policyGateCheck: 'CAN trigger stress testing, CAN approve validation status, CANNOT develop models.',
          status: 'COMPLETED',
          inputData: { authority: 'Independent Benchmark Review', independenceVerified: true },
          outputData: { validationVerdict: 'INDEPENDENT_CERTIFIED' },
          failureHandling: 'If validator shares reporting manager with developer, validation is voided.',
          keyArtifact: 'Independent Validation Sign-Off Certificate'
        },
        {
          id: 'RBAC-03',
          stepNumber: 3,
          title: 'Line 2B: Senior Executive Risk (Chief Risk Officer)',
          subtitle: 'Final Sanction & Circuit-Breaker Authority',
          actor: 'Chief Risk Officer (CRO)',
          roleRequired: 'CRO (Highest 2nd Line Executive Authority)',
          rbiReference: 'RBI MRM Section 3: Senior Management Accountability',
          description: 'Holds ultimate executive authority for Tier-1 model approvals, emergency circuit-breaker execution, four-eyes loan sign-offs, and Board supervisory return attestations.',
          policyGateCheck: 'Full Four-Eyes authority; digital signature required on all statutory filings.',
          status: 'ACTIVE',
          inputData: { executivePowers: 'Circuit-Breaker, Tier-1 Sanctions, Board Attestation' },
          outputData: { croApprovalGranted: true, fourEyesComplete: true },
          failureHandling: 'Emergency overrides trigger automated board-level incident alerts.',
          keyArtifact: 'CRO Executive Attestation Ledger Record'
        },
        {
          id: 'RBAC-04',
          stepNumber: 4,
          title: 'Line 3: Supervisory Examination (RBI Inspector)',
          subtitle: 'Independent Statutory Examination',
          actor: 'RBI Supervisory Inspector / Internal Audit Lead',
          roleRequired: 'RBI_AUDITOR (External Statutory Examiner)',
          rbiReference: 'RBI Section 5.4: Supervisory Inspection & On-Site Audits',
          description: 'Possesses read-only cryptographic access to inspect all raw logs, SHAP vectors, model registries, and drift histories without ability to alter or delete historic telemetry records.',
          policyGateCheck: 'Immutable read-only access with cryptographic integrity check enabled.',
          status: 'COMPLETED',
          inputData: { inspectEntity: 'Indus Commercial & Institutional Banking' },
          outputData: { ledgerAuditVerified: '100% Cryptographically Intact' },
          failureHandling: 'Any tamper detection triggers immediate regulatory breach warning.',
          keyArtifact: 'Supervisory On-Site Audit Examination Certificate'
        }
      ]
    }
  ];

  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(WORKFLOWS[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [showFullPayload, setShowFullPayload] = useState<boolean>(false);
  const [simulatingFlow, setSimulatingFlow] = useState<boolean>(false);

  const activeWorkflow = WORKFLOWS.find(w => w.id === selectedWorkflowId) || WORKFLOWS[0];
  const activeStep = activeWorkflow.steps[activeStepIndex] || activeWorkflow.steps[0];

  // Auto step walkthrough simulation
  const handleAutoWalkthrough = () => {
    setSimulatingFlow(true);
    let curr = 0;
    setActiveStepIndex(0);

    const interval = setInterval(() => {
      curr += 1;
      if (curr < activeWorkflow.steps.length) {
        setActiveStepIndex(curr);
      } else {
        clearInterval(interval);
        setSimulatingFlow(false);
      }
    }, 2000);
  };

  const handleNextStep = () => {
    if (activeStepIndex < activeWorkflow.steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                SYSTEM WORKFLOWS & GOVERNANCE ARCHITECTURE
              </span>
              <span className="text-xs font-mono text-slate-400">
                Interactive Operational Blueprint for CIB
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">
              Complete System Workflows & Supervisory Execution Flows
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl mt-1">
              Step-by-step interactive walkthroughs demonstrating how the Compliance-as-Code pipeline enforces RBI Model Risk Management regulations, SHAP algorithmic explainability, real-time drift circuit breakers, and segregation of duties.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoWalkthrough}
              disabled={simulatingFlow}
              className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/50 disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${simulatingFlow ? 'animate-spin' : ''}`} />
              <span>{simulatingFlow ? 'Simulating Lifecycle...' : 'Auto-Play Workflow'}</span>
            </button>
            <button
              onClick={() => setActiveStepIndex(0)}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Workflow Selection Buttons (Horizontal Pills) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {WORKFLOWS.map((wf) => {
            const isSelected = wf.id === selectedWorkflowId;
            const Icon = wf.icon;
            return (
              <button
                key={wf.id}
                onClick={() => {
                  setSelectedWorkflowId(wf.id);
                  setActiveStepIndex(0);
                }}
                className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-950/40 text-slate-100'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                      isSelected ? 'border-cyan-500/40 bg-cyan-950/60 text-cyan-300' : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}>
                      {wf.badge}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                  <div className="text-xs font-bold line-clamp-2">{wf.title}</div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-2">
                  {wf.steps.length} Sequenced Steps
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workflow Context & Executive Talking Points Strip */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
        <div className="lg:col-span-4 space-y-1">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
            REGULATORY FOUNDATION
          </div>
          <div className="font-semibold text-slate-200">{activeWorkflow.rbiCircular}</div>
          <div className="text-slate-400 text-[11px] mt-1">{activeWorkflow.shortDesc}</div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-3 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-3 lg:pt-0 lg:pl-4">
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-rose-400 uppercase font-semibold">Traditional Banking Gap</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">{activeWorkflow.talkingPoints.problem}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Compliance-as-Code Solution</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">{activeWorkflow.talkingPoints.solution}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">RBI Statutory Impact</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">{activeWorkflow.talkingPoints.rbiComplianceImpact}</p>
          </div>
        </div>
      </div>

      {/* Step Sequence Timeline Bar (Clickable Stages) */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              PROCESS SEQUENCE: STEP {activeStepIndex + 1} OF {activeWorkflow.steps.length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handlePrevStep}
              disabled={activeStepIndex === 0}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 font-mono text-[11px]"
            >
              &larr; Prev Step
            </button>
            <button
              onClick={handleNextStep}
              disabled={activeStepIndex === activeWorkflow.steps.length - 1}
              className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold disabled:opacity-40 font-mono text-[11px]"
            >
              Next Step &rarr;
            </button>
          </div>
        </div>

        {/* Step Nodes Track */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-1">
          {activeWorkflow.steps.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isPassed = idx < activeStepIndex;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all relative ${
                  isCurrent
                    ? 'bg-slate-800 border-cyan-500 shadow-md shadow-cyan-950/40 text-slate-100'
                    : isPassed
                    ? 'bg-slate-950/80 border-emerald-500/30 text-slate-300'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={isCurrent ? 'text-cyan-400 font-bold' : isPassed ? 'text-emerald-400' : 'text-slate-500'}>
                    STEP 0{step.stepNumber}
                  </span>
                  {isPassed ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-[11px] font-bold truncate">{step.title}</div>
                <div className="text-[9px] text-slate-400 truncate mt-0.5">{step.actor}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Step Inspector: Deep Dive & Live Payload */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Step Functional Anatomy & Regulatory Gate */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    STEP 0{activeStep.stepNumber}: {activeStep.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{activeStep.subtitle}</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-1">{activeStep.title}</h3>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Role: {activeStep.roleRequired}</span>
              </div>
            </div>

            {/* Description & Operational Mechanics */}
            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                EXECUTION MECHANICS & BUSINESS LOGIC
              </div>
              <p className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                {activeStep.description}
              </p>
            </div>

            {/* RBI Statutory Citation & Policy Gate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                <div className="text-[10px] text-cyan-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>RBI STATUTORY MANDATE</span>
                </div>
                <div className="text-[11px] text-slate-200">{activeStep.rbiReference}</div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>AUTOMATED POLICY GATE</span>
                </div>
                <div className="text-[11px] text-slate-200">{activeStep.policyGateCheck}</div>
              </div>
            </div>

            {/* Failure Handling & Circuit Breakers */}
            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs space-y-1">
              <div className="text-[10px] font-mono text-rose-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>EXCEPTION & CIRCUIT-BREAKER LOGIC</span>
              </div>
              <div className="text-[11px] text-slate-300">{activeStep.failureHandling}</div>
            </div>

            {/* Key Governance Output Artifact */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">OUTPUT ARTIFACT:</span>
              <span className="text-cyan-300 font-bold">{activeStep.keyArtifact}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Data Telemetry & Payload Inspector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>TELEMETRY PAYLOAD STREAM</span>
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  Runtime JSON Structure for Step 0{activeStep.stepNumber}
                </p>
              </div>

              <button
                onClick={() => setShowFullPayload(!showFullPayload)}
                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline"
              >
                {showFullPayload ? 'Show Split View' : 'Inspect Full JSON'}
              </button>
            </div>

            {/* JSON Code Inspector */}
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                  <span>INPUT PAYLOAD (INGESTION)</span>
                  <span className="text-cyan-400">SOURCE: {activeStep.actor}</span>
                </div>
                <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-48 leading-relaxed">
                  {JSON.stringify(activeStep.inputData, null, 2)}
                </pre>
              </div>

              <div>
                <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                  <span>OUTPUT TELEMETRY & AUDIT PROOF</span>
                  <span className="text-emerald-400">SEALED BY GATEWAY</span>
                </div>
                <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-48 leading-relaxed">
                  {JSON.stringify(activeStep.outputData, null, 2)}
                </pre>
              </div>
            </div>

            {/* Cryptographic Verification Seal Indicator */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>SHA-256 TELEMETRY SEAL:</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                VERIFIED DETERMINISTIC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Architectural System Flow Diagram (End-to-End Visual Map) */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Full System Architecture & Inter-Component Communication Topology</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              How institutional transactions flow through compliance verification layers in milliseconds
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400">
            CIB Production Topology
          </span>
        </div>

        {/* Visual Multi-Layer Architecture Map */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          {/* Layer 1: Ingestion */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1">
              <Server className="w-3.5 h-3.5" />
              <span>LAYER 01: INGESTION</span>
            </div>
            <div className="font-bold text-slate-200">Wholesale Data Bus</div>
            <ul className="text-[10px] text-slate-400 space-y-1 list-disc list-inside">
              <li>Core Banking System (Finacle)</li>
              <li>SWIFT MT950 Nostro Feeds</li>
              <li>MCA/GST Portal Triangulation</li>
              <li>Legal Entity Identifier (LEI)</li>
            </ul>
            <div className="pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
              Input Validation & Masking
            </div>
          </div>

          {/* Layer 2: Policy CI/CD Gate */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" />
              <span>LAYER 02: POLICY GATES</span>
            </div>
            <div className="font-bold text-slate-200">Compliance-as-Code Engine</div>
            <ul className="text-[10px] text-slate-400 space-y-1 list-disc list-inside">
              <li>Declarative DSL Policies</li>
              <li>IMV Segregation Validator</li>
              <li>Model Tier-1 Boundary Checks</li>
              <li>Stress Testing Gate (KS &ge; 40)</li>
            </ul>
            <div className="pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
              CI/CD Pipeline Blocker
            </div>
          </div>

          {/* Layer 3: Inference & Explainability */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-cyan-500/40 bg-cyan-950/10 space-y-2">
            <div className="text-[10px] font-mono text-cyan-300 font-bold flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>LAYER 03: MODEL EXECUTION</span>
            </div>
            <div className="font-bold text-slate-100">Dual-Engine Runtime</div>
            <ul className="text-[10px] text-slate-300 space-y-1 list-disc list-inside">
              <li>Active Champion (Production)</li>
              <li>Hot Challenger (Shadow Standby)</li>
              <li>Deterministic SHAP Vectors</li>
              <li>Adverse Action Code Generator</li>
            </ul>
            <div className="pt-2 border-t border-slate-900 text-[10px] font-mono text-cyan-400">
              Sub-100ms Inference
            </div>
          </div>

          {/* Layer 4: Real-Time Drift & Remediation */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" />
              <span>LAYER 04: DRIFT TELEMETRY</span>
            </div>
            <div className="font-bold text-slate-200">Autonomous Sensor Daemon</div>
            <ul className="text-[10px] text-slate-400 space-y-1 list-disc list-inside">
              <li>15-Min PSI/CSI Stream Scoring</li>
              <li>Intraday LCR Buffer Floor</li>
              <li>Circuit-Breaker Failover</li>
              <li>Dynamic Haircut Injection</li>
            </ul>
            <div className="pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
              Automated Self-Healing
            </div>
          </div>

          {/* Layer 5: Audit & RBI Reporting */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>LAYER 05: SUPERVISORY</span>
            </div>
            <div className="font-bold text-slate-200">Immutable Ledger & AI</div>
            <ul className="text-[10px] text-slate-400 space-y-1 list-disc list-inside">
              <li>SHA-256 Cryptographic Seals</li>
              <li>Four-Eyes Attestation Trail</li>
              <li>Gemini Supervisory Auditor</li>
              <li>Form MRM-CIB-01 Export</li>
            </ul>
            <div className="pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
              RBI Audit-Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
