'use client';

import React, { useState } from 'react';
import { formatINR } from '@/lib/design-system/formatters';
import { X } from 'lucide-react';

export interface AmountInputProps {
  value: number;
  onChange: (val: number) => void;
  label?: string;
  maxAmount?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  label = 'Transaction Amount',
  maxAmount = 1000000,
  placeholder = 'Enter spend amount',
  className = '',
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    const num = parseInt(rawVal || '0', 10);
    if (num <= maxAmount) {
      onChange(num);
    }
  };

  return (
    <div className={`space-y-1.5 font-mono text-xs ${className}`}>
      {label && (
        <label className="text-[#6E6E73] font-bold uppercase tracking-wider block">
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center bg-[#F5F5F7] border rounded-2xl px-4 py-3 transition-all ${
          isFocused
            ? 'border-[#0066CC] ring-2 ring-[#0066CC]/20 bg-white shadow-xs'
            : 'border-[#E5E5E7] hover:border-[#D2D2D7]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="text-[#1D1D1F] font-bold text-base mr-2 select-none">₹</span>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          disabled={disabled}
          value={value > 0 ? value.toLocaleString('en-IN') : ''}
          onChange={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent font-bold text-base text-[#1D1D1F] focus:outline-none placeholder-[#86868B] tabular-nums"
        />

        {value > 0 && !disabled && (
          <button
            type="button"
            onClick={() => onChange(0)}
            className="p-1 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#E5E5E7] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex justify-between text-[11px] text-[#86868B] px-1 tabular-nums">
        <span>Formatted: {formatINR(value)}</span>
        {maxAmount && <span>Max: {formatINR(maxAmount)}</span>}
      </div>
    </div>
  );
};
