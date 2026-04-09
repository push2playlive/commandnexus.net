import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, ShieldCheck, Copy, ExternalLink, History, Send, Download, Zap } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  asset: string;
  status: 'confirmed' | 'pending';
  timestamp: string;
  address: string;
}

export const NexusWallet: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [view, setView] = useState<'overview' | 'send' | 'receive'>('overview');
  const [balance, setBalance] = useState({ eth: '12.45', nexus: '4,500' });
  const [sendForm, setSendForm] = useState({ recipient: '', amount: '', asset: 'ETH' });
  const [isSending, setIsSending] = useState(false);
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'receive', amount: '2.5', asset: 'ETH', status: 'confirmed', timestamp: '2026-04-08 10:20', address: '0x71C...3e4' },
    { id: '2', type: 'send', amount: '0.8', asset: 'ETH', status: 'confirmed', timestamp: '2026-04-07 15:45', address: '0x12a...9b2' },
    { id: '3', type: 'receive', amount: '1,200', asset: 'NEXUS', status: 'confirmed', timestamp: '2026-04-06 09:12', address: '0xNexus...Alpha' },
    { id: '4', type: 'send', amount: '0.1', asset: 'ETH', status: 'pending', timestamp: 'Just now', address: '0x882...f11' },
  ]);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
    alert('Address copied to clipboard');
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendForm.recipient || !sendForm.amount) return;

    setIsSending(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'send',
      amount: sendForm.amount,
      asset: sendForm.asset,
      status: 'pending',
      timestamp: 'Just now',
      address: sendForm.recipient.length > 10 ? `${sendForm.recipient.slice(0, 6)}...${sendForm.recipient.slice(-4)}` : sendForm.recipient
    };

    setTransactions([newTx, ...transactions]);
    
    // Update balance (simulated)
    if (sendForm.asset === 'ETH') {
      setBalance(prev => ({ ...prev, eth: (parseFloat(prev.eth) - parseFloat(sendForm.amount)).toFixed(2) }));
    } else {
      setBalance(prev => ({ ...prev, nexus: (parseInt(prev.nexus.replace(',', '')) - parseInt(sendForm.amount)).toLocaleString() }));
    }

    setIsSending(false);
    setView('overview');
    setSendForm({ recipient: '', amount: '', asset: 'ETH' });
    alert('Transaction Broadcasted to Nexus Network');
  };

  if (!isConnected) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <Wallet className="w-24 h-24 text-primary relative z-10" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-[0.2em] text-zinc-100 uppercase">Nexus Tactical Wallet</h2>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Secure Cryptographic Asset Management</p>
        </div>
        <button 
          onClick={handleConnect}
          className="px-8 py-3 bg-primary text-primary-foreground font-black text-xs rounded-lg uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          Initialize Connection
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2">
      <AnimatePresence mode="wait">
        {view === 'overview' ? (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Balance & Assets */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card/50 border border-border p-6 rounded-2xl backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Wallet className="w-24 h-24 rotate-12" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Primary Vault</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-mono text-emerald-500 uppercase">Live</span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-8">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Total Balance (ETH)</span>
                    <div className="text-4xl font-black text-zinc-100 tracking-tighter flex items-baseline gap-2">
                      {balance.eth} <span className="text-sm text-primary">ETH</span>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">â‰ˆ $42,391.20 USD</div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setView('send')}
                      className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg border border-zinc-700 uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3 h-3" /> Send
                    </button>
                    <button 
                      onClick={() => setView('receive')}
                      className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg border border-zinc-700 uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-3 h-3" /> Receive
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border p-6 rounded-2xl backdrop-blur-md">
                <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Asset Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <span className="text-[10px] font-bold text-blue-400">ETH</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-100">Ethereum</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{balance.eth} ETH</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-zinc-100">${(parseFloat(balance.eth) * 2285).toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-500">+2.4%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span className="text-[10px] font-bold text-primary">NXS</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-100">Nexus Token</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{balance.nexus} NXS</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-zinc-100">${(parseInt(balance.nexus.replace(',', '')) * 3.1).toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-500">+12.8%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="lg:col-span-2 bg-card/50 border border-border rounded-2xl backdrop-blur-md flex flex-col overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between bg-zinc-900/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <History className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Transaction Ledger</h3>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">On-Chain Activity Log</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-6">
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="bg-black/40 border border-border p-4 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          tx.type === 'receive' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {tx.type === 'receive' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
                              {tx.type === 'receive' ? 'Received' : 'Sent'} {tx.asset}
                            </span>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${
                              tx.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500 animate-pulse'
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono mt-1">
                            {tx.type === 'receive' ? 'From: ' : 'To: '} {tx.address}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-black ${
                          tx.type === 'receive' ? 'text-emerald-500' : 'text-zinc-100'
                        }`}>
                          {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.asset}
                        </div>
                        <div className="text-[9px] text-zinc-600 font-mono">{tx.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-zinc-900/40 border-t border-border">
                <div className="flex items-center justify-between bg-black/40 border border-border p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Connected Address</div>
                      <div className="text-xs font-bold text-zinc-100 font-mono">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={copyAddress}
                      className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors"
                      title="Copy Address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors" title="View on Etherscan">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : view === 'send' ? (
          <motion.div 
            key="send"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-xl mx-auto bg-card/50 border border-border p-8 rounded-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setView('overview')} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
                <ArrowDownLeft className="w-5 h-5 rotate-45" />
              </button>
              <div>
                <h3 className="text-zinc-100 font-bold text-lg tracking-widest uppercase">Broadcast Transaction</h3>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Secure Asset Transfer Protocol</p>
              </div>
            </div>

            <form onSubmit={handleSend} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Recipient Address</label>
                <input 
                  type="text"
                  placeholder="0x..."
                  value={sendForm.recipient}
                  onChange={(e) => setSendForm({ ...sendForm, recipient: e.target.value })}
                  className="w-full bg-black/40 border border-border p-3 rounded-lg text-zinc-100 font-mono text-xs focus:border-primary outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Asset</label>
                  <select 
                    value={sendForm.asset}
                    onChange={(e) => setSendForm({ ...sendForm, asset: e.target.value })}
                    className="w-full bg-black/40 border border-border p-3 rounded-lg text-zinc-100 font-mono text-xs focus:border-primary outline-none transition-colors appearance-none"
                  >
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="NEXUS">Nexus Token (NXS)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Amount</label>
                  <input 
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={sendForm.amount}
                    onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                    className="w-full bg-black/40 border border-border p-3 rounded-lg text-zinc-100 font-mono text-xs focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-zinc-500 uppercase">Network Fee</span>
                  <span className="text-primary">0.00042 ETH</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-zinc-500 uppercase">Estimated Time</span>
                  <span className="text-zinc-300">&lt; 30 Seconds</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-primary text-primary-foreground font-black text-xs rounded-lg uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Broadcasting...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Confirm & Send
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="receive"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-xl mx-auto bg-card/50 border border-border p-8 rounded-2xl backdrop-blur-md text-center"
          >
            <div className="flex items-center gap-4 mb-8 text-left">
              <button onClick={() => setView('overview')} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
                <ArrowDownLeft className="w-5 h-5 rotate-45" />
              </button>
              <div>
                <h3 className="text-zinc-100 font-bold text-lg tracking-widest uppercase">Receive Assets</h3>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Inbound Tactical Uplink</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-8">
              <div className="p-4 bg-white rounded-2xl relative group">
                {/* Simulated QR Code */}
                <div className="w-48 h-48 bg-black flex flex-wrap p-1">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`} />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-2xl">
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest">Scan QR</span>
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Your Public Address</label>
                  <div className="flex items-center gap-2 bg-black/40 border border-border p-3 rounded-lg">
                    <span className="flex-1 text-zinc-100 font-mono text-xs truncate">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
                    <button onClick={copyAddress} className="p-1.5 hover:bg-zinc-800 rounded text-primary transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-left flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-400 font-mono leading-relaxed">
                    Only send <span className="text-zinc-100">Ethereum (ETH)</span> or <span className="text-zinc-100">Nexus Tokens (NXS)</span> to this address. Sending other assets may result in permanent loss.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setView('overview')}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all border border-zinc-700"
              >
                Return to Overview
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
