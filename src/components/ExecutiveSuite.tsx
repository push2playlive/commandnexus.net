import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, AlertCircle, Shield, Cpu, Zap, Eye, Settings2 } from 'lucide-react';

interface WorkstreamEntry {
  id: string;
  timestamp: string;
  agentId: string;
  task: string;
  client: string;
  status: 'pending' | 'approved' | 'audited';
  meta: {
    tokens: number;
    latency: string;
    logic: string;
  };
}

export const ExecutiveSuite: React.FC = () => {
  const [entries, setEntries] = useState<WorkstreamEntry[]>([
    {
      id: '1',
      timestamp: '20:44:12',
      agentId: 'AGENT_EXEC_01',
      task: 'ORGANIZED_VAULT_DEPOSITS',
      client: 'CLIENT_ALPHA',
      status: 'pending',
      meta: { tokens: 1240, latency: '1.2s', logic: 'Recursive sorting of transaction hashes' }
    },
    {
      id: '2',
      timestamp: '20:45:05',
      agentId: 'AGENT_INTEL_03',
      task: 'THREAT_PATTERN_RECOGNITION',
      client: 'CLIENT_BETA',
      status: 'approved',
      meta: { tokens: 3500, latency: '2.4s', logic: 'Cross-referencing global blacklist DB' }
    },
    {
      id: '3',
      timestamp: '20:46:18',
      agentId: 'AGENT_SENSEI_01',
      task: 'CURRICULUM_ADAPTATION',
      client: 'NEXUS_ACADEMY',
      status: 'pending',
      meta: { tokens: 850, latency: '0.8s', logic: 'Sentiment analysis on student feedback' }
    }
  ]);

  const handleAction = (id: string, status: 'approved' | 'audited') => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest font-bold">Executive Workstream</span>
          <h2 className="text-2xl font-black text-zinc-100 uppercase tracking-tighter">Assistant Operations</h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <div className="flex flex-col">
              <span className="text-[8px] text-zinc-500 font-mono uppercase">Total Tokens</span>
              <span className="text-xs font-bold text-emerald-500">5.8M / 10M</span>
            </div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
            <Zap className="w-4 h-4 text-emerald-500" />
            <div className="flex flex-col">
              <span className="text-[8px] text-zinc-500 font-mono uppercase">System Load</span>
              <span className="text-xs font-bold text-emerald-500">12.4%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shadow-shield">
        <div className="grid grid-cols-12 bg-black/40 p-3 border-b border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <div className="col-span-2">Timestamp</div>
          <div className="col-span-2">Agent ID</div>
          <div className="col-span-4">Task Completed</div>
          <div className="col-span-2">Client</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        <div className="divide-y divide-zinc-800/50">
          {entries.map((entry) => (
            <div key={entry.id} className="group">
              <div className="grid grid-cols-12 p-4 items-center hover:bg-emerald-500/5 transition-colors">
                <div className="col-span-2 text-[11px] font-mono text-zinc-400">[{entry.timestamp}]</div>
                <div className="col-span-2 text-[11px] font-bold text-emerald-500 tracking-tight">{entry.agentId}</div>
                <div className="col-span-4 text-[11px] font-black text-zinc-100 uppercase tracking-tighter">{entry.task}</div>
                <div className="col-span-2 text-[10px] font-mono text-zinc-500">{entry.client}</div>
                <div className="col-span-2 flex justify-end gap-2">
                  {entry.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => handleAction(entry.id, 'approved')}
                        className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 text-[9px] font-bold uppercase rounded transition-all"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(entry.id, 'audited')}
                        className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 text-[9px] font-bold uppercase rounded transition-all"
                      >
                        Audit
                      </button>
                    </>
                  ) : (
                    <div className={`flex items-center gap-1.5 text-[9px] font-bold uppercase ${
                      entry.status === 'approved' ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {entry.status === 'approved' ? <CheckCircle2 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {entry.status}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Meta View (Deep Logic) */}
              <div className="px-4 pb-4 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="bg-black/40 border border-zinc-800/50 rounded-lg p-3 grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-zinc-600 font-mono uppercase">Token Usage</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{entry.meta.tokens} tokens</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-zinc-600 font-mono uppercase">Latency</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{entry.meta.latency}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-zinc-600 font-mono uppercase">Underlying Logic</span>
                    <span className="text-[10px] text-emerald-500/70 font-mono italic">{entry.meta.logic}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl shadow-shield">
          <div className="flex items-center gap-3 mb-4">
            <Settings2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-zinc-100 font-bold text-xs tracking-widest uppercase">Organic Fine-Tuning</h3>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono leading-relaxed mb-4">
            Adjust the personality parameters and instruction weights for the active assistant. These changes are applied in real-time to the neural core.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-mono text-zinc-400 uppercase">
                <span>Personality Warmth</span>
                <span>85%</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-mono text-zinc-400 uppercase">
                <span>Technical Precision</span>
                <span>92%</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[92%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl shadow-shield">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h3 className="text-zinc-100 font-bold text-xs tracking-widest uppercase">Instructor Training</h3>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono leading-relaxed mb-4">
            Feed new tactical data into the Nexus Academy instructor. This enhances the "Sensei" branding and educational output.
          </p>
          <button className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 text-[10px] font-bold uppercase rounded-xl transition-all">
            Initialize Training Session
          </button>
        </div>
      </div>
    </div>
  );
};
