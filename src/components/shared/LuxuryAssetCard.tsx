import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { LuxuryAsset } from '@/lib/lifestyle-types';

interface LuxuryAssetCardProps {
  asset: LuxuryAsset;
}

const CATEGORY_LABELS: Record<string, string> = {
  car: 'Exotic Car',
  watch: 'Timepiece',
  yacht: 'Yacht',
  jet: 'Private Jet',
  art: 'Art',
};

const CATEGORY_HREFS: Record<string, string> = {
  car: 'cars',
  watch: 'watches',
  yacht: 'yachts',
  jet: 'jets',
  art: 'art',
};

const TREND_CONFIG = {
  appreciating: { label: '↑ Appreciating', color: '#34C759', bg: 'rgba(52,199,89,0.1)', border: 'rgba(52,199,89,0.3)' },
  depreciating: { label: '↓ Depreciating', color: '#FF453A', bg: 'rgba(255,69,58,0.1)', border: 'rgba(255,69,58,0.3)' },
  stable: { label: '→ Stable', color: '#C9A84C', bg: 'rgba(201,168,76,0.08)', border: 'rgba(201,168,76,0.25)' },
};

export default function LuxuryAssetCard({ asset }: LuxuryAssetCardProps) {
  const href = `/lifestyle/${CATEGORY_HREFS[asset.category]}/${asset.id}`;
  const categoryLabel = CATEGORY_LABELS[asset.category];
  const trend = TREND_CONFIG[asset.priceTrend];

  // Show first 3 spec entries as quick stats
  const specEntries = Object.entries(asset.specs).slice(0, 3);

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[2px] transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        textDecoration: 'none',
      }}
      aria-label={`View ${asset.title}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <Image
          src={asset.mainImage}
          alt={asset.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,11,0.75) 0%, rgba(10,10,11,0.1) 60%)',
          }}
          aria-hidden="true"
        />

        {/* Gold hover border */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.5)' }}
          aria-hidden="true"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[0.6rem] font-semibold tracking-wider uppercase"
            style={{
              background: 'rgba(10,10,11,0.75)',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'var(--color-gold)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {categoryLabel}
          </span>
          {asset.isVerified && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[0.6rem] font-semibold"
              style={{
                background: 'rgba(10,10,11,0.75)',
                border: '1px solid rgba(52,199,89,0.3)',
                color: '#34C759',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ShieldCheck className="w-2.5 h-2.5" aria-hidden="true" />
              Verified
            </span>
          )}
        </div>

        {/* Trend badge bottom-right */}
        <div className="absolute bottom-3 right-3">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[0.6rem] font-semibold"
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
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Make / Year */}
        <div className="flex items-center justify-between">
          <span
            className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            {asset.make} · {asset.year}
          </span>
          <span className="text-[0.65rem]" style={{ color: 'var(--color-muted)' }}>
            {asset.location}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-normal leading-[1.2] text-white"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {asset.model}
        </h3>

        {/* Key specs */}
        <div
          className="flex flex-wrap gap-x-4 gap-y-1 py-3"
          style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
        >
          {specEntries.map(([key, val]) => (
            <div key={key} className="flex flex-col gap-0.5">
              <span className="text-[0.6rem] uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
                {key}
              </span>
              <span className="text-xs font-medium text-white">{val}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p
              className="text-xl font-normal leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: 'var(--color-gold-light)',
              }}
            >
              {asset.priceFormatted}
            </p>
            <p className="text-[0.6rem] tracking-wider uppercase mt-1" style={{ color: 'var(--color-muted)' }}>
              {asset.sellerType === 'private' ? 'Private Sale' : asset.sellerType === 'auction' ? 'Auction' : 'Dealer'}
            </p>
          </div>
          <span
            className="text-xs font-medium transition-colors duration-200 group-hover:text-white"
            style={{ color: 'var(--color-gold)' }}
          >
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
