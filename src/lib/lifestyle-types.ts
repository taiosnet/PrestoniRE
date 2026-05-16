export type AssetCategory = 'car' | 'watch' | 'yacht' | 'jet';

export interface PriceHistoryPoint {
  month: string;
  avgPrice: number;
  marketMin: number;
  marketMax: number;
}

export interface PricePredictionPoint {
  month: string;
  predicted: number;
}

export interface LuxuryAsset {
  id: string;
  category: AssetCategory;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  priceFormatted: string;
  currency: string;
  location: string;
  description: string;
  mainImage: string;
  images: string[];
  specs: Record<string, string>;
  highlights: string[];
  isVerified: boolean;
  isFeatured: boolean;
  sellerType: 'dealer' | 'private' | 'auction';
  priceHistory: PriceHistoryPoint[];
  pricePrediction: PricePredictionPoint[];
  priceTrend: 'appreciating' | 'depreciating' | 'stable';
}
