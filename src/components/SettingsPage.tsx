import React from 'react';
import { Settings, Eye, Globe, ShieldAlert } from 'lucide-react';

export const SettingsPage: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-8 py-8">
    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl shadow-shield backdrop-blur-md">
      <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-6">
        <div className="p-3 bg-nexus-cyan/10 rounded-xl">
          <Settings className="w-6 h-6 text-nexus-cyan" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-[0.2em] text-zinc-100 uppercase">Bridge Settings</h2>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Neural Interface Configuration</p>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-100 mb-2">
            <Eye className="w-4 h-4 text-nexus-cyan" />
            <label className="text-xs font-bold uppercase tracking-widest">Visual Interface</label>
          </div>
          <select className="w-full nexus-input font-mono text-xs">
            <option>Dark Matter (Default)</option>
            <option>Nebula Pulse</option>
            <option>Solar Flare</option>
          </select>
          <p className="text-[9px] text-zinc-600 font-mono uppercase">Adjust the spectral output of the Command Center.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-nexus-cyan" />
              <div>
                <div className="text-xs font-bold text-zinc-100 uppercase tracking-widest">Nexus Sync</div>
                <div className="text-[9px] text-zinc-500 font-mono uppercase">Auto-sync missions across all apps</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nexus-cyan/50"></div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-100 mb-2">
            <ShieldAlert className="w-4 h-4 text-nexus-cyan" />
            <label className="text-xs font-bold uppercase tracking-widest">Security Level</label>
          </div>
          <input type="range" min="1" max="10" defaultValue="8" className="w-full nexus-slider accent-nexus-cyan" />
          <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase">
            <span>Low (Minimal)</span>
            <span className="text-nexus-cyan font-bold">Current Shielding: High (Behavioral Firewall Active)</span>
            <span>Max (Paranoid)</span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-end gap-4">
        <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-[10px] font-bold rounded border border-zinc-700 uppercase tracking-widest transition-colors">
          Reset Defaults
        </button>
        <button className="px-6 py-2 bg-nexus-cyan/20 hover:bg-nexus-cyan/40 text-nexus-cyan text-[10px] font-bold rounded border border-nexus-cyan/30 uppercase tracking-widest transition-all">
          Apply Configuration
        </button>
      </div>
    </div>
  </div>
);
