import Image from 'next/image';
import Link from 'next/link';
import { Search, ShieldCheck, TrendingUp } from 'lucide-react';

import { FEATURED_PROPERTIES, PRE_CONSTRUCTION_PROJECTS, MARKETS, TESTIMONIALS, STATS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import PropertyCard from '@/components/shared/PropertyCard';
import ProjectCard from '@/components/shared/ProjectCard';
import SectionHeader from '@/components/shared/SectionHeader';
import HeroSearch from '@/components/sections/HeroSearch';
import { Button } from '@/components/ui/button';

/* ─── Hero Trust Stats ───────────────────────────────────────────────────────── */

const TRUST_STATS = [
  { value: `${STATS.totalListings.toLocaleString()}+`, label: 'Listings' },
  { value: `${STATS.countries}`, label: 'Countries' },
  { value: `${STATS.developers}+`, label: 'Developers' },
  { value: STATS.totalValue, label: 'Total Value' },
];

/* ─── How It Works ───────────────────────────────────────────────────────────── */

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: 'Curated Global Inventory',
    body: '5,000+ vetted luxury properties across 32 countries. Every listing meets our strict quality criteria — minimum $1M, verified ownership, professional imagery.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified & Trusted',
    body: 'Every listing is verified. Every developer is vetted. Our advisors are RERA-licensed in the UAE and hold active real estate licences in the USA, Spain, Portugal, and Indonesia.',
  },
  {
    icon: TrendingUp,
    title: 'White-Glove Service',
    body: 'From first enquiry to title transfer, our multilingual advisors manage every detail — legal due diligence, mortgage introductions, and cross-border tax structuring.',
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  // Only show first 6 featured properties and first 3 projects
  const featuredProperties = FEATURED_PROPERTIES.slice(0, 6);
  const spotlightProjects = PRE_CONSTRUCTION_PROJECTS.slice(0, 3);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* A. HERO                                                                 */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Hero"
        className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600"
            alt="Luxury beachfront villa — Prestoni Global Properties"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.62) 60%, rgba(10,10,11,0.85) 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center pt-32 pb-20">

          {/* Eyebrow */}
          <p className="section-label mb-6">
            The World&apos;s Premier Luxury Property Platform
          </p>

          {/* H1 */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] text-white max-w-5xl mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.02em' }}
          >
            Where Exceptional Properties Find{' '}
            <span className="gold-text">Exceptional Buyers</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl mb-10"
            style={{ color: 'rgba(136,136,150,0.95)' }}
          >
            5,000+ curated luxury properties across 32 countries.
            Off-plan. Resale. Bespoke.
          </p>

          {/* Search bar */}
          <div className="w-full flex justify-center mb-10">
            <HeroSearch />
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div className="text-center">
                  <span
                    className="block text-lg sm:text-xl font-normal leading-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: 'var(--color-gold-light)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="block text-[0.65rem] font-medium tracking-[0.18em] uppercase mt-1"
                    style={{ color: 'rgba(136,136,150,0.8)' }}
                  >
                    {stat.label}
                  </span>
                </div>
                {i < TRUST_STATS.length - 1 && (
                  <span
                    className="h-6 w-px"
                    style={{ background: 'rgba(42,42,47,0.8)' }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
          <span
            className="text-[0.6rem] font-medium tracking-[0.22em] uppercase"
            style={{ color: 'var(--color-gray)' }}
          >
            Scroll
          </span>
          <span
            className="w-px h-8 animate-pulse"
            style={{ background: 'linear-gradient(to bottom, var(--color-gold), transparent)' }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* B. FEATURED PROPERTIES                                                 */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Featured Properties"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          <SectionHeader
            eyebrow="Curated Selection"
            title="Featured Properties"
            action={{ label: 'View All Properties', href: '/buy' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* C. PRE-CONSTRUCTION SPOTLIGHT                                          */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Pre-Construction Projects"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          {/* Subtle top border accent */}
          <div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)',
            }}
            aria-hidden="true"
          />

          <SectionHeader
            eyebrow="Off-Plan Investment"
            title="Pre-Construction Projects"
            subtitle="Secure tomorrow's luxury at today's prices — developer-direct with 2–8% commission opportunities."
            action={{ label: 'Explore All Projects', href: '/pre-construction' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotlightProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* D. MARKETS                                                              */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Global Markets"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          <SectionHeader
            eyebrow="Global Markets"
            title="Prime Locations Worldwide"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MARKETS.map((market) => {
              const avgFormatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(market.avgPrice);

              const isPositive = market.yoy.startsWith('+');

              return (
                <Link
                  key={market.name}
                  href={`/markets/${market.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-[2px] aspect-[4/3] block"
                  style={{
                    border: '1px solid var(--color-border)',
                  }}
                  aria-label={`Explore ${market.name}, ${market.country}`}
                >
                  {/* Background image */}
                  <Image
                    src={market.image}
                    alt={`${market.name} luxury property market`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(10,10,11,0.1) 0%, rgba(10,10,11,0.45) 40%, rgba(10,10,11,0.9) 100%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Gold border on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[2px]"
                    style={{
                      boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.4)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    {/* Flag + YoY badge row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl leading-none" role="img" aria-label={market.country}>
                        {market.flag}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[0.65rem] font-semibold tracking-wider"
                        style={{
                          background: isPositive
                            ? 'rgba(52,199,89,0.15)'
                            : 'rgba(255,69,58,0.15)',
                          border: `1px solid ${isPositive ? 'rgba(52,199,89,0.35)' : 'rgba(255,69,58,0.35)'}`,
                          color: isPositive ? '#34C759' : '#FF453A',
                        }}
                      >
                        {market.yoy} YoY
                      </span>
                    </div>

                    {/* City name */}
                    <h3
                      className="text-3xl font-light leading-none text-white mb-0.5"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {market.name}
                    </h3>

                    {/* Country */}
                    <p
                      className="text-xs font-medium tracking-[0.14em] uppercase mb-3"
                      style={{ color: 'var(--color-gray)' }}
                    >
                      {market.country}
                    </p>

                    {/* Stats row */}
                    <div
                      className="flex items-center justify-between pt-3"
                      style={{ borderTop: '1px solid rgba(42,42,47,0.7)' }}
                    >
                      <div>
                        <p
                          className="text-base font-normal leading-none"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            color: 'var(--color-gold)',
                          }}
                        >
                          {avgFormatted} avg
                        </p>
                        <p
                          className="text-[0.6rem] tracking-[0.12em] uppercase mt-0.5 font-medium"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          Avg. Price
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-base font-normal leading-none text-white"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {market.listingCount.toLocaleString()}
                        </p>
                        <p
                          className="text-[0.6rem] tracking-[0.12em] uppercase mt-0.5 font-medium"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          Listings
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* E. HOW IT WORKS                                                         */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="The Prestoni Difference"
        className="py-20 lg:py-28 relative"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* Subtle top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.2) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-16">
          <SectionHeader
            eyebrow="Our Approach"
            title="The Prestoni Difference"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col gap-5 p-8 rounded-[2px]"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-[2px] shrink-0"
                    style={{
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.2)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: 'var(--color-gold)' }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Gold divider */}
                  <span className="gold-divider" aria-hidden="true" />

                  {/* Text */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-xl font-normal leading-[1.2] text-white"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-gray)' }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* F. TESTIMONIALS                                                         */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Client Stories"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          <SectionHeader
            eyebrow="Client Stories"
            title="Trusted by the World's Most Discerning Buyers"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <article
                key={testimonial.id}
                className="flex flex-col gap-5 p-7 rounded-[2px]"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                {/* Large quote mark */}
                <div
                  className="text-5xl leading-none font-light select-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: 'var(--color-gold)',
                    opacity: 0.6,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: 'var(--color-gold)' }}
                      aria-hidden="true"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p
                  className="text-sm leading-relaxed italic flex-1"
                  style={{ color: 'var(--color-gray)' }}
                >
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Divider */}
                <div
                  className="h-px"
                  style={{ background: 'var(--color-border)' }}
                  aria-hidden="true"
                />

                {/* Author */}
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-white leading-none">
                    {testimonial.name}
                  </p>
                  <p
                    className="text-xs font-normal leading-none mt-1"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {testimonial.role}
                  </p>
                  <p
                    className="text-[0.7rem] font-medium tracking-wide mt-2"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    {testimonial.property} &middot; {testimonial.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* G. CTA BANNER                                                           */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Call to Action"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* Gold top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--color-gold) 30%, var(--color-gold-light) 50%, var(--color-gold) 70%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Decorative radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-gold), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-8">
          {/* Eyebrow */}
          <p className="section-label">Start Your Search Today</p>

          {/* Title */}
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-white max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.01em' }}
          >
            Ready to Find Your{' '}
            <span className="gold-text">Exceptional Property?</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ color: 'var(--color-gray)' }}
          >
            Speak with a Prestoni advisor today. No obligation, complete discretion.
            Our team operates across all time zones, 7 days a week.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/buy">
              <Button variant="default" size="lg">
                Browse Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact an Advisor
              </Button>
            </Link>
          </div>

          {/* Phone + WhatsApp */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 pt-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {/* Phone */}
            <a
              href="tel:+17865550100"
              className="flex items-center gap-2.5 text-sm font-medium transition-colors duration-200 group"
              style={{ color: 'var(--color-gray)' }}
              aria-label="Call Prestoni"
            >
              {/* Phone icon */}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-[2px] shrink-0 group-hover:border-[rgba(201,168,76,0.4)] transition-colors duration-200"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-gray)',
                }}
                aria-hidden="true"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
              <span className="group-hover:text-white transition-colors duration-200">
                +1 (786) 555-0100
              </span>
            </a>

            {/* Separator */}
            <span
              className="hidden sm:block h-4 w-px"
              style={{ background: 'var(--color-border)' }}
              aria-hidden="true"
            />

            {/* WhatsApp */}
            <a
              href="https://wa.me/17865550100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm font-medium transition-colors duration-200 group"
              style={{ color: 'var(--color-gray)' }}
              aria-label="Message Prestoni on WhatsApp"
            >
              {/* WhatsApp icon */}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-[2px] shrink-0 transition-colors duration-200 group-hover:border-[rgba(52,199,89,0.4)]"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  color: 'rgba(52,199,89,0.8)',
                }}
                aria-hidden="true"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <span className="group-hover:text-white transition-colors duration-200">
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
