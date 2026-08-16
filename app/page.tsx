import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { IndianBanksShowcase } from '@/components/sections/IndianBanksShowcase';
import { RewardEngineVisualization } from '@/components/sections/RewardEngineVisualization';
import { CardOSPayDemo } from '@/components/sections/CardOSPayDemo';
import { Section10_TrustArchitecture } from '@/components/sections/Section10_TrustArchitecture';
import { Section_HowItWorks } from '@/components/sections/Section_HowItWorks';
import { Section12_FutureRoadmap } from '@/components/sections/Section12_FutureRoadmap';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { CardComparisonTray } from '@/components/CardComparisonTray';

export default function Home() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#FAF9F6] to-[#F5F3EF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F] relative">
      {/* 00 — GLOBAL STICKY HEADER */}
      <Navbar />

      {/* 01 — HERO / SYSTEM INTRODUCTION */}
      <Hero />

      {/* 02 — CHOOSE: CARD INTELLIGENCE */}
      <IndianBanksShowcase />

      {/* 03 — PAY: 3D INTERACTIVE TAP & PAY DEMO */}
      <CardOSPayDemo />

      {/* 03.5 — PAY: REWARD ENGINE & TRANSACTION SIMULATOR */}
      <RewardEngineVisualization />

      {/* 04 — PROTECT: TRUST SHIELD & DISPUTE RECOVERY */}
      <Section10_TrustArchitecture />

      {/* 05 — HOW: SYSTEM MECHANISM */}
      <Section_HowItWorks />

      {/* 06 — ROADMAP: MVP & PIPELINE */}
      <Section12_FutureRoadmap />

      {/* 07 — EARLY ACCESS & CONVERSION */}
      <FooterCTA />

      {/* FLOATING CARD COMPARISON TRAY */}
      <CardComparisonTray />
    </main>
  );
}
