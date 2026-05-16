import type { Metadata } from 'next';
import TaiosContactForm from '@/components/sections/TaiosContactForm';
import {
  Code2,
  Database,
  Shield,
  Cloud,
  Brain,
  Plug,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'TAIOS Technology — Powering Luxury Platforms',
  description:
    'TAIOS provides cutting-edge technology infrastructure, digital platforms, and data intelligence solutions for the luxury and private wealth sector.',
  openGraph: {
    title: 'TAIOS Technology | Prestoni Partner',
    description: "Bespoke technology infrastructure for the world's most discerning organisations.",
  },
};

const SERVICES = [
  {
    Icon: Code2,
    title: 'Platform Engineering',
    body: 'Custom-built digital platforms engineered for scale, performance, and global audiences across luxury commerce.',
  },
  {
    Icon: Database,
    title: 'Data Intelligence',
    body: 'Real-time market data pipelines, analytics infrastructure, and bespoke reporting dashboards.',
  },
  {
    Icon: Shield,
    title: 'Security & Compliance',
    body: 'Enterprise-grade security architecture, penetration testing, and compliance frameworks for regulated industries.',
  },
  {
    Icon: Cloud,
    title: 'Cloud Infrastructure',
    body: 'Multi-region cloud deployments with 99.99% uptime SLA, auto-scaling, and disaster recovery.',
  },
  {
    Icon: Brain,
    title: 'AI Integration',
    body: 'Intelligent automation, machine learning models, and AI-powered features for luxury commerce platforms.',
  },
  {
    Icon: Plug,
    title: 'API & Integrations',
    body: 'Seamless connectivity between systems, payment gateways, CRMs, and third-party data providers.',
  },
];

export default function TaiosPage() {
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
              className="block tracking-[0.35em] text-sm font-semibold uppercase"
              style={{ color: 'var(--color-gold)', fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
            >
              TAIOS
            </span>
            <span
              className="block text-[0.55rem] tracking-[0.25em] uppercase mt-1"
              style={{ color: 'var(--color-muted)' }}
            >
              Technology Services
            </span>
          </div>

          <div className="w-12 h-px" style={{ background: 'var(--color-gold)' }} aria-hidden="true" />

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.01em' }}
          >
            Technology That{' '}
            <span className="gold-text">Powers Excellence</span>
          </h1>

          <p className="text-base leading-relaxed max-w-xl" style={{ color: 'var(--color-gray)' }}>
            TAIOS delivers bespoke technology infrastructure, digital platforms, and data intelligence
            solutions for the world&apos;s most discerning organisations.
          </p>

          <a
            href="https://taiosinc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ padding: '0.75rem 2rem' }}
          >
            Visit TAIOS ↗
          </a>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-surface)' }}
        aria-label="TAIOS Services"
      >
        {/* Gold top accent */}
        <div
          className="w-full h-px mb-0"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)' }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12 pt-20">
          <div className="text-center flex flex-col gap-3">
            <p className="section-label">What We Do</p>
            <h2
              className="text-3xl sm:text-4xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              End-to-End Technology Solutions
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
        aria-label="Contact TAIOS"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="section-label mb-4">Get in Touch</p>
                <h2
                  className="text-3xl sm:text-4xl font-light text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Let&apos;s Build Something Exceptional
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                Whether you&apos;re launching a new luxury platform, scaling an existing system, or integrating
                AI capabilities — TAIOS has the expertise to deliver.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'Custom platform development from concept to launch',
                  'Data infrastructure and real-time analytics',
                  'Security audits and compliance implementation',
                  'Cloud migration and infrastructure optimisation',
                  'AI feature development and model fine-tuning',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: 'var(--color-gold)', marginTop: '2px', fontSize: '0.7rem' }}>✦</span>
                    <span className="text-sm" style={{ color: 'var(--color-gray)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://taiosinc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
                style={{ color: 'var(--color-gold)' }}
              >
                Learn more at taiosinc.com ↗
              </a>
            </div>

            {/* Right — Form */}
            <TaiosContactForm />
          </div>
        </div>
      </section>

      {/* ── CTA Strip ────────────────────────────────────────────────────────── */}
      <section
        className="py-14"
        style={{ background: 'var(--color-surface)' }}
        aria-label="TAIOS CTA"
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
              Ready to build the future?
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-gray)' }}>
              Explore the full TAIOS portfolio of technology services.
            </p>
          </div>
          <a
            href="https://taiosinc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold shrink-0"
            style={{ padding: '0.75rem 2rem' }}
          >
            Explore TAIOS ↗
          </a>
        </div>
      </section>
    </>
  );
}
