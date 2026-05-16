'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'prestoni_newsletter_dismissed';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(dismiss, 2000);
    }
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60]"
        style={{ background: 'rgba(10,10,11,0.75)', backdropFilter: 'blur(6px)' }}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter signup"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-[min(90vw,480px)] rounded-[2px] p-8 flex flex-col gap-5"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderTop: '3px solid var(--color-gold)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-[2px] transition-colors duration-200 cursor-pointer"
          style={{ color: 'var(--color-gray)' }}
          aria-label="Close newsletter popup"
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-2)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gray)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Eyebrow */}
        <p className="section-label">Exclusive Intelligence</p>

        {submitted ? (
          <div className="flex flex-col gap-2 py-4 text-center">
            <p
              className="text-2xl font-normal"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-gold-light)' }}
            >
              Welcome aboard.
            </p>
            <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
              Your first market briefing will arrive this week.
            </p>
          </div>
        ) : (
          <>
            <h3
              className="text-2xl font-normal leading-[1.2] text-white pr-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Join 12,000 Discerning Investors
            </h3>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
              Receive weekly market intelligence on luxury assets — real estate, rare cars, investment
              watches, yachts, and more. No noise, only signal.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3" aria-label="Newsletter popup">
              <label htmlFor="popup-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="popup-newsletter-email"
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-[2px] text-sm text-white placeholder-[var(--color-muted)] outline-none"
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
                className="btn-gold w-full"
                style={{ padding: '0.875rem' }}
              >
                Get Access
              </button>
            </form>

            <p className="text-[0.65rem] text-center" style={{ color: 'var(--color-muted)' }}>
              No spam &middot; Unsubscribe anytime
            </p>
          </>
        )}
      </div>
    </>
  );
}
