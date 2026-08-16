'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { Badge } from '@/components/ui/Badge';
import { CreditCardVisual } from '@/components/financial/CreditCardVisual';
import {
  Scale,
  X,
  ArrowRight,
  ArrowLeft,
  CreditCard,
} from 'lucide-react';
import { ALL_CARD_CATALOG } from '@/lib/cardsCatalogData';

const comparisonCatalog = ALL_CARD_CATALOG.map((card) => ({
  id: card.id,
  name: card.shortName || card.name,
  bank: card.bank,
  annualFee: card.annualFee,
  feeWaiver: card.feeWaiver,
  baseReward: card.rewardRate,
  travelMultiplier: card.tag,
  lounge: card.lounge,
  forex: card.forexMarkup,
  airmilesPartners: card.transferPartners.join(', '),
  image: card.image,
}));

export default function CardComparisonPage() {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>(['axis_atlas', 'hdfc_infinia', 'sbi_elite']);

  const selectedCards = comparisonCatalog.filter((c) => selectedCardIds.includes(c.id));

  const removeCard = (id: string) => {
    setSelectedCardIds(selectedCardIds.filter((cId) => cId !== id));
  };

  const addCard = (id: string) => {
    if (selectedCardIds.length < 4 && !selectedCardIds.includes(id)) {
      setSelectedCardIds([...selectedCardIds, id]);
    }
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F]">
      <Navbar />

      {/* Sub-Navigation */}
      <ContextSubNav
        currentChapterId="compare"
        pageTitle="Attribute Comparison Matrix"
        badgeLabel={`${selectedCards.length} of 4 Compared`}
        badgeType="blue"
      />

      {/* 01 — HERO */}
      <section className="pt-28 sm:pt-32 pb-12 bg-[#FFFFFF] border-b border-[#E5E5E7]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <Badge variant="indigo" size="md">
                <Scale className="w-3.5 h-3.5 mr-1" />
                Side-by-Side Card Comparison Engine
              </Badge>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
                Compare card features{' '}
                <span className="font-serif italic font-normal text-[#1D1D1F]">
                  attribute by attribute.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#1D1D1F] leading-relaxed font-medium">
                Evaluate annual fees, fee waiver milestones, base reward yields, 5x travel multipliers, airport lounge access caps, and foreign currency markup fees.
              </p>
            </div>

            {/* Right Corner Action Cluster */}
            <div className="shrink-0 flex flex-wrap items-center gap-3">
              <Link href="/product" className="shrink-0">
                <button className="bg-white text-[#1D1D1F] border border-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer group whitespace-nowrap active:scale-95">
                  <ArrowLeft className="w-3.5 h-3.5 text-[#1D1D1F] group-hover:text-white transition-colors duration-300 group-hover:-translate-x-1" />
                  <span>Back to Product Page</span>
                </button>
              </Link>

              <Link href="/cards" className="shrink-0">
                <button className="bg-white text-[#1D1D1F] border border-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer group whitespace-nowrap active:scale-95">
                  <CreditCard className="w-3.5 h-3.5 text-[#1D1D1F] group-hover:text-white transition-colors duration-300" />
                  <span>Back to Cards Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1D1D1F] group-hover:text-white ml-0.5 group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </Link>
            </div>
          </div>

          {/* Card Selection Selector Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#1D1D1F] font-bold">Add to Compare:</span>
            {comparisonCatalog.map((c) => {
              const isSelected = selectedCardIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  disabled={isSelected || selectedCardIds.length >= 4}
                  onClick={() => addCard(c.id)}
                  className={`px-3 py-1.5 rounded-xl border transition-all ${isSelected
                    ? 'bg-[#F5F5F7] border-[#E5E5E7] text-[#1D1D1F]/50 cursor-not-allowed font-medium'
                    : 'bg-white border-[#0066CC] text-[#0066CC] hover:bg-[#F0F6FF] font-bold'
                    }`}
                >
                  + {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02 — COMPARISON TABLE MATRIX */}
      <section className="py-16 bg-[#F5F5F7]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="w-full bg-white border border-[#E5E5E7] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs min-w-[800px]">
            {/* Cards Header Row */}
            <div className="flex items-start gap-6 border-b border-[#E5E5E7] pb-6 w-full">
              <div className="w-[180px] sm:w-[200px] shrink-0 text-xs font-mono text-[#1D1D1F] font-bold uppercase pt-4">
                COMPARISON ATTRIBUTE
              </div>

              {selectedCards.map((card) => (
                <div key={card.id} className="flex-1 min-w-[220px] space-y-3 relative">
                  <button
                    onClick={() => removeCard(card.id)}
                    className="absolute -top-2 left-[205px] text-[#1D1D1F] hover:text-[#C5221F] bg-[#F5F5F7] p-1 rounded-full border border-[#E5E5E7] z-10 cursor-pointer"
                    title="Remove card"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-[220px] max-w-[220px]">
                    <CreditCardVisual cardName={card.name} bankName={card.bank} imageSrc={card.image} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#0066CC] font-bold uppercase block">{card.bank}</span>
                    <h3 className="text-sm font-bold text-[#1D1D1F] leading-tight">{card.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Matrix Attributes Rows */}
            <div className="space-y-4 text-xs font-mono w-full">
              <div className="flex items-center gap-6 py-3 border-b border-[#E5E5E7] w-full">
                <span className="w-[180px] sm:w-[200px] shrink-0 text-[#1D1D1F] font-bold">ANNUAL FEE</span>
                {selectedCards.map((c) => (
                  <span key={c.id} className="flex-1 min-w-[220px] font-bold text-[#1D1D1F] tabular-nums">{c.annualFee}</span>
                ))}
              </div>

              <div className="flex items-center gap-6 py-3 border-b border-[#E5E5E7] w-full">
                <span className="w-[180px] sm:w-[200px] shrink-0 text-[#1D1D1F] font-bold">FEE WAIVER THRESHOLD</span>
                {selectedCards.map((c) => (
                  <span key={c.id} className="flex-1 min-w-[220px] font-bold text-[#B06000] tabular-nums">{c.feeWaiver}</span>
                ))}
              </div>

              <div className="flex items-center gap-6 py-3 border-b border-[#E5E5E7] w-full">
                <span className="w-[180px] sm:w-[200px] shrink-0 text-[#1D1D1F] font-bold">BASE REWARD YIELD</span>
                {selectedCards.map((c) => (
                  <span key={c.id} className="flex-1 min-w-[220px] font-bold text-[#137333] tabular-nums">{c.baseReward}</span>
                ))}
              </div>

              <div className="flex items-center gap-6 py-3 border-b border-[#E5E5E7] w-full">
                <span className="w-[180px] sm:w-[200px] shrink-0 text-[#1D1D1F] font-bold">TRAVEL MULTIPLIER</span>
                {selectedCards.map((c) => (
                  <span key={c.id} className="flex-1 min-w-[220px] font-bold text-[#0066CC]">{c.travelMultiplier}</span>
                ))}
              </div>

              <div className="flex items-center gap-6 py-3 border-b border-[#E5E5E7] w-full">
                <span className="w-[180px] sm:w-[200px] shrink-0 text-[#1D1D1F] font-bold">LOUNGE ACCESS</span>
                {selectedCards.map((c) => (
                  <span key={c.id} className="flex-1 min-w-[220px] font-bold text-[#1D1D1F]">{c.lounge}</span>
                ))}
              </div>

              <div className="flex items-center gap-6 py-3 border-b border-[#E5E5E7] w-full">
                <span className="w-[180px] sm:w-[200px] shrink-0 text-[#1D1D1F] font-bold">FOREX MARKUP</span>
                {selectedCards.map((c) => (
                  <span key={c.id} className="flex-1 min-w-[220px] font-bold text-[#1D1D1F] tabular-nums">{c.forex}</span>
                ))}
              </div>

              <div className="flex items-center gap-6 py-3 w-full">
                <span className="w-[180px] sm:w-[200px] shrink-0 text-[#1D1D1F] font-bold">AIRMILES PARTNERS</span>
                {selectedCards.map((c) => (
                  <span key={c.id} className="flex-1 min-w-[220px] font-bold text-[#1D1D1F]">{c.airmilesPartners}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </main>
  );
}
