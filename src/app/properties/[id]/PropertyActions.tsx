'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

/* ─── Share Button ───────────────────────────────────────────────────────────── */

export function ShareButton() {
  const handleShare = () => {
    if (typeof navigator !== 'undefined') {
      if (navigator.share) {
        navigator
          .share({ title: document.title, url: window.location.href })
          .catch(() => {});
      } else {
        navigator.clipboard?.writeText(window.location.href);
      }
    }
  };

  return (
    <button
      aria-label="Share this property"
      onClick={handleShare}
      className="w-10 h-10 rounded-[2px] flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
      style={{
        background: 'rgba(10,10,11,0.72)',
        backdropFilter: 'blur(10px)',
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
      <Share2 className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}

/* ─── Favourite Button ───────────────────────────────────────────────────────── */

export function FavouriteButton() {
  const [isFav, setIsFav] = useState(false);

  return (
    <button
      aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={isFav}
      onClick={() => setIsFav((f) => !f)}
      className="w-10 h-10 rounded-[2px] flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
      style={{
        background: 'rgba(10,10,11,0.72)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isFav ? 'rgba(255,69,58,0.5)' : 'var(--color-border)'}`,
        color: isFav ? '#FF453A' : 'var(--color-gray)',
        transition: 'color 0.2s, border-color 0.2s, background 0.2s',
      }}
    >
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill={isFav ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
        style={{ transition: 'fill 0.2s' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
