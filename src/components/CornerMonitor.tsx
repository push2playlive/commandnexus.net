import React from 'react';
import { motion } from 'motion/react';

interface CornerMonitorProps {
  title: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'mid-left' | 'mid-right';
  children: React.ReactNode;
}

export const CornerMonitor: React.FC<CornerMonitorProps> = ({ title, position, children }) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'mid-left': 'top-1/2 -translate-y-1/2 left-4',
    'mid-right': 'top-1/2 -translate-y-1/2 right-4',
    'bottom-left': 'bottom-24 left-4',
    'bottom-right': 'bottom-24 right-4',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed ${positionClasses[position]} w-64 h-48 bg-zinc-900/80 border border-zinc-700 rounded-lg overflow-hidden flex flex-col backdrop-blur-md shadow-2xl z-40`}
    >
      <div className="bg-zinc-800 px-3 py-1 border-b border-zinc-700 flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-widest uppercase">{title}</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
        </div>
      </div>
      <div className="flex-1 p-3 font-mono text-[10px] overflow-auto scrollbar-hide">
        {children}
      </div>
      <div className="h-1 bg-zinc-800 flex">
        <motion.div 
          animate={{ x: [0, 256, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-16 h-full bg-blue-500/20"
        />
      </div>
    </motion.div>
  );
};
