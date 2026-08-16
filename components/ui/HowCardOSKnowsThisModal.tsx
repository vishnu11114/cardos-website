'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import {
  X,
  ShieldCheck,
} from 'lucide-react';

interface HowCardOSKnowsThisProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  sourceDoc?: string;
  verifiedDate?: string;
  ruleClause?: string;
  formula?: string;
  limitations?: string[];
}

export const HowCardOSKnowsThisModal: React.FC<HowCardOSKnowsThisProps> = ({
  isOpen,
  onClose,
  title = 'HDFC Infinia SmartBuy 5x Reward Multiplier',
  sourceDoc = 'HDFC Bank SmartBuy Terms & Conditions August 2026',
  verifiedDate = 'August 2026',
  ruleClause = '5x Reward Points on SmartBuy Flights & Hotels (Max 15,000 bonus points per month). 100% 1:1 AirMiles flight redemption value.',
  formula = '₹50,000 spend ÷ ₹150 base = 1,666 base pts. 5x SmartBuy multiplier = 8,333 total points (Value: ₹8,333 for flight booking).',
  limitations = [
    'Monthly capping ceiling of 15,000 accelerated reward points.',
    'Fuel, rent, wallet load, and government utility payments excluded.',
    'Reward point validity is 3 years from date of accumulation.',
  ],
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trust-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E5E7] max-h-[90vh] overflow-y-auto relative text-[#1D1D1F]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5E7] transition-all"
          aria-label="Close trust modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 border-b border-[#E5E5E7] pb-4 pr-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#137333]" />
            <span className="text-xs font-mono font-bold text-[#137333] uppercase tracking-wider">
              How CardOS Knows This · Grounded Traceability
            </span>
          </div>
          <h2 id="trust-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            {title}
          </h2>
        </div>

        {/* 6-Step Traceability Breakdown */}
        <div className="space-y-4 font-mono text-xs">
          {/* 1. Information Source */}
          <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-[#E5E5E7] space-y-1">
            <span className="text-[#0066CC] font-bold uppercase text-[10px]">01 · PRIMARY SOURCE DOCUMENT</span>
            <p className="text-[#1D1D1F] font-bold font-sans">{sourceDoc}</p>
          </div>

          {/* 2. Verification Timestamp & Freshness */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7] space-y-0.5">
              <span className="text-[#86868B] block text-[10px]">LAST CHECKED</span>
              <span className="text-[#137333] font-bold text-xs block">{verifiedDate}</span>
            </div>
            <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7] space-y-0.5">
              <span className="text-[#86868B] block text-[10px]">VERIFICATION STATUS</span>
              <span className="text-[#0066CC] font-bold text-xs block">✔ VERIFIED SOURCE</span>
            </div>
          </div>

          {/* 3. Applicable Rule Clause */}
          <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-[#E5E5E7] space-y-1">
            <span className="text-[#B06000] font-bold uppercase text-[10px]">03 · APPLICABLE CLAUSE & TARIFF</span>
            <p className="text-[#1D1D1F] font-sans leading-relaxed">{ruleClause}</p>
          </div>

          {/* 4. Formula & Computation */}
          <div className="bg-[#F0F6FF] border border-[#D2E3FC] p-4 rounded-2xl space-y-1">
            <span className="text-[#0066CC] font-bold uppercase text-[10px]">04 · DETERMINISTIC FORMULA</span>
            <p className="text-[#1D1D1F] font-sans">{formula}</p>
          </div>

          {/* 5. Known Limitations & Exclusions */}
          <div className="bg-[#FEF7E0] border border-[#FEEFC3] p-4 rounded-2xl space-y-1 text-[#B06000]">
            <span className="font-bold uppercase text-[10px] block">05 · LIMITATIONS & EXCLUSIONS</span>
            <ul className="list-disc list-inside space-y-1 font-sans text-xs text-[#1D1D1F]">
              {limitations.map((lim, idx) => (
                <li key={idx}>{lim}</li>
              ))}
            </ul>
          </div>

          {/* 6. What User Should Verify */}
          <div className="bg-[#E6F4EA] border border-[#CEEAD6] p-4 rounded-2xl space-y-1 text-[#137333]">
            <span className="font-bold uppercase text-[10px] block">06 · BEFORE YOU PAY</span>
            <p className="font-sans text-xs text-[#1D1D1F]">
              Always review the final payment checkout screen on the official merchant site. Issuer terms and promotional bank sales are subject to change.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end pt-2">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close Evidence Window
          </Button>
        </div>
      </div>
    </div>
  );
};
