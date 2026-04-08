import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Globe, Shield, Zap, Cpu } from 'lucide-react';

export const ShellConfigInput: React.FC = () => {
  const [config, setConfig] = useState({ 
    domain: '', 
    name: '', 
    env: 'production', 
    gId: '' 
  });
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const saveConfig = async () => {
    setIsSaving(true);
    setStatus('FORGING IDENTITY...');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setStatus('DEED DECLARED: SHELL DNA ARTICULATED.');
    
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Cpu className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-zinc-100 font-bold text-lg tracking-tight">Overseer: Identity Forge</h3>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Forge the shell's DNA markers directly into the vault</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-3 h-3" /> Domain URL (Anchor)
              </label>
              <input 
                type="text"
                placeholder="e.g. mycanvaslab.com" 
                value={config.domain}
                onChange={e => setConfig({...config, domain: e.target.value})}
                className="w-full bg-black/40 border border-zinc-800 rounded px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-3 h-3" /> Shell Name (Heart)
              </label>
              <input 
                type="text"
                placeholder="Nexus Core Alpha" 
                value={config.name}
                onChange={e => setConfig({...config, name: e.target.value})}
                className="w-full bg-black/40 border border-zinc-800 rounded px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Database className="w-3 h-3" /> Environment (State)
              </label>
              <select 
                value={config.env}
                onChange={e => setConfig({...config, env: e.target.value})}
                className="w-full bg-black/40 border border-zinc-800 rounded px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500/50 transition-colors font-mono appearance-none"
              >
                <option value="development">DEVELOPMENT</option>
                <option value="production">PRODUCTION</option>
                <option value="maintenance">MAINTENANCE</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-3 h-3" /> Google Client ID (Key)
              </label>
              <input 
                type="password"
                placeholder="G-CLIENT-ID-XXXXX" 
                value={config.gId}
                onChange={e => setConfig({...config, gId: e.target.value})}
                className="w-full bg-black/40 border border-zinc-800 rounded px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors font-mono"
              />
            </div>
          </div>

          <button 
            onClick={saveConfig}
            disabled={isSaving || !config.domain || !config.name}
            className="w-full py-4 bg-blue-600/20 hover:bg-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed text-blue-400 font-bold rounded border border-blue-500/30 uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            ) : 'Forge Identity'}
          </button>
        </div>

        {status && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded text-center"
          >
            <span className="text-emerald-400 text-[10px] font-mono font-bold tracking-widest">{status}</span>
          </motion.div>
        )}
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-lg">
        <h4 className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">DNA Vault Status</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-600 uppercase">HETZNER V12 UPLINK</span>
            <span className="text-emerald-500">ACTIVE</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-600 uppercase">DNA SYNC MODE</span>
            <span className="text-blue-500">REAL-TIME</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-600 uppercase">VAULT ENCRYPTION</span>
            <span className="text-zinc-400">AES-256-GCM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
