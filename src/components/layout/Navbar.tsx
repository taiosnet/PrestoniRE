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

/* ─── Logo ───────────────────────────────────────────────────────────────────── */

function Logo() {
  return (
    <Link href="/" className="flex flex-col group focus-visible:outline-none" aria-label="Prestoni — Home">
      <span
        className="text-white text-2xl font-light tracking-[0.25em] uppercase leading-none group-hover:text-[var(--color-gold-light)] transition-colors duration-300"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        PRESTONI
      </span>
      <span
        className="text-[0.6rem] tracking-[0.3em] uppercase mt-1 leading-none"
        style={{ color: 'var(--color-gold)', fontFamily: 'Inter, sans-serif' }}
      >
        Global Luxury Properties
      </span>
      <span
        className="block h-px mt-1.5 bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-gold-light)] to-transparent"
        style={{ width: '100%' }}
        aria-hidden="true"
      />
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
