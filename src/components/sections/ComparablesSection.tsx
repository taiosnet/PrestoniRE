'use client';

import { useState } from 'react';
import { BarChart2, BedDouble, Bath, Maximize2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PLACEHOLDERS = [
  { label: 'Comparable A', beds: '—', baths: '—', sqm: '—', price: '—', distance: '0.3 km away' },
  { label: 'Comparable B', beds: '—', baths: '—', sqm: '—', price: '—', distance: '0.6 km away' },
  { label: 'Comparable C', beds: '—', baths: '—', sqm: '—', price: '—', distance: '1.1 km away' },
];

export default function ComparablesSection() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2
          className="text-2xl font-light"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Comparable Properties
        </h2>
        {!revealed && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRevealed(true)}
            className="flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4" aria-hidden="true" />
            Load Comparables
          </Button>
        )}
      </div>

      {!revealed ? (
        <div
          className="flex flex-col items-center justify-center gap-3 py-12 rounded-[2px]"
          style={{
            background: 'var(--color-surface)',
            border: '1px dashed var(--color-border)',
          }}
        >
          <BarChart2
            className="w-8 h-8"
            style={{ color: 'var(--color-muted)' }}
            aria-hidden="true"
          />
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Comparable sales data available on request
          </p>
          <Button variant="outline" size="sm" onClick={() => setRevealed(true)}>
            Load Comparables
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLACEHOLDERS.map((comp) => (
            <div
              key={comp.label}
              className="flex flex-col gap-4 p-5 rounded-[2px]"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Image placeholder */}
              <div
                className="w-full h-36 rounded-[2px] flex items-center justify-center"
                style={{ background: 'var(--color-surface-2)' }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--color-border)' }}
                  >
                    <TrendingUp
                      className="w-4 h-4"
                      style={{ color: 'var(--color-muted)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    {comp.label}
                  </span>
                </div>
              </div>

              {/* Title placeholder */}
              <div className="flex flex-col gap-2">
                <div
                  className="h-4 rounded-full w-3/4"
                  style={{ background: 'var(--color-surface-2)' }}
                  aria-hidden="true"
                />
                <div
                  className="h-3 rounded-full w-1/2"
                  style={{ background: 'var(--color-surface-2)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Key facts */}
              <div
                className="flex items-center gap-3 text-xs pt-1 border-t"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
              >
                <span className="flex items-center gap-1">
                  <BedDouble className="w-3.5 h-3.5" aria-hidden="true" />
                  {comp.beds}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5" aria-hidden="true" />
                  {comp.baths}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  {comp.sqm}
                </span>
              </div>

              {/* Price + distance */}
              <div className="flex items-end justify-between">
                <div
                  className="h-5 rounded-full w-2/5"
                  style={{ background: 'var(--color-surface-2)' }}
                  aria-hidden="true"
                />
                <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {comp.distance}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {revealed && (
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          Comparable data is sourced from recent transactions in the same neighbourhood.
          Contact a Prestoni advisor for a full comparables report.
        </p>
      )}
    </div>
  );
}
