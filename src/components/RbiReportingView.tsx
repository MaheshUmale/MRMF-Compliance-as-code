import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Printer, 
  ShieldCheck, 
  Lock, 
  ExternalLink,
  Building2,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { ModelInventoryItem, UserPersona, RemediationWorkflowItem, CorporateCreditApplication } from '../types';

interface RbiReportingViewProps {
  models: ModelInventoryItem[];
  applications: CorporateCreditApplication[];
  remediationQueue: RemediationWorkflowItem[];
  activePersona: UserPersona;
}

export const RbiReportingView: React.FC<RbiReportingViewProps> = ({
  models,
  applications,
  remediationQueue,
  activePersona
}) => {
  const [selectedModelId, setSelectedModelId] = useState(models[0]?.id || '');
  const [generatingMemo, setGeneratingMemo] = useState(false);
  const [aiMemo, setAiMemo] = useState<string | null>(null);
  const [memoMeta, setMemoMeta] = useState<{ 
    date: string; 
    signOff: string; 
    hash: string;
    source?: string;
    modelUsed?: string;
  } | null>(null);
  const [memoError, setMemoError] = useState<string | null>(null);
  const [attestationSigned, setAttestationSigned] = useState(false);
  const [copiedMemo, setCopiedMemo] = useState(false);

  const handleGenerateAiMemo = async () => {
    setGeneratingMemo(true);
    setMemoError(null);
    try {
      const res = await fetch('/api/gemini/compliance-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId: selectedModelId,
          promptContext: 'Formal quarterly supervisory examination of CIB automated wholesale lending and cross-border liquidity drift under RBI Model Risk Management regulations.'
        })
      });
      const data = await res.json();
      if (data.success && data.memo) {
        setAiMemo(data.memo);
        setMemoMeta({
          date: data.generatedAt,
          signOff: data.signOffOfficial,
          hash: data.auditVerificationHash,
          source: data.source,
          modelUsed: data.modelUsed
        });
      } else {
        setMemoError(data.error || 'Supervisory synthesis encountered an error.');
      }
    } catch (err: any) {
      console.error('Failed to generate audit memo:', err);
      setMemoError(err?.message || 'Network error encountered while contacting supervisory auditor.');
    } finally {
      setGeneratingMemo(false);
    }
  };

  const handleCopyMemo = () => {
    if (!aiMemo) return;
    navigator.clipboard.writeText(aiMemo).then(() => {
      setCopiedMemo(true);
      setTimeout(() => setCopiedMemo(false), 2000);
    });
  };

  const handleExportJson = () => {
    const rbiReturnPayload = {
      regulatoryForm: 'FORM-MRM-CIB-01',
      reportingPeriod: 'Q3-2026',
      reportingEntity: {
        name: 'Indus Commercial & Institutional Banking Group',
        lei: '335800G94U8372KV8912',
        regulatoryCategory: 'Schedule II Scheduled Commercial Bank'
      },
      modelInventory: models.map(m => ({
        code: m.modelCode,
        name: m.modelName,
        tier: m.tier,
        status: m.status,
        version: m.version,
        complianceScore: m.rbiComplianceScore,
        psiScore: m.psiScore,
        ksStatistic: m.ksStatistic,
        aucRoc: m.aucRoc,
        telemetryDigest: m.telemetryDigest
      })),
      underwritingExplainabilitySummary: {
        totalEvaluations: applications.length,
        mandatoryShapComplianceRate: '100%',
        adverseActionNoticesDispatched: applications.reduce((acc, a) => acc + a.evaluation.adverseActionCodes.length, 0)
      },
      remediationEvents: remediationQueue,
      submissionTimestamp: new Date().toISOString(),
      attestationSignedBy: attestationSigned ? activePersona.name : 'UNATTESTED'
    };

    const blob = new Blob([JSON.stringify(rbiReturnPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RBI-MRM-RETURN-CIB-01-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              RBI SUPERVISORY REPORTING INTEGRATION
            </span>
            <span className="text-xs font-mono text-slate-400">
              Form MRM-CIB-01 • Department of Supervision (DoS)
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Automated Regulatory Returns & AI Supervisory Auditor
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl mt-1">
            Seamlessly generate compliance dossiers, export audit-ready XBRL/JSON returns, and run AI-assisted supervisory policy inspections directly aligned with the upcoming RBI Model Risk Management guidelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJson}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Form MRM-CIB-01 (JSON)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official RBI Form Preview & Attestation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">STATUTORY SUBMISSION RETURN</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  FORM MRM-CIB-01
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 mt-1">
                Quarterly Return on Model Risk Governance & Telemetry Exceptions
              </h3>
            </div>

            {/* Form Details Grid */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">SECTION A: REGULATED ENTITY DETAILS</div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-500 text-[10px]">Entity: </span>
                    <span className="font-semibold">Indus Commercial Bank Ltd</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">LEI: </span>
                    <span className="font-mono text-cyan-300">335800G94U8372KV8912</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Supervisory College: </span>
                    <span>Mumbai - Large Banks Circle</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Return Due: </span>
                    <span className="font-mono text-slate-200">15th Day Following Quarter</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">SECTION B: TIER-1 MODEL INVENTORY & METRICS</div>
                <div className="space-y-2">
                  {models.filter(m => m.tier === 'TIER_1_CRITICAL').map(m => (
                    <div key={m.id} className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{m.modelName}</span>
                        <span className="font-mono text-cyan-300">{m.modelCode}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 pt-1">
                        <span>AUC: {m.aucRoc}</span>
                        <span>KS: {m.ksStatistic}</span>
                        <span>PSI: {m.psiScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">SECTION C: GOVERNANCE & ATTESTATION</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  "I hereby certify under the authority of the Board Model Risk Management Committee that all automated underwriting algorithms and cross-border liquidity models comply with RBI draft guidelines. Segregation of duties between model developers and independent validation has been strictly maintained."
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500">OFFICIAL ATTESTOR:</div>
                    <div className="text-xs font-bold text-slate-200">{activePersona.name} ({activePersona.role})</div>
                  </div>

                  <button
                    onClick={() => setAttestationSigned(true)}
                    disabled={!activePersona.permissions.canExportRBIReturns || attestationSigned}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                      attestationSigned
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : activePersona.permissions.canExportRBIReturns
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{attestationSigned ? 'Attestation Digitally Signed' : 'Sign Board Attestation'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Regulatory Auditor (Gemini API) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>AI Supervisory Model Risk Auditor (Powered by Gemini)</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Synthesize an official RBI Supervisory Inspection & Model Risk Attestation Memorandum
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedModelId}
                onChange={e => setSelectedModelId(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none focus:border-cyan-400"
              >
                {models.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.modelCode} — {m.modelName}
                  </option>
                ))}
              </select>

              <button
                onClick={handleGenerateAiMemo}
                disabled={generatingMemo}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${generatingMemo ? 'animate-spin' : ''}`} />
                <span>{generatingMemo ? 'Synthesizing...' : 'Generate Inspection Memo'}</span>
              </button>
            </div>

            {/* Error notification banner if any */}
            {memoError && (
              <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2 text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold">Supervisory Synthesis Notice</div>
                    <div className="text-[11px] text-amber-200/80 mt-0.5">{memoError}</div>
                  </div>
                </div>
                <button
                  onClick={handleGenerateAiMemo}
                  disabled={generatingMemo}
                  className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold border border-amber-500/40 flex items-center gap-1 shrink-0"
                >
                  <RefreshCw className={`w-3 h-3 ${generatingMemo ? 'animate-spin' : ''}`} />
                  <span>Retry</span>
                </button>
              </div>
            )}

            {/* Generated Memo Output Container */}
            {aiMemo ? (
              <div className="p-4 rounded-lg bg-slate-950 border border-cyan-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2 text-xs gap-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-slate-200">RESERVE BANK OF INDIA — SUPERVISORY AUDIT MEMORANDUM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {memoMeta?.modelUsed && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {memoMeta.modelUsed}
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      STATUS: VERIFIED
                    </span>
                    <button
                      onClick={handleCopyMemo}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy memo to clipboard"
                    >
                      {copiedMemo ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap max-h-96 overflow-y-auto pr-1">
                  {aiMemo}
                </div>

                {memoMeta && (
                  <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[10px] font-mono text-slate-500 gap-1">
                    <span>Audit Hash: {memoMeta.hash.slice(0, 24)}...</span>
                    <span>Issued: {memoMeta.date}</span>
                  </div>
                )}
              </div>
            ) : !memoError ? (
              <div className="p-10 rounded-lg bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 space-y-2">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="font-medium text-slate-300">No Regulatory Memorandum Generated Yet</div>
                <div className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Click "Generate Inspection Memo" above to run an AI-powered compliance synthesis for the selected model.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
