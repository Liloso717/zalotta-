import React, { useEffect, useState } from 'react';
import { GlassCard } from './GlassUI';
import { Tweet } from '../types';
import { MessageCircle, Repeat, Heart, TrendingUp } from 'lucide-react';
import { analyzeSentiment } from '../services/geminiService';

interface SocialFeedProps {
  tweets: Tweet[];
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ tweets }) => {
  const [sentiment, setSentiment] = useState<string>("Analyzing...");

  useEffect(() => {
    const fetchSentiment = async () => {
        const result = await analyzeSentiment(tweets.map(t => t.content));
        setSentiment(result);
    }
    fetchSentiment();
  }, [tweets]);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-tech font-bold uppercase">Live Feed</h2>
            <p className="text-xs text-white/50 tracking-widest">@thewclubbiggs</p>
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2">
            <TrendingUp size={14} className={sentiment === 'Bullish' ? 'text-green-400' : 'text-gray-400'} />
            <span className="text-xs font-bold uppercase">{sentiment} SENTIMENT</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-20">
        {tweets.map((tweet) => (
          <GlassCard key={tweet.id} className="border-l-4 border-l-blue-500 !p-4 hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div>
                  <div className="font-bold text-sm leading-none">{tweet.handle}</div>
                  <div className="text-[10px] text-white/40">{tweet.timestamp}</div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-white/80 leading-relaxed mb-3">
              {tweet.content}
            </p>

            <div className="flex gap-6 text-white/40 text-xs">
              <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <MessageCircle size={12} />
                <span>Reply</span>
              </div>
              <div className="flex items-center gap-1 hover:text-green-400 transition-colors cursor-pointer">
                <Repeat size={12} />
                <span>{tweet.retweets}</span>
              </div>
              <div className="flex items-center gap-1 hover:text-pink-400 transition-colors cursor-pointer">
                <Heart size={12} />
                <span>{tweet.likes}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};