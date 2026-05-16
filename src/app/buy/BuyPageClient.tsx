'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import PropertyCard from '@/components/shared/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FEATURED_PROPERTIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { SearchFilters, PropertyType } from '@/lib/types';

/* ─── Constants ──────────────────────────────────────────────────────────────── */

const PAGE_SIZE = 9;

const PROPERTY_TYPES: PropertyType[] = ['Villa', 'Penthouse', 'Estate', 'Apartment', 'Townhouse'];
const COUNTRIES = ['UAE', 'USA', 'Spain', 'Portugal', 'United Kingdom', 'Indonesia'];
const PRICE_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '$1M', value: 1_000_000 },
  { label: '$2M', value: 2_000_000 },
  { label: '$5M', value: 5_000_000 },
  { label: '$10M', value: 10_000_000 },
  { label: '$20M', value: 20_000_000 },
  { label: '$50M+', value: 50_000_000 },
];
const BEDS_OPTIONS = [1, 2, 3, 4, 5];
const COMPLETION_YEARS = [2025, 2026, 2027, 2028];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

/* ─── Collapsible Filter Group ───────────────────────────────────────────────── */

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--color-border)] pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span
          className="text-xs font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'var(--color-gray)' }}
        >
          {title}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            open ? 'rotate-180' : 'rotate-0'
          )}
          style={{ color: 'var(--color-muted)' }}
        />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

/* ─── Filter Sidebar Content ─────────────────────────────────────────────────── */

interface FiltersProps {
  filters: SearchFilters & { types: PropertyType[]; countries: string[]; completionYears: number[] };
  onFiltersChange: (
    f: SearchFilters & { types: PropertyType[]; countries: string[]; completionYears: number[] }
  ) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

function FilterSidebarContent({ filters, onFiltersChange, onClearAll, activeFilterCount }: FiltersProps) {
  function set(patch: Partial<typeof filters>) {
    onFiltersChange({ ...filters, ...patch });
  }

  function toggleType(t: PropertyType) {
    const next = filters.types.includes(t)
      ? filters.types.filter((x) => x !== t)
      : [...filters.types, t];
    set({ types: next });
  }

  function toggleCountry(c: string) {
    const next = filters.countries.includes(c)
      ? filters.countries.filter((x) => x !== c)
      : [...filters.countries, c];
    set({ countries: next });
  }

  function toggleYear(y: number) {
    const next = filters.completionYears.includes(y)
      ? filters.completionYears.filter((x) => x !== y)
      : [...filters.completionYears, y];
    set({ completionYears: next });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" style={{ color: 'var(--color-gold)' }} />
          <span className="text-sm font-semibold text-white">Filters</span>
          {activeFilterCount > 0 && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 text-[0.6rem] font-bold rounded-full"
              style={{
                background: 'var(--color-gold)',
                color: '#0A0A0B',
              }}
            >
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-medium transition-colors duration-200"
            style={{ color: 'var(--color-gold)' }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable filter groups */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-0">
        {/* Search */}
        <FilterGroup title="Search">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
              style={{ color: 'var(--color-muted)' }}
            />
            <input
              type="text"
              placeholder="City, neighborhood..."
              value={filters.query ?? ''}
              onChange={(e) => set({ query: e.target.value })}
              className="w-full h-10 pl-9 pr-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200"
            />
          </div>
        </FilterGroup>

        {/* Status */}
        <FilterGroup title="Status">
          <div className="space-y-2">
            {(['', 'resale', 'pre-construction'] as const).map((s) => (
              <label key={s} className="flex items-center gap-2.5 cursor-pointer group/radio">
                <span
                  className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    borderColor:
                      filters.status === s
                        ? 'var(--color-gold)'
                        : 'var(--color-border)',
                    background:
                      filters.status === s
                        ? 'rgba(201,168,76,0.15)'
                        : 'transparent',
                  }}
                >
                  {filters.status === s && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: 'var(--color-gold)' }}
                    />
                  )}
                </span>
                <input
                  type="radio"
                  className="sr-only"
                  checked={filters.status === s}
                  onChange={() => set({ status: s })}
                />
                <span
                  className="text-sm transition-colors duration-200"
                  style={{
                    color:
                      filters.status === s
                        ? 'var(--color-gold-light)'
                        : 'var(--color-gray)',
                  }}
                >
                  {s === '' ? 'All' : s === 'resale' ? 'Resale' : 'Pre-Construction'}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Property Type */}
        <FilterGroup title="Property Type">
          <div className="space-y-2">
            {PROPERTY_TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2.5 cursor-pointer">
                <span
                  className="w-4 h-4 rounded-[2px] border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    borderColor: filters.types.includes(t)
                      ? 'var(--color-gold)'
                      : 'var(--color-border)',
                    background: filters.types.includes(t)
                      ? 'rgba(201,168,76,0.15)'
                      : 'transparent',
                  }}
                >
                  {filters.types.includes(t) && (
                    <svg
                      className="w-2.5 h-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                      style={{ color: 'var(--color-gold)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters.types.includes(t)}
                  onChange={() => toggleType(t)}
                />
                <span
                  className="text-sm transition-colors duration-200"
                  style={{
                    color: filters.types.includes(t)
                      ? 'var(--color-gold-light)'
                      : 'var(--color-gray)',
                  }}
                >
                  {t}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Price Range */}
        <FilterGroup title="Price Range">
          <div className="space-y-3">
            <div>
              <label
                className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5"
                style={{ color: 'var(--color-muted)' }}
              >
                Min Price
              </label>
              <select
                value={filters.minPrice ?? 0}
                onChange={(e) => set({ minPrice: Number(e.target.value) || undefined })}
                className="w-full h-9 px-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white focus:outline-none focus:border-[var(--color-gold)] transition-all duration-200 cursor-pointer"
              >
                {PRICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5"
                style={{ color: 'var(--color-muted)' }}
              >
                Max Price
              </label>
              <select
                value={filters.maxPrice ?? 0}
                onChange={(e) => set({ maxPrice: Number(e.target.value) || undefined })}
                className="w-full h-9 px-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white focus:outline-none focus:border-[var(--color-gold)] transition-all duration-200 cursor-pointer"
              >
                {PRICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FilterGroup>

        {/* Bedrooms */}
        <FilterGroup title="Bedrooms">
          <div className="flex flex-wrap gap-2">
            {BEDS_OPTIONS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() =>
                  set({ minBeds: filters.minBeds === b ? undefined : b })
                }
                className="px-3 py-1.5 rounded-[2px] text-sm font-medium transition-all duration-200"
                style={{
                  background:
                    filters.minBeds === b
                      ? 'rgba(201,168,76,0.15)'
                      : 'var(--color-surface-2)',
                  border: `1px solid ${
                    filters.minBeds === b
                      ? 'var(--color-gold)'
                      : 'var(--color-border)'
                  }`,
                  color:
                    filters.minBeds === b
                      ? 'var(--color-gold)'
                      : 'var(--color-gray)',
                }}
              >
                {b}+
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* Country */}
        <FilterGroup title="Country">
          <div className="space-y-2">
            {COUNTRIES.map((c) => (
              <label key={c} className="flex items-center gap-2.5 cursor-pointer">
                <span
                  className="w-4 h-4 rounded-[2px] border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    borderColor: filters.countries.includes(c)
                      ? 'var(--color-gold)'
                      : 'var(--color-border)',
                    background: filters.countries.includes(c)
                      ? 'rgba(201,168,76,0.15)'
                      : 'transparent',
                  }}
                >
                  {filters.countries.includes(c) && (
                    <svg
                      className="w-2.5 h-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                      style={{ color: 'var(--color-gold)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters.countries.includes(c)}
                  onChange={() => toggleCountry(c)}
                />
                <span
                  className="text-sm transition-colors duration-200"
                  style={{
                    color: filters.countries.includes(c)
                      ? 'var(--color-gold-light)'
                      : 'var(--color-gray)',
                  }}
                >
                  {c}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Completion Year — only relevant for pre-construction */}
        {(filters.status === 'pre-construction' || filters.status === '') && (
          <FilterGroup title="Completion Year" defaultOpen={filters.status === 'pre-construction'}>
            <div className="flex flex-wrap gap-2">
              {COMPLETION_YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => toggleYear(y)}
                  className="px-3 py-1.5 rounded-[2px] text-sm font-medium transition-all duration-200"
                  style={{
                    background: filters.completionYears.includes(y)
                      ? 'rgba(201,168,76,0.15)'
                      : 'var(--color-surface-2)',
                    border: `1px solid ${
                      filters.completionYears.includes(y)
                        ? 'var(--color-gold)'
                        : 'var(--color-border)'
                    }`,
                    color: filters.completionYears.includes(y)
                      ? 'var(--color-gold)'
                      : 'var(--color-gray)',
                  }}
                >
                  {y === 2028 ? '2028+' : y}
                </button>
              ))}
            </div>
          </FilterGroup>
        )}
      </div>
    </div>
  );
}

/* ─── Initial / Empty Filters ────────────────────────────────────────────────── */

type ExtendedFilters = SearchFilters & {
  types: PropertyType[];
  countries: string[];
  completionYears: number[];
};

const EMPTY_FILTERS: ExtendedFilters = {
  query: '',
  status: '',
  types: [],
  countries: [],
  minPrice: undefined,
  maxPrice: undefined,
  minBeds: undefined,
  completionYears: [],
};

/* ─── Main Client Component ──────────────────────────────────────────────────── */

export default function BuyPageClient() {
  const [filters, setFilters] = useState<ExtendedFilters>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  /* ── Filtering ─────────────────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let result = [...FEATURED_PROPERTIES];

    // Text search
    if (filters.query?.trim()) {
      const q = filters.query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.location.neighborhood.toLowerCase().includes(q)
      );
    }

    // Status
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    // Types
    if (filters.types.length > 0) {
      result = result.filter((p) => filters.types.includes(p.type));
    }

    // Price min
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    // Price max
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Beds
    if (filters.minBeds) {
      result = result.filter((p) => p.beds >= filters.minBeds!);
    }

    // Countries
    if (filters.countries.length > 0) {
      result = result.filter((p) => filters.countries.includes(p.location.country));
    }

    // Completion year (only for pre-construction)
    if (filters.completionYears.length > 0) {
      result = result.filter(
        (p) =>
          !p.isOffPlan ||
          (p.completionYear !== undefined &&
            (filters.completionYears.includes(p.completionYear) ||
              (filters.completionYears.includes(2028) && p.completionYear >= 2028)))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.completionYear ?? 0) - (a.completionYear ?? 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  /* ── Pagination ────────────────────────────────────────────────────────── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFiltersChange = useCallback((f: ExtendedFilters) => {
    setFilters(f);
    setPage(1);
  }, []);

  const handleClearAll = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  }, []);

  /* ── Active filter count ───────────────────────────────────────────────── */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.query?.trim()) count++;
    if (filters.status) count++;
    if (filters.types.length) count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.minBeds) count++;
    if (filters.countries.length) count++;
    if (filters.completionYears.length) count++;
    return count;
  }, [filters]);

  /* ── Sidebar props ─────────────────────────────────────────────────────── */
  const sidebarProps: FiltersProps = {
    filters,
    onFiltersChange: handleFiltersChange,
    onClearAll: handleClearAll,
    activeFilterCount,
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div
        className="border-b border-[var(--color-border)] px-6 pt-28 pb-10 lg:px-12"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="max-w-screen-xl mx-auto">
          <p className="section-label mb-3">Luxury Real Estate</p>
          <h1
            className="text-4xl md:text-5xl text-white font-normal mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Properties for Sale
          </h1>
          <p className="text-sm max-w-xl" style={{ color: 'var(--color-gray)' }}>
            Curated ultra-prime residences across Dubai, Miami, Marbella, London, Lisbon and Bali —
            available for immediate acquisition or off-plan reservation.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* ── Desktop Sidebar ────────────────────────────────────────── */}
          <aside
            className="hidden lg:flex flex-col w-[280px] flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] rounded-[2px] p-5 overflow-hidden"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <FilterSidebarContent {...sidebarProps} />
          </aside>

          {/* ── Main Content ────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-[2px] text-sm font-medium transition-all duration-200"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-gray)',
                  }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span
                      className="inline-flex items-center justify-center w-4 h-4 text-[0.6rem] font-bold rounded-full"
                      style={{ background: 'var(--color-gold)', color: '#0A0A0B' }}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
                  Showing{' '}
                  <span className="text-white font-medium">{filtered.length}</span> of{' '}
                  <span className="text-white font-medium">{FEATURED_PROPERTIES.length}</span>{' '}
                  luxury properties
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as SortOption);
                      setPage(1);
                    }}
                    className="appearance-none pl-3 pr-8 h-9 rounded-[2px] text-sm bg-[var(--color-surface)] border border-[var(--color-border)] text-white focus:outline-none focus:border-[var(--color-gold)] transition-all duration-200 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                    style={{ color: 'var(--color-muted)' }}
                  />
                </div>

                {/* View toggle */}
                <div
                  className="flex rounded-[2px] overflow-hidden border"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <button
                    type="button"
                    onClick={() => setView('grid')}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                    style={{
                      background: view === 'grid' ? 'rgba(201,168,76,0.15)' : 'var(--color-surface)',
                      color: view === 'grid' ? 'var(--color-gold)' : 'var(--color-muted)',
                    }}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('list')}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-200 border-l"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: view === 'list' ? 'rgba(201,168,76,0.15)' : 'var(--color-surface)',
                      color: view === 'list' ? 'var(--color-gold)' : 'var(--color-muted)',
                    }}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {filters.query?.trim() && (
                  <FilterChip
                    label={`"${filters.query.trim()}"`}
                    onRemove={() => handleFiltersChange({ ...filters, query: '' })}
                  />
                )}
                {filters.status && (
                  <FilterChip
                    label={filters.status === 'resale' ? 'Resale' : 'Pre-Construction'}
                    onRemove={() => handleFiltersChange({ ...filters, status: '' })}
                  />
                )}
                {filters.types.map((t) => (
                  <FilterChip
                    key={t}
                    label={t}
                    onRemove={() =>
                      handleFiltersChange({ ...filters, types: filters.types.filter((x) => x !== t) })
                    }
                  />
                ))}
                {filters.minPrice ? (
                  <FilterChip
                    label={`From ${PRICE_OPTIONS.find((o) => o.value === filters.minPrice)?.label}`}
                    onRemove={() => handleFiltersChange({ ...filters, minPrice: undefined })}
                  />
                ) : null}
                {filters.maxPrice ? (
                  <FilterChip
                    label={`Up to ${PRICE_OPTIONS.find((o) => o.value === filters.maxPrice)?.label}`}
                    onRemove={() => handleFiltersChange({ ...filters, maxPrice: undefined })}
                  />
                ) : null}
                {filters.minBeds && (
                  <FilterChip
                    label={`${filters.minBeds}+ beds`}
                    onRemove={() => handleFiltersChange({ ...filters, minBeds: undefined })}
                  />
                )}
                {filters.countries.map((c) => (
                  <FilterChip
                    key={c}
                    label={c}
                    onRemove={() =>
                      handleFiltersChange({
                        ...filters,
                        countries: filters.countries.filter((x) => x !== c),
                      })
                    }
                  />
                ))}
                {filters.completionYears.map((y) => (
                  <FilterChip
                    key={y}
                    label={y === 2028 ? '2028+' : String(y)}
                    onRemove={() =>
                      handleFiltersChange({
                        ...filters,
                        completionYears: filters.completionYears.filter((x) => x !== y),
                      })
                    }
                  />
                ))}
              </div>
            )}

            {/* Property Grid or Empty State */}
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                >
                  <Search className="w-6 h-6" style={{ color: 'var(--color-muted)' }} />
                </div>
                <h3
                  className="text-2xl font-normal mb-2 text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  No properties match your filters
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--color-gray)' }}>
                  Try adjusting your search criteria to find available properties.
                </p>
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    'grid gap-5',
                    view === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {paginated.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      className={view === 'list' ? 'sm:flex-row' : ''}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--color-border)]">
                    <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
                      Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-[2px] text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-gray)',
                        }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPage(p)}
                            className="w-9 h-9 rounded-[2px] text-sm font-medium transition-all duration-200"
                            style={{
                              background:
                                p === currentPage
                                  ? 'rgba(201,168,76,0.15)'
                                  : 'var(--color-surface)',
                              border: `1px solid ${
                                p === currentPage
                                  ? 'var(--color-gold)'
                                  : 'var(--color-border)'
                              }`,
                              color:
                                p === currentPage
                                  ? 'var(--color-gold)'
                                  : 'var(--color-gray)',
                            }}
                          >
                            {p}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage >= totalPages}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-[2px] text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-gray)',
                        }}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ──────────────────────────────────────────── */}
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-opacity duration-300',
          mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(0,0,0,0.7)' }}
        onClick={() => setMobileFiltersOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-[300px] lg:hidden',
          'flex flex-col p-5',
          'transition-transform duration-300 ease-in-out',
          mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-[var(--color-border)]">
          <span
            className="text-base font-semibold"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Filter Properties
          </span>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-[2px] transition-all duration-200"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-gray)',
            }}
            aria-label="Close filters"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <FilterSidebarContent {...sidebarProps} />
        </div>

        <div className="pt-4 border-t border-[var(--color-border)] mt-4">
          <Button
            variant="default"
            size="md"
            className="w-full"
            onClick={() => setMobileFiltersOpen(false)}
          >
            Show {filtered.length} Properties
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Filter Chip ────────────────────────────────────────────────────────────── */

function FilterChip({ label, onRemove }: { label: string | undefined; onRemove: () => void }) {
  if (!label) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-medium"
      style={{
        background: 'rgba(201,168,76,0.1)',
        border: '1px solid rgba(201,168,76,0.3)',
        color: 'var(--color-gold-light)',
      }}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 transition-colors duration-200 hover:text-white"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
