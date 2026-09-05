import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Code2, 
  Cpu, 
  ShieldAlert, 
  Sliders, 
  RefreshCw, 
  FileCheck2,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { ModelInventoryItem, ComplianceRule, UserPersona } from '../types';

interface ComplianceAsCodeViewProps {
  models: ModelInventoryItem[];
  rules: ComplianceRule[];
  activePersona: UserPersona;
  onRefresh: () => void;
  onRuleTriggered?: (ruleCode: string) => void;
}

export const ComplianceAsCodeView: React.FC<ComplianceAsCodeViewProps> = ({
  models,
  rules,
  activePersona,
  onRefresh
}) => {
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(rules[0] || null);
  const [selectedModel, setSelectedModel] = useState<ModelInventoryItem | null>(models[0] || null);
  const [simulatingStress, setSimulatingStress] = useState(false);
  const [stressResult, setStressResult] = useState<string | null>(null);

  const handleSimulateStressTest = () => {
    if (!activePersona.permissions.canTriggerModelValidation) {
      alert("RBAC Restriction: Only Independent Model Validation (IMV) or Chief Risk Officer (CRO) can initiate Supervisory Stress Testing.");
      return;
    }
    setSimulatingStress(true);
    setTimeout(() => {
      setSimulatingStress(false);
      setStressResult("Stress Test Complete: Basel III Pillar 2 Macro-Stress Scenario passed with 1.42x capital adequacy buffer. KS Statistic = 55.4, AUC-ROC = 0.898.");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Blueprint Architecture Diagram / Header */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                RBI MRM ARCHITECTURAL BLUEPRINT
              </span>
              <span className="text-xs font-mono text-slate-400">
                Statutory Reference: RBI/2025-26/MRM-CIB-DIR
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">
              "Compliance-as-Code" Model Governance Pipeline
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl mt-1">
              Proactive enforcement architecture designed for corporate and institutional banking. Embeds programmatic policy gates, audit-ready SHAP telemetry, and autonomous cross-border drift remediation into automated lending and treasury algorithms.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateStressTest}
              disabled={simulatingStress}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                activePersona.permissions.canTriggerModelValidation
                  ? 'bg-cyan-950/50 hover:bg-cyan-900/60 border-cyan-500/40 text-cyan-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${simulatingStress ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{simulatingStress ? 'Running Stress Test...' : 'Run Supervisory Macro-Stress'}</span>
            </button>
          </div>
        </div>

        {/* 5-Stage Visual Lifecycle Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 relative">
            <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-1">STAGE 01</div>
            <div className="text-xs font-bold text-slate-200">Model Registry & Tiering</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Categorization into Tier-1 Critical (Credit & Nostro) vs Tier-2/3.
            </div>
            <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>4 Models Cataloged</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 relative">
            <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-1">STAGE 02</div>
            <div className="text-xs font-bold text-slate-200">Independent IMV Gate</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Segregation of duties: Quant dev cannot self-approve production weights.
            </div>
            <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Four-Eyes RBAC Active</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 relative">
            <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-1">STAGE 03</div>
            <div className="text-xs font-bold text-slate-200">Explainability Telemetry</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Deterministic SHAP feature attribution & adverse action notices on every loan.
            </div>
            <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Mandatory &gt; ₹50 Cr</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 relative">
            <div className="text-[10px] font-mono text-amber-400 font-semibold mb-1">STAGE 04</div>
            <div className="text-xs font-bold text-slate-200">Real-Time Drift Sensor</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Continuous PSI/CSI monitoring on cross-border liquidity and FX queues.
            </div>
            <div className="mt-2 text-[10px] font-mono text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>PSI Barrier: 0.25</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 relative">
            <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-1">STAGE 05</div>
            <div className="text-xs font-bold text-slate-200">Automated Remediation</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Autonomous Champion-Challenger failover, dynamic haircuts & circuit breakers.
            </div>
            <div className="mt-2 text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Hitless Transition Ready</span>
            </div>
          </div>
        </div>

        {stressResult && (
          <div className="mt-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{stressResult}</span>
            </div>
            <button
              onClick={() => setStressResult(null)}
              className="text-emerald-400 hover:text-emerald-200 text-[11px] font-mono underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Two Column Grid: Compliance Rules Engine vs Tiered Model Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Compliance-as-Code Rule Catalog */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Declarative Compliance-as-Code Rules (RBI MRM)</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Executable policy rules enforcing quantitative bounds and governance gates
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                {rules.length} Active Rules
              </span>
            </div>

            <div className="space-y-2.5">
              {rules.map((rule) => {
                const isSelected = selectedRule?.id === rule.id;
                return (
                  <div
                    key={rule.id}
                    onClick={() => setSelectedRule(rule)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500/50 shadow-md'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cyan-300">{rule.code}</span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border border-slate-700 bg-slate-900 text-slate-400">
                            {rule.category}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-200 mt-1">{rule.title}</div>
                      </div>

                      <div>
                        {rule.status === 'COMPLIANT' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>COMPLIANT</span>
                          </span>
                        )}
                        {rule.status === 'WARNING' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300">
                            <AlertTriangle className="w-3 h-3" />
                            <span>ALERT</span>
                          </span>
                        )}
                        {rule.status === 'BREACH' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300">
                            <XCircle className="w-3 h-3" />
                            <span>BREACH</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">
                      {rule.description}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Threshold: {rule.thresholdMetric}</span>
                      <span className={rule.status === 'WARNING' ? 'text-amber-400' : 'text-slate-400'}>
                        {rule.currentValue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Rule Code Inspector */}
            {selectedRule && (
              <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                  <span className="text-cyan-400 font-semibold">POLICY DSL BLUEPRINT: {selectedRule.code}</span>
                  <span className="text-slate-500">{selectedRule.enforcementMode}</span>
                </div>
                <pre className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 overflow-x-auto leading-relaxed">
                  {selectedRule.codeSnippet}
                </pre>
                <div className="mt-2 text-[11px] text-slate-400">
                  <span className="font-mono text-slate-500">Auto-Remediation Trigger: </span>
                  <span className="text-cyan-300">{selectedRule.autoRemediationAction}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Model Inventory & Tiering */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Institutional Model Inventory & Tiering (RBI Framework)</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Mandatory model inventory ledger with independent validation signatures
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                Tier-1 / Tier-2 Registry
              </span>
            </div>

            <div className="space-y-3">
              {models.map((model) => {
                const isSelected = selectedModel?.id === model.id;
                return (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500/50 shadow-md'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${
                            model.tier === 'TIER_1_CRITICAL'
                              ? 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                              : 'bg-amber-950/50 border-amber-500/40 text-amber-300'
                          }`}>
                            {model.tier.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{model.modelCode}</span>
                          <span className="text-[10px] font-mono px-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
                            v{model.version}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-200 mt-1">{model.modelName}</div>
                      </div>

                      <div className="text-right">
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                          model.rbiComplianceStatus === 'FULL_COMPLIANCE'
                            ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                            : 'bg-amber-950/50 border-amber-500/40 text-amber-300'
                        }`}>
                          Score: {model.rbiComplianceScore}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                      <div>
                        <div className="text-slate-500 text-[10px]">KS STAT</div>
                        <div className="text-slate-200 font-semibold">{model.ksStatistic}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px]">AUC-ROC</div>
                        <div className="text-slate-200 font-semibold">{model.aucRoc}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px]">PSI DRIFT</div>
                        <div className={`font-semibold ${model.psiScore >= 0.15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {model.psiScore}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px]">STATUS</div>
                        <div className="text-cyan-300 font-semibold">{model.status}</div>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-900 pt-1.5">
                      <div className="truncate max-w-[280px]">
                        <span className="text-slate-500">Validator: </span>
                        <span>{model.validator}</span>
                      </div>
                      <div className="font-mono text-slate-500">
                        Review Due: {model.nextAnnualReviewDue}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Model Deep Dive */}
            {selectedModel && (
              <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">CRYPTOGRAPHIC TELEMETRY DIGEST</span>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                    SHA-256 AUDIT-READY
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-400 break-all bg-slate-900 p-2 rounded border border-slate-800">
                  {selectedModel.telemetryDigest}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 pt-1">
                  <span className="text-slate-500">Monitored Variables:</span>
                  {selectedModel.features.map(f => (
                    <span key={f} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
