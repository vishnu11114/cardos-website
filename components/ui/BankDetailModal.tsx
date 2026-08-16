'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { X, CheckCircle2, ArrowRight, Zap, Plane } from 'lucide-react';

export interface BankDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  bank: {
    bank: string;
    flagshipCard: string;
    rewardRate: string;
    fee: string;
    lounge: string;
    image: string;
    tag: string;
    portfolio: string[];
    transferPartners: string[];
    aiInsight: string;
  } | null;
}

export const BankDetailModal: React.FC<BankDetailModalProps> = ({ isOpen, onClose, bank }) => {
  // Lock body scroll when modal is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !bank) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="bg-white border border-[#E7E7E7] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 relative text-[#111111] my-auto"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#FAFAFA] border border-[#E7E7E7] flex items-center justify-center text-[#666666] hover:text-[#111111] hover:bg-[#F7F7F7] transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <Badge variant="indigo" size="md">
            Bank Ecosystem Explorer
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            {bank.bank}
          </h3>
          <p className="text-sm text-[#2563EB] font-mono font-semibold">Flagship: {bank.flagshipCard}</p>
        </div>

        {/* Studio Product Image Preview */}
        <div className="relative h-52 w-full rounded-2xl overflow-hidden border border-[#E7E7E7] shadow-lg">
          <Image
            src={bank.image}
            alt={bank.bank}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className="text-xs font-mono font-bold bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full border border-[#BFDBFE] shadow-sm">
              {bank.tag}
            </span>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#D97706]" />
            <span className="text-xs font-mono text-[#111111] font-bold">CardOS AI Recommendation Benchmark</span>
          </div>
          <p className="text-xs text-[#666666] leading-relaxed font-medium">
            {bank.aiInsight}
          </p>
        </div>

        {/* Portfolio Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-[#999999] tracking-wider font-bold">
            Supported Card Lineup
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {bank.portfolio.map((card, idx) => (
              <div key={idx} className="bg-[#FAFAFA] p-3 rounded-xl border border-[#E7E7E7] text-xs font-semibold text-[#111111] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{card}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Partners */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-[#999999] tracking-wider font-bold flex items-center gap-1.5">
            <Plane className="w-4 h-4 text-[#2563EB]" />
            <span>AirMiles & Hotel Transfer Partners (1:1 Ratio)</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {bank.transferPartners.map((partner, idx) => (
              <span key={idx} className="text-xs font-mono bg-[#FAFAFA] text-[#111111] px-3 py-1.5 rounded-full border border-[#E7E7E7] font-semibold">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Lounge & Fee Details */}
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-[#E7E7E7]">
            <span className="text-[#999999] block mb-1">AIRPORT LOUNGE ACCESS</span>
            <span className="text-[#16A34A] font-bold text-sm block">{bank.lounge}</span>
          </div>
          <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-[#E7E7E7]">
            <span className="text-[#999999] block mb-1">ANNUAL FEE STRUCTURE</span>
            <span className="text-[#D97706] font-bold text-sm block">{bank.fee}</span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-[#E7E7E7] flex items-center justify-between">
          <span className="text-xs font-mono text-[#999999]">RBI Tokenization Aligned</span>
          <Button variant="primary" size="md" onClick={onClose} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Close Explorer
          </Button>
        </div>
      </div>
    </div>
  );
};
