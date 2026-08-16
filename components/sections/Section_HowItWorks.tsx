'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import {
  CreditCard,
  Zap,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Lock,
  Search,
} from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Select Purchase',
    desc: 'Pick store & spend amount (e.g. Amazon ₹45,000).',
    icon: ShoppingBag,
    color: '#0066CC',
    bgColor: '#F0F6FF',
    borderColor: '#D2E3FC',
  },
  {
    step: '02',
    title: 'Smart Rate Check',
    desc: 'Scans bank tariffs, 5x multipliers, & reward caps.',
    icon: Search,
    color: '#0066CC',
    bgColor: '#F0F6FF',
    borderColor: '#D2E3FC',
  },
  {
    step: '03',
    title: 'CHOOSE Best Card',
    desc: 'Picks your card with highest cash & point returns.',
    icon: CreditCard,
    color: '#0066CC',
    bgColor: '#F0F6FF',
    borderColor: '#D2E3FC',
  },
  {
    step: '04',
    title: 'PAY & Save',
    desc: 'Pays smoothly & unlocks maximum rupee savings.',
    icon: Zap,
    color: '#137333',
    bgColor: '#E6F4EA',
    borderColor: '#CEEAD6',
  },
  {
    step: '05',
    title: 'PROTECT & Recovery',
    desc: 'Monitors charges & provides instant dispute protection.',
    icon: ShieldCheck,
    color: '#B06000',
    bgColor: '#FEF7E0',
    borderColor: '#FEEFC3',
  },
];

export const Section_HowItWorks = () => {
  return (
    <section
      id="how"
      suppressHydrationWarning
      className="scroll-mt-20 py-28 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F5F3EF] relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#F5F5F7] rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="indigo" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#0066CC]" />
              HOW IT WORKS · SYSTEM MECHANISM
            </Badge>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1D1F]">
            How the System Works. <br />
            <span className="font-serif italic font-normal text-[#0066CC]">
              Input to Evidence.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#1D1D1F] leading-relaxed font-medium">
            A single intelligent workflow connects your purchase to the optimal credit card and proactive protection.
          </p>
        </div>

        {/* Visual 5-Step Connected Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="luxury-card p-6 bg-white border border-[#E5E5E7] shadow-xs flex flex-col justify-between space-y-6 relative group hover:border-[#0066CC]/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1D1D1F]">
                      {item.step}
                    </span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: item.bgColor,
                        borderColor: item.borderColor,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-[#1D1D1F] text-lg tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#1D1D1F] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Connection Arrow */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#E5E5E7] flex items-center justify-center shadow-xs">
                      <ArrowRight className="w-3 h-3 text-[#1D1D1F]" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Visual Product Workflow Highlight Card */}
        <div className="luxury-card p-8 sm:p-10 bg-[#FBFBFD] border border-[#E5E5E7] shadow-xs max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left max-w-md">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#137333]" />
                <span className="text-xs font-mono font-bold text-[#137333] uppercase">
                  Grounded Verification
                </span>
              </div>
              <h4 className="font-bold text-[#1D1D1F] text-xl">
                Right card. Right purchase. Right evidence.
              </h4>
              <p className="text-xs text-[#6E6E73]">
                Zero password storage. Zero bank credentials required. Every recommendation cites official T&C provenance.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-[#E5E5E7] shadow-xs text-xs font-mono font-bold text-[#1D1D1F]">
                <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                <span>VERIFIED PROVENANCE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
