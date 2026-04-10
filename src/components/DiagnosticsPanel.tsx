import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'motion/react';

const data = [
  { time: '00:00', value: 400 },
  { time: '04:00', value: 300 },
  { time: '08:00', value: 600 },
  { time: '12:00', value: 800 },
  { time: '16:00', value: 500 },
  { time: '20:00', value: 900 },
  { time: '23:59', value: 700 },
];

export const DiagnosticsPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Network Traffic */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-100 font-bold text-xs tracking-widest uppercase">Network Throughput</h3>
          <span className="text-emerald-500 text-[10px] font-mono animate-pulse">LIVE</span>
        </div>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', fontSize: '10px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'CPU LOAD', value: '42%', color: 'text-blue-500', barColor: 'bg-blue-500' },
          { label: 'MEMORY', value: '6.2GB', value2: '/ 16GB', color: 'text-purple-500', barColor: 'bg-purple-500' },
          { label: 'UPLINK', value: '1.2GB/s', color: 'text-emerald-500', barColor: 'bg-emerald-500' },
          { label: 'LATENCY', value: '14ms', color: 'text-amber-500', barColor: 'bg-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg flex flex-col justify-between">
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest">{stat.label}</span>
            <div className="my-2">
              <span className={`text-xl font-black font-mono ${stat.color}`}>{stat.value}</span>
              {stat.value2 && <span className="text-zinc-600 text-xs ml-1">{stat.value2}</span>}
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: stat.value.includes('%') ? stat.value : '60%' }}
                className={`h-full ${stat.barColor}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Live Event Log */}
      <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-zinc-100 font-bold text-xs tracking-widest uppercase">Kernel Event Log</h3>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>
        <div className="font-mono text-[10px] text-zinc-500 space-y-1">
          <p className="text-emerald-500/80">[OK] System initialization complete.</p>
          <p className="text-zinc-600">[INFO] Uplink established via SECURE_CHANNEL_01.</p>
          <p className="text-amber-500/80">[WARN] High dwell time detected on User_882.</p>
          <p className="text-red-500/80">[CRIT] SQL Injection attempt blocked from 192.168.1.45.</p>
          <p className="text-zinc-600">[INFO] Agent Aura dispatched to repair broken links.</p>
          <p className="text-zinc-600">[INFO] Trend Algorithm updated: Creator Surge active.</p>
          <p className="text-emerald-500/80">[OK] Diagnostics scan 100% complete.</p>
          <p className="text-zinc-600">[INFO] Waiting for next packet...</p>
        </div>
      </div>
    </div>
  );
};
