import React, { useState } from 'react';
import { TabView, UserStats, Pack } from './types';
import { MOCK_PACKS, MOCK_TWEETS, MOCK_LOTTERY } from './services/mockData';
import { Marketplace } from './components/Marketplace';
import { MintReveal } from './components/MintReveal';
import { Dashboard } from './components/Dashboard';
import { SocialFeed } from './components/SocialFeed';
import { FlashMarket } from './components/FlashMarket';
import { DailyDraw } from './components/DailyDraw';
import { GlassButton } from './components/GlassUI';
import { LayoutGrid, ShoppingBag, Zap, Wallet, BarChart3, Twitter, Ticket } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.MARKET);
  const [walletConnected, setWalletConnected] = useState(false);
  
  // Mock User State
  const [userStats, setUserStats] = useState<UserStats>({
    balance: 0,
    packsOwned: 0,
    totalStaked: 0,
    dailyYield: 0,
    pnl: 0,
    ticketsOwned: 0
  });

  const [inventory, setInventory] = useState<Pack[]>([]);

  const connectWallet = () => {
    // Simulate connection
    setWalletConnected(true);
    setUserStats({
      balance: 12500,
      packsOwned: 4,
      totalStaked: 5000,
      dailyYield: 145,
      pnl: 24.5,
      ticketsOwned: 0
    });
    setInventory([MOCK_PACKS[0], MOCK_PACKS[0], MOCK_PACKS[1], MOCK_PACKS[2]]); // Give some starter packs
  };

  const handleBuy = (pack: Pack) => {
    if (!walletConnected) {
      alert("Please connect wallet first!");
      return;
    }
    if (userStats.balance < pack.price) {
        alert("Insufficient funds!");
        return;
    }
    setInventory([...inventory, pack]);
    setUserStats(prev => ({
        ...prev,
        balance: prev.balance - pack.price,
        packsOwned: prev.packsOwned + 1
    }));
    alert(`Bought ${pack.name}!`);
  };

  const handleBuyTickets = (amount: number, totalCost: number) => {
    if (!walletConnected) {
        alert("Please connect wallet first!");
        return;
    }
    if (userStats.balance < totalCost) {
        alert("Insufficient funds for tickets!");
        return;
    }

    setUserStats(prev => ({
        ...prev,
        balance: prev.balance - totalCost,
        ticketsOwned: prev.ticketsOwned + amount
    }));
    alert(`Successfully minted ${amount} lottery tickets for ${MOCK_LOTTERY.jackpotCoin.name} jackpot!`);
  };

  const handleClaimDaily = (pack: Pack) => {
      handleBuy(pack);
  };

  return (
    <div className="min-h-screen text-white flex flex-col md:flex-row">
      
      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 glass-panel border-t border-white/20 p-2 flex justify-around">
        <button onClick={() => setActiveTab(TabView.MARKET)} className={`p-2 rounded-lg ${activeTab === TabView.MARKET ? 'text-blue-400' : 'text-white/50'}`}><ShoppingBag /></button>
        <button onClick={() => setActiveTab(TabView.LOTTERY)} className={`p-2 rounded-lg ${activeTab === TabView.LOTTERY ? 'text-blue-400' : 'text-white/50'}`}><Ticket /></button>
        <button onClick={() => setActiveTab(TabView.MINT)} className={`p-2 rounded-lg ${activeTab === TabView.MINT ? 'text-blue-400' : 'text-white/50'}`}><Zap /></button>
        <button onClick={() => setActiveTab(TabView.DASHBOARD)} className={`p-2 rounded-lg ${activeTab === TabView.DASHBOARD ? 'text-blue-400' : 'text-white/50'}`}><LayoutGrid /></button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 glass-panel border-r border-white/10 h-screen sticky top-0 p-4 z-40">
        <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg flex items-center justify-center font-bold font-tech text-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]">Z</div>
            <span className="hidden lg:block font-tech font-bold text-xl tracking-wider">ZALOTTA</span>
        </div>

        <nav className="flex-1 space-y-2">
            <NavButton active={activeTab === TabView.MARKET} onClick={() => setActiveTab(TabView.MARKET)} icon={<ShoppingBag size={20}/>} label="Marketplace" />
            <NavButton active={activeTab === TabView.LOTTERY} onClick={() => setActiveTab(TabView.LOTTERY)} icon={<Ticket size={20}/>} label="Daily Draw" />
            <NavButton active={activeTab === TabView.MINT} onClick={() => setActiveTab(TabView.MINT)} icon={<Zap size={20}/>} label="Mint & Reveal" />
            <NavButton active={activeTab === TabView.FLASH} onClick={() => setActiveTab(TabView.FLASH)} icon={<BarChart3 size={20}/>} label="Flash Markets" />
            <NavButton active={activeTab === TabView.DASHBOARD} onClick={() => setActiveTab(TabView.DASHBOARD)} icon={<LayoutGrid size={20}/>} label="Dashboard" />
            <NavButton active={activeTab === TabView.SOCIAL} onClick={() => setActiveTab(TabView.SOCIAL)} icon={<Twitter size={20}/>} label="Live Feed" />
        </nav>

        <div className="pt-4 border-t border-white/10">
            {walletConnected ? (
                <div className="hidden lg:block p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex justify-between items-center mb-1">
                        <div className="text-[10px] text-green-400 uppercase font-bold">Wallet Active</div>
                        <div className="text-[10px] text-white/50">Zora Network</div>
                    </div>
                    <div className="font-mono text-sm truncate">0x71C...9A2</div>
                    <div className="mt-2 pt-2 border-t border-white/5 flex justify-between text-xs">
                        <span className="text-white/60">Tickets:</span>
                        <span className="font-bold text-yellow-400">{userStats.ticketsOwned}</span>
                    </div>
                </div>
            ) : (
                <GlassButton onClick={connectWallet} className="w-full !p-2 !text-xs justify-center">
                    <Wallet size={16} /> <span className="hidden lg:inline">Connect</span>
                </GlassButton>
            )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-x-hidden">
        {/* Header mobile only */}
        <div className="md:hidden flex justify-between items-center mb-6">
            <span className="font-tech font-bold text-xl tracking-wider">ZALOTTA</span>
            <GlassButton onClick={connectWallet} className="!py-1 !px-3 !text-xs">
                {walletConnected ? '0x...' : 'Connect'}
            </GlassButton>
        </div>

        {/* Dynamic Content */}
        <div className="max-w-6xl mx-auto h-full">
            {activeTab === TabView.MARKET && (
                <Marketplace packs={MOCK_PACKS} onBuy={handleBuy} walletConnected={walletConnected} />
            )}

            {activeTab === TabView.LOTTERY && (
                <DailyDraw 
                    lottery={MOCK_LOTTERY} 
                    dailyPack={MOCK_PACKS[0]} 
                    walletConnected={walletConnected}
                    onBuyTickets={handleBuyTickets}
                    onClaimDaily={handleClaimDaily}
                />
            )}

            {activeTab === TabView.MINT && (
                <div className="h-[calc(100vh-100px)]">
                    <MintReveal inventory={inventory} />
                </div>
            )}

            {activeTab === TabView.FLASH && (
                <FlashMarket />
            )}

            {activeTab === TabView.DASHBOARD && (
                <Dashboard stats={userStats} walletConnected={walletConnected} />
            )}

             {activeTab === TabView.SOCIAL && (
                <SocialFeed tweets={MOCK_TWEETS} />
            )}
        </div>
      </main>

      {/* Right Sidebar (Desktop Only - Social Feed Preview) */}
      <aside className="hidden xl:block w-80 glass-panel border-l border-white/10 h-screen sticky top-0 p-4 z-40">
        <SocialFeed tweets={MOCK_TWEETS} />
      </aside>

    </div>
  );
};

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`
            w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
            ${active ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-white/50 hover:bg-white/5 hover:text-white'}
        `}
    >
        {icon}
        <span className="hidden lg:block font-medium">{label}</span>
    </button>
);

export default App;