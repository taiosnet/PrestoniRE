import Image from 'next/image';
import Link from 'next/link';
import { LIFESTYLE_CATEGORIES, LUXURY_CARS, LUXURY_WATCHES, LUXURY_YACHTS, LUXURY_JETS } from '@/lib/lifestyle-data';
import SectionHeader from '@/components/shared/SectionHeader';
import LuxuryAssetCard from '@/components/shared/LuxuryAssetCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Lifestyle Assets — Cars, Watches, Yachts, Jets',
  description:
    'The complete luxury lifestyle platform — buy exotic cars, investment-grade watches, superyachts, and private jets alongside the world\'s finest real estate. Track your entire portfolio in one place.',
  keywords: [
    'luxury lifestyle assets', 'exotic cars watches yachts jets', 'UHNW lifestyle', 'luxury portfolio',
    'Prestoni lifestyle', 'buy luxury assets', 'complete luxury lifestyle',
  ],
  openGraph: {
    title: 'Luxury Lifestyle Assets | Prestoni',
    description: 'The complete luxury lifestyle platform — exotic cars, watches, yachts, jets, and real estate in one curated destination.',
    images: [{ url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200', width: 1200, height: 630, alt: 'Luxury Lifestyle — Prestoni' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Luxury Lifestyle Assets | Prestoni', description: 'The complete luxury lifestyle platform — cars, watches, yachts, jets, and real estate.' },
};

const PORTFOLIO_ROWS = [
  { label: 'Monaco Penthouse', value: '$8.4M', category: 'Real Estate' },
  { label: 'Bugatti Chiron Super Sport', value: '$3.9M', category: 'Exotic Car' },
  { label: 'Patek Philippe 5726A', value: '$420K', category: 'Timepiece' },
  { label: 'Sunseeker 155 Yacht', value: '$14.5M', category: 'Yacht' },
];

const PORTFOLIO_TOTAL = '$27.2M';

export default function LifestylePage() {
  const featuredAssets = [
    LUXURY_CARS.find((a) => a.isFeatured) ?? LUXURY_CARS[0],
    LUXURY_WATCHES.find((a) => a.isFeatured) ?? LUXURY_WATCHES[0],
    LUXURY_YACHTS.find((a) => a.isFeatured) ?? LUXURY_YACHTS[0],
    LUXURY_JETS.find((a) => a.isFeatured) ?? LUXURY_JETS[0],
  ].filter(Boolean);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* A. HERO                                                                 */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Lifestyle Hero"
        className="relative flex flex-col items-center justify-center w-full overflow-hidden -mt-20"
        style={{ minHeight: '60vh' }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600"
            alt="Luxury estate aerial view"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,10,11,0.6) 0%, rgba(10,10,11,0.65) 60%, rgba(10,10,11,0.9) 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center pt-40 pb-24">
          <p className="section-label mb-6">The Complete Lifestyle</p>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] text-white max-w-5xl mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.02em' }}
          >
            Beyond{' '}
            <span className="gold-text">the Estate</span>
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mb-10"
            style={{ color: 'var(--color-gray)' }}
          >
            Curate every element of your world — from the property to the car in the garage,
            the watch on your wrist, and the yacht in the marina.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/lifestyle/cars" className="btn-gold">
              Explore Cars
            </Link>
            <Link href="/concierge" className="btn-outline">
              Speak with a Concierge
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* B. CATEGORY GRID                                                        */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Lifestyle Categories"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-10">
          <SectionHeader
            eyebrow="All Categories"
            title="Every Luxury Asset Class"
            subtitle="Five distinct markets. One curated platform."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {LIFESTYLE_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative overflow-hidden rounded-[2px] block"
                style={{
                  aspectRatio: '3/4',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                }}
                aria-label={`Explore ${category.label}`}
              >
                {/* Background image */}
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay — dark bottom to transparent top */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.55) 50%, rgba(10,10,11,0.1) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Gold border glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.5)' }}
                  aria-hidden="true"
                />

                {/* Content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1">
                  <span
                    className="text-2xl font-light leading-none text-white"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {category.label}
                  </span>
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    {category.count} listings
                  </span>
                  <span
                    className="text-xs leading-snug mt-1"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    {category.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* C. PORTFOLIO TEASER                                                     */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Portfolio Intelligence"
        className="py-20 lg:py-28 relative"
        style={{ background: 'var(--color-surface-2)' }}
      >
        {/* Top gold accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.2) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Bottom gold accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.2) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <div className="flex flex-col gap-8">
              <SectionHeader
                eyebrow="Portfolio Intelligence"
                title="Track Every Asset in One Place"
                subtitle="Understand your combined net worth across every asset class — property, cars, timepieces, yachts, and jets — with live market valuations reviewed quarterly by our specialist advisors."
              />

              <ul className="flex flex-col gap-3">
                {[
                  'Real Estate · Cars · Timepieces',
                  'Live market valuations updated in real time',
                  'Advisor-reviewed quarterly portfolio reports',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: 'var(--color-gold)' }}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div>
                <Link href="/concierge" className="btn-gold">
                  Speak with an Advisor
                </Link>
              </div>
            </div>

            {/* Right — Portfolio mockup card */}
            <div
              className="rounded-[2px] overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    Portfolio Summary
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    As of May 2026
                  </span>
                </div>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[0.6rem] font-semibold"
                  style={{
                    background: 'rgba(52,199,89,0.1)',
                    border: '1px solid rgba(52,199,89,0.3)',
                    color: '#34C759',
                  }}
                >
                  ↑ Live
                </span>
              </div>

              {/* Rows */}
              <div className="flex flex-col">
                {PORTFOLIO_ROWS.map((row, i) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-6 py-4"
                    style={{
                      borderBottom: i < PORTFOLIO_ROWS.length - 1 ? '1px solid var(--color-border)' : undefined,
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-white leading-none">{row.label}</span>
                      <span
                        className="text-[0.6rem] tracking-wider uppercase mt-1"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {row.category}
                      </span>
                    </div>
                    <span
                      className="text-base font-normal leading-none"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: 'var(--color-gold-light)',
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{
                  background: 'rgba(201,168,76,0.04)',
                  borderTop: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <span
                  className="text-xs font-semibold tracking-[0.16em] uppercase"
                  style={{ color: 'var(--color-gold)' }}
                >
                  Total Portfolio Value
                </span>
                <span
                  className="text-2xl font-light leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: 'var(--color-gold-light)',
                  }}
                >
                  {PORTFOLIO_TOTAL}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* D. FEATURED FROM EACH CATEGORY                                          */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Curated Selection"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          <SectionHeader
            eyebrow="Handpicked"
            title="Curated Selection"
            subtitle="One standout from each category — verified, authenticated, and available now."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAssets.map((asset) => (
              <LuxuryAssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* E. CTA                                                                  */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Call to Action"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* Gold top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, var(--color-gold) 30%, var(--color-gold-light) 50%, var(--color-gold) 70%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Decorative radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse at center, var(--color-gold), transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-8">
          <p className="section-label">Complete Your Lifestyle</p>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-white max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.01em' }}
          >
            Ready to{' '}
            <span className="gold-text">Complete Your Lifestyle?</span>
          </h2>

          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ color: 'var(--color-gray)' }}
          >
            From the estate to the aircraft, our advisors curate every dimension of your world
            with absolute discretion.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/buy" className="btn-gold">
              Browse Properties
            </Link>
            <Link href="/concierge" className="btn-outline">
              Speak with Concierge
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
