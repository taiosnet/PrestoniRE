'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProjectCard from '@/components/shared/ProjectCard';
import { PRE_CONSTRUCTION_PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Project, ProjectStatus } from '@/lib/types';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

type StatusFilter = 'All' | ProjectStatus;
type CountryFilter = 'All' | 'UAE' | 'USA' | 'Spain' | 'Portugal' | 'United Kingdom' | 'Indonesia';
type SortFilter = 'default' | 'price-asc' | 'price-desc';

const STATUS_TABS: StatusFilter[] = ['All', 'Launching Soon', 'Under Construction', 'Ready to Move'];
const COUNTRY_PILLS: CountryFilter[] = ['All', 'UAE', 'USA', 'Spain', 'Portugal', 'United Kingdom', 'Indonesia'];

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function PreConstructionFilters() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [countryFilter, setCountryFilter] = useState<CountryFilter>('All');
  const [sortFilter, setSortFilter] = useState<SortFilter>('default');

  /* ── Filtering & sorting ───────────────────────────────────────────────── */
  const projects: Project[] = PRE_CONSTRUCTION_PROJECTS.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (countryFilter !== 'All' && p.country !== countryFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortFilter === 'price-asc') return a.priceFrom - b.priceFrom;
    if (sortFilter === 'price-desc') return b.priceFrom - a.priceFrom;
    return 0;
  });

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* ── Filter Bar ──────────────────────────────────────────────── */}
        <div className="mb-10 space-y-5">
          {/* Status tabs */}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className="px-4 py-2 rounded-[2px] text-sm font-medium tracking-wide transition-all duration-200"
                  style={{
                    background:
                      statusFilter === tab
                        ? 'rgba(201,168,76,0.15)'
                        : 'var(--color-surface)',
                    border: `1px solid ${
                      statusFilter === tab
                        ? 'var(--color-gold)'
                        : 'var(--color-border)'
                    }`,
                    color:
                      statusFilter === tab
                        ? 'var(--color-gold)'
                        : 'var(--color-gray)',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value as SortFilter)}
                className="appearance-none pl-3 pr-8 h-9 rounded-[2px] text-sm bg-[var(--color-surface)] border border-[var(--color-border)] text-white focus:outline-none focus:border-[var(--color-gold)] transition-all duration-200 cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
              <ChevronDown
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: 'var(--color-muted)' }}
              />
            </div>
          </div>

          {/* Country pills */}
          <div className="flex flex-wrap gap-2">
            {COUNTRY_PILLS.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => setCountryFilter(country)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200'
                )}
                style={{
                  background:
                    countryFilter === country
                      ? 'var(--color-gold)'
                      : 'var(--color-surface-2)',
                  border: `1px solid ${
                    countryFilter === country
                      ? 'var(--color-gold)'
                      : 'var(--color-border)'
                  }`,
                  color:
                    countryFilter === country
                      ? '#0A0A0B'
                      : 'var(--color-gray)',
                }}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ────────────────────────────────────────────── */}
        <p className="text-sm mb-6" style={{ color: 'var(--color-gray)' }}>
          Showing{' '}
          <span className="text-white font-medium">{projects.length}</span> of{' '}
          <span className="text-white font-medium">{PRE_CONSTRUCTION_PROJECTS.length}</span>{' '}
          projects
        </p>

        {/* ── Projects Grid ─────────────────────────────────────────────── */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <span style={{ color: 'var(--color-muted)', fontSize: '1.5rem' }}>∅</span>
            </div>
            <h3
              className="text-2xl font-normal mb-2 text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              No projects match your criteria
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
              Try selecting a different status or country.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
