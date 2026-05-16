import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { LUXURY_CARS } from '@/lib/lifestyle-data';
import SectionHeader from '@/components/shared/SectionHeader';
import LuxuryAssetCard from '@/components/shared/LuxuryAssetCard';

export const metadata: Metadata = {
  title: 'Exotic Cars',
  description:
    'Hypercars, grand tourers & investment-grade collector automobiles — every example verified and authenticated by our specialists.',
};

export default function CarsPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* A. HERO                                                                 */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Exotic Cars Hero"
        className="relative flex flex-col justify-end w-full overflow-hidden -mt-20"
        style={{ minHeight: '50vh' }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600"
            alt="Exotic hypercars collection"
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
          <p className="section-label">Exotic Cars</p>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-white max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.02em' }}
          >
            Rare Automobiles &amp; Hypercars
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-gray)' }}
          >
            Hypercars, grand tourers &amp; investment-grade collector automobiles — every example
            verified and authenticated by our specialists.
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-2">
            <div className="flex flex-col gap-0.5">
              <span
                className="text-2xl font-light leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-gold-light)' }}
              >
                {LUXURY_CARS.length}
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
                All Verified
              </span>
              <span
                className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                Authentication
              </span>
            </div>
            <span className="h-8 w-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />
            <div className="flex flex-col gap-0.5">
              <span
                className="text-2xl font-light leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-gold-light)' }}
              >
                Global Delivery
              </span>
              <span
                className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                Logistics
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* B. LISTINGS GRID                                                        */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Car Listings"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          <SectionHeader
            eyebrow="Our Collection"
            title="Exotic Cars &amp; Hypercars"
            subtitle={`${LUXURY_CARS.length} verified examples — privately sourced, specialist-authenticated, globally delivered.`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LUXURY_CARS.map((car) => (
              <LuxuryAssetCard key={car.id} asset={car} />
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
