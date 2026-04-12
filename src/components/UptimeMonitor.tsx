import React from 'react';
import { motion } from 'motion/react';
import { Client } from '../types';
import { Globe, Zap, Activity, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface UptimeMonitorProps {
  activeClient: Client;
}

export const UptimeMonitor: React.FC<UptimeMonitorProps> = ({ activeClient }) => {
  // Mock data for the chart
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    latency: Math.floor(Math.random() * 100) + 50,
    status: Math.random() > 0.05 ? 'up' : 'down'
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl shadow-shield">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Target Domain</span>
          </div>
          <div className="text-lg font-black text-zinc-100 uppercase tracking-tighter">{activeClient.domain}</div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl shadow-shield">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Current Uptime</span>
          </div>
          <div className="text-lg font-black text-emerald-500 tracking-tighter">{activeClient.uptime}%</div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl shadow-shield">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Avg Latency</span>
          </div>
          <div className="text-lg font-black text-amber-500 tracking-tighter">84ms</div>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl shadow-shield">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-zinc-400" />
            <h3 className="text-zinc-100 font-bold text-xs tracking-widest uppercase">24H Availability Pulse</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] text-zinc-500 font-mono uppercase">Operational</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[9px] text-zinc-500 font-mono uppercase">Outage</span>
            </div>
          </div>
        </div>

        <div className="flex gap-1 h-12 items-end">
          {data.map((d, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ delay: i * 0.02 }}
              className={`flex-1 rounded-sm transition-all duration-500 hover:opacity-80 cursor-help relative group ${
                d.status === 'up' ? 'bg-emerald-500/40' : 'bg-red-500'
              }`}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                <div className="bg-zinc-800 border border-zinc-700 p-2 rounded text-[8px] font-mono whitespace-nowrap shadow-xl">
                  TIME: {d.time}<br/>
                  LATENCY: {d.latency}ms<br/>
                  STATUS: {d.status.toUpperCase()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl shadow-shield">
        <h3 className="text-zinc-100 font-bold text-xs tracking-widest uppercase mb-4">Recent Incidents</h3>
        <div className="space-y-3">
          {[
            { time: '2h ago', event: 'Global CDN Latency Spike', status: 'Resolved', severity: 'Medium' },
            { time: '5h ago', event: 'Database Connection Timeout', status: 'Resolved', severity: 'High' },
            { time: '12h ago', event: 'SSL Certificate Verification', status: 'Resolved', severity: 'Low' },
          ].map((incident, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-black/20 border border-zinc-800 rounded-lg group hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-1.5 rounded ${
                  incident.severity === 'High' ? 'bg-red-500/10 text-red-500' :
                  incident.severity === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-zinc-200">{incident.event}</div>
                  <div className="text-[9px] text-zinc-500 font-mono uppercase">{incident.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] text-emerald-500 font-mono font-bold uppercase">{incident.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
