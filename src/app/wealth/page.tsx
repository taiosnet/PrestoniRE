import type { Metadata } from 'next';
import WealthContactForm from '@/components/sections/WealthContactForm';
import {
  Building2,
  Globe,
  TrendingUp,
  Briefcase,
  Landmark,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wealth & Rich — Corporate Wealth Services',
  description:
    'Wealth & Rich provides corporate structuring, family office advisory, and private wealth management for ultra-high-net-worth individuals and institutional investors.',
  openGraph: {
    title: 'Wealth & Rich | Prestoni Partner',
    description: 'Bespoke corporate and wealth services for ultra-high-net-worth individuals.',
  },
};

const SERVICES = [
  {
    Icon: Building2,
    title: 'Family Office Setup',
    body: 'Complete family office establishment, governance frameworks, and operational management for multi-generational wealth.',
  },
  {
    Icon: Globe,
    title: 'Corporate Structuring',
    body: 'Tax-efficient holding structures across the UAE, UK, BVI, Cayman, and Singapore — designed for global asset ownership.',
  },
  {
    Icon: TrendingUp,
    title: 'Wealth Planning',
    body: 'Intergenerational wealth transfer, succession planning, and estate structuring to preserve family legacies.',
  },
  {
    Icon: Briefcase,
    title: 'Fund Management',
    body: 'Private equity, alternative investment fund setup, and regulatory filing across major financial centres.',
  },
  {
    Icon: Landmark,
    title: 'Banking Introductions',
    body: 'Private banking relationships at tier-one global institutions — bespoke introductions and account facilitation.',
  },
  {
    Icon: FileText,
    title: 'Regulatory Advisory',
    body: 'Compliance frameworks, licensing applications, and ongoing regulatory support across multiple jurisdictions.',
  },
];


export default function WealthPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-28 lg:py-40 -mt-20"
        style={{ background: 'var(--color-bg)', minHeight: '60vh' }}
      >
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse at center, var(--color-gold), transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center gap-6 max-w-3xl mx-auto">
          {/* Wordmark */}
          <div>
            <span
              className="block tracking-[0.3em] text-sm font-semibold uppercase"
              style={{ color: 'var(--color-gold)', fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
            >
              WEALTH &amp; RICH
            </span>
            <span
              className="block text-[0.55rem] tracking-[0.25em] uppercase mt-1"
              style={{ color: 'var(--color-muted)' }}
            >
              Corporate Wealth Services
            </span>
          </div>

          <div className="w-12 h-px" style={{ background: 'var(--color-gold)' }} aria-hidden="true" />

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.01em' }}
          >
            Corporate Excellence for{' '}
            <span className="gold-text">Exceptional Wealth</span>
          </h1>

          <p className="text-base leading-relaxed max-w-xl" style={{ color: 'var(--color-gray)' }}>
            Bespoke corporate structuring, family office services, and private wealth advisory
            for ultra-high-net-worth individuals and institutional investors.
          </p>

          <a
            href="https://wealthandrich.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ padding: '0.75rem 2rem' }}
          >
            Visit Wealth &amp; Rich ↗
          </a>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-surface)' }}
        aria-label="Wealth and Rich Services"
      >
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)' }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12 pt-20">
          <div className="text-center flex flex-col gap-3">
            <p className="section-label">Our Services</p>
            <h2
              className="text-3xl sm:text-4xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Comprehensive Wealth Advisory
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-7 rounded-[2px]"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-[2px] shrink-0"
                  style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--color-gold)' }} strokeWidth={1.5} />
                </div>
                <span className="gold-divider" aria-hidden="true" />
                <div>
                  <h3
                    className="text-lg font-normal text-white mb-1.5"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
        aria-label="Contact Wealth and Rich"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="section-label mb-4">Speak with a Specialist</p>
                <h2
                  className="text-3xl sm:text-4xl font-light text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Begin Your Wealth Journey
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                Our specialists work with a select number of clients to ensure complete focus and
                the highest standard of service. All enquiries are handled with absolute discretion.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'Family office establishment from $5M+ AUM',
                  'Multi-jurisdictional corporate structures',
                  'Succession and estate planning',
                  'Private banking relationship facilitation',
                  'Alternative investment fund formation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: 'var(--color-gold)', marginTop: '2px', fontSize: '0.7rem' }}>✦</span>
                    <span className="text-sm" style={{ color: 'var(--color-gray)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wealthandrich.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
                style={{ color: 'var(--color-gold)' }}
              >
                Learn more at wealthandrich.com ↗
              </a>
            </div>

            {/* Right — Form */}
            <WealthContactForm />
          </div>
        </div>
      </section>

      {/* ── CTA Strip ────────────────────────────────────────────────────────── */}
      <section
        className="py-14"
        style={{ background: 'var(--color-surface)' }}
        aria-label="Wealth and Rich CTA"
      >
        <div
          className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            borderTop: '1px solid rgba(201,168,76,0.25)',
            borderBottom: '1px solid rgba(201,168,76,0.25)',
            paddingTop: '2.5rem',
            paddingBottom: '2.5rem',
          }}
        >
          <div>
            <p
              className="text-2xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Speak with a wealth specialist today
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-gray)' }}>
              Explore the full range of Wealth &amp; Rich corporate services.
            </p>
          </div>
          <a
            href="https://wealthandrich.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold shrink-0"
            style={{ padding: '0.75rem 2rem' }}
          >
            Visit Wealth &amp; Rich ↗
          </a>
        </div>
      </section>
    </>
  );
}
