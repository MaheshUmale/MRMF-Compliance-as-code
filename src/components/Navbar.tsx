import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Activity, 
  Coins, 
  Lock, 
  Database,
  CheckCircle2,
  ChevronDown,
  Building2,
  AlertCircle,
  Workflow,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { UserPersona, UserRole } from '../types';
import { USER_PERSONAS } from '../data/mockBankData';

interface NavbarProps {
  activePersona: UserPersona;
  onSelectPersona: (persona: UserPersona) => void;
  activeTab: 'blueprints' | 'workflows' | 'lending' | 'liquidity' | 'reporting' | 'audit' | 'docs' | 'guide';
  onSelectTab: (tab: 'blueprints' | 'workflows' | 'lending' | 'liquidity' | 'reporting' | 'audit' | 'docs' | 'guide') => void;
  remediationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePersona,
  onSelectPersona,
  activeTab,
  onSelectTab,
  remediationCount
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 sticky top-0 z-40 backdrop-blur-md">
      {/* Top Regulatory Identity Bar */}
      <div className="border-b border-slate-900 px-4 lg:px-8 py-1.5 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide">INDUS COMMERCIAL & INSTITUTIONAL BANKING GROUP</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-400">
            <span className="font-mono text-[11px] text-cyan-300">LEI: 335800G94U8372KV8912</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-500">RBI Regulated Entity (RE) - Schedule II Commercial Bank</span>
        </div>

        <div className="flex items-center gap-4 mt-1 sm:mt-0 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>RBI MRM Framework 2025: Compliant</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>SHA-256 Telemetry Sealed</span>
          </div>
        </div>
      </div>

      {/* Primary Navigation & Persona Selector */}
      <div className="px-4 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-900/60 to-slate-900 border border-cyan-500/30 flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-100 tracking-tight">
                RBI MRM Compliance-as-Code
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/50 text-cyan-300">
                Institutional CIB
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Model Risk Governance, SHAP Explainability & Cross-Border Drift Telemetry
            </p>
          </div>
        </div>

        {/* Role-Based Access Control (RBAC) Selector */}
        <div className="relative">
          <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between font-mono">
            <span>ACTIVE CIB ROLE-BASED ACCESS CONTROL (RBAC)</span>
            <span className="text-cyan-400 font-semibold">Strict Segregation Enforced</span>
          </div>
          
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full md:w-80 flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 hover:border-slate-600 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-4 h-4 text-slate-300" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-200 truncate">{activePersona.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${activePersona.badgeColor}`}>
                    {activePersona.role}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">{activePersona.title}</div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-88 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-2 z-50">
              <div className="px-2 py-1 text-[11px] font-mono text-slate-400 border-b border-slate-800 mb-1">
                SWITCH INSTITUTIONAL PERSONA (RBAC)
              </div>
              {Object.values(USER_PERSONAS).map((persona) => (
                <button
                  key={persona.role}
                  onClick={() => {
                    onSelectPersona(persona);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-md transition-colors flex items-start gap-2.5 ${
                    activePersona.role === persona.role
                      ? 'bg-slate-800/80 border border-cyan-500/40 text-slate-100'
                      : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5">
                    {activePersona.role === persona.role ? (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200">{persona.name}</span>
                      <span className={`text-[9px] px-1 rounded border font-mono ${persona.badgeColor}`}>
                        {persona.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{persona.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{persona.department}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 lg:px-8 flex items-center gap-1 overflow-x-auto border-t border-slate-900 text-xs">
        <button
          onClick={() => onSelectTab('blueprints')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'blueprints'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Compliance-as-Code Blueprints</span>
        </button>

        <button
          onClick={() => onSelectTab('workflows')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'workflows'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>System Workflows & Governance</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            5 Flows
          </span>
        </button>

        <button
          onClick={() => onSelectTab('guide')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'guide'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>User Guide & Tour</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            Guide
          </span>
        </button>

        <button
          onClick={() => onSelectTab('lending')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'lending'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Automated Lending & SHAP Explainability</span>
        </button>

        <button
          onClick={() => onSelectTab('liquidity')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'liquidity'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>Cross-Border Liquidity Drift & Remediation</span>
          {remediationCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
              {remediationCount} Active
            </span>
          )}
        </button>

        <button
          onClick={() => onSelectTab('reporting')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'reporting'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>RBI Regulatory Returns & AI Auditor</span>
        </button>

        <button
          onClick={() => onSelectTab('audit')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'audit'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Cryptographic Telemetry Ledger</span>
        </button>

        <button
          onClick={() => onSelectTab('docs')}
          className={`px-4 py-2.5 font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'docs'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Architecture & Specs</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            Docs
          </span>
        </button>
      </div>

      {/* Segregation of Duties Permissions Banner */}
      <div className="bg-slate-900/60 border-t border-slate-800/80 px-4 lg:px-8 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-500">AUTHORITY BOUNDS:</span>
          <span className="text-slate-300 font-medium">{activePersona.department}</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className={activePersona.permissions.canApproveTier1Models ? "text-emerald-400" : "text-slate-600 line-through"}>
            Tier-1 Approval
          </span>
          <span className="text-slate-700">•</span>
          <span className={activePersona.permissions.canTriggerEmergencyCircuitBreakers ? "text-emerald-400" : "text-slate-600 line-through"}>
            Emergency Circuit-Breaker
          </span>
          <span className="text-slate-700">•</span>
          <span className={activePersona.permissions.canSanctionCreditFacilities ? "text-emerald-400" : "text-slate-600 line-through"}>
            Credit Sanctions
          </span>
          <span className="text-slate-700">•</span>
          <span className={activePersona.permissions.canExportRBIReturns ? "text-emerald-400" : "text-slate-600 line-through"}>
            RBI Return Filing
          </span>
        </div>
      </div>
    </header>
  );
};
