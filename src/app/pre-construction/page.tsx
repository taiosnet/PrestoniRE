import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, Calendar, Percent, Globe, Phone, MessageCircle } from 'lucide-react';
import PreConstructionFilters from './PreConstructionFilters';

/* ─── Metadata ───────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Pre-Construction Properties | Off-Plan Investment Opportunities',
  description:
    'Secure tomorrow\'s most coveted addresses at launch prices — exclusive developer-direct access across Dubai, Miami, Lisbon, Marbella, London and Bali.',
};

/* ─── Why Pre-Construction Section ──────────────────────────────────────────── */

const WHY_POINTS = [
  {
    icon: TrendingUp,
    title: 'Launch Pricing',
    body: 'Secure units at 10–30% below completion value, locking in equity from day one before the market re-prices the asset at delivery.',
  },
  {
    icon: Calendar,
    title: 'Flexible Payment Plans',
    body: '30/70, 40/60, 60/40 payment structures spread over the construction period, reducing upfront capital requirements.',
  },
  {
    icon: Percent,
    title: 'Developer-Paid Commission',
    body: 'Developers pay 2–8% commission directly to qualified brokers and advisors, meaning no added cost to the buyer.',
  },
  {
    icon: Globe,
    title: 'Golden Visa Eligible',
    body: 'Multiple projects qualify for UAE, Portugal and Spain Golden Visa programmes, opening pathways to residency and citizenship.',
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function PreConstructionPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <section className="relative h-[520px] md:h-[600px] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600"
          alt="Pre-construction luxury development"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlays */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.70)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,11,0.5) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 px-6 lg:px-16 max-w-screen-xl mx-auto w-full">
          <p className="section-label mb-4">Off-Plan Investment Opportunities</p>
          <h1
            className="text-5xl md:text-[4rem] lg:text-[4.5rem] font-normal leading-[1.08] text-white mb-6 max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Pre-Construction
            <br />
            <span className="gold-text">Properties</span>
          </h1>
          <p
            className="text-sm md:text-base max-w-2xl leading-relaxed mb-10"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            Secure tomorrow&apos;s most coveted addresses at launch prices — exclusive developer-direct
            access across Dubai, Miami, Lisbon, Marbella, London and Bali.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {[
              { value: '6 Live Projects', label: null },
              { value: 'From $650K', label: null },
              { value: 'Up to 8% Yield', label: null },
              { value: 'Completion 2025–2027', label: null },
            ].map(({ value }) => (
              <div key={value} className="flex items-center gap-2">
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: 'rgba(232,201,122,0.9)' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Filter Island (interactive tabs + grid) ──────────────────── */}
      <PreConstructionFilters />

      {/* ── Why Pre-Construction ─────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 lg:px-8 border-t border-[var(--color-border)]"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="max-w-screen-xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="section-label mb-3">Why Off-Plan</p>
            <h2
              className="text-4xl md:text-5xl font-normal text-white mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              The Pre-Construction Advantage
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--color-gray)' }}>
              Buying off-plan gives sophisticated investors structural advantages unavailable in the
              resale market.
            </p>
          </div>

          {/* 4-column icon grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_POINTS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-[2px] p-6 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Icon container */}
                <div
                  className="w-11 h-11 rounded-[2px] flex items-center justify-center transition-all duration-300 group-hover:border-[rgba(201,168,76,0.5)]"
                  style={{
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: 'var(--color-gold)' }}
                    aria-hidden="true"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="text-xl font-normal text-white mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                    {body}
                  </p>
                </div>

                {/* Gold accent line */}
                <div
                  className="h-[1px] w-8 mt-auto transition-all duration-300 group-hover:w-14"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--color-gold), var(--color-gold-light), transparent)',
                  }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div
            className="rounded-[2px] px-8 py-14 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(17,17,19,0) 60%)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-10 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, var(--color-gold) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            <div className="flex-1">
              <p className="section-label mb-3">Speak to a Specialist</p>
              <h2
                className="text-3xl md:text-4xl font-normal text-white mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Speak to a Pre-Construction Specialist
              </h2>
              <p className="text-sm max-w-md" style={{ color: 'var(--color-gray)' }}>
                Our advisors have direct relationships with every developer in our portfolio. Get
                priority access to launch allocations, private previews, and exclusive pricing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+18588773786"
                className="btn-outline flex items-center gap-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call Us
              </a>
              <a
                href="https://wa.me/18588773786"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-[2px] text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:-translate-y-px"
                style={{
                  background: 'rgba(37,211,102,0.12)',
                  border: '1px solid rgba(37,211,102,0.4)',
                  color: '#25D366',
                }}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
