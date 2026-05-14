'use client';

import React, { useState } from 'react';

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p
        className="text-sm"
        style={{ color: 'var(--color-gold)', fontFamily: 'Inter, sans-serif' }}
      >
        Thank you — you&apos;ll receive your first briefing shortly.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
      aria-label="Newsletter subscription"
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        placeholder="Your email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="footer-newsletter-input flex-1 h-10 px-4 text-sm rounded-[2px]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      />
      <button
        type="submit"
        className="btn-gold whitespace-nowrap"
        style={{ padding: '0 1.25rem', height: '2.5rem', fontSize: '0.7rem' }}
      >
        Subscribe
      </button>
    </form>
  );
}
