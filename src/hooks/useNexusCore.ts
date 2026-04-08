import { useState, useEffect } from 'react';
import { NexusConfig } from '../types';

// Mocking Supabase for the preview environment
const mockSupabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: string) => ({
        single: async () => {
          console.log(`Injecting DNA from ${table} where ${column} = ${value}`);
          // Simulate a successful fetch with the new DNA markers
          return {
            data: { 
              shell_name: 'COMMAND NEXUS ALPHA',
              nexus_env: 'production',
              google_id: 'G-NEXUS-777-ALPHA'
            },
            error: null
          };
        }
      })
    })
  })
};

declare global {
  interface Window {
    NEXUS_CONFIG: NexusConfig;
  }
}

export function useNexusCore() {
  const [core, setCore] = useState<{
    name: string;
    env: string;
    gId: string;
    loading: boolean;
  }>({ name: '', env: '', gId: '', loading: true });

  useEffect(() => {
    async function injectDNA() {
      const currentDomain = window.location.hostname;
      
      // In a real app, this would use the imported supabase client
      const { data, error } = await mockSupabase
        .from('nexus_identities')
        .select('shell_name, nexus_env, google_id')
        .eq('domain_url', currentDomain)
        .single();

      if (!error && data) {
        const config: NexusConfig = {
          shell_name: data.shell_name,
          nexus_env: data.nexus_env as any,
          google_id: data.google_id
        };

        setCore({
          name: config.shell_name,
          env: config.nexus_env,
          gId: config.google_id,
          loading: false
        });
        
        // Now these are "Articulated" in memory
        window.NEXUS_CONFIG = config;
      } else {
        setCore(prev => ({ ...prev, loading: false }));
      }
    }
    injectDNA();
  }, []);

  return core;
}
