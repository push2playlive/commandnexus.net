import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Trash2, Zap, RefreshCw, Lock, UserX, Fingerprint } from 'lucide-react';

export const PowerTools: React.FC = () => {
  const tools = [
    { icon: ShieldAlert, label: 'LOCKDOWN', color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20' },
    { icon: UserX, label: 'KILL SESSION', color: 'text-red-400', bgColor: 'bg-red-500/5', borderColor: 'border-red-500/10' },
    { icon: Fingerprint, label: 'CHALLENGE', color: 'text-amber-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
    { icon: Trash2, label: 'PURGE LOGS', color: 'text-zinc-400', bgColor: 'bg-zinc-800/50', borderColor: 'border-zinc-700' },
    { icon: Zap, label: 'BOOST UPLINK', color: 'text-amber-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
    { icon: RefreshCw, label: 'SYNC DNA', color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
    { icon: Lock, label: 'SECURE CORE', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20' },
  ];

  return (
    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-50">
      {tools.map((tool, i) => (
        <motion.button
          key={i}
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-1.5 ${tool.bgColor} ${tool.borderColor} border rounded shadow-lg backdrop-blur-md transition-all group`}
        >
          <tool.icon className={`w-3 h-3 ${tool.color} group-hover:animate-pulse`} />
          <span className="text-[8px] font-black font-mono text-zinc-300 tracking-widest uppercase">{tool.label}</span>
        </motion.button>
      ))}
    </div>
  );
};
