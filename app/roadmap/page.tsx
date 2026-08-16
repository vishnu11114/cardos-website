'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { Badge } from '@/components/ui/Badge';
import {
  mvpMetricsFramework,
  businessModelOptions,
} from '@/lib/roadmapDemoData';
import { RoadmapAnimation } from '@/components/sections/RoadmapAnimation';
import {
  CheckCircle2,
  XCircle,
  Compass,
  Info,
} from 'lucide-react';

export default function RoadmapPage() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F]">
      <Navbar />

      <ContextSubNav
        currentChapterId="roadmap"
        pageTitle="Product Maturity Horizon"
        badgeLabel="Phased Architecture Strategy"
        badgeType="blue"
      />

      {/* 01 — HERO (White ➔ Cream) */}
      <section className="pt-28 sm:pt-32 pb-12 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F5F3EF]">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <Badge variant="indigo" size="md">
            <Compass className="w-3.5 h-3.5 mr-1" />
            Product Roadmap & MVP Strategy
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
            From Decision Wedge to{' '}
            <span className="font-serif italic font-normal text-[#1D1D1F]">
              Payment Intelligence OS.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#6E6E73] max-w-2xl leading-relaxed">
            Explore our phased product roadmap, clear MVP boundaries, system architecture, metrics framework, and business vision.
          </p>

          {/* Prototype Maturity Disclaimer */}
          <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-[#E5E5E7] text-xs font-mono max-w-3xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#1D1D1F]">
              <Info className="w-4 h-4 text-[#0066CC]" />
              <span>Product Maturity Disclosure</span>
            </div>
            <p className="text-[#6E6E73] font-sans text-[11px] leading-relaxed">
              Credit Card OS is currently in pre-launch development. This website demonstrates our intended product experience using high-fidelity prototype data.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — THE PHASED ROADMAP TIMELINE (Cream ➔ White) */}
      <section className="py-16 bg-gradient-to-b from-[#F5F3EF] via-[#F5F3EF] to-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#0066CC]">PRODUCT EVOLUTION PATH</span>
              <h2 className="text-3xl font-bold text-[#1D1D1F]">Phased Product Roadmap</h2>
            </div>
          </div>

          {/* Interactive Animated SVG Roadmap (Responsive Fluid Width) */}
          <div className="w-full max-w-full overflow-hidden">
            <RoadmapAnimation controls={false} />
          </div>
        </div>
      </section>

      {/* 03 — MVP SCOPE BOUNDARY (IN VS OUT) */}
      <section className="py-16 bg-[#FFFFFF] border-b border-[#E5E5E7]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-[#0066CC]">DISCIPLINED SCOPE MANAGEMENT</span>
            <h2 className="text-3xl font-bold text-[#1D1D1F]">MVP Scope Boundary Definition</h2>
            <p className="text-xs text-[#6E6E73]">
              To validate core decision utility, our MVP focuses strictly on decision intelligence rather than building a heavy banking super-app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IN SCOPE */}
            <div className="bg-[#E6F4EA]/30 border border-[#CEEAD6] p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 border-b border-[#CEEAD6] pb-3 text-[#137333]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-lg font-bold font-sans text-[#1D1D1F]">IN MVP SCOPE (Core Wedge)</h3>
              </div>

              <ul className="space-y-2.5 text-xs text-[#1D1D1F] font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#137333]" />
                  <span>Personal Card Wallet (Owned cards selection)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#137333]" />
                  <span>Merchant & Category Search (Croma, Amazon, Flight)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#137333]" />
                  <span>Deterministic Rupee Return Calculator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#137333]" />
                  <span>Best Card Recommendation with Itemized Values</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#137333]" />
                  <span>Inspectable Rule Citations & Assumptions Drawer</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#137333]" />
                  <span>Conversational Copilot over structured card data</span>
                </li>
              </ul>
            </div>

            {/* OUT OF SCOPE */}
            <div className="bg-[#FEF7E0]/30 border border-[#FEEFC3] p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 border-b border-[#FEEFC3] pb-3 text-[#B06000]">
                <XCircle className="w-5 h-5" />
                <h3 className="text-lg font-bold font-sans text-[#1D1D1F]">EXCLUDED FROM MVP (No Scope Bloat)</h3>
              </div>

              <ul className="space-y-2.5 text-xs text-[#1D1D1F] font-mono">
                <li className="flex items-center gap-2 text-[#6E6E73]">
                  <span className="w-2 h-2 rounded-full bg-[#86868B]" />
                  <span>Tap-to-Pay / NFC Mobile Wallet</span>
                </li>
                <li className="flex items-center gap-2 text-[#6E6E73]">
                  <span className="w-2 h-2 rounded-full bg-[#86868B]" />
                  <span>Bank Account Aggregation / Net Banking Sync</span>
                </li>
                <li className="flex items-center gap-2 text-[#6E6E73]">
                  <span className="w-2 h-2 rounded-full bg-[#86868B]" />
                  <span>Credit Score Monitoring & Lending</span>
                </li>
                <li className="flex items-center gap-2 text-[#6E6E73]">
                  <span className="w-2 h-2 rounded-full bg-[#86868B]" />
                  <span>Utility Bill Payment Processing</span>
                </li>
                <li className="flex items-center gap-2 text-[#6E6E73]">
                  <span className="w-2 h-2 rounded-full bg-[#86868B]" />
                  <span>Direct Credit Card Issuance</span>
                </li>
                <li className="flex items-center gap-2 text-[#6E6E73]">
                  <span className="w-2 h-2 rounded-full bg-[#86868B]" />
                  <span>Operational Human Fraud Recovery Operations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — MVP SYSTEM ARCHITECTURE VISUALIZATION */}
      <section className="py-16 bg-[#F5F5F7] border-b border-[#E5E5E7]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-[#0066CC]">SYSTEM DESIGN ARCHITECTURE</span>
            <h2 className="text-3xl font-bold text-[#1D1D1F]">MVP Architecture Pipeline</h2>
            <p className="text-xs text-[#6E6E73]">
              How CardOS processes user inputs through deterministic calculations before rendering AI explanations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-mono text-xs">
            <div className="bg-white p-5 rounded-2xl border border-[#E5E5E7] space-y-2 shadow-2xs">
              <span className="text-[#0066CC] font-bold text-[10px] block">01 CONTEXT</span>
              <p className="font-bold text-[#1D1D1F]">User Wallet & Merchant</p>
              <span className="text-[10px] text-[#86868B] block">Owned Cards + Purchase Amount</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E5E5E7] space-y-2 shadow-2xs">
              <span className="text-[#137333] font-bold text-[10px] block">02 COMPUTE</span>
              <p className="font-bold text-[#1D1D1F]">Deterministic Engine</p>
              <span className="text-[10px] text-[#86868B] block">Base + 5x Gyftr + Bank Off</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E5E5E7] space-y-2 shadow-2xs">
              <span className="text-[#B06000] font-bold text-[10px] block">03 EXPLAIN</span>
              <p className="font-bold text-[#1D1D1F]">Copilot Summarizer</p>
              <span className="text-[10px] text-[#86868B] block">Natural Language Pro/Cons</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E5E5E7] space-y-2 shadow-2xs">
              <span className="text-[#1D1D1F] font-bold text-[10px] block">04 VERIFY</span>
              <p className="font-bold text-[#1D1D1F]">Evidence Inspector</p>
              <span className="text-[10px] text-[#86868B] block">Cites Verified Bank T&Cs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — METRICS FRAMEWORK FOR INVESTORS */}
      <section className="py-16 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0066CC]">INVESTOR METRICS FRAMEWORK</span>
            <h2 className="text-3xl font-bold text-[#1D1D1F]">What We Will Measure in MVP</h2>
            <p className="text-xs text-[#6E6E73]">
              Disciplined quantitative framework for measuring decision utility and user retention during early access validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {mvpMetricsFramework.map((m) => (
              <div key={m.name} className="bg-white border border-[#E5E5E7] p-6 rounded-3xl space-y-3 shadow-2xs hover:border-[#0066CC] transition-all">
                <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-2">
                  <span className="text-[#0066CC] font-bold text-[10px] uppercase">{m.category}</span>
                  <span className="text-[#137333] font-bold bg-[#E6F4EA] px-2 py-0.5 rounded border border-[#CEEAD6]">
                    Goal: {m.mvpGoal}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#1D1D1F] font-sans">{m.name}</h4>
                <p className="text-[#6E6E73] font-sans text-xs">{m.definition}</p>
                <div className="pt-2 border-t border-[#E5E5E7] text-[11px] text-[#86868B]">
                  Why: {m.whyItMatters}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — BUSINESS MODEL OPTIONS */}
      <section className="py-16 bg-[#F5F5F7] border-t border-[#E5E5E7]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0066CC]">COMMERCIAL POTENTIAL</span>
            <h2 className="text-3xl font-bold text-[#1D1D1F]">Monetization & Business Model Options</h2>
            <p className="text-xs text-[#6E6E73]">
              Future monetization channels once core decision utility is validated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
            {businessModelOptions.map((bm, idx) => (
              <div key={idx} className="bg-white border border-[#E5E5E7] p-6 rounded-3xl space-y-2 shadow-2xs">
                <span className="text-[10px] font-mono font-bold uppercase text-[#0066CC] block">OPTION 0{idx + 1}</span>
                <h4 className="text-lg font-bold text-[#1D1D1F]">{bm.title}</h4>
                <p className="text-[#6E6E73] leading-relaxed">{bm.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </main>
  );
}
