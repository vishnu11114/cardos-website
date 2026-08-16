'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    subtitle: string;
    description: string;
    roi: string;
    steps: string[];
    banks: string[];
  } | null;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({ isOpen, onClose, feature }) => {
  // Lock body scroll when modal is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !feature) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="bg-white border border-[#E7E7E7] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 relative text-[#111111] my-auto"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#FAFAFA] border border-[#E7E7E7] flex items-center justify-center text-[#666666] hover:text-[#111111] hover:bg-[#F7F7F7] transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <Badge variant="indigo" size="md">
            Product Deep-Dive
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            {feature.title}
          </h3>
          <p className="text-sm text-[#2563EB] font-mono font-semibold">{feature.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-[#666666] leading-relaxed font-normal">
          {feature.description}
        </p>

        {/* ROI Banner */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#D97706]" />
            <span className="text-xs font-mono text-[#111111] font-bold">Estimated Annual Value Return</span>
          </div>
          <span className="text-lg font-bold font-mono text-[#D97706]">{feature.roi}</span>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-[#999999] tracking-wider font-bold">
            Autonomous Processing Steps
          </h4>
          <div className="space-y-2">
            {feature.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-[#FAFAFA] p-3 rounded-xl border border-[#E7E7E7] text-xs">
                <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0 font-mono font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span className="text-[#111111] font-medium leading-normal">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Compatibility Strip */}
        <div className="pt-2 border-t border-[#E7E7E7] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#666666] font-mono">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Compatible Banks:</span>
            <span className="text-[#111111] font-bold">{feature.banks.join(', ')}</span>
          </div>
          <Button variant="primary" size="sm" onClick={onClose} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Close Inspection
          </Button>
        </div>
      </div>
    </div>
  );
};
