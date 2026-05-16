import Image from 'next/image';
import { Home, Car, Anchor, Plane, Palette, Users } from 'lucide-react';
import type { Metadata } from 'next';

/* ─── Metadata ───────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Concierge | Prestoni',
  description:
    'White-glove lifestyle advisory. From property acquisition to private aviation — our specialists orchestrate every element of your luxury lifestyle with complete discretion.',
};

/* ─── Services data ──────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    Icon: Home,
    title: 'Property Acquisition',
    description:
      'End-to-end guidance across 32 markets. Legal due diligence, mortgage introductions, cross-border tax structuring.',
  },
  {
    Icon: Car,
    title: 'Automobile Sourcing',
    description:
      "Access to private collections, factory allocations, and pre-market hypercars. We find what isn't listed.",
  },
  {
    Icon: Anchor,
    title: 'Marine Advisory',
    description:
      'New-build specification, brokerage, and charter management. From day cruisers to 80-metre superyachts.',
  },
  {
    Icon: Plane,
    title: 'Aviation Services',
    description:
      'Whole ownership, fractional shares, and jet card programmes. NBAA-certified advisors.',
  },
  {
    Icon: Palette,
    title: 'Art Placement',
    description:
      'Curated art advisory in partnership with leading galleries. Acquisition, valuation, and installation.',
  },
  {
    Icon: Users,
    title: 'Lifestyle Coordination',
    description:
      'Moving, staffing, furniture, and contractor management. The complete turnkey lifestyle setup.',
  },
];

/* ─── Process steps ──────────────────────────────────────────────────────────── */

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We learn about your vision, timeline, and requirements.',
  },
  {
    number: '02',
    title: 'Bespoke Proposal',
    description: 'A curated selection matching your exact specification within 48 hours.',
  },
  {
    number: '03',
    title: 'Dedicated Advisor',
    description: 'Your single point of contact handles every detail.',
  },
  {
    number: '04',
    title: 'Seamless Delivery',
    description: 'From paperwork to physical handover, we manage everything.',
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function ConciergePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HERO                                                         */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Concierge Hero"
        className="relative flex flex-col items-center justify-center w-full overflow-hidden -mt-20"
        style={{ minHeight: '70vh' }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600"
            alt="Luxury concierge meeting room"
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
                'linear-gradient(to bottom, rgba(10,10,11,0.65) 0%, rgba(10,10,11,0.7) 50%, rgba(10,10,11,0.92) 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center pt-40 pb-28">

          {/* Eyebrow */}
          <p className="section-label mb-6">White-Glove Service</p>

          {/* H1 */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.05] text-white max-w-4xl mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.02em' }}
          >
            Your Life,{' '}
            <span className="gold-text">Fully Curated</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-gray)' }}
          >
            From first enquiry to final delivery, our advisors orchestrate every element of your
            luxury lifestyle — discretely, efficiently, and without compromise.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: SERVICES                                                     */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Concierge Services"
        className="py-20 lg:py-28 relative"
        style={{ background: 'var(--color-surface-2)' }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.25) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Bottom gold accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.25) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-4 mb-14">
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{
                  background: 'linear-gradient(270deg, var(--color-gold), var(--color-gold-light))',
                }}
                aria-hidden="true"
              />
              <span className="section-label">What We Do</span>
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                }}
                aria-hidden="true"
              />
            </div>
            <h2
              className="text-4xl sm:text-5xl font-light leading-[1.1] text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Our Advisory Services
            </h2>
            <p
              className="text-base leading-relaxed max-w-xl"
              style={{ color: 'var(--color-gray)' }}
            >
              Six specialist divisions. One seamless relationship. Every facet of your lifestyle
              managed with precision.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-5 p-6 rounded-[2px] transition-all duration-300 card-hover"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Icon container */}
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-[2px] flex-shrink-0"
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.25)',
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: 'var(--color-gold)' }}
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Gold divider */}
                <div className="gold-divider" aria-hidden="true" />

                {/* Title */}
                <h3
                  className="text-xl font-normal text-white leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: PROCESS                                                      */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Our Process"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{
                  background: 'linear-gradient(270deg, var(--color-gold), var(--color-gold-light))',
                }}
                aria-hidden="true"
              />
              <span className="section-label">How It Works</span>
              <span
                className="inline-block h-px w-8 shrink-0"
                style={{
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                }}
                aria-hidden="true"
              />
            </div>
            <h2
              className="text-4xl sm:text-5xl font-light leading-[1.1] text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              From Enquiry to Delivery
            </h2>
            <p
              className="text-base leading-relaxed max-w-xl"
              style={{ color: 'var(--color-gray)' }}
            >
              A proven four-step methodology refined across hundreds of successful client
              engagements worldwide.
            </p>
          </div>

          {/* Steps — horizontal on lg, vertical stack on mobile */}
          <div className="relative">
            {/* Connecting line — desktop only */}
            <div
              className="hidden lg:block absolute top-[2.75rem] left-0 right-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent 4%, rgba(201,168,76,0.2) 12%, rgba(201,168,76,0.2) 88%, transparent 96%)',
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
              {PROCESS_STEPS.map(({ number, title, description }, index) => (
                <div
                  key={number}
                  className="relative flex flex-col gap-5"
                >
                  {/* Number circle */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <div
                      className="relative z-10 flex items-center justify-center w-[3.25rem] h-[3.25rem] rounded-full flex-shrink-0"
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid rgba(201,168,76,0.4)',
                        boxShadow: '0 0 0 4px var(--color-bg)',
                      }}
                    >
                      <span
                        className="text-lg font-light leading-none"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          color: 'var(--color-gold)',
                        }}
                      >
                        {number}
                      </span>
                    </div>

                    {/* Connecting dot line — mobile only (between steps) */}
                    {index < PROCESS_STEPS.length - 1 && (
                      <div
                        className="lg:hidden flex-1 h-px"
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)',
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-2 pl-0 lg:pl-0">
                    <h3
                      className="text-xl font-normal text-white"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-gray)' }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: LEAD FORM                                                    */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Submit an Enquiry"
        className="py-20 lg:py-28 relative"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* Gold top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, var(--color-gold) 30%, var(--color-gold-light) 50%, var(--color-gold) 70%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* Left — copy */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-px w-8 shrink-0"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                    }}
                    aria-hidden="true"
                  />
                  <span className="section-label">Begin Your Journey</span>
                </div>
                <h2
                  className="text-4xl sm:text-5xl font-light leading-[1.1] text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Begin Your Journey
                </h2>
                <p
                  className="text-base leading-relaxed max-w-md"
                  style={{ color: 'var(--color-gray)' }}
                >
                  Share your requirements and a dedicated Prestoni advisor will craft a bespoke
                  proposal within 48 hours.
                </p>
              </div>

              {/* What to include */}
              <div
                className="rounded-[2px] p-6 flex flex-col gap-4"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p
                  className="text-xs font-semibold tracking-[0.18em] uppercase"
                  style={{ color: 'var(--color-gold)' }}
                >
                  For the best response, include:
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Your approximate budget range',
                    'Preferred timeline for acquisition',
                    'Preferred markets or locations',
                    'Your specific lifestyle requirements',
                    'How you prefer to be contacted',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--color-gold)' }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-gray)' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust signals */}
              <div className="flex flex-col gap-3">
                {[
                  '32 markets · 6 asset classes',
                  'Discretion guaranteed — NDA on request',
                  'Response within 2 business hours',
                ].map((signal) => (
                  <div key={signal} className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--color-gold)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs font-medium tracking-wide uppercase"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {signal}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div
              className="rounded-[2px] p-6 sm:p-8 flex flex-col gap-6"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderTopColor: 'var(--color-gold)',
                borderTopWidth: '2px',
              }}
            >
              <form
                action="#"
                method="post"
                className="flex flex-col gap-5"
                aria-label="Concierge enquiry form"
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="c-name"
                    className="block text-[0.65rem] tracking-[0.14em] uppercase mb-1.5 font-semibold"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    Full Name <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    className="w-full h-11 px-4 rounded-[2px] text-sm"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-white)',
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="c-email"
                    className="block text-[0.65rem] tracking-[0.14em] uppercase mb-1.5 font-semibold"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    Email <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="w-full h-11 px-4 rounded-[2px] text-sm"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-white)',
                    }}
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div>
                  <label
                    htmlFor="c-phone"
                    className="block text-[0.65rem] tracking-[0.14em] uppercase mb-1.5 font-semibold"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    WhatsApp / Phone <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    required
                    autoComplete="tel"
                    className="w-full h-11 px-4 rounded-[2px] text-sm"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-white)',
                    }}
                  />
                </div>

                {/* Annual Lifestyle Budget */}
                <div>
                  <label
                    htmlFor="c-budget"
                    className="block text-[0.65rem] tracking-[0.14em] uppercase mb-1.5 font-semibold"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    Annual Lifestyle Budget
                  </label>
                  <select
                    id="c-budget"
                    name="budget"
                    className="w-full h-11 px-4 rounded-[2px] text-sm appearance-none"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-white)',
                    }}
                  >
                    <option value="" style={{ background: 'var(--color-surface)' }}>
                      Select a range
                    </option>
                    <option value="under-1m" style={{ background: 'var(--color-surface)' }}>
                      Under $1M
                    </option>
                    <option value="1m-5m" style={{ background: 'var(--color-surface)' }}>
                      $1M – $5M
                    </option>
                    <option value="5m-25m" style={{ background: 'var(--color-surface)' }}>
                      $5M – $25M
                    </option>
                    <option value="25m-plus" style={{ background: 'var(--color-surface)' }}>
                      $25M+
                    </option>
                    <option value="prefer-not" style={{ background: 'var(--color-surface)' }}>
                      Prefer not to say
                    </option>
                  </select>
                </div>

                {/* Primary Interest */}
                <div>
                  <label
                    htmlFor="c-interest"
                    className="block text-[0.65rem] tracking-[0.14em] uppercase mb-1.5 font-semibold"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    Primary Interest
                  </label>
                  <select
                    id="c-interest"
                    name="interest"
                    className="w-full h-11 px-4 rounded-[2px] text-sm appearance-none"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-white)',
                    }}
                  >
                    <option value="" style={{ background: 'var(--color-surface)' }}>
                      Select a category
                    </option>
                    <option value="real-estate" style={{ background: 'var(--color-surface)' }}>
                      Real Estate
                    </option>
                    <option value="cars" style={{ background: 'var(--color-surface)' }}>
                      Cars
                    </option>
                    <option value="watches" style={{ background: 'var(--color-surface)' }}>
                      Watches
                    </option>
                    <option value="yachts" style={{ background: 'var(--color-surface)' }}>
                      Yachts
                    </option>
                    <option value="jets" style={{ background: 'var(--color-surface)' }}>
                      Private Jets
                    </option>
                    <option value="complete-lifestyle" style={{ background: 'var(--color-surface)' }}>
                      Complete Lifestyle
                    </option>
                  </select>
                </div>

                {/* Ideal lifestyle textarea */}
                <div>
                  <label
                    htmlFor="c-message"
                    className="block text-[0.65rem] tracking-[0.14em] uppercase mb-1.5 font-semibold"
                    style={{ color: 'var(--color-gray)' }}
                  >
                    Tell us about your ideal lifestyle
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={6}
                    placeholder="Describe your vision — the properties you are drawn to, the vehicles, experiences, or services that would complete your lifestyle..."
                    className="w-full px-4 py-3 rounded-[2px] text-sm resize-none leading-relaxed"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-white)',
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-gold w-full mt-1"
                >
                  Submit Enquiry
                </button>
              </form>

              {/* Discretion note */}
              <p
                className="text-[0.7rem] leading-relaxed text-center"
                style={{ color: 'var(--color-muted)' }}
              >
                All enquiries are handled with complete confidentiality. We do not share your
                information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
