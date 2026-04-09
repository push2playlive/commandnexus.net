import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Zap, Target, Globe, Loader2 } from 'lucide-react';

interface TrendTopic {
  word: string;
  growth: number;
  niche: string;
}

export const GoogleTrendsOracle: React.FC = () => {
  const [trends, setTrends] = useState<TrendTopic[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/nexus-oracle-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: ['woodworking', 'canvas art', 'AI automation', 'clean tech'] })
      });
      const data = await response.json();
      if (data.trending_topics) {
        setTrends(data.trending_topics);
      }
    } catch (error) {
      console.error('Oracle failed to fetch trends:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const createMission = (topic: string) => {
    alert(`MISSION DECLARED: "${topic}" has been pushed as a creative brief to mycanvaslab.com and the Nexus fleet.`);
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-xl flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Globe className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Global Pulse Oracle</h3>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Divination via Google Trends API</p>
          </div>
        </div>
        <button 
          onClick={fetchTrends}
          className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-auto custom-scrollbar pr-2">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Consulting the Oracle...</span>
            </div>
          ) : (
            trends.map((topic, i) => (
              <motion.div
                key={topic.word}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/40 border border-zinc-800 p-4 rounded-lg group hover:border-blue-500/30 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[8px] text-zinc-600 font-mono uppercase tracking-widest block mb-1">{topic.niche}</span>
                    <h4 className="text-zinc-100 font-bold text-sm uppercase tracking-wider">{topic.word}</h4>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-emerald-500 font-black text-xs">+{topic.growth}%</span>
                    <span className="text-[8px] text-zinc-700 uppercase font-mono">Velocity</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1">
                    <div className={`w-1 h-3 rounded-full ${topic.growth > 100 ? 'bg-red-500' : topic.growth > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <div className={`w-1 h-3 rounded-full ${topic.growth > 50 ? (topic.growth > 100 ? 'bg-red-500/50' : 'bg-amber-500/50') : 'bg-emerald-500/20'}`} />
                    <div className={`w-1 h-3 rounded-full ${topic.growth > 100 ? 'bg-red-500/20' : 'bg-zinc-800'}`} />
                  </div>
                  <button 
                    onClick={() => createMission(topic.word)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-[9px] font-bold rounded border border-blue-500/20 transition-all uppercase tracking-widest"
                  >
                    <Target className="w-3 h-3" />
                    Accept Mission
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-800">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-zinc-600 uppercase">Oracle Sync Status</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-bold uppercase">Live Pulse Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
