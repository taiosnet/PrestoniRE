import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Prepend an icon or element inside the left edge of the input */
  leftElement?: React.ReactNode;
  /** Append an icon or element inside the right edge of the input */
  rightElement?: React.ReactNode;
  /** Display an error message below the input */
  error?: string;
  /** Display a helper text below the input */
  hint?: string;
  /** Label displayed above the input */
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftElement, rightElement, error, hint, label, id, ...props }, ref) => {
    const inputId = id ?? React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="font-sans text-xs font-500 tracking-[0.1em] uppercase text-[var(--color-gray)]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftElement && (
            <span className="absolute left-3.5 flex items-center text-[var(--color-muted)] pointer-events-none">
              {leftElement}
            </span>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              // Layout & sizing
              'w-full h-11 rounded-[2px] font-sans text-sm',
              // Colors
              'bg-[var(--color-surface-2)] text-white',
              'border border-[var(--color-border)]',
              'placeholder:text-[var(--color-muted)]',
              // Focus
              'focus:outline-none focus:border-[var(--color-gold)]',
              'focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]',
              // Transition
              'transition-all duration-200',
              // Disabled
              'disabled:opacity-50 disabled:cursor-not-allowed',
              // Error state
              error
                ? 'border-[rgba(255,69,58,0.6)] focus:border-[rgba(255,69,58,0.8)] focus:shadow-[0_0_0_3px_rgba(255,69,58,0.1)]'
                : '',
              // Padding adjustments for side elements
              leftElement ? 'pl-10' : 'px-4',
              rightElement ? 'pr-10' : 'pr-4',
              className
            )}
            {...props}
          />

          {rightElement && (
            <span className="absolute right-3.5 flex items-center text-[var(--color-muted)]">
              {rightElement}
            </span>
          )}
        </div>

        {error && (
          <p className="font-sans text-xs text-[rgba(255,69,58,0.9)] mt-0.5">{error}</p>
        )}
        {hint && !error && (
          <p className="font-sans text-xs text-[var(--color-muted)] mt-0.5">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
