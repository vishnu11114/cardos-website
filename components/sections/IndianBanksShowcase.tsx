'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getCardById } from '@/lib/cardsCatalogData';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowUpRight,
} from 'lucide-react';

export const IndianBanksShowcase = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>('amex_platinum');
  const [slideDirection, setSlideDirection] = useState<number>(1);

  // The 5 equalized cards showcase for home page
  const representativeCards = [
    getCardById('amex_platinum')!,
    getCardById('hdfc_infinia')!,
    getCardById('icici_emeralde')!,
    getCardById('axis_atlas')!,
    getCardById('sbi_elite')!,
  ].filter(Boolean);

  const currentIndex = representativeCards.findIndex((c) => c.id === selectedCardId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const selectedCard = representativeCards[safeIndex] || representativeCards[0];

  const selectPrevCard = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSlideDirection(-1);
    const newIdx = (safeIndex - 1 + representativeCards.length) % representativeCards.length;
    setSelectedCardId(representativeCards[newIdx].id);
  };

  const selectNextCard = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSlideDirection(1);
    const newIdx = (safeIndex + 1) % representativeCards.length;
    setSelectedCardId(representativeCards[newIdx].id);
  };

  const handleSelectPill = (id: string, idx: number) => {
    setSlideDirection(idx > safeIndex ? 1 : -1);
    setSelectedCardId(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectPrevCard();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectNextCard();
    }
  };

  return (
    <section id="choose" suppressHydrationWarning className="scroll-mt-20 py-24 bg-gradient-to-b from-[#F5F3EF] via-[#F5F3EF] to-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Page Header with Single Explore Product CTA on Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center">
              <Badge variant="indigo" size="md">
                CHOOSE YOUR CREDIT CARD
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Choose Your Credit Card
            </h2>
            <p className="text-base sm:text-lg text-[#1D1D1F] leading-relaxed font-medium">
              Explore five premium cards and choose the one that best fits your spending and travel needs.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/product">
              <Button variant="primary" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Explore Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Side-by-Side Card Stage Container (Clean White) */}
        <div className="bg-white border border-[#E5E5E7] rounded-3xl p-4 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Blue Accent Shape behind Card Stage */}
          <div className="w-56 h-56 rounded-full bg-[#0066CC]/5 blur-3xl absolute -top-12 -left-12 pointer-events-none" />
          <div className="w-48 h-48 rounded-full bg-[#0066CC]/5 blur-3xl absolute -bottom-12 right-12 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Column: Credit Card Display & Bank Selector */}
            <div
              onKeyDown={handleKeyDown}
              tabIndex={0}
              aria-label="Interactive 5 Card Selector"
              className="lg:col-span-6 flex flex-col justify-between items-center space-y-6 focus:outline-none select-none"
            >
              {/* Progress Counter */}
              <div className="w-full flex items-center justify-between border-b border-[#E5E5E7]/60 pb-3">
                <span className="text-xs font-mono text-[#0066CC] font-bold tracking-widest bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#D2E3FC]">
                  CARD 0{safeIndex + 1} OF 0{representativeCards.length}
                </span>
                <span className="text-xs font-mono text-[#1D1D1F] font-bold">
                  {selectedCard.bank}
                </span>
              </div>

              {/* Floating Physical Credit Card Artwork inside Rounded Frame */}
              <div className="w-full flex items-center justify-between gap-1.5 sm:gap-3 py-2">
                <button
                  type="button"
                  onClick={selectPrevCard}
                  aria-label="Previous credit card"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#FAF9F6] border border-[#E5E5E7] flex items-center justify-center text-[#1D1D1F] shadow-sm transition-all active:scale-95 cursor-pointer shrink-0 z-20"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="flex-1 flex justify-center items-center overflow-hidden py-1 sm:py-2">
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={selectedCard.id}
                      custom={slideDirection}
                      initial={{ opacity: 0, x: slideDirection > 0 ? 40 : -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: slideDirection > 0 ? -40 : 40 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="p-2 sm:p-4 bg-white border border-[#E5E5E7] rounded-2xl sm:rounded-3xl shadow-sm shrink-0 cursor-pointer transition-transform duration-300 active:scale-98 flex items-center justify-center"
                      onClick={(e) => selectNextCard(e)}
                    >
                      {(() => {
                        const zoomScale = (selectedCard.imageDisplaySettings?.zoom ?? 1) * (selectedCard.imageDisplaySettings?.scale ?? 1);
                        const posX = selectedCard.imageDisplaySettings?.positionX ?? 0;
                        const posY = selectedCard.imageDisplaySettings?.positionY ?? 0;

                        return (
                          <div className="w-[200px] min-[360px]:w-[230px] min-[400px]:w-[270px] sm:w-[340px] md:w-[360px] lg:w-[380px] h-[126px] min-[360px]:h-[145px] min-[400px]:h-[170px] sm:h-[214px] md:h-[227px] lg:h-[240px] relative overflow-hidden rounded-xl sm:rounded-2xl">
                            <Image
                              src={selectedCard.image}
                              alt={`${selectedCard.name} Credit Card`}
                              fill
                              className="object-contain filter drop-shadow-md rounded-xl sm:rounded-2xl"
                              style={{ transform: `scale(${zoomScale}) translate(${posX}px, ${posY}px)` }}
                              priority
                              unoptimized
                            />
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={selectNextCard}
                  aria-label="Next credit card"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#FAF9F6] border border-[#E5E5E7] flex items-center justify-center text-[#1D1D1F] shadow-sm transition-all active:scale-95 cursor-pointer shrink-0 z-20"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Centered Bank Selector Pills (Dark Black & Bold) */}
              <div className="w-full flex items-center justify-center gap-2 sm:gap-3 pt-2 overflow-x-auto no-scrollbar">
                {representativeCards.map((card, idx) => {
                  const isSelected = card.id === selectedCard.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleSelectPill(card.id, idx)}
                      aria-label={`Select ${card.shortName}`}
                      className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${isSelected
                        ? 'bg-[#1D1D1F] text-white shadow-xs scale-105'
                        : 'bg-white hover:bg-[#FAF9F6] text-[#1D1D1F] font-bold border border-[#D2D2D7]'
                        }`}
                    >
                      {card.shortName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Card Details */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCard.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] space-y-6 shadow-xs"
                >
                  {/* Bank & Network Header */}
                  <div className="flex items-center justify-between border-b border-[#E5E5E7]/60 pb-3">
                    <span className="text-xs font-mono text-[#0066CC] font-bold uppercase tracking-widest">
                      {selectedCard.bank}
                    </span>
                    <span className="text-xs font-mono text-[#1D1D1F] font-bold">
                      Network: {selectedCard.network}
                    </span>
                  </div>

                  {/* Card Title */}
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                      {selectedCard.name}
                    </h3>
                    <p className="text-xs font-mono text-[#0066CC] font-bold">
                      {selectedCard.tag}
                    </p>
                  </div>

                  {/* Annual Fee & Reward Benefit Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 p-4 rounded-2xl border border-[#E5E5E7]/80">
                      <span className="text-[11px] font-mono text-[#1D1D1F] block uppercase font-bold">
                        Annual Fee
                      </span>
                      <span className="text-[#1D1D1F] font-bold text-sm block mt-0.5">
                        {selectedCard.annualFee}
                      </span>
                    </div>

                    <div className="bg-white/80 p-4 rounded-2xl border border-[#E5E5E7]/80">
                      <span className="text-[11px] font-mono text-[#1D1D1F] block uppercase font-bold">
                        Reward Benefit
                      </span>
                      <span className="text-[#0066CC] font-bold text-sm block mt-0.5">
                        {selectedCard.rewardRate}
                      </span>
                    </div>
                  </div>

                  {/* Key Card Privileges */}
                  <div className="space-y-3 pt-1">
                    <span className="text-[11px] font-mono uppercase font-bold text-[#1D1D1F] tracking-wider block border-b border-[#E5E5E7]/60 pb-2">
                      Key Privileges & Highlights
                    </span>

                    <div className="space-y-2.5">
                      {selectedCard.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1D1D1F]">
                          <Check className="w-4 h-4 text-[#137333] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="text-[#1D1D1F] font-semibold leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Stats */}
                  <div className="pt-3 border-t border-[#E5E5E7]/60 flex flex-wrap items-center justify-between text-[11px] font-mono font-bold text-[#1D1D1F]">
                    <span>Lounge: <strong className="text-[#1D1D1F]">{selectedCard.lounge}</strong></span>
                    <span>Forex: <strong className="text-[#1D1D1F]">{selectedCard.forexMarkup}</strong></span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
