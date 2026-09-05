import React, { useState } from 'react';
import { 
  Coins, 
  Activity, 
  AlertTriangle, 
  Zap, 
  RefreshCw, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  Sliders,
  Lock,
  Globe2,
  Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { LiquidityTelemetryEvent, RemediationWorkflowItem, UserPersona } from '../types';

interface CrossBorderLiquidityViewProps {
  telemetry: LiquidityTelemetryEvent[];
  remediationQueue: RemediationWorkflowItem[];
  activePersona: UserPersona;
  onExecuteRemediation: (remediationId: string, actionType: string, targetAccount: string) => Promise<void>;
  onTriggerDriftSimulation: (accountId: string) => void;
}

export const CrossBorderLiquidityView: React.FC<CrossBorderLiquidityViewProps> = ({
  telemetry,
  remediationQueue,
  activePersona,
  onExecuteRemediation,
  onTriggerDriftSimulation
}) => {
  const [selectedAccount, setSelectedAccount] = useState<LiquidityTelemetryEvent>(telemetry[0]);
  const [executingId, setExecutingId] = useState<string | null>(null);

  // Mock historical 24-hour intraday telemetry points for the chart
  const historicalDriftPoints = [
    { time: '00:00', psi: 0.038, lcr: 122, outflow: 15 },
    { time: '04:00', psi: 0.042, lcr: 119, outflow: 22 },
    { time: '08:00', psi: 0.055, lcr: 115, outflow: 34 },
    { time: '12:00', psi: 0.088, lcr: 112, outflow: 48 },
    { time: '16:00', psi: 0.142, lcr: 106, outflow: 58 },
    { time: '20:00', psi: selectedAccount?.psiDrift || 0.18, lcr: selectedAccount?.rbiLcrBufferRatioPct || 114, outflow: selectedAccount?.predictedOutflowNext4HoursMillion || 65 }
  ];

  const handleExecute = async (item: RemediationWorkflowItem) => {
    if (!activePersona.permissions.canTriggerEmergencyCircuitBreakers && activePersona.role !== 'CRO') {
      alert("RBAC Restriction: Only the Chief Risk Officer (CRO) or Head of Global Treasury can execute automated cross-border remediation workflows.");
      return;
    }
    setExecutingId(item.id);
    try {
      await onExecuteRemediation(item.id, item.remediationType, item.nostroAccount || selectedAccount.id);
    } finally {
      setExecutingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              CROSS-BORDER LIQUIDITY TELEMETRY
            </span>
            <span className="text-xs font-mono text-slate-400">
              RBI Master Direction: Nostro Buffer & Intraday Liquidity Risk
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Real-Time Drift Detection & Automated Remediation Engine
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl mt-1">
            Continuous population stability indexing (PSI) across Nostro clearing accounts in New York, London, Frankfurt, and Tokyo. Automatically trips circuit breakers and fails over to challenger models when FX volatility breaches RBI safety margins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTriggerDriftSimulation(selectedAccount.id)}
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-amber-950/50"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate FX Volatility Spike</span>
          </button>
        </div>
      </div>

      {/* 4 Multi-Currency Nostro Account Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {telemetry.map((acc) => {
          const isSelected = selectedAccount?.id === acc.id;
          return (
            <div
              key={acc.id}
              onClick={() => setSelectedAccount(acc)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400">{acc.currency} NOSTRO</span>
                  <div className="text-xs font-bold text-slate-200 mt-0.5 truncate max-w-[140px]">
                    {acc.partnerBank}
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                  acc.driftStatus === 'NORMAL'
                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                    : acc.driftStatus === 'ELEVATED_WATCH'
                    ? 'bg-amber-950/50 border-amber-500/40 text-amber-300'
                    : 'bg-rose-950/50 border-rose-500/40 text-rose-300 animate-pulse'
                }`}>
                  {acc.driftStatus.replace('_', ' ')}
                </span>
              </div>

              <div className="mt-3">
                <div className="text-lg font-mono font-extrabold text-slate-100">
                  {acc.currency} {acc.currentBalanceMillion.toLocaleString()}M
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Target Buffer: {acc.currency} {acc.targetBufferMillion}M
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                <div>
                  <div className="text-slate-500 text-[10px]">PSI DRIFT</div>
                  <div className={`font-bold ${
                    acc.psiDrift >= 0.25 ? 'text-rose-400' :
                    acc.psiDrift >= 0.10 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {acc.psiDrift.toFixed(3)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">RBI LCR BUFFER</div>
                  <div className={`font-bold ${acc.rbiLcrBufferRatioPct < 100 ? 'text-rose-400' : 'text-slate-200'}`}>
                    {acc.rbiLcrBufferRatioPct}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Live Drift Visualizer vs Remediation Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Drift Sensors & Intraday Timeline Chart */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-3 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    {selectedAccount.nostroAccount}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Jurisdiction: <span className="text-slate-200">{selectedAccount.jurisdiction}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">LAST SWEEP TIMESTAMPT</div>
                <div className="text-xs font-mono text-cyan-300">{selectedAccount.lastSweepTime}</div>
              </div>
            </div>

            {/* Drift Gauge Matrix */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">POPULATION STABILITY (PSI)</div>
                <div className={`text-xl font-mono font-extrabold mt-1 ${
                  selectedAccount.psiDrift >= 0.25 ? 'text-rose-400' :
                  selectedAccount.psiDrift >= 0.10 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedAccount.psiDrift.toFixed(3)}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">Threshold: &lt; 0.25</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">INTRADAY LCR BUFFER</div>
                <div className={`text-xl font-mono font-extrabold mt-1 ${
                  selectedAccount.rbiLcrBufferRatioPct < 100 ? 'text-rose-400' : 'text-cyan-400'
                }`}>
                  {selectedAccount.rbiLcrBufferRatioPct}%
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">RBI Floor: 100% Min</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">CROSS-CURRENCY BASIS</div>
                <div className="text-xl font-mono font-extrabold text-slate-200 mt-1">
                  {selectedAccount.crossCurrencyBasisBps} bps
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">SOFR/MIFOR Spread</div>
              </div>
            </div>

            {/* Intraday PSI Drift Trend Chart */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>24-Hour Population Stability Index (PSI) Telemetry Stream</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Sample Frequency: 15 Mins</span>
              </div>

              <div className="h-52 w-full bg-slate-950 p-2 rounded-lg border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalDriftPoints} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPsi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} domain={[0, 0.35]} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono">
                              <div>Time: {data.time}</div>
                              <div className="text-cyan-300">PSI Drift: {data.psi}</div>
                              <div className="text-slate-400">LCR Buffer: {data.lcr}%</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="psi" 
                      stroke="#06b6d4" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorPsi)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Model Architecture Binding */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">ACTIVE CHAMPION:</span>
                <span className="text-cyan-300 font-bold">{selectedAccount.championModelId}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">HOT CHALLENGER:</span>
                <span className="text-amber-300 font-bold">{selectedAccount.challengerModelId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Automated Remediation Queue & Control Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Autonomous Remediation Workflows</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Compliance-as-Code automated incident response & failover triggers
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300">
                {remediationQueue.filter(r => r.status !== 'RESOLVED').length} Pending
              </span>
            </div>

            {remediationQueue.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                All models calibrated. No active remediation triggers.
              </div>
            ) : (
              <div className="space-y-3">
                {remediationQueue.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-3.5 rounded-lg border text-xs space-y-2 ${
                      item.status === 'RESOLVED'
                        ? 'bg-slate-950/40 border-slate-800 opacity-60'
                        : item.status === 'AUTO_EXECUTED'
                        ? 'bg-cyan-950/20 border-cyan-500/30'
                        : 'bg-amber-950/30 border-amber-500/50 shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-slate-400">{item.id}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                          {item.remediationType.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        item.status === 'RESOLVED'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : item.status === 'AUTO_EXECUTED'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40 animate-pulse'
                      }`}>
                        {item.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200">
                      {item.reason}
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Target: <span className="text-slate-300">{item.modelName} ({item.nostroAccount || 'Global Desk'})</span>
                    </div>

                    {item.resolutionSummary && (
                      <div className="p-2 rounded bg-slate-950 text-[11px] font-mono text-emerald-300 border border-emerald-900/40">
                        {item.resolutionSummary}
                      </div>
                    )}

                    {item.status !== 'RESOLVED' && (
                      <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                        <div className="font-mono text-[10px] text-slate-500 truncate max-w-[150px]">
                          Audit: {item.auditHash.slice(0, 16)}...
                        </div>
                        <button
                          onClick={() => handleExecute(item)}
                          disabled={executingId === item.id}
                          className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                            activePersona.permissions.canTriggerEmergencyCircuitBreakers || activePersona.role === 'CRO'
                              ? 'bg-cyan-600 hover:bg-cyan-500 text-slate-950'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <RefreshCw className={`w-3 h-3 ${executingId === item.id ? 'animate-spin' : ''}`} />
                          <span>{executingId === item.id ? 'Failing over...' : 'Authorize & Execute Failover'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Automated Remediation Policy Rules Guide */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-[11px] text-slate-400">
              <div className="font-mono text-slate-300 font-semibold text-xs">
                REMEDIATION CIRCUIT-BREAKER POLICIES
              </div>
              <ul className="space-y-1 list-disc list-inside text-[10px] text-slate-400">
                <li><strong className="text-slate-300">PSI &ge; 0.25:</strong> Automatic failover to champion-challenger architecture.</li>
                <li><strong className="text-slate-300">LCR &lt; 100%:</strong> Autonomous Nostro buffer top-up sweep via RBI reserve lines.</li>
                <li><strong className="text-slate-300">Basis Shock &gt; 40 bps:</strong> Dynamic 200 bps collateral haircut injection.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
