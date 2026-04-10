import React from 'react';
import { motion } from 'motion/react';
import { User, Shield, Zap, Activity } from 'lucide-react';

export const ProfilePage: React.FC = () => (
  <div className="space-y-8 py-4 galaxy-bg min-h-full p-8 rounded-2xl">
    <div className="flex flex-col md:flex-row items-center gap-8 border-b border-zinc-800 pb-8">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-2 border-nexus-cyan p-1 overflow-hidden bg-zinc-900">
          <img 
            src="https://picsum.photos/seed/commander/200/200" 
            alt="Commander" 
            className="w-full h-full rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-zinc-900 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-black tracking-[0.2em] text-zinc-100 uppercase mb-2">COMMANDER <span className="text-nexus-cyan">ARCHITECT</span></h1>
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
          <Shield className="w-3 h-3 text-nexus-cyan" /> Rank: Lead Architect | Net: CommandNexus Alpha
        </p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Missions', value: '42', icon: Zap, color: 'text-amber-500' },
        { label: 'Neural Credits', value: '850', icon: Activity, color: 'text-primary' },
        { label: 'Uptime', value: '99.9%', icon: Shield, color: 'text-emerald-500' },
      ].map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl shadow-shield flex flex-col items-center text-center group hover:border-nexus-cyan/30 transition-colors"
        >
          <stat.icon className={`w-6 h-6 mb-3 ${stat.color}`} />
          <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</h3>
          <p className="text-3xl font-black text-zinc-100 tracking-tighter">{stat.value}</p>
        </motion.div>
      ))}
    </div>

    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl shadow-shield">
      <div className="flex items-center gap-3 mb-4">
        <User className="w-5 h-5 text-nexus-cyan" />
        <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Pilot's Log</h3>
      </div>
      <p className="text-zinc-400 font-mono text-sm leading-relaxed italic border-l-2 border-nexus-cyan pl-6">
        "Bolding my way through the code. Searching for the next creative galaxy. The V24 core is humming, and the net is expanding. Every mission completed is a sky tower built above the bad days."
      </p>
    </div>
  </div>
);
