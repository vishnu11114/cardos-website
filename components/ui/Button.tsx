import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] rounded-full tracking-tight';

    const variants = {
      primary:
        'bg-[#1D1D1F] text-white hover:bg-[#0066CC] shadow-xs hover:shadow-md border border-transparent',
      secondary:
        'bg-white text-[#1D1D1F] border border-[#E5E5E7] hover:bg-[#F5F5F7] hover:border-[#1D1D1F] shadow-xs',
      ghost:
        'bg-transparent text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] border border-transparent',
      glass:
        'bg-white/90 backdrop-blur-md text-[#1D1D1F] border border-[#E5E5E7] hover:bg-white hover:border-[#0066CC]/40 shadow-xs',
      danger:
        'bg-[#C5221F] text-white hover:bg-[#A50E0C] shadow-xs border border-transparent',
      gold:
        'bg-[#B06000] text-white hover:bg-[#8B4C00] shadow-xs border border-transparent',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs gap-1.5',
      md: 'h-11 px-5 text-sm gap-2',
      lg: 'h-13 px-7 text-base gap-2.5',
      xl: 'h-14 px-8 text-base font-semibold gap-3',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
