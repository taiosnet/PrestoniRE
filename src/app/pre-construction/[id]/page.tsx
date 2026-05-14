import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, MapPin, Building2, Phone, MessageCircle, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/shared/ProjectCard';
import { PRE_CONSTRUCTION_PROJECTS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import type { ProjectStatus } from '@/lib/types';

/* ─── Static Params ──────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return PRE_CONSTRUCTION_PROJECTS.map((p) => ({ id: p.id }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PRE_CONSTRUCTION_PROJECTS.find((p) => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.name} | Pre-Construction`,
    description: project.description.slice(0, 160),
  };
}

/* ─── Status badge helper ────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: ProjectStatus }) {
  switch (status) {
    case 'Launching Soon':
      return <Badge variant="gold">Launching Soon</Badge>;
    case 'Under Construction':
      return <Badge variant="warning">Under Construction</Badge>;
    case 'Ready to Move':
      return <Badge variant="success">Ready to Move</Badge>;
  }
}

/* ─── Payment Plan Visualiser ────────────────────────────────────────────────── */

function PaymentPlanVisualiser({ plan }: { plan: string }) {
  // plan is like "60/40", "30/70" etc.
  const parts = plan.split('/').map(Number);
  if (parts.length !== 2 || parts.some(isNaN)) {
    return (
      <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
        {plan} payment plan
      </p>
    );
  }
  const [during, onCompletion] = parts;

  return (
    <div className="space-y-4">
      {/* Bar */}
      <div
        className="w-full h-3 rounded-full overflow-hidden flex"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
      >
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${during}%`,
            background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
          }}
        />
        <div
          className="h-full flex-1"
          style={{ background: 'rgba(201,168,76,0.15)' }}
        />
      </div>

      {/* Labels */}
      <div className="flex items-stretch gap-3">
        <div
          className="flex-1 rounded-[2px] px-4 py-3 text-center"
          style={{
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
          }}
        >
          <p
            className="text-2xl font-normal leading-none mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--color-gold)',
            }}
          >
            {during}%
          </p>
          <p className="text-[0.65rem] tracking-[0.12em] uppercase font-medium" style={{ color: 'var(--color-muted)' }}>
            During Construction
          </p>
        </div>

        <div
          className="flex-1 rounded-[2px] px-4 py-3 text-center"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p
            className="text-2xl font-normal leading-none mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--color-white)',
            }}
          >
            {onCompletion}%
          </p>
          <p className="text-[0.65rem] tracking-[0.12em] uppercase font-medium" style={{ color: 'var(--color-muted)' }}>
            On Completion
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Enquiry Form ───────────────────────────────────────────────────────────── */

function EnquiryCard({ project }: { project: (typeof PRE_CONSTRUCTION_PROJECTS)[number] }) {
  return (
    <div
      className="rounded-[2px] p-6 flex flex-col gap-5"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid rgba(201,168,76,0.3)',
        boxShadow: '0 0 0 1px rgba(201,168,76,0.06), 0 24px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Price range */}
      <div>
        <p
          className="text-[0.65rem] tracking-[0.14em] uppercase mb-1"
          style={{ color: 'var(--color-muted)' }}
        >
          Price Range
        </p>
        <p
          className="text-3xl font-normal leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: 'var(--color-gold)',
          }}
        >
          {formatPrice(project.priceFrom)} – {formatPrice(project.priceTo)}
        </p>
      </div>

      {/* Key stats */}
      <div
        className="grid grid-cols-3 gap-3 rounded-[2px] px-3 py-3"
        style={{
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div className="text-center">
          <p
            className="text-base font-semibold leading-none mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--color-white)',
            }}
          >
            {project.units}
          </p>
          <p className="text-[0.6rem] tracking-[0.1em] uppercase" style={{ color: 'var(--color-muted)' }}>
            Residences
          </p>
        </div>
        <div
          className="text-center border-x"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p
            className="text-base font-semibold leading-none mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--color-white)',
            }}
          >
            {project.completionYear}
          </p>
          <p className="text-[0.6rem] tracking-[0.1em] uppercase" style={{ color: 'var(--color-muted)' }}>
            Completion
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-base font-semibold leading-none mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--color-white)',
            }}
          >
            {project.paymentPlan}
          </p>
          <p className="text-[0.6rem] tracking-[0.1em] uppercase" style={{ color: 'var(--color-muted)' }}>
            Payment
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-3"
        aria-label="Request information form"
      >
        <div>
          <label
            htmlFor="eq-name"
            className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5 font-medium"
            style={{ color: 'var(--color-gray)' }}
          >
            Full Name
          </label>
          <input
            id="eq-name"
            type="text"
            placeholder="Your full name"
            required
            className="w-full h-10 px-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="eq-email"
            className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5 font-medium"
            style={{ color: 'var(--color-gray)' }}
          >
            Email Address
          </label>
          <input
            id="eq-email"
            type="email"
            placeholder="your@email.com"
            required
            className="w-full h-10 px-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="eq-phone"
            className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5 font-medium"
            style={{ color: 'var(--color-gray)' }}
          >
            Phone Number
          </label>
          <input
            id="eq-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="w-full h-10 px-3 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="eq-message"
            className="block text-[0.65rem] tracking-[0.12em] uppercase mb-1.5 font-medium"
            style={{ color: 'var(--color-gray)' }}
          >
            Message
          </label>
          <textarea
            id="eq-message"
            rows={3}
            placeholder={`I'm interested in ${project.name}...`}
            className="w-full px-3 py-2 rounded-[2px] text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200 resize-none"
          />
        </div>

        <Button type="submit" variant="default" size="md" className="w-full mt-1">
          Request Information
        </Button>

        <a
          href={`https://wa.me/442034445566?text=${encodeURIComponent(`Hi, I'm interested in ${project.name} (${project.location}, ${project.country}).`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-11 rounded-[2px] text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:-translate-y-px"
          style={{
            background: 'rgba(37,211,102,0.08)',
            border: '1px solid rgba(37,211,102,0.35)',
            color: '#25D366',
          }}
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          WhatsApp Enquiry
        </a>
      </form>

      {/* Disclaimer */}
      <p className="text-[0.65rem] leading-relaxed text-center" style={{ color: 'var(--color-muted)' }}>
        Your enquiry is sent directly to the developer&apos;s sales team. Prestoni advisors are
        available to guide you through the purchase process.
      </p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PRE_CONSTRUCTION_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const relatedProjects = PRE_CONSTRUCTION_PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  // Generate a second paragraph for description
  const secondParagraph = `${project.name} sets a new benchmark for ${project.country === 'UAE' ? 'ultra-luxury living in the Gulf' : project.country === 'USA' ? 'contemporary luxury in the Americas' : 'European luxury real estate'}. Every detail has been curated to deliver an ownership experience that transcends the transactional — from the premium materials specification to the bespoke concierge services available exclusively to residents. With only ${project.units} residences, exclusivity is guaranteed from the outset.`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,11,0.3) 0%, rgba(10,10,11,0.5) 40%, rgba(10,10,11,0.88) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 lg:px-16 pb-10 max-w-screen-xl mx-auto w-full left-0 right-0">
          {/* Back link */}
          <Link
            href="/pre-construction"
            className="absolute top-8 left-6 lg:left-16 flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-[var(--color-gold)]"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            <ChevronLeft className="w-4 h-4" />
            All Projects
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              {/* Developer */}
              <p
                className="text-xs font-medium tracking-[0.18em] uppercase mb-3"
                style={{ color: 'rgba(232,201,122,0.8)' }}
              >
                {project.developer}
              </p>

              {/* Project name */}
              <h1
                className="text-4xl md:text-[3.5rem] font-normal leading-[1.1] text-white mb-4 max-w-2xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {project.name}
              </h1>

              {/* Location + status */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="flex items-center gap-1.5 text-sm"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-gold)' }} />
                  {project.location}, {project.country}
                </span>
                <StatusBadge status={project.status} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

          {/* ── Left Column: Details ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* Description */}
            <div>
              <h2
                className="text-2xl font-normal text-white mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                About the Project
              </h2>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                  {project.description}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                  {secondParagraph}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />

            {/* Highlights */}
            <div>
              <h2
                className="text-2xl font-normal text-white mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Highlights
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: 'rgba(201,168,76,0.12)',
                        border: '1px solid rgba(201,168,76,0.3)',
                      }}
                    >
                      <Check
                        className="w-3 h-3"
                        strokeWidth={2.5}
                        style={{ color: 'var(--color-gold)' }}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />

            {/* Amenities */}
            <div>
              <h2
                className="text-2xl font-normal text-white mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Amenities &amp; Facilities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {project.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-[2px]"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--color-gold)' }}
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium" style={{ color: 'var(--color-gray)' }}>
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />

            {/* Payment Plan */}
            <div>
              <h2
                className="text-2xl font-normal text-white mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Payment Plan
              </h2>
              <p className="text-sm mb-5" style={{ color: 'var(--color-gray)' }}>
                Flexible payment structure designed to align investor cash flow with construction
                milestones, reducing upfront capital exposure.
              </p>
              <PaymentPlanVisualiser plan={project.paymentPlan} />
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: 'var(--color-border)' }} aria-hidden="true" />

            {/* About the Developer */}
            <div>
              <h2
                className="text-2xl font-normal text-white mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                About the Developer
              </h2>
              <div
                className="rounded-[2px] p-5 flex items-start gap-4"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-[2px] flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <Building2
                    className="w-5 h-5"
                    style={{ color: 'var(--color-gold)' }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p
                    className="font-semibold text-white mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem' }}
                  >
                    {project.developer}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                    {project.developer} is a distinguished real estate developer with an established
                    track record across premium markets. Known for rigorous quality standards, iconic
                    architectural partnerships, and delivering residences that consistently outperform
                    market benchmarks at completion. All Prestoni developer partners undergo thorough
                    due-diligence review prior to listing.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Column: Sticky Enquiry Card ───────────────────────── */}
          <div className="lg:w-[340px] xl:w-[360px] flex-shrink-0">
            <div className="sticky top-24">
              <EnquiryCard project={project} />

              {/* Direct contact */}
              <div
                className="mt-4 rounded-[2px] px-5 py-4 flex items-center justify-between"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-gray)' }}>
                    Prefer to call?
                  </p>
                  <p className="text-sm text-white font-medium">+44 20 3444 5566</p>
                </div>
                <a
                  href="tel:+442034445566"
                  className="w-9 h-9 flex items-center justify-center rounded-[2px] transition-all duration-200"
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: 'var(--color-gold)',
                  }}
                  aria-label="Call us"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Projects ──────────────────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section
          className="py-16 px-4 lg:px-8 border-t border-[var(--color-border)]"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-2">Explore More</p>
                <h2
                  className="text-3xl font-normal text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Related Projects
                </h2>
              </div>
              <Link
                href="/pre-construction"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--color-gold)' }}
              >
                View All Projects
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
