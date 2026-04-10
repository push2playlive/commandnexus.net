import { Agent, Threat, UserIntent, Trend, GlobalTrend, SalesMetric, SecurityEvent, BlacklistedIP } from './types';

export const INITIAL_AGENTS: Agent[] = [
  { id: '1', name: 'Agent Aura', status: 'Working', shift: '0000-0800', task: 'Repair broken links', priority: 3 },
  { id: '2', name: 'Agent Blaze', status: 'Idle', shift: '0800-1600', task: 'Monitor traffic', priority: 1 },
  { id: '3', name: 'Agent Cipher', status: 'Dispatched', shift: '1600-0000', task: 'Security Audit', priority: 5 },
];

export const INITIAL_THREATS: Threat[] = [
  { id: '1', type: 'SQL Injection', source: '192.168.1.45', timestamp: '14:20:01', status: 'blocked' },
  { id: '2', type: 'Bot Scrape', source: '45.23.11.2', timestamp: '14:21:15', status: 'blocked' },
  { id: '3', type: 'XSS Attempt', source: '10.0.0.5', timestamp: '14:22:30', status: 'monitored' },
];

export const INITIAL_INTENTS: UserIntent[] = [
  { id: '1', keyword: 'API Docs', action: 'Hover', timestamp: '14:25:01' },
  { id: '2', keyword: 'Pricing', action: 'Click', timestamp: '14:25:15' },
  { id: '3', keyword: 'Checkout', action: 'Scroll', timestamp: '14:26:00' },
];

export const INITIAL_TRENDS: Trend[] = [
  { id: '1', user: 'User_492', engagement: 92, type: 'Thinker' },
  { id: '2', user: 'User_112', engagement: 85, type: 'Creator' },
  { id: '3', user: 'User_883', engagement: 45, type: 'Standard' },
];

export const INITIAL_GLOBAL_TRENDS: GlobalTrend[] = [
  { id: '1', topic: 'AI Ethics', velocity: 88, region: 'NA' },
  { id: '2', topic: 'Web3 Auth', velocity: 72, region: 'EU' },
  { id: '3', topic: 'Edge Compute', velocity: 95, region: 'AS' },
];

export const INITIAL_SALES: SalesMetric[] = [
  { id: '1', label: 'Daily Revenue', value: '$12,402', trend: 'up', percentage: 12 },
  { id: '2', label: 'Conversions', value: '4.8%', trend: 'up', percentage: 0.5 },
  { id: '3', label: 'Churn Rate', value: '1.2%', trend: 'down', percentage: 0.2 },
];

export const INITIAL_SECURITY_EVENTS: SecurityEvent[] = [
  { id: '1', type: 'Geo-Velocity', severity: 'Critical', details: 'User logged from NZ and UK within 5 mins', ip: '185.22.33.44', timestamp: '05:01:00' },
  { id: '2', type: 'Credential Stuffing', severity: 'High', details: '10 failed attempts from 192.168.1.10', ip: '192.168.1.10', timestamp: '05:02:15' },
  { id: '3', type: 'IP Reputation', severity: 'Medium', details: 'Known bot IP detected: 45.33.22.11', ip: '45.33.22.11', timestamp: '05:03:30' },
];

export const INITIAL_BLACKLIST: BlacklistedIP[] = [
  { ip: '192.168.1.10', reason: 'Credential Stuffing', threatLevel: 9, expiresAt: '2026-04-09T05:00:00Z' },
  { ip: '45.33.22.11', reason: 'Bot Scraper', threatLevel: 7, expiresAt: '2026-04-10T05:00:00Z' },
];

export const CLIENT_CONFIG = {
  branding: {
    primaryColor: '#1a1a1a',
    accentColor: '#3b82f6',
    logoUrl: 'https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/icons/shield.svg', // Placeholder for the shield logo
  }
};
