import type { Metadata } from 'next';
import BuyPageClient from './BuyPageClient';

export const metadata: Metadata = {
  title: 'Buy Luxury Properties',
  description:
    'Search and filter the world\'s finest luxury properties — villas, penthouses, estates and apartments across Dubai, Miami, Marbella, London, Lisbon and Bali.',
};

export default function BuyPage() {
  return <BuyPageClient />;
}
