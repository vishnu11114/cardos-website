'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Zap,
  Tag,
  Scale,
  Compass,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function ProductOverviewPage() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F]">
      <Navbar />

      {/* 01 — HERO (White ➔ Cream) */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F5F3EF]">
        <div className="max-w-7xl mx-auto px-6 space-y-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="indigo" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Complete Product Intelligence
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
              One intelligence layer for every{' '}
              <span className="font-serif italic font-normal text-[#1D1D1F]">
                credit card decision.
              </span>
            </h1>

            <p className="text-lg text-[#1D1D1F] font-semibold max-w-2xl mx-auto leading-relaxed">
              Understand 12+ bank reward algorithms, 5X Gyftr multipliers, instant merchant discounts, lounge access caps, and fee-waiver milestones in one place.
            </p>
          </div>

          {/* 5-Button Edge-to-Edge Cylinder Navbar */}
          <div className="w-full max-w-7xl mx-auto pt-4">
            <div className="p-2 bg-[#F5F3EF] rounded-full border border-[#1D1D1F] flex flex-col sm:flex-row items-center justify-between gap-1 overflow-x-auto no-scrollbar">
              {/* Back to Home Button — Seamless BG, Fills BLUE on hover */}
              <Link href="/#choose" className="flex-1 w-full min-w-[160px]">
                <button className="w-full bg-transparent text-[#0066CC] hover:bg-[#0066CC] hover:text-white transition-all duration-300 rounded-full px-4 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer group active:scale-98 whitespace-nowrap">
                  <ArrowLeft className="w-4 h-4 text-[#0066CC] group-hover:text-white transition-colors group-hover:-translate-x-0.5" />
                  <span>Back to Home (CHOOSE)</span>
                </button>
              </Link>

              {/* Cards Explorer — Seamless BG, Fills BLACK on hover */}
              <Link href="/cards" className="flex-1 w-full min-w-[160px]">
                <button className="w-full bg-transparent text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer group active:scale-98 whitespace-nowrap">
                  <CreditCard className="w-4 h-4 text-[#1D1D1F] group-hover:text-white transition-colors" />
                  <span>Explore Cards Explorer</span>
                  <ArrowRight className="w-4 h-4 text-[#1D1D1F] group-hover:text-white ml-0.5 group-hover:translate-x-0.5 transition-all" />
                </button>
              </Link>

              {/* Reward Intelligence — Seamless BG, Fills BLACK on hover */}
              <Link href="/rewards" className="flex-1 w-full min-w-[160px]">
                <button className="w-full bg-transparent text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer group active:scale-98 whitespace-nowrap">
                  <Zap className="w-4 h-4 text-[#D97706] group-hover:text-[#FBBF24] transition-colors" />
                  <span>See Reward Intelligence</span>
                </button>
              </Link>

              {/* AI Copilot & Grounded Reasoning — Redirection to /copilot */}
              <Link href="/copilot" className="flex-1 w-full min-w-[180px]">
                <button className="w-full bg-transparent text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer group active:scale-98 whitespace-nowrap">
                  <Compass className="w-4 h-4 text-[#0066CC] group-hover:text-white transition-colors" />
                  <span>AI Copilot & Reasoning</span>
                </button>
              </Link>

              {/* T&C Provenance Directory — Redirection to /trust */}
              <Link href="/trust" className="flex-1 w-full min-w-[170px]">
                <button className="w-full bg-transparent text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all duration-300 rounded-full px-4 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer group active:scale-98 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-[#137333] group-hover:text-white transition-colors" />
                  <span>T&C Provenance Directory</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — INTERACTIVE PRODUCT INTELLIGENCE MAP (Cream ➔ White) */}
      <section className="py-24 bg-gradient-to-b from-[#F5F3EF] via-[#F5F3EF] to-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="gold" size="md">
              System Architecture
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight">
              How the System Works.{' '}
              <span className="font-serif italic font-normal text-[#1D1D1F]">
                Input to Evidence.
              </span>
            </h2>
            <p className="text-base text-[#6E6E73] leading-relaxed">
              Every purchase passes through an automated savings calculation pipeline, cross-referencing your credit cards, store discounts, voucher multipliers, and official bank terms.
            </p>
          </div>

          {/* Animated 4-Step Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="luxury-card p-6 space-y-3 bg-white border border-[#E5E5E7] shadow-xs relative group hover:border-[#0066CC]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F0F6FF] border border-[#D2E3FC] flex items-center justify-center text-[#0066CC] font-mono font-bold text-sm">
                  01
                </div>
                <span className="text-[10px] font-mono font-bold text-[#0066CC] bg-[#F0F6FF] px-2 py-0.5 rounded-full border border-[#D2E3FC]">
                  STEP 1
                </span>
              </div>
              <h3 className="font-bold text-[#1D1D1F] text-base tracking-tight">Purchase Input (Text/Photo)</h3>
              <p className="text-xs text-[#1D1D1F] font-medium leading-relaxed">
                Type what you&apos;re buying or snap a bill photo. CardOS auto-reads store, item &amp; price.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="luxury-card p-6 space-y-3 bg-white border border-[#E5E5E7] shadow-xs relative group hover:border-[#B06000]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#FEF7E0] border border-[#FEEFC3] flex items-center justify-center text-[#B06000] font-mono font-bold text-sm">
                  02
                </div>
                <span className="text-[10px] font-mono font-bold text-[#B06000] bg-[#FEF7E0] px-2 py-0.5 rounded-full border border-[#FEEFC3]">
                  STEP 2
                </span>
              </div>
              <h3 className="font-bold text-[#1D1D1F] text-base tracking-tight">Smart Savings Engine</h3>
              <p className="text-xs text-[#1D1D1F] font-medium leading-relaxed">
                Calculates 5X voucher bonuses, bank sale discounts &amp; hidden monthly limits.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="luxury-card p-6 space-y-3 bg-white border border-[#E5E5E7] shadow-xs relative group hover:border-[#137333]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] border border-[#CEEAD6] flex items-center justify-center text-[#137333] font-mono font-bold text-sm">
                  03
                </div>
                <span className="text-[10px] font-mono font-bold text-[#137333] bg-[#E6F4EA] px-2 py-0.5 rounded-full border border-[#CEEAD6]">
                  STEP 3
                </span>
              </div>
              <h3 className="font-bold text-[#1D1D1F] text-base tracking-tight">Best Card &amp; Wallet Check</h3>
              <p className="text-xs text-[#1D1D1F] font-medium leading-relaxed">
                Picks the #1 best card in your wallet &amp; alerts you if a market card saves more.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="luxury-card p-6 space-y-3 bg-white border border-[#E5E5E7] shadow-xs relative group hover:border-[#0066CC]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center justify-center text-[#1D1D1F] font-mono font-bold text-sm">
                  04
                </div>
                <span className="text-[10px] font-mono font-bold text-[#1D1D1F] bg-[#F5F5F7] px-2 py-0.5 rounded-full border border-[#E5E5E7]">
                  STEP 4
                </span>
              </div>
              <h3 className="font-bold text-[#1D1D1F] text-base tracking-tight">Verified Bank Proof</h3>
              <p className="text-xs text-[#1D1D1F] font-medium leading-relaxed">
                Links every rupee calculation directly to official bank T&amp;C documents.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 03 — CORE MODULES GRID (White ➔ Cream) */}
      <section className="py-24 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F5F3EF]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="indigo" size="md">
              System Modules
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight">
              Explore Product Modules
            </h2>
            <p className="text-base text-[#6E6E73]">
              Discover how CardOS simplifies credit cards, calculates instant savings, and finds top merchant deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Cards Explorer */}
            <div className="luxury-card p-8 space-y-6 bg-white border-[#E5E5E7] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F6FF] border border-[#D2E3FC] flex items-center justify-center text-[#0066CC]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Cards Intelligence Library</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">
                  Explore fees, lounge access, and welcome rewards for top Indian credit cards.
                </p>
              </div>
              <Link href="/cards" className="pt-4">
                <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Cards Database
                </Button>
              </Link>
            </div>

            {/* Card 2: Reward Engine */}
            <div className="luxury-card p-8 space-y-6 bg-white border-[#E5E5E7] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF7E0] border border-[#FEEFC3] flex items-center justify-center text-[#B06000]">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Smart Savings Calculator</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">
                  Calculate exact rupee savings, voucher bonuses, and bank sale discounts.
                </p>
              </div>
              <Link href="/rewards" className="pt-4">
                <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Launch Reward Calculator
                </Button>
              </Link>
            </div>

            {/* Card 3: Merchant Offers */}
            <div className="luxury-card p-8 space-y-6 bg-white border-[#E5E5E7] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] flex items-center justify-center text-[#137333]">
                  <Tag className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Store &amp; Deal Finder</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">
                  Find 10% checkout discounts and 5X voucher deals on Amazon, Croma &amp; more.
                </p>
              </div>
              <Link href="/offers" className="pt-4">
                <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Search Merchant Offers
                </Button>
              </Link>
            </div>

            {/* Card 4: Card Comparison */}
            <div className="luxury-card p-8 space-y-6 bg-white border-[#E5E5E7] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center justify-center text-[#1D1D1F]">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Side-by-Side Card Match</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">
                  Compare 2 to 4 credit cards side-by-side to pick your best card.
                </p>
              </div>
              <Link href="/compare" className="pt-4">
                <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Compare Cards Side-by-Side
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Credit Notice (Cream ➔ White) */}
      <section className="py-12 bg-gradient-to-b from-[#F5F3EF] to-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-6 flex items-start gap-4 text-xs font-mono text-[#1D1D1F]">
          <AlertCircle className="w-5 h-5 text-[#B06000] shrink-0 mt-0.5" />
          <div className="space-y-1 font-sans">
            <h4 className="font-bold text-sm text-[#B06000] font-mono uppercase">Responsible Credit Policy</h4>
            <p className="text-[#6E6E73] leading-relaxed text-xs">
              CardOS optimizes existing, intended spending. We explicitly discourage unnecessary borrowing or spending solely to achieve reward milestones or annual fee waivers. Credit cards should always be paid in full before due dates.
            </p>
          </div>
        </div>
      </section>

      <FooterCTA />
    </main>
  );
}
