'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F] flex flex-col justify-between">
      <Navbar />

      <section className="py-32 bg-[#FFFFFF]">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <Badge variant="indigo" size="md" className="mx-auto">
            404 — PAGE NOT FOUND
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1D1D1F]">
            This route doesn&apos;t{' '}
            <span className="font-serif italic font-normal text-[#1D1D1F]">
              exist yet.
            </span>
          </h1>

          <p className="text-base text-[#6E6E73] leading-relaxed max-w-xl mx-auto">
            The page or feature route you requested could not be located in the Credit Card OS catalog.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                Return to Homepage
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Product Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
    </main>
  );
}
