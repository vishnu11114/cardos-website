'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { CardDetailModal } from '@/components/ui/CardDetailModal';
import { CardComparisonTray } from '@/components/CardComparisonTray';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ALL_CARD_CATALOG, CardSpec } from '@/lib/cardsCatalogData';
import { useComparisonStore } from '@/stores/useComparisonStore';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Scale,
  X,
  ArrowUpRight,
} from 'lucide-react';

const CATEGORIES = ['ALL', 'Premium', 'Travel', 'Cashback', 'Entry-Level', 'Business'];
const ISSUERS = ['ALL', 'Axis Bank', 'HDFC Bank', 'SBI Card', 'ICICI Bank', 'American Express', 'Federal Bank', 'IndusInd Bank', 'Kotak Mahindra Bank', 'IDFC FIRST Bank'];

export default function CardsExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedIssuer, setSelectedIssuer] = useState<string>('ALL');
  const [selectedCardModal, setSelectedCardModal] = useState<CardSpec | null>(null);

  const { addCard: addCardToCompare, selectedCards } = useComparisonStore();

  const isCardInCompare = (id: string) => selectedCards.some((c) => c.id === id);

  const handleToggleCompare = (card: CardSpec) => {
    addCardToCompare({
      id: card.id,
      name: card.name,
      issuer: card.bank,
      annualFee: parseInt(card.annualFee.replace(/[^0-9]/g, '')) || 0,
      rewardRate: card.rewardRate,
      image: card.image,
    });
  };

  const filteredCards = useMemo(() => {
    return ALL_CARD_CATALOG.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.rewardRate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'ALL' || card.category === selectedCategory;
      const matchesIssuer = selectedIssuer === 'ALL' || card.bank.toLowerCase().includes(selectedIssuer.toLowerCase());

      return matchesSearch && matchesCategory && matchesIssuer;
    });
  }, [searchQuery, selectedCategory, selectedIssuer]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'ALL' || selectedIssuer !== 'ALL';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedIssuer('ALL');
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#FAF9F6] to-[#F5F3EF] text-[#1D1D1F] relative">
      <Navbar />

      {/* Chapter 03 Context SubNav with Return-to-Origin Link */}
      <ContextSubNav
        currentChapterId="cards"
        pageTitle="Card Intelligence Library"
        badgeLabel="9 Verified Indian Cards Cataloged"
        badgeType="blue"
      />

      <div className="max-w-7xl mx-auto px-6 pt-28 sm:pt-32 pb-12 space-y-12">
        {/* Page Title & Right Corner Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="md">
                Full Cards Explorer
              </Badge>
              <span className="text-xs font-mono text-[#1D1D1F] font-extrabold">9 Verified Credit Cards</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Explore the complete <br />
              <span className="font-serif italic font-normal text-[#0066CC]">
                Credit Card Intelligence Library.
              </span>
            </h1>

            <p className="text-base text-[#1D1D1F] leading-relaxed font-sans font-semibold">
              Search and filter verified card specifications across Indian issuers, annual fee tariffs, reward multipliers, airport lounge access policies, and primary evidence citations.
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

            <Link href="/compare" className="shrink-0">
              <button className="bg-white text-[#1D1D1F] border border-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer group whitespace-nowrap active:scale-95">
                <Scale className="w-3.5 h-3.5 text-[#1D1D1F] group-hover:text-white transition-colors duration-300" />
                <span>Compare Cards Side-by-Side</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1D1D1F] group-hover:text-white ml-0.5 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </Link>
          </div>
        </div>

        {/* Compact Explorer Search & Filter Toolbar */}
        <div className="bg-[#FAF9F6]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cards, issuers, or benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-[#E5E5E7] text-xs font-mono text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Count & Clear Controls */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#86868B] self-end md:self-auto">
              <span>
                Showing <strong className="text-[#1D1D1F]">{filteredCards.length}</strong> of{' '}
                {ALL_CARD_CATALOG.length} cards
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[#C5221F] font-bold hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#86868B] tracking-wider block">
              Filter by Spend Category
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${selectedCategory === cat
                    ? 'bg-[#0066CC] text-white shadow-xs'
                    : 'bg-white text-[#6E6E73] hover:text-[#1D1D1F] border border-[#E5E5E7]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Issuer Filter Chips */}
          <div className="space-y-2 pt-2 border-t border-[#E5E5E7]">
            <span className="text-[11px] font-mono font-bold uppercase text-[#86868B] tracking-wider block">
              Filter by Card Issuer
            </span>
            <div className="flex flex-wrap gap-2">
              {ISSUERS.map((issuer) => (
                <button
                  key={issuer}
                  onClick={() => setSelectedIssuer(issuer)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${selectedIssuer === issuer
                    ? 'bg-[#1D1D1F] text-white shadow-xs'
                    : 'bg-white text-[#6E6E73] hover:text-[#1D1D1F] border border-[#E5E5E7]'
                    }`}
                >
                  {issuer}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Collection Grid */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCards.map((card) => {
              const compared = isCardInCompare(card.id);

              return (
                <Card
                  key={card.id}
                  variant="base"
                  className="flex flex-col justify-between p-6 bg-white border-[#E5E5E7] hover:border-[#0066CC] transition-all shadow-xs hover:shadow-md group"
                >
                  <div className="space-y-5">
                    {/* Bank Name & Category Tag */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#0066CC] font-bold uppercase">
                        {card.bank}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-[#EFF6FF] text-[#0066CC] px-2.5 py-0.5 rounded-full border border-[#D2E3FC]">
                        {card.category}
                      </span>
                    </div>

                    {/* Physical Card Studio Photograph */}
                    {(() => {
                      const zoomScale = (card.imageDisplaySettings?.zoom ?? 1) * (card.imageDisplaySettings?.scale ?? 1);
                      const posX = card.imageDisplaySettings?.positionX ?? 0;
                      const posY = card.imageDisplaySettings?.positionY ?? 0;

                      return (
                        <div className="relative aspect-[1.586] w-full rounded-2xl overflow-hidden group-hover:scale-102 transition-transform duration-300">
                          <Image
                            src={card.image}
                            alt={`${card.name} Visual`}
                            fill
                            className="object-contain"
                            style={{
                              transform: `scale(${zoomScale}) translate(${posX}px, ${posY}px)`,
                            }}
                            unoptimized
                          />
                        </div>
                      );
                    })()}

                    {/* Card Title */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight truncate">
                        {card.name}
                      </h3>
                      <p className="text-xs font-mono text-[#86868B]">{card.tag}</p>
                    </div>

                    {/* Quick Specifications */}
                    <div className="space-y-2 border-t border-[#E5E5E7] pt-4 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-[#86868B]">Annual Fee:</span>
                        <span className="text-[#1D1D1F] font-bold">{card.annualFee}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#86868B]">Reward Tariff:</span>
                        <span className="text-[#B06000] font-bold">{card.rewardRate}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#86868B]">Forex Markup:</span>
                        <span className="text-[#0066CC] font-bold">{card.forexMarkup}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-6 flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setSelectedCardModal(card)}
                      rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                    >
                      Know More
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      className={`w-full text-xs ${compared ? 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]' : ''}`}
                      onClick={() => handleToggleCompare(card)}
                    >
                      {compared ? '✓ Compare' : '+ Compare'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Useful Empty State */
          <div className="bg-[#F5F5F7] rounded-3xl p-12 text-center border border-[#E5E5E7] space-y-4 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-[#1D1D1F]">No cards match your filter criteria</h3>
            <p className="text-xs text-[#6E6E73] font-mono">
              Try adjusting your search keywords, selecting a different card issuer, or resetting all spend category filters.
            </p>
            <Button variant="secondary" size="md" onClick={clearFilters}>
              Reset All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Card Detail Modal */}
      <CardDetailModal
        card={selectedCardModal}
        isOpen={!!selectedCardModal}
        onClose={() => setSelectedCardModal(null)}
        onSelectForCompare={(id) => {
          const c = ALL_CARD_CATALOG.find((card) => card.id === id);
          if (c) handleToggleCompare(c);
        }}
        isCompared={selectedCardModal ? isCardInCompare(selectedCardModal.id) : false}
      />

      {/* Floating Card Comparison Queue Tray */}
      <CardComparisonTray />

      <FooterCTA />
    </main>
  );
}
