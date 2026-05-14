import Link from 'next/link';
import { cn } from '@/lib/utils';

/* ─── Props ──────────────────────────────────────────────────────────────────── */

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  action,
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <div className="flex items-center gap-3">
          {/* Left accent line (left-aligned only) */}
          {!isCenter && (
            <span
              className="inline-block h-px w-8 shrink-0"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
              }}
              aria-hidden="true"
            />
          )}
          <span
            className="text-[0.6875rem] font-semibold tracking-[0.22em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            {eyebrow}
          </span>
          {/* Right accent line (center-aligned) */}
          {isCenter && (
            <>
              <span
                className="inline-block h-px w-8 shrink-0 order-first"
                style={{
                  background:
                    'linear-gradient(270deg, var(--color-gold), var(--color-gold-light))',
                }}
                aria-hidden="true"
              />
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                }}
                aria-hidden="true"
              />
            </>
          )}
        </div>
      )}

      {/* Title + optional action row */}
      <div
        className={cn(
          'flex gap-6',
          isCenter
            ? 'flex-col items-center'
            : 'flex-col sm:flex-row sm:items-end sm:justify-between w-full'
        )}
      >
        <h2
          className="text-4xl sm:text-5xl font-light leading-[1.1] text-white"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {title}
        </h2>

        {/* Action link — shown inline on left, below title on center */}
        {action && (
          <Link
            href={action.href}
            className="group inline-flex items-center gap-2 shrink-0 text-sm font-medium tracking-widest uppercase transition-colors duration-200"
            style={{ color: 'var(--color-gray)' }}
          >
            <span className="group-hover:text-[var(--color-gold-light)] transition-colors duration-200">
              {action.label}
            </span>
            <span
              className="flex items-center justify-center w-7 h-7 rounded-[2px] transition-all duration-200 group-hover:translate-x-0.5"
              style={{
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                color: 'var(--color-gold)',
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </span>
          </Link>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            'text-base leading-relaxed max-w-2xl',
            isCenter && 'mx-auto'
          )}
          style={{ color: 'var(--color-gray)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
