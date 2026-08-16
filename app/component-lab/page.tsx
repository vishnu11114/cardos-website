'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AmountInput } from '@/components/ui/AmountInput';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CreditCardVisual } from '@/components/financial/CreditCardVisual';
import { RewardCalculationCard } from '@/components/financial/RewardCalculationCard';
import { BankDetailModal } from '@/components/ui/BankDetailModal';
import { FeatureModal } from '@/components/ui/FeatureModal';
import {
  Sparkles,
  Sun,
  Moon,
  Shield,
  Layers,
  ArrowRight,
  Search,
} from 'lucide-react';

export default function ComponentLabPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [amount, setAmount] = useState<number>(45000);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <main
      className={`min-h-screen p-6 sm:p-12 transition-colors duration-300 font-sans ${
        theme === 'dark' ? 'bg-[#0D0D0E] text-[#F3F3F4]' : 'bg-[#FFFFFF] text-[#111111]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b pb-6 border-[#E7E7E7] dark:border-[#28282B]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                INTERNAL DESIGN SYSTEM LAB
              </span>
              <span className="text-xs font-mono text-[#999999]">CardOS v2.0 Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Component Laboratory & Design Tokens</h1>
          </div>

          {/* Theme & QA Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-mono font-bold ${
                theme === 'dark'
                  ? 'bg-[#171719] text-[#F3F3F4] border-[#28282B]'
                  : 'bg-[#FAFAFA] text-[#111111] border-[#E7E7E7]'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FBBF24]" /> : <Moon className="w-4 h-4 text-[#2563EB]" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: BUTTON MATRIX */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-mono uppercase tracking-wider">01 · Button Variants & Physics</h2>
            <p className="text-xs text-[#666666] dark:text-[#A1A1AA]">
              Restrained physical feedback, keyboard focus rings, loading & disabled states.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[#FAFAFA] dark:bg-[#171719] rounded-3xl border border-[#E7E7E7] dark:border-[#28282B]">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#999999] block font-bold">PRIMARY</span>
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Primary Button
              </Button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#999999] block font-bold">SECONDARY</span>
              <Button variant="secondary" size="md">
                Secondary Button
              </Button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#999999] block font-bold">GHOST</span>
              <Button variant="ghost" size="md">
                Ghost Button
              </Button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#999999] block font-bold">CTA / HIGH PRIORITY</span>
              <Button variant="gold" size="md" leftIcon={<Sparkles className="w-4 h-4" />}>
                Launch OS (₹)
              </Button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#999999] block font-bold">LOADING STATE</span>
              <Button variant="primary" size="md" isLoading>
                Processing
              </Button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#999999] block font-bold">DISABLED STATE</span>
              <Button variant="secondary" size="md" disabled>
                Disabled Action
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 2: FINANCIAL INPUT MATRIX */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-mono uppercase tracking-wider">02 · Financial & Form Input Primitives</h2>
            <p className="text-xs text-[#666666] dark:text-[#A1A1AA]">
              Specialized Indian currency (₹) input, search with AI prompts, and PIN/OTP inputs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#FAFAFA] dark:bg-[#171719] rounded-3xl border border-[#E7E7E7] dark:border-[#28282B]">
            {/* Amount Input */}
            <AmountInput value={amount} onChange={setAmount} label="Interactive Transaction Amount (₹)" />

            {/* AI Search Input */}
            <div className="space-y-1.5 font-mono text-xs">
              <label className="text-[#666666] font-bold uppercase tracking-wider block">AI Search Input</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#999999] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search merchants, stores, airlines..."
                  className="w-full bg-white dark:bg-[#0D0D0E] border border-[#E7E7E7] dark:border-[#28282B] rounded-2xl pl-11 pr-4 py-3 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FINANCIAL CARDS & REWARD CALCULATIONS */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-mono uppercase tracking-wider">03 · Financial Cards & Explainable Calculations</h2>
            <p className="text-xs text-[#666666] dark:text-[#A1A1AA]">
              Physical credit card renderer with tilt physics, explainable value breakdown, and status badges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-[#999999] block font-bold">PHYSICAL CREDIT CARD COMPONENT</span>
              <CreditCardVisual
                cardName="HDFC Infinia Metal Edition"
                bankName="HDFC BANK"
                lastFour="4821"
                imageSrc="/cards/hdfc-infinia.png"
                activeMultiplier="5x SmartBuy Active"
              />
              <div className="flex flex-wrap gap-2 pt-2">
                <StatusBadge status="LIVE" />
                <StatusBadge status="VERIFIED" />
                <StatusBadge status="RECOVERY ACTIVE" />
                <StatusBadge status="DEMO" />
                <StatusBadge status="ROADMAP" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-[#999999] block font-bold">EXPLAINABLE REWARD CALCULATION CARD</span>
              <RewardCalculationCard
                merchantName="Amazon India"
                spendAmount={amount}
                baseReward={Math.round(amount * 0.01)}
                acceleratedReward={Math.round(amount * 0.05)}
                bankDiscount={1500}
                conflictNotice="System recommendation: 10% Instant Bank Sale Discount yields higher net value than 5x Voucher for purchases > ₹15,000."
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: MODAL & DRAWER TRIGGERS */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-mono uppercase tracking-wider">04 · Modals & Scroll-Locked Overlay Shells</h2>
            <p className="text-xs text-[#666666] dark:text-[#A1A1AA]">
              Screen-centered popups with Lenis smooth-scroll lock and backdrop click handling.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 p-6 bg-[#FAFAFA] dark:bg-[#171719] rounded-3xl border border-[#E7E7E7] dark:border-[#28282B]">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsBankModalOpen(true)}
              leftIcon={<Layers className="w-4 h-4" />}
            >
              Test Bank Detail Modal
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsFeatureModalOpen(true)}
              leftIcon={<Shield className="w-4 h-4" />}
            >
              Test Feature Modal
            </Button>
          </div>
        </section>
      </div>

      {/* MODALS */}
      <BankDetailModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        bank={{
          bank: 'Axis Bank',
          flagshipCard: 'Magnus / Reserve',
          rewardRate: '5x EDGE Miles',
          fee: '₹12,500 + GST / year',
          lounge: 'Unlimited Domestic & International',
          image: '/cards/axis-atlas.png',
          tag: 'VIP Meet & Greet',
          portfolio: ['Axis Reserve', 'Axis Magnus', 'Axis Atlas', 'Airtel Axis'],
          transferPartners: ['Vistara', 'Qatar Airways', 'Marriott Bonvoy'],
          aiInsight: 'Includes 8 VIP Airport Meet & Greet services per year. Axis Atlas provides un-capped 5x EDGE Miles on direct flight/hotel bookings.',
        }}
      />

      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
        feature={{
          title: 'Smart Multi-Bank Wallet',
          subtitle: 'Unified Command Center',
          description: 'Single glass dashboard aggregating all your credit cards across HDFC, Axis, SBI, ICICI, Amex, and IDFC FIRST.',
          roi: '₹42,500 / year',
          steps: [
            'Ingests read-only credit card portfolio tokens',
            'Resolves active category accelerators and lounge caps',
            'Computes real-time net-worth in reward points',
          ],
          banks: ['HDFC', 'Axis', 'SBI', 'ICICI', 'Amex India'],
        }}
      />
    </main>
  );
}
