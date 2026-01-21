import React, { useState } from 'react';
import { GlassCard, GlassButton, Badge } from './GlassUI';
import { LotteryInfo, Pack } from '../types';
import { Timer, Ticket, Coins, Plus, Minus, Gift } from 'lucide-react';

interface DailyDrawProps {
  lottery: LotteryInfo;
  dailyPack: Pack;
  walletConnected: boolean;
  onBuyTickets: (amount: number, totalCost: number) => void;
  onClaimDaily: (pack: Pack) => void;
}

export const DailyDraw: React.FC<DailyDrawProps> = ({ 
  lottery, 
  dailyPack, 
  walletConnected, 
  onBuyTickets,
  onClaimDaily 
}) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const incrementTickets = () => setTicketQuantity(prev => Math.min(prev + 1, 100));
  const decrementTickets = () => setTicketQuantity(prev => Math.max(prev - 1, 1));

  const totalCost = ticketQuantity * lottery.ticketPrice;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-tech font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 neon-gold">
          Daily Zalotta Draw
        </h2>
        <p className="text-white/60">Win big with daily creator coin jackpots and exclusive pack drops.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LOTTERY SECTION - Takes up 3/5 columns */}
        <div className="lg:col-span-3">
          <GlassCard className="h-full border-yellow-500/30 bg-gradient-to-br from-yellow-900/10 to-transparent relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6">
              <Badge color="bg-yellow-500">
                <span className="flex items-center gap-1"><Timer size={10} /> ENDS IN {lottery.endsIn}</span>
              </Badge>
              <div className="flex items-center gap-2 text-yellow-400">
                <Ticket size={18} />
                <span className="font-bold tracking-widest text-sm">{lottery.participants} PLAYERS</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
               <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-yellow-500/50 overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                     <img src={lottery.jackpotCoin.imageUrl} alt="Jackpot" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-bold text-xs px-2 py-0.5 rounded-full uppercase">
                    Jackpot
                  </div>
               </div>
               
               <div className="text-center md:text-left flex-1">
                 <h3 className="text-lg text-white/60 font-tech uppercase tracking-wider">Today's Prize Pool</h3>
                 <div className="text-5xl font-bold font-mono text-yellow-400 drop-shadow-lg">
                    {lottery.poolAmount.toLocaleString()} <span className="text-2xl text-yellow-200/80">{lottery.jackpotCoin.symbol}</span>
                 </div>
                 <p className="text-sm text-white/40 mt-2">1 Ticket = 1 Entry. Winner takes all.</p>
               </div>
            </div>

            {/* Ticket Purchasing Interface */}
            <div className="bg-black/20 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="text-sm text-white/50 uppercase tracking-widest mb-1">Quantity</div>
                        <div className="flex items-center gap-4 bg-white/5 rounded-lg p-1 border border-white/10">
                            <button onClick={decrementTickets} className="p-2 hover:bg-white/10 rounded-md transition-colors"><Minus size={16}/></button>
                            <span className="font-mono text-xl w-12 text-center">{ticketQuantity}</span>
                            <button onClick={incrementTickets} className="p-2 hover:bg-white/10 rounded-md transition-colors"><Plus size={16}/></button>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                         <div className="text-sm text-white/50 uppercase tracking-widest mb-1">Total Cost</div>
                         <div className="text-2xl font-bold text-white">${totalCost.toFixed(2)}</div>
                    </div>

                    <GlassButton 
                        onClick={() => onBuyTickets(ticketQuantity, totalCost)}
                        className={`w-full md:w-auto min-w-[180px] ${!walletConnected && 'opacity-50 cursor-not-allowed'}`}
                        variant="primary"
                    >
                        {walletConnected ? (
                           <>
                             <span>Mint Tickets</span>
                             <Ticket size={18} className="ml-2" />
                           </>
                        ) : 'Connect to Play'}
                    </GlassButton>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/30">
                    <Coins size={12} />
                    <span>Powered by Zora Protocol</span>
                </div>
            </div>
          </GlassCard>
        </div>

        {/* DAILY PACK SECTION - Takes up 2/5 columns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <GlassCard className="flex-1 border-blue-500/30 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 bg-blue-500/20 blur-[60px] rounded-full"></div>
              
              <div>
                <div className="flex justify-between items-start mb-4">
                    <Badge color="bg-blue-500">DAILY DROP</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">{dailyPack.name}</h3>
                <p className="text-white/60 text-sm mb-4">Curated selection of trending creator coins at a special daily mint price.</p>
                
                <div className="space-y-2 mb-6 bg-black/20 p-3 rounded-lg">
                    {dailyPack.contents.slice(0, 3).map((coin, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-white/5 last:border-0 pb-1 last:pb-0">
                            <span className="text-white/70">{coin.name}</span>
                            <span className="font-mono text-white/50">{coin.symbol}</span>
                        </div>
                    ))}
                </div>
              </div>

              <div className="mt-auto">
                 <div className="flex justify-between items-end mb-4">
                    <div className="text-sm line-through text-white/40">$60.00</div>
                    <div className="text-2xl font-bold text-green-400 font-mono">${dailyPack.price}</div>
                 </div>
                 <GlassButton className="w-full" onClick={() => onClaimDaily(dailyPack)}>
                    <Gift size={16} /> Claim Daily Pack
                 </GlassButton>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};