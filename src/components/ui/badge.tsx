import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 rounded-[2px]',
    'font-sans text-[0.6875rem] font-600 tracking-[0.12em] uppercase',
    'px-2.5 py-1 leading-none whitespace-nowrap',
    'transition-colors duration-200',
  ].join(' '),
  {
    variants: {
      variant: {
        /** Default neutral surface badge */
        default: [
          'bg-[var(--color-surface-2)] text-[var(--color-gray)]',
          'border border-[var(--color-border)]',
        ].join(' '),

        /** Gold accent badge */
        gold: [
          'bg-[rgba(201,168,76,0.12)] text-[var(--color-gold)]',
          'border border-[rgba(201,168,76,0.3)]',
        ].join(' '),

        /** Outline only */
        outline: [
          'bg-transparent text-[var(--color-gray)]',
          'border border-[var(--color-border)]',
          'hover:border-[rgba(201,168,76,0.4)] hover:text-[var(--color-gold-light)]',
        ].join(' '),

        /** Green success / availability */
        success: [
          'bg-[rgba(52,199,89,0.12)] text-[#34C759]',
          'border border-[rgba(52,199,89,0.3)]',
        ].join(' '),

        /** Amber / warning — pre-launch / launching soon */
        warning: [
          'bg-[rgba(255,159,10,0.12)] text-[#FF9F0A]',
          'border border-[rgba(255,159,10,0.3)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
