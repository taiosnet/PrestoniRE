import Link from 'next/link';
import Image from 'next/image';
import { BedDouble, Bath, Maximize2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Property } from '@/lib/types';

/* ─── Props ──────────────────────────────────────────────────────────────────── */

interface PropertyCardProps {
  property: Property;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const {
    id,
    title,
    priceFormatted,
    location,
    type,
    beds,
    baths,
    sqm,
    status,
    isOffPlan,
    completionYear,
    developer,
    mainImage,
  } = property;

  return (
    <Link
      href={`/properties/${id}`}
      className={cn(
        'group block rounded-[2px] overflow-hidden',
        'bg-[var(--color-surface)] border border-[var(--color-border)]',
        'transition-all duration-300',
        'hover:border-[rgba(201,168,76,0.4)] hover:-translate-y-[2px]',
        'hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(201,168,76,0.12)]',
        className
      )}
    >
      {/* ── Image Area ─────────────────────────────────────────────────────── */}
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-surface-2)]">
        <Image
          src={mainImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />

        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 40%, rgba(10,10,11,0.65) 75%, rgba(10,10,11,0.92) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Top-left: Status badge */}
        <div className="absolute top-3 left-3 z-10">
          {isOffPlan ? (
            <Badge variant="gold">Pre-Construction</Badge>
          ) : (
            <Badge variant="default">Resale</Badge>
          )}
        </div>

        {/* Top-right: Completion year pill (off-plan only) */}
        {isOffPlan && completionYear && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className="inline-block px-2 py-0.5 rounded-[2px] text-[0.65rem] font-medium tracking-wider uppercase"
              style={{
                background: 'rgba(10,10,11,0.75)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'var(--color-gold-light)',
                backdropFilter: 'blur(6px)',
              }}
            >
              Est. {completionYear}
            </span>
          </div>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col gap-3">

        {/* Type + Neighbourhood row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-gray)' }}
          >
            {type}
          </span>
          <span
            className="text-[0.7rem] font-normal truncate max-w-[55%] text-right"
            style={{ color: 'var(--color-muted)' }}
          >
            {location.neighborhood}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[1.2rem] font-normal leading-[1.25] text-white line-clamp-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {title}
        </h3>

        {/* Specs row */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-gray)' }}>
            <BedDouble className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{beds}</span>
          </span>
          <span
            className="w-px h-3 shrink-0"
            style={{ background: 'var(--color-border)' }}
            aria-hidden="true"
          />
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-gray)' }}>
            <Bath className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{baths}</span>
          </span>
          <span
            className="w-px h-3 shrink-0"
            style={{ background: 'var(--color-border)' }}
            aria-hidden="true"
          />
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-gray)' }}>
            <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{sqm.toLocaleString()} m²</span>
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: 'var(--color-border)' }}
          aria-hidden="true"
        />

        {/* Price + developer row */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p
              className="text-[1.5rem] font-normal leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: 'var(--color-gold)',
              }}
            >
              {priceFormatted}
            </p>
            {status === 'pre-construction' && developer && (
              <p
                className="mt-1 text-[0.65rem] font-medium tracking-wide truncate"
                style={{ color: 'var(--color-muted)' }}
              >
                {developer}
              </p>
            )}
          </div>

          {/* Arrow hint on hover */}
          <span
            className="flex-shrink-0 w-8 h-8 rounded-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.25)',
              color: 'var(--color-gold)',
            }}
            aria-hidden="true"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
