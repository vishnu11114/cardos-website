'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Info, Lock, FileText } from 'lucide-react';

export default function LegalPage() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F]">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-[#FFFFFF] border-b border-[#E5E5E7]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <Badge variant="neutral" size="md">
            <FileText className="w-3.5 h-3.5 mr-1 text-[#0066CC]" />
            Legal, Terms & Trademark Disclaimers
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Terms of Use & Legal Transparency
          </h1>
          <p className="text-sm text-[#1D1D1F] font-bold">
            Last updated: August 2026 · CardOS Version 2.0 India
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-6 space-y-10 font-sans text-xs text-[#1D1D1F] leading-relaxed">
          
          <div id="terms" className="scroll-mt-24 space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] shadow-2xs">
            <h2 className="text-base font-bold text-[#1D1D1F] font-mono uppercase text-[12px] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#0066CC]" />
              1. Informational & Terms of Use Disclosure
            </h2>
            <p className="text-[#1D1D1F] font-semibold">
              Credit Card OS (&quot;CardOS&quot;) is currently an informational decision-support prototype. The calculations, reward estimates, offer multipliers, and evidence citations presented on this website are for demonstration and educational purposes. CardOS is not a licensed bank, credit card issuer, payment gateway, or certified financial advisory firm.
            </p>
          </div>

          <div id="trademarks" className="scroll-mt-24 space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] shadow-2xs">
            <h2 className="text-base font-bold text-[#1D1D1F] font-mono uppercase text-[12px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#137333]" />
              2. Trademark Notice & Issuer Independence
            </h2>
            <p className="text-[#1D1D1F] font-semibold">
              All product names, card names, logos, bank names, brand names, and trademarks referenced across this website (including but not limited to HDFC Bank, Infinia, SmartBuy, Axis Bank, Magnus, SBI Card, ICICI Bank, American Express, Visa, Mastercard, and RuPay) belong to their respective registered owners. Displaying these marks does not imply any official partnership, affiliation, endorsement, or commercial sponsorship by the respective trademark holders.
            </p>
          </div>

          <div id="privacy" className="scroll-mt-24 space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] shadow-2xs">
            <h2 className="text-base font-bold text-[#1D1D1F] font-mono uppercase text-[12px] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#B06000]" />
              3. Privacy Principles & Sensitive Credential Guarantee
            </h2>
            <p className="text-[#1D1D1F] font-semibold">
              CardOS operates under a strict privacy-first architecture. We never request, collect, store, or process sensitive financial credentials including 16-digit primary account numbers (PAN), 3-digit CVV codes, 4-digit ATM PINs, 6-digit SMS One-Time Passwords (OTPs), or Net Banking passwords.
            </p>
          </div>

          <div id="responsible" className="scroll-mt-24 space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] shadow-2xs">
            <h2 className="text-base font-bold text-[#1D1D1F] font-mono uppercase text-[12px]">
              4. Responsible Financial Use Policy
            </h2>
            <p className="text-[#1D1D1F] font-semibold">
              Credit card rewards and cashback should only be leveraged to optimize planned, necessary purchases. CardOS explicitly advises users against revolving credit card balances, incurring high-interest finance charges, or overspending merely to achieve spend milestone thresholds or reward points.
            </p>
          </div>

        </div>
      </section>

      <FooterCTA />
    </main>
  );
}
