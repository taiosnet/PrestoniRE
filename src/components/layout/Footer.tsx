import React from 'react';
import Link from 'next/link';
import FooterNewsletter from './FooterNewsletter';

/* ─── Social Icons ───────────────────────────────────────────────────────────── */

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com/prestoni', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com/prestoni', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/prestoni', Icon: LinkedInIcon },
  { label: 'X / Twitter', href: 'https://x.com/prestoni', Icon: TwitterXIcon },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Concierge', href: '/concierge' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Contact', href: '/contact' },
      { label: 'Partnerships', href: '/partnerships' },
    ],
  },
  {
    heading: 'Real Estate',
    links: [
      { label: 'Buy Luxury', href: '/buy' },
      { label: 'Pre-Construction', href: '/pre-construction' },
      { label: 'Global Markets', href: '/markets' },
      { label: 'Developers', href: '/developers' },
      { label: 'Off-Plan', href: '/off-plan' },
    ],
  },
  {
    heading: 'Lifestyle',
    links: [
      { label: 'Exotic Cars', href: '/lifestyle/cars' },
      { label: 'Timepieces', href: '/lifestyle/watches' },
      { label: 'Yachts', href: '/lifestyle/yachts' },
      { label: 'Private Jets', href: '/lifestyle/jets' },
      { label: 'Art & Collectibles', href: '/lifestyle/art' },
    ],
  },
  {
    heading: 'My Account',
    links: [
      { label: 'Sign In', href: '/auth' },
      { label: 'My Portfolio', href: '/dashboard' },
      { label: 'Saved Assets', href: '/dashboard' },
      { label: 'Market Reports', href: '/reports' },
      { label: 'Investment Guide', href: '/guides/investment' },
    ],
  },
  {
    heading: 'Partners',
    links: [
      { label: 'TAIOS Technology', href: '/taios' },
      { label: 'Wealth & Rich', href: '/wealth' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

/* ─── Footer ─────────────────────────────────────────────────────────────────── */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Site footer"
    >
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">

          {/* Brand Column */}
          <div className="flex flex-col gap-6">

            {/* Logo */}
            <div>
              <div
                className="text-white text-2xl font-light tracking-[0.25em] uppercase leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                PRESTONI
              </div>
              <div
                className="text-[0.6rem] tracking-[0.3em] uppercase mt-1 leading-none"
                style={{ color: 'var(--color-gold)', fontFamily: 'Inter, sans-serif' }}
              >
                Global Luxury Assets
              </div>
              <div
                className="mt-1.5 h-px"
                style={{
                  width: '120px',
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light), transparent)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed max-w-[240px]"
              style={{ color: 'var(--color-gray)', fontFamily: 'Inter, sans-serif' }}
            >
              The world&apos;s most discerning buyers trust Prestoni to discover, evaluate, and acquire the finest luxury assets across 32 countries.
            </p>

            {/* Social Icons — pure CSS hover via group */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={[
                    'footer-social-icon',
                    'flex items-center justify-center w-9 h-9 rounded-[2px]',
                    'transition-all duration-200',
                  ].join(' ')}
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Newsletter (client island) */}
            <div>
              <p
                className="text-xs font-medium tracking-[0.15em] uppercase mb-3"
                style={{ color: 'var(--color-gold)', fontFamily: 'Inter, sans-serif' }}
              >
                Market Intelligence
              </p>
              <p
                className="text-xs mb-3 leading-relaxed"
                style={{ color: 'var(--color-gray)', fontFamily: 'Inter, sans-serif' }}
              >
                Weekly curated intel on luxury markets, off-plan launches, and investment trends.
              </p>
              <FooterNewsletter />
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-6">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h3
                  className="text-xs font-semibold tracking-[0.18em] uppercase text-white"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="footer-col-link text-sm"
                        style={{ fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12" aria-hidden="true">
        <div
          className="h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--color-border), var(--color-border), transparent)',
          }}
        />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p
            className="text-xs"
            style={{ color: 'var(--color-muted)', fontFamily: 'Inter, sans-serif' }}
          >
            &copy; {currentYear} Prestoni Holdings. All rights reserved.
          </p>

          {/* Legal Links */}
          <nav className="flex items-center gap-1" aria-label="Legal navigation">
            {LEGAL_LINKS.map((link, i) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="footer-legal-link text-xs"
                  style={{ fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
                {i < LEGAL_LINKS.length - 1 && (
                  <span
                    className="text-xs mx-2"
                    style={{ color: 'var(--color-border)' }}
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Trust Badges */}
          <div className="flex items-center gap-3">
            {['SSL Secured', 'GDPR'].map((badge) => (
              <span
                key={badge}
                className="text-[0.625rem] font-medium tracking-[0.12em] uppercase px-2 py-1 rounded-[2px]"
                style={{
                  color: 'var(--color-muted)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
