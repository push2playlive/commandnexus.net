import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RadarPing {
  id: string;
  x: number;
  y: number;
  type: 'healthy' | 'threat' | 'unknown';
  threatLevel: number;
  timestamp: number;
}

export const NetworkRadar: React.FC = () => {
  const [pings, setPings] = useState<RadarPing[]>([]);

  useEffect(() => {
    // Simulate live data for the preview
    const interval = setInterval(() => {
      const types: ('healthy' | 'threat' | 'unknown')[] = ['healthy', 'threat', 'unknown'];
      const type = types[Math.floor(Math.random() * 3)];
      
      const newPing: RadarPing = {
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 100,
        y: Math.random() * 100,
        type,
        threatLevel: type === 'threat' ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 5),
        timestamp: Date.now()
      };

      setPings(prev => [...prev.slice(-15), newPing]);
    }, 2000);

    // Mock Supabase subscription as requested
    console.log('Subscribing to security-pulse channel...');
    const mockChannel = {
      unsubscribe: () => console.log('Unsubscribed from security-pulse')
    };

    return () => {
      clearInterval(interval);
      mockChannel.unsubscribe();
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black/40 rounded-xl border border-zinc-800 overflow-hidden flex items-center justify-center">
      {/* Radar Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] h-[80%] border border-zinc-800/50 rounded-full" />
        <div className="w-[60%] h-[60%] border border-zinc-800/30 rounded-full" />
        <div className="w-[40%] h-[40%] border border-zinc-800/20 rounded-full" />
        <div className="w-[20%] h-[20%] border border-zinc-800/10 rounded-full" />
        
        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-zinc-800/30" />
        <div className="absolute h-full w-[1px] bg-zinc-800/30" />
      </div>

      {/* Sweeper Effect */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full origin-center"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.1) 90deg, transparent 90deg)'
        }}
      />

      {/* Pings */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {pings.map((ping) => (
            <motion.div
              key={ping.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${ping.x}%`,
                top: `${ping.y}%`,
                backgroundColor: ping.type === 'threat' ? '#ef4444' : ping.type === 'healthy' ? '#10b981' : '#f59e0b',
                boxShadow: `0 0 10px ${ping.type === 'threat' ? '#ef4444' : ping.type === 'healthy' ? '#10b981' : '#f59e0b'}`
              }}
            >
              <motion.div 
                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-current"
                style={{ color: 'inherit' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Fleet Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Investigating</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Threat Blocked</span>
        </div>
      </div>

      {/* Radar Label */}
      <div className="absolute top-4 right-4 text-right">
        <div className="text-[10px] font-black text-zinc-100 tracking-widest uppercase">Network Radar</div>
        <div className="text-[8px] font-mono text-blue-500 uppercase tracking-widest">Hetzner V12 Uplink</div>
      </div>
    </div>
  );
};
