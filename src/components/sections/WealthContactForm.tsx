'use client';

const INPUT_CLASS = 'w-full px-4 py-3 rounded-[2px] text-sm text-white placeholder-[var(--color-muted)] outline-none';
const INPUT_STYLE = { background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', transition: 'border-color 0.2s' };

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'var(--color-border)';
}

const PORTFOLIO_VALUES = [
  { label: 'Under $5M', value: 'under-5m' },
  { label: '$5M – $25M', value: '5m-25m' },
  { label: '$25M – $100M', value: '25m-100m' },
  { label: '$100M+', value: '100m-plus' },
  { label: 'Prefer not to say', value: 'prefer-not' },
];

const PRIMARY_SERVICES = [
  { label: 'Family Office', value: 'family-office' },
  { label: 'Corporate Structuring', value: 'corporate-structuring' },
  { label: 'Wealth Planning', value: 'wealth-planning' },
  { label: 'Fund Management', value: 'fund-management' },
  { label: 'Banking Introductions', value: 'banking' },
  { label: 'Other', value: 'other' },
];

export default function WealthContactForm() {
  return (
    <form
      className="flex flex-col gap-5 p-8 rounded-[2px]"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      aria-label="Wealth and Rich enquiry form"
    >
      <h3
        className="text-xl font-normal text-white"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Private Enquiry
      </h3>

      {[
        { id: 'wr-name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
        { id: 'wr-email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
        { id: 'wr-phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+1 000 000 0000' },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="flex flex-col gap-1.5">
          <label htmlFor={id} className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: 'var(--color-gray)' }}>
            {label}
          </label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            required
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="wr-portfolio" className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: 'var(--color-gray)' }}>
            Portfolio Value
          </label>
          <select
            id="wr-portfolio"
            className="w-full px-4 py-3 rounded-[2px] text-sm text-white outline-none appearance-none"
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
          >
            <option value="">Select range</option>
            {PORTFOLIO_VALUES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="wr-service" className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: 'var(--color-gray)' }}>
            Primary Interest
          </label>
          <select
            id="wr-service"
            className="w-full px-4 py-3 rounded-[2px] text-sm text-white outline-none appearance-none"
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
          >
            <option value="">Select service</option>
            {PRIMARY_SERVICES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wr-requirements" className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: 'var(--color-gray)' }}>
          Tell us about your requirements
        </label>
        <textarea
          id="wr-requirements"
          rows={4}
          placeholder="Describe your situation and what you are looking to achieve..."
          className="w-full px-4 py-3 rounded-[2px] text-sm text-white placeholder-[var(--color-muted)] outline-none resize-none"
          style={INPUT_STYLE}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <button type="submit" className="btn-gold w-full" style={{ padding: '0.875rem' }}>
        Submit Enquiry
      </button>

      <p className="text-[0.65rem] text-center" style={{ color: 'var(--color-muted)' }}>
        All enquiries are handled with complete confidentiality. We do not share your information.
      </p>
    </form>
  );
}
