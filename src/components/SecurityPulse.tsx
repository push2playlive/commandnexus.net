import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SecurityEvent, BlacklistedIP } from '../types';
import { ShieldAlert, ShieldCheck, Activity, Lock, UserX, Globe, ExternalLink, X, Search } from 'lucide-react';

interface SecurityPulseProps {
  events: SecurityEvent[];
  blacklist: BlacklistedIP[];
}

export const SecurityPulse: React.FC<SecurityPulseProps> = ({ events, blacklist }) => {
  const [lookupIp, setLookupIp] = useState<string | null>(null);
  const [lookupData, setLookupData] = useState<any>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const handleThreatAction = async (ip: string, action: 'BLOCK' | 'INVESTIGATE' | 'IGNORE' | 'LOOKUP') => {
    if (action === 'BLOCK') {
      console.log(`Target Nullified: ${ip} blocked across all apps.`);
      alert(`Target Nullified: ${ip} blocked across all apps.`);
    } else if (action === 'INVESTIGATE') {
      window.open(`https://www.abuseipdb.com/check/${ip}`, '_blank');
    } else if (action === 'IGNORE') {
      console.log(`IP ${ip} whitelisted for 24 hours.`);
      alert(`IP ${ip} moved to Safe List for 24 hours.`);
    } else if (action === 'LOOKUP') {
      setLookupIp(ip);
      fetchIpDetails(ip);
    }
  };

  const fetchIpDetails = async (ip: string) => {
    setIsLookingUp(true);
    setLookupError(null);
    setLookupData(null);
    try {
      const response = await fetch(`/api/lookup-ip?ip=${ip}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to fetch IP details');
      setLookupData(result.data);
    } catch (err: any) {
      setLookupError(err.message);
    } finally {
      setIsLookingUp(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Live Security Pulse */}
      <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 p-6 rounded-xl flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <div>
              <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Behavioral Firewall Pulse</h3>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Monitoring Geo-Velocity & Credential Stuffing</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-zinc-800 rounded text-[9px] text-emerald-500 font-mono font-bold uppercase">Shield: Active</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-auto custom-scrollbar pr-2">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border flex items-start gap-4 transition-all hover:bg-zinc-800/30 ${
                event.severity === 'Critical' ? 'bg-red-500/5 border-red-500/20' :
                event.severity === 'High' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-zinc-800/50 border-zinc-700'
              }`}
            >
              <div className={`p-2 rounded ${
                event.severity === 'Critical' ? 'text-red-500' :
                event.severity === 'High' ? 'text-amber-500' : 'text-zinc-400'
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    event.severity === 'Critical' ? 'text-red-400' :
                    event.severity === 'High' ? 'text-amber-400' : 'text-zinc-500'
                  }`}>{event.type}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-zinc-400 font-mono bg-zinc-800 px-1.5 py-0.5 rounded">{event.ip}</span>
                    <span className="text-[9px] text-zinc-600 font-mono">{event.timestamp}</span>
                  </div>
                </div>
                <p className="text-zinc-300 text-xs font-mono">{event.details}</p>
                <div className="mt-3 flex gap-4">
                  <button 
                    onClick={() => handleThreatAction(event.ip || '127.0.0.1', 'LOOKUP')}
                    className="text-[9px] text-blue-400 hover:text-blue-300 uppercase font-bold tracking-widest transition-colors flex items-center gap-1"
                  >
                    <Search className="w-2.5 h-2.5" />
                    Lookup
                  </button>
                  <button 
                    onClick={() => handleThreatAction(event.ip || '127.0.0.1', 'INVESTIGATE')}
                    className="text-[9px] text-zinc-500 hover:text-zinc-300 uppercase font-bold tracking-widest transition-colors"
                  >
                    Investigate
                  </button>
                  <button 
                    onClick={() => handleThreatAction(event.ip || '127.0.0.1', 'BLOCK')}
                    className="text-[9px] text-red-400 hover:text-red-300 uppercase font-bold tracking-widest transition-colors"
                  >
                    Block IP
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Blacklist Vault */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-xl flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-zinc-800 rounded-lg">
            <Lock className="w-5 h-5 text-zinc-400" />
          </div>
          <div>
            <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Blacklist Vault</h3>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">IP Reputation & Ban List</p>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-auto custom-scrollbar pr-2">
          {blacklist.map((item) => (
            <div key={item.ip} className="bg-black/40 border border-zinc-800 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-zinc-100 text-xs font-mono font-bold">{item.ip}</span>
                <span className="text-red-500 text-[10px] font-bold">LVL {item.threatLevel}</span>
              </div>
              <p className="text-zinc-500 text-[10px] mb-2">{item.reason}</p>
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-zinc-700 uppercase">Expires: {new Date(item.expiresAt).toLocaleDateString()}</span>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleThreatAction(item.ip, 'LOOKUP')}
                    className="text-[9px] text-blue-500 hover:text-blue-400 uppercase font-bold flex items-center gap-1"
                  >
                    <Search className="w-2.5 h-2.5" />
                    Lookup
                  </button>
                  <button className="text-[9px] text-zinc-500 hover:text-zinc-300 uppercase">Pardon</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {lookupIp && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Globe className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">IP Intelligence</h3>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">AbuseIPDB Deep Scan</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setLookupIp(null)}
                    className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex flex-col items-center justify-center py-4 bg-black/40 rounded-xl border border-zinc-800/50">
                    <span className="text-2xl font-black text-zinc-100 font-mono tracking-tighter mb-1">{lookupIp}</span>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Target Identifier</span>
                  </div>

                  {isLookingUp ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest animate-pulse">Scanning Neural Paths...</span>
                    </div>
                  ) : lookupError ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                      <p className="text-red-400 text-xs font-mono mb-2">{lookupError}</p>
                      <button 
                        onClick={() => fetchIpDetails(lookupIp!)}
                        className="text-[10px] text-zinc-400 hover:text-zinc-100 underline uppercase tracking-widest"
                      >
                        Retry Scan
                      </button>
                    </div>
                  ) : lookupData ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-800/30 p-3 rounded-lg border border-zinc-800">
                          <span className="text-[8px] text-zinc-500 uppercase block mb-1">Abuse Score</span>
                          <span className={`font-bold text-sm ${lookupData.abuseConfidenceScore > 50 ? 'text-red-500' : 'text-emerald-500'}`}>
                            {lookupData.abuseConfidenceScore}%
                          </span>
                        </div>
                        <div className="bg-zinc-800/30 p-3 rounded-lg border border-zinc-800">
                          <span className="text-[8px] text-zinc-500 uppercase block mb-1">Total Reports</span>
                          <span className="text-zinc-100 font-bold text-sm">{lookupData.totalReports?.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-800/50 pb-2">
                          <span className="text-zinc-500 uppercase">ISP</span>
                          <span className="text-zinc-300">{lookupData.isp}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-800/50 pb-2">
                          <span className="text-zinc-500 uppercase">Usage Type</span>
                          <span className="text-zinc-300">{lookupData.usageType}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-800/50 pb-2">
                          <span className="text-zinc-500 uppercase">Country</span>
                          <span className="text-zinc-300">{lookupData.countryCode}</span>
                        </div>
                      </div>

                      {lookupData.isSimulated && (
                        <div className="p-2 bg-amber-500/5 border border-amber-500/10 rounded text-center">
                          <span className="text-[8px] text-amber-500/60 font-mono uppercase tracking-widest">Demo Mode: Simulated Intelligence</span>
                        </div>
                      )}
                    </>
                  ) : null}

                  <div className="pt-4 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => window.open(`https://www.abuseipdb.com/check/${lookupIp}`, '_blank')}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Full Report
                      </button>
                      <button 
                        onClick={() => {
                          handleThreatAction(lookupIp!, 'BLOCK');
                          setLookupIp(null);
                        }}
                        className="flex-1 py-2.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all border border-red-500/30 flex items-center justify-center gap-2"
                      >
                        <UserX className="w-3 h-3" />
                        Block IP
                      </button>
                    </div>
                    <button 
                      onClick={() => setLookupIp(null)}
                      className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all border border-zinc-700"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="mt-6 pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-between text-[10px] font-mono mb-4">
            <span className="text-zinc-600 uppercase">Baddie Blocker Status</span>
            <span className="text-emerald-500 font-bold uppercase">Active</span>
          </div>
          <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded border border-zinc-700 uppercase tracking-widest transition-colors">
            Manual IP Block
          </button>
        </div>
      </div>
    </div>
  );
};
