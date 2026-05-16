import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond, Cinzel, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ─── Fonts (self-hosted via next/font — no render-blocking request) ─────────── */

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel-decorative',
  display: 'swap',
});

/* ─── Metadata ───────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'Prestoni | Global Luxury Properties',
    template: '%s | Prestoni',
  },
  description:
    "Discover the world's finest luxury properties and off-plan developments across 32 countries. Curated for discerning buyers — Dubai, Miami, Marbella, London, Lisbon, Bali and beyond.",
  keywords: [
    'luxury real estate',
    'ultra prime property',
    'off-plan investments',
    'pre-construction villas',
    'Dubai luxury apartments',
    'Miami penthouses',
    'London prime property',
    'Marbella villas',
    'Golden Visa property',
    'HNWI real estate',
  ],
  authors: [{ name: 'Prestoni Holdings' }],
  creator: 'Prestoni Holdings',
  publisher: 'Prestoni Holdings',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://prestoni.com',
    siteName: 'Prestoni',
    title: 'Prestoni | Global Luxury Properties',
    description:
      "The world's most discerning buyers trust Prestoni to discover, evaluate, and acquire the finest properties across 32 countries.",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
        width: 1200,
        height: 630,
        alt: 'Prestoni — Global Luxury Properties',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prestoni | Global Luxury Properties',
    description:
      "Discover the world's finest luxury properties and off-plan developments across 32 countries.",
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200'],
    creator: '@prestoni',
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
};

/* ─── Root Layout ────────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${cormorant.variable} ${cinzel.variable} ${cinzelDecorative.variable}`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-white)' }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:rounded-[2px]"
          style={{ background: 'var(--color-gold)', color: '#0A0A0B' }}
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1 flex flex-col pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
