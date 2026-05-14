'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-sans text-sm font-medium tracking-widest uppercase',
    'rounded-[2px] border transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
    'disabled:pointer-events-none disabled:opacity-40',
    'cursor-pointer select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        /** Gold filled — primary CTA */
        default: [
          'bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-gold-light)] to-[var(--color-gold)]',
          'bg-[length:200%_auto] text-[#0A0A0B] border-transparent',
          'hover:bg-right-center hover:shadow-[0_6px_30px_rgba(201,168,76,0.35)] hover:-translate-y-px',
          'active:translate-y-0 active:shadow-[0_2px_12px_rgba(201,168,76,0.25)]',
        ].join(' '),

        /** Transparent with gold border */
        outline: [
          'bg-transparent text-white border border-[rgba(201,168,76,0.45)]',
          'hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]',
          'hover:bg-[rgba(201,168,76,0.06)] hover:shadow-[0_4px_20px_rgba(201,168,76,0.12)]',
          'hover:-translate-y-px active:translate-y-0',
        ].join(' '),

        /** Subtle ghost for tertiary actions */
        ghost: [
          'bg-transparent text-[var(--color-gray)] border-transparent',
          'hover:text-white hover:bg-[var(--color-surface-2)]',
        ].join(' '),

        /** Surface-coloured secondary */
        secondary: [
          'bg-[var(--color-surface-2)] text-white border-[var(--color-border)]',
          'hover:border-[rgba(201,168,76,0.4)] hover:text-[var(--color-gold-light)]',
          'hover:bg-[var(--color-surface)]',
        ].join(' '),
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-8 py-3 text-sm',
        lg: 'px-10 py-4 text-sm',
        icon: 'h-9 w-9 p-0 tracking-normal',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild: _asChild, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
