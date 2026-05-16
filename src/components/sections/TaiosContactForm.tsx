'use client';

const INPUT_CLASS = 'w-full px-4 py-3 rounded-[2px] text-sm text-white placeholder-[var(--color-muted)] outline-none';
const INPUT_STYLE = { background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', transition: 'border-color 0.2s' };

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'var(--color-border)';
}

export default function TaiosContactForm() {
  return (
    <form
      className="flex flex-col gap-5 p-8 rounded-[2px]"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      aria-label="TAIOS enquiry form"
    >
      <h3
        className="text-xl font-normal text-white"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Send an Enquiry
      </h3>

      {[
        { id: 'taios-name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
        { id: 'taios-email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
        { id: 'taios-company', label: 'Company', type: 'text', placeholder: 'Your organisation' },
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="taios-message" className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: 'var(--color-gray)' }}>
          How can TAIOS help?
        </label>
        <textarea
          id="taios-message"
          rows={4}
          placeholder="Describe your project or requirements..."
          required
          className="w-full px-4 py-3 rounded-[2px] text-sm text-white placeholder-[var(--color-muted)] outline-none resize-none"
          style={INPUT_STYLE}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <button type="submit" className="btn-gold w-full" style={{ padding: '0.875rem' }}>
        Send Enquiry
      </button>

      <p className="text-[0.65rem] text-center" style={{ color: 'var(--color-muted)' }}>
        Your enquiry is handled with complete confidentiality.
      </p>
    </form>
  );
}
