import React, { useState, useEffect } from 'react';
import { GlassCard, GlassButton } from './GlassUI';
import { ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { getMarketPrediction } from '../services/geminiService';

export const FlashMarket: React.FC = () => {
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAlpha = async () => {
    setLoading(true);
    const result = await getMarketPrediction("Zora index volume increasing, whale wallet active on Base chain.");
    setPrediction(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlpha();
  }, []);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-tech font-bold uppercase text-red-500 neon-text">
            Flash Prediction
          </h2>
          <p className="text-white/60 text-sm">High frequency binary markets</p>
        </div>
        <GlassButton variant="secondary" onClick={fetchAlpha} className="text-xs">
            {loading ? 'Scanning...' : 'Refresh Oracle'}
        </GlassButton>
      </div>

      <GlassCard className="bg-gradient-to-r from-red-900/20 to-black/40 border-red-500/30">
        <div className="flex items-start gap-4">
            <Activity className="text-red-500 animate-pulse mt-1" />
            <div>
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">AI Oracle Signal</h4>
                <p className="font-mono text-lg leading-tight">{prediction || "Initializing prediction stream..."}</p>
            </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard interactive className="group hover:bg-green-500/10 border-green-500/20">
            <div className="flex flex-col items-center justify-center py-8">
                <ArrowUp size={48} className="text-green-500 mb-4 group-hover:-translate-y-2 transition-transform" />
                <h3 className="text-2xl font-bold">BULL</h3>
                <div className="text-sm text-green-400">2.1x Payout</div>
            </div>
        </GlassCard>
        <GlassCard interactive className="group hover:bg-red-500/10 border-red-500/20">
            <div className="flex flex-col items-center justify-center py-8">
                <ArrowDown size={48} className="text-red-500 mb-4 group-hover:translate-y-2 transition-transform" />
                <h3 className="text-2xl font-bold">BEAR</h3>
                <div className="text-sm text-red-400">1.8x Payout</div>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};