'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section
      aria-label="Newsletter signup"
      className="relative py-16 lg:py-20"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-gold) 30%, var(--color-gold-light) 50%, var(--color-gold) 70%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse at center, var(--color-gold), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-6">
        <p className="section-label">Market Intelligence</p>

        <h2
          className="text-3xl sm:text-4xl font-light text-white max-w-xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.01em' }}
        >
          Stay Ahead of the{' '}
          <span className="gold-text">Market</span>
        </h2>

        <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--color-gray)' }}>
          Weekly briefings on luxury asset performance — real estate, exotic cars, watches, yachts,
          and private jets. Curated for discerning investors.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <p
              className="text-base font-normal"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-gold-light)' }}
            >
              You&apos;re on the list.
            </p>
            <p className="text-xs" style={{ color: 'var(--color-gray)' }}>
              Your first briefing will arrive this week.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            aria-label="Newsletter subscription"
          >
            <label htmlFor="newsletter-section-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-section-email"
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-[2px] text-sm text-white placeholder-[var(--color-muted)] outline-none"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            />
            <button
              type="submit"
              className="btn-gold shrink-0"
              style={{ padding: '0 1.5rem', height: '48px' }}
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[0.65rem]" style={{ color: 'var(--color-muted)' }}>
          No spam. Unsubscribe anytime. Trusted by 12,000+ HNW investors.
        </p>
      </div>
    </section>
  );
}
