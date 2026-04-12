import React from 'react';
import { Shield, Map, MessageSquare, Cpu, Activity, ShoppingCart, Settings, ShieldAlert, Wallet, Target, Crown, User, Lock, Terminal, MoreHorizontal, X, Globe, Zap } from 'lucide-react';
import { TabCategory, Client } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ControlDeckProps {
  activeTab: TabCategory;
  onTabChange: (tab: TabCategory) => void;
  isGhostMenuOpen: boolean;
  onToggleGhostMenu: () => void;
  activeClient: Client;
  clients: Client[];
  onClientChange: (client: Client) => void;
}

export const ControlDeck: React.FC<ControlDeckProps> = ({ 
  activeTab, 
  onTabChange, 
  isGhostMenuOpen, 
  onToggleGhostMenu,
  activeClient,
  clients,
  onClientChange
}) => {
  const primaryTabs: { id: TabCategory; icon: any; label: string; led: string }[] = [
    { id: 'THREAT SCAN', icon: Shield, label: 'THREAT SCAN', led: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse' },
    { id: 'INTEL MAP', icon: Map, label: 'INTEL MAP', led: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' },
    { id: 'AGENT COMMAND', icon: Cpu, label: 'AGENT COMMAND', led: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' },
    { id: 'DIAGNOSTICS', icon: Activity, label: 'DIAGNOSTICS', led: 'bg-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
  ];

  const ghostTabs: { id: TabCategory; icon: any; label: string; led: string }[] = [
    { id: 'WALLET', icon: Wallet, label: 'NEXUS WALLET', led: 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]' },
    { id: 'UTUBECHAT MARKET', icon: ShoppingCart, label: 'UTUBECHAT MARKET', led: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' },
    { id: 'PROFILE', icon: User, label: 'GALACTIC PROFILE', led: 'bg-nexus-cyan shadow-[0_0_8px_rgba(0,255,204,0.8)]' },
    { id: 'SETTINGS', icon: Settings, label: 'BRIDGE SETTINGS', led: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' },
    { id: 'VAULT', icon: Lock, label: 'THE VAULT', led: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' },
    { id: 'UPTIME MONITOR', icon: Activity, label: 'UPTIME MONITOR', led: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' },
    { id: 'SHELL CONFIG', icon: Terminal, label: 'SHELL CONFIG', led: 'bg-zinc-500 shadow-[0_0_8px_rgba(113,113,122,0.8)]' },
    { id: 'USER FEEDBACK', icon: MessageSquare, label: 'USER FEEDBACK', led: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' },
    { id: 'MARKET', icon: Target, label: 'MARKET DISPATCH', led: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse' },
    { id: 'PRICING', icon: Crown, label: 'COMMAND PLANS', led: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' },
    { id: 'SECURITY PULSE', icon: ShieldAlert, label: 'SECURITY PULSE', led: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' },
  ];

  return (
    <>
      <AnimatePresence>
        {isGhostMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-zinc-900/95 border-l border-zinc-800 backdrop-blur-xl z-[60] p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">System Menu</span>
                <h2 className="text-xl font-black text-zinc-100 uppercase tracking-tighter">Ghost Menu</h2>
              </div>
              <button 
                onClick={onToggleGhostMenu}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Uplink (Client Switcher) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-bold">Target Uplink</span>
              </div>
              <div className="space-y-2">
                {clients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => onClientChange(client)}
                    className={`w-full group relative overflow-hidden p-3 rounded-xl border transition-all duration-300 ${
                      activeClient.id === client.id 
                        ? 'bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.1)]' 
                        : 'bg-black/20 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex flex-col items-start">
                        <span className={`text-[10px] font-bold uppercase tracking-tight ${
                          activeClient.id === client.id ? 'text-primary' : 'text-zinc-300'
                        }`}>
                          {client.name}
                        </span>
                        <span className="text-[8px] text-zinc-500 font-mono">{client.domain}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          client.status === 'Active' ? 'bg-emerald-500' : 
                          client.status === 'Under Attack' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                        }`} />
                        <span className="text-[8px] text-zinc-400 font-mono">{client.uptime}%</span>
                      </div>
                    </div>
                    {activeClient.id === client.id && (
                      <motion.div 
                        layoutId="activeClientGlow"
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-bold">Sub-Systems</span>
              </div>
              <div className="space-y-2">
                {ghostTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                      activeTab === tab.id ? 'bg-zinc-800 text-zinc-100' : 'hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${activeTab === tab.id ? tab.led : 'bg-zinc-700'}`} />
                    <tab.icon className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="p-4 bg-black/40 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Neural Link Active</span>
                </div>
                <p className="text-[9px] text-zinc-600 font-mono leading-relaxed">
                  GHOST_PROTOCOL_V2.4.0<br/>
                  ENCRYPTION: AES-256-GCM<br/>
                  STATUS: STEALTH_MODE
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center px-8 z-50">
        <div className="flex gap-4 items-center h-full">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex flex-col items-center justify-center w-24 h-14 transition-all duration-200 border-x border-zinc-800/50 ${
                activeTab === tab.id ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/30'
              }`}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 ${activeTab === tab.id ? tab.led : 'bg-zinc-700'}`} />
              <tab.icon className={`w-5 h-5 mb-1 transition-colors ${activeTab === tab.id ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
              <span className={`text-[9px] font-bold tracking-tighter transition-colors ${activeTab === tab.id ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                {tab.label}
              </span>
              
              {/* Industrial details */}
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-zinc-800 rounded-full" />
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-zinc-800 rounded-full" />
            </button>
          ))}

          <button
            onClick={onToggleGhostMenu}
            className={`group relative flex flex-col items-center justify-center w-24 h-14 transition-all duration-200 border-x border-zinc-800/50 ${
              isGhostMenuOpen ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/30'
            }`}
          >
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 ${isGhostMenuOpen ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]' : 'bg-zinc-700'}`} />
            <MoreHorizontal className={`w-5 h-5 mb-1 transition-colors ${isGhostMenuOpen ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
            <span className={`text-[9px] font-bold tracking-tighter transition-colors ${isGhostMenuOpen ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
              GHOST MENU
            </span>
          </button>
        </div>
        
        <div className="absolute right-8 flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-zinc-600 font-mono">SYSTEM UPLINK</span>
            <span className="text-[10px] text-emerald-500 font-mono font-bold">STABLE</span>
          </div>
          <div className="w-10 h-10 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
};
