'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Universal scroll-to-top helper compatible with Lenis, native window scrolling,
 * and reduced-motion preferences.
 */
export const scrollToTop = (smooth = true) => {
  if (typeof window === 'undefined') return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldBeSmooth = smooth && !isReducedMotion;

  if (window.__lenis) {
    window.__lenis.scrollTo(0, {
      immediate: !shouldBeSmooth,
      duration: shouldBeSmooth ? 1.0 : 0,
      lock: false,
    });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: shouldBeSmooth ? 'smooth' : ('instant' as ScrollBehavior),
    });
  }
};

/**
 * Universal scroll-to-section helper with 80px sticky header offset.
 */
export const scrollToSection = (id: string, smooth = true) => {
  if (typeof window === 'undefined') return;

  if (id === 'home' || id === 'top') {
    scrollToTop(smooth);
    return;
  }

  const el = document.getElementById(id.replace('#', ''));
  if (!el) return;

  const headerOffset = 80;
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldBeSmooth = smooth && !isReducedMotion;

  if (window.__lenis) {
    window.__lenis.scrollTo(offsetPosition, {
      immediate: !shouldBeSmooth,
      duration: shouldBeSmooth ? 1.0 : 0,
      lock: false,
    });
  } else {
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: shouldBeSmooth ? 'smooth' : ('instant' as ScrollBehavior),
    });
  }
};

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Initial hash scroll handling with header offset
    const handleHashChange = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        setTimeout(() => {
          scrollToSection(targetId, true);
        }, 100);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <div suppressHydrationWarning className="contents">{children}</div>;
};
