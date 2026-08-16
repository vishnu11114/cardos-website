import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'indigo' | 'gold' | 'emerald' | 'crimson' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'indigo',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full tracking-tight font-mono text-xs';

  const variants = {
    indigo: 'bg-[#F0F6FF] text-[#0066CC] border border-[#D2E3FC]',
    gold: 'bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]',
    emerald: 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]',
    crimson: 'bg-[#FCE8E6] text-[#C5221F] border border-[#FAD2CF]',
    neutral: 'bg-[#F5F5F7] text-[#6E6E73] border border-[#E5E5E7]',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3.5 py-1 text-xs',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
