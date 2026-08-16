'use client';

import React from 'react';
import { formatINR } from '@/lib/design-system/formatters';
import { Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface RewardCalculationCardProps {
  merchantName: string;
  merchantId?: 'croma' | 'amazon' | 'swiggy' | 'makemytrip' | string;
  spendAmount: number;
  baseReward: number;
  acceleratedReward: number;
  bankDiscount: number;
  conflictNotice?: string;
  sourceDoc?: string;
  className?: string;
}

const merchantBrandThemes: Record<string, { badgeBg: string; badgeBorder: string; text: string; dot: string }> = {
  croma: { badgeBg: 'bg-[#F0FDFA]', badgeBorder: 'border-[#CCFBF1]', text: 'text-[#0D9488]', dot: 'bg-[#0D9488]' },
  amazon: { badgeBg: 'bg-[#FFFBEB]', badgeBorder: 'border-[#FDE68A]', text: 'text-[#D97706]', dot: 'bg-[#F59E0B]' },
  swiggy: { badgeBg: 'bg-[#FFF7ED]', badgeBorder: 'border-[#FFEDD5]', text: 'text-[#EA580C]', dot: 'bg-[#EA580C]' },
  makemytrip: { badgeBg: 'bg-[#FEF2F2]', badgeBorder: 'border-[#FECACA]', text: 'text-[#DC2626]', dot: 'bg-[#DC2626]' },
};

export const RewardCalculationCard: React.FC<RewardCalculationCardProps> = ({
  merchantName,
  merchantId = 'croma',
  spendAmount,
  baseReward,
  acceleratedReward,
  bankDiscount,
  conflictNotice,
  sourceDoc = 'Verified from Official Bank T&C Repositories',
  className = '',
}) => {
  const totalDirectValue = baseReward + acceleratedReward + bankDiscount;
  const themeKey = merchantId.toLowerCase();
  const theme = merchantBrandThemes[themeKey] || merchantBrandThemes.croma;

  return (
    <div className={`p-6 sm:p-7 bg-white border border-[#E5E5E7] rounded-3xl shadow-xs space-y-6 text-xs text-[#1D1D1F] ${className}`}>
      {/* Institutional Header with Brand Color Accent */}
      <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl ${theme.badgeBg} border ${theme.badgeBorder} flex items-center justify-center shrink-0 shadow-2xs`}>
            <Layers className={`w-4 h-4 ${theme.text}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-[#1D1D1F] tracking-tight">{merchantName} Calculation Breakdown</h4>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${theme.badgeBg} ${theme.badgeBorder} ${theme.text} border`}>
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                {merchantId.toUpperCase()}
              </span>
            </div>
            <span className="text-[11px] text-[#1D1D1F] font-mono font-medium block mt-0.5">Deterministic Spend Model</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#1D1D1F] block">Spend Amount</span>
          <span className="text-sm font-bold text-[#1D1D1F] font-mono tabular-nums">{formatINR(spendAmount)}</span>
        </div>
      </div>

      {/* Clean Institutional Value Table */}
      <div className="space-y-2 font-mono">
        {/* Base Rate Row */}
        <div className="flex justify-between items-center p-3 bg-[#F9F9FB] rounded-xl border border-[#E5E5E7]">
          <span className="text-[#1D1D1F] font-sans font-semibold">Base Card Reward Yield</span>
          <span className="font-bold text-[#1D1D1F] tabular-nums">{formatINR(baseReward)}</span>
        </div>

        {/* Accelerated Multiplier Row */}
        <div className="flex justify-between items-center p-3 bg-[#F9F9FB] rounded-xl border border-[#E5E5E7]">
          <span className="text-[#1D1D1F] font-sans font-semibold">Accelerated Multiplier Bonus</span>
          <span className="font-bold text-[#0066CC] tabular-nums">+{formatINR(acceleratedReward)}</span>
        </div>

        {/* Bank Instant Discount Row */}
        <div className="flex justify-between items-center p-3 bg-[#F9F9FB] rounded-xl border border-[#E5E5E7]">
          <span className="text-[#1D1D1F] font-sans font-semibold">Bank Sale Instant Discount</span>
          <span className="font-bold text-[#1D1D1F] tabular-nums">+{formatINR(bankDiscount)}</span>
        </div>

        {/* Highlighted Net Rupee Return Row (Sleek Blue Institutional Card) */}
        <div className="flex justify-between items-center p-4 bg-[#F0F6FF] rounded-2xl border border-[#D2E3FC] text-sm font-bold mt-3 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0066CC]" />
            <span className="text-[#0066CC] font-sans">Net Direct Estimated Return</span>
          </div>
          <span className="text-[#0066CC] text-base tabular-nums">{formatINR(totalDirectValue)}</span>
        </div>
      </div>

      {/* Stacking Evaluation */}
      {conflictNotice && (
        <div className="p-3.5 bg-[#F9F9FB] border border-[#E5E5E7] rounded-2xl text-[11px] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#1D1D1F]">
            <ShieldCheck className="w-4 h-4 text-[#0066CC] shrink-0" />
            <span>Stacking & Compatibility Evaluation</span>
          </div>
          <p className="text-[#1D1D1F] leading-relaxed font-sans font-medium">{conflictNotice}</p>
        </div>
      )}

      {/* Source Citation Footer */}
      <div className="pt-2 border-t border-[#E5E5E7] flex items-center justify-between text-[11px] text-[#1D1D1F] font-mono font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
          <span>{sourceDoc}</span>
        </div>
        <span className="font-bold text-[#0066CC]">Verified</span>
      </div>
    </div>
  );
};

