import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabCategory, Threat, Agent, Trend, SecurityEvent, BlacklistedIP } from '../types';
import { Shield, Map, MessageSquare, Cpu, Activity, ShoppingCart, AlertTriangle, Zap, User, Terminal, Globe, BarChart3 } from 'lucide-react';
import { DiagnosticsPanel } from './DiagnosticsPanel';

import { ShellConfigInput } from './ShellConfigInput';
import { SecurityPulse } from './SecurityPulse';
import { NetworkRadar } from './NetworkRadar';

interface TacticalHubProps {
  activeTab: TabCategory;
  threats: Threat[];
  agents: Agent[];
  trends: Trend[];
  securityEvents: SecurityEvent[];
  blacklist: BlacklistedIP[];
  onDispatch: (agentId: string) => void;
}

export const TacticalHub: React.FC<TacticalHubProps> = ({ 
  activeTab, 
  threats, 
  agents, 
  trends, 
  securityEvents,
  blacklist,
  onDispatch 
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'DIAGNOSTICS':
        return <DiagnosticsPanel />;
      case 'THREAT SCAN':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {threats.map((threat) => (
              <div key={threat.id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex items-start gap-4 group hover:border-red-500/30 transition-colors">
                <div className={`p-2 rounded ${threat.status === 'blocked' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-zinc-100 font-bold text-sm">{threat.type}</h3>
                    <span className="text-[10px] text-zinc-500 font-mono">{threat.timestamp}</span>
                  </div>
                  <p className="text-zinc-400 text-xs font-mono mb-2">SOURCE: {threat.source}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      threat.status === 'blocked' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {threat.status}
                    </span>
                    <button className="text-[9px] text-zinc-500 hover:text-zinc-300 underline uppercase">Deep Trace</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'AGENT COMMAND':
        return (
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    agent.status === 'Working' ? 'bg-emerald-500/10 text-emerald-500' : 
                    agent.status === 'Dispatched' ? 'bg-blue-500/10 text-blue-500' : 'bg-zinc-700 text-zinc-500'
                  }`}>
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-zinc-100 font-bold text-sm">{agent.name}</h3>
                    <p className="text-zinc-500 text-xs font-mono">SHIFT: {agent.shift} | TASK: {agent.task}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase ${
                      agent.status === 'Working' ? 'text-emerald-400' : 
                      agent.status === 'Dispatched' ? 'text-blue-400' : 'text-zinc-500'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => onDispatch(agent.id)}
                    disabled={agent.status === 'Dispatched'}
                    className="px-4 py-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-100 text-[10px] font-bold rounded border border-zinc-700 uppercase transition-colors"
                  >
                    Dispatch
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'INTEL MAP':
        return (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-6">
            <div className="relative">
              <Globe className="w-24 h-24 opacity-20 text-blue-500" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-mono tracking-[0.3em] uppercase mb-2">Global Thinker Distribution</p>
              <p className="text-[10px] text-zinc-600 font-mono">RENDERING REAL-TIME GEOSPATIAL DATA...</p>
            </div>
            <div className="w-80 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
              <motion.div 
                animate={{ x: [-320, 320] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="w-40 h-full bg-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              />
            </div>
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center">
                <span className="text-blue-400 font-bold text-lg">1,242</span>
                <span className="text-[8px] text-zinc-600 uppercase">Active Nodes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-emerald-400 font-bold text-lg">98.2%</span>
                <span className="text-[8px] text-zinc-600 uppercase">Uptime</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-amber-400 font-bold text-lg">14ms</span>
                <span className="text-[8px] text-zinc-600 uppercase">Avg Latency</span>
              </div>
            </div>
          </div>
        );
      case 'UTUBECHAT MARKET':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-purple-500/5 border border-purple-500/20 p-4 rounded-lg">
              <div>
                <h3 className="text-purple-400 font-bold text-lg">UtubeChat Marketplace</h3>
                <p className="text-zinc-500 text-xs">Acquire Premium Trend Packs to optimize your Nexus algorithms.</p>
              </div>
              <Zap className="w-8 h-8 text-purple-500 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Thinker Pack Alpha', price: '2.5 ETH', desc: 'Advanced dwell-time algorithms for deep-dive users.', tags: ['DWELL', 'INTEL'] },
                { name: 'Creator Surge', price: '1.8 ETH', desc: 'Identify high-velocity content makers in real-time.', tags: ['VELOCITY', 'SOCIAL'] },
                { name: 'Security Hardlink', price: '5.0 ETH', desc: 'Military grade bot mitigation and scrape protection.', tags: ['SHIELD', 'PRO'] },
                { name: 'Sentiment Nexus', price: '3.2 ETH', desc: 'Real-time emotional mapping of user feedback loops.', tags: ['MOOD', 'AI'] },
                { name: 'Geo-Thinker Map', price: '1.5 ETH', desc: 'Localized intelligence for specific regional trends.', tags: ['GEO', 'MAP'] },
                { name: 'Agent Overclock', price: '4.0 ETH', desc: 'Boost agent dispatch speed and task efficiency by 40%.', tags: ['AGENT', 'BOOST'] },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex flex-col group hover:border-purple-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-500/10 rounded">
                      <ShoppingCart className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-zinc-100 font-mono font-bold text-xs">{item.price}</span>
                  </div>
                  <h3 className="text-zinc-100 font-bold text-sm mb-1">{item.name}</h3>
                  <p className="text-zinc-500 text-[10px] mb-4 flex-1">{item.desc}</p>
                  <div className="flex gap-1 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[8px] px-1 bg-zinc-800 text-zinc-400 rounded border border-zinc-700">{tag}</span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 text-[10px] font-bold rounded border border-purple-500/30 uppercase transition-all group-hover:scale-[1.02]">
                    Acquire Lease
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'SHELL CONFIG':
        return <ShellConfigInput />;
      case 'SECURITY PULSE':
        return (
          <div className="space-y-6 h-full flex flex-col">
            <div className="h-64 shrink-0">
              <NetworkRadar />
            </div>
            <div className="flex-1 min-h-0">
              <SecurityPulse events={securityEvents} blacklist={blacklist} />
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
            <Terminal className="w-12 h-12 opacity-20" />
            <p className="text-sm font-mono uppercase tracking-[0.4em]">Initialize Tactical Module</p>
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-zinc-800 rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-zinc-800 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1 h-1 bg-zinc-800 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 mt-24 mb-24 mx-72 bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Tactical Frame Details */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-20" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-zinc-700 to-transparent opacity-10" />
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-zinc-700 to-transparent opacity-10" />
      
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/40">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-blue-500/50 rounded-full" />
            <div className="w-1 h-4 bg-blue-500/30 rounded-full" />
            <div className="w-1 h-4 bg-blue-500/10 rounded-full" />
          </div>
          <div>
            <h2 className="text-zinc-100 font-mono font-bold tracking-[0.2em] uppercase text-sm">{activeTab}</h2>
            <p className="text-[8px] text-zinc-600 font-mono uppercase tracking-widest">Tactical Hub // Command Interface</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-zinc-600 font-mono uppercase">Uplink Status</span>
              <span className="text-[10px] text-emerald-500 font-mono font-bold uppercase">Encrypted</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-zinc-600 font-mono uppercase">Signal Strength</span>
              <div className="flex gap-0.5 mt-1">
                <div className="w-1 h-2 bg-emerald-500" />
                <div className="w-1 h-2 bg-emerald-500" />
                <div className="w-1 h-2 bg-emerald-500" />
                <div className="w-1 h-2 bg-emerald-500/30" />
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="flex gap-2">
            <div className="px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded text-[9px] text-zinc-400 font-mono">CH_01</div>
            <div className="px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded text-[9px] text-zinc-400 font-mono">14ms</div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-8 overflow-auto custom-scrollbar bg-black/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Corner accents - Industrial Style */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-zinc-700/50 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-zinc-700/50 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-zinc-700/50 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-zinc-700/50 rounded-br-lg pointer-events-none" />
      
      {/* Scanning Line Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <motion.div 
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full h-px bg-white shadow-[0_0_10px_white]"
        />
      </div>
    </div>
  );
};
