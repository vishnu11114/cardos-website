'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  trustPrinciples,
  demoSources,
  demoRuleHistory,
  demoConflicts,
  VerificationStatus,
} from '@/lib/trustDemoData';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Info,
} from 'lucide-react';

export default function TrustCenterPage() {
  const [activeTab, setActiveTab] = useState<'principles' | 'sources' | 'history' | 'conflicts' | 'methodology' | 'responsible'>('principles');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return <span className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">✔ VERIFIED</span>;
      case 'SOURCE AVAILABLE':
        return <span className="bg-[#F0F6FF] text-[#0066CC] border border-[#D2E3FC] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">ℹ SOURCE AVAILABLE</span>;
      case 'ILLUSTRATIVE':
        return <span className="bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5E7] text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full uppercase">ILLUSTRATIVE DEMO</span>;
      case 'CONFLICTING':
        return <span className="bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">⚠️ CONFLICTING</span>;
      default:
        return <span className="bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5E7] text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full uppercase">{status}</span>;
    }
  };

  const filteredSources = demoSources.filter((s) => {
    if (selectedStatusFilter === 'ALL') return true;
    return s.status === selectedStatusFilter;
  });

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F]">
      <Navbar />

      {/* Sub-Navigation */}
      <ContextSubNav
        currentChapterId="trust"
        pageTitle="T&C Provenance Directory"
        badgeLabel="Verified Primary Sources"
        badgeType="green"
      />

      {/* 01 — HERO (White Background) */}
      <section className="pt-28 sm:pt-32 pb-12 bg-[#FFFFFF] border-b border-[#E5E5E7]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <Badge variant="indigo" size="md">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#0066CC]" />
            Trust, Evidence & Data Provenance
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
            Every card choice,{' '}
            <span className="font-serif italic font-normal text-[#0066CC]">
              backed by bank proof.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#1D1D1F] font-semibold max-w-2xl leading-relaxed">
            CardOS links every reward return to official bank T&Cs, MCC codes, and audited formulas — 100% deterministic, zero AI guessing.
          </p>

          {/* Quick CTA Actions */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setReportModalOpen(true)}
              className="bg-white text-[#1D1D1F] border border-[#E5E5E7] hover:bg-[#0066CC] hover:text-white hover:border-[#0066CC] transition-all duration-200 rounded-full px-5 py-2.5 text-xs font-bold shadow-2xs hover:shadow-md cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#0066CC] group-hover:text-white" />
              <span>Report Outdated Rule</span>
            </button>
          </div>
        </div>
      </section>

      {/* 02 — THE TRUST & EVIDENCE CHAIN INTERACTIVE STORY (White Background) */}
      <section className="py-16 bg-[#FFFFFF] border-b border-[#E5E5E7]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-[#0066CC]">TRACEABLE INTELLIGENCE ARCHITECTURE</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
              The 7-Step Evidence Chain
            </h2>
            <p className="text-xs sm:text-sm text-[#1D1D1F] font-semibold">
              Trace any financial recommendation backward to its underlying bank rule and official source document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 text-center text-xs font-mono">
            {[
              { step: '01', title: 'RECOMMENDATION', sub: 'Optimal Card' },
              { step: '02', title: 'CALCULATION', sub: 'Itemized Return' },
              { step: '03', title: 'RULE', sub: '5x Multiplier' },
              { step: '04', title: 'CONDITIONS', sub: 'Monthly Caps' },
              { step: '05', title: 'SOURCE', sub: 'Issuer T&C' },
              { step: '06', title: 'FRESHNESS', sub: 'Verified Date' },
              { step: '07', title: 'ASSUMPTIONS', sub: 'Category Match' },
            ].map((node, idx) => (
              <div key={idx} className="bg-white border border-[#E5E5E7] p-3.5 rounded-2xl space-y-1 shadow-2xs">
                <span className="text-[10px] text-[#0066CC] font-bold block">{node.step}</span>
                <h4 className="font-bold text-[#1D1D1F] text-[11px]">{node.title}</h4>
                <span className="text-[10px] text-[#1D1D1F] font-extrabold block">{node.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — MAIN TRUST CENTER TABS WORKSPACE */}
      <section className="py-16 bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 space-y-10">

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E5E5E7] overflow-x-auto no-scrollbar pb-3 text-xs font-mono font-bold">
            {[
              { id: 'principles', label: '01. Trust Principles' },
              { id: 'sources', label: '02. Source Directory' },
              { id: 'history', label: '03. Rule History' },
              { id: 'conflicts', label: '04. Conflict Resolution' },
              { id: 'methodology', label: '05. Methodology & AI' },
              { id: 'responsible', label: '06. Responsible Finance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'principles' | 'sources' | 'history' | 'conflicts' | 'methodology' | 'responsible')}
                className={`px-4 py-2.5 rounded-xl border transition-all shrink-0 font-bold ${activeTab === tab.id
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                    : 'bg-white text-[#1D1D1F] border-[#E5E5E7] hover:bg-[#F5F5F7] hover:border-[#1D1D1F]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: TRUST PRINCIPLES GRID */}
          {activeTab === 'principles' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-2">
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Our 7 Core Trust Principles</h3>
                <p className="text-xs text-[#1D1D1F] font-semibold">
                  These principles govern how Credit Card OS standardizes data, calculates rewards, presents AI explanations, and handles uncertainty.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trustPrinciples.map((p) => (
                  <div key={p.number} className="bg-white border border-[#E5E5E7] p-6 rounded-3xl space-y-3 shadow-xs hover:border-[#0066CC] transition-all">
                    <span className="w-8 h-8 rounded-xl bg-[#F0F6FF] border border-[#D2E3FC] flex items-center justify-center text-[#0066CC] font-mono font-bold text-xs">
                      {p.number}
                    </span>
                    <h4 className="text-lg font-bold text-[#1D1D1F]">{p.title}</h4>
                    <p className="text-xs text-[#1D1D1F] font-semibold leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SOURCE PROVENANCE DIRECTORY */}
          {activeTab === 'sources' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-[#1D1D1F]">Verified Source Provenance Directory</h3>
                  <p className="text-xs text-[#1D1D1F] font-semibold">
                    Inspect issuer Schedule of Charges, official T&C agreements, and offer schedules cataloged in CardOS.
                  </p>
                </div>

                {/* Filter Selector */}
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3.5 py-2 bg-white border border-[#E5E5E7] rounded-xl text-xs font-bold text-[#1D1D1F] focus:outline-none focus:border-[#0066CC]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="VERIFIED">Verified Only</option>
                  <option value="SOURCE AVAILABLE">Source Available</option>
                  <option value="ILLUSTRATIVE">Illustrative</option>
                </select>
              </div>

              <div className="space-y-4 font-mono text-xs">
                {filteredSources.map((src) => (
                  <div key={src.id} className="bg-white border border-[#E5E5E7] p-6 rounded-3xl space-y-4 shadow-2xs hover:border-[#0066CC] transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E7] pb-3">
                      <div>
                        <span className="text-[#0066CC] font-bold uppercase text-[10px] block">{src.publisher} · {src.type}</span>
                        <h4 className="text-base font-bold text-[#1D1D1F] font-sans">{src.name}</h4>
                      </div>
                      {getStatusBadge(src.status)}
                    </div>

                    <p className="text-[#1D1D1F] font-sans text-xs bg-white p-3.5 rounded-2xl border border-[#E5E5E7] leading-relaxed font-semibold">
                      &quot;{src.ruleExcerpt}&quot;
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#1D1D1F] font-bold pt-1">
                      <div className="flex items-center gap-4">
                        <span>Published: {src.publishedDate || 'N/A'}</span>
                        <span>Effective: {src.effectiveDate || 'N/A'}</span>
                        <span className="font-extrabold text-[#1D1D1F]">Last Checked: {src.lastCheckedDate}</span>
                      </div>
                      <span className="text-[#0066CC] font-bold flex items-center gap-1 cursor-pointer hover:underline">
                        {src.urlLabel} <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RULE HISTORY TIMELINE */}
          {activeTab === 'history' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Rule History & Change Log</h3>
                <p className="text-xs text-[#1D1D1F] font-semibold">
                  Credit card terms evolve. Trace historical changes in spend caps, exclusions, annual fee waivers, and reward multipliers.
                </p>
              </div>

              <div className="relative border-l-2 border-[#E5E5E7] pl-6 space-y-8 ml-3 font-mono text-xs">
                {demoRuleHistory.map((item) => (
                  <div key={item.id} className="relative space-y-3 bg-white p-5 rounded-2xl border border-[#E5E5E7] shadow-xs">
                    <div className="absolute -left-[31px] top-5 w-4 h-4 rounded-full bg-[#0066CC] border-4 border-white" />

                    <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-2">
                      <span className="font-extrabold text-[#1D1D1F]">{item.bank} · {item.cardName}</span>
                      <span className="text-[10px] font-bold text-[#0066CC] bg-[#F0F6FF] px-2.5 py-0.5 rounded-full border border-[#D2E3FC]">
                        Effective: {item.effectiveDate}
                      </span>
                    </div>

                    <div className="space-y-1 font-sans text-xs">
                      <span className="text-[#1D1D1F] font-mono text-[10px] font-extrabold uppercase block">CHANGE SUMMARY</span>
                      <p className="text-[#1D1D1F] font-bold">{item.changeSummary}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                      <div className="p-3 bg-white rounded-xl border border-[#E5E5E7] space-y-1">
                        <span className="text-[#C5221F] font-bold block">PREVIOUS RULE</span>
                        <p className="text-[#1D1D1F] font-sans font-medium">{item.previousValue}</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#CEEAD6] space-y-1">
                        <span className="text-[#137333] font-bold block">NEW CURRENT RULE</span>
                        <p className="text-[#1D1D1F] font-sans font-bold">{item.currentValue}</p>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#1D1D1F] font-bold pt-1">
                      Cites: {item.sourceDoc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CONFLICT RESOLUTION */}
          {activeTab === 'conflicts' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Conflicting Information Resolution</h3>
                <p className="text-xs text-[#1D1D1F] font-semibold">
                  When portal marketing banners conflict with master Schedule of Charges PDFs, CardOS surfaces the conflict and applies the conservative rule to prevent overestimating rewards.
                </p>
              </div>

              <div className="space-y-6">
                {demoConflicts.map((c) => (
                  <div key={c.id} className="bg-white border border-[#FEEFC3] p-6 rounded-3xl space-y-4 shadow-2xs">
                    <div className="flex items-center gap-2 border-b border-[#FEEFC3] pb-3">
                      <AlertTriangle className="w-5 h-5 text-[#B06000]" />
                      <h4 className="text-base font-bold text-[#1D1D1F]">{c.topic}</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
                        <span className="text-[#0066CC] font-bold block">SOURCE A: {c.sourceA.name}</span>
                        <p className="text-[#1D1D1F] font-sans font-semibold">{c.sourceA.value}</p>
                        <span className="text-[10px] text-[#1D1D1F] font-bold block pt-1">{c.sourceA.effectiveDate}</span>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
                        <span className="text-[#B06000] font-bold block">SOURCE B: {c.sourceB.name}</span>
                        <p className="text-[#1D1D1F] font-sans font-semibold">{c.sourceB.value}</p>
                        <span className="text-[10px] text-[#1D1D1F] font-bold block pt-1">{c.sourceB.effectiveDate}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#E6F4EA] border border-[#CEEAD6] rounded-2xl text-xs font-mono space-y-1">
                      <span className="text-[#137333] font-bold block uppercase text-[10px]">CARDOS RESOLUTION STRATEGY</span>
                      <p className="text-[#1D1D1F] font-sans font-semibold">{c.resolutionStrategy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: METHODOLOGY & AI TRANSPARENCY */}
          {activeTab === 'methodology' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Calculation Methodology & AI Transparency</h3>
                <p className="text-xs text-[#1D1D1F] font-semibold">
                  How Credit Card OS strictly separates structured calculation logic from conversational AI explanation.
                </p>
              </div>

              {/* Architecture Graphic Card */}
              <div className="bg-white border border-[#E5E5E7] p-8 rounded-3xl space-y-6 shadow-xs">
                <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">SYSTEM SYSTEM FLOW</span>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-mono text-xs">
                  <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
                    <span className="text-[#0066CC] font-bold text-[10px] block">01 INPUT</span>
                    <p className="font-bold text-[#1D1D1F]">Structured Data</p>
                    <span className="text-[10px] text-[#1D1D1F] font-bold">Card T&C, MCC, Amount</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
                    <span className="text-[#137333] font-bold text-[10px] block">02 COMPUTE</span>
                    <p className="font-bold text-[#1D1D1F]">Deterministic Engine</p>
                    <span className="text-[10px] text-[#1D1D1F] font-bold">Sub-100ms Rule Calc</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
                    <span className="text-[#B06000] font-bold text-[10px] block">03 EXPLAIN</span>
                    <p className="font-bold text-[#1D1D1F]">AI Copilot</p>
                    <span className="text-[10px] text-[#1D1D1F] font-bold">Natural Language Summary</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
                    <span className="text-[#1D1D1F] font-bold text-[10px] block">04 VERIFY</span>
                    <p className="font-bold text-[#1D1D1F]">Inspectable Citation</p>
                    <span className="text-[10px] text-[#1D1D1F] font-bold">Verified Bank T&C Citation</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E5E5E7] rounded-2xl text-xs text-[#1D1D1F] font-semibold leading-relaxed">
                  <span className="font-bold text-[#1D1D1F]">Key Guarantee:</span> Our AI model never computes or fabricates financial reward values. Every monetary return number displayed in CardOS is produced by our deterministic calculation pipeline based on cataloged bank parameters.
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RESPONSIBLE FINANCE */}
          {activeTab === 'responsible' && (
            <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
              <div className="space-y-1 text-center">
                <h3 className="text-2xl font-bold text-[#1D1D1F]">Responsible Credit & Spending Policy</h3>
                <p className="text-xs text-[#1D1D1F] font-semibold max-w-xl mx-auto">
                  Our founding principle: Optimize the card for the purchase. Never optimize the purchase for the card.
                </p>
              </div>

              <div className="bg-[#FBFBFD] border border-[#E5E5E7] p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xs">
                <div className="flex items-center justify-center gap-2.5">
                  <Info className="w-6 h-6 text-[#0066CC]" />
                  <h4 className="text-xl font-bold text-[#1D1D1F]">Core Financial Commitments</h4>
                </div>

                <ul className="space-y-4 text-xs font-sans text-[#1D1D1F] leading-relaxed">
                  <li className="flex items-start gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E5E7] shadow-2xs text-left">
                    <CheckCircle2 className="w-5 h-5 text-[#137333] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm font-bold text-[#1D1D1F]">Rewards Follow Spending, Not Vice Versa</strong>
                      Credit card reward points and cashback should only be earned on spending you already intend to make. We never encourage users to spend money merely to unlock a reward milestone or fee waiver.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E5E7] shadow-2xs text-left">
                    <CheckCircle2 className="w-5 h-5 text-[#137333] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm font-bold text-[#1D1D1F]">Interest Costs Erase Reward Gains</strong>
                      Carrying a balance and incurring 42% APR interest charges completely negates any 3% to 16% reward return. Credit cards should always be paid in full before due dates.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E5E7] shadow-2xs text-left">
                    <CheckCircle2 className="w-5 h-5 text-[#137333] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm font-bold text-[#1D1D1F]">No Gamification or Artificial Urgency</strong>
                      CardOS explicitly excludes spending streaks, countdown timers, artificial FOMO triggers, or progress bars designed to induce impulse spending.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* USER CORRECTION REPORT MODAL */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5E5E7] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E5E5E7] pb-4">
              <div>
                <span className="text-xs font-mono text-[#0066CC] font-bold uppercase block">DATA QUALITY FEEDBACK</span>
                <h3 className="text-xl font-bold text-[#1D1D1F]">Report Outdated or Missing Rule</h3>
              </div>
              <button
                onClick={() => { setReportModalOpen(false); setReportSubmitted(false); }}
                className="text-[#1D1D1F] hover:text-[#0066CC] text-sm font-mono font-bold p-2 bg-white border border-[#E5E5E7] rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            {reportSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#137333] mx-auto" />
                <h4 className="text-lg font-bold text-[#1D1D1F]">Thank You for Your Feedback!</h4>
                <p className="text-xs text-[#1D1D1F] font-semibold">
                  Your report has been logged in our demo feedback queue for rule verification.
                </p>
                <Button variant="secondary" size="md" onClick={() => { setReportModalOpen(false); setReportSubmitted(false); }}>
                  Close Window
                </Button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setReportSubmitted(true); }} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-[#1D1D1F] font-bold block mb-1.5">CARD OR OFFER NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HDFC Infinia SmartBuy Flight Multiplier"
                    className="w-full p-3 bg-white border border-[#E5E5E7] rounded-xl text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0066CC] font-bold"
                  />
                </div>

                <div>
                  <label className="text-[#1D1D1F] font-bold block mb-1.5">WHAT CHANGED OR APPEARS INCORRECT?</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the updated spend cap, exclusion, or fee schedule change..."
                    className="w-full p-3 bg-white border border-[#E5E5E7] rounded-xl text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0066CC] font-bold"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button variant="primary" size="md" className="w-full cursor-pointer" type="submit">
                    Submit Data Correction Report
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <FooterCTA />
    </main>
  );
}
