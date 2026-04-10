import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Crown, Check, Download, FileText, BarChart, Globe, Cpu, Headphones } from 'lucide-react';

export const PricingPlans: React.FC = () => {
  const plans = [
    {
      name: 'Entry Level',
      price: '$49',
      description: 'Strategic Operations',
      icon: Shield,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-400/10',
      borderColor: 'border-zinc-800',
      features: [
        'Basic Visitor Tracking',
        'Manual Security Scans',
        'Weekly Reports',
        '1 Frontend Application',
        'Standard Support'
      ]
    },
    {
      name: 'Professional',
      price: '$149',
      description: 'Most Sophisticated',
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
      popular: true,
      features: [
        'Real-time Monitoring',
        'AI Security Scanning',
        'Daily Reports (PDF/CSV)',
        '5 Frontend Applications',
        'White Label Dashboard',
        'Priority Support'
      ]
    },
    {
      name: 'White Label Lease',
      price: '$999',
      description: 'Enterprise Dominance',
      icon: Crown,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      features: [
        'Unlimited Applications',
        'Automated AI Repairs',
        'Full Custom Branding',
        'Custom Domain Mapping',
        'Google Trends Integration',
        'Dedicated Support Node'
      ]
    }
  ];

  return (
    <div className="space-y-4 py-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-black text-zinc-100 tracking-[0.2em] uppercase mb-1">Command Center // plans</h2>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Select your tactical operational tier</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg border border-zinc-700 uppercase tracking-widest transition-all flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg border border-zinc-700 uppercase tracking-widest transition-all flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative bg-zinc-900/50 border ${plan.borderColor} p-8 rounded-2xl backdrop-blur-md flex flex-col group hover:scale-[1.02] transition-all duration-300`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                Recommended
              </div>
            )}

            <div className="mb-8">
              <div className={`w-12 h-12 ${plan.bgColor} ${plan.color} rounded-xl flex items-center justify-center mb-6 border border-current/20`}>
                <plan.icon className="w-6 h-6" />
              </div>
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">{plan.description}</div>
              <h3 className="text-xl font-black text-zinc-100 uppercase tracking-wider mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-zinc-100">{plan.price}</span>
                <span className="text-zinc-500 font-mono text-xs">/mo</span>
              </div>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-zinc-400">
                  <div className={`p-0.5 rounded-full ${plan.bgColor} ${plan.color}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-tight">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
              plan.popular 
                ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]' 
                : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700'
            }`}>
              Initialize Uplink
            </button>

            {/* Industrial Accents */}
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-1 h-1 bg-zinc-800 rounded-full" />
              <div className="w-1 h-1 bg-zinc-800 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Strategy Note */}
      <div className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-zinc-800 rounded-lg">
          <BarChart className="w-6 h-6 text-zinc-500" />
        </div>
        <div>
          <h4 className="text-zinc-100 font-bold text-[10px] uppercase tracking-widest mb-1">Strategic Operations Briefing</h4>
          <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
            All plans include core Nexus security protocols. Professional and White Label tiers provide advanced AI-driven offensive capabilities and real-time market displacement tools.
          </p>
        </div>
      </div>
    </div>
  );
};
