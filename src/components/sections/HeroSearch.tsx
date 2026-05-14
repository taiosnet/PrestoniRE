'use client';

import { useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown } from 'lucide-react';

/* ─── Options ────────────────────────────────────────────────────────────────── */

const PROPERTY_TYPES = [
  'All Types',
  'Villa',
  'Penthouse',
  'Estate',
  'Apartment',
  'Townhouse',
  'Mansion',
];

const STATUS_OPTIONS = [
  { label: 'All Status', value: '' },
  { label: 'Resale', value: 'resale' },
  { label: 'Pre-Construction', value: 'pre-construction' },
];

/* ─── Separator ──────────────────────────────────────────────────────────────── */

function Separator() {
  return (
    <span
      className="hidden sm:block self-stretch w-px shrink-0 my-3"
      style={{ background: 'rgba(42,42,47,0.8)' }}
      aria-hidden="true"
    />
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function HeroSearch() {
  const router = useRouter();
  const locationId = useId();
  const typeId = useId();
  const statusId = useId();

  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [status, setStatus] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (location.trim()) params.set('location', location.trim());
    if (propertyType && propertyType !== 'All Types') params.set('type', propertyType);
    if (status) params.set('status', status);

    const qs = params.toString();
    router.push(qs ? `/buy?${qs}` : '/buy');
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search luxury properties"
      className="w-full max-w-4xl"
    >
      <div
        className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-[3px] overflow-hidden"
        style={{
          background: 'rgba(17,17,19,0.92)',
          border: '1px solid rgba(42,42,47,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.06)',
        }}
      >

        {/* ── Location ───────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-5 py-4 flex-1 min-w-0">
          <MapPin
            className="w-4 h-4 shrink-0"
            style={{ color: 'var(--color-gold)' }}
            aria-hidden="true"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <label
              htmlFor={locationId}
              className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase mb-0.5"
              style={{ color: 'var(--color-muted)' }}
            >
              Location
            </label>
            <input
              id={locationId}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Dubai, Miami, Marbella…"
              className="bg-transparent border-none outline-none text-sm font-normal text-white placeholder:text-[var(--color-muted)] w-full"
              autoComplete="off"
            />
          </div>
        </div>

        <Separator />

        {/* ── Property Type ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-5 py-4 min-w-[180px]">
          <div className="flex flex-col flex-1 min-w-0 relative">
            <label
              htmlFor={typeId}
              className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase mb-0.5"
              style={{ color: 'var(--color-muted)' }}
            >
              Property Type
            </label>
            <div className="relative flex items-center">
              <select
                id={typeId}
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="appearance-none bg-transparent border-none outline-none text-sm font-normal text-white w-full pr-5 cursor-pointer"
                style={{ color: propertyType === 'All Types' ? 'var(--color-muted)' : 'white' }}
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t} style={{ background: '#111113', color: 'white' }}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-0 w-3.5 h-3.5 shrink-0"
                style={{ color: 'var(--color-muted)' }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* ── Status ─────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-5 py-4 min-w-[180px]">
          <div className="flex flex-col flex-1 min-w-0 relative">
            <label
              htmlFor={statusId}
              className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase mb-0.5"
              style={{ color: 'var(--color-muted)' }}
            >
              Status
            </label>
            <div className="relative flex items-center">
              <select
                id={statusId}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none bg-transparent border-none outline-none text-sm font-normal w-full pr-5 cursor-pointer"
                style={{ color: status === '' ? 'var(--color-muted)' : 'white' }}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: '#111113', color: 'white' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-0 w-3.5 h-3.5 shrink-0"
                style={{ color: 'var(--color-muted)' }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* ── Search Button ──────────────────────────────────────────────────── */}
        <div className="px-3 py-3 sm:py-2 flex items-center">
          <button
            type="submit"
            aria-label="Search properties"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-[2px] text-sm font-semibold tracking-widest uppercase transition-all duration-300 w-full sm:w-auto whitespace-nowrap cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 50%, var(--color-gold) 100%)',
              backgroundSize: '200% auto',
              color: '#0A0A0B',
              boxShadow: '0 4px 20px rgba(201,168,76,0.25)',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundPosition = 'right center';
              btn.style.boxShadow = '0 6px 30px rgba(201,168,76,0.4)';
              btn.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundPosition = 'left center';
              btn.style.boxShadow = '0 4px 20px rgba(201,168,76,0.25)';
              btn.style.transform = 'translateY(0)';
            }}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
