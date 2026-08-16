'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { fraudCaseDemoData } from '@/lib/fraudRecoveryDemoData';
import {
  X,
  ShieldAlert,
  PhoneCall,
  AlertTriangle,
  Copy,
  Check,
} from 'lucide-react';

interface FraudCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FraudCaseModal: React.FC<FraudCaseModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const letterText = `To,
The Nodal Officer / Fraud Control Desk,
HDFC Bank Ltd.

Subject: Formal Dispute & RBI Zero Liability Notification for Unauthorized Transaction (Case ${fraudCaseDemoData.caseId})

Respected Sir/Madam,

I am writing to formally report an unauthorized transaction on my credit card HDFC Infinia Metal Edition (•••• 4821).

Transaction Details:
- Date: 08 August 2026
- Amount: ₹12,499
- Merchant: Unrecognized Online POS (MCC 5399)

Under the Reserve Bank of India (RBI) Circular DBR.No.Leg.BC.78/09.07.005/2017-18, I am reporting this incident within 3 calendar days of occurrence. Consequently, my account qualifies for 100% Zero Customer Liability.

I request you to immediately block this transaction, issue a dispute reference number, and credit provisional shadow credit to my card statement.

Sincerely,
[Cardholder Name]
Contact: [Phone Number]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fraud-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-[#E5E5E7] overflow-hidden relative text-[#1D1D1F] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 sm:px-14 py-8 sm:py-10 space-y-6 max-h-[88vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#C1C1C6] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [scrollbar-width:thin] [scrollbar-color:#C1C1C6_transparent]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5E7] transition-all z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-1.5 border-b border-[#E5E5E7] pb-4 pr-10">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#C5221F]" />
              <span className="text-xs font-mono font-bold text-[#C5221F] uppercase tracking-wider">
                Prototype Case Command Center · {fraudCaseDemoData.caseId}
              </span>
            </div>
            <h2 id="fraud-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
              RBI Zero Liability Dispute Package
            </h2>
          </div>

          {/* Prototype Disclosure Banner */}
          <div className="bg-[#FEF7E0] border border-[#FEEFC3] p-4 rounded-2xl flex items-center gap-2 text-xs font-mono text-[#B06000]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Demo Prototype Case: CardOS prepares the dispute package; you must submit it to your issuer hotline.</span>
          </div>

          {/* Dispute Template Preview */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#1D1D1F] font-bold uppercase text-[10px]">PREPARED DISPUTE LETTER TEMPLATE</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F0F6FF] text-[#0066CC] border border-[#D2E3FC] text-xs font-bold hover:bg-[#0066CC] hover:text-white transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Dispute Letter'}</span>
              </button>
            </div>

            <textarea
              readOnly
              rows={10}
              value={letterText}
              className="w-full p-5 bg-[#FBFBFD] border border-[#E5E5E7] rounded-2xl text-xs font-mono text-[#1D1D1F] leading-relaxed focus:outline-none resize-none [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#C1C1C6] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [scrollbar-width:thin] [scrollbar-color:#C1C1C6_transparent]"
            />
          </div>

          {/* Bank Official Helpline Call-Out */}
          <div className="bg-[#E6F4EA] border border-[#CEEAD6] p-4 sm:p-5 rounded-2xl space-y-2 text-xs font-mono text-[#137333]">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>HDFC Official Fraud Hotline: 1800 202 6161</span>
              </span>
              <span className="text-[10px] bg-white px-2.5 py-1 rounded-full border border-[#CEEAD6]">24×7 Toll-Free</span>
            </div>
            <p className="font-sans text-xs text-[#1D1D1F] font-semibold">
              Call your bank immediately, provide Case {fraudCaseDemoData.caseId}, and request an official Bank Incident Reference Number.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex justify-end pt-2">
            <Button variant="secondary" size="md" onClick={onClose}>
              Close Case Window
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
