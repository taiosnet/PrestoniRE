import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { LUXURY_WATCHES } from '@/lib/lifestyle-data';
import SectionHeader from '@/components/shared/SectionHeader';
import LuxuryAssetCard from '@/components/shared/LuxuryAssetCard';

export const metadata: Metadata = {
  title: 'Investment-Grade Watches & Timepieces',
  description:
    'Buy certified pre-owned investment watches — Patek Philippe Nautilus, Richard Mille, Audemars Piguet Royal Oak, Rolex Daytona. Every timepiece authenticated with live price history and market comparables.',
  keywords: [
    'investment watches for sale', 'Patek Philippe Nautilus', 'Richard Mille for sale',
    'Audemars Piguet Royal Oak', 'Rolex Daytona', 'luxury watches', 'certified pre-owned watches',
    'F.P. Journe', 'Lange Sohne', 'watch investment', 'horological masterpieces',
  ],
  openGraph: {
    title: 'Investment-Grade Watches & Timepieces | Prestoni',
    description: 'Buy certified pre-owned investment watches — Patek Philippe, Richard Mille, AP, Rolex. Every piece authenticated with live price history.',
    images: [{ url: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200', width: 1200, height: 630, alt: 'Luxury Watches — Prestoni' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Investment-Grade Watches | Prestoni', description: 'Buy certified pre-owned investment watches with live price history.' },
};

export default function WatchesPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* A. HERO                                                                 */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Timepieces Hero"
        className="relative flex flex-col justify-end w-full overflow-hidden -mt-20"
        style={{ minHeight: '50vh' }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1600"
            alt="Investment-grade luxury watches"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,10,11,0.5) 0%, rgba(10,10,11,0.6) 50%, rgba(10,10,11,0.92) 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-20 pt-40 flex flex-col items-start gap-6">
          <p className="section-label">Timepieces</p>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-white max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.02em' }}
          >
            Investment-Grade Timepieces
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-gray)' }}
          >
            Certified pre-owned watches and horological masterpieces — each authenticated,
            verified, and priced against current market comparables.
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-2">
            <div className="flex flex-col gap-0.5">
              <span
                className="text-2xl font-light leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-gold-light)' }}
              >
                {LUXURY_WATCHES.length}
              </span>
              <span
                className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                Listings
              </span>
            </div>
            <span className="h-8 w-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />
            <div className="flex flex-col gap-0.5">
              <span
                className="text-2xl font-light leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-gold-light)' }}
              >
                Certified Pre-owned
              </span>
              <span
                className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                Condition
              </span>
            </div>
            <span className="h-8 w-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />
            <div className="flex flex-col gap-0.5">
              <span
                className="text-2xl font-light leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-gold-light)' }}
              >
                Full Set Priority
              </span>
              <span
                className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                Provenance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* B. LISTINGS GRID                                                        */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Watch Listings"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          <SectionHeader
            eyebrow="Our Collection"
            title="Horological Masterpieces"
            subtitle={`${LUXURY_WATCHES.length} certified timepieces — from Patek Philippe and Richard Mille to Rolex and A. Lange & Söhne.`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LUXURY_WATCHES.map((watch) => (
              <LuxuryAssetCard key={watch.id} asset={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* C. CONCIERGE STRIP                                                      */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Sourcing Concierge"
        className="relative py-16"
        style={{
          background: 'var(--color-surface)',
          borderTop: '1px solid rgba(201,168,76,0.2)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-6">
          <p
            className="text-2xl sm:text-3xl font-light leading-[1.2] text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Can&apos;t find the exact specification you require?
          </p>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-xl"
            style={{ color: 'var(--color-gray)' }}
          >
            Our sourcing specialists have access to private collections and manufacturer
            allocations worldwide.
          </p>
          <Link href="/concierge" className="btn-gold">
            Commission a Search
          </Link>
        </div>
      </section>
    </>
  );
}
