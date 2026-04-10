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
  const [lastTxId, setLastTxId] = useState<string | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [txIdSearch, setTxIdSearch] = useState('');
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'send' | 'receive'>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'receive', amount: '2.5', asset: 'ETH', status: 'confirmed', timestamp: '2026-04-08 10:20', address: '0x71C...3e4' },
    { id: '2', type: 'send', amount: '0.8', asset: 'ETH', status: 'confirmed', timestamp: '2026-04-07 15:45', address: '0x12a...9b2' },
    { id: '3', type: 'receive', amount: '1,200', asset: 'NEXUS', status: 'confirmed', timestamp: '2026-04-06 09:12', address: '0xNexus...Alpha' },
    { id: '4', type: 'send', amount: '0.1', asset: 'ETH', status: 'pending', timestamp: 'Just now', address: '0x882...f11' },
  ]);

  const [copyStatus, setCopyStatus] = useState(false);
  
  const handleConnect = () => {
    setIsConnected(true);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendForm.recipient || !sendForm.amount) return;

    setIsSending(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const txId = Math.random().toString(36).substr(2, 9);
    const newTx: Transaction = {
      id: txId,
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
    setLastTxId(txId);
    setSendForm({ recipient: '', amount: '', asset: 'ETH' });
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTxId = tx.id.toLowerCase().includes(txIdSearch.toLowerCase());
    const matchesAsset = assetFilter ? tx.asset.toUpperCase() === assetFilter.toUpperCase() : true;
    const matchesType = typeFilter === 'all' ? true : tx.type === typeFilter;
    return matchesSearch && matchesTxId && matchesAsset && matchesType;
  });

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
    <div className="h-full pr-2">
      <AnimatePresence mode="wait">
        {lastTxId ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center relative z-10">
                <ShieldCheck className="w-10 h-10 text-emerald-500" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-100 uppercase tracking-widest mb-2">Broadcast Successful</h3>
              <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Transaction ID: {lastTxId}</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl max-w-xs w-full">
              <p className="text-[10px] text-zinc-400 font-mono leading-relaxed">
                Your transaction has been broadcasted to the Nexus Network. It will appear in your ledger as 'Confirmed' once the next block is validated.
              </p>
            </div>
            <button 
              onClick={() => {
                setLastTxId(null);
                setView('overview');
              }}
              className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-black text-xs rounded-lg uppercase tracking-[0.2em] transition-all border border-zinc-700"
            >
              Return to Command
            </button>
          </motion.div>
        ) : view === 'overview' ? (
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
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Primary Vault</span>
                      <span className="text-[8px] font-mono text-zinc-600 uppercase">Nexus Mainnet // Node 01</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold">Live</span>
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Portfolio Performance</h3>
                  <div className="flex gap-1">
                    {['1D', '1W', '1M', 'ALL'].map(t => (
                      <button key={t} className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${t === '1W' ? 'bg-primary/20 text-primary' : 'text-zinc-600 hover:text-zinc-400'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="h-24 flex items-end gap-1 mb-4">
                  {[40, 60, 45, 70, 55, 85, 65, 90, 75, 95, 80, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05 }}
                      className="flex-1 bg-gradient-to-t from-primary/5 to-primary/40 rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[8px] text-zinc-600 font-mono uppercase">
                  <span>04 APR</span>
                  <span>TODAY</span>
                </div>
              </div>

              <div className="bg-card/50 border border-border p-6 rounded-2xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Asset Distribution</h3>
                  {assetFilter && (
                    <button 
                      onClick={() => setAssetFilter(null)}
                      className="text-[8px] text-primary hover:underline uppercase font-mono"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <button 
                    onClick={() => setAssetFilter(assetFilter === 'ETH' ? null : 'ETH')}
                    className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors ${assetFilter === 'ETH' ? 'bg-primary/10 border border-primary/30' : 'hover:bg-zinc-800/50 border border-transparent'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <span className="text-[10px] font-bold text-blue-400">ETH</span>
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-zinc-100">Ethereum</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{balance.eth} ETH</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-zinc-100">${(parseFloat(balance.eth) * 2285).toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-500">+2.4%</div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setAssetFilter(assetFilter === 'NEXUS' ? null : 'NEXUS')}
                    className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors ${assetFilter === 'NEXUS' ? 'bg-primary/10 border border-primary/30' : 'hover:bg-zinc-800/50 border border-transparent'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span className="text-[10px] font-bold text-primary">NXS</span>
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-zinc-100">Nexus Token</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{balance.nexus} NXS</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-zinc-100">${(parseInt(balance.nexus.replace(',', '')) * 3.1).toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-500">+12.8%</div>
                    </div>
                  </button>
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
                    <div className="flex items-center gap-2">
                      <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Transaction Ledger</h3>
                      <span className="text-[8px] px-1.5 py-0.5 bg-primary/20 text-primary rounded font-black uppercase tracking-tighter">Core Feature</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">On-Chain Activity Log</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex bg-black/40 p-1 rounded-lg border border-zinc-800 hidden xl:flex">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'send', label: 'Sent' },
                      { id: 'receive', label: 'Received' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTypeFilter(t.id as any)}
                        className={`px-3 py-1 text-[9px] font-bold uppercase rounded-md transition-all ${
                          typeFilter === t.id ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <div className="relative hidden md:block">
                    <History className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                    <input 
                      type="text"
                      placeholder="Search Ledger..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-black/40 border border-zinc-800 py-1.5 pl-8 pr-4 rounded-lg text-[10px] font-mono text-zinc-300 focus:border-primary outline-none transition-colors w-32"
                    />
                  </div>
                  <div className="relative hidden md:block">
                    <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-primary" />
                    <input 
                      type="text"
                      placeholder="TX ID..."
                      value={txIdSearch}
                      onChange={(e) => setTxIdSearch(e.target.value)}
                      className="bg-black/40 border border-primary/20 py-1.5 pl-8 pr-4 rounded-lg text-[10px] font-mono text-primary focus:border-primary outline-none transition-colors w-24"
                    />
                  </div>
                  <button 
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`p-2 rounded-full transition-colors ${showAdvancedFilters ? 'bg-primary/20 text-primary' : 'hover:bg-zinc-800 text-zinc-500'}`}
                    title="Advanced Filters"
                  >
                    <ArrowDownLeft className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                  </button>
                  <button className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showAdvancedFilters && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-zinc-900/60 border-b border-border overflow-hidden"
                  >
                    <div className="p-4 flex flex-wrap gap-4 items-end">
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Transaction Type</label>
                        <div className="flex bg-black/40 p-1 rounded-lg border border-zinc-800">
                          {['all', 'send', 'receive'].map((t) => (
                            <button
                              key={t}
                              onClick={() => setTypeFilter(t as any)}
                              className={`px-3 py-1 text-[9px] font-bold uppercase rounded-md transition-all ${
                                typeFilter === t ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Asset Class</label>
                        <div className="flex bg-black/40 p-1 rounded-lg border border-zinc-800">
                          {[null, 'ETH', 'NEXUS'].map((a) => (
                            <button
                              key={a || 'all'}
                              onClick={() => setAssetFilter(a)}
                              className={`px-3 py-1 text-[9px] font-bold uppercase rounded-md transition-all ${
                                assetFilter === a ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {a || 'all'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setTxIdSearch('');
                          setAssetFilter(null);
                          setTypeFilter('all');
                        }}
                        className="px-3 py-2 text-[9px] font-bold uppercase text-zinc-500 hover:text-primary transition-colors ml-auto"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 p-6 overflow-auto custom-scrollbar">
                {/* Column Headers */}
                <div className="grid grid-cols-12 gap-4 px-4 mb-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden md:grid">
                  <div className="col-span-1">Type</div>
                  <div className="col-span-4">Details / Address</div>
                  <div className="col-span-2">Asset</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-3 text-right">Amount / Time</div>
                </div>

                <div className="space-y-3">
                  {filteredTransactions.length > 0 ? filteredTransactions.map((tx) => (
                    <button 
                      key={tx.id} 
                      onClick={() => setSelectedTx(tx)}
                      className="w-full bg-black/40 border border-border p-4 rounded-xl hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Type Icon */}
                        <div className="col-span-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            tx.type === 'receive' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                          }`}>
                            {tx.type === 'receive' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                          </div>
                        </div>

                        {/* Details / Address */}
                        <div className="col-span-4">
                          <div className="text-xs font-bold text-zinc-100 uppercase tracking-wider mb-1">
                            {tx.type === 'receive' ? 'Received' : 'Sent'}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono truncate">
                            {tx.address}
                          </div>
                        </div>

                        {/* Asset */}
                        <div className="col-span-2 hidden md:block">
                          <span className="text-[10px] font-mono text-zinc-300 uppercase">{tx.asset}</span>
                        </div>

                        {/* Status */}
                        <div className="col-span-2 hidden md:block">
                          <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            tx.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500 animate-pulse'
                          }`}>
                            {tx.status}
                          </span>
                        </div>

                        {/* Amount / Time */}
                        <div className="col-span-3 text-right">
                          <div className={`text-sm font-black ${
                            tx.type === 'receive' ? 'text-emerald-500' : 'text-zinc-100'
                          }`}>
                            {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.asset}
                          </div>
                          <div className="text-[9px] text-zinc-600 font-mono mt-1">{tx.timestamp}</div>
                        </div>
                      </div>
                    </button>
                  )) : (
                    <div className="h-48 flex flex-col items-center justify-center text-zinc-600 space-y-2">
                      <History className="w-8 h-8 opacity-20" />
                      <p className="text-[10px] font-mono uppercase tracking-widest">No matching transactions found</p>
                    </div>
                  )}
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
                      className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors relative"
                      title="Copy Address"
                    >
                      <Copy className="w-4 h-4" />
                      <AnimatePresence>
                        {copyStatus && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-white text-[8px] font-bold rounded uppercase whitespace-nowrap"
                          >
                            Copied
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                    <div className="relative">
                      <select 
                        value={sendForm.asset}
                        onChange={(e) => setSendForm({ ...sendForm, asset: e.target.value })}
                        className="w-full bg-black/40 border border-border p-3 rounded-lg text-zinc-100 font-mono text-xs focus:border-primary outline-none transition-colors appearance-none"
                      >
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="NEXUS">Nexus Token (NXS)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <ArrowDownLeft className="w-3 h-3 rotate-[225deg]" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Amount</label>
                      <button 
                        type="button"
                        onClick={() => setSendForm({ ...sendForm, amount: sendForm.asset === 'ETH' ? balance.eth : balance.nexus.replace(',', '') })}
                        className="text-[8px] text-primary hover:underline uppercase font-mono"
                      >
                        Max
                      </button>
                    </div>
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

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedTx.type === 'receive' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {selectedTx.type === 'receive' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-zinc-100 font-bold text-sm tracking-widest uppercase">Transaction Details</h3>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{selectedTx.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTx(null)}
                  className="text-zinc-500 hover:text-zinc-100 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 rotate-45" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/40 border border-zinc-800 rounded-xl">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Amount</div>
                    <div className={`text-lg font-black ${selectedTx.type === 'receive' ? 'text-emerald-500' : 'text-zinc-100'}`}>
                      {selectedTx.type === 'receive' ? '+' : '-'}{selectedTx.amount} {selectedTx.asset}
                    </div>
                  </div>
                  <div className="p-4 bg-black/40 border border-zinc-800 rounded-xl">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Status</div>
                    <div className={`text-xs font-bold uppercase ${selectedTx.status === 'confirmed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {selectedTx.status}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Timestamp</div>
                    <div className="text-xs text-zinc-300 font-mono">{selectedTx.timestamp}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{selectedTx.type === 'receive' ? 'Sender' : 'Recipient'} Address</div>
                    <div className="text-xs text-zinc-300 font-mono break-all bg-black/40 p-3 rounded-lg border border-zinc-800">
                      0x71C7656EC7ab88b098defB751B7401B5f6d8976F...{selectedTx.address}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Network Fee</div>
                    <div className="text-xs text-zinc-300 font-mono">0.00042 ETH</div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg border border-zinc-700 uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <ExternalLink className="w-3 h-3" /> Explorer
                  </button>
                  <button 
                    onClick={() => setSelectedTx(null)}
                    className="flex-1 py-3 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
