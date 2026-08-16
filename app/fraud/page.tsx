'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { FraudCaseModal } from '@/components/ui/FraudCaseModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  fraudCaseDemoData,
  bankHotlines,
  scamEducationCards,
} from '@/lib/fraudRecoveryDemoData';
import {
  ShieldAlert,
  ShieldCheck,
  PhoneCall,
  FileText,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function FraudWorkspacePage() {
  const [fraudModalOpen, setFraudModalOpen] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] relative">
      <Navbar />

      {/* Chapter 09 Context SubNav with Return-to-Origin Link */}
      <ContextSubNav
        currentChapterId="fraud"
        pageTitle="Fraud Triage & Protection"
        badgeLabel="RBI Zero-Liability Timers Active"
        badgeType="red"
      />

      <div className="max-w-7xl mx-auto px-6 pt-28 sm:pt-32 pb-12 space-y-12">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge variant="crimson" size="md">
              <ShieldAlert className="w-3.5 h-3.5 mr-1" />
              Emergency Intake & Incident Triage
            </Badge>
            <span className="text-xs font-mono text-[#1D1D1F] font-bold">RBI Circular Compliant</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            Fraud Recovery Command Center <br />
            <span className="font-serif italic font-normal text-[#C5221F]">
              & Instant Dispute Recovery Engine.
            </span>
          </h1>

          <p className="text-base text-[#1D1D1F] leading-relaxed font-sans font-semibold">
            Lock zero-liability claims instantly and generate bank-ready dispute packages in seconds.
          </p>
        </div>

        {/* Prototype Safeguard Banner */}
        <div className="bg-[#FBFBFD] border border-[#E5E5E7] p-4 sm:px-5 rounded-2xl flex items-center justify-between gap-4 text-xs font-mono text-[#1D1D1F]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#0066CC] shrink-0" />
            <span className="font-semibold"><strong className="text-[#1D1D1F]">Privacy Guaranteed:</strong> Zero card credentials or PINs are collected.</span>
          </div>
          <span className="text-[10px] bg-white px-3 py-1 rounded-full border border-[#E5E5E7] text-[#1D1D1F] font-bold shrink-0 shadow-2xs">100% Non-Custodial</span>
        </div>

        {/* SECTION 1: EMERGENCY INTAKE TRIAGE */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">01. Select Incident Type</h2>
            <span className="text-xs font-mono text-[#1D1D1F] font-semibold">Hover options to preview instant resolution steps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: 'unrecognized', label: 'Unrecognized Charge', sub: 'Statement charge' },
              { id: 'stolen', label: 'Card Lost / Stolen', sub: 'Misplaced physical card' },
              { id: 'phishing', label: 'Phishing / Fake SMS', sub: 'Suspicious OTP link' },
              { id: 'duplicate', label: 'Double Billed', sub: 'Billed twice for single order' },
            ].map((sc) => (
              <div
                key={sc.id}
                className="p-5 rounded-3xl border border-[#E5E5E7] bg-[#FBFBFD] text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] hover:shadow-md transition-all duration-300 space-y-1.5 group cursor-pointer"
              >
                <span className="text-xs font-mono font-bold block">{sc.label}</span>
                <span className="text-[11px] text-[#1D1D1F] group-hover:text-white/90 block font-mono font-semibold transition-colors">{sc.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: RBI ZERO LIABILITY TIMERS & BANK HELPLINE DIRECTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: RBI Zero-Liability Rules */}
          <div className="lg:col-span-5 bg-[#FBFBFD] p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] flex flex-col justify-between space-y-6 shadow-xs h-full">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#C5221F] font-bold uppercase">RBI MANDATE</span>
              <h3 className="text-xl font-bold text-[#1D1D1F]">Zero Customer Liability Timers</h3>
            </div>

            <div className="space-y-4 font-mono text-xs flex-1 flex flex-col justify-between">
              <div className="bg-[#E6F4EA] border border-[#CEEAD6] p-4 sm:p-5 rounded-2xl space-y-1 text-[#137333]">
                <span className="font-bold uppercase text-[10px] block">0 - 3 DAYS REPORTING</span>
                <p className="font-sans font-bold text-sm">100% Zero Customer Liability</p>
                <p className="font-sans text-[11px] font-semibold">Full refund guaranteed under RBI regulations.</p>
              </div>

              <div className="bg-[#FEF7E0] border border-[#FEEFC3] p-4 sm:p-5 rounded-2xl space-y-1 text-[#B06000]">
                <span className="font-bold uppercase text-[10px] block">4 - 7 DAYS REPORTING</span>
                <p className="font-sans font-bold text-sm">Capped Liability (Max ₹10,000)</p>
                <p className="font-sans text-[11px] font-semibold">Customer liability capped at max ₹10,000.</p>
              </div>

              <div className="bg-white border border-[#E5E5E7] p-4 sm:p-5 rounded-2xl space-y-1 text-[#1D1D1F]">
                <span className="font-bold uppercase text-[10px] block">&gt; 7 DAYS REPORTING</span>
                <p className="font-sans font-bold text-sm text-[#1D1D1F]">Bank Board Discretion</p>
                <p className="font-sans text-[11px] font-semibold">Subject to bank dispute committee approval.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Issuer Phone Hotline Directory */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] flex flex-col justify-between space-y-6 shadow-xs h-full">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#0066CC] font-bold uppercase">24×7 DIRECTORY</span>
              <h3 className="text-xl font-bold text-[#1D1D1F]">Official Issuer Emergency Helplines</h3>
            </div>

            <div className="space-y-3 font-mono text-xs flex-1 flex flex-col justify-between">
              {bankHotlines.map((h, idx) => (
                <div key={idx} className="p-4 bg-[#FBFBFD] rounded-2xl border border-[#E5E5E7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#1D1D1F] text-sm font-sans block">{h.bank}</span>
                    <div className="flex items-center gap-1.5 text-xs text-[#1D1D1F] font-mono font-bold">
                      <PhoneCall className="w-3.5 h-3.5 text-[#1D1D1F]" />
                      <span>{h.phone}</span>
                    </div>
                  </div>
                  <a href={h.webLockUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                    <Button variant="secondary" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                      Lock on {h.bank}
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: DEMO RECOVERY CASE & DISPUTE PACKAGE GENERATOR */}
        <div className="bg-[#FBFBFD] p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E7] pb-6">
            <div>
              <span className="text-xs font-mono text-[#C5221F] font-bold uppercase">PROTOTYPE COMMAND CENTER</span>
              <h3 className="text-2xl font-bold text-[#1D1D1F]">Case #{fraudCaseDemoData.caseId}</h3>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setFraudModalOpen(true)}
              rightIcon={<FileText className="w-4 h-4" />}
            >
              Generate 1-Click RBI Dispute Package
            </Button>
          </div>

          {/* Interactive Checklist & Case Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Checklist */}
            <div className="space-y-4 font-mono text-xs">
              <span className="text-[#1D1D1F] font-bold uppercase text-[10px] block">DISPUTE CHECKLIST</span>

              {[
                { key: 'step1', label: '1. Report transaction in CardOS Fraud Workspace' },
                { key: 'step2', label: '2. Call official bank hotline (1800 266 4332)' },
                { key: 'step3', label: '3. Record official Bank Complaint Reference ID' },
                { key: 'step4', label: '4. Submit RBI Zero-Liability Dispute Package' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleChecklist(item.key)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${checklist[item.key]
                      ? 'bg-[#E6F4EA] border-[#CEEAD6] text-[#137333] font-bold'
                      : 'bg-white border-[#E5E5E7] text-[#1D1D1F]'
                    }`}
                >
                  <span>{item.label}</span>
                  {checklist[item.key] && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                </button>
              ))}
            </div>

            {/* Case Timeline */}
            <div className="space-y-4 font-mono text-xs">
              <span className="text-[#1D1D1F] font-bold uppercase text-[10px] block">CASE LOG TIMELINE</span>

              <div className="relative border-l-2 border-[#E5E5E7] pl-4 space-y-4 ml-2">
                {fraudCaseDemoData.timeline.map((evt, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#0066CC]" />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#1D1D1F]">{evt.actor}</span>
                      <span className="text-[#1D1D1F] font-semibold">{evt.time}</span>
                    </div>
                    <p className="text-xs text-[#1D1D1F] font-sans font-semibold">{evt.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: SCAM EDUCATION CARDS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">04. Fraud Prevention & Warning Signs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {scamEducationCards.map((scam) => (
              <div key={scam.id} className="bg-white border border-[#E5E5E7] p-6 rounded-3xl space-y-4 shadow-xs">
                <h3 className="text-lg font-bold text-[#1D1D1F] font-sans">{scam.title}</h3>

                <div className="space-y-2 font-sans text-xs">
                  <span className="font-mono text-[10px] font-bold text-[#C5221F] uppercase block">WARNING SIGNS</span>
                  <ul className="list-disc list-inside space-y-1 text-[#1D1D1F] font-semibold">
                    {scam.warningSigns.map((w, wIdx) => (
                      <li key={wIdx}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                  <div className="p-3 bg-[#E6F4EA] rounded-xl border border-[#CEEAD6] space-y-1">
                    <span className="text-[#137333] font-bold block uppercase text-[10px]">WHAT TO DO</span>
                    <p className="text-[#1D1D1F] font-sans">{scam.doAction}</p>
                  </div>
                  <div className="p-3 bg-[#FCE8E6] rounded-xl border border-[#FAD2CF] space-y-1">
                    <span className="text-[#C5221F] font-bold block uppercase text-[10px]">NEVER DO THIS</span>
                    <p className="text-[#1D1D1F] font-sans">{scam.dontAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fraud Case Modal */}
      <FraudCaseModal
        isOpen={fraudModalOpen}
        onClose={() => setFraudModalOpen(false)}
      />

      <FooterCTA />
    </main>
  );
}
