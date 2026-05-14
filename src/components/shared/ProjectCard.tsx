import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import type { Project, ProjectStatus } from '@/lib/types';

/* ─── Props ──────────────────────────────────────────────────────────────────── */

interface ProjectCardProps {
  project: Project;
  className?: string;
}

/* ─── Status badge variant mapping ───────────────────────────────────────────── */

function statusBadge(status: ProjectStatus) {
  switch (status) {
    case 'Launching Soon':
      return <Badge variant="gold">Launching Soon</Badge>;
    case 'Under Construction':
      return <Badge variant="warning">Under Construction</Badge>;
    case 'Ready to Move':
      return <Badge variant="success">Ready to Move</Badge>;
  }
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const {
    id,
    name,
    developer,
    location,
    country,
    priceFrom,
    units,
    completionYear,
    status,
    paymentPlan,
    coverImage,
    highlights,
  } = project;

  // Show only the first 3 highlights
  const topHighlights = highlights.slice(0, 3);

  return (
    <div
      className={cn(
        'group flex flex-col rounded-[2px] overflow-hidden',
        'bg-[var(--color-surface)] border border-[var(--color-border)]',
        'transition-all duration-300',
        'hover:border-[rgba(201,168,76,0.35)] hover:-translate-y-[2px]',
        'hover:shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(201,168,76,0.1)]',
        className
      )}
    >
      {/* ── Cover Image ────────────────────────────────────────────────────── */}
      <div className="relative aspect-video overflow-hidden bg-[var(--color-surface-2)]">
        <Image
          src={coverImage}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />

        {/* Full gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,11,0.15) 0%, rgba(10,10,11,0.4) 50%, rgba(10,10,11,0.88) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Top-left: Status badge */}
        <div className="absolute top-3 left-3 z-10">
          {statusBadge(status)}
        </div>

        {/* Bottom-over-image: Developer + Project Name */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-4">
          <p
            className="text-[0.65rem] font-medium tracking-[0.18em] uppercase mb-1"
            style={{ color: 'rgba(232,201,122,0.7)' }}
          >
            {developer}
          </p>
          <h3
            className="text-[1.35rem] font-semibold leading-[1.2] text-white line-clamp-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {name}
          </h3>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 p-5 flex-1">

        {/* Location row */}
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: 'var(--color-gold)' }}
            aria-hidden="true"
          />
          <span className="text-xs font-medium" style={{ color: 'var(--color-gray)' }}>
            {location}, {country}
          </span>
        </div>

        {/* Price + key stats */}
        <div>
          <p className="text-xs font-medium tracking-wide uppercase mb-0.5" style={{ color: 'var(--color-muted)' }}>
            Starting from
          </p>
          <p
            className="text-[1.5rem] font-normal leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--color-gold)',
            }}
          >
            {formatPrice(priceFrom)}
          </p>
        </div>

        {/* Key stats row */}
        <div
          className="grid grid-cols-3 gap-3 rounded-[2px] px-3 py-3"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="text-center">
            <p
              className="text-[0.9rem] font-semibold leading-none mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-white)' }}
            >
              {units}
            </p>
            <p className="text-[0.6rem] tracking-[0.12em] uppercase font-medium" style={{ color: 'var(--color-muted)' }}>
              Units
            </p>
          </div>

          <div
            className="text-center border-x"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <p
              className="text-[0.9rem] font-semibold leading-none mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-white)' }}
            >
              {completionYear}
            </p>
            <p className="text-[0.6rem] tracking-[0.12em] uppercase font-medium" style={{ color: 'var(--color-muted)' }}>
              Completion
            </p>
          </div>

          <div className="text-center">
            <p
              className="text-[0.9rem] font-semibold leading-none mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-white)' }}
            >
              {paymentPlan}
            </p>
            <p className="text-[0.6rem] tracking-[0.12em] uppercase font-medium" style={{ color: 'var(--color-muted)' }}>
              Payment
            </p>
          </div>
        </div>

        {/* Highlights */}
        <ul className="flex flex-col gap-2 flex-1">
          {topHighlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check
                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                style={{ color: 'var(--color-gold)' }}
                aria-hidden="true"
                strokeWidth={2.5}
              />
              <span className="text-xs leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                {highlight}
              </span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: 'var(--color-border)' }}
          aria-hidden="true"
        />

        {/* CTA */}
        <Link href={`/pre-construction/${id}`} className="block w-full" tabIndex={-1}>
          <Button
            variant="outline"
            className="w-full group-hover:border-[rgba(201,168,76,0.6)] group-hover:text-[var(--color-gold)]"
          >
            View Project
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}
