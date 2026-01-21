import React, { useState } from 'react';
import { GlassCard, GlassButton } from './GlassUI';
import { Pack } from '../types';
import { Sparkles, Zap, Gift, Share2 } from 'lucide-react';

interface MintRevealProps {
  inventory: Pack[];
}

export const MintReveal: React.FC<MintRevealProps> = ({ inventory }) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedPack, setRevealedPack] = useState<Pack | null>(null);

  const handleReveal = () => {
    if (inventory.length === 0) return;
    
    setIsRevealing(true);
    // Simulate claw machine/reveal delay
    setTimeout(() => {
      const randomPack = inventory[Math.floor(Math.random() * inventory.length)];
      setRevealedPack(randomPack);
      setIsRevealing(false);
    }, 2500);
  };

  const handleShare = () => {
    // In a real app, this would use html2canvas or similar
    alert("Sharing your legendary pull to TikTok and X!");
  };

  if (revealedPack && !isRevealing) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-500">
        <GlassCard className="w-full max-w-md border-2 border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
          <div className="text-center space-y-6">
            <div className="inline-block p-4 rounded-full bg-white/10 mb-4 animate-bounce">
              <Gift size={48} className="text-yellow-400" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold font-tech text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 uppercase">
                {revealedPack.name}
              </h2>
              <p className="text-white/60 mt-2">You minted a {revealedPack.rarity} Index!</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-white/50 mb-2">Index Contents</h4>
              {revealedPack.contents.slice(0, 3).map((coin, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-1">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {coin.name}
                  </span>
                  <span className="font-mono">${coin.price}</span>
                </div>
              ))}
              <div className="text-xs text-center text-white/40 pt-2">+4 more items</div>
            </div>

            <div className="flex gap-4">
              <GlassButton className="flex-1" onClick={() => setRevealedPack(null)}>
                Mint Another
              </GlassButton>
              <GlassButton variant="secondary" onClick={handleShare}>
                <Share2 size={18} />
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6">
       <div className="text-center mb-4">
          <h2 className="text-3xl font-tech font-bold uppercase">Claw Mint</h2>
          <p className="text-white/60">Tap the claw to extract a random $PACK from the blockchain.</p>
        </div>

      <div className="relative flex-1 min-h-[400px] flex items-center justify-center">
        {/* Decorative Claw Machine Elements */}
        <div className="absolute inset-0 border-x border-white/10 rounded-3xl mx-8"></div>
        <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-blue-900/20 to-transparent blur-3xl"></div>

        {/* The Claw Trigger */}
        <div className="relative z-10 flex flex-col items-center gap-8">
            <div className={`
                w-1 h-24 bg-white/20 origin-top transition-all duration-1000
                ${isRevealing ? 'h-64' : 'h-24'}
            `}>
                <div className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full
                    w-16 h-16 border-4 border-white/40 rounded-full flex items-center justify-center
                    shadow-[0_0_20px_rgba(255,255,255,0.3)]
                    ${isRevealing ? 'scale-75' : 'scale-100'}
                `}>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            <button 
                onClick={handleReveal}
                disabled={isRevealing || inventory.length === 0}
                className={`
                    w-32 h-32 rounded-full glass-panel flex items-center justify-center
                    border-4 border-white/10 active:scale-95 transition-all duration-200
                    hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] group
                    ${isRevealing ? 'animate-pulse' : ''}
                `}
            >
                {isRevealing ? (
                    <Zap size={48} className="text-yellow-400 animate-spin" />
                ) : (
                    <div className="flex flex-col items-center">
                        <Sparkles size={48} className="text-blue-400 group-hover:text-white transition-colors" />
                        <span className="text-xs font-bold uppercase mt-2 tracking-widest">TAP TO MINT</span>
                    </div>
                )}
            </button>
        </div>

        {/* Floating Packs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-16 h-20 bg-white/5 border border-white/10 rounded-lg animate-bounce"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                        animationDelay: `${Math.random()}s`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                ></div>
            ))}
        </div>
      </div>
      
      <div className="text-center">
         <div className="inline-block bg-black/40 px-6 py-2 rounded-full border border-white/10">
            <span className="text-white/60 mr-2">Available to Mint:</span>
            <span className="font-mono text-xl text-green-400">{inventory.length > 0 ? inventory.length : 0} Packs</span>
         </div>
      </div>
    </div>
  );
};