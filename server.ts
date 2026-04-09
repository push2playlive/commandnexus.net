import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for IP Lookup
  app.get('/api/lookup-ip', async (req, res) => {
    const { ip } = req.query;
    
    if (!ip || typeof ip !== 'string') {
      return res.status(400).json({ error: 'IP address is required' });
    }

    const apiKey = process.env.ABUSEIPDB_API_KEY;

    if (!apiKey) {
      console.warn('ABUSEIPDB_API_KEY is missing. Returning simulated data for demo purposes.');
      // Return simulated data if key is missing, but include a flag
      return res.json({
        data: {
          ipAddress: ip,
          abuseConfidenceScore: 84,
          totalReports: 1402,
          usageType: 'Data Center/Web Hosting/Transit',
          isp: 'DigitalOcean, LLC',
          domain: 'digitalocean.com',
          countryCode: 'US',
          isSimulated: true
        }
      });
    }

    try {
      const response = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`, {
        headers: {
          'Key': apiKey,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.errors?.[0]?.detail || 'AbuseIPDB API error' });
      }

      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error('Error fetching from AbuseIPDB:', error);
      res.status(500).json({ error: 'Internal server error during IP lookup' });
    }
  });

  // API Route for Google Trends Oracle
  app.post('/api/nexus-oracle-trends', async (req, res) => {
    const { interests } = req.body;
    
    // Simulate Google Trends data
    const simulatedTrends = [
      { word: 'Sustainable Woodworking', growth: 124, niche: 'Woodworking' },
      { word: 'AI Agent Orchestration', growth: 89, niche: 'AI' },
      { word: 'Hetzner V12 Optimization', growth: 56, niche: 'Tech' },
      { word: 'Bio-Digital Hygiene', growth: 42, niche: 'Hygiene' },
      { word: 'Canvas Art NFTs', growth: 15, niche: 'Art' },
    ].filter(t => !interests || interests.some((i: string) => t.niche.toLowerCase().includes(i.toLowerCase()) || t.word.toLowerCase().includes(i.toLowerCase())));

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({ trending_topics: simulatedTrends });
  });

  // API Route for Market Dispatcher (Offensive Intel)
  app.post('/api/market-dispatch', async (req, res) => {
    const { target } = req.body;
    
    if (!target) return res.status(400).json({ error: 'Target domain is required' });

    // Simulate scraping delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const simulatedLeads = [
      { id: '1', text: `Users on Reddit complaining about ${target} pricing.`, source: 'reddit.com/r/design', timestamp: new Date().toISOString() },
      { id: '2', text: `Review site mentions ${target} lacks real-time collaboration.`, source: 'g2.com/reviews', timestamp: new Date().toISOString() },
      { id: '3', text: `Twitter thread: "Looking for a better alternative to ${target} for video chat."`, source: 'twitter.com/search', timestamp: new Date().toISOString() },
      { id: '4', text: `${target} backlink found on high-authority blog: "Top 10 Design Tools 2026".`, source: 'techcrunch.com', timestamp: new Date().toISOString() },
    ];

    res.json({ 
      status: 'success', 
      message: `Deed Declared: Market Intel Gathered for ${target}.`,
      leads: simulatedLeads 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
