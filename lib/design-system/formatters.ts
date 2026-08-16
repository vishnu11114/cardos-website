/**
 * Centralized Financial & Semantic Formatting Utilities
 * Standardized across CardOS components for Indian Currency (₹), Percentages, Multipliers, & Masking
 */

export const formatINR = (amount: number, showSymbol: boolean = true): string => {
  if (isNaN(amount)) return showSymbol ? '₹0' : '0';
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
  return showSymbol ? `₹${formatted}` : formatted;
};

export const formatPercent = (value: number, decimals: number = 2): string => {
  if (isNaN(value)) return '0.00%';
  return `${value.toFixed(decimals)}%`;
};

export const formatMultiplier = (multiplier: number): string => {
  if (isNaN(multiplier)) return '1X';
  return `${multiplier}X`;
};

export const maskCardNumber = (lastFour: string): string => {
  const digits = lastFour.replace(/\D/g, '').slice(-4);
  return `•••• ${digits || '4821'}`;
};

export const formatDate = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};
