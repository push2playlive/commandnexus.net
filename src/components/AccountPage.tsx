import React from 'react';
import { Wallet, ShieldCheck, Lock, CheckCircle2, CreditCard, ExternalLink } from 'lucide-react';

export const AccountPage: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-8 py-8">
    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl shadow-shield backdrop-blur-md">
      <div className="flex items-center justify-between mb-12 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-nexus-cyan/10 rounded-xl">
            <Wallet className="w-6 h-6 text-nexus-cyan" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-[0.2em] text-zinc-100 uppercase">The Vault</h2>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Sovereign Asset Management</p>
          </div>
        </div>
        <div className="px-4 py-1.5 bg-nexus-cyan/10 border border-nexus-cyan/30 rounded-full text-[10px] font-black text-nexus-cyan uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,204,0.2)]">
          LIFETIME OWNER
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-black/40 border border-zinc-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-nexus-cyan" />
              <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Active Plan: Architect Tier</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                <span>Next billing cycle</span>
                <span className="text-zinc-300">May 10, 2026</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                <span>Neural Credits</span>
                <span className="text-nexus-cyan font-bold">850 / 1000</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-nexus-cyan" />
              </div>
              <button className="w-full py-3 bg-nexus-cyan/10 hover:bg-nexus-cyan/20 text-nexus-cyan text-[10px] font-bold rounded border border-nexus-cyan/30 uppercase tracking-widest transition-all">
                Upgrade Credits
              </button>
            </div>
          </div>

          <div className="bg-black/40 border border-zinc-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-nexus-cyan" />
              <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Security Protocols</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded border border-zinc-800/50">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">2FA Authentication</span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded border border-zinc-800/50">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Neural Link Encrypted</span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/40 border border-zinc-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-nexus-cyan" />
            <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Authorized Connections</h3>
          </div>
          <ul className="space-y-4">
            {[
              { domain: 'mycanvaslab.com', status: 'active' },
              { domain: 'utubechat.com', status: 'active' },
              { domain: 'hygieneteam.nz', status: 'inactive' },
            ].map((limb, i) => (
              <li key={i} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50 group hover:border-nexus-cyan/30 transition-colors">
                <div className="flex items-center gap-3">
                  {limb.status === 'active' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Lock className="w-4 h-4 text-zinc-600" />
                  )}
                  <span className={`text-xs font-mono font-bold ${limb.status === 'active' ? 'text-zinc-100' : 'text-zinc-600'}`}>{limb.domain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${limb.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-600'}`}>
                    {limb.status}
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-700 group-hover:text-nexus-cyan transition-colors" />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[9px] text-zinc-600 font-mono uppercase text-center leading-relaxed">
            These connections represent your "Limbs" across the net. Unauthorized access is blocked by the Behavioral Firewall.
          </p>
        </div>
      </div>
    </div>
  </div>
);
