import { ALL_LIFESTYLE_ASSETS, LUXURY_CARS, LUXURY_WATCHES, LUXURY_YACHTS, LUXURY_JETS } from '@/lib/lifestyle-data';
import { LuxuryAsset } from '@/lib/lifestyle-types';
import AssetPriceChart from '@/components/sections/AssetPriceChart';
import LuxuryAssetCard from '@/components/shared/LuxuryAssetCard';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

/* ─── Category maps ──────────────────────────────────────────────────────────── */

const CATEGORY_HREFS: Record<string, string> = {
  car: 'cars',
  watch: 'watches',
  yacht: 'yachts',
  jet: 'jets',
};

const CATEGORY_LABELS: Record<string, string> = {
  car: 'Exotic Car',
  watch: 'Timepiece',
  yacht: 'Yacht',
  jet: 'Private Jet',
};

const CATEGORY_TITLES: Record<string, string> = {
  cars: 'Cars',
  watches: 'Watches',
  yachts: 'Yachts',
  jets: 'Private Jets',
};

/* ─── Static params ──────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return ALL_LIFESTYLE_ASSETS.map((asset) => ({
    category: CATEGORY_HREFS[asset.category],
    id: asset.id,
  }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { category, id } = await params;
  const asset = ALL_LIFESTYLE_ASSETS.find(
    (a) => CATEGORY_HREFS[a.category] === category && a.id === id
  );
  if (!asset) return { title: 'Asset Not Found' };
  return {
    title: `${asset.title} | Prestoni Lifestyle`,
    description: asset.description.slice(0, 160),
  };
}

/* ─── Trend badge config ─────────────────────────────────────────────────────── */

const TREND_CONFIG = {
  appreciating: {
    label: '↑ Appreciating',
    color: '#34C759',
    bg: 'rgba(52,199,89,0.1)',
    border: 'rgba(52,199,89,0.3)',
  },
  depreciating: {
    label: '↓ Depreciating',
    color: '#FF453A',
    bg: 'rgba(255,69,58,0.1)',
    border: 'rgba(255,69,58,0.3)',
  },
  stable: {
    label: '→ Stable',
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.08)',
    border: 'rgba(201,168,76,0.25)',
  },
};

/* ─── Enquiry Sidebar (static server component) ──────────────────────────────── */

function EnquirySidebar({ asset }: { asset: LuxuryAsset }) {
  const whatsappMessage = encodeURIComponent(
    `I am interested in the ${asset.title}. Could you please provide more information?`
  );
  const whatsappUrl = `https://wa.me/18588773786?text=${whatsappMessage}`;

  return (
    <div
      className="rounded-[2px] p-6 flex flex-col gap-5"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid rgba(201,168,76,0.3)',
        boxShadow: '0 0 0 1px rgba(201,168,76,0.06), 0 24px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Heading */}
      <div>
        <h2
          className="text-2xl font-normal text-white mb-1"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Request Information
        </h2>
        <p
          className="text-[0.65rem] tracking-[0.12em] uppercase"
          style={{ color: 'var(--color-muted)' }}
        >
          Prestoni Lifestyle Advisory
        </p>
      </div>

      {/* Price */}
      <div
        className="rounded-[2px] px-4 py-3"
        style={{
          background: 'rgba(201,168,76,0.06)',
          border: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <p
          className="text-[0.6rem] tracking-[0.14em] uppercase mb-0.5"
          style={{ color: 'var(--color-muted)' }}
        >
          Asking Price
        </p>
        <p
          className="text-2xl font-normal leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: 'var(--color-gold)',
          }}
        >
          {asset.priceFormatted}
        </p>
      </div>

      {/* Verified badge */}
      {asset.isVerified && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-[2px]"
          style={{
            background: 'rgba(52,199,89,0.06)',
            border: '1px solid rgba(52,199,89,0.25)',
          }}
        >
          <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#34C759' }} aria-hidden="true" />
          <span className="text-xs font-medium" style={{ color: '#34C759' }}>
            Verified by Prestoni — provenance confirmed
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />

      {/* Form */}
      <form
        onSubmit={undefined}
        action="#"
        method="post"
        className="flex flex-col gap-3"
        aria-label="Asset enquiry form"
      >
        <div>
          <label
            htmlFor="eq-name"
            className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5 font-medium"
            style={{ color: 'var(--color-gray)' }}
          >
            Name
          </label>
          <input
            id="eq-name"
            type="text"
            name="name"
            placeholder="Your full name"
            required
            autoComplete="name"
            className="w-full h-10 px-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="eq-email"
            className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5 font-medium"
            style={{ color: 'var(--color-gray)' }}
          >
            Email
          </label>
          <input
            id="eq-email"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            autoComplete="email"
            className="w-full h-10 px-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="eq-phone"
            className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5 font-medium"
            style={{ color: 'var(--color-gray)' }}
          >
            Phone
          </label>
          <input
            id="eq-phone"
            type="tel"
            name="phone"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            className="w-full h-10 px-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="eq-message"
            className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5 font-medium"
            style={{ color: 'var(--color-gray)' }}
          >
            Message
          </label>
          <textarea
            id="eq-message"
            name="message"
            rows={3}
            defaultValue={`I am interested in the ${asset.title}. Please send me more information.`}
            className="w-full px-3 py-2 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200 resize-none"
          />
        </div>

        <Button type="submit" variant="default" size="md" className="w-full mt-1">
          Send Enquiry
        </Button>
      </form>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full h-10 rounded-[2px] text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:-translate-y-px"
        style={{
          background: 'rgba(37,211,102,0.08)',
          border: '1px solid rgba(37,211,102,0.35)',
          color: '#25D366',
        }}
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        Or message us on WhatsApp
      </a>

      {/* Advisor note */}
      <p
        className="text-[0.65rem] leading-relaxed text-center"
        style={{ color: 'var(--color-muted)' }}
      >
        A Prestoni lifestyle specialist will respond within 2 hours.
      </p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;

  const asset = ALL_LIFESTYLE_ASSETS.find(
    (a) => CATEGORY_HREFS[a.category] === category && a.id === id
  );

  if (!asset) notFound();

  // More from this category (exclude current, max 2)
  const sameCategory = ALL_LIFESTYLE_ASSETS.filter(
    (a) => a.category === asset.category && a.id !== asset.id
  ).slice(0, 2);

  const categoryLabel = CATEGORY_LABELS[asset.category];
  const categoryTitle = CATEGORY_TITLES[category] ?? category;
  const trend = TREND_CONFIG[asset.priceTrend];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

          {/* ── Left column ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-muted)' }}>
                <li>
                  <Link
                    href="/lifestyle"
                    className="transition-colors duration-200 hover:text-white"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    Lifestyle
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">/</li>
                <li>
                  <Link
                    href={`/lifestyle/${category}`}
                    className="transition-colors duration-200 hover:text-white"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    {categoryTitle}
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">/</li>
                <li className="text-white truncate max-w-[200px]">{asset.make}</li>
              </ol>
            </nav>

            {/* Hero image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2px]">
              <Image
                src={asset.mainImage}
                alt={asset.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,10,11,0.75) 0%, rgba(10,10,11,0.1) 55%)',
                }}
                aria-hidden="true"
              />

              {/* Top badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-[2px] text-[0.6rem] font-semibold tracking-wider uppercase"
                  style={{
                    background: 'rgba(10,10,11,0.75)',
                    border: '1px solid rgba(201,168,76,0.35)',
                    color: 'var(--color-gold)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {categoryLabel}
                </span>
                {asset.isVerified && (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] text-[0.6rem] font-semibold"
                    style={{
                      background: 'rgba(10,10,11,0.75)',
                      border: '1px solid rgba(52,199,89,0.35)',
                      color: '#34C759',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                    Verified
                  </span>
                )}
              </div>

              {/* Trend badge top-right */}
              <div className="absolute top-4 right-4">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-[2px] text-[0.6rem] font-semibold"
                  style={{
                    background: trend.bg,
                    border: `1px solid ${trend.border}`,
                    color: trend.color,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {trend.label}
                </span>
              </div>

              {/* Bottom-left: make + year */}
              <div className="absolute bottom-4 left-4">
                <p
                  className="text-xs font-semibold tracking-[0.14em] uppercase"
                  style={{ color: 'rgba(201,168,76,0.9)' }}
                >
                  {asset.make} · {asset.year}
                </p>
              </div>
            </div>

            {/* Title block */}
            <div>
              <h1
                className="text-4xl font-normal leading-[1.1] text-white mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {asset.title}
              </h1>
              <p
                className="text-3xl font-normal leading-none mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: 'var(--color-gold)',
                }}
              >
                {asset.priceFormatted}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
                {asset.location}
              </p>
            </div>

            {/* Description */}
            <div
              className="pt-8"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <h2
                className="text-xl font-normal text-white mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                About This {categoryLabel}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                {asset.description}
              </p>
            </div>

            {/* Specifications */}
            <div
              className="pt-8"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <h2
                className="text-xl font-normal text-white mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(asset.specs).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 px-4 py-3 rounded-[2px]"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      className="uppercase tracking-wider font-medium"
                      style={{ fontSize: '0.6rem', color: 'var(--color-muted)' }}
                    >
                      {label}
                    </span>
                    <span className="text-sm font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div
              className="pt-8"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <h2
                className="text-xl font-normal text-white mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Highlights
              </h2>
              <ul className="space-y-3">
                {asset.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 text-lg leading-none mt-0.5"
                      style={{ color: 'var(--color-gold)' }}
                      aria-hidden="true"
                    >
                      ·
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price chart */}
            <div
              className="pt-8"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <AssetPriceChart
                history={asset.priceHistory}
                prediction={asset.pricePrediction}
                trend={asset.priceTrend}
              />
            </div>

            {/* More from this category */}
            {sameCategory.length > 0 && (
              <div
                className="pt-8"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p
                      className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-1"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      Explore More
                    </p>
                    <h2
                      className="text-2xl font-normal text-white"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      More {categoryTitle}
                    </h2>
                  </div>
                  <Link
                    href={`/lifestyle/${category}`}
                    className="hidden sm:flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase transition-colors duration-200"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    View All
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sameCategory.map((a) => (
                    <LuxuryAssetCard key={a.id} asset={a} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right column: sticky enquiry sidebar ─────────────────────── */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24">
              <EnquirySidebar asset={asset} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
