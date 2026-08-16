'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const Hero = () => {
  // Mouse position 3D physics tilt calculations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="home" suppressHydrationWarning className="relative pt-36 pb-24 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#F5F3EF] overflow-hidden scroll-mt-20">
      {/* Soft ambient background depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[480px] bg-[#F5F5F7] -z-10 rounded-b-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Hierarchy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="indigo" size="md">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#0066CC]" />
                Credit Card Operating System
              </Badge>
            </div>

            {/* Core Headline */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#1D1D1F] leading-[1.08]">
              Make every card <br />
              <span className="font-serif italic font-normal text-[#0066CC]">
                work smarter.
              </span>
            </h1>

            {/* Visual CHOOSE -> PAY -> PROTECT -> HOW Story Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href="#choose" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F6FF] border border-[#D2E3FC] text-xs font-mono font-bold text-[#0066CC] hover:bg-[#E0EEFF] transition-colors">
                <span>01. CHOOSE</span>
              </a>
              <span className="text-[#1D1D1F] text-xs font-mono font-bold">→</span>
              <a href="#pay" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E6F4EA] border border-[#CEEAD6] text-xs font-mono font-bold text-[#137333] hover:bg-[#D4ECD9] transition-colors">
                <span>02. PAY</span>
              </a>
              <span className="text-[#1D1D1F] text-xs font-mono font-bold">→</span>
              <a href="#protect" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEF7E0] border border-[#FEEFC3] text-xs font-mono font-bold text-[#B06000] hover:bg-[#FDF0C6] transition-colors">
                <span>03. PROTECT</span>
              </a>
              <span className="text-[#1D1D1F] text-xs font-mono font-bold">→</span>
              <a href="#how" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F7] border border-[#E5E5E7] text-xs font-mono font-bold text-[#1D1D1F] hover:bg-[#EBEBEF] transition-colors">
                <span>04. HOW</span>
              </a>
            </div>

            {/* Scannable Supporting Paragraph */}
            <p className="text-base sm:text-lg text-[#1D1D1F] max-w-2xl leading-relaxed font-medium">
              Unify your credit cards into one intelligent system. Unlock instant merchant rewards, seamless payments, and complete security.
            </p>

            {/* Single Primary Action Button */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#choose">
                <Button
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Card Intelligence
                </Button>
              </a>
            </div>

            {/* Strong Trust Indicators Strip */}
            <div className="pt-6 border-t border-[#E5E5E7] flex flex-wrap items-center gap-3.5 text-xs font-mono text-[#1D1D1F]">
              <div className="flex items-center gap-2 bg-[#E6F4EA] border border-[#CEEAD6] px-3.5 py-1.5 rounded-full shadow-2xs text-[#137333]">
                <ShieldCheck className="w-4 h-4 text-[#137333] stroke-[2.5]" />
                <span className="font-extrabold tracking-tight">Read-Only Security</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FEF7E0] border border-[#FEEFC3] px-3.5 py-1.5 rounded-full shadow-2xs text-[#B06000]">
                <Lock className="w-4 h-4 text-[#B06000] stroke-[2.5]" />
                <span className="font-extrabold tracking-tight">Zero Password Storage</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F0F6FF] border border-[#D2E3FC] px-3.5 py-1.5 rounded-full shadow-2xs text-[#0066CC]">
                <Award className="w-4 h-4 text-[#0066CC] stroke-[2.5]" />
                <span className="font-extrabold tracking-tight">₹1.5L Avg Annual Savings</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Commercial Product Photography & 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="luxury-card p-6 sm:p-8 space-y-6 bg-white border-[#E5E5E7] shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
            >
              {/* Stage Container with exact organic fluid blue wave corners matching user image */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-[#E5E5E7] bg-white p-5 sm:p-7 flex flex-col items-center justify-center min-h-[250px] sm:min-h-[270px]">
                {/* Top-Right Organic Blue Wave Blob matching user image */}
                <svg className="absolute top-0 right-0 w-36 sm:w-44 h-36 sm:h-44 text-[#0066FF] pointer-events-none z-0" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 15,0 C 45,10 60,45 100,55 L 100,0 Z" />
                </svg>

                {/* Bottom-Left Organic Blue Wave Blob matching user image */}
                <svg className="absolute bottom-0 left-0 w-36 sm:w-44 h-36 sm:h-44 text-[#0066FF] pointer-events-none z-0" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 0,45 C 45,60 55,90 85,100 L 0,100 Z" />
                </svg>

                {/* Silver Metallic Card Showcase */}
                <div className="relative w-full max-w-[340px] aspect-[1.586] rounded-xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.18)] border border-black/10 group bg-white z-10">
                  <Image
                    src="/cards/amex-platinum.png"
                    alt="American Express Platinum Card Showcase"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Floating Overlay Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-20 pointer-events-none">
                    <span className="font-mono text-[10px] sm:text-[11px] text-white font-bold tracking-widest bg-[#1D1D1F]/85 px-2.5 py-0.5 rounded-md backdrop-blur-md border border-white/20 shadow-md">
                      AMEX PLATINUM
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] text-white font-bold tracking-wide bg-[#1D1D1F]/85 px-2.5 py-0.5 rounded-md backdrop-blur-md border border-white/20 shadow-md">
                      10x Membership Rewards
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendation Overlay (Luxury Offwhite Cream / Glass-like) */}
              <div className="bg-gradient-to-br from-[#FAF8F5] via-[#FAF9F6] to-[#FFFFFF] border border-[#E5E5E7] rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#137333] animate-pulse" />
                    <span className="text-xs font-mono uppercase text-[#0066CC] font-bold">
                      LIVE REWARD OPTIMIZER (INDIA)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#B06000] font-bold bg-[#FEF7E0] px-2.5 py-0.5 rounded-full border border-[#FEEFC3] tabular-nums">
                    +16.6% Return
                  </span>
                </div>

                <div className="text-sm text-[#1D1D1F] font-semibold flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#137333] shrink-0 mt-0.5 stroke-[2]" />
                  <span>
                    At <strong className="text-[#0066CC]">Taj & Fine Hotels Booking</strong>: Swipe <span className="text-[#B06000] font-bold">Amex Platinum</span> via Rewards Multiplier for <span className="text-[#137333] font-bold">10x Membership Rewards (16.6% value)</span> + Taj Luxe Privileges.
                  </span>
                </div>
              </div>

              {/* Quick Portfolio Stats (Clean Offwhite/White Glass Cards) */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white rounded-xl p-3.5 border border-[#E5E5E7] shadow-xs">
                  <span className="text-[#1D1D1F] font-bold block font-mono">Unused Privileges</span>
                  <span className="text-[#1D1D1F] font-mono font-bold text-sm">Centurion Lounge</span>
                </div>
                <div className="bg-white rounded-xl p-3.5 border border-[#E5E5E7] shadow-xs">
                  <span className="text-[#1D1D1F] font-bold block font-mono">Quarterly Target</span>
                  <span className="text-[#B06000] font-mono font-bold text-sm tabular-nums">₹1.5L (₹18k left)</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center justify-center pt-8 text-center"
        >
          <a
            href="#problem"
            className="group flex flex-col items-center gap-1.5 text-xs font-mono text-[#1D1D1F] font-bold hover:text-[#0066CC] transition-colors"
          >
            <span>Scroll to Explore the System</span>
            <div className="w-6 h-9 rounded-full border border-[#E5E5E7] group-hover:border-[#0066CC] flex items-start justify-center p-1 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 bg-[#0066CC] rounded-full"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

