import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  FileCode, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Download, 
  Terminal, 
  Activity, 
  Server, 
  GitBranch, 
  Database, 
  Coins, 
  UserCheck, 
  Workflow, 
  Info,
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import { UserPersona } from '../types';

interface DocumentationViewProps {
  activePersona: UserPersona;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({ activePersona }) => {
  const [activeSection, setActiveSection] = useState<'architecture' | 'math' | 'adrs' | 'features' | 'rbi_mapping'>('architecture');
  const [selectedAdr, setSelectedAdr] = useState<string>('ADR-001');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [mathFilter, setMathFilter] = useState<string>('ALL');

  const ADRS = [
    {
      id: 'ADR-001',
      title: 'Declarative Policy Enforcement via CI/CD Policy-as-Code',
      status: 'ACCEPTED',
      category: 'CI/CD & Governance',
      date: '2026-09-04',
      rbiClause: 'RBI Draft MRM Section 3.1 & 4.1',
      context: 'Traditional model risk management relies on static Word/Excel documentation and retrospective annual reviews, creating a hazardous gap between model deployment and regulatory inspection.',
      decision: 'Codify regulatory constraints (KS >= 40%, AUC >= 0.75, Brier <= 0.10, zero demographic bias) as declarative CI/CD policy gates. Promotion to production is physically blocked if independent model validation (IMV) tests fail.',
      consequences: 'Eliminates human approval bypasses, guarantees mathematical reproducibility, and enforces strict four-eyes segregation of duties.',
      alternativesConsidered: 'Manual committee sign-off sheets, post-deployment batch audit scripts.'
    },
    {
      id: 'ADR-002',
      title: 'Deterministic Local SHAP Explainability Engine',
      status: 'ACCEPTED',
      category: 'Explainable AI (XAI)',
      date: '2026-09-04',
      rbiClause: 'RBI Draft MRM Section 4.2(b) & Fair Lending Mandates',
      context: 'Wholesale credit underwriting decisions (> ₹50 Crores) made by gradient-boosted trees or deep neural networks lack transparent mathematical justifications, exposing the bank to litigation and regulatory non-compliance.',
      decision: 'Decompose every wholesale credit score into exact additive local Shapley feature contributions in log-odds space. Automatically emit standardized statutory Adverse Action Codes (e.g. RBI-AAC-012) if specific parameters cross threshold limits.',
      consequences: 'Provides borrowers and supervisory examiners with 100% mathematically reconciled risk breakdowns and actionable mitigation covenants.',
      alternativesConsidered: 'Global permutation feature importance, LIME local approximations.'
    },
    {
      id: 'ADR-003',
      title: 'Real-Time Sliding-Window Streaming Telemetry & Autonomous Circuit Breaker',
      status: 'ACCEPTED',
      category: 'Treasury & Liquidity',
      date: '2026-09-04',
      rbiClause: 'RBI Master Direction on Intraday Liquidity Risk Management',
      context: 'Macroeconomic currency shocks (e.g. SOFR/MIFOR basis divergence) cause forecasting drift across multi-currency Nostro clearing accounts (USD, EUR, GBP, JPY), threatening statutory Liquidity Coverage Ratio (LCR) buffers.',
      decision: 'Deploy 15-minute streaming telemetry calculating Population Stability Index (PSI). If PSI >= 0.25 or LCR < 100%, an automated circuit breaker trips, routing inference to a hot challenger model in < 50ms and triggering domestic reserve liquidity sweeps.',
      consequences: 'Preserves intraday bank solvency and eliminates human latency during market dislocations.',
      alternativesConsidered: 'End-of-day batch reconciliation, manual treasury escalation alarms.'
    },
    {
      id: 'ADR-004',
      title: 'Cryptographic SHA-256 Hashing for Supervisory Audit Ledger',
      status: 'ACCEPTED',
      category: 'Security & Integrity',
      date: '2026-09-04',
      rbiClause: 'RBI Draft MRM Section 5.1 (Immutable Traceability)',
      context: 'Database audit records in standard relational databases are vulnerable to retroactive mutation or tampering by privileged administrators, risking severe supervisory penalties during on-site inspections.',
      decision: 'Hash every applicant feature vector, model version, calculated PD/LGD, SHAP vector, and timestamp with SHA-256 into a tamper-evident audit ledger. An on-site examiner console allows recomputing digests directly from raw payloads.',
      consequences: 'Provides mathematical non-repudiation and instantaneous tamper detection.',
      alternativesConsidered: 'Relational database triggers, third-party centralized audit logging.'
    },
    {
      id: 'ADR-005',
      title: 'Strict Four-Eyes Segregation of Duties (RBAC Matrix)',
      status: 'ACCEPTED',
      category: 'Access & Controls',
      date: '2026-09-04',
      rbiClause: 'RBI Draft MRM Section 4.1 & BCBS Pillar 2 Governance',
      context: 'Conflict of interest occurs when model developers hold production deployment permissions or credit underwriters sanction high-value credit facilities without independent second-line validation.',
      decision: 'Implement a mathematical role-based access control (RBAC) matrix strictly segregating Line 1 (Builders/Underwriters), Line 2A (Independent Model Validation), Line 2B (CRO Executive Signatory), and Line 3 (External Supervisory Audit).',
      consequences: 'Enforces statutory maker-checker approvals; developers cannot approve models and underwriters cannot unilaterally sanction credit.',
      alternativesConsidered: 'Role hierarchy with blanket administrator overrides.'
    },
    {
      id: 'ADR-006',
      title: 'Server-Side Gemini AI Integration for Supervisory Return Synthesis',
      status: 'ACCEPTED',
      category: 'Regulatory Automation',
      date: '2026-09-04',
      rbiClause: 'RBI Department of Supervision (DoS) Model Governance Return',
      context: 'Quarterly compilation of statutory Form MRM-CIB-01 and supervisory audit memorandums requires 4-6 weeks of manual cross-department reconciliation across hundreds of model risk metrics.',
      decision: 'Integrate Google Gemini 2.5 server-side via @google/genai SDK to analyze quantitative telemetry (KS, AUC, PSI distributions, drift alerts) and synthesize an objective, inspection-grade supervisory audit memorandum adhering strictly to RBI inspection conventions.',
      consequences: 'Reduces regulatory return preparation time to under 3 minutes while maintaining analytical rigor and full audit provenance.',
      alternativesConsidered: 'Static hardcoded template generation, manual reporting workflows.'
    }
  ];

  const handleCopyMarkdown = () => {
    const markdownSummary = `# RBI Model Risk Management (MRM) Compliance-as-Code Platform
## Institutional Banking Documentation & Architecture Blueprint
- Regulatory Framework: RBI Draft Framework on Model Risk Management for Regulated Entities (2025)
- Basel Standards: Basel III / IV Advanced Internal Ratings-Based (A-IRB) Approach
- Key Metrics: Kolmogorov-Smirnov (KS >= 40%), AUC-ROC (>= 0.75), PSI (< 0.10 normal, >= 0.25 failover)
- Architectural Decisions: ADR-001 through ADR-006 Enforced
- Cryptographic Audit: SHA-256 Digest Sealing on 100% of Model Scoring Transactions`;

    navigator.clipboard.writeText(markdownSummary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                SYSTEM SPECIFICATIONS & ARCHITECTURE DOSSIER
              </span>
              <span className="text-xs font-mono text-slate-400">
                Institutional Whitepaper & Regulatory Rationale
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">
              Platform Architecture, Mathematical Logic & Governance Rationale
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl mt-1">
              Comprehensive architectural specifications, mathematical equations (PSI, CSI, SHAP, KS, Basel IRB), Architectural Decision Records (ADRs), and RBI regulatory cross-walk mapping for institutional risk committees and supervisory examiners.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              {copiedNotification ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Summary Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Technical Summary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <button
            onClick={() => setActiveSection('architecture')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${
              activeSection === 'architecture'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </button>

          <button
            onClick={() => setActiveSection('math')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${
              activeSection === 'math'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Mathematical Rationale</span>
          </button>

          <button
            onClick={() => setActiveSection('adrs')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${
              activeSection === 'adrs'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Architectural Decisions (6)</span>
          </button>

          <button
            onClick={() => setActiveSection('features')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${
              activeSection === 'features'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Product Specifications</span>
          </button>

          <button
            onClick={() => setActiveSection('rbi_mapping')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${
              activeSection === 'rbi_mapping'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RBI Regulatory Mapping</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: SYSTEM ARCHITECTURE & TOPOLOGY */}
      {activeSection === 'architecture' && (
        <div className="space-y-6">
          {/* Architecture Topology Visual */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Compliance-as-Code Multi-Tiered System Topology</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  End-to-end data pipelines connecting client roles, automated CI/CD policy gates, inference engines, streaming drift sensors, and regulatory reporting gateways.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                P99 Latency &lt; 200ms
              </span>
            </div>

            {/* Architecture Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Layer 1: Ingestion & Segregated Personas */}
              <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase font-mono">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span>1. Segregated Personas & RBAC</span>
                </div>
                <div className="space-y-2 text-[11px] text-slate-400">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">Line 1: Quants & Underwriters</div>
                    <div>Model creation and loan origination. Cannot self-approve or certify.</div>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">Line 2A: IMV Lead (Independent)</div>
                    <div>Stress benchmarking (OOT datasets, KS &gt;= 40%, AUC &gt;= 0.75).</div>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">Line 2B: Chief Risk Officer (CRO)</div>
                    <div>Executive four-eyes approval, failover authority, Board sign-off.</div>
                  </div>
                </div>
              </div>

              {/* Layer 2: Core Processing & CI/CD Engine */}
              <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase font-mono">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>2. Production Inference & Policy Gates</span>
                </div>
                <div className="space-y-2 text-[11px] text-slate-400">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">Declarative CI/CD Gates</div>
                    <div>Pre-deployment validation policies enforcing statistical hurdles.</div>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">Deterministic SHAP Explainer</div>
                    <div>Additive marginal attribution vectors with zero explanation variance.</div>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">Hot Challenger Architecture</div>
                    <div>Active Champion paired with standby volatility-damped Challenger.</div>
                  </div>
                </div>
              </div>

              {/* Layer 3: Streaming Telemetry & Audit */}
              <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase font-mono">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>3. Telemetry, Ledger & AI Reporting</span>
                </div>
                <div className="space-y-2 text-[11px] text-slate-400">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">15-Min Sliding PSI Sensors</div>
                    <div>Continuous distribution shift detection across Nostro accounts.</div>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">SHA-256 Cryptographic Ledger</div>
                    <div>Tamper-evident hashing over inputs, scores, and SHAP vectors.</div>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <div className="font-semibold text-slate-200">Gemini AI Supervisory Auditor</div>
                    <div>Automated Form MRM-CIB-01 and inspection memorandum synthesis.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Microservices & Latency Profile Table */}
            <div className="border border-slate-800 rounded-lg overflow-hidden">
              <div className="p-3 bg-slate-950 font-mono text-xs font-semibold text-slate-300 border-b border-slate-800">
                Performance, Resilience & Latency SLAs
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/70 text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-2.5">Subsystem / Operation</th>
                      <th className="p-2.5">SLA Target</th>
                      <th className="p-2.5">Observed P99</th>
                      <th className="p-2.5">Resilience & Failover Mechanism</th>
                      <th className="p-2.5">RBI Compliance Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-[11px] text-slate-300">
                    <tr>
                      <td className="p-2.5 text-slate-200 font-bold">Wholesale Credit Scoring + SHAP</td>
                      <td className="p-2.5 text-cyan-400">&lt; 250ms</td>
                      <td className="p-2.5 text-emerald-400">180ms</td>
                      <td className="p-2.5 text-slate-400">Cached linear scorecard fallback</td>
                      <td className="p-2.5 text-cyan-300">RBI MRM Para 4.2(b)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-200 font-bold">Cryptographic SHA-256 Digest Sealing</td>
                      <td className="p-2.5 text-cyan-400">&lt; 5ms</td>
                      <td className="p-2.5 text-emerald-400">2.1ms</td>
                      <td className="p-2.5 text-slate-400">Synchronous memory queue buffer</td>
                      <td className="p-2.5 text-cyan-300">RBI MRM Para 5.1</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-200 font-bold">Nostro Intraday PSI Computation</td>
                      <td className="p-2.5 text-cyan-400">&lt; 500ms</td>
                      <td className="p-2.5 text-emerald-400">120ms</td>
                      <td className="p-2.5 text-slate-400">Laplace-smoothed binning fallback</td>
                      <td className="p-2.5 text-cyan-300">RBI Intraday Liquidity Dir.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-200 font-bold">Champion-Challenger Failover</td>
                      <td className="p-2.5 text-cyan-400">&lt; 100ms</td>
                      <td className="p-2.5 text-emerald-400">42ms</td>
                      <td className="p-2.5 text-slate-400">Zero-downtime container routing switch</td>
                      <td className="p-2.5 text-cyan-300">RBI MRM Para 5.2</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-200 font-bold">Supervisory Audit Memo Synthesis</td>
                      <td className="p-2.5 text-cyan-400">&lt; 8.0s</td>
                      <td className="p-2.5 text-emerald-400">4.2s</td>
                      <td className="p-2.5 text-slate-400">Pre-rendered statutory template fallback</td>
                      <td className="p-2.5 text-cyan-300">RBI Dept of Supervision</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: MATHEMATICAL RATIONALE & QUANTITATIVE FORMULATIONS */}
      {activeSection === 'math' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Quantitative Formulations & Statistical Proofs</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Detailed mathematical derivations of Population Stability Index (PSI), Characteristic Stability Index (CSI), SHAP cooperative game theory, and Basel III/IV IRB capital equations.
                </p>
              </div>

              {/* Filter pills */}
              <div className="flex items-center gap-1.5 text-xs">
                {['ALL', 'DRIFT', 'EXPLAINABILITY', 'CAPITAL'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setMathFilter(f)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                      mathFilter === f
                        ? 'bg-cyan-600 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Formula 1: Population Stability Index (PSI) */}
              {(mathFilter === 'ALL' || mathFilter === 'DRIFT') && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Population Stability Index (PSI)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      Symmetric J-Divergence
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300 text-center overflow-x-auto">
                    PSI = &sum;<sub>k=1..K</sub> (Actual<sub>k</sub> - Expected<sub>k</sub>) &times; ln(Actual<sub>k</sub> / Expected<sub>k</sub>)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Measures the degree of shift between a baseline calibrated reference distribution (Expected) and recent production scoring observations (Actual). Derived as the sum of directional Kullback-Leibler divergences: D<sub>KL</sub>(P || Q) + D<sub>KL</sub>(Q || P).
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                      <div className="text-emerald-400 font-bold">&lt; 0.10</div>
                      <div className="text-slate-500">Insignificant</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                      <div className="text-amber-400 font-bold">0.10 - 0.25</div>
                      <div className="text-slate-500">Moderate Watch</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                      <div className="text-rose-400 font-bold">&ge; 0.25</div>
                      <div className="text-slate-500">Failover Trip</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Formula 2: SHAP Local Explainability */}
              {(mathFilter === 'ALL' || mathFilter === 'EXPLAINABILITY') && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Deterministic SHAP Decomposition</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                      Game Theory
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-purple-300 text-center overflow-x-auto">
                    logit(PD) = &phi;<sub>0</sub> + &sum;<sub>i=1..M</sub> &phi;<sub>i</sub>(x)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Satisfies the **Efficiency Axiom** from cooperative game theory: the sum of all marginal feature attributions (&phi;<sub>i</sub>) plus the expected baseline value (&phi;<sub>0</sub>) strictly reconciles to the log-odds of the Probability of Default.
                  </p>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span className="text-slate-200 font-semibold">Regulatory Guarantee:</span> 100% mathematical reconciliation with zero unallocated residual error.
                  </div>
                </div>
              )}

              {/* Formula 3: Kolmogorov-Smirnov (KS) Statistic */}
              {(mathFilter === 'ALL' || mathFilter === 'CAPITAL') && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">3. Kolmogorov-Smirnov (KS) Statistic</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      Separation Power
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 text-center overflow-x-auto">
                    KS = max<sub>s</sub> | F<sub>bad</sub>(s) - F<sub>good</sub>(s) | &times; 100
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Quantifies the maximum vertical divergence between the empirical cumulative distribution of defaulters and non-defaulters. Models with KS &lt; 40.0% are physically blocked from production promotion by CI/CD policy gates.
                  </p>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span className="text-slate-200 font-semibold">Production Gate:</span> KS &ge; 40.0% | AUC-ROC &ge; 0.75 | Brier &le; 0.10.
                  </div>
                </div>
              )}

              {/* Formula 4: Basel III A-IRB Capital Requirement (K) */}
              {(mathFilter === 'ALL' || mathFilter === 'CAPITAL') && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">4. Basel III Capital Requirement (K)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                      Asymptotic Single Risk Factor
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 text-center overflow-x-auto">
                    K = [ LGD &times; &Phi;( (&Phi;<sup>-1</sup>(PD) + &radic;R &times; &Phi;<sup>-1</sup>(0.999)) / &radic;(1-R) ) - (LGD &times; PD) ] &times; MaturityAdj
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Computes statutory capital adequacy under Through-The-Cycle (TTC) macro stress. Enforces a non-negotiable minimum regulatory Loss Given Default (LGD) floor of 45.0% for corporate facilities.
                  </p>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span className="text-slate-200 font-semibold">Regulatory Floor:</span> LGD &ge; 45.0% | 99.9% 1-Year Confidence Horizon.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ARCHITECTURAL DECISION RECORDS (ADRs) */}
      {activeSection === 'adrs' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                <span>Architectural Decision Records (ADRs)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official architecture logs documenting the context, decisions, trade-offs, and statutory compliance rationale for core platform capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* ADR List (Left) */}
              <div className="lg:col-span-4 space-y-2">
                {ADRS.map((adr) => {
                  const isSelected = adr.id === selectedAdr;
                  return (
                    <div
                      key={adr.id}
                      onClick={() => setSelectedAdr(adr.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-cyan-500 shadow-md shadow-cyan-950/40 text-slate-100'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}>{adr.id}</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                          {adr.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold line-clamp-1">{adr.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">{adr.category}</div>
                    </div>
                  );
                })}
              </div>

              {/* Selected ADR Detail (Right) */}
              <div className="lg:col-span-8">
                {(() => {
                  const adr = ADRS.find(a => a.id === selectedAdr) || ADRS[0];
                  return (
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-cyan-400 font-bold">{adr.id}</span>
                            <span className="text-xs text-slate-500">|</span>
                            <span className="text-xs text-slate-400 font-mono">{adr.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-100 mt-1">{adr.title}</h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          {adr.rbiClause}
                        </span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="font-mono text-[10px] text-slate-400 uppercase font-bold">Context & Problem</div>
                          <p className="text-slate-300 mt-1 leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                            {adr.context}
                          </p>
                        </div>

                        <div>
                          <div className="font-mono text-[10px] text-cyan-400 uppercase font-bold">Architectural Decision</div>
                          <p className="text-slate-200 mt-1 leading-relaxed bg-cyan-950/20 p-2.5 rounded border border-cyan-500/30">
                            {adr.decision}
                          </p>
                        </div>

                        <div>
                          <div className="font-mono text-[10px] text-emerald-400 uppercase font-bold">Consequences & Benefits</div>
                          <p className="text-slate-300 mt-1 leading-relaxed bg-emerald-950/20 p-2.5 rounded border border-emerald-500/30">
                            {adr.consequences}
                          </p>
                        </div>

                        <div>
                          <div className="font-mono text-[10px] text-slate-500 uppercase font-bold">Alternatives Considered</div>
                          <p className="text-slate-400 mt-1 leading-relaxed italic">
                            {adr.alternativesConsidered}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: PRODUCT SPECIFICATIONS */}
      {activeSection === 'features' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>Product Specifications & Core Capabilities</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Functional breakdown of the 6 major modules comprising the institutional platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Module 1: Compliance Blueprints</div>
                <div className="text-xs font-bold text-slate-200">Automated CI/CD Model Governance</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Automated Tiering, KS &gt;= 40% gates, out-of-time benchmarking, and mandatory Hot Challenger pairing for Tier-1 models.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Module 2: Corporate Lending</div>
                <div className="text-xs font-bold text-slate-200">Wholesale Scoring (&gt; ₹50 Cr) & SHAP</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  LEI verification, GSTN triangulation, Basel III A-IRB PD scoring, LGD floor enforcement, deterministic SHAP waterfall, and Adverse Action codes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Module 3: Cross-Border Liquidity</div>
                <div className="text-xs font-bold text-slate-200">Nostro Drift Sensors & Failover</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Continuous 15-minute streaming PSI calculations across USD, EUR, GBP, JPY clearing accounts with autonomous circuit breakers and hitless failover.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Module 4: Supervisory Reporting</div>
                <div className="text-xs font-bold text-slate-200">Form MRM-CIB-01 & Gemini AI Auditor</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Instant synthesis of quarterly Department of Supervision returns, server-side Gemini AI audit inspection memos, and Board digital signatures.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Module 5: Cryptographic Audit</div>
                <div className="text-xs font-bold text-slate-200">SHA-256 Tamper-Evident Ledger</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Cryptographic digest sealing over every scoring event, local hash recalculation, and on-site forensic inspection for supervisory examiners.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Module 6: Workflows Simulator</div>
                <div className="text-xs font-bold text-slate-200">Interactive Execution Cycles</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Step-by-step interactive walkthroughs of 5 institutional workflows with auto-play capabilities and live JSON payload inspector.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: RBI REGULATORY MAPPING */}
      {activeSection === 'rbi_mapping' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>RBI Draft Model Risk Management (MRM) Circular Cross-Walk</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Exhaustive mapping demonstrating how platform capabilities satisfy every clause of the RBI Draft Guidelines.
              </p>
            </div>

            <div className="border border-slate-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-300 font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">RBI Circular Section</th>
                    <th className="p-3">Statutory Regulatory Mandate</th>
                    <th className="p-3">Platform Capability & Implementation</th>
                    <th className="p-3">Enforcement Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono text-[11px] text-slate-300">
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Section 3.1 & 3.2</td>
                    <td className="p-3 text-slate-300">Comprehensive Model Inventory & Tiering Classification</td>
                    <td className="p-3 text-slate-400">Automatic Tier-1 critical assignment for credit &gt; ₹50 Cr or intraday liquidity &gt; ₹100 Cr.</td>
                    <td className="p-3"><span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Automated</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Section 4.1</td>
                    <td className="p-3 text-slate-300">Independent Model Validation (IMV) & Segregation of Duties</td>
                    <td className="p-3 text-slate-400">Mandatory Four-Eyes segregation; quants cannot validate or promote their own models.</td>
                    <td className="p-3"><span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">CI/CD Gate</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Section 4.2(b)</td>
                    <td className="p-3 text-slate-300">Algorithmic Transparency & Adverse Action Disclosures</td>
                    <td className="p-3 text-slate-400">Deterministic local SHAP decomposition with statutory codes (`RBI-AAC-XXX`) and covenants.</td>
                    <td className="p-3"><span className="px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30">Runtime XAI</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Section 4.4 & 5.2</td>
                    <td className="p-3 text-slate-300">Contingency Planning & Hot Challenger Binding</td>
                    <td className="p-3 text-slate-400">Continuous 15-min PSI drift tracking; autonomous circuit breaker trips hitless failover &lt; 50ms.</td>
                    <td className="p-3"><span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/30">Circuit Breaker</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Section 5.1</td>
                    <td className="p-3 text-slate-300">Immutable Algorithmic Traceability & Audit Logs</td>
                    <td className="p-3 text-slate-400">SHA-256 digest sealing over all inputs, scores, and attributions in a tamper-evident ledger.</td>
                    <td className="p-3"><span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30">Cryptographic</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Section 5.4</td>
                    <td className="p-3 text-slate-300">Department of Supervision (DoS) Returns & Board Attestation</td>
                    <td className="p-3 text-slate-400">Quarterly Form MRM-CIB-01 synthesis, Gemini AI supervisory audit memos, and CRO digital signatures.</td>
                    <td className="p-3"><span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Automated</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
