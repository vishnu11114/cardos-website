'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';
import { RoadmapAnimation } from '@/components/sections/RoadmapAnimation';

export const Section12_FutureRoadmap = () => {
  return (
    <section
      id="roadmap"
      suppressHydrationWarning
      className="scroll-mt-20 py-24 bg-gradient-to-b from-[#F5F3EF] via-[#F5F3EF] to-[#FFFFFF] relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#F0F6FF]/60 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="md">
                THE ROAD AHEAD · CREDIT CARD OS ROADMAP
              </Badge>
              <span className="text-xs font-mono text-[#86868B]">Choose → Pay → Protect</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1D1F]">
              THE ROAD AHEAD <br />
              <span className="font-serif italic font-normal text-[#0066CC]">
                Choose → Pay → Protect
              </span>
            </h2>
            <p className="text-base text-[#6E6E73] leading-relaxed font-normal">
              One continuous product journey from intelligent card selection to frictionless payment and proactive dispute protection.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link href="/early-access">
              <Button variant="primary" size="lg" rightIcon={<Sparkles className="w-4 h-4 text-white" />}>
                Join Early Access
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Interactive Animated Roadmap Canvas (Responsive Fluid Width) ── */}
        <div className="w-full max-w-full overflow-hidden">
          <RoadmapAnimation controls={false} />
        </div>
      </div>
    </section>
  );
};
