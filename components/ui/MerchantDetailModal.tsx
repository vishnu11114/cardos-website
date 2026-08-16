'use client';

import React from 'react';
import Image from 'next/image';
import { MerchantProfile } from '@/lib/merchantIntelligenceDemoData';
import {
  X,
  Tag,
  Layers,
} from 'lucide-react';

interface MerchantDetailModalProps {
  merchant: MerchantProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantDetailModal: React.FC<MerchantDetailModalProps> = ({
  merchant,
  isOpen,
  onClose,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [isOpen]);

  if (!isOpen || !merchant) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="merchant-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E5E7] max-h-[85vh] overflow-y-auto relative text-[#1D1D1F] modal-custom-scrollbar focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#FAF8F5] text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white border border-[#E5E5E7] transition-all cursor-pointer"
          aria-label="Close merchant detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Merchant Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E5E5E7] pb-5 pr-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              {merchant.image ? (
                <div className="w-10 h-10 relative rounded-xl overflow-hidden border border-[#E5E5E7] shadow-2xs shrink-0 bg-white">
                  <Image src={merchant.image} alt={merchant.name} fill className="object-contain p-1" />
                </div>
              ) : (
                <span className="text-2xl">{merchant.logoIcon}</span>
              )}
              <span className="text-xs font-mono text-[#0066CC] font-bold uppercase tracking-wider">
                {merchant.category}
              </span>
            </div>
            <h2 id="merchant-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              {merchant.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#1D1D1F] font-bold">
              <span className="bg-[#E6F4EA] text-[#137333] font-bold px-2.5 py-0.5 rounded-full border border-[#CEEAD6]">
                MCC {merchant.mcc} · {merchant.mccStatus}
              </span>
              <span className="text-[#1D1D1F]">Descriptors: {merchant.descriptors.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Channel & Best Card Multiplier Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase text-[#1D1D1F] tracking-wider flex items-center justify-between">
            <span>Payment Methods & Card Multipliers</span>
            <Layers className="w-4 h-4 text-[#0066CC]" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            {merchant.channels.map((ch) => (
              <div key={ch.id} className="bg-gradient-to-br from-[#FAF8F5] via-[#FAF9F6] to-[#FFFFFF] p-4 rounded-2xl border border-[#E5E5E7] space-y-2 shadow-2xs">
                <span className="text-[#1D1D1F] block font-bold text-xs">{ch.label}</span>
                <span className="text-[#0066CC] font-bold text-sm block">{ch.multiplier}</span>
                <div className="pt-2 border-t border-[#E5E5E7] text-[11px]">
                  <span className="text-[#1D1D1F] font-bold block">{ch.bestCard}</span>
                  <span className="text-[#137333] font-bold block mt-0.5">{ch.expectedValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Bank Offers & Exclusions */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase text-[#1D1D1F] tracking-wider flex items-center justify-between">
            <span>Verified Active Bank Offers ({merchant.offers.length})</span>
            <Tag className="w-4 h-4 text-[#137333]" />
          </h3>
          <div className="space-y-3">
            {merchant.offers.map((off) => (
              <div key={off.id} className="bg-gradient-to-br from-[#FAF8F5] via-[#FAF9F6] to-[#FFFFFF] p-4 rounded-2xl border border-[#E5E5E7] space-y-3 text-xs shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1D1D1F] text-sm">{off.title}</span>
                  <span className={`font-mono font-bold px-2.5 py-0.5 rounded-full text-[10px] ${off.status === 'ENDING SOON'
                    ? 'bg-[#FCE8E6] text-[#C5221F] border border-[#FAD2CF]'
                    : 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]'
                    }`}>
                    {off.status} · Expires {off.expiry}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-[#1D1D1F]">
                  <div>Bank: <strong className="text-[#0066CC]">{off.bank}</strong></div>
                  <div>Min Spend: <strong className="text-[#1D1D1F]">{off.minSpend}</strong></div>
                  <div>Max Cap: <strong className="text-[#0066CC]">{off.maxDiscount}</strong></div>
                  <div>Stackable: <strong className="text-[#137333]">{off.stackable ? 'Yes' : 'No'}</strong></div>
                </div>

                <div className="space-y-1 text-[#1D1D1F] border-t border-[#E5E5E7] pt-2 text-[11px]">
                  <span className="font-mono font-bold text-[#1D1D1F] block">Terms & Exclusions:</span>
                  <ul className="list-disc list-inside space-y-0.5 font-medium">
                    {off.conditions.map((cond, i) => (
                      <li key={i}>{cond}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
