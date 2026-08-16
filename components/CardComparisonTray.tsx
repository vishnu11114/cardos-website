'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useComparisonStore } from '@/stores/useComparisonStore';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';

const springTransition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 1.1,
} as const;

export const CardComparisonTray: React.FC = () => {
  const { selectedCards, removeCard, clearAll, isOpen, isMinimized, setIsMinimized } = useComparisonStore();

  if (!isOpen || selectedCards.length === 0) return null;

  return (
    <AnimatePresence>
      {isMinimized ? (
        /* Floating Circular Logo Badge Button (Minimized State) */
        <motion.div
          key="minimized-circle-btn"
          suppressHydrationWarning
          layoutId="comparisonTrayContainer"
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={springTransition}
          className="fixed bottom-6 right-6 sm:right-8 z-50 select-none"
        >
          <button
            onClick={() => setIsMinimized(false)}
            aria-label={`Expand comparison bar (${selectedCards.length} cards selected)`}
            title={`Expand comparison bar (${selectedCards.length} cards selected)`}
            className="group relative w-[58px] h-[58px] rounded-full bg-white text-[#1D1D1F] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E5E5E7] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] p-1"
          >
            {/* CardOS Logo Image matching Navbar logo styling */}
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white p-0.5">
              <Image
                src="/cardos-logo.png"
                alt="CardOS Comparison Logo"
                width={60}
                height={60}
                className="w-full h-full object-contain scale-[1.38] group-hover:scale-150 transition-transform duration-300"
              />
            </div>

            {/* Glowing Badge Counter on Circle */}
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0066CC] text-white text-[11px] font-extrabold font-mono flex items-center justify-center shadow-md border-2 border-white animate-pulse z-10">
              {selectedCards.length}
            </span>
          </button>
        </motion.div>
      ) : (
        /* Full Horizontal Comparison Tray (Expanded State) */
        <motion.div
          key="expanded-compare-tray"
          suppressHydrationWarning
          layoutId="comparisonTrayContainer"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={springTransition}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 select-none"
        >
          <div className="bg-white/95 backdrop-blur-2xl border border-[#E5E5E7] shadow-[0_16px_40px_rgba(0,0,0,0.12)] rounded-2xl p-2.5 sm:p-3.5 text-[#1D1D1F] flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
            {/* Left Status & Count */}
            <div className="flex items-center gap-2 sm:gap-2.5 border-r border-[#E5E5E7] pr-2 sm:pr-4 shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F0F6FF] border border-[#D2E3FC] hidden min-[480px]:flex items-center justify-center text-[#0066CC]">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#86868B]">
                  Compare
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono text-[#1D1D1F] tabular-nums">
                  {selectedCards.length}/4
                </div>
              </div>
            </div>

            {/* Selected Card Chips */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 no-scrollbar flex-1">
              {selectedCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl text-xs font-semibold text-[#1D1D1F] shrink-0"
                >
                  <span className="truncate max-w-[90px] min-[400px]:max-w-[130px] sm:max-w-[160px]">{card.name}</span>
                  <button
                    onClick={() => removeCard(card.id)}
                    className="text-[#86868B] hover:text-[#C5221F] transition-colors p-0.5 rounded-full hover:bg-[#E5E5E7]"
                    title="Remove card from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Action Controls & Minimize X Button */}
            <div className="flex items-center gap-1 sm:gap-2 border-l border-[#E5E5E7] pl-2 sm:pl-4 shrink-0">
              <button
                onClick={clearAll}
                className="p-1.5 sm:p-2 text-[#86868B] hover:text-[#C5221F] hover:bg-[#F5F5F7] rounded-xl transition-colors"
                title="Clear all selected cards"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <a
                href="/compare"
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#1D1D1F] hover:bg-[#0066CC] text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all shadow-xs"
              >
                <span className="hidden sm:inline">Compare Now</span>
                <span className="sm:hidden">Compare</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>

              {/* Smooth Minimize X Button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 sm:p-1.5 text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors"
                title="Minimize comparison bar to circular logo button"
                aria-label="Minimize comparison bar to circular logo button"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

