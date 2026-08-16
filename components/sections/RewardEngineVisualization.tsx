'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { getSimulationResult, EngineCardResult } from '@/lib/rewardEngineDemoData';
import {
  CheckCircle2,
  XCircle,
  BarChart2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const RewardEngineVisualization = () => {
  const [selectedMerchant, setSelectedMerchant] = useState<string>('amazon');
  const [selectedAmount, setSelectedAmount] = useState<number>(45000);
  const [selectedGoal, setSelectedGoal] = useState<string>('total');
  const [showCalculation, setShowCalculation] = useState<boolean>(false);
  const [showRuleTraces, setShowRuleTraces] = useState<boolean>(false);

  const results: EngineCardResult[] = getSimulationResult(selectedMerchant, selectedAmount, selectedGoal);
  const winner = results[0];
  const runnerUp = results[1];
  const opportunityCost = winner.totalValue - runnerUp.totalValue;

  return (
    <section id="pay" suppressHydrationWarning className="scroll-mt-20 pt-6 pb-24 bg-gradient-to-b from-[#F7F5F0] via-[#FAF9F6] to-[#F5F2EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* Interactive Purchase Simulator Controls */}
        <div className="luxury-card p-6 bg-white border-[#E7E7E7] shadow-xl space-y-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#E7E7E7] pb-4">
            <span className="text-xs font-mono font-bold uppercase text-[#999999]">Interactive Transaction Simulator</span>
            <span className="text-xs font-mono text-[#2563EB] font-bold">Deterministic Grounding Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Merchant Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#111111] uppercase block">Merchant & Category</label>
              <select
                value={selectedMerchant}
                onChange={(e) => setSelectedMerchant(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#E7E7E7] rounded-xl px-3 py-2 text-xs font-mono text-[#111111] focus:outline-none cursor-pointer"
              >
                <option value="amazon">Amazon India (E-Commerce)</option>
                <option value="makemytrip">MakeMyTrip (International Flights)</option>
                <option value="swiggy">Swiggy & Zomato (Dining)</option>
                <option value="insurance">LIC Insurance (Exclusion Test)</option>
              </select>
            </div>

            {/* Amount Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#111111] uppercase block">Transaction Amount (₹)</label>
              <div className="flex gap-2">
                {[10000, 25000, 45000, 100000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${selectedAmount === amt
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FAFAFA] text-[#666666] border-[#E7E7E7] hover:text-[#111111]'
                      }`}
                  >
                    ₹{(amt / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#111111] uppercase block">Optimization Goal</label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#E7E7E7] rounded-xl px-3 py-2 text-xs font-mono text-[#111111] focus:outline-none cursor-pointer"
              >
                <option value="total">Maximize Total Value (₹)</option>
                <option value="travel">Maximize Travel AirMiles</option>
                <option value="cashback">Maximize Direct Cashback</option>
              </select>
            </div>
          </div>
        </div>

        {/* Winner Reveal & Live Card Ranking Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Winner Card Highlight */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="luxury-card p-6 bg-white border-[#E7E7E7] shadow-xl flex flex-col justify-between flex-1 space-y-5">
              <div className="flex items-center justify-between">
                <Badge variant="emerald" size="sm">
                  Recommended Card
                </Badge>
                <span className="text-xs font-mono text-[#16A34A] font-bold bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                  {winner.effectiveRate}
                </span>
              </div>

              <div className="relative h-48 w-full max-w-[340px] mx-auto rounded-2xl overflow-hidden border border-[#E5E5E7] shadow-xs bg-gradient-to-b from-[#FAFAF8] to-[#F5F2EB] flex items-center justify-center p-2">
                <Image src={winner.image} alt={winner.name} fill className="object-contain filter drop-shadow-md" priority unoptimized />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-[#111111] tracking-tight">{winner.name}</h3>
                <p className="text-xs font-mono text-[#999999]">{winner.bank}</p>
              </div>

              <div className="p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl space-y-1">
                <span className="text-xs font-mono font-bold text-[#D97706]">OPPORTUNITY COST SAVINGS</span>
                <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                  You gain <span className="text-[#16A34A] font-bold">₹{opportunityCost.toLocaleString('en-IN')} more estimated value</span> by swiping {winner.name} over your next-best card ({runnerUp.name}).
                </p>
              </div>
            </div>
          </div>

          {/* Card Evaluation Ranking List */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="luxury-card p-6 bg-white border-[#E7E7E7] shadow-xl flex flex-col justify-between flex-1 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E7E7E7] pb-4">
                <h4 className="font-bold text-base text-[#111111]">Card Portfolio Evaluation & Ranking</h4>
                <span className="text-xs font-mono text-[#999999]">Simulated Portfolio Evaluation</span>
              </div>

              <div className="space-y-4">
                {results.map((card) => (
                  <div
                    key={card.name}
                    className={`p-4 rounded-2xl border transition-all ${card.rank === 1
                      ? 'bg-white border-[#0066CC] shadow-md'
                      : 'bg-white border-[#E5E5E7] shadow-2xs'
                      }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-2">
                      <div className="flex items-center gap-2 font-bold">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${card.rank === 1 ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F] font-bold'
                            }`}
                        >
                          #{card.rank}
                        </span>
                        <span className="text-[#1D1D1F] font-bold">{card.name}</span>
                      </div>
                      <span className="font-bold text-[#D97706] text-sm">₹{card.totalValue.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Value Bar */}
                    <div className="w-full h-2 bg-[#F5F5F7] rounded-full overflow-hidden border border-[#E5E5E7] mb-2">
                      <div
                        className={`h-full ${card.rank === 1 ? 'bg-[#0066CC]' : 'bg-[#0066CC]/70'}`}
                        style={{
                          width: `${Math.max((card.totalValue / (winner.totalValue || 1)) * 100, 5)}%`,
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-[#1D1D1F] font-bold">
                      <span>Base: ₹{card.baseReward}</span>
                      <span>Accelerated: ₹{card.acceleratedReward}</span>
                      <span>Rate: {card.effectiveRate}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expandable Controls */}
              <div className="pt-4 border-t border-[#E5E5E7] flex items-center justify-between">
                <button
                  onClick={() => setShowCalculation(!showCalculation)}
                  className="text-xs font-mono font-bold text-[#0066CC] flex items-center gap-1 hover:underline"
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>{showCalculation ? 'Hide Calculation' : 'Show Calculation'}</span>
                  {showCalculation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setShowRuleTraces(!showRuleTraces)}
                  className="text-xs font-mono font-bold text-[#1D1D1F] flex items-center gap-1 hover:underline"
                >
                  <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                  <span>{showRuleTraces ? 'Hide Rule Trace' : 'Applied Rules & Exclusions'}</span>
                  {showRuleTraces ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Calculation Sheet */}
              {showCalculation && (
                <div className="bg-white p-4 rounded-xl border border-[#E5E5E7] space-y-2 text-xs font-mono animate-in fade-in duration-200">
                  <div className="flex justify-between border-b border-[#E5E5E7] pb-1">
                    <span className="text-[#1D1D1F] font-bold">Transaction Spend:</span>
                    <span className="font-bold text-[#1D1D1F]">{winner.calculation.transaction}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E5E7] pb-1">
                    <span className="text-[#1D1D1F] font-bold">Base Reward:</span>
                    <span className="font-bold text-[#1D1D1F]">{winner.calculation.basePoints}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E5E7] pb-1">
                    <span className="text-[#1D1D1F] font-bold">Multiplier Rate:</span>
                    <span className="font-bold text-[#0066CC]">{winner.calculation.multiplier}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E5E7] pb-1">
                    <span className="text-[#1D1D1F] font-bold">Cap Remaining:</span>
                    <span className="font-bold text-[#16A34A]">{winner.calculation.capRemaining}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm pt-1">
                    <span className="text-[#1D1D1F]">Net Return Value:</span>
                    <span className="text-[#D97706]">{winner.calculation.netValue}</span>
                  </div>
                </div>
              )}

              {/* Applied Rule Traces Sheet */}
              {showRuleTraces && (
                <div className="bg-white p-4 rounded-xl border border-[#E5E5E7] space-y-2 text-xs font-mono animate-in fade-in duration-200">
                  <span className="text-[#1D1D1F] block font-bold">DETERMINISTIC RULE APPLICATION TRACE</span>
                  {winner.ruleTraces.map((trace, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#1D1D1F] font-semibold">
                      {trace.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#DC2626] shrink-0" />
                      )}
                      <span>{trace.rule}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
