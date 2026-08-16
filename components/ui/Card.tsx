import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'glass' | 'stat' | 'offer' | 'alert';
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'base', hoverable = true, children, ...props }, ref) => {
    const baseStyles = 'rounded-[24px] transition-all duration-350 relative overflow-hidden';

    const variants = {
      base: 'bg-white border border-[#E5E5E7] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)]',
      glass:
        'bg-white/90 backdrop-blur-xl border border-[#E5E5E7] p-6 sm:p-8 shadow-[0_6px_20px_rgba(0,0,0,0.04)]',
      stat: 'bg-[#F5F5F7] border border-[#E5E5E7] p-6 sm:p-8 flex flex-col justify-between',
      offer:
        'bg-white border border-[#E5E5E7] p-6 sm:p-8 border-l-4 border-l-[#B06000] shadow-xs',
      alert:
        'bg-[#FCE8E6] border border-[#FAD2CF] p-6 sm:p-8 border-l-4 border-l-[#C5221F]',
    };

    const hoverStyles = hoverable
      ? 'hover:-translate-y-1 hover:border-[#D2D2D7] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]'
      : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
