import React, { useState } from 'react';
import { GlassCard, GlassButton, Badge } from './GlassUI';
import { Pack } from '../types';
import { ShoppingBag, ChevronDown } from 'lucide-react';

interface MarketplaceProps {
  packs: Pack[];
  onBuy: (pack: Pack) => void;
  walletConnected: boolean;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ packs, onBuy, walletConnected }) => {
  const [filter, setFilter] = useState<string>('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredPacks = filter === 'All' 
    ? packs 
    : packs.filter(p => p.rarity === filter);

  const rarities = ['All', 'Common', 'Rare', 'Legendary', 'Holographic'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-tech font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 uppercase">
            $PACKS Marketplace
          </h2>
          <p className="text-white/60 text-sm mt-1">Acquire index funds of top Zora creators</p>
        </div>
        
        <div className="relative">
          <GlassButton 
            variant="secondary" 
            className="!py-2 !px-4 text-xs flex items-center gap-2 min-w-[150px] justify-between"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Filter: {filter}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </GlassButton>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-full glass-panel !p-1 z-20 flex flex-col gap-1 bg-black/90 backdrop-blur-xl border-white/20">
              {rarities.map((rarity) => (
                <button
                  key={rarity}
                  onClick={() => {
                    setFilter(rarity);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    text-left px-3 py-2 rounded-lg text-xs transition-colors w-full
                    ${filter === rarity ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-white/60 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  {rarity}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPacks.map((pack) => {
          const profitMargin = ((pack.totalValue - pack.price) / pack.price) * 100;
          
          return (
            <GlassCard key={pack.id} interactive className="group hover:border-white/40">
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity bg-gradient-to-bl ${pack.color} w-32 h-32 rounded-bl-full blur-2xl`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <Badge color={pack.rarity === 'Legendary' ? 'bg-yellow-500' : pack.rarity === 'Rare' ? 'bg-pink-500' : 'bg-blue-500'}>
                  {pack.rarity}
                </Badge>
                {/* Updated ROI Badge */}
                <Badge color="bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  ROI +{pack.roi}%
                </Badge>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">{pack.name}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-white/60 border-b border-white/5 pb-1">
                  <span>Contents</span>
                  <span className="text-white">{pack.contents.length} Creator Coins</span>
                </div>
                <div className="flex justify-between items-center text-sm text-white/60 border-b border-white/5 pb-1">
                  <span>Total Value</span>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-white leading-none">${pack.totalValue.toFixed(2)}</span>
                    <span className="text-[10px] text-green-400 font-mono mt-0.5">
                      (+{profitMargin.toFixed(1)}% Margin)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-white/60">
                  <span>Market Price</span>
                  <span className="font-mono text-lg text-white font-bold">${pack.price}</span>
                </div>
              </div>

              <GlassButton 
                className="w-full" 
                onClick={() => onBuy(pack)}
              >
                {walletConnected ? 'Purchase Pack' : 'Connect to Buy'}
                <ShoppingBag size={16} />
              </GlassButton>
            </GlassCard>
          );
        })}
        {filteredPacks.length === 0 && (
            <div className="col-span-full py-20 text-center text-white/40 border border-white/5 rounded-2xl border-dashed">
                No packs found with {filter} rarity.
            </div>
        )}
      </div>
    </div>
  );
};