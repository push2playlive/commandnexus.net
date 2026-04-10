import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Zap, Search, Globe, ExternalLink, MessageSquare, TrendingUp, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface MarketLead {
  id: string;
  text: string;
  source: string;
  timestamp: string;
}

export const MarketDispatcher: React.FC = () => {
  const [targetDomain, setTargetDomain] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [leads, setLeads] = useState<MarketLead[]>([]);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDomain) return;

    setIsDeploying(true);
    setStatus('scanning');
    setLeads([]);

    try {
      const response = await fetch('/api/market-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: targetDomain })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setLeads(data.leads);
        setStatus('success');
      } else {
        throw new Error(data.error || 'Dispatch failed');
      }
    } catch (err) {
      console.error('Market Dispatch Error:', err);
      setStatus('error');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="h-full pr-2 space-y-6">
      {/* Header Section */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Market Dispatcher</h3>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Offensive Growth & Competitive Displacement</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-[9px] text-primary font-mono font-bold uppercase tracking-widest">Offense: Active</span>
          </div>
        </div>

        <form onSubmit={handleDispatch} className="flex gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text"
              placeholder="Enter Competitor Domain (e.g., canva.com)"
              value={targetDomain}
              onChange={(e) => setTargetDomain(e.target.value)}
              className="w-full bg-black/40 border border-zinc-800 p-3 pl-10 rounded-lg text-zinc-100 font-mono text-xs focus:border-primary outline-none transition-colors"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isDeploying}
            className="px-6 py-3 bg-primary text-primary-foreground font-black text-xs rounded-lg uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeploying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Dispatching...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Attack Market
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-500" />
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">Market Intel Feed</span>
          </div>
          {status === 'success' && (
            <span className="text-[9px] text-emerald-500 font-mono font-bold uppercase tracking-widest flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Intel Gathered
            </span>
          )}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {status === 'idle' ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4"
              >
                <Target className="w-12 h-12 opacity-10" />
                <p className="text-[10px] font-mono uppercase tracking-[0.3em]">Awaiting Target Designation</p>
              </motion.div>
            ) : status === 'scanning' ? (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-primary/20 rounded-full" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-primary font-mono uppercase tracking-[0.2em] animate-pulse">Scrambling Agents to {targetDomain}</p>
                  <p className="text-[8px] text-zinc-600 font-mono mt-2 uppercase tracking-widest">Scraping Mentions // Identifying Weak Points</p>
                </div>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-red-500 space-y-4"
              >
                <AlertCircle className="w-12 h-12 opacity-20" />
                <p className="text-[10px] font-mono uppercase tracking-[0.3em]">Dispatch Failed: Target Defenses High</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[9px] underline uppercase tracking-widest text-zinc-500 hover:text-zinc-300"
                >
                  Reset Uplink
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {leads.map((lead, i) => (
                  <motion.div 
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/40 border border-zinc-800 p-4 rounded-lg group hover:border-primary/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-[8px] text-zinc-600 font-mono">{new Date(lead.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-zinc-300 text-xs font-mono mb-4 leading-relaxed">{lead.text}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3 text-zinc-500" />
                        <span className="text-[9px] text-zinc-500 font-mono truncate max-w-[150px]">{lead.source}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-primary transition-colors">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-100 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Stats */}
        {status === 'success' && (
          <div className="p-4 bg-zinc-900/40 border-t border-zinc-800 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xs font-bold text-zinc-100">4</div>
              <div className="text-[8px] text-zinc-600 uppercase">Leads Found</div>
            </div>
            <div className="text-center border-x border-zinc-800">
              <div className="text-xs font-bold text-emerald-500">High</div>
              <div className="text-[8px] text-zinc-600 uppercase">Opportunity</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-primary">Active</div>
              <div className="text-[8px] text-zinc-600 uppercase">Offense Status</div>
            </div>
          </div>
        )}
      </div>

      {/* Strategy Guide */}
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">Commander's Strategy: Competitive Displacement</h4>
          <p className="text-[10px] text-zinc-400 font-mono leading-relaxed">
            Targeting the "Heart" of the competition. We identify where users are discussing competitors like <span className="text-zinc-100">Canva</span> or <span className="text-zinc-100">YouTube</span>, reverse engineer their backlinks, and dispatch personalized outreach to capture the market.
          </p>
        </div>
      </div>
    </div>
  );
};
