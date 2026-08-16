'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { Badge } from '@/components/ui/Badge';
import { RewardCalculationCard } from '@/components/financial/RewardCalculationCard';
import {
  Zap,
  Building2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function RewardEnginePage() {
  const [selectedMerchant, setSelectedMerchant] = useState<'croma' | 'amazon' | 'swiggy' | 'makemytrip'>('croma');
  const [spendAmount, setSpendAmount] = useState<number>(120000);
  const [channel, setChannel] = useState<'GYFTR' | 'ONLINE' | 'OFFLINE_POS'>('GYFTR');

  // Calculation Logic
  const getCalculatedValue = (cardId: string) => {
    if (cardId === 'infinia') {
      const discount = selectedMerchant === 'croma' ? Math.min(spendAmount * 0.1, 1500) : selectedMerchant === 'makemytrip' ? 2500 : 0;
      const base = Math.round(spendAmount * 0.033);
      const accel = channel === 'GYFTR' ? base * 4 : channel === 'ONLINE' && selectedMerchant === 'makemytrip' ? base * 4 : 0;
      const total = discount + base + accel;
      return { cardName: 'HDFC Infinia Metal', discount, base, accel, total, pct: ((total / spendAmount) * 100).toFixed(1) };
    } else if (cardId === 'magnus') {
      const discount = selectedMerchant === 'makemytrip' ? 2000 : 0;
      const base = Math.round(spendAmount * 0.012);
      const accel = channel === 'ONLINE' ? base * 4 : 0;
      const total = discount + base + accel;
      return { cardName: 'Axis Magnus', discount, base, accel, total, pct: ((total / spendAmount) * 100).toFixed(1) };
    } else {
      const discount = 0;
      const base = Math.round(spendAmount * 0.05);
      const accel = 0;
      const total = base;
      return { cardName: 'SBI Cashback Card', discount, base, accel, total, pct: '5.0' };
    }
  };

  const infiniaVal = getCalculatedValue('infinia');
  const magnusVal = getCalculatedValue('magnus');
  const sbiVal = getCalculatedValue('sbi');

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F]">
      <Navbar />

      {/* Sub-Navigation */}
      <ContextSubNav
        currentChapterId="rewards"
        pageTitle="Detailed Spend Calculator"
        badgeLabel="Deterministic Engine Active"
        badgeType="green"
      />

      {/* 01 — HERO (White ➔ Cream) */}
      <section className="pt-28 sm:pt-32 pb-12 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F5F3EF]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="gold" size="md">
              <Zap className="w-3.5 h-3.5 mr-1" />
              Reward Calculation Intelligence
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Reward rates don&apos;t tell the{' '}
              <span className="font-serif italic font-normal text-[#0066CC]">
                whole story.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1D1D1F] leading-relaxed font-sans font-medium">
              Understand base reward rates, Gyftr voucher accelerators, instant bank sale discounts, monthly caps, and category exclusions for the purchase you&apos;re actually making.
            </p>
          </div>

          {/* Right Corner Action Cluster */}
          <div className="shrink-0 flex flex-wrap items-center lg:items-end gap-2.5">
            <Link href="/product" className="shrink-0">
              <button className="bg-white text-[#1D1D1F] border border-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer group whitespace-nowrap active:scale-95">
                <ArrowLeft className="w-3.5 h-3.5 text-[#1D1D1F] group-hover:text-white transition-colors duration-300 group-hover:-translate-x-1" />
                <span>Back to Product Page</span>
              </button>
            </Link>

            <Link href="/offers" className="shrink-0">
              <button className="bg-[#1D1D1F] text-white border border-[#1D1D1F] hover:bg-[#000000] transition-all duration-300 rounded-full px-4 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer group whitespace-nowrap active:scale-98">
                <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Search Merchant Offers</span>
                <ArrowRight className="w-3.5 h-3.5 text-white ml-0.5 group-hover:translate-x-0.5 transition-all" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — REWARD CALCULATOR DEMO (Cream ➔ White) */}
      <section className="py-16 bg-gradient-to-b from-[#F5F3EF] via-[#F5F3EF] to-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls Panel */}
            <div className="lg:col-span-5 bg-white border border-[#E5E5E7] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0066CC]" />
                Transaction Parameters
              </h3>

              {/* Merchant Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider block">Target Merchant</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'croma', label: 'Croma Electronics', activeStyle: 'bg-[#F0FDFA] border-[#0D9488] text-[#0D9488]', dotStyle: 'bg-[#0D9488]' },
                    { id: 'amazon', label: 'Amazon India', activeStyle: 'bg-[#FFFBEB] border-[#D97706] text-[#D97706]', dotStyle: 'bg-[#F59E0B]' },
                    { id: 'swiggy', label: 'Swiggy Food', activeStyle: 'bg-[#FFF7ED] border-[#EA580C] text-[#EA580C]', dotStyle: 'bg-[#EA580C]' },
                    { id: 'makemytrip', label: 'MakeMyTrip Flights', activeStyle: 'bg-[#FEF2F2] border-[#DC2626] text-[#DC2626]', dotStyle: 'bg-[#DC2626]' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMerchant(m.id as 'croma' | 'amazon' | 'swiggy' | 'makemytrip')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border inline-flex items-center justify-center gap-1.5 ${
                        selectedMerchant === m.id
                          ? `${m.activeStyle} shadow-xs scale-[1.01]`
                          : 'bg-[#FFFFFF] border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7]'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${m.dotStyle} shrink-0`} />
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spend Input & Slider */}
              <div className="space-y-3 font-mono">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#1D1D1F]">Spend Amount (₹)</span>
                  <span className="text-[#0066CC] font-bold text-base tabular-nums">₹{spendAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={300000}
                  step={10000}
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(Number(e.target.value))}
                  className="w-full accent-[#0066CC] cursor-pointer"
                />
              </div>

              {/* Channel Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider block">Payment Channel</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'GYFTR', label: '5X Gyftr Voucher' },
                    { id: 'ONLINE', label: 'Direct Online' },
                    { id: 'OFFLINE_POS', label: 'Store Swipe' },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setChannel(ch.id as 'GYFTR' | 'ONLINE' | 'OFFLINE_POS')}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all border ${
                        channel === ch.id
                          ? 'bg-[#F0F6FF] border-[#0066CC] text-[#0066CC]'
                          : 'bg-[#FFFFFF] border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7]'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Calculation Results Stack */}
            <div className="lg:col-span-7 space-y-6">
              <RewardCalculationCard
                merchantName={selectedMerchant.toUpperCase()}
                merchantId={selectedMerchant}
                spendAmount={spendAmount}
                baseReward={infiniaVal.base}
                acceleratedReward={infiniaVal.accel}
                bankDiscount={infiniaVal.discount}
                conflictNotice={
                  channel === 'GYFTR'
                    ? 'Gyftr 5x multiplier stacks cleanly with HDFC Infinia SmartBuy monthly cap of ₹15,000.'
                    : 'Direct online channel used — standard base reward points applied.'
                }
                sourceDoc="HDFC Bank SmartBuy Terms & Conditions August 2026, Section 3.1"
              />

              {/* Multi-Card Valuation Comparison */}
              <div className="bg-white border border-[#E5E5E7] rounded-3xl p-6 space-y-4 shadow-xs">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1D1D1F]">
                  Evaluated Across Your Card Portfolio
                </h4>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center p-3 bg-[#F0F6FF] rounded-2xl border border-[#D2E3FC]">
                    <span className="font-bold text-[#0066CC] font-sans flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0066CC]" />
                      {infiniaVal.cardName} (Recommended)
                    </span>
                    <span className="font-bold text-[#0066CC] text-sm tabular-nums">
                      ₹{infiniaVal.total.toLocaleString('en-IN')} ({infiniaVal.pct}%)
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#F9F9FB] rounded-2xl border border-[#E5E5E7]">
                    <span className="font-bold text-[#1D1D1F] font-sans">{magnusVal.cardName}</span>
                    <span className="font-bold text-[#1D1D1F] tabular-nums">
                      ₹{magnusVal.total.toLocaleString('en-IN')} ({magnusVal.pct}%)
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#F9F9FB] rounded-2xl border border-[#E5E5E7]">
                    <span className="font-bold text-[#1D1D1F] font-sans">{sbiVal.cardName}</span>
                    <span className="font-bold text-[#1D1D1F] tabular-nums">
                      ₹{sbiVal.total.toLocaleString('en-IN')} ({sbiVal.pct}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </main>
  );
}
