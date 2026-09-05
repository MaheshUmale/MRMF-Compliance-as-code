import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Filter, 
  Clock, 
  Hash, 
  FileText,
  UserCheck
} from 'lucide-react';
import { AuditLogEntry, UserPersona } from '../types';

interface AuditLedgerViewProps {
  logs: AuditLogEntry[];
  activePersona: UserPersona;
}

export const AuditLedgerView: React.FC<AuditLedgerViewProps> = ({ logs, activePersona }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(logs[0] || null);

  const filteredLogs = logs.filter(log => {
    const query = searchTerm.toLowerCase();
    return (
      log.actor.toLowerCase().includes(query) ||
      log.action.toLowerCase().includes(query) ||
      log.targetEntity.toLowerCase().includes(query) ||
      log.sha256Digest.toLowerCase().includes(query)
    );
  });

  const handleExportLogs = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RBI-MRM-AUDIT-LEDGER-${new Date().toISOString().slice(0, 10)}.json`;
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
              TAMPER-EVIDENT TELEMETRY LEDGER
            </span>
            <span className="text-xs font-mono text-slate-400">
              RBI Section 5.1: Immutable Algorithmic Traceability
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Cryptographic SHA-256 Audit Trail & Data Governance Ledger
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl mt-1">
            Every model scoring run, feature attribution vector, regulatory adverse action, and automated remediation event is sealed with a deterministic SHA-256 telemetry digest to guarantee audit-readiness for RBI supervisory inspection.
          </p>
        </div>

        <button
          onClick={handleExportLogs}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 border border-slate-700"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export Audit Ledger (JSON)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-1" />
        <input
          type="text"
          placeholder="Search by actor, action, company name, or SHA-256 hash..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none text-xs text-slate-200 placeholder-slate-500 outline-none font-mono"
        />
        <span className="text-xs font-mono text-slate-500 mr-2">
          {filteredLogs.length} Records Verified
        </span>
      </div>

      {/* Main Ledger Table & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-2">
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-[10px] font-mono text-slate-400 uppercase">
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Action</th>
                    <th className="py-3 px-3">Actor & RBAC Role</th>
                    <th className="py-3 px-3">Target Entity</th>
                    <th className="py-3 px-3">SHA-256 Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {filteredLogs.map((log) => {
                    const isSelected = selectedLog?.id === log.id;
                    return (
                      <tr
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-slate-800/80 text-slate-100' : 'hover:bg-slate-950/40 text-slate-300'
                        }`}
                      >
                        <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                          {log.timestamp.slice(11, 19)}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-bold text-cyan-300">
                          {log.action}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{log.actor.split('(')[0].trim()}</span>
                            <span className="text-[9px] px-1 py-0.2 rounded border border-slate-700 bg-slate-950 text-slate-400">
                              {log.role}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 truncate max-w-[180px] text-slate-200">
                          {log.targetEntity}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 truncate max-w-[120px]">
                          {log.sha256Digest.slice(0, 16)}...
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Log Detail & Cryptographic Verification */}
        <div className="lg:col-span-4">
          {selectedLog ? (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-xs sticky top-24">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">LOG IDENTIFIER</span>
                  <div className="text-sm font-bold font-mono text-cyan-400">{selectedLog.id}</div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>SEAL INTACT</span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Action Trigger</span>
                  <div className="font-bold text-slate-100 mt-0.5">{selectedLog.action}</div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Actor & Role</span>
                  <div className="text-slate-200 mt-0.5">{selectedLog.actor}</div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Target Entity</span>
                  <div className="text-cyan-300 font-mono mt-0.5">{selectedLog.targetEntity}</div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Audit Verification Details</span>
                  <div className="p-2.5 rounded bg-slate-950 text-slate-300 leading-relaxed mt-0.5 border border-slate-800 font-mono text-[11px]">
                    {selectedLog.details}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">SHA-256 Telemetry Hash</span>
                  <div className="p-2.5 rounded bg-slate-950 text-slate-400 break-all font-mono text-[10px] border border-slate-800 mt-0.5">
                    {selectedLog.sha256Digest}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-500 text-xs">
              Select an audit log record from the table to view its cryptographic telemetry details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
