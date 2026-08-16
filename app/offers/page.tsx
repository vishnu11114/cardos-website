'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { MerchantDetailModal } from '@/components/ui/MerchantDetailModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { merchantProfiles, getAllMerchants, MerchantProfile, MerchantOffer } from '@/lib/merchantIntelligenceDemoData';
import {
  Search,
  Tag,
  Store,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  ArrowUpRight,
  X,
} from 'lucide-react';

const CATEGORIES = [
  'ALL',
  'E-Commerce / Shopping',
  'Travel & Flights',
  'Dining & Food',
  'Electronics',
  'Luxury & Hotels',
];

export default function MerchantOffersPage() {
  const [activeTab, setActiveTab] = useState<'merchants' | 'offers'>('merchants');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedMerchantModal, setSelectedMerchantModal] = useState<MerchantProfile | null>(null);

  const allMerchants = useMemo(() => getAllMerchants(), []);

  const allOffers = useMemo(() => {
    const list: { offer: MerchantOffer; merchantName: string; merchantId: string; category: string; image?: string }[] = [];
    allMerchants.forEach((m) => {
      m.offers.forEach((off) => {
        list.push({
          offer: off,
          merchantName: m.name,
          merchantId: m.id,
          category: m.category,
          image: m.image,
        });
      });
    });
    return list;
  }, [allMerchants]);

  const filteredMerchants = useMemo(() => {
    return allMerchants.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.descriptors.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allMerchants, searchQuery, selectedCategory]);

  const filteredOffers = useMemo(() => {
    return allOffers.filter((item) => {
      const matchesSearch =
        item.offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.offer.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.merchantName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allOffers, searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'ALL';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] relative">
      <Navbar />

      {/* ContextSubNav for Chapter 05 with Return-to-Origin Link */}
      <ContextSubNav
        currentChapterId="offers"
        pageTitle="Merchant & Offer Intelligence"
        badgeLabel="4,500+ Merchants Cataloged"
        badgeType="blue"
      />

      <div className="max-w-7xl mx-auto px-6 pt-28 sm:pt-32 pb-12 space-y-12">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="md">
                Full Merchant Workspace
              </Badge>
              <span className="text-xs font-mono text-[#1D1D1F] font-bold">Deterministic Multiplier Matrix</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Explore Merchant Multipliers <br />
              <span className="font-serif italic font-normal text-[#0066CC]">
                & Verified Bank Offers.
              </span>
            </h1>

            <p className="text-base text-[#1D1D1F] font-medium leading-relaxed font-sans">
              Connect merchants, checkout payment channels, card reward categories, 5x Gyftr voucher stacking, and active instant bank sale discounts in one workspace.
            </p>
          </div>

          {/* Right Corner Action Cluster */}
          <div className="shrink-0 flex flex-wrap items-center gap-2.5">
            <Link href="/product" className="shrink-0">
              <button className="bg-white text-[#1D1D1F] border border-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer group whitespace-nowrap active:scale-95">
                <ArrowLeft className="w-3.5 h-3.5 text-[#1D1D1F] group-hover:text-white transition-colors duration-300 group-hover:-translate-x-1" />
                <span>Back to Product Page</span>
              </button>
            </Link>

            <Link href="/cards" className="shrink-0">
              <button className="bg-[#0066CC] text-white border border-[#0066CC] hover:bg-[#0052A3] hover:border-[#0052A3] transition-all duration-300 rounded-full px-4 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer group whitespace-nowrap active:scale-95">
                <CreditCard className="w-3.5 h-3.5 text-white" />
                <span>Back to Cards Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5 text-white ml-0.5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>

        {/* Mode Switcher & Search Toolbar (Cream to White Gradient) */}
        <div className="bg-gradient-to-br from-[#FAF8F5] via-[#FAF9F6] to-[#FFFFFF] p-6 rounded-3xl border border-[#E5E5E7] space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Mode Switcher Tabs */}
            <div className="inline-flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#E5E5E7] shadow-2xs">
              <button
                onClick={() => setActiveTab('merchants')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'merchants'
                    ? 'bg-[#1D1D1F] text-white shadow-xs'
                    : 'text-[#1D1D1F] hover:bg-[#FAF8F5]'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Merchant Directory ({allMerchants.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('offers')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'offers'
                    ? 'bg-[#1D1D1F] text-white shadow-xs'
                    : 'text-[#1D1D1F] hover:bg-[#FAF8F5]'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Verified Bank Offers ({allOffers.length})</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#1D1D1F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={activeTab === 'merchants' ? 'Search merchants or MCCs...' : 'Search offers or banks...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white rounded-2xl border border-[#E5E5E7] text-xs font-mono text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0066CC] shadow-2xs"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1D1D1F]">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="space-y-2 pt-2 border-t border-[#E5E5E7]">
            <span className="text-[11px] font-mono font-bold uppercase text-[#1D1D1F] tracking-wider block">
              Filter by Spend Category
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0066CC] text-white shadow-xs'
                      : 'bg-white text-[#1D1D1F] hover:bg-[#FAF8F5] border border-[#E5E5E7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TAB 1: MERCHANT DIRECTORY MODE */}
        {activeTab === 'merchants' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#1D1D1F] font-bold">
              <span>Showing <strong className="text-[#0066CC]">{filteredMerchants.length}</strong> indexed merchants</span>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-[#C5221F] font-bold hover:underline">
                  Reset Filters
                </button>
              )}
            </div>

            {filteredMerchants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMerchants.map((m) => (
                  <Card
                    key={m.id}
                    variant="base"
                    onClick={() => setSelectedMerchantModal(m)}
                    className="flex flex-col justify-between p-6 bg-white border-[#E5E5E7] hover:border-[#0066CC] transition-all shadow-xs hover:shadow-md space-y-4 rounded-3xl cursor-pointer group active:scale-98"
                  >
                    <div className="space-y-4">
                      {/* Merchant 3D Artwork Header */}
                      <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-3">
                        <div className="flex items-center gap-3">
                          {m.image ? (
                            <div className="w-12 h-12 relative rounded-2xl overflow-hidden border border-[#E5E5E7] shadow-xs shrink-0 bg-white group-hover:border-[#0066CC] transition-colors">
                              <Image
                                src={m.image}
                                alt={m.name}
                                fill
                                className="object-contain p-1.5"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FF] border border-[#D2E3FC] flex items-center justify-center text-xl shrink-0">
                              {m.logoIcon}
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight group-hover:text-[#0066CC] transition-colors flex items-center gap-1">
                              <span>{m.name}</span>
                              <ArrowUpRight className="w-4 h-4 text-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <span className="text-[11px] font-mono text-[#1D1D1F] font-bold block">{m.category}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-[#E6F4EA] text-[#137333] px-2.5 py-1 rounded-full border border-[#CEEAD6] shrink-0">
                          MCC {m.mcc}
                        </span>
                      </div>

                      {/* Best Channel Highlight (Minimal & Scannable) */}
                      <div className="bg-gradient-to-br from-[#FAF8F5] via-[#FAF9F6] to-[#FFFFFF] p-4 rounded-2xl border border-[#E5E5E7] space-y-1.5 text-xs font-mono shadow-2xs group-hover:border-[#0066CC]/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-[#0066CC] font-bold uppercase text-[10px]">Optimal Channel</span>
                          <span className="text-[#137333] font-bold text-xs bg-[#E6F4EA] px-2 py-0.5 rounded border border-[#CEEAD6]">{m.channels[0].expectedValue}</span>
                        </div>
                        <span className="font-bold text-sm block text-[#1D1D1F]">{m.channels[0].label}</span>
                        <span className="text-[11px] text-[#1D1D1F] font-bold block truncate">Best Card: {m.channels[0].bestCard}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#FAF8F5] via-[#FAF9F6] to-[#FFFFFF] rounded-3xl p-12 text-center border border-[#E5E5E7] space-y-4 max-w-lg mx-auto shadow-sm">
                <h3 className="text-xl font-bold text-[#1D1D1F]">No merchants match your filters</h3>
                <Button variant="secondary" size="md" onClick={clearFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VERIFIED OFFER DISCOVERY MODE */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#1D1D1F] font-bold">
              <span>Showing <strong className="text-[#0066CC]">{filteredOffers.length}</strong> active bank offers</span>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-[#C5221F] font-bold hover:underline">
                  Reset Filters
                </button>
              )}
            </div>

            {filteredOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOffers.map((item, idx) => (
                  <Card
                    key={idx}
                    variant="base"
                    className="p-6 bg-white border-[#E5E5E7] hover:border-[#0066CC] transition-all shadow-xs space-y-4 rounded-3xl"
                  >
                    <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-3">
                      <div className="flex items-center gap-2">
                        {item.image ? (
                          <div className="w-7 h-7 relative rounded-lg overflow-hidden border border-[#E5E5E7] shrink-0 bg-white">
                            <Image src={item.image} alt={item.merchantName} fill className="object-cover" />
                          </div>
                        ) : (
                          <Tag className="w-4 h-4 text-[#0066CC]" />
                        )}
                        <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">{item.merchantName}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        item.offer.status === 'ENDING SOON'
                          ? 'bg-[#FCE8E6] text-[#C5221F] border border-[#FAD2CF]'
                          : 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]'
                      }`}>
                        {item.offer.status} · Expires {item.offer.expiry}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">{item.offer.title}</h3>
                      <span className="text-xs font-mono text-[#1D1D1F] font-bold block">Sponsoring Bank: {item.offer.bank}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-[#FAF8F5] p-3 rounded-2xl border border-[#E5E5E7] text-xs font-mono text-center">
                      <div>
                        <span className="text-[#1D1D1F] font-bold block text-[10px]">Min Spend</span>
                        <span className="font-bold text-[#1D1D1F]">{item.offer.minSpend}</span>
                      </div>
                      <div>
                        <span className="text-[#1D1D1F] font-bold block text-[10px]">Max Cap</span>
                        <span className="font-bold text-[#0066CC]">{item.offer.maxDiscount}</span>
                      </div>
                      <div>
                        <span className="text-[#1D1D1F] font-bold block text-[10px]">Stackable</span>
                        <span className="font-bold text-[#137333]">{item.offer.stackable ? 'Yes' : 'No'}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-[#1D1D1F]">
                      <span className="font-mono font-bold text-[#1D1D1F] block">Verified Conditions:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] font-medium">
                        {item.offer.conditions.map((cond, i) => (
                          <li key={i}>{cond}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-[#E5E5E7] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#1D1D1F] text-[10px] font-bold truncate max-w-[200px]">{item.offer.source}</span>
                      <button
                        onClick={() => {
                          const m = merchantProfiles[item.merchantId];
                          if (m) setSelectedMerchantModal(m);
                        }}
                        className="text-[#0066CC] font-bold hover:underline flex items-center gap-1"
                      >
                        <span>View Merchant Matrix</span>
                        <span>→</span>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#FAF8F5] via-[#FAF9F6] to-[#FFFFFF] rounded-3xl p-12 text-center border border-[#E5E5E7] space-y-4 max-w-lg mx-auto shadow-sm">
                <h3 className="text-xl font-bold text-[#1D1D1F]">No bank offers match your filters</h3>
                <Button variant="secondary" size="md" onClick={clearFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Merchant Detail Modal Integration */}
      <MerchantDetailModal
        merchant={selectedMerchantModal}
        isOpen={!!selectedMerchantModal}
        onClose={() => setSelectedMerchantModal(null)}
      />

      <FooterCTA />
    </main>
  );
}
