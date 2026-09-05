import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Compass, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  FileText, 
  Activity, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Cpu, 
  Scale, 
  ChevronRight, 
  Zap, 
  Building2, 
  AlertTriangle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { UserPersona } from '../types';
import { USER_PERSONAS } from '../data/mockBankData';

import imgMrmCockpit from '../assets/images/mrm_cockpit_overview_1788527365569.jpg';
import imgCreditShap from '../assets/images/credit_scoring_shap_1788527393924.jpg';
import imgNostroLiq from '../assets/images/nostro_liquidity_drift_1788527440339.jpg';
import imgRbiReport from '../assets/images/rbi_supervisory_return_1788527463094.jpg';

interface UserGuideViewProps {
  activePersona: UserPersona;
  onSelectTab: (tab: 'blueprints' | 'workflows' | 'lending' | 'liquidity' | 'reporting' | 'audit' | 'docs' | 'guide') => void;
  onSelectPersona: (persona: UserPersona) => void;
}

export const UserGuideView: React.FC<UserGuideViewProps> = ({
  activePersona,
  onSelectTab,
  onSelectPersona
}) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'quickstart' | 'visual_tour' | 'personas' | 'faq'>('quickstart');
  const [selectedTourModule, setSelectedTourModule] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  const TOUR_MODULES = [
    {
      title: 'Compliance-as-Code Blueprints & Model Inventory',
      badge: 'GOVERNANCE & CI/CD',
      image: imgMrmCockpit,
      targetTab: 'blueprints' as const,
      description: 'The executive command cockpit providing real-time visibility into all quantitative models, tiering assignments, automated CI/CD policy gates, and active Champion-Challenger bindings.',
      features: [
        'Automated Tier-1, Tier-2, and Tier-3 model tiering classification based on exposure limits',
        'Independent Model Validation (IMV) gates enforcing KS >= 40% and AUC >= 0.75 hurdles',
        'Pre-bound Hot Challenger models in standby mode for zero-downtime failover resilience',
        'Real-time health meters tracking inventory health, open drift remediations, and audit readiness'
      ],
      quickTip: 'Tip: Check the "Model Inventory & Policy Health" cards at the top for instant visibility into portfolio compliance.'
    },
    {
      title: 'Automated Corporate Credit Underwriting & SHAP Explainability',
      badge: 'CREDIT RISK & XAI',
      image: imgCreditShap,
      targetTab: 'lending' as const,
      description: 'Wholesale loan origination and risk appraisal for credit facilities exceeding ₹50 Crores, integrating LEI validation, GSTN reconciliation, and deterministic SHAP feature attribution.',
      features: [
        'Instant Basel III A-IRB Probability of Default (PD) scoring with statutory 45% LGD floor',
        'Deterministic SHAP waterfall chart decomposing exact risk-increasing and risk-mitigating features',
        'Statutory RBI Adverse Action Codes (e.g., RBI-AAC-012 for promoter encumbrance)',
        'Four-Eyes Maker-Checker sanctioning enforcing segregation between Underwriter and CRO'
      ],
      quickTip: 'Tip: Click any corporate applicant (e.g. Tata Power or Adani Green) to inspect their live SHAP attribution waterfall.'
    },
    {
      title: 'Cross-Border Nostro Liquidity Telemetry & Circuit Breaker',
      badge: 'TREASURY & STREAMING',
      image: imgNostroLiq,
      targetTab: 'liquidity' as const,
      description: 'High-frequency intraday monitoring of multi-currency clearing accounts across New York (USD), Frankfurt (EUR), London (GBP), and Tokyo (JPY) with autonomous circuit breakers.',
      features: [
        '15-minute sliding-window Population Stability Index (PSI) drift detection sensors',
        'Autonomous circuit breaker that automatically trips when PSI >= 0.25 or LCR < 100%',
        'Sub-50 millisecond hitless failover rerouting traffic to pre-calibrated hot challenger models',
        'One-click domestic reserve liquidity sweep restoring buffers above statutory 110% levels'
      ],
      quickTip: 'Tip: Click "Simulate Cross-Border Stress Spike" to test the automated circuit-breaker and failover workflow in real time.'
    },
    {
      title: 'RBI Regulatory Returns & Server-Side Gemini AI Auditor',
      badge: 'SUPERVISORY REPORTING',
      image: imgRbiReport,
      targetTab: 'reporting' as const,
      description: 'Automated compilation of quarterly Department of Supervision returns (Form MRM-CIB-01) with server-side Gemini AI audit inspection memorandums and Board digital signatures.',
      features: [
        'Automated synthesis of statutory Form MRM-CIB-01 quarterly supervisory returns',
        'Server-side Google Gemini 2.5 AI risk auditor drafting rigorous quantitative examination memos',
        'Cryptographic SHA-256 digital signature attestation for the Chief Risk Officer',
        'Instant export and payload formatting for the RBI DAKSH electronic supervisory portal'
      ],
      quickTip: 'Tip: Click "Synthesize Supervisory Audit Memorandum" to watch Gemini AI generate a complete inspection-ready audit memorandum.'
    }
  ];

  const FAQS = [
    {
      id: 'faq-1',
      question: 'Why is my credit facility sanction button disabled?',
      answer: 'In compliance with RBI Draft MRM Para 4.1 and Four-Eyes segregation of duties, wholesale credit facilities exceeding ₹50 Crores cannot be sanctioned unilaterally by a Line 1 credit underwriter. Switch your persona to "Chief Risk Officer" (top right) to execute the second-line checker approval.'
    },
    {
      id: 'faq-2',
      question: 'What happens when the Nostro Population Stability Index (PSI) exceeds 0.25?',
      answer: 'A PSI >= 0.25 indicates significant empirical distribution drift. The system’s autonomous circuit breaker instantly trips in under 50 milliseconds, rerouting incoming settlement scoring to the pre-calibrated Hot Challenger model and prompting an automated liquidity sweep from domestic reserve facilities.'
    },
    {
      id: 'faq-3',
      question: 'How does the platform ensure explainability for machine learning credit models?',
      answer: 'The system uses deterministic local Shapley Additive exPlanations (SHAP) calculated in log-odds space. Marginal contributions sum exactly to the final score with zero residual variance. Features crossing predefined risk thresholds automatically trigger standardized statutory Adverse Action Codes (e.g. RBI-AAC-012).'
    },
    {
      id: 'faq-4',
      question: 'How do supervisory examiners mathematically verify audit trail integrity?',
      answer: 'Every scoring request, model version, and SHAP vector is cryptographically hashed using SHA-256 into a tamper-evident sequential ledger. In the "Cryptographic Telemetry Ledger" tab, examiners can click "Verify Block Integrity" to recompute hashes from raw payloads and mathematically prove zero tampering.'
    },
    {
      id: 'faq-5',
      question: 'How does the Gemini AI integration assist with RBI reporting?',
      answer: 'The platform integrates the modern @google/genai SDK server-side. It pipes real-time quarterly validation telemetry (KS, AUC, PSI distributions, adverse action counts) to Google Gemini 2.5, which synthesizes an objective, inspection-grade audit memorandum formatted according to RBI inspection conventions.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>USER GUIDE & INTERACTIVE WALKTHROUGH</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                Institutional Banking Onboarding
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mt-2">
              Welcome to the RBI Model Risk Management (MRM) Platform
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              This guide will help you quickly understand the platform, navigate its core modules, test real-time drift detection and automated remediation, and understand how the system enforces compliance-as-code under upcoming RBI MRM guidelines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('workflows')}
              className="px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Interactive Workflows</span>
            </button>
            <button
              onClick={() => onSelectTab('docs')}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Architecture Specs</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveGuideTab('quickstart')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
              activeGuideTab === 'quickstart'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>5-Step Quickstart</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('visual_tour')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
              activeGuideTab === 'visual_tour'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Visual Feature Tour</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('personas')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
              activeGuideTab === 'personas'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Role-Based Guide</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('faq')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
              activeGuideTab === 'faq'
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Platform FAQs</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 5-STEP QUICKSTART */}
      {activeGuideTab === 'quickstart' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>5-Minute Quick-Start Interactive Walkthrough</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Follow these 5 foundational steps to explore the full capabilities of the Compliance-as-Code platform.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/30">
                Step {activeStep} of 5
              </span>
            </div>

            {/* Step Selector Horizontal Bar */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { step: 1, title: 'Switch Persona', tab: 'blueprints' },
                { step: 2, title: 'Review Models', tab: 'blueprints' },
                { step: 3, title: 'Appraise Loan', tab: 'lending' },
                { step: 4, title: 'Drift Failover', tab: 'liquidity' },
                { step: 5, title: 'File Return', tab: 'reporting' }
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    activeStep === s.step
                      ? 'bg-slate-800 border-cyan-500 shadow-md shadow-cyan-950/40 text-slate-100'
                      : activeStep > s.step
                      ? 'bg-slate-950/80 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span>STEP {s.step}</span>
                    {activeStep > s.step && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <div className="text-xs font-bold mt-1 truncate">{s.title}</div>
                </button>
              ))}
            </div>

            {/* Step Detail Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 1: Understand Role-Based Access (RBAC)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      Current: {activePersona.name} ({activePersona.role})
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100">
                    Switch Personas to Test Four-Eyes Segregation of Duties
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Under RBI Draft MRM guidelines, commercial quants cannot approve models, and credit underwriters cannot unilaterally sanction high-value credit. Use the top-right persona selector to assume different roles:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px]">
                    <div 
                      onClick={() => onSelectPersona(USER_PERSONAS.CRO)}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 cursor-pointer transition-all"
                    >
                      <div className="font-bold text-slate-200">Chief Risk Officer</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Tier-1 Approver & Signer</div>
                    </div>
                    <div 
                      onClick={() => onSelectPersona(USER_PERSONAS.IMV_HEAD)}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 cursor-pointer transition-all"
                    >
                      <div className="font-bold text-slate-200">IMV Lead Validator</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Independent 2nd Line Gatekeeper</div>
                    </div>
                    <div 
                      onClick={() => onSelectPersona(USER_PERSONAS.CREDIT_HEAD)}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 cursor-pointer transition-all"
                    >
                      <div className="font-bold text-slate-200">Credit Underwriter</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Wholesale Lending Maker</div>
                    </div>
                    <div 
                      onClick={() => onSelectPersona(USER_PERSONAS.TREASURY_HEAD)}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 cursor-pointer transition-all"
                    >
                      <div className="font-bold text-slate-200">Treasury Head</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Nostro Clearing & Drift Lead</div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Proceed to Step 2</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 2: Inspect Model Blueprints & Policy Gates</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      CI/CD Policy Gate
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100">
                    Verify Tier-1 Models & Pre-Bound Hot Challengers
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Navigate to the **Compliance-as-Code Blueprints** tab. Notice how every model with balance-sheet impact is assigned a tier. Tier-1 models require independent validation hurdles ($KS \ge 40\%$, $AUC \ge 0.75$) and must have a validated Challenger model bound in standby.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-slate-200">Key Observation:</div>
                    <p className="text-slate-400">
                      Look at the model table: models with status "PROD_ACTIVE" have zero unvalidated dependencies. If an IMV check is pending, promotion to production is blocked by declarative policy.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onSelectTab('blueprints')}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Jump to Blueprints View</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Proceed to Step 3</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 3: Run Corporate Credit Underwriting with SHAP</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      Wholesale Appraisal
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100">
                    Review Deterministic Explainability & Adverse Action Codes
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    In the **Corporate Lending** tab, select a company (e.g. Tata Power or Adani Green). The system computes the Probability of Default (PD), enforces the statutory 45% LGD floor, and renders the **SHAP feature attribution waterfall**.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                      <div className="font-bold">Green Features (Mitigating)</div>
                      <div className="text-[11px] text-slate-400 mt-1">High DSCR ($1.42x$), low Leverage, and positive EBITDA margins decrease credit default risk.</div>
                    </div>
                    <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-300">
                      <div className="font-bold">Red Features (Risk-Elevating)</div>
                      <div className="text-[11px] text-slate-400 mt-1">Promoter Pledge &gt; 12% automatically triggers statutory Adverse Action Code `RBI-AAC-012`.</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onSelectTab('lending')}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Jump to Corporate Lending</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setActiveStep(4)}
                      className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Proceed to Step 4</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 4: Test Streaming Telemetry & Hot Failover</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      Treasury Telemetry
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100">
                    Simulate Macro Drift & Trigger Automated Remediation
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Navigate to **Cross-Border Nostro Telemetry**. You will see multi-currency accounts (USD, EUR, GBP, JPY). Click the button **"Simulate Cross-Border Stress Spike"**.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-cyan-300">Automated Sequence:</div>
                    <ol className="list-decimal list-inside text-slate-400 space-y-1 text-[11px]">
                      <li>The 15-minute sliding PSI sensor crosses the critical threshold ($PSI \ge 0.25$).</li>
                      <li>The autonomous circuit breaker trips, halting unhedged transactions.</li>
                      <li>Traffic reroutes to the standby Hot Challenger model in under 50ms.</li>
                      <li>Click "Execute Domestic Reserve Sweep" to restore the Nostro buffer above $110\%$.</li>
                    </ol>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onSelectTab('liquidity')}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Jump to Nostro Telemetry</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setActiveStep(5)}
                      className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Proceed to Step 5</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 5: Generate RBI Return with Gemini AI</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      Supervisory Filing
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100">
                    Synthesize Form MRM-CIB-01 and Apply Digital Signature
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Navigate to **RBI Regulatory Returns & AI Auditor**. Notice how all portfolio metrics, drift events, and adverse actions are pre-aggregated. Click **"Synthesize Supervisory Audit Memorandum"** to engage the server-side Gemini AI auditor.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-emerald-400">Completion Milestone:</div>
                    <p className="text-slate-400 text-[11px]">
                      Ensure you are in the Chief Risk Officer persona, then click **"Digitally Sign & File Return (CRO)"**. The return is cryptographically signed with a SHA-256 digest and readied for submission to the RBI DAKSH electronic portal!
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onSelectTab('reporting')}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Jump to Regulatory Returns</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setActiveGuideTab('visual_tour')}
                      className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Explore Visual Feature Tour</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VISUAL FEATURE TOUR WITH SCREENSHOTS */}
      {activeGuideTab === 'visual_tour' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Visual Feature Tour & Module Walkthrough</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect high-resolution visual previews of each core subsystem, understand key metrics, and jump directly to that module.
              </p>
            </div>

            {/* Module Picker Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TOUR_MODULES.map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTourModule(idx)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedTourModule === idx
                      ? 'bg-slate-800 border-cyan-500 shadow-md shadow-cyan-950/40 text-slate-100'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400">{mod.badge}</div>
                  <div className="text-xs font-bold mt-1 line-clamp-1">{mod.title}</div>
                </button>
              ))}
            </div>

            {/* Selected Module Detail */}
            {(() => {
              const current = TOUR_MODULES[selectedTourModule];
              return (
                <div className="space-y-6">
                  {/* Screenshot Display Frame */}
                  <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl relative group">
                    <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                        <span className="text-[11px] font-mono text-slate-400 ml-2">
                          Institutional UI Preview: {current.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                        {current.badge}
                      </span>
                    </div>

                    <img 
                      src={current.image} 
                      alt={current.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover max-h-[460px]"
                    />

                    <div className="p-4 bg-slate-950/95 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{current.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{current.description}</p>
                      </div>

                      <button
                        onClick={() => onSelectTab(current.targetTab)}
                        className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-lg transition-all cursor-pointer"
                      >
                        <span>Open This View</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Feature Breakdown & Pro-Tips */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Key Capabilities in this View</div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {current.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Operational Pro-Tip</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {current.quickTip}
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedTourModule((prev) => (prev + 1) % TOUR_MODULES.length)}
                          className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Next Feature Preview</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 3: PERSONA-BASED GUIDE */}
      {activeGuideTab === 'personas' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>Role-Based Operational Guide & Segregation Matrix</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Understand what tasks each institutional stakeholder is authorized to perform in adherence to RBI Pillar 2 governance standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Persona 1: Chief Risk Officer */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">USR-CRO-0001</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Line 2B Senior Exec
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100">Chief Risk Officer (CRO)</div>
                <p className="text-[11px] text-slate-400">
                  Holds ultimate executive oversight and fiduciary responsibility for the institutional model risk management framework.
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-slate-200">Permitted Actions:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    <li>Approve Tier-1 models for production</li>
                    <li>Execute Four-Eyes credit sanctions (&gt; ₹50 Cr)</li>
                    <li>Authorize emergency circuit breakers</li>
                    <li>Digitally attest Form MRM-CIB-01 returns</li>
                  </ul>
                </div>
                <button
                  onClick={() => onSelectPersona(USER_PERSONAS.CRO)}
                  className="w-full py-1.5 rounded bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 text-xs font-medium border border-cyan-500/30 transition-all cursor-pointer"
                >
                  Switch to Chief Risk Officer
                </button>
              </div>

              {/* Persona 2: Independent Model Validator */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">USR-IMV-3309</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Line 2A Independent
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100">Lead Model Validator (IMV)</div>
                <p className="text-[11px] text-slate-400">
                  Operates with complete reporting separation from line-of-business quants to perform objective stress benchmarking.
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-slate-200">Permitted Actions:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    <li>Run Out-Of-Time (OOT) stress datasets</li>
                    <li>Certify KS &gt;= 40% &amp; AUC &gt;= 0.75 gates</li>
                    <li>Enforce Brier score calibration limits</li>
                    <li>Order model recalibration / Challenger promotion</li>
                  </ul>
                </div>
                <button
                  onClick={() => onSelectPersona(USER_PERSONAS.IMV_HEAD)}
                  className="w-full py-1.5 rounded bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-medium border border-emerald-500/30 transition-all cursor-pointer"
                >
                  Switch to IMV Lead
                </button>
              </div>

              {/* Persona 3: Wholesale Credit Underwriter */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400">USR-CREDIT-4412</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                    Line 1 Maker
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100">Wholesale Underwriter</div>
                <p className="text-[11px] text-slate-400">
                  Commercial lending officer responsible for corporate facility origination, LEI verification, and covenant negotiation.
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-slate-200">Permitted Actions:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    <li>Originate loan proposals (&gt; ₹50 Cr)</li>
                    <li>Review SHAP explainability waterfall</li>
                    <li>Attach statutory covenants to proposals</li>
                    <li>Submit proposals for CRO Checker sign-off</li>
                  </ul>
                </div>
                <button
                  onClick={() => onSelectPersona(USER_PERSONAS.CREDIT_HEAD)}
                  className="w-full py-1.5 rounded bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 text-xs font-medium border border-purple-500/30 transition-all cursor-pointer"
                >
                  Switch to Credit Underwriter
                </button>
              </div>

              {/* Persona 4: Head of Global Treasury */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">USR-TRSY-8820</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                    Line 1 Operations
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100">Head of Treasury</div>
                <p className="text-[11px] text-slate-400">
                  Manages international Nostro settlement operations, intraday currency buffers, and real-time liquidity drift.
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-slate-200">Permitted Actions:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    <li>Monitor 15-min Nostro PSI sensors</li>
                    <li>Execute manual or automatic Challenger failovers</li>
                    <li>Execute domestic reserve liquidity sweeps</li>
                    <li>Maintain statutory 110% LCR buffer</li>
                  </ul>
                </div>
                <button
                  onClick={() => onSelectPersona(USER_PERSONAS.TREASURY_HEAD)}
                  className="w-full py-1.5 rounded bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 text-xs font-medium border border-amber-500/30 transition-all cursor-pointer"
                >
                  Switch to Treasury Head
                </button>
              </div>

              {/* Persona 5: Quantitative Model Developer */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">USR-QUANT-7721</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-700">
                    Line 1 Builder
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100">Quant Developer</div>
                <p className="text-[11px] text-slate-400">
                  Designs mathematical architectures, engineers features, and submits candidate models to CI/CD validation gates.
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-slate-200">Permitted Actions:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    <li>Register new model artifacts</li>
                    <li>Configure CI/CD policy-as-code manifests</li>
                    <li>Submit models for IMV certification</li>
                    <li>(Cannot approve own models for production)</li>
                  </ul>
                </div>
                <button
                  onClick={() => onSelectPersona(USER_PERSONAS.QUANT_LEAD)}
                  className="w-full py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
                >
                  Switch to Quant Developer
                </button>
              </div>

              {/* Persona 6: RBI Supervisory Inspector */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-400">USR-RBI-9901</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
                    Line 3 External Audit
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100">Supervisory Inspector</div>
                <p className="text-[11px] text-slate-400">
                  External central bank official conducting statutory on-site supervisory examinations under Section 35A of the Banking Regulation Act.
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-slate-200">Permitted Actions:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    <li>Audit cryptographic SHA-256 ledger integrity</li>
                    <li>Verify mathematical reconciliation of SHAP</li>
                    <li>Inspect Form MRM-CIB-01 returns</li>
                    <li>(Read-only, non-mutating audit privileges)</li>
                  </ul>
                </div>
                <button
                  onClick={() => onSelectPersona(USER_PERSONAS.RBI_AUDITOR)}
                  className="w-full py-1.5 rounded bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-medium border border-rose-500/30 transition-all cursor-pointer"
                >
                  Switch to RBI Inspector
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PLATFORM FAQS */}
      {activeGuideTab === 'faq' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Frequently Asked Questions & Governance Scenarios</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Detailed answers to common questions regarding regulatory compliance, mathematical formulations, and operational controls.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/80 transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-slate-200 hover:text-cyan-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-cyan-400 font-mono">Q:</span>
                        <span>{faq.question}</span>
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-900/40">
                        <p className="mt-2 pl-4 border-l-2 border-cyan-500/50">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
