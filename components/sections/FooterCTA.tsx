'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { scrollToTop } from '@/components/motion/SmoothScroll';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FooterCTA = () => {
  return (
    <footer suppressHydrationWarning className="bg-gradient-to-b from-[#FFFFFF] via-[#F5F3EF] to-[#F5F3EF] pt-16 pb-12 text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-6 space-y-16">

        {/* Main Footer Callout Box (Ultra-Smooth Frosted Glass Card with Light Border & Soft Blue Glow) */}
        <div id="early-access" className="scroll-mt-20 bg-white/80 backdrop-blur-2xl rounded-3xl px-8 sm:px-14 py-6 sm:py-7 border border-[#E5E5E7] hover:border-[#0066CC]/60 shadow-lg shadow-black/[0.03] hover:shadow-xl hover:shadow-[#0066CC]/10 transition-all duration-500 ease-out text-center space-y-4 max-w-4xl mx-auto group">
          <Badge variant="indigo" size="sm" className="mx-auto">
            <Sparkles className="w-3 h-3 mr-1 text-[#0066CC]" />
            THE FUTURE OF CREDIT CARD INTELLIGENCE
          </Badge>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            One system for choosing, paying, and protecting.
          </h3>

          <div className="pt-1 flex justify-center">
            <Link href="/early-access">
              <Button variant="primary" size="sm" className="rounded-full px-5 py-2 text-xs font-bold cursor-pointer" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Join Early Access
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs font-mono">

          <div className="col-span-2 space-y-4">
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  scrollToTop(true);
                }
              }}
              aria-label="CardOS — Back to home"
              className="inline-flex items-center gap-2 group cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] rounded-lg p-0.5"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border border-[#E5E5E7] p-1 shadow-xs">
                <Image
                  src="/cardos-logo.png"
                  alt="Credit Card OS Logo"
                  width={52}
                  height={52}
                  className="w-full h-full object-contain scale-[1.38]"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1 leading-none">
                  <span className="font-bold text-base tracking-tight text-[#1D1D1F]">Credit Card</span>
                  <span className="font-bold text-base tracking-tight text-[#0066CC]">
                    OS
                  </span>
                </div>
                <span className="text-xs text-[#1D1D1F] tracking-wider uppercase font-mono mt-0.5 font-bold">
                  Operating System for Credit Cards
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#1D1D1F] font-mono leading-relaxed font-bold max-w-sm">
              The intelligence layer calculating optimal card return, grounded bank T&Cs, and safe fraud protection.
            </p>
            <div className="text-xs text-[#1D1D1F] font-mono font-bold">
              © 2026 Credit Card OS. All trademarks belong to their respective owners.
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-mono font-bold text-xs block text-[#1D1D1F]">PRODUCT</span>
            <ul className="space-y-2 text-[#1D1D1F] font-mono font-bold text-xs">
              <li><Link href="/product" className="hover:text-[#0066CC] transition-colors">Product Map</Link></li>
              <li><Link href="/cards" className="hover:text-[#0066CC] transition-colors">Cards Explorer</Link></li>
              <li><Link href="/rewards" className="hover:text-[#0066CC] transition-colors">Reward Engine</Link></li>
              <li><Link href="/offers" className="hover:text-[#0066CC] transition-colors">Merchant Offers</Link></li>
              <li><Link href="/compare" className="hover:text-[#0066CC] transition-colors">Card Comparison</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono font-bold text-xs block text-[#1D1D1F]">INTELLIGENCE</span>
            <ul className="space-y-2 text-[#1D1D1F] font-mono font-bold text-xs">
              <li><Link href="/copilot" className="hover:text-[#0066CC] transition-colors">AI Copilot</Link></li>
              <li><Link href="/trust" className="hover:text-[#0066CC] transition-colors">Trust & Evidence</Link></li>
              <li><Link href="/fraud" className="hover:text-[#0066CC] transition-colors">Fraud Support</Link></li>
              <li><Link href="/roadmap" className="hover:text-[#0066CC] transition-colors">Product Roadmap</Link></li>
              <li><Link href="/early-access" className="hover:text-[#0066CC] transition-colors">Early Access</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono font-bold text-xs block text-[#1D1D1F]">LEGAL & SAFETY</span>
            <ul className="space-y-2 text-[#1D1D1F] font-mono font-bold text-xs">
              <li><Link href="/legal#terms" className="hover:text-[#0066CC] transition-colors">Terms of Use</Link></li>
              <li><Link href="/legal#trademarks" className="hover:text-[#0066CC] transition-colors">Trademark Notice</Link></li>
              <li><Link href="/legal#privacy" className="hover:text-[#0066CC] transition-colors">Privacy Principles</Link></li>
              <li><Link href="/trust#sources" className="hover:text-[#0066CC] transition-colors">Source Provenance</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};
