export type AgentStatus = 'Working' | 'Idle' | 'Dispatched';

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  shift: string;
  task: string;
}

export interface Threat {
  id: string;
  type: string;
  source: string;
  timestamp: string;
  status: 'blocked' | 'monitored';
}

export interface UserIntent {
  id: string;
  keyword: string;
  action: string;
  timestamp: string;
}

export interface Trend {
  id: string;
  user: string;
  engagement: number; // 0-100
  type: 'Thinker' | 'Creator' | 'Standard';
}

export interface GlobalTrend {
  id: string;
  topic: string;
  velocity: number;
  region: string;
}

export interface SalesMetric {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down';
  percentage: number;
}

export interface SecurityEvent {
  id: string;
  type: 'Geo-Velocity' | 'Credential Stuffing' | 'Data Movement' | 'IP Reputation';
  severity: 'Critical' | 'High' | 'Medium';
  details: string;
  ip: string;
  timestamp: string;
}

export interface BlacklistedIP {
  ip: string;
  reason: string;
  threatLevel: number;
  expiresAt: string;
}

export interface NexusConfig {
  shell_name: string;
  nexus_env: 'development' | 'production' | 'maintenance';
  google_id: string;
}

export type TabCategory = 'THREAT SCAN' | 'INTEL MAP' | 'USER FEEDBACK' | 'AGENT COMMAND' | 'DIAGNOSTICS' | 'UTUBECHAT MARKET' | 'SHELL CONFIG' | 'SECURITY PULSE';
