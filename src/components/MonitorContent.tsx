import React from 'react';
import { Threat, UserIntent, Agent, Trend, GlobalTrend, SalesMetric } from '../types';
import { AlertTriangle, MousePointer2, Cpu, User, Zap, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';

export const ThreatMatrixContent: React.FC<{ threats: Threat[] }> = ({ threats }) => (
  <div className="space-y-2">
    {threats.map(t => (
      <div key={t.id} className="flex items-center gap-2 text-red-400/80 border-l border-red-900/50 pl-2">
        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">[{t.timestamp}] {t.type} BLOCKED</span>
      </div>
    ))}
    <div className="animate-pulse text-zinc-600">_WAITING FOR NEXT PACKET...</div>
  </div>
);

export const UserIntentContent: React.FC<{ intents: UserIntent[] }> = ({ intents }) => (
  <div className="space-y-2">
    {intents.map(i => (
      <div key={i.id} className="flex items-center gap-2 text-blue-400/80 border-l border-blue-900/50 pl-2">
        <MousePointer2 className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">USER_{i.id.padStart(3, '0')} HOVER: {i.keyword}</span>
      </div>
    ))}
    <div className="flex items-center gap-2 text-zinc-500">
      <Zap className="w-3 h-3 animate-bounce" />
      <span>LIVE STREAM ACTIVE</span>
    </div>
  </div>
);

export const AgentPulseContent: React.FC<{ agents: Agent[] }> = ({ agents }) => (
  <div className="space-y-3">
    {agents.map(a => (
      <div key={a.id} className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className={`w-3 h-3 ${a.status === 'Working' ? 'text-emerald-500' : 'text-zinc-500'}`} />
            <span className="text-zinc-300">{a.name}</span>
          </div>
          <span className={`text-[8px] px-1 rounded ${
            a.status === 'Working' ? 'bg-emerald-500/20 text-emerald-400' : 
            a.status === 'Dispatched' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'
          }`}>{a.status}</span>
        </div>
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className={`h-full ${a.status === 'Working' ? 'bg-emerald-500/40 w-2/3' : a.status === 'Dispatched' ? 'bg-blue-500/40 w-full' : 'w-0'}`} />
        </div>
      </div>
    ))}
  </div>
);

export const TrendAlgorithmContent: React.FC<{ trends: Trend[] }> = ({ trends }) => (
  <div className="space-y-3">
    {trends.filter(t => t.engagement > 80).map(t => (
      <div key={t.id} className="bg-zinc-800/50 p-2 rounded border border-zinc-700/50">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3 text-amber-500" />
            <span className="text-zinc-200">{t.user}</span>
          </div>
          <span className="text-amber-500 font-bold">{t.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-zinc-500">ENGAGEMENT:</span>
          <div className="flex-1 h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500/60" style={{ width: `${t.engagement}%` }} />
          </div>
          <span className="text-[8px] text-zinc-400">{t.engagement}%</span>
        </div>
      </div>
    ))}
  </div>
);

export const GlobalTrendsContent: React.FC<{ trends: GlobalTrend[] }> = ({ trends }) => (
  <div className="space-y-3">
    {trends.map(t => (
      <div key={t.id} className="flex items-center justify-between bg-zinc-900/40 p-2 rounded border border-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-500/10 rounded">
            <Globe className="w-3 h-3 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-200 text-[10px] font-bold">{t.topic}</span>
            <span className="text-[8px] text-zinc-600 uppercase">{t.region} REGION</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-blue-400 text-[10px] font-mono font-bold">{t.velocity}%</span>
          <div className="w-12 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500/50" style={{ width: `${t.velocity}%` }} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SalesAnalyticsContent: React.FC<{ metrics: SalesMetric[] }> = ({ metrics }) => (
  <div className="grid grid-cols-1 gap-2">
    {metrics.map(m => (
      <div key={m.id} className="bg-zinc-900/40 p-2 rounded border border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded ${m.trend === 'up' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
            <DollarSign className={`w-3 h-3 ${m.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`} />
          </div>
          <span className="text-zinc-400 text-[10px]">{m.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-100 text-[10px] font-bold font-mono">{m.value}</span>
          <div className={`flex items-center text-[8px] font-bold ${m.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {m.trend === 'up' ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
            {m.percentage}%
          </div>
        </div>
      </div>
    ))}
  </div>
);
