'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function EarlyAccessPage() {
  const [email, setEmail] = useState('');
  const [cardCount, setCardCount] = useState('3-5');
  const [primaryPain, setPrimaryPain] = useState('multiplier');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F]">
      <Navbar />

      {/* Sub-Navigation */}
      <ContextSubNav
        currentChapterId="early-access"
        pageTitle="Priority Waitlist Application"
        badgeLabel="Pre-Launch Access Queue"
        badgeType="blue"
      />

      {/* 01 — HERO */}
      <section className="pt-28 sm:pt-32 pb-12 bg-[#FFFFFF] border-b border-[#E5E5E7]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <Badge variant="indigo" size="md">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#0066CC]" />
            Join the Early Access Queue
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
            Help shape Credit Card OS{' '}
            <span className="font-serif italic font-normal text-[#1D1D1F]">
              from day one.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#1D1D1F] max-w-2xl leading-relaxed font-medium">
            Join early access to follow development, test upcoming product builds, and help us understand how people choose between credit cards.
          </p>
        </div>
      </section>

      {/* 02 — EARLY ACCESS FORM & STORY WORKSPACE */}
      <section className="py-16 bg-gradient-to-b from-[#FAF8F5] via-[#FAF9F6] to-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: EARLY ACCESS SIGNUP FORM (6 COLS) */}
            <div className="lg:col-span-6 bg-white border border-[#E5E5E7] p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
              <div className="border-b border-[#E5E5E7] pb-4">
                <span className="text-xs font-mono text-[#0066CC] font-bold uppercase block">EARLY ADOPTER ACCESS</span>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Join Priority Waitlist</h3>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] flex items-center justify-center text-[#137333] mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1D1D1F]">You&apos;re on the Early Access Queue!</h4>
                  <p className="text-xs text-[#1D1D1F] leading-relaxed max-w-md mx-auto font-sans font-medium">
                    Thank you for joining. We will reach out to <strong className="text-[#1D1D1F]">{email}</strong> as soon as initial personal wallet onboarding opens.
                  </p>
                  <Button variant="secondary" size="md" onClick={() => setSubmitted(false)}>
                    Submit Another Entry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                  <div>
                    <label className="text-[#1D1D1F] font-bold block mb-1.5 uppercase text-[10px]">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full p-3.5 bg-white border border-[#E5E5E7] rounded-xl text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#0066CC]"
                    />
                  </div>

                  <div>
                    <label className="text-[#1D1D1F] font-bold block mb-1.5 uppercase text-[10px]">HOW MANY CREDIT CARDS DO YOU OWN?</label>
                    <select
                      value={cardCount}
                      onChange={(e) => setCardCount(e.target.value)}
                      className="w-full p-3.5 bg-white border border-[#E5E5E7] rounded-xl text-xs font-semibold text-[#1D1D1F] focus:outline-none focus:border-[#0066CC]"
                    >
                      <option value="1-2">1 to 2 Credit Cards</option>
                      <option value="3-5">3 to 5 Credit Cards</option>
                      <option value="6+">6+ Credit Cards (Power User)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[#1D1D1F] font-bold block mb-1.5 uppercase text-[10px]">WHAT IS HARDEST ABOUT MANAGING YOUR CARDS?</label>
                    <select
                      value={primaryPain}
                      onChange={(e) => setPrimaryPain(e.target.value)}
                      className="w-full p-3.5 bg-white border border-[#E5E5E7] rounded-xl text-xs font-semibold text-[#1D1D1F] focus:outline-none focus:border-[#0066CC]"
                    >
                      <option value="multiplier">Remembering 5x voucher multipliers (Gyftr / SmartBuy)</option>
                      <option value="milestone">Tracking fee waiver thresholds & quarterly milestone targets</option>
                      <option value="offers">Finding instant bank discounts during online sales</option>
                      <option value="lounge">Tracking airport lounge access caps & guest rules</option>
                      <option value="forex">Comparing foreign transaction forex markup fees</option>
                    </select>
                  </div>

                  <div className="p-3 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl text-[11px] text-[#6E6E73] font-sans flex items-start gap-2">
                    <Lock className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
                    <span>Privacy Guarantee: We never collect card numbers, CVVs, PINs, or bank login credentials.</span>
                  </div>

                  <Button variant="primary" size="md" className="w-full" type="submit" rightIcon={<Send className="w-4 h-4" />}>
                    Join Priority Early Access
                  </Button>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: FOUNDER & STARTUP STORY (6 COLS) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Founder Insight Card */}
              <div className="bg-white border border-[#E5E5E7] p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
                <span className="text-xs font-mono text-[#0066CC] font-bold uppercase block">THE STARTUP INSIGHT</span>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Why We Are Building CardOS</h3>
                
                <div className="space-y-3 text-xs text-[#6E6E73] font-sans leading-relaxed">
                  <p>
                    India has crossed 100 million active credit cards. As banks launch category multipliers, Gyftr voucher portals, quarterly milestone bonuses, and merchant-specific discounts, deciding which card to swipe for a ₹50,000 purchase has become overwhelming.
                  </p>
                  <p>
                    Cardholders are forced to mentally compute complex formulas across 5 different bank apps, Reddit forums, and buried PDF schedules of charges.
                  </p>
                  <p>
                    <strong className="text-[#1D1D1F]">Credit Card OS solves decision complexity.</strong> We build structured card knowledge, deterministic reward engines, inspectable T&C evidence, and conversational AI explanations.
                  </p>
                </div>
              </div>

              {/* Core Startup Principles */}
              <div className="bg-white border border-[#E5E5E7] p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
                <span className="text-xs font-mono text-[#137333] font-bold uppercase block">BUILDING IN PUBLIC</span>
                <h4 className="text-lg font-bold text-[#1D1D1F]">Our Commitments to Early Users</h4>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-start gap-3 bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7]">
                    <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1D1D1F] block font-sans">Deterministic Calculation First</span>
                      Monetary return estimates come from rule engines, never fabricated by AI prompts.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7]">
                    <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1D1D1F] block font-sans">Inspectable T&C Evidence</span>
                      Every claim links back to verified bank schedules of charges and publication dates.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E5E7]">
                    <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1D1D1F] block font-sans">Responsible Spending Principles</span>
                      Cards should optimize planned spending. We explicitly discourage unnecessary borrowing.
                    </div>
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
