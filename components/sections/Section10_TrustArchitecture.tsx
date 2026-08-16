'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HowCardOSKnowsThisModal } from '@/components/ui/HowCardOSKnowsThisModal';
import { Lock, FileCheck, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Section10_TrustArchitecture = () => {
  const [howKnowsModalOpen, setHowKnowsModalOpen] = useState(false);

  return (
    <section id="protect" suppressHydrationWarning className="scroll-mt-20 py-24 bg-gradient-to-b from-[#F5F3EF] via-[#F5F3EF] to-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="md">
                PROTECT · Trust Shield & Protection
              </Badge>
              <span className="text-xs font-mono text-[#86868B]">Dispute Triage & Recovery Guidance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              PROTECT. <br />
              <span className="font-serif italic font-normal text-[#0066CC]">
                Know when something doesn&apos;t look right.
              </span>
            </h2>
            <p className="text-base text-[#6E6E73] leading-relaxed">
              CardOS monitors transaction anomalies, verifies T&C provenance, and equips you with immediate dispute letter templates when issues arise.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link href="/fraud">
              <Button variant="primary" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Explore Protection
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Core Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-[#E5E5E7] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#137333] stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1D1F]">Read-Only Security Scope</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
              CardOS operates strictly on read-only portfolio tokens. We <strong>never store raw 16-digit card numbers, CVVs, or bank passwords</strong>.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E5E5E7] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FF] border border-[#D2E3FC] flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-[#0066CC] stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1D1F]">Verified Source Citations</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
              Every recommendation cites <strong>official bank T&C repositories</strong>. If data confidence falls below threshold, the system explicitly flags uncertainty.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F5F5F7] border border-[#E5E5E7] space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF7E0] border border-[#FEEFC3] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#B06000] stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">How CardOS Knows This</h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                Inspect the 6-step grounded evidence chain, formula calculations, and rule change timestamps behind any recommendation.
              </p>
            </div>

            <Button
              variant="secondary"
              size="md"
              className="w-full justify-between mt-4 text-xs"
              onClick={() => setHowKnowsModalOpen(true)}
              rightIcon={<ArrowUpRight className="w-4 h-4 text-[#0066CC]" />}
            >
              Test Evidence Chain Modal
            </Button>
          </div>
        </div>
      </div>

      {/* How CardOS Knows This Modal Integration */}
      <HowCardOSKnowsThisModal
        isOpen={howKnowsModalOpen}
        onClose={() => setHowKnowsModalOpen(false)}
      />
    </section>
  );
};
