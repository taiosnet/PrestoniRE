'use client';

import { useState } from 'react';
import { CheckCircle, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ─── Props ──────────────────────────────────────────────────────────────────── */

interface PropertyEnquiryProps {
  propertyTitle: string;
  propertyId: string;
}

/* ─── Phone country codes ─────────────────────────────────────────────────────── */

const COUNTRY_CODES = [
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+351', label: '🇵🇹 +351' },
  { code: '+34', label: '🇪🇸 +34' },
  { code: '+62', label: '🇮🇩 +62' },
  { code: '+33', label: '🇫🇷 +33' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+61', label: '🇦🇺 +61' },
  { code: '+7', label: '🇷🇺 +7' },
  { code: '+86', label: '🇨🇳 +86' },
  { code: '+81', label: '🇯🇵 +81' },
];

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function PropertyEnquiry({ propertyTitle, propertyId }: PropertyEnquiryProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    `I am interested in ${propertyTitle}. Please send me more details.`
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    // Log for reference (would be API call in production)
    console.info('[PropertyEnquiry] Submitted enquiry:', { propertyId, propertyTitle, name, email, phone: `${countryCode}${phone}`, message });
  };

  const whatsappMessage = encodeURIComponent(
    `I'm interested in ${propertyTitle}. Could you please provide more details?`
  );
  const whatsappUrl = `https://wa.me/17865550100?text=${whatsappMessage}`;

  /* ── Success state ──────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8 px-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(52,199,89,0.12)', border: '1px solid rgba(52,199,89,0.3)' }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: '#34C759' }} />
        </div>
        <div>
          <h3
            className="text-xl mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-white)' }}
          >
            Enquiry Sent
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
            Your enquiry has been sent. A Prestoni advisor will contact you within 2 hours.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs tracking-wider uppercase transition-colors duration-200"
          style={{ color: 'var(--color-muted)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gold)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-muted)'; }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  /* ── Form ───────────────────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="enquiry-name"
          className="text-xs font-medium tracking-[0.1em] uppercase"
          style={{ color: 'var(--color-gray)' }}
        >
          Full Name <span style={{ color: 'var(--color-gold)' }}>*</span>
        </label>
        <input
          id="enquiry-name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((prev) => { const n = { ...prev }; delete n.name; return n; }); }}
          className={cn(
            'w-full h-11 px-4 rounded-[2px] text-sm font-sans',
            'bg-[var(--color-surface-2)] text-white',
            'border transition-all duration-200',
            'placeholder:text-[var(--color-muted)]',
            'focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]',
            errors.name
              ? 'border-[rgba(255,69,58,0.6)]'
              : 'border-[var(--color-border)]'
          )}
        />
        {errors.name && (
          <p className="text-xs" style={{ color: 'rgba(255,69,58,0.9)' }}>{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="enquiry-email"
          className="text-xs font-medium tracking-[0.1em] uppercase"
          style={{ color: 'var(--color-gray)' }}
        >
          Email Address <span style={{ color: 'var(--color-gold)' }}>*</span>
        </label>
        <input
          id="enquiry-email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((prev) => { const n = { ...prev }; delete n.email; return n; }); }}
          className={cn(
            'w-full h-11 px-4 rounded-[2px] text-sm font-sans',
            'bg-[var(--color-surface-2)] text-white',
            'border transition-all duration-200',
            'placeholder:text-[var(--color-muted)]',
            'focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]',
            errors.email
              ? 'border-[rgba(255,69,58,0.6)]'
              : 'border-[var(--color-border)]'
          )}
        />
        {errors.email && (
          <p className="text-xs" style={{ color: 'rgba(255,69,58,0.9)' }}>{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="enquiry-phone"
          className="text-xs font-medium tracking-[0.1em] uppercase"
          style={{ color: 'var(--color-gray)' }}
        >
          Phone Number
        </label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            aria-label="Country code"
            className="h-11 px-2 rounded-[2px] text-sm font-sans border border-[var(--color-border)] bg-[var(--color-surface-2)] text-white focus:outline-none focus:border-[var(--color-gold)] transition-all duration-200 shrink-0"
            style={{ minWidth: '100px' }}
          >
            {COUNTRY_CODES.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          <input
            id="enquiry-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 h-11 px-4 rounded-[2px] text-sm font-sans border border-[var(--color-border)] bg-[var(--color-surface-2)] text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-200"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="enquiry-message"
          className="text-xs font-medium tracking-[0.1em] uppercase"
          style={{ color: 'var(--color-gray)' }}
        >
          Message <span style={{ color: 'var(--color-gold)' }}>*</span>
        </label>
        <textarea
          id="enquiry-message"
          rows={4}
          placeholder="Tell us how we can help..."
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((prev) => { const n = { ...prev }; delete n.message; return n; }); }}
          className={cn(
            'w-full px-4 py-3 rounded-[2px] text-sm font-sans resize-none',
            'bg-[var(--color-surface-2)] text-white',
            'border transition-all duration-200',
            'placeholder:text-[var(--color-muted)]',
            'focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]',
            errors.message
              ? 'border-[rgba(255,69,58,0.6)]'
              : 'border-[var(--color-border)]'
          )}
        />
        {errors.message && (
          <p className="text-xs" style={{ color: 'rgba(255,69,58,0.9)' }}>{errors.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="default"
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Enquiry'
        )}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>or</span>
        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
      </div>

      {/* WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'w-full inline-flex items-center justify-center gap-2',
          'h-11 rounded-[2px] text-sm font-medium tracking-widest uppercase',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]'
        )}
        style={{
          background: 'rgba(37,211,102,0.1)',
          border: '1px solid rgba(37,211,102,0.35)',
          color: '#25D366',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37,211,102,0.18)';
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(37,211,102,0.6)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37,211,102,0.1)';
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(37,211,102,0.35)';
        }}
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        WhatsApp Us
      </a>

      {/* Advisor note */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-[2px] mt-1"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
      >
        <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
        <div>
          <p className="text-xs font-medium" style={{ color: 'var(--color-gray)' }}>
            Speak with a Prestoni advisor 24/7
          </p>
          <a
            href="tel:+17865550100"
            className="text-xs font-semibold transition-colors duration-200"
            style={{ color: 'var(--color-gold-light)' }}
          >
            +1 (786) 555-0100
          </a>
        </div>
      </div>

      {/* Request viewing link */}
      <button
        type="button"
        onClick={() => {
          setMessage(`I would like to request a private viewing of ${propertyTitle}. Please let me know your available times.`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="text-xs tracking-wider uppercase text-center transition-colors duration-200 mt-1"
        style={{ color: 'var(--color-muted)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gold)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-muted)'; }}
      >
        Request a Viewing Instead
      </button>
    </form>
  );
}
