'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { maskCardNumber } from '@/lib/design-system/formatters';

export interface CreditCardVisualProps {
  cardName: string;
  bankName: string;
  lastFour?: string;
  imageSrc?: string;
  activeMultiplier?: string;
  className?: string;
}

export const CreditCardVisual: React.FC<CreditCardVisualProps> = ({
  cardName,
  bankName,
  lastFour = '4821',
  imageSrc,
  activeMultiplier,
  className = '',
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseXPos = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="perspective-1000 w-full max-w-sm"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative aspect-[1.586/1] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-[#1D1D1F]/10 bg-[#F5F5F7] ${className}`}
      >
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={cardName}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover w-full h-full rounded-2xl scale-[1.03] transition-transform duration-500 group-hover:scale-105"
            />
            {/* Glass Glare & Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/35 pointer-events-none rounded-2xl" />
            {/* Glass Edge Ring */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none" />
          </>
        ) : (
          <div className="p-6 flex flex-col justify-between h-full relative z-10 bg-[#1D1D1F] text-white">
            {/* Card Top Row */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#86868B]">
                {bankName}
              </span>
              {activeMultiplier && (
                <span className="text-[10px] font-mono font-bold bg-[#E6F4EA] text-[#137333] px-2.5 py-0.5 rounded-full border border-[#CEEAD6]">
                  {activeMultiplier}
                </span>
              )}
            </div>

            {/* EMV Chip & Contactless Visual */}
            <div className="flex items-center gap-3 my-2">
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#FEF7E0] to-[#B06000] border border-[#FEEFC3] shadow-xs" />
              <div className="text-[10px] font-mono text-[#86868B] font-bold">●)))</div>
            </div>

            {/* Card Number */}
            <div className="font-mono text-lg font-bold tracking-widest text-white tabular-nums">
              {maskCardNumber(lastFour)}
            </div>

            {/* Card Bottom Row */}
            <div className="flex justify-between items-end text-xs font-mono">
              <div>
                <span className="text-[9px] text-[#86868B] uppercase block font-bold">CARDHOLDER</span>
                <span className="font-bold text-white tracking-wide">VIKRAM SINGH</span>
              </div>
              <div>
                <span className="text-[9px] text-[#86868B] uppercase block font-bold">EXPIRES</span>
                <span className="font-bold text-white tabular-nums">12/28</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
