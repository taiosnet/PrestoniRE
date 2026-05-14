'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { Project } from '@/lib/types';

/* ─── Enquiry Card (Client Component) ───────────────────────────────────────── */

export default function EnquiryCard({ project }: { project: Project }) {
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
          href={`https://wa.me/18588773786?text=${encodeURIComponent(
            `Hi, I'm interested in ${project.name} (${project.location}, ${project.country}).`
          )}`}
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
