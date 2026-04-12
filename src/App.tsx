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
  INITIAL_CLIENTS,
  CLIENT_CONFIG
} from './constants';
import { TabCategory, Threat, Agent, UserIntent, Trend, GlobalTrend, SalesMetric, SecurityEvent, BlacklistedIP, Client } from './types';

import { Share2, ShieldCheck, ChevronRight } from 'lucide-react';

import { useNexusCore } from './hooks/useNexusCore';

export default function App() {
  const core = useNexusCore();
  const [activeTab, setActiveTab] = useState<TabCategory>('THREAT SCAN');
  const [activeClient, setActiveClient] = useState<Client>(INITIAL_CLIENTS[0]);
  const [isGhostMenuOpen, setIsGhostMenuOpen] = useState(false);
  const [isMasterOverride, setIsMasterOverride] = useState(false);
  const [threats, setThreats] = useState<Threat[]>(INITIAL_THREATS);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [intents, setIntents] = useState<UserIntent[]>(INITIAL_INTENTS);
  const [trends, setTrends] = useState<Trend[]>(INITIAL_TRENDS);
  const [globalTrends] = useState<GlobalTrend[]>(INITIAL_GLOBAL_TRENDS);
  const [salesMetrics] = useState<SalesMetric[]>(INITIAL_SALES);
  const [securityEvents] = useState<SecurityEvent[]>(INITIAL_SECURITY_EVENTS);
  const [blacklist] = useState<BlacklistedIP[]>(INITIAL_BLACKLIST);

  // Dynamic Theming
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', activeClient.color);
    // Also update a hex version for non-hsl usage if needed, but Tailwind uses hsl for --primary
    // Let's convert hex to hsl for the CSS variable
    const hexToHsl = (hex: string) => {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
      }
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };
    
    const baseColor = isMasterOverride ? '#10b981' : activeClient.color;
    document.documentElement.style.setProperty('--primary', hexToHsl(baseColor));
    
    if (isMasterOverride) {
      document.documentElement.style.setProperty('--accent', hexToHsl('#064e3b')); // Deep forest green
    } else {
      document.documentElement.style.setProperty('--accent', '262 83% 58%'); // Reset to default accent
    }
  }, [activeClient, isMasterOverride]);

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

  const handleUpdateAgent = (agentId: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, ...updates } : a
    ));
  };

  const handleAddThreat = (type: string, source: string) => {
    const newThreat: Threat = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      source,
      timestamp: new Date().toLocaleTimeString(),
      status: 'monitored'
    };
    setThreats(prev => [newThreat, ...prev.slice(0, 4)]);
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
                <text className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isMasterOverride ? 'fill-emerald-500' : 'fill-zinc-500'}`}>
                  <textPath href="#circlePath" startOffset="0%">
                    {isMasterOverride ? 'SENSEI PROTOCOL • NEXUS ACADEMY •' : 'COMMANDER NEXUS • COMMANDER NEXUS •'}
                  </textPath>
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
          
          {/* Breadcrumb Uplink */}
          <div className="flex items-center gap-2 px-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              {isMasterOverride ? 'MASTER_BRIDGE' : 'Nexus'}
            </span>
            <ChevronRight className="w-3 h-3 text-zinc-700" />
            {isMasterOverride && (
              <>
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">SUPER_ADMIN</span>
                <ChevronRight className="w-3 h-3 text-zinc-700" />
              </>
            )}
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">[{activeClient.name}]</span>
            <ChevronRight className="w-3 h-3 text-zinc-700" />
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isMasterOverride ? 'text-emerald-500' : 'text-primary'}`}>
              {activeTab}
            </span>
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

      {/* Main Tactical Hub - Center Viewport */}
      <main className="relative flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 z-10 mt-28 mb-24 overflow-hidden">
        <div className="center-viewport pr-4 h-full">
          <TacticalHub 
            activeTab={activeTab} 
            threats={threats} 
            agents={agents} 
            trends={trends}
            securityEvents={securityEvents}
            blacklist={blacklist}
            onDispatch={handleDispatch}
            onUpdateAgent={handleUpdateAgent}
            activeClient={activeClient}
            onAddThreat={handleAddThreat}
            isMasterOverride={isMasterOverride}
          />
          <PowerTools />
        </div>
      </main>

      {/* Bottom Control Deck */}
      <div className="w-full max-w-7xl mx-auto px-4 z-20">
        <ControlDeck 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsGhostMenuOpen(false);
          }} 
          isGhostMenuOpen={isGhostMenuOpen}
          onToggleGhostMenu={() => setIsGhostMenuOpen(!isGhostMenuOpen)}
          activeClient={activeClient}
          clients={INITIAL_CLIENTS}
          onClientChange={setActiveClient}
          isMasterOverride={isMasterOverride}
          onToggleMasterOverride={() => setIsMasterOverride(!isMasterOverride)}
        />
      </div>

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] z-50 opacity-20" />
    </div>
  );
}
