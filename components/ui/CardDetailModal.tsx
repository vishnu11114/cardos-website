'use client';

import React from 'react';
import Image from 'next/image';
import { CardSpec } from '@/lib/cardsCatalogData';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Plane,
  Plus,
  Check,
} from 'lucide-react';

interface CardDetailModalProps {
  card: CardSpec | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForCompare?: (cardId: string) => void;
  isCompared?: boolean;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
  onSelectForCompare,
  isCompared = false,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const getLenis = () => (typeof window !== 'undefined' ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis : undefined);

    if (isOpen && card) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      getLenis()?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      getLenis()?.start();
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      getLenis()?.start();
    };
  }, [isOpen, card]);

  const handleBackdropWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (contentRef.current) {
      contentRef.current.scrollBy({
        top: e.deltaY * 0.85,
        behavior: 'smooth',
      });
    }
  };

  if (!isOpen || !card) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-modal-title"
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-hidden animate-in fade-in duration-200"
      onClick={onClose}
      onWheel={handleBackdropWheel}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#E5E5E7] max-h-[85vh] overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Permanently Anchored Top-Right Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5E7] shadow-sm transition-all border border-[#E5E5E7]/80 cursor-pointer"
          aria-label="Close card detail modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div
          ref={contentRef}
          data-lenis-prevent="true"
          className="p-6 sm:p-8 space-y-8 overflow-y-auto scroll-smooth overscroll-contain custom-modal-scrollbar flex-1"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Card Header & Brand Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5E7] pb-6 pr-14">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#0066CC] font-bold uppercase tracking-wider block">
                {card.bank} · {card.category} Tier
              </span>
              <h2 id="card-modal-title" className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                {card.name}
              </h2>
              <span className="inline-block text-xs font-mono font-semibold text-[#86868B]">
                Network: {card.network}
              </span>
            </div>

            <span className="bg-[#EFF6FF] text-[#0066CC] border border-[#D2E3FC] text-xs font-mono font-bold px-3 py-1 rounded-full shrink-0">
              {card.tag}
            </span>
          </div>

          {/* Visual & Quick Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Physical Studio Photograph */}
            {(() => {
              const zoomScale = (card.imageDisplaySettings?.zoom ?? 1) * (card.imageDisplaySettings?.scale ?? 1);
              const posX = card.imageDisplaySettings?.positionX ?? 0;
              const posY = card.imageDisplaySettings?.positionY ?? 0;

              return (
                <div className="md:col-span-5 relative aspect-[1.586] w-full rounded-2xl overflow-hidden bg-[#FAF9F6]/80 border border-[#E5E5E7] p-2.5 group">
                  <Image
                    src={card.image}
                    alt={`${card.name} Studio Photograph`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    style={{ transform: `scale(${zoomScale}) translate(${posX}px, ${posY}px)` }}
                    priority
                    unoptimized
                  />
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-bold">
                    {card.network}
                  </div>
                </div>
              );
            })()}

            {/* Key Facts Summary */}
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7]">
                  <span className="text-[#86868B] block font-semibold">Annual Fee</span>
                  <span className="text-[#1D1D1F] font-bold text-sm block mt-0.5">{card.annualFee}</span>
                  <span className="text-[10px] text-[#6E6E73] block truncate mt-1">{card.feeWaiver}</span>
                </div>

                <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7]">
                  <span className="text-[#86868B] block font-semibold">Reward Rate</span>
                  <span className="text-[#B06000] font-bold text-sm block mt-0.5">{card.rewardRate}</span>
                  <span className="text-[10px] text-[#137333] block font-bold mt-1">SmartBuy / Gyftr 5x Active</span>
                </div>

                <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7]">
                  <span className="text-[#86868B] block font-semibold">Forex Markup Fee</span>
                  <span className="text-[#0066CC] font-bold text-sm block mt-0.5">{card.forexMarkup}</span>
                  <span className="text-[10px] text-[#6E6E73] block mt-1">Global Spends</span>
                </div>

                <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7]">
                  <span className="text-[#86868B] block font-semibold">Lounge Access</span>
                  <span className="text-[#1D1D1F] font-bold text-xs block mt-0.5 truncate">{card.lounge}</span>
                  <span className="text-[10px] text-[#137333] block font-bold mt-1">Priority Pass Included</span>
                </div>
              </div>

              {/* Compare Action Button */}
              {onSelectForCompare && (
                <button
                  onClick={() => onSelectForCompare(card.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-2 transition-all ${isCompared
                    ? 'bg-[#137333] text-white'
                    : 'bg-[#1D1D1F] text-white hover:bg-black'
                    }`}
                >
                  {isCompared ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Compare Queue</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Comparison Queue</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Detailed Feature Highlights */}
          <div className="space-y-3 border-t border-[#E5E5E7] pt-6">
            <h3 className="text-sm font-mono font-bold uppercase text-[#1D1D1F] tracking-wider">
              Verified Specification Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#1D1D1F]">
              {card.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-[#F5F5F7] p-3 rounded-xl border border-[#E5E5E7]">
                  <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5 stroke-[2]" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone & Welcome Privileges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E5E5E7] pt-6 text-xs font-mono">
            <div className="bg-[#FEF7E0] p-4 rounded-2xl border border-[#FEEFC3] space-y-1">
              <span className="text-[#B06000] font-bold block uppercase">Welcome Benefit</span>
              <p className="text-[#1D1D1F] font-semibold">{card.welcomeOffer}</p>
            </div>

            <div className="bg-[#F0F6FF] p-4 rounded-2xl border border-[#D2E3FC] space-y-1">
              <span className="text-[#0066CC] font-bold block uppercase">Annual Spend Milestone</span>
              <p className="text-[#1D1D1F] font-semibold">{card.milestones}</p>
            </div>
          </div>

          {/* Airline & Hotel Transfer Partners */}
          <div className="space-y-3 border-t border-[#E5E5E7] pt-6">
            <h3 className="text-sm font-mono font-bold uppercase text-[#1D1D1F] tracking-wider flex items-center justify-between">
              <span>AirMiles & Hotel Transfer Partners</span>
              <Plane className="w-4 h-4 text-[#0066CC]" />
            </h3>
            <div className="flex flex-wrap gap-2">
              {card.transferPartners.map((partner, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F]"
                >
                  ✈️ {partner}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Primary Evidence Citation */}
          <div className="bg-[#E6F4EA] border border-[#CEEAD6] p-4 rounded-2xl flex items-center gap-3 text-xs font-mono">
            <ShieldCheck className="w-5 h-5 text-[#137333] shrink-0 stroke-[2]" />
            <div>
              <span className="text-[#137333] font-bold block uppercase">Verified Primary Source</span>
              <span className="text-[#1D1D1F]">{card.evidenceSource}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
