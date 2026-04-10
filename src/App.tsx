/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CornerMonitor } from './components/CornerMonitor';
import { ControlDeck } from './components/ControlDeck';
import { TacticalHub } from './components/TacticalHub';
import { 
  ThreatMatrixContent, 
  UserIntentContent, 
  AgentPulseContent, 
  TrendAlgorithmContent,
  GlobalTrendsContent, 
  SalesAnalyticsContent 
} from './components/MonitorContent';
import { PowerTools } from './components/PowerTools';
import { 
  INITIAL_AGENTS, 
  INITIAL_THREATS, 
  INITIAL_INTENTS, 
  INITIAL_TRENDS,
  INITIAL_GLOBAL_TRENDS,
  INITIAL_SALES,
  INITIAL_SECURITY_EVENTS,
  INITIAL_BLACKLIST,
  CLIENT_CONFIG
} from './constants';
import { TabCategory, Threat, Agent, UserIntent, Trend, GlobalTrend, SalesMetric, SecurityEvent, BlacklistedIP } from './types';

import { Share2, ShieldCheck } from 'lucide-react';

import { useNexusCore } from './hooks/useNexusCore';

export default function App() {
  const core = useNexusCore();
  const [activeTab, setActiveTab] = useState<TabCategory>('THREAT SCAN');
  const [threats, setThreats] = useState<Threat[]>(INITIAL_THREATS);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [intents, setIntents] = useState<UserIntent[]>(INITIAL_INTENTS);
  const [trends, setTrends] = useState<Trend[]>(INITIAL_TRENDS);
  const [globalTrends] = useState<GlobalTrend[]>(INITIAL_GLOBAL_TRENDS);
  const [salesMetrics] = useState<SalesMetric[]>(INITIAL_SALES);
  const [securityEvents] = useState<SecurityEvent[]>(INITIAL_SECURITY_EVENTS);
  const [blacklist] = useState<BlacklistedIP[]>(INITIAL_BLACKLIST);

  // Simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate threats
      setThreats(prev => {
        const newThreat: Threat = {
          id: Math.random().toString(36).substr(2, 9),
          type: ['SQL Injection', 'Bot Scrape', 'XSS Attempt', 'DDoS Packet'][Math.floor(Math.random() * 4)],
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          timestamp: new Date().toLocaleTimeString(),
          status: Math.random() > 0.2 ? 'blocked' : 'monitored'
        };
        return [newThreat, ...prev.slice(0, 4)];
      });

      // Rotate intents
      setIntents(prev => {
        const newIntent: UserIntent = {
          id: Math.random().toString(36).substr(2, 9),
          keyword: ['Pricing', 'Docs', 'Features', 'Contact', 'Blog'][Math.floor(Math.random() * 5)],
          action: ['Hover', 'Click', 'Scroll'][Math.floor(Math.random() * 3)],
          timestamp: new Date().toLocaleTimeString()
        };
        return [newIntent, ...prev.slice(0, 4)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDispatch = (agentId: string) => {
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, status: 'Dispatched' as const } : a
    ));
    
    // Auto-return after 10 seconds
    setTimeout(() => {
      setAgents(prev => prev.map(a => 
        a.id === agentId ? { ...a, status: 'Working' as const } : a
      ));
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden flex flex-col">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,18,18,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_80%)] pointer-events-none" />

      {/* Header / Logo */}
      <div className="fixed top-6 left-8 z-50 flex flex-col items-start">
        <div className="flex items-center gap-4 bg-black/60 px-6 py-3 rounded-2xl border border-zinc-800 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-1 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
              <ShieldCheck className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            </div>
            {/* Circular Text Simulation */}
            <div className="absolute -inset-2 pointer-events-none">
              <svg className="w-16 h-16 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text className="text-[8px] font-black uppercase tracking-[0.2em] fill-zinc-500">
                  <textPath href="#circlePath" startOffset="0%">COMMANDER NEXUS â€¢ COMMANDER NEXUS â€¢</textPath>
                </text>
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-[0.3em] text-zinc-100 uppercase">
              {core.loading ? (
                <>Command<span className="text-primary">Nexus</span></>
              ) : (
                core.name
              )}
            </h1>
            <div className="flex items-center gap-2">
              <div className="text-[8px] font-mono text-zinc-600 tracking-[0.3em] uppercase">Tactical Operations Center</div>
              {!core.loading && (
                <div className={`px-1.5 py-0.5 rounded-[4px] text-[7px] font-bold uppercase tracking-widest border ${
                  core.env === 'production' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                  core.env === 'maintenance' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                  'bg-primary/10 text-primary border-primary/20'
                }`}>
                  {core.env}
                </div>
              )}
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800 mx-2" />
          <button className="p-2 hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500 hover:text-zinc-100">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Corner Monitors */}
      <CornerMonitor title="Global Trends" position="top-left">
        <GlobalTrendsContent trends={globalTrends} />
      </CornerMonitor>

      <CornerMonitor title="Threat Matrix" position="mid-left">
        <ThreatMatrixContent threats={threats} />
      </CornerMonitor>

      <CornerMonitor title="Agent Pulse" position="bottom-left">
        <AgentPulseContent agents={agents} />
      </CornerMonitor>

      <CornerMonitor title="User Intent Engine" position="top-right">
        <UserIntentContent intents={intents} />
      </CornerMonitor>

      <CornerMonitor title="Sales Analytics" position="mid-right">
        <SalesAnalyticsContent metrics={salesMetrics} />
      </CornerMonitor>

      <CornerMonitor title="Trend Algorithm" position="bottom-right">
        <TrendAlgorithmContent trends={trends} />
      </CornerMonitor>

      {/* Main Tactical Hub */}
      <div className="relative flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 z-10">
        <TacticalHub 
          activeTab={activeTab} 
          threats={threats} 
          agents={agents} 
          trends={trends}
          securityEvents={securityEvents}
          blacklist={blacklist}
          onDispatch={handleDispatch}
        />
        <PowerTools />
      </div>

      {/* Bottom Control Deck */}
      <div className="w-full max-w-7xl mx-auto px-4 z-20">
        <ControlDeck activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] z-50 opacity-20" />
    </div>
  );
}
