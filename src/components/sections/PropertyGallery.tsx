'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── Props ──────────────────────────────────────────────────────────────────── */

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col gap-3">
      {/* ── Main image ─────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[500px] overflow-hidden bg-[var(--color-surface-2)] rounded-[2px]">
        <Image
          src={images[activeIndex]}
          alt={`${title} — image ${activeIndex + 1}`}
          fill
          sizes="100vw"
          className="object-cover transition-opacity duration-300"
          priority={activeIndex === 0}
        />

        {/* Subtle gradient at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 60%, rgba(10,10,11,0.45) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Image counter */}
        <div
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-[2px] text-xs font-medium tracking-wider"
          style={{
            background: 'rgba(10,10,11,0.7)',
            backdropFilter: 'blur(8px)',
            color: 'var(--color-gray)',
            border: '1px solid var(--color-border)',
          }}
        >
          {activeIndex + 1} / {images.length}
        </div>

        {/* Navigation arrows — only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2',
                'w-10 h-10 rounded-[2px] flex items-center justify-center',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]'
              )}
              style={{
                background: 'rgba(10,10,11,0.65)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-gray)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gold)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gray)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goNext}
              aria-label="Next image"
              className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2',
                'w-10 h-10 rounded-[2px] flex items-center justify-center',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]'
              )}
              style={{
                background: 'rgba(10,10,11,0.65)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-gray)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gold)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gray)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnail row ──────────────────────────────────────────────────── */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.slice(0, 4).map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'relative flex-1 h-20 overflow-hidden rounded-[2px]',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
                activeIndex === i
                  ? 'ring-2 ring-[var(--color-gold)] opacity-100'
                  : 'opacity-60 hover:opacity-90'
              )}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 15vw"
                className="object-cover"
              />
              {/* Active overlay accent */}
              {activeIndex === i && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'rgba(201,168,76,0.08)' }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}

          {/* Show "+N more" if there are more than 4 images */}
          {images.length > 4 && (
            <button
              onClick={() => setActiveIndex(4)}
              className={cn(
                'relative flex-1 h-20 overflow-hidden rounded-[2px]',
                'flex items-center justify-center',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]',
                'opacity-70 hover:opacity-100'
              )}
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-gold)' }}
              >
                +{images.length - 4}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
