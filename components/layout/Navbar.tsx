'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { scrollToTop, scrollToSection } from '@/components/motion/SmoothScroll';
import {
  Compass,
  Layers,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  Milestone,
  Zap,
} from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver ScrollSpy on Homepage
  useEffect(() => {
    if (pathname !== '/') return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -50% 0px',
      threshold: 0.05,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sectionIds = ['home', 'choose', 'pay', 'protect', 'how', 'roadmap', 'early-access'];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  /**
   * Unified Brand Click Handler:
   * 1. If on homepage ('/'): Smoothly scroll to the absolute top (0).
   * 2. If on any internal route: Navigate cleanly to '/' and ensure scroll starts at the absolute top.
   */
  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    if ('key' in e && e.key !== 'Enter' && e.key !== ' ') {
      return;
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    if (pathname === '/') {
      e.preventDefault();
      scrollToTop(true);
      window.history.replaceState(null, '', '#home');
    } else {
      e.preventDefault();
      scrollToTop(false);
      router.push('/#home');
    }
  };

  /**
   * Section Navigation Handler:
   * Smoothly scrolls to section on '/' with 80px offset, or navigates to '/#section' from deep routes.
   */
  const handleNavClick = (sectionId: string, deepPath: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);

    if (pathname === '/') {
      e.preventDefault();
      scrollToSection(sectionId, true);
      window.history.replaceState(null, '', `#${sectionId}`);
    } else {
      // Direct navigation to main chapter
      e.preventDefault();
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E5E7] py-2.5 shadow-xs'
        : 'bg-white/90 backdrop-blur-md border-b border-[#E5E5E7]/60 py-3'
        }`}
    >
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Unified Clickable Brand Identity Area */}
        <Link
          href="/"
          onClick={handleBrandClick}
          onKeyDown={handleBrandClick}
          aria-label="CardOS — Back to home"
          className="group flex items-center gap-3 p-1 -ml-1 rounded-xl cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 select-none"
        >
          {/* CardOS 3D Logo Icon — Responsive Badge Size */}
          <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full bg-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 shrink-0 overflow-hidden border border-[#E5E5E7] p-1">
            <Image
              src="/cardos-logo.png"
              alt="Credit Card OS Logo"
              width={52}
              height={52}
              className="w-full h-full object-contain scale-[1.18] transition-transform duration-300"
              priority
            />
          </div>

          {/* Typography & Version Identifier */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-lg sm:text-[20px] tracking-tight text-[#1D1D1F] font-sans group-hover:text-black transition-colors">
                Credit Card
              </span>
              <span className="font-bold text-lg sm:text-[20px] tracking-tight text-[#0066CC] font-sans">
                OS
              </span>
            </div>
            <span className="text-[9.5px] text-[#1D1D1F] tracking-widest uppercase font-mono mt-0.5 hidden sm:inline transition-colors font-extrabold">
              Operating System for Credit Cards
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links (Clean Widescreen Fluid Sliding Pill Transition - Compact Proportions) */}
        <nav suppressHydrationWarning className="hidden lg:flex items-center gap-1 text-[13.5px] sm:text-[14px] font-bold tracking-wide relative select-none" aria-label="Main Navigation">
          {[
            { id: 'choose', label: 'CHOOSE', href: '/#choose', deepPath: '/product', icon: Layers, iconColor: '#0066CC' },
            { id: 'pay', label: 'PAY', href: '/#pay', deepPath: '/rewards', icon: Compass, iconColor: '#137333' },
            { id: 'protect', label: 'PROTECT', href: '/#protect', deepPath: '/fraud', icon: ShieldCheck, iconColor: '#137333' },
            { id: 'how', label: 'HOW', href: '/#how', deepPath: '/#how', icon: Sparkles, iconColor: '#0066CC' },
            { id: 'roadmap', label: 'ROADMAP', href: '/#roadmap', deepPath: '/roadmap', icon: Milestone, iconColor: '#0066CC' },
            { id: 'early-access', label: 'EARLY ACCESS', href: '/#early-access', deepPath: '/early-access', icon: Zap, iconColor: '#D97706' },
          ].map((item) => {
            const isActive = pathname === '/' && activeSection === item.id;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(item.id, item.deepPath, e)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors duration-300 z-10 ${isActive ? 'text-white font-bold' : 'text-[#1D1D1F] font-bold hover:text-black'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="fluidNavbarPill"
                    className="absolute inset-0 bg-[#1D1D1F] rounded-full shadow-xs -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 180,
                      damping: 24,
                      mass: 1.0,
                    }}
                  />
                )}
                {Icon && (
                  <Icon
                    className="w-4 h-4 stroke-[2] transition-colors duration-300"
                    style={{ color: isActive ? '#FFFFFF' : item.iconColor }}
                  />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/cards">
            <Button
              variant="primary"
              size="md"
              className="font-semibold text-sm px-4 py-2"
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Launch OS (₹)
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden text-[#1D1D1F] p-2 rounded-xl hover:bg-[#F5F5F7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-[#E5E5E7] px-6 py-6 space-y-4 flex flex-col shadow-md text-base font-bold animate-in fade-in slide-in-from-top-2 duration-200">
          <Link href="/#choose" onClick={(e) => handleNavClick('choose', '/product', e)} className="py-1">CHOOSE Cards</Link>
          <Link href="/#pay" onClick={(e) => handleNavClick('pay', '/rewards', e)} className="py-1">PAY Rewards</Link>
          <Link href="/#protect" onClick={(e) => handleNavClick('protect', '/fraud', e)} className="py-1">PROTECT Shield</Link>
          <Link href="/#how" onClick={(e) => handleNavClick('how', '/#how', e)} className="py-1">HOW It Works</Link>
          <Link href="/#roadmap" onClick={(e) => handleNavClick('roadmap', '/roadmap', e)} className="py-1">Product Roadmap</Link>
          <Link href="/early-access" onClick={() => setMobileMenuOpen(false)} className="py-1">Join Early Access</Link>
          <div className="pt-2 flex flex-col gap-3">
            <Link href="/cards" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="lg" className="w-full text-base">Launch OS (₹)</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
