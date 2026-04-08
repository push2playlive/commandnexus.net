import React from 'react';
import { Shield, Map, MessageSquare, Cpu, Activity, ShoppingCart, Settings, ShieldAlert } from 'lucide-react';
import { TabCategory } from '../types';
import { motion } from 'motion/react';

interface ControlDeckProps {
  activeTab: TabCategory;
  onTabChange: (tab: TabCategory) => void;
}

export const ControlDeck: React.FC<ControlDeckProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabCategory; icon: any; label: string; led: string }[] = [
    { id: 'THREAT SCAN', icon: Shield, label: 'THREAT SCAN', led: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse' },
    { id: 'INTEL MAP', icon: Map, label: 'INTEL MAP', led: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' },
    { id: 'USER FEEDBACK', icon: MessageSquare, label: 'USER FEEDBACK', led: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' },
    { id: 'AGENT COMMAND', icon: Cpu, label: 'AGENT COMMAND', led: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' },
    { id: 'DIAGNOSTICS', icon: Activity, label: 'DIAGNOSTICS', led: 'bg-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
    { id: 'UTUBECHAT MARKET', icon: ShoppingCart, label: 'UTUBECHAT MARKET', led: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' },
    { id: 'SHELL CONFIG', icon: Settings, label: 'SHELL CONFIG', led: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' },
    { id: 'SECURITY PULSE', icon: ShieldAlert, label: 'SECURITY PULSE', led: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center px-8 z-50">
      <div className="flex gap-4 items-center h-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`group relative flex flex-col items-center justify-center w-32 h-16 transition-all duration-200 border-x border-zinc-800/50 ${
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
  );
};
