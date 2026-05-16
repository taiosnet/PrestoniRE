import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { MARKETS } from '@/lib/data';
import type { Metadata } from 'next';

/* ─── Metadata ───────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Global Prime Markets',
  description:
    "Explore the world's premier luxury real estate markets — Dubai, Miami, Lisbon, Marbella, London, and Bali. Market intelligence, pricing trends, and curated listings from Prestoni.",
};

/* ─── Market editorial copy ──────────────────────────────────────────────────── */

const MARKET_EDITORIALS: Record<
  string,
  { why: string; insight: string }
> = {
  Dubai: {
    why: "Dubai's luxury residential market has undergone a structural transformation, driven by a wave of HNWI relocations, a 0% income tax environment, and visa reforms that now grant 10-year golden residency through property investment. The city's rapid infrastructure development — from the world's busiest airport to ultra-prime neighbourhoods like Palm Jumeirah and Creek Harbour — continues to attract global capital at scale.",
    insight:
      "With average luxury prices rising 18.4% year-on-year and rental yields reaching 6–10% in prime locations, Dubai consistently delivers among the highest risk-adjusted returns of any global prime market. Off-plan opportunities from Emaar, Binghatti, and Nakheel regularly sell out at launch, providing exceptional early-entry pricing.",
  },
  Miami: {
    why: "Miami has cemented its position as the financial capital of the Americas, drawing Wall Street institutions, Latin American family offices, and European tech founders seeking a tax-favourable, climate-rich alternative to New York. The influx of high-net-worth residents has transformed the luxury residential landscape, with Brickell and Star Island emerging as global addresses rivalling Manhattan and the Côte d'Azur.",
    insight:
      "Average luxury transaction values in Miami have risen 9.7% over the past year, yet Miami still offers compelling value relative to comparable global cities. Waterfront trophy assets — particularly on Star Island and Fisher Island — remain exceptionally scarce, with sub-5% annual turnover creating sustained upward price pressure.",
  },
  Lisbon: {
    why: "Lisbon and the broader Portuguese Atlantic coast — including the unspoiled Comporta region — have attracted a discerning international buyer base drawn by year-round sunshine, exceptional cuisine, and one of Europe's most compelling Golden Visa programs. Portugal's non-habitual resident tax regime offers a flat 20% income tax rate for qualifying foreign nationals over a ten-year period.",
    insight:
      "With strong fundamentals — 12.1% annual appreciation, a growing short-term rental market, and continued undersupply of prime product — Lisbon and Comporta represent exceptional entry-point opportunities within the European luxury segment. Capital preservation characteristics are robust, supported by Portugal's stable legal framework and EU membership.",
  },
  Marbella: {
    why: "Marbella's La Zagaleta and Sierra Blanca precincts represent the apex of European residential privacy and prestige. Spain's Golden Visa threshold — €500,000 for real estate investment — remains one of the most accessible in the EU, combining residency access with a market growing at 15.3% annually. The region's combination of climate, gastronomy, infrastructure, and exclusivity is simply unmatched in continental Europe.",
    insight:
      "Supply constraints are extreme in Marbella's most coveted enclaves. La Zagaleta, with just 230 total plots across 900 hectares, rarely sees more than 8–10 resale transactions annually. This scarcity, combined with strong demand from Middle Eastern, Northern European, and US buyers, continues to drive double-digit annual appreciation.",
  },
  London: {
    why: "London's super-prime residential market — concentrated in Knightsbridge, Mayfair, Chelsea, and Belgravia — maintains its position as the world's most liquid ultra-prime property market, underpinned by the rule of law, educational excellence, cultural depth, and a global financial ecosystem that is without peer. One Hyde Park, The Whiteley, and Chelsea Barracks represent the current apex of the London residential offer.",
    insight:
      "While London's growth at 4.2% YoY is more measured than emerging luxury markets, the capital's long-term capital preservation credentials are unrivalled. Super-prime London assets have delivered 180% total return over the past 20 years with remarkably low volatility. The strengthening pound and renewed post-Brexit foreign buyer confidence are creating attractive entry points.",
  },
  Bali: {
    why: "Bali's luxury villa market has entered a new phase of institutional-grade investment activity, driven by projected tourism growth of 18% annually and a globally mobile buyer base seeking a combination of lifestyle, yield, and wellness-focused living. Uluwatu's clifftop villa developments and Ubud's river valley retreats attract a sophisticated international buyer seeking both personal enjoyment and exceptional managed rental returns.",
    insight:
      "Rental yields in Bali's prime villa market reach 15–22% annually for professionally managed assets, representing among the highest returns available in any global luxury real estate market. Land values in Uluwatu and Canggu have risen 22.6% year-on-year, yet entry points remain dramatically below comparable international destinations — making Bali the highest-conviction emerging luxury market globally.",
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function formatAvgPrice(avgPrice: number): string {
  if (avgPrice >= 1_000_000) {
    const millions = avgPrice / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  return `$${avgPrice.toLocaleString()}`;
}

function formatListings(count: number): string {
  return count.toLocaleString();
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function MarketsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-white)' }}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-2)' }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        {/* Gold radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              className="inline-block h-px w-8"
              style={{
                background: 'linear-gradient(270deg, var(--color-gold), var(--color-gold-light))',
              }}
              aria-hidden="true"
            />
            <span
              className="text-[0.6875rem] font-semibold tracking-[0.22em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              Global Prime Markets
            </span>
            <span
              className="inline-block h-px w-8"
              style={{
                background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
              }}
              aria-hidden="true"
            />
          </div>

          <h1
            className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] font-light leading-[1.05] mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--color-white)',
            }}
          >
            Where Luxury Lives
          </h1>

          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'var(--color-gray)' }}
          >
            From the ultra-prime towers of Dubai Creek Harbour to clifftop villas in Marbella,
            Prestoni connects discerning buyers with the world&apos;s most coveted addresses.
          </p>
        </div>
      </section>

      {/* ── Markets grid ─────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKETS.map((market) => {
            const editorial = MARKET_EDITORIALS[market.name];
            const yoyPositive = market.yoy.startsWith('+');
            const avgPriceFormatted = formatAvgPrice(market.avgPrice);

            return (
              <Link
                key={market.name}
                href={`/markets/${market.name.toLowerCase()}`}
                className="group relative block overflow-hidden rounded-[2px]"
                style={{ height: '320px' }}
              >
                {/* Background image */}
                <Image
                  src={market.image}
                  alt={`${market.name}, ${market.country}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={false}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(10,10,11,0.15) 0%, rgba(10,10,11,0.45) 40%, rgba(10,10,11,0.9) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Top-right YoY badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] text-xs font-semibold tracking-wider"
                    style={{
                      background: yoyPositive ? 'rgba(52,199,89,0.18)' : 'rgba(255,69,58,0.18)',
                      border: `1px solid ${yoyPositive ? 'rgba(52,199,89,0.4)' : 'rgba(255,69,58,0.4)'}`,
                      color: yoyPositive ? '#34C759' : '#FF453A',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    {market.yoy}
                  </span>
                </div>

                {/* Content — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  {/* Flag + city */}
                  <div className="flex items-end gap-3 mb-2">
                    <span className="text-[2rem] leading-none" role="img" aria-label={market.country}>
                      {market.flag}
                    </span>
                    <div>
                      <h2
                        className="text-[2rem] font-semibold leading-none text-white"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {market.name}
                      </h2>
                      <p
                        className="text-xs tracking-wider uppercase mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {market.country}
                      </p>
                    </div>
                  </div>

                  {/* Gold divider */}
                  <div
                    className="h-px mb-3"
                    style={{
                      width: '40px',
                      background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                    }}
                    aria-hidden="true"
                  />

                  {/* Stats row */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <span
                      className="text-base font-light"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: 'var(--color-gold)',
                      }}
                    >
                      Avg. {avgPriceFormatted}
                    </span>
                    <span
                      className="text-[0.65rem] tracking-wider uppercase"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
                      {formatListings(market.listingCount)} listings
                    </span>
                  </div>
                </div>

                {/* Arrow hint on hover */}
                <div
                  className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div
                    className="w-8 h-8 rounded-[2px] flex items-center justify-center"
                    style={{
                      background: 'rgba(201,168,76,0.15)',
                      border: '1px solid rgba(201,168,76,0.4)',
                      color: 'var(--color-gold)',
                    }}
                  >
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Market intelligence table ─────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-px w-8 shrink-0"
              style={{
                background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
              }}
              aria-hidden="true"
            />
            <span
              className="text-[0.6875rem] font-semibold tracking-[0.22em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              Data &amp; Analysis
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Market Intelligence
          </h2>
          <p
            className="text-base max-w-2xl"
            style={{ color: 'var(--color-gray)' }}
          >
            Comparative performance metrics across Prestoni&apos;s six prime markets, updated quarterly.
          </p>
        </div>

        {/* Table */}
        <div
          className="overflow-x-auto rounded-[2px]"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr
                style={{
                  background: 'linear-gradient(90deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%)',
                  borderBottom: '1px solid rgba(201,168,76,0.25)',
                }}
              >
                {[
                  'Market',
                  'Avg. Luxury Price',
                  'YoY Growth',
                  'Active Listings',
                  'Min. Investment',
                ].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-left text-[0.65rem] font-semibold tracking-[0.18em] uppercase whitespace-nowrap"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MARKETS.map((market, i) => {
                const isEven = i % 2 === 0;
                const yoyPositive = market.yoy.startsWith('+');
                return (
                  <tr
                    key={market.name}
                    style={{
                      background: isEven ? 'var(--color-surface)' : 'rgba(26,26,30,0.5)',
                      borderBottom:
                        i < MARKETS.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    {/* Market name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg" role="img" aria-label={market.country}>
                          {market.flag}
                        </span>
                        <div>
                          <p
                            className="font-light text-base text-white"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            {market.name}
                          </p>
                          <p
                            className="text-[0.65rem] tracking-wider uppercase"
                            style={{ color: 'var(--color-muted)' }}
                          >
                            {market.country}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Avg price */}
                    <td className="px-6 py-4">
                      <span
                        className="text-base font-light"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          color: 'var(--color-gold)',
                        }}
                      >
                        {formatAvgPrice(market.avgPrice)}
                      </span>
                    </td>

                    {/* YoY */}
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] text-xs font-semibold tracking-wider"
                        style={{
                          background: yoyPositive ? 'rgba(52,199,89,0.12)' : 'rgba(255,69,58,0.12)',
                          border: `1px solid ${yoyPositive ? 'rgba(52,199,89,0.3)' : 'rgba(255,69,58,0.3)'}`,
                          color: yoyPositive ? '#34C759' : '#FF453A',
                        }}
                      >
                        <TrendingUp className="w-3 h-3" aria-hidden="true" />
                        {market.yoy}
                      </span>
                    </td>

                    {/* Listings */}
                    <td className="px-6 py-4">
                      <span style={{ color: 'var(--color-gray)' }}>
                        {formatListings(market.listingCount)}
                      </span>
                    </td>

                    {/* Min investment */}
                    <td className="px-6 py-4">
                      <Link
                        href={`/markets/${market.name.toLowerCase()}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-200 group/link"
                        style={{ color: 'var(--color-gray)' }}
                      >
                        <span className="group-hover/link:text-[var(--color-gold-light)] transition-colors duration-200">
                          Contact us
                        </span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 group-hover/link:text-[var(--color-gold)] transition-colors duration-200"
                          aria-hidden="true"
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p
          className="mt-4 text-xs"
          style={{ color: 'var(--color-muted)' }}
        >
          * Data sourced from Prestoni market research. YoY figures reflect rolling 12-month average price change in prime residential segment. Contact a Prestoni advisor for current listings and bespoke market reports.
        </p>
      </section>

      {/* ── Why These Markets editorial section ──────────────────────────────── */}
      <section
        className="py-20"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col gap-3 mb-14">
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                }}
                aria-hidden="true"
              />
              <span
                className="text-[0.6875rem] font-semibold tracking-[0.22em] uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                Investment Rationale
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Why These Markets
            </h2>
            <p
              className="text-base max-w-2xl"
              style={{ color: 'var(--color-gray)' }}
            >
              Each Prestoni market is selected for its combination of capital preservation,
              lifestyle credentials, and structural demand drivers. Our advisors provide
              bespoke market intelligence reports for qualified buyers.
            </p>
          </div>

          {/* Masonry-style grid: alternating 2-col layout */}
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {MARKETS.map((market) => {
              const editorial = MARKET_EDITORIALS[market.name];
              if (!editorial) return null;

              return (
                <div
                  key={market.name}
                  className="break-inside-avoid rounded-[2px] p-6 flex flex-col gap-4"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* City header */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={market.country}>
                      {market.flag}
                    </span>
                    <div>
                      <h3
                        className="text-2xl font-light leading-tight text-white"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {market.name}
                      </h3>
                      <p
                        className="text-[0.65rem] tracking-widest uppercase"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {market.country}
                      </p>
                    </div>
                    {/* YoY badge */}
                    <div className="ml-auto shrink-0">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-xs font-semibold"
                        style={{
                          background: 'rgba(52,199,89,0.12)',
                          border: '1px solid rgba(52,199,89,0.3)',
                          color: '#34C759',
                        }}
                      >
                        <TrendingUp className="w-3 h-3" aria-hidden="true" />
                        {market.yoy}
                      </span>
                    </div>
                  </div>

                  {/* Gold divider */}
                  <div
                    className="h-px"
                    style={{
                      width: '32px',
                      background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                    }}
                    aria-hidden="true"
                  />

                  {/* Why copy */}
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                    {editorial.why}
                  </p>

                  {/* Investment insight */}
                  <div
                    className="p-4 rounded-[2px] text-sm leading-relaxed"
                    style={{
                      background: 'rgba(201,168,76,0.04)',
                      border: '1px solid rgba(201,168,76,0.14)',
                      color: 'var(--color-gray)',
                      borderLeft: '2px solid var(--color-gold)',
                    }}
                  >
                    {editorial.insight}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/markets/${market.name.toLowerCase()}`}
                    className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors duration-200 group/link mt-1"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    <span className="group-hover/link:text-[var(--color-gold)] transition-colors duration-200">
                      Explore {market.name}
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 group-hover/link:text-[var(--color-gold)] transition-colors duration-200"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-[2px] p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderTop: '2px solid var(--color-gold)',
            }}
          >
            <div className="flex flex-col gap-3 max-w-xl">
              <span
                className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                Bespoke Advisory
              </span>
              <h2
                className="text-3xl sm:text-4xl font-light leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Receive Our Prime Market Intelligence Report
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                Prestoni&apos;s quarterly intelligence reports provide institutional-grade analysis
                on pricing, yield benchmarks, regulatory changes, and off-market opportunity
                across all six prime markets.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/buy"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[2px] text-sm font-medium tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light), var(--color-gold))',
                  backgroundSize: '200% auto',
                  color: '#0A0A0B',
                  border: 'none',
                }}
              >
                Explore Listings
              </Link>
              <a
                href="mailto:intelligence@prestoni.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[2px] text-sm font-medium tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
                style={{
                  background: 'transparent',
                  color: 'var(--color-gray)',
                  border: '1px solid rgba(201,168,76,0.35)',
                }}
              >
                Request Report
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
