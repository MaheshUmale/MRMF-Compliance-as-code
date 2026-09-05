import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck, 
  AlertOctagon, 
  Sliders, 
  Send, 
  ShieldCheck, 
  Lock, 
  Hash, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  ReferenceLine 
} from 'recharts';
import { CorporateCreditApplication, UserPersona } from '../types';

interface CorporateLendingViewProps {
  applications: CorporateCreditApplication[];
  activePersona: UserPersona;
  onEvaluateNewApplication: (payload: any) => Promise<void>;
  onApproveApplication: (applicationId: string) => void;
}

export const CorporateLendingView: React.FC<CorporateLendingViewProps> = ({
  applications,
  activePersona,
  onEvaluateNewApplication,
  onApproveApplication
}) => {
  const [selectedApp, setSelectedApp] = useState<CorporateCreditApplication>(applications[0]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);

  // Form State for Interactive Underwriting Sandbox
  const [companyName, setCompanyName] = useState('Zenith Heavy Logistics & Maritime Ltd');
  const [industry, setIndustry] = useState('Ports & Heavy Transport');
  const [facilityType, setFacilityType] = useState<CorporateCreditApplication['facilityType']>('SYNDICATED_TERM_LOAN');
  const [requestedLimitINR, setRequestedLimitINR] = useState(250);
  const [dscr, setDscr] = useState(1.42);
  const [debtToEquity, setDebtToEquity] = useState(2.2);
  const [promoterPledgePct, setPromoterPledgePct] = useState(14.0);
  const [ebitdaMarginPct, setEbitdaMarginPct] = useState(24.0);
  const [gstVariancePct, setGstVariancePct] = useState(2.1);
  const [exportReceivablesPct, setExportReceivablesPct] = useState(35.0);

  const handleRunEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePersona.permissions.canSanctionCreditFacilities && activePersona.role !== 'IMV_LEAD') {
      alert("RBAC Notice: Your active persona does not have credit facility evaluation permissions.");
      return;
    }

    setIsEvaluating(true);
    try {
      await onEvaluateNewApplication({
        companyName,
        industry,
        requestedLimitINR: Number(requestedLimitINR),
        facilityType,
        actor: `${activePersona.name} (${activePersona.role})`,
        role: activePersona.role,
        financialMetrics: {
          annualRevenueINR: requestedLimitINR * 6,
          dscr: Number(dscr),
          debtToEquity: Number(debtToEquity),
          promoterPledgePct: Number(promoterPledgePct),
          ebitdaMarginPct: Number(ebitdaMarginPct),
          gstReconciliationVariancePct: Number(gstVariancePct),
          exportReceivablesPct: Number(exportReceivablesPct),
          currentRatio: 1.5,
          esgRating: 'A',
          daysSalesOutstanding: 55
        }
      });
      setShowSandbox(false);
    } catch (err) {
      console.error("Evaluation failed:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Sync selected application when applications update
  React.useEffect(() => {
    if (applications.length > 0 && !applications.find(a => a.id === selectedApp?.id)) {
      setSelectedApp(applications[0]);
    }
  }, [applications, selectedApp]);

  // Transform SHAP attributions for Recharts
  const shapChartData = selectedApp?.evaluation.shapAttributions.map(attr => ({
    name: attr.feature.replace('_', ' '),
    impact: Number(attr.impact.toFixed(3)),
    direction: attr.direction,
    description: attr.description,
    rawValue: attr.rawValue
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              RBI MODEL RISK COMPLIANCE — SECTION 4.2(B)
            </span>
            <span className="text-xs font-mono text-slate-400">
              Mandatory Explainability Gate for Automated Credit Decisions &gt; ₹50 Cr
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Automated Corporate Lending & SHAP Explainability Engine
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl mt-1">
            Enforces deterministic feature attribution (SHAP), statutory adverse action justification codes, and cryptographic telemetry hashing before any corporate credit facility is sanctioned.
          </p>
        </div>

        <button
          onClick={() => setShowSandbox(!showSandbox)}
          className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/50"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showSandbox ? 'Hide Underwriting Sandbox' : 'Open Underwriting Sandbox'}</span>
        </button>
      </div>

      {/* Interactive Underwriting Sandbox (Collapsible Drawer / Panel) */}
      {showSandbox && (
        <form onSubmit={handleRunEvaluation} className="p-5 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Simulate Corporate Underwriting & Generate Audit Telemetry</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Adjust balance sheet variables to inspect real-time SHAP feature vector changes and regulatory adverse action triggers.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/30">
              Model: RB-MRM-CIB-PD-01 (v3.4.2)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Corporate Entity Name</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-slate-200 focus:border-cyan-400 outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Industry Sector</label>
              <input
                type="text"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-slate-200 focus:border-cyan-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Facility Type</label>
              <select
                value={facilityType}
                onChange={e => setFacilityType(e.target.value as any)}
                className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-slate-200 focus:border-cyan-400 outline-none"
              >
                <option value="SYNDICATED_TERM_LOAN">Syndicated Term Loan (Capex)</option>
                <option value="WORKING_CAPITAL_CONSORTIUM">Working Capital Consortium Line</option>
                <option value="CROSS_BORDER_TRADE_LINE">Cross-Border Trade Line (Letter of Credit)</option>
                <option value="FOREIGN_CURRENCY_TERM_LOAN">Foreign Currency Term Loan (ECB/FCTL)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                <span>Requested Limit (₹ Crores)</span>
                <span className="font-mono text-cyan-400">₹{requestedLimitINR} Cr</span>
              </label>
              <input
                type="range"
                min="50"
                max="800"
                step="25"
                value={requestedLimitINR}
                onChange={e => setRequestedLimitINR(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                <span>Debt Service Coverage (DSCR)</span>
                <span className="font-mono text-cyan-400">{dscr}x</span>
              </label>
              <input
                type="range"
                min="0.9"
                max="2.5"
                step="0.05"
                value={dscr}
                onChange={e => setDscr(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                <span>Debt to Equity Ratio</span>
                <span className="font-mono text-cyan-400">{debtToEquity}x</span>
              </label>
              <input
                type="range"
                min="0.8"
                max="4.5"
                step="0.1"
                value={debtToEquity}
                onChange={e => setDebtToEquity(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                <span>Promoter Share Pledge % (RBI Max 20%)</span>
                <span className={`font-mono ${promoterPledgePct > 20 ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {promoterPledgePct}% {promoterPledgePct > 20 ? '[ALERT]' : ''}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={promoterPledgePct}
                onChange={e => setPromoterPledgePct(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                <span>EBITDA Margin %</span>
                <span className="font-mono text-cyan-400">{ebitdaMarginPct}%</span>
              </label>
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={ebitdaMarginPct}
                onChange={e => setEbitdaMarginPct(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                <span>GST Tax Return Discrepancy %</span>
                <span className={`font-mono ${gstVariancePct > 5 ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {gstVariancePct}% {gstVariancePct > 5 ? '[EWS FLAG]' : ''}
                </span>
              </label>
              <input
                type="range"
                min="0.5"
                max="12"
                step="0.5"
                value={gstVariancePct}
                onChange={e => setGstVariancePct(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowSandbox(false)}
              className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isEvaluating}
              className="px-5 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isEvaluating ? 'Evaluating Model Inference...' : 'Execute Model Inference & Telemetry'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Main Grid: Application List vs Audit-Ready Explainability Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Credit Applications Pipeline */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>LIVE WHOLESALE CREDIT SANCTION PIPELINE</span>
            <span>{applications.length} Corporate Dossiers</span>
          </div>

          <div className="space-y-3">
            {applications.map((app) => {
              const isSelected = selectedApp?.id === app.id;
              const { evaluation } = app;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-slate-700 bg-slate-950 text-cyan-300">
                          {app.applicationNo}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {app.industry}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100 mt-1">{app.companyName}</h4>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-slate-200">
                        ₹{app.requestedLimitINR} Cr
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {app.facilityType.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                    <div>
                      <div className="text-slate-500 text-[10px]">RATING</div>
                      <div className="text-cyan-300 font-bold">{evaluation.internalRating}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">CALIB. PD</div>
                      <div className="text-slate-200 font-semibold">{evaluation.calibratedPdPct}%</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">EXP. LOSS</div>
                      <div className="text-slate-200 font-semibold">₹{evaluation.expectedLossINR} Cr</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">DECISION</div>
                      <div className={`font-bold ${
                        evaluation.decision === 'APPROVED' ? 'text-emerald-400' :
                        evaluation.decision === 'CONDITIONAL_APPROVAL' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {evaluation.decision.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="truncate max-w-[200px]">LEI: {app.leiNumber}</span>
                    <span className="text-cyan-400/80">SHAP Attributions: {evaluation.shapAttributions.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Audit-Ready Explainability Inspector */}
        <div className="lg:col-span-7 space-y-4">
          {selectedApp ? (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
              {/* Top Summary Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      EXPLAINABILITY INSPECTOR
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      LEI: {selectedApp.leiNumber}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-1">
                    {selectedApp.companyName}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>Facility: {selectedApp.facilityType.replace(/_/g, ' ')}</span>
                    <span>•</span>
                    <span className="font-mono text-cyan-300">Sanctioned: ₹{selectedApp.evaluation.approvedLimitINR} Cr (Req: ₹{selectedApp.requestedLimitINR} Cr)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400">INTERNAL RATING</div>
                    <div className="text-lg font-mono font-black text-cyan-400">{selectedApp.evaluation.internalRating}</div>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400">PRICING SPREAD</div>
                    <div className="text-xs font-mono font-bold text-slate-200">Repo + {selectedApp.evaluation.pricingSpreadBps} bps</div>
                  </div>
                </div>
              </div>

              {/* Four-Eyes Sign-Off / Approval Status */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-slate-300 font-medium">Four-Eyes Segregation of Duties: </span>
                    <span className="text-slate-400">
                      {selectedApp.evaluation.fourEyesApprovedBy 
                        ? `Approved by ${selectedApp.evaluation.fourEyesApprovedBy}`
                        : "Awaiting Chief Risk Officer (CRO) Sanction Sign-Off"}
                    </span>
                  </div>
                </div>

                {!selectedApp.evaluation.fourEyesApprovedBy && (
                  <button
                    onClick={() => onApproveApplication(selectedApp.id)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                      activePersona.permissions.canOverrideModelDecisions || activePersona.role === 'CRO'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    CRO Four-Eyes Attest
                  </button>
                )}
              </div>

              {/* SHAP Feature Attribution Chart (Waterfall / Impact Bar Chart) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>SHAP Feature Attribution Vectors (Audit-Ready Explainability)</span>
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                      <span>Reduces Risk / Lowers PD</span>
                    </span>
                    <span className="flex items-center gap-1 text-rose-400">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                      <span>Increases Risk / Pushes PD</span>
                    </span>
                  </div>
                </div>

                <div className="h-56 w-full bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={shapChartData}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 70, bottom: 5 }}
                    >
                      <XAxis 
                        type="number" 
                        domain={[-0.8, 0.8]} 
                        stroke="#64748b" 
                        fontSize={10} 
                        tickFormatter={(v) => `${v > 0 ? '+' : ''}${v}`}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        fontSize={11} 
                        tickLine={false} 
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="p-2.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono shadow-xl">
                                <div className="font-bold text-slate-200">{data.name}</div>
                                <div className="text-slate-400">Observed Value: <span className="text-cyan-300">{data.rawValue}</span></div>
                                <div className={data.impact > 0 ? "text-rose-400" : "text-emerald-400"}>
                                  SHAP Impact: {data.impact > 0 ? '+' : ''}{data.impact} ({data.direction})
                                </div>
                                <div className="text-[11px] text-slate-400 mt-1 max-w-xs">{data.description}</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine x={0} stroke="#475569" strokeDasharray="3 3" />
                      <Bar dataKey="impact" radius={[2, 2, 2, 2]}>
                        {shapChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.impact > 0 ? '#f43f5e' : '#10b981'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Feature Contribution Breakdown Cards */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">DETAILED FACTOR ATTRIBUTIONS</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedApp.evaluation.shapAttributions.map((attr) => (
                    <div 
                      key={attr.feature}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{attr.featureLabel}</span>
                        <span className={`font-mono text-[11px] font-semibold ${
                          attr.direction === 'RISK_INCREASING' ? 'text-rose-400' : 'text-emerald-400'
                        }`}>
                          {attr.impact > 0 ? '+' : ''}{attr.impact.toFixed(3)}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight">
                        {attr.description}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                        <span>Raw: {attr.rawValue}</span>
                        <span>Weight: {attr.contributionPct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Adverse Action Notices (RBI Mandatory Disclosure) */}
              {selectedApp.evaluation.adverseActionCodes.length > 0 && (
                <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                    <span>Statutory Adverse Action Disclosure (Mandatory RBI Compliance)</span>
                  </div>
                  <div className="space-y-2">
                    {selectedApp.evaluation.adverseActionCodes.map((aac) => (
                      <div key={aac.code} className="p-2 rounded bg-slate-950/80 border border-rose-900/50 text-xs">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-bold text-rose-300">{aac.code} — {aac.title}</span>
                          <span className="text-[10px] text-slate-400">{aac.rbiRuleRef}</span>
                        </div>
                        <div className="text-[11px] text-slate-300 mt-1">{aac.description}</div>
                        <div className="text-[11px] text-cyan-300 font-mono mt-1">
                          Mitigation Covenant: {aac.mitigationSuggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cryptographic SHA-256 Telemetry Digest Box */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CRYPTOGRAPHIC INFERENCE AUDIT DIGEST</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    TAMPER-EVIDENT VERIFIED
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-400 break-all bg-slate-900 p-2 rounded border border-slate-800">
                  {selectedApp.evaluation.telemetryDigest}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Model: {selectedApp.evaluation.modelUsedId} (v{selectedApp.evaluation.modelVersion})</span>
                  <span>Timestamp: {selectedApp.evaluation.timestamp}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-400">
              Select a corporate credit application from the left to inspect explainability attributions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
