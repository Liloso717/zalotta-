import { CreatorCoin, Pack, Tweet, LotteryInfo } from '../types';

export const MOCK_CREATORS: CreatorCoin[] = [
  { id: '1', name: 'ZoraPunk', symbol: 'ZUNK', price: 12.5, change24h: 5.2, imageUrl: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'GlitchArt', symbol: 'GLCH', price: 8.2, change24h: -1.2, imageUrl: 'https://picsum.photos/100/100?random=2' },
  { id: '3', name: 'NeonVibe', symbol: 'NEON', price: 24.0, change24h: 12.5, imageUrl: 'https://picsum.photos/100/100?random=3' },
  { id: '4', name: 'SoundWave', symbol: 'WAVE', price: 4.5, change24h: 0.5, imageUrl: 'https://picsum.photos/100/100?random=4' },
  { id: '5', name: 'RetroFuture', symbol: 'RTRO', price: 15.8, change24h: 3.1, imageUrl: 'https://picsum.photos/100/100?random=5' },
  { id: '6', name: 'CyberDao', symbol: 'CYBR', price: 42.0, change24h: 8.9, imageUrl: 'https://picsum.photos/100/100?random=6' },
  { id: '7', name: 'PixelGod', symbol: 'PIXL', price: 0.5, change24h: -5.0, imageUrl: 'https://picsum.photos/100/100?random=7' },
];

export const MOCK_PACKS: Pack[] = [
  {
    id: 'p1',
    name: 'Genesis Index Alpha',
    rarity: 'Common',
    price: 50,
    contents: MOCK_CREATORS,
    totalValue: 107.5,
    roi: 12.4,
    mintedDate: '2023-10-24',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'p2',
    name: 'Neon Nights Collection',
    rarity: 'Rare',
    price: 120,
    contents: MOCK_CREATORS,
    totalValue: 150.0,
    roi: 25.8,
    mintedDate: '2023-10-25',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'p3',
    name: 'Whale Watching Set',
    rarity: 'Legendary',
    price: 500,
    contents: MOCK_CREATORS,
    totalValue: 650.0,
    roi: 45.2,
    mintedDate: '2023-10-26',
    color: 'from-yellow-400 to-amber-600'
  }
];

export const MOCK_TWEETS: Tweet[] = [
  {
    id: 't1',
    handle: '@thewclubbiggs',
    content: 'Just minted a fresh $PACKS index on Zalotta. The circular economy mechanics are insane. Staking rewards up 12% this week. #Zora #Crypto',
    timestamp: '2m ago',
    likes: 452,
    retweets: 120
  },
  {
    id: 't2',
    handle: '@thewclubbiggs',
    content: 'Watching the Flash Markets go wild. Who else is predicting the GLCH pump? 🚀',
    timestamp: '15m ago',
    likes: 890,
    retweets: 230
  },
  {
    id: 't3',
    handle: '@thewclubbiggs',
    content: 'Zalotta Glass UI is the future. Clean, transparent, trustless. Exactly what we need.',
    timestamp: '1h ago',
    likes: 1200,
    retweets: 405
  },
  {
    id: 't4',
    handle: '@thewclubbiggs',
    content: 'Don\'t sleep on the new Creator Index drops. The ROI is looking juicy. 🧃',
    timestamp: '3h ago',
    likes: 3400,
    retweets: 890
  }
];

export const MOCK_LOTTERY: LotteryInfo = {
  id: 'lottery-001',
  jackpotCoin: MOCK_CREATORS[0], // ZoraPunk
  poolAmount: 5000,
  ticketPrice: 5,
  endsIn: '08:42:15',
  participants: 1234
};

export const generateRandomPrice = (base: number) => {
  const variation = (Math.random() - 0.5) * 2; // -1 to 1
  return Number((base + variation).toFixed(2));
};