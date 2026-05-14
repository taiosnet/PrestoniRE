'use client';

import { useState } from 'react';
import { BarChart2, BedDouble, Bath, Maximize2, CheckCircle, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Status = 'idle' | 'searching' | 'done';

const STEPS = [
  'Scanning neighbourhood transactions…',
  'Matching bed / bath / sqm profile…',
  'Filtering last 12 months of sales…',
  'Ranking by proximity & similarity…',
];

const DISTANCES = ['0.3 km away', '0.6 km away', '1.1 km away'];

export default function ComparablesSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [stepIndex, setStepIndex] = useState(0);

  function runSearch() {
    setStatus('searching');
    setStepIndex(0);

    STEPS.forEach((_, i) => {
      setTimeout(() => {
        setStepIndex(i);
        if (i === STEPS.length - 1) {
          setTimeout(() => setStatus('done'), 700);
        }
      }, i * 900);
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2
          className="text-2xl font-light"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Comparable Properties
        </h2>

        {status === 'idle' && (
          <Button
            variant="outline"
            size="sm"
            onClick={runSearch}
            className="flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4" aria-hidden="true" />
            Find Comparables
          </Button>
        )}

        {status === 'searching' && (
          <span className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-gold)' }}>
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            Analysing…
          </span>
        )}

        {status === 'done' && (
          <span className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-gray)' }}>
            <CheckCircle className="w-3.5 h-3.5" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
            3 comparables found
          </span>
        )}
      </div>

      {/* Search progress (only while searching) */}
      {status === 'searching' && (
        <div
          className="flex flex-col gap-2 px-5 py-4 rounded-[2px]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          {STEPS.map((step, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <div key={step} className="flex items-center gap-3 text-sm">
                {done ? (
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                ) : active ? (
                  <Loader2 className="w-4 h-4 shrink-0 animate-spin" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                ) : (
                  <div
                    className="w-4 h-4 shrink-0 rounded-full border"
                    style={{ borderColor: 'var(--color-border)' }}
                    aria-hidden="true"
                  />
                )}
                <span
                  style={{
                    color: done || active ? 'var(--color-gray)' : 'var(--color-muted)',
                  }}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Placeholder cards — always visible */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {DISTANCES.map((distance, i) => (
          <div
            key={distance}
            className="flex flex-col gap-4 p-5 rounded-[2px] transition-all duration-500"
            style={{
              background: 'var(--color-surface)',
              border: `1px solid ${status === 'done' ? 'var(--color-border)' : 'var(--color-border)'}`,
              opacity: status === 'searching' ? 0.4 + i * 0.1 : 1,
            }}
          >
            {/* Image placeholder */}
            <div
              className="w-full h-32 rounded-[2px] overflow-hidden relative flex items-center justify-center"
              style={{ background: 'var(--color-surface-2)' }}
            >
              {status === 'done' ? (
                /* Shimmer-style filled placeholder when results are "in" */
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, var(--color-surface-2) 0%, #22222a 50%, var(--color-surface-2) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <MapPin className="w-5 h-5" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                    <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>
                      {distance}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ background: 'var(--color-border)' }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Title skeleton */}
            <div className="flex flex-col gap-2">
              <div
                className="h-4 rounded-full transition-all duration-300"
                style={{
                  background: status === 'done' ? 'var(--color-surface-2)' : 'var(--color-surface-2)',
                  width: status === 'done' ? '80%' : '60%',
                }}
                aria-hidden="true"
              />
              <div
                className="h-3 rounded-full"
                style={{ background: 'var(--color-surface-2)', width: '50%' }}
                aria-hidden="true"
              />
            </div>

            {/* Key facts */}
            <div
              className="flex items-center gap-4 text-xs pt-1 border-t"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
            >
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5" aria-hidden="true" />
                {status === 'done' ? '—' : '—'}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" aria-hidden="true" />
                {status === 'done' ? '—' : '—'}
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                {status === 'done' ? '—' : '—'}
              </span>
            </div>

            {/* Price row */}
            <div className="flex items-center justify-between">
              <div
                className="h-5 rounded-full transition-all duration-300"
                style={{
                  background: status === 'done' ? 'rgba(201,168,76,0.15)' : 'var(--color-surface-2)',
                  width: '45%',
                }}
                aria-hidden="true"
              />
              {status === 'done' && (
                <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {distance}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
        {status === 'done'
          ? 'Comparable data sourced from recent neighbourhood transactions. Contact a Prestoni advisor for a full comparables report.'
          : 'Comparables are matched by location, size, bedroom count, and recent sale date within the same neighbourhood.'}
      </p>
    </div>
  );
}
