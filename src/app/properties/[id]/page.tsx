import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BedDouble, Bath, Maximize2, Home, CheckCircle2, MapPin, TrendingUp, Calendar, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PropertyGallery from '@/components/sections/PropertyGallery';
import PropertyEnquiry from '@/components/sections/PropertyEnquiry';
import SectionHeader from '@/components/shared/SectionHeader';
import PropertyCard from '@/components/shared/PropertyCard';
import { ShareButton, FavouriteButton } from './PropertyActions';
import { FEATURED_PROPERTIES } from '@/lib/data';
import type { Metadata } from 'next';

/* ─── Static params ──────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return FEATURED_PROPERTIES.map((p) => ({ id: p.id }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = FEATURED_PROPERTIES.find((p) => p.id === id);
  if (!property) return { title: 'Property Not Found' };

  return {
    title: `${property.title} — ${property.location.city}`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} | Prestoni`,
      description: property.description.slice(0, 160),
      images: [{ url: property.mainImage, width: 800, height: 600, alt: property.title }],
    },
  };
}

/* ─── Neighbourhood descriptions ─────────────────────────────────────────────── */

const NEIGHBORHOOD_DESCRIPTIONS: Record<string, string> = {
  'Palm Jumeirah':
    "Palm Jumeirah is Dubai's most iconic address — a palm-shaped artificial archipelago stretching into the Arabian Gulf. Home to some of the world's most celebrated hotels and private residences, it offers unmatched waterfront living with dedicated marinas, beach clubs, and the Atlantis resort at its crown. Property values here consistently outperform the wider Dubai market.",
  'Dubai Creek Harbour':
    "Dubai Creek Harbour is Emaar's flagship mixed-use mega-development set to house the world's new tallest tower. Situated alongside the historic Dubai Creek, it blends nature reserve living with ultra-modern urban infrastructure. The 6-km waterfront promenade, yacht club, and direct metro connectivity make it one of the most sought-after investment addresses in the UAE.",
  'Star Island':
    "Star Island is Miami's most exclusive private residential community — a gated island enclave accessible only by bridge, home to celebrities, billionaires, and heads of state. With deep-water frontage on Biscayne Bay and strict privacy protections, it commands some of the highest per-square-foot prices in all of Florida. Neighboured by Hibiscus and Palm Islands, the address is simply without peer in South Florida.",
  Brickell:
    "Brickell is Miami's Manhattan — a vertical, walkable financial district rising from the shores of Biscayne Bay. The neighbourhood has undergone a transformational decade of luxury development, drawing international capital, acclaimed restaurateurs, and world-class cultural institutions. The Brickell City Centre and adjacent Mary Brickell Village provide an unrivalled urban luxury lifestyle.",
  'Comporta Village':
    "Comporta is Portugal's best-kept secret — a wild, pine-forested Atlantic coastline just 90 minutes south of Lisbon that has attracted Europe's most discerning second-home buyers while retaining its natural character. Protected from overdevelopment, properties here are rare by design. The village's laid-back sophistication, horse-dotted rice paddies, and UNESCO-quality beaches have earned it comparisons to the Hamptons and Saint-Tropez.",
  'La Zagaleta':
    "La Zagaleta is Europe's most exclusive private residential estate — 900 hectares of Andalusian hills above Marbella, accessible only to owners and their invited guests. With two championship golf courses, an equestrian centre, and its own heliport, it sets the global benchmark for gated luxury living. The estate's southern orientation delivers unrivalled Mediterranean and Strait of Gibraltar vistas, while strict planning controls protect values for generations.",
  Knightsbridge:
    "Knightsbridge sits at the very apex of London's prime residential market — home to Harrods, the Mandarin Oriental, and some of the highest-value residential real estate on earth. Overlooking Hyde Park's 142 hectares of royal parkland, the neighbourhood delivers both the energy of world-class shopping and the serenity of London's finest green space. Ultra-prime Knightsbridge addresses consistently attract long-term capital preservation buyers from across the globe.",
  Uluwatu:
    "Uluwatu crowns the Bukit Peninsula at Bali's southernmost tip — a landscape of dramatic limestone cliffs, world-renowned surf breaks, and a rapidly maturing ultra-luxury villa market. The elevated clifftop sites, Indian Ocean panoramas, and proximity to Bali's finest beach clubs (Savaya, Sundays) have driven sustained international buyer demand. Uluwatu's limited land availability, combined with high rental yields from the global luxury travel market, creates compelling investment fundamentals.",
};

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = FEATURED_PROPERTIES.find((p) => p.id === id);
  if (!property) notFound();

  const {
    title,
    priceFormatted,
    currency,
    location,
    type,
    beds,
    baths,
    sqm,
    status,
    isOffPlan,
    completionYear,
    developer,
    description,
    images,
    amenities,
    coordinates,
  } = property;

  const sqft = Math.round(sqm * 10.764);

  // Related properties: same city first, then fill from others
  const sameCityProps = FEATURED_PROPERTIES.filter(
    (p) => p.id !== id && p.location.city === location.city
  );
  const otherProps = FEATURED_PROPERTIES.filter(
    (p) => p.id !== id && p.location.city !== location.city
  );
  const relatedProperties = [...sameCityProps, ...otherProps].slice(0, 3);

  const neighborhoodDesc =
    NEIGHBORHOOD_DESCRIPTIONS[location.neighborhood] ??
    `${location.neighborhood} is a premier address in ${location.city}, ${location.country}, offering exceptional amenities, world-class infrastructure, and a vibrant community of discerning residents from across the globe. The area has seen consistent capital appreciation and remains one of the most sought-after destinations for luxury property investment.`;

  const currencyNote =
    currency === 'USD'
      ? 'Price in USD • Tax may apply'
      : currency === 'EUR'
      ? 'Price in EUR • Tax may apply'
      : currency === 'GBP'
      ? 'Price in GBP • Stamp duty may apply'
      : `Price in ${currency} • Tax may apply`;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-white)' }}
    >
      {/* ── Gallery ──────────────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Back + action buttons overlaid on top of gallery */}
        <div className="absolute top-4 left-4 z-20">
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-[2px] text-sm font-medium tracking-wide transition-all duration-200"
            style={{
              background: 'rgba(10,10,11,0.72)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-gray)',
            }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All Properties
          </Link>
        </div>

        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <ShareButton />
          <FavouriteButton />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0">
          <PropertyGallery images={images} title={title} />
        </div>
      </section>

      {/* ── Breadcrumb ────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 flex-wrap text-xs tracking-wide"
          style={{ color: 'var(--color-muted)' }}
        >
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-[var(--color-gold-light)]"
          >
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/buy"
            className="transition-colors duration-200 hover:text-[var(--color-gold-light)]"
          >
            Buy
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: 'var(--color-gray)' }}>{location.city}</span>
          <span aria-hidden="true">/</span>
          <span
            className="truncate max-w-[200px]"
            style={{ color: 'var(--color-gray)' }}
            title={title}
          >
            {title}
          </span>
        </nav>
      </div>

      {/* ── Main content grid ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-14">

          {/* ──── Left column (2/3) ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* 1. Title block */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center flex-wrap gap-2">
                {isOffPlan ? (
                  <Badge variant="gold">Pre-Construction</Badge>
                ) : (
                  <Badge variant="default">Resale</Badge>
                )}
                <Badge variant="outline">{type}</Badge>
              </div>

              <h1
                className="text-4xl sm:text-5xl font-light leading-[1.1] text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {title}
              </h1>

              <div className="flex items-center gap-2 flex-wrap">
                <MapPin
                  className="w-4 h-4 shrink-0"
                  style={{ color: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span className="text-base" style={{ color: 'var(--color-gray)' }}>
                  {location.neighborhood}, {location.city}, {location.country}
                </span>
              </div>

              {isOffPlan && developer && completionYear && (
                <div
                  className="flex items-center gap-3 text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    by{' '}
                    <span style={{ color: 'var(--color-gray)' }}>{developer}</span>
                    {' '}·{' '}
                    <span>Est. completion {completionYear}</span>
                  </span>
                </div>
              )}
            </div>

            {/* 2. Key facts bar */}
            <div
              className="flex items-center flex-wrap gap-0 py-5 border-y"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {[
                {
                  icon: <BedDouble className="w-5 h-5" aria-hidden="true" />,
                  value: beds,
                  label: beds === 1 ? 'Bedroom' : 'Bedrooms',
                },
                {
                  icon: <Bath className="w-5 h-5" aria-hidden="true" />,
                  value: baths,
                  label: baths === 1 ? 'Bathroom' : 'Bathrooms',
                },
                {
                  icon: <Maximize2 className="w-5 h-5" aria-hidden="true" />,
                  value: `${sqm.toLocaleString()} m²`,
                  label: `${sqft.toLocaleString()} ft²`,
                },
                {
                  icon: <Home className="w-5 h-5" aria-hidden="true" />,
                  value: type,
                  label: 'Type',
                },
              ].map((fact, i, arr) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5 px-6 sm:px-8 text-center">
                    <span style={{ color: 'var(--color-gold)' }}>{fact.icon}</span>
                    <span
                      className="text-lg font-light"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: 'var(--color-white)',
                      }}
                    >
                      {fact.value}
                    </span>
                    <span
                      className="text-xs tracking-wider uppercase"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {fact.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      className="w-px h-10 shrink-0"
                      style={{ background: 'var(--color-border)' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* 3. Price block */}
            <div className="flex flex-col gap-1">
              <p
                className="text-4xl font-light"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: 'var(--color-gold)',
                }}
              >
                {priceFormatted}
              </p>
              <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>
                {currencyNote}
              </p>
            </div>

            {/* 4. Description */}
            <div className="flex flex-col gap-4">
              <h2
                className="text-2xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                About This Property
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--color-gray)' }}
              >
                {description}
              </p>
            </div>

            {/* 5. Amenities */}
            <div className="flex flex-col gap-5">
              <h2
                className="text-2xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Amenities &amp; Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 px-4 py-3 rounded-[2px]"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--color-gold)' }}
                      aria-hidden="true"
                    />
                    <span className="text-sm" style={{ color: 'var(--color-gray)' }}>
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Location section */}
            <div className="flex flex-col gap-5">
              <h2
                className="text-2xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Location
              </h2>

              {/* Map placeholder */}
              <div
                className="relative w-full h-64 rounded-[2px] overflow-hidden flex flex-col items-center justify-center gap-3"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-surface) 50%, #151518 100%)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                  aria-hidden="true"
                />
                <MapPin
                  className="w-8 h-8 relative z-10"
                  style={{ color: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <p
                  className="relative z-10 text-sm font-medium tracking-widest uppercase"
                  style={{ color: 'var(--color-gray)' }}
                >
                  Interactive map coming soon
                </p>
                <p
                  className="relative z-10 text-xs font-mono"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {coordinates.lat.toFixed(4)}°{coordinates.lat >= 0 ? 'N' : 'S'},{' '}
                  {Math.abs(coordinates.lng).toFixed(4)}°{coordinates.lng >= 0 ? 'E' : 'W'}
                </p>
              </div>

              <div
                className="p-5 rounded-[2px]"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3
                  className="text-lg mb-3 font-light"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  About {location.neighborhood}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-gray)' }}
                >
                  {neighborhoodDesc}
                </p>
              </div>
            </div>

            {/* 7. Investment highlights (off-plan only) */}
            {isOffPlan && (
              <div className="flex flex-col gap-5">
                <h2
                  className="text-2xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Investment Highlights
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Calendar className="w-5 h-5" aria-hidden="true" />,
                      label: 'Completion Year',
                      value: completionYear ?? 'TBC',
                    },
                    {
                      icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,
                      label: 'Payment Plan',
                      value: 'Contact for details',
                    },
                    {
                      icon: <Building2 className="w-5 h-5" aria-hidden="true" />,
                      label: 'Developer',
                      value: developer ?? 'Prestoni Partner',
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col gap-3 p-5 rounded-[2px]"
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <span style={{ color: 'var(--color-gold)' }}>{stat.icon}</span>
                      <div>
                        <p
                          className="text-xs tracking-widest uppercase mb-1"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          {stat.label}
                        </p>
                        <p
                          className="text-base font-light"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            color: 'var(--color-white)',
                          }}
                        >
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Off-plan callout */}
                <div
                  className="p-5 rounded-[2px]"
                  style={{
                    background: 'rgba(201,168,76,0.05)',
                    borderLeft: '3px solid var(--color-gold)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderLeftWidth: '3px',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <TrendingUp
                      className="w-5 h-5 mt-0.5 shrink-0"
                      style={{ color: 'var(--color-gold)' }}
                      aria-hidden="true"
                    />
                    <div>
                      <h3
                        className="text-base mb-2"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          color: 'var(--color-gold-light)',
                        }}
                      >
                        Off-Plan Advantage
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                        Purchasing off-plan gives you access to launch pricing — typically 10–30%
                        below completion value — with milestone-based payment plans spread over the
                        construction period.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ──── Right column (1/3) — sticky enquiry card ──────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div
                className="rounded-[2px] overflow-hidden"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderTopColor: 'var(--color-gold)',
                  borderTopWidth: '2px',
                }}
              >
                {/* Price header */}
                <div className="px-6 pt-6 pb-4">
                  <p
                    className="text-3xl font-light"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: 'var(--color-gold)',
                    }}
                  >
                    {priceFormatted}
                  </p>
                  <p
                    className="text-xs mt-1 tracking-wider uppercase"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {currencyNote}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="h-px mx-6"
                  style={{ background: 'var(--color-border)' }}
                  aria-hidden="true"
                />

                {/* Enquiry form */}
                <div className="px-6 pb-6 pt-5">
                  <PropertyEnquiry propertyTitle={title} propertyId={id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related properties ─────────────────────────────────────────────── */}
        <section className="mt-20">
          <SectionHeader
            eyebrow="Similar Properties"
            title="You May Also Like"
            action={{ label: 'View All', href: '/buy' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {relatedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

