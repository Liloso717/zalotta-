export interface CreatorCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  imageUrl: string;
}

export interface Pack {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Holographic';
  price: number;
  contents: CreatorCoin[];
  totalValue: number;
  roi: number; // Percentage
  mintedDate: string;
  color: string;
}

export interface Tweet {
  id: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
}

export enum TabView {
  MARKET = 'MARKET',
  MINT = 'MINT',
  DASHBOARD = 'DASHBOARD',
  SOCIAL = 'SOCIAL',
  FLASH = 'FLASH',
  LOTTERY = 'LOTTERY'
}

export interface UserStats {
  balance: number;
  packsOwned: number;
  totalStaked: number;
  dailyYield: number;
  pnl: number;
  ticketsOwned: number;
}

export interface LotteryInfo {
  id: string;
  jackpotCoin: CreatorCoin;
  poolAmount: number;
  ticketPrice: number;
  endsIn: string;
  participants: number;
}