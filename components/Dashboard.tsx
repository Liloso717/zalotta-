import React from 'react';
import { GlassCard, GlassButton } from './GlassUI';
import { UserStats } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Flame, Wallet } from 'lucide-react';

interface DashboardProps {
  stats: UserStats;
  walletConnected: boolean;
}

const data = [
  { name: 'Mon', pnl: 400 },
  { name: 'Tue', pnl: 300 },
  { name: 'Wed', pnl: 600 },
  { name: 'Thu', pnl: 800 },
  { name: 'Fri', pnl: 750 },
  { name: 'Sat', pnl: 1100 },
  { name: 'Sun', pnl: 1250 },
];

export const Dashboard: React.FC<DashboardProps> = ({ stats, walletConnected }) => {
  if (!walletConnected) {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="text-center">
                <Wallet size={64} className="mx-auto text-white/20 mb-4" />
                <h3 className="text-xl font-bold mb-2">Wallet Disconnected</h3>
                <p className="text-white/50 max-w-xs mx-auto">Connect your wallet to view your personal staking yield, PnL, and inventory.</p>
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="text-center !p-4">
          <div className="text-xs text-white/50 uppercase">Net Worth</div>
          <div className="text-2xl font-mono font-bold">${stats.balance.toLocaleString()}</div>
        </GlassCard>
        <GlassCard className="text-center !p-4">
          <div className="text-xs text-white/50 uppercase">Daily Yield</div>
          <div className="text-2xl font-mono font-bold text-green-400">+${stats.dailyYield}</div>
        </GlassCard>
        <GlassCard className="text-center !p-4">
          <div className="text-xs text-white/50 uppercase">Packs Held</div>
          <div className="text-2xl font-mono font-bold">{stats.packsOwned}</div>
        </GlassCard>
        
        {/* Updated PnL Card */}
        <GlassCard className="text-center !p-4 border-yellow-500/30 bg-yellow-500/5">
          <div className="text-xs text-yellow-200/60 uppercase tracking-widest">Total PnL</div>
          <div className="text-3xl font-mono font-bold text-yellow-400 neon-gold">+{stats.pnl}%</div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-96">
        {/* PnL Chart */}
        <GlassCard className="md:col-span-2 flex flex-col">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Flame size={18} className="text-orange-500" />
                ROI Performance
            </h3>
            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                    <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="pnl" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPnl)" />
                </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>

        {/* Circular Baking Economy */}
        <GlassCard className="relative flex flex-col items-center justify-center">
            <h3 className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-white/50">Staking Node</h3>
            
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-green-400 animate-spin duration-[10000ms]"></div>
                {/* Inner Ring */}
                <div className="absolute inset-4 rounded-full border-4 border-white/5 border-r-blue-500 animate-spin duration-[5000ms] reverse"></div>
                
                <div className="text-center">
                    <div className="text-3xl font-bold font-mono text-white">4.2%</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">APY</div>
                </div>
            </div>

            <GlassButton className="mt-6 w-full text-sm">
                <Play size={14} /> Bake $PACKS
            </GlassButton>
        </GlassCard>
      </div>
    </div>
  );
};