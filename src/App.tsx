import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  RefreshCw, 
  Layers, 
  FileCheck2,
  Lock,
  Coins
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ComplianceAsCodeView } from './components/ComplianceAsCodeView';
import { SystemWorkflowsView } from './components/SystemWorkflowsView';
import { CorporateLendingView } from './components/CorporateLendingView';
import { CrossBorderLiquidityView } from './components/CrossBorderLiquidityView';
import { RbiReportingView } from './components/RbiReportingView';
import { AuditLedgerView } from './components/AuditLedgerView';
import { DocumentationView } from './components/DocumentationView';
import { UserGuideView } from './components/UserGuideView';

import { 
  UserPersona, 
  ModelInventoryItem, 
  CorporateCreditApplication, 
  LiquidityTelemetryEvent, 
  ComplianceRule, 
  RemediationWorkflowItem, 
  AuditLogEntry 
} from './types';
import { 
  USER_PERSONAS, 
  INITIAL_MODELS, 
  INITIAL_CREDIT_APPLICATIONS, 
  INITIAL_LIQUIDITY_TELEMETRY, 
  COMPLIANCE_RULES, 
  INITIAL_REMEDIATION_QUEUE, 
  INITIAL_AUDIT_LOGS 
} from './data/mockBankData';

export default function App() {
  const [activePersona, setActivePersona] = useState<UserPersona>(USER_PERSONAS.CRO);
  const [activeTab, setActiveTab] = useState<'blueprints' | 'workflows' | 'lending' | 'liquidity' | 'reporting' | 'audit' | 'docs' | 'guide'>('blueprints');

  const [models, setModels] = useState<ModelInventoryItem[]>(INITIAL_MODELS);
  const [applications, setApplications] = useState<CorporateCreditApplication[]>(INITIAL_CREDIT_APPLICATIONS);
  const [liquidityTelemetry, setLiquidityTelemetry] = useState<LiquidityTelemetryEvent[]>(INITIAL_LIQUIDITY_TELEMETRY);
  const [rules, setRules] = useState<ComplianceRule[]>(COMPLIANCE_RULES);
  const [remediationQueue, setRemediationQueue] = useState<RemediationWorkflowItem[]>(INITIAL_REMEDIATION_QUEUE);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [loading, setLoading] = useState(false);

  // Initial fetch from backend API
  const fetchData = async () => {
    try {
      setLoading(true);
      const [modelsRes, appsRes, liqRes, rulesRes, remRes, auditRes] = await Promise.all([
        fetch('/api/models').then(r => r.ok ? r.json() : null),
        fetch('/api/credit-applications').then(r => r.ok ? r.json() : null),
        fetch('/api/liquidity-telemetry').then(r => r.ok ? r.json() : null),
        fetch('/api/compliance-rules').then(r => r.ok ? r.json() : null),
        fetch('/api/remediation-queue').then(r => r.ok ? r.json() : null),
        fetch('/api/audit-logs').then(r => r.ok ? r.json() : null)
      ]);

      if (modelsRes?.models) setModels(modelsRes.models);
      if (appsRes?.applications) setApplications(appsRes.applications);
      if (liqRes?.telemetry) setLiquidityTelemetry(liqRes.telemetry);
      if (rulesRes?.rules) setRules(rulesRes.rules);
      if (remRes?.queue) setRemediationQueue(remRes.queue);
      if (auditRes?.logs) setAuditLogs(auditRes.logs);
    } catch (e) {
      console.warn('API fetch fallback to initial state:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Evaluate new credit application
  const handleEvaluateNewApplication = async (payload: any) => {
    try {
      const res = await fetch('/api/credit-applications/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.application) {
        setApplications(prev => [data.application, ...prev]);
        if (data.auditLog) {
          setAuditLogs(prev => [data.auditLog, ...prev]);
        }
      }
    } catch (e) {
      console.error('Failed to evaluate application:', e);
    }
  };

  // CRO Four-eyes approval
  const handleApproveApplication = (applicationId: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          evaluation: {
            ...app.evaluation,
            fourEyesApprovedBy: `${activePersona.name} (${activePersona.role})`
          }
        };
      }
      return app;
    }));

    // Record audit entry
    const newAudit: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      actor: activePersona.name,
      role: activePersona.role,
      action: 'FOUR_EYES_SANCTION_ATTESTED',
      targetEntity: applicationId,
      details: `Credit facility sanctioned with four-eyes supervisory sign-off by ${activePersona.name}.`,
      sha256Digest: '5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
      verified: true
    };
    setAuditLogs(prev => [newAudit, ...prev]);
  };

  // Execute Remediation
  const handleExecuteRemediation = async (remediationId: string, actionType: string, targetAccount: string) => {
    try {
      const res = await fetch('/api/liquidity/trigger-remediation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          remediationId,
          actionType,
          targetAccount,
          actor: `${activePersona.name} (${activePersona.role})`,
          role: activePersona.role
        })
      });
      const data = await res.json();
      if (data.success) {
        if (data.remediationQueue) setRemediationQueue(data.remediationQueue);
        if (data.liquidityTelemetry) setLiquidityTelemetry(data.liquidityTelemetry);
        if (data.auditEntry) setAuditLogs(prev => [data.auditEntry, ...prev]);
      }
    } catch (e) {
      console.error('Remediation execution failed:', e);
    }
  };

  // Trigger simulated drift spike on Nostro account
  const handleTriggerDriftSimulation = (accountId: string) => {
    setLiquidityTelemetry(prev => prev.map(acc => {
      if (acc.id === accountId) {
        const spikedPsi = Math.min(0.32, acc.psiDrift + 0.12);
        const depressedLcr = Math.max(92.0, acc.rbiLcrBufferRatioPct - 18.0);
        return {
          ...acc,
          psiDrift: spikedPsi,
          rbiLcrBufferRatioPct: depressedLcr,
          driftStatus: spikedPsi >= 0.25 ? 'CRITICAL_DRIFT' : 'ELEVATED_WATCH'
        };
      }
      return acc;
    }));

    // Add new remediation workflow item
    const spikedItem: RemediationWorkflowItem = {
      id: `REM-${Date.now().toString().slice(-6)}`,
      triggeredAt: new Date().toISOString(),
      modelId: 'MOD-LIQ-NOSTRO-02',
      modelName: 'Nostro Liquidity Forecaster',
      nostroAccount: accountId,
      reason: 'Cross-border FX market volatility surge triggered high PSI drift breach & LCR buffer depression.',
      triggerMetric: 'PSI Drift',
      triggerValue: 0.295,
      threshold: 0.25,
      status: 'AWAITING_CRO_SIGN_OFF',
      remediationType: 'CHAMPION_TO_CHALLENGER_FAILOVER',
      resolutionSummary: 'Automated failover primed: Promote calibrated challenger model with volatility damping.',
      auditHash: '8f9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f'
    };

    setRemediationQueue(prev => [spikedItem, ...prev]);

    // Record audit entry
    const newAudit: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      actor: 'Telemetry Drift Daemon',
      role: 'IMV_LEAD',
      action: 'VOLATILITY_DRIFT_ALERT',
      targetEntity: accountId,
      details: 'Drift barrier breached: PSI exceeded 0.25 threshold. Remediation failover workflow queued.',
      sha256Digest: spikedItem.auditHash,
      verified: true
    };
    setAuditLogs(prev => [newAudit, ...prev]);
  };

  const activeRemediationsCount = remediationQueue.filter(r => r.status === 'AWAITING_CRO_SIGN_OFF').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Institutional Top Navbar with RBAC Persona Switcher */}
      <Navbar
        activePersona={activePersona}
        onSelectPersona={setActivePersona}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        remediationCount={activeRemediationsCount}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 px-4 lg:px-8 py-6 max-w-7xl w-full mx-auto space-y-6">
        {activeTab === 'blueprints' && (
          <ComplianceAsCodeView
            models={models}
            rules={rules}
            activePersona={activePersona}
            onRefresh={fetchData}
          />
        )}

        {activeTab === 'workflows' && (
          <SystemWorkflowsView
            activePersona={activePersona}
          />
        )}

        {activeTab === 'lending' && (
          <CorporateLendingView
            applications={applications}
            activePersona={activePersona}
            onEvaluateNewApplication={handleEvaluateNewApplication}
            onApproveApplication={handleApproveApplication}
          />
        )}

        {activeTab === 'liquidity' && (
          <CrossBorderLiquidityView
            telemetry={liquidityTelemetry}
            remediationQueue={remediationQueue}
            activePersona={activePersona}
            onExecuteRemediation={handleExecuteRemediation}
            onTriggerDriftSimulation={handleTriggerDriftSimulation}
          />
        )}

        {activeTab === 'reporting' && (
          <RbiReportingView
            models={models}
            applications={applications}
            remediationQueue={remediationQueue}
            activePersona={activePersona}
          />
        )}

        {activeTab === 'audit' && (
          <AuditLedgerView
            logs={auditLogs}
            activePersona={activePersona}
          />
        )}

        {activeTab === 'docs' && (
          <DocumentationView
            activePersona={activePersona}
          />
        )}

        {activeTab === 'guide' && (
          <UserGuideView
            activePersona={activePersona}
            onSelectTab={setActiveTab}
            onSelectPersona={setActivePersona}
          />
        )}
      </main>

      {/* Institutional Regulatory Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 lg:px-8 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-400">
              INDUS COMMERCIAL & INSTITUTIONAL BANKING GROUP
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Model Risk Management (MRM) Architecture</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RBI MRM Circular Enforced</span>
            </span>
            <span>•</span>
            <span>Basel III Pillar 2 Compliant</span>
            <span>•</span>
            <span className="text-cyan-400">SHA-256 Telemetry Validated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
