'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception to client console in production
    console.error('Handled Application Error:', error);
  }, [error]);

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0066CC]/15 selection:text-[#1D1D1F] flex flex-col justify-between">
      <Navbar />

      <section className="py-32 bg-[#FFFFFF]">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <Badge variant="crimson" size="md" className="mx-auto">
            APPLICATION ERROR HANDLED
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            Something unexpected occurred.
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed max-w-xl mx-auto font-mono bg-[#F5F5F7] p-4 rounded-2xl border border-[#E5E5E7]">
            {error?.message || 'An unhandled component rendering error occurred.'}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="md" onClick={() => reset()} leftIcon={<RotateCcw className="w-4 h-4" />}>
              Try Again
            </Button>
            <Link href="/">
              <Button variant="secondary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
