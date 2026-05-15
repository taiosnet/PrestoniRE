'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Buy', href: '/buy' },
  { label: 'Pre-Construction', href: '/pre-construction' },
  { label: 'Markets', href: '/markets' },
  { label: 'Developers', href: '/developers' },
  { label: 'List Property', href: '/list-property' },
];

const CURRENCIES = ['USD', 'EUR', 'AED', 'GBP'];
const LANGUAGES = ['EN', 'AR', 'ES', 'PT'];

/* ─── Crest SVG ──────────────────────────────────────────────────────────────── */

function Crest({ size = 52 }: { size?: number }) {
  const g = 'var(--color-gold)';
  const gl = 'var(--color-gold-light)';
  return (
    <svg
      width={size}
      height={Math.round(size * 1.18)}
      viewBox="0 0 80 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Crown ── */}
      {/* Base band */}
      <rect x="20" y="54" width="40" height="5" rx="1" fill={g} opacity="0.9" />
      {/* Three points */}
      <polygon points="22,54 26,44 30,54" fill={g} opacity="0.9" />
      <polygon points="37,54 40,42 43,54" fill={gl} />
      <polygon points="50,54 54,44 58,54" fill={g} opacity="0.9" />
      {/* Crown jewels */}
      <circle cx="40" cy="41" r="2.2" fill={gl} />
      <circle cx="26" cy="43" r="1.5" fill={g} />
      <circle cx="54" cy="43" r="1.5" fill={g} />

      {/* ── Shield ── */}
      {/* Shield outline — classic heater shape */}
      <path
        d="M13,58 L13,75 Q13,88 40,94 Q67,88 67,75 L67,58 Z"
        fill="#0e0e10"
        stroke={g}
        strokeWidth="1.4"
      />
      {/* Horizontal partition (fess) */}
      <line x1="13" y1="76" x2="67" y2="76" stroke={g} strokeWidth="0.8" opacity="0.6" />
      {/* Vertical partition */}
      <line x1="40" y1="58" x2="40" y2="94" stroke={g} strokeWidth="0.8" opacity="0.4" />

      {/* ── Charge: top-left — stylised lion passant ── */}
      {/* body */}
      <path d="M20,64 Q23,61 27,63 Q30,65 29,70 Q27,73 23,72 Q18,70 20,64Z" fill={g} opacity="0.85" />
      {/* head */}
      <circle cx="28" cy="62" r="3" fill={g} opacity="0.85" />
      {/* tail */}
      <path d="M20,65 Q16,62 17,59 Q19,57 21,60" fill="none" stroke={g} strokeWidth="1.2" opacity="0.8" strokeLinecap="round" />
      {/* front paw */}
      <path d="M28,68 L31,70" stroke={g} strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />

      {/* ── Charge: top-right — fleur-de-lis ── */}
      <path d="M50,60 Q50,57 53,56 Q56,57 56,60 Q56,63 53,64 Q50,63 50,60Z" fill={g} opacity="0.8" />
      <path d="M53,64 L53,72" stroke={g} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <path d="M49,67 Q51,65 53,67 Q55,65 57,67" fill="none" stroke={g} strokeWidth="1" opacity="0.8" />
      <path d="M51,71 Q50,69 53,68 Q56,69 55,71" fill={g} opacity="0.7" />

      {/* ── Bottom field — three mullets (stars) ── */}
      {[26, 40, 54].map((cx, i) => (
        <g key={i} transform={`translate(${cx},82)`}>
          {[0,72,144,216,288].map((a, j) => {
            const r1 = 3.2, r2 = 1.4;
            const rad = (a - 90) * Math.PI / 180;
            const rad2 = (a - 90 + 36) * Math.PI / 180;
            const x1 = r1 * Math.cos(rad), y1 = r1 * Math.sin(rad);
            const x2 = r2 * Math.cos(rad2), y2 = r2 * Math.sin(rad2);
            return j === 0
              ? <path key={j} d={`M ${x1.toFixed(2)} ${y1.toFixed(2)}`} />
              : null;
          })}
          <polygon
            points={[0,1,2,3,4].map(j => {
              const a1 = (j * 72 - 90) * Math.PI / 180;
              const a2 = (j * 72 - 90 + 36) * Math.PI / 180;
              return `${(3.2*Math.cos(a1)).toFixed(2)},${(3.2*Math.sin(a1)).toFixed(2)} ${(1.4*Math.cos(a2)).toFixed(2)},${(1.4*Math.sin(a2)).toFixed(2)}`;
            }).join(' ')}
            fill={gl}
            opacity={i === 1 ? 1 : 0.75}
          />
        </g>
      ))}

      {/* ── Outer decorative border ── */}
      <path
        d="M13,58 L13,75 Q13,88 40,94 Q67,88 67,75 L67,58 Z"
        fill="none"
        stroke={gl}
        strokeWidth="0.4"
        opacity="0.35"
        strokeDasharray="2 2"
      />

      {/* ── Mantling scrolls ── */}
      <path d="M13,65 Q7,68 8,74 Q9,80 13,78" fill="none" stroke={g} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
      <path d="M67,65 Q73,68 72,74 Q71,80 67,78" fill="none" stroke={g} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Logo ───────────────────────────────────────────────────────────────────── */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none" aria-label="Prestoni — Home">
      {/* Crest */}
      <div className="transition-transform duration-500 group-hover:scale-105 shrink-0">
        <Crest size={46} />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span
          className="leading-none tracking-[0.18em] transition-colors duration-300"
          style={{
            fontFamily: "'Cinzel Decorative', 'Cinzel', 'Cormorant Garamond', Georgia, serif",
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--color-gold-light)',
            textShadow: '0 0 20px rgba(232,201,122,0.25)',
            letterSpacing: '0.22em',
          }}
        >
          PRESTONI
        </span>
        <span
          className="mt-1 leading-none tracking-[0.28em] uppercase"
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: '0.52rem',
            color: 'var(--color-gray)',
            letterSpacing: '0.3em',
          }}
        >
          Est. Properties
        </span>
        {/* Gold rule */}
        <span
          className="block mt-1.5"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, var(--color-gold) 0%, rgba(201,168,76,0.3) 70%, transparent 100%)',
            width: '100%',
          }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

/* ─── Currency Selector ──────────────────────────────────────────────────────── */

function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('USD');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-[2px]',
          'border border-[var(--color-border)] text-[var(--color-gray)]',
          'hover:border-[rgba(201,168,76,0.4)] hover:text-[var(--color-gold-light)]',
          'transition-all duration-200 cursor-pointer',
          open && 'border-[rgba(201,168,76,0.4)] text-[var(--color-gold-light)]'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected}
        <svg
          className={cn('w-3 h-3 transition-transform duration-200', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-24 rounded-[2px] overflow-hidden z-50"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          }}
          role="listbox"
        >
          {CURRENCIES.map((c) => (
            <button
              key={c}
              role="option"
              aria-selected={c === selected}
              onClick={() => { setSelected(c); setOpen(false); }}
              className={cn(
                'w-full text-left px-4 py-2 text-xs font-medium tracking-widest uppercase',
                'transition-colors duration-150 cursor-pointer',
                c === selected
                  ? 'text-[var(--color-gold)] bg-[rgba(201,168,76,0.08)]'
                  : 'text-[var(--color-gray)] hover:text-white hover:bg-[var(--color-surface-2)]'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Language Selector ──────────────────────────────────────────────────────── */

function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('EN');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-[2px]',
          'text-[var(--color-gray)] hover:text-white transition-colors duration-200 cursor-pointer'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        {selected}
        <svg
          className={cn('w-3 h-3 transition-transform duration-200', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-24 rounded-[2px] overflow-hidden z-50"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          }}
          role="listbox"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              role="option"
              aria-selected={lang === selected}
              onClick={() => { setSelected(lang); setOpen(false); }}
              className={cn(
                'w-full text-left px-4 py-2 text-xs font-medium tracking-widest uppercase',
                'transition-colors duration-150 cursor-pointer',
                lang === selected
                  ? 'text-[var(--color-gold)] bg-[rgba(201,168,76,0.08)]'
                  : 'text-[var(--color-gray)] hover:text-white hover:bg-[var(--color-surface-2)]'
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Mobile Menu ────────────────────────────────────────────────────────────── */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(10,10,11,0.85)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[min(85vw,380px)] z-50',
          'flex flex-col transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <Logo />
          <button
            onClick={onClose}
            className="p-2 rounded-[2px] text-[var(--color-gray)] hover:text-white hover:bg-[var(--color-surface-2)] transition-colors duration-200 cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'px-4 py-3 rounded-[2px] text-sm font-medium tracking-widest uppercase',
                'text-[var(--color-gray)] hover:text-white hover:bg-[var(--color-surface-2)]',
                'transition-all duration-200 border border-transparent',
                'hover:border-[rgba(201,168,76,0.15)]',
                'relative group'
              )}
            >
              <span className="flex items-center justify-between">
                {link.label}
                <svg className="w-4 h-4 opacity-30 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div
          className="px-6 py-6 flex flex-col gap-3"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-3 mb-1">
            <CurrencySelector />
            <LanguageSelector />
          </div>

          <Link
            href="/signin"
            onClick={onClose}
            className="btn-outline text-center w-full"
          >
            Sign In
          </Link>

          <Link
            href="/list-property"
            onClick={onClose}
            className="btn-gold text-center w-full"
          >
            List Property
          </Link>
        </div>
      </div>
    </>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-500',
          scrolled
            ? 'py-3'
            : 'py-5'
        )}
        style={{
          background: scrolled
            ? 'rgba(10,10,11,0.92)'
            : 'linear-gradient(to bottom, rgba(10,10,11,0.8) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(42,42,47,0.6)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-sm font-medium tracking-[0.08em] uppercase text-[var(--color-gray)] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-3">
              <CurrencySelector />
              <LanguageSelector />
              <div className="w-px h-5 bg-[var(--color-border)] mx-1" aria-hidden="true" />
              <Link href="/signin" className="btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>
                Sign In
              </Link>
              <Link href="/list-property" className="btn-gold" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>
                List Property
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-[2px] text-[var(--color-gray)] hover:text-white hover:bg-[var(--color-surface-2)] transition-colors duration-200 cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
