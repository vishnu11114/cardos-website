'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ContextSubNav } from '@/components/layout/ContextSubNav';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { CardDetailModal } from '@/components/ui/CardDetailModal';
import { Badge } from '@/components/ui/Badge';
import { getCardById, CardSpec } from '@/lib/cardsCatalogData';
import { copilotScenarios } from '@/lib/copilotDemoData';
import {
  Bot,
  Send,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
  CreditCard,
  Zap,
  MessageSquare,
} from 'lucide-react';

interface HistoryThread {
  id: string;
  scenarioId: string;
  category: string;
  prompt: string;
  timestamp: string;
}

export default function CopilotWorkspacePage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string>('amazon');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // List of question/answer history threads
  const [threads, setThreads] = useState<HistoryThread[]>([
    {
      id: 'amazon',
      scenarioId: 'amazon',
      category: 'E-Commerce / Shopping',
      prompt: "I'm spending ₹45,000 on Amazon India. Which card should I use for maximum return?",
      timestamp: '10:42 AM',
    },
    {
      id: 'travel',
      scenarioId: 'travel',
      category: 'Flights & International Travel',
      prompt: "Which card is best for booking ₹85,000 international flight tickets & hotel stays?",
      timestamp: '10:44 AM',
    },
    {
      id: 'croma',
      scenarioId: 'croma',
      category: 'Electronics & Appliances',
      prompt: "Buying a ₹1,20,000 Macbook Pro at Croma. How can I stack reward points + bank instant discount?",
      timestamp: '10:48 AM',
    },
  ]);

  const [showCalcMap, setShowCalcMap] = useState<Record<string, boolean>>({});
  const [selectedCardModal, setSelectedCardModal] = useState<CardSpec | null>(null);

  // Active selected thread data
  const currentThread = threads.find((t) => t.id === selectedThreadId) || threads[0];
  const activeScenario = copilotScenarios[currentThread.scenarioId] || copilotScenarios.amazon;

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
  };

  const handleNewQuestion = (scenarioId: string, customPrompt?: string) => {
    setIsTyping(true);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newId = `${scenarioId}-${Date.now()}`;
    const sc = copilotScenarios[scenarioId] || copilotScenarios.amazon;

    const newThread: HistoryThread = {
      id: newId,
      scenarioId,
      category: sc.category,
      prompt: customPrompt || sc.prompt,
      timestamp: now,
    };

    setThreads((prev) => [newThread, ...prev]);
    setSelectedThreadId(newId);

    setTimeout(() => {
      setIsTyping(false);
    }, 400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const q = inputQuery.toLowerCase();
    let targetId = 'amazon';
    if (q.includes('flight') || q.includes('travel') || q.includes('hotel') || q.includes('forex') || q.includes('air')) {
      targetId = 'travel';
    } else if (q.includes('croma') || q.includes('laptop') || q.includes('elec') || q.includes('apple') || q.includes('gadget')) {
      targetId = 'croma';
    }

    const currentText = inputQuery;
    setInputQuery('');
    handleNewQuestion(targetId, currentText);
  };

  const toggleCalculation = (threadId: string) => {
    setShowCalcMap((prev) => ({ ...prev, [threadId]: !prev[threadId] }));
  };

  const handleResetChat = () => {
    setSelectedThreadId('amazon');
    setThreads([
      {
        id: 'amazon',
        scenarioId: 'amazon',
        category: 'E-Commerce / Shopping',
        prompt: "I'm spending ₹45,000 on Amazon India. Which card should I use for maximum return?",
        timestamp: '10:42 AM',
      },
    ]);
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FAF9F6] text-[#1D1D1F] relative">
      <Navbar />

      {/* Chapter Context Navigation SubNav */}
      <ContextSubNav
        currentChapterId="copilot"
        pageTitle="AI Copilot & Grounded Reasoning"
        badgeLabel="Conversational AI Active"
        badgeType="blue"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-6">
        {/* Intro Hero Heading Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <Badge variant="indigo" size="md">
              <Bot className="w-3.5 h-3.5 mr-1 text-[#0066CC]" />
              CardOS Financial Copilot
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            Ask anything about your cards <br />
            <span className="font-serif italic font-normal text-[#0066CC]">
              & get grounded mathematical proof.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed font-sans font-semibold max-w-xl mx-auto">
            Get instant grounded recommendations for shopping, flight bookings, lounge eligibility, or forex markup fees. Answers are backed by verified bank source T&Cs.
          </p>
        </div>

        {/* Top Prominent AI Search & Input Box */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-lg border border-[#E5E5E7] space-y-3 transition-all focus-within:ring-2 focus-within:ring-[#0066CC]/50">

          <form onSubmit={handleFormSubmit} className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#F0F6FF] text-[#0066CC] shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Ask Copilot: e.g. Spending ₹45,000 on Amazon, or best card for forex fees?"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base font-sans text-[#1D1D1F] focus:outline-none placeholder:text-[#1D1D1F]/70 font-medium"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-3 rounded-2xl bg-[#1D1D1F] text-white hover:bg-[#0066CC] disabled:opacity-30 disabled:hover:bg-[#1D1D1F] transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
              aria-label="Send AI Query"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
            <span className="text-[11px] text-[#1D1D1F] font-extrabold uppercase tracking-wider mr-1">Quick Prompts:</span>
            {[
              { id: 'amazon', label: '🛍️ ₹45,000 on Amazon India' },
              { id: 'travel', label: '✈️ International Flight & Hotel' },
              { id: 'croma', label: '💻 Croma Electronics Laptop' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleNewQuestion(chip.id)}
                className="px-3 py-1 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer bg-[#F5F5F7] text-[#1D1D1F] border-[#E5E5E7] hover:bg-[#E5E5E7] active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column AI Workspace Grid: Question Buttons (Left) & Active Answer Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDE PANEL (4 Cols): Question & Answer Buttons History */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-[#E5E5E7] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-3 text-[#1D1D1F]">
                <span className="font-mono font-extrabold uppercase text-xs tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#0066CC]" />
                  <span>Previous Questions</span>
                </span>
                <span className="text-[10px] font-mono font-extrabold bg-[#F0F6FF] text-[#0066CC] px-2.5 py-0.5 rounded-full border border-[#D2E3FC]">
                  {threads.length} Questions
                </span>
              </div>

              {/* Question Buttons List */}
              <div className="space-y-2.5">
                {threads.map((thread) => {
                  const isSelected = selectedThreadId === thread.id;
                  return (
                    <button
                      key={thread.id}
                      onClick={() => handleSelectThread(thread.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 active:scale-98 ${isSelected
                          ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-md ring-2 ring-[#0066CC]/30'
                          : 'bg-[#FAF9F6] text-[#1D1D1F] border-[#E5E5E7] hover:border-[#0066CC] hover:bg-white'
                        }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-extrabold">
                        <span className={isSelected ? 'text-[#60A5FA] font-extrabold' : 'text-[#0066CC]'}>
                          {thread.category}
                        </span>
                        <span className={isSelected ? 'text-white/80' : 'text-[#1D1D1F]'}>{thread.timestamp}</span>
                      </div>
                      <p className={`text-xs font-sans font-bold leading-relaxed line-clamp-2 ${isSelected ? 'text-white' : 'text-[#1D1D1F]'}`}>
                        {thread.prompt}
                      </p>
                      {isSelected && (
                        <div className="pt-1 flex items-center gap-1 text-[10px] font-mono text-[#4ADE80] font-extrabold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Answer Open →</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reset History Action */}
              <button
                onClick={handleResetChat}
                className="w-full py-2.5 rounded-xl border border-[#E5E5E7] text-[#1D1D1F] font-mono font-extrabold text-xs hover:bg-[#F5F5F7] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear History & Reset</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE PANEL (8 Cols): Active Question & Detailed Explanation Card */}
          <div className="lg:col-span-8 space-y-6">
            {/* User Question Bubble */}
            <div className="flex justify-end">
              <div className="bg-[#1D1D1F] text-white p-4 sm:p-5 rounded-3xl rounded-tr-xs max-w-xl text-sm font-sans shadow-sm space-y-1">
                <span className="text-[10px] text-white font-mono font-bold uppercase tracking-wider block">
                  You Asked · {currentThread.timestamp}
                </span>
                <p className="leading-relaxed font-bold">
                  {currentThread.prompt}
                </p>
              </div>
            </div>

            {/* AI Assistant Explanation Card */}
            {isTyping ? (
              <div className="flex items-center gap-3 p-6 bg-white rounded-3xl border border-[#E5E5E7] w-fit shadow-xs font-mono text-xs text-[#0066CC]">
                <Bot className="w-5 h-5 animate-spin text-[#0066CC]" />
                <span className="font-bold">CardOS AI is retrieving reward rules & bank source T&Cs...</span>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E7] shadow-sm space-y-6 text-xs sm:text-sm animate-in fade-in duration-300">
                {/* AI Reasoning Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E7] pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] font-mono text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Reward Engine Calculated</span>
                    </span>
                    <span className="bg-[#EFF6FF] text-[#0066CC] border border-[#D2E3FC] font-mono text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5" />
                      <span>Grounded T&C Proof</span>
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#1D1D1F] font-bold">Verified Bank Source</span>
                </div>

                {/* Primary Card Recommendation Header */}
                <div className="bg-gradient-to-br from-[#FAF9F6] to-[#F5F5F7] p-5 sm:p-6 rounded-2xl border border-[#E5E5E7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[#0066CC] font-bold text-xs uppercase tracking-wider block">
                      {activeScenario.bestCard.bank}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                      {activeScenario.bestCard.name}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right font-mono bg-white p-3.5 rounded-xl border border-[#E5E5E7] shadow-2xs shrink-0">
                    <span className="text-[#137333] font-bold text-2xl block">{activeScenario.bestCard.expectedValue}</span>
                    <span className="text-[#0066CC] font-bold text-xs block mt-0.5">{activeScenario.bestCard.effectiveRate}</span>
                  </div>
                </div>

                {/* Grounded Pros & Reason */}
                <div className="space-y-3 border-t border-[#E5E5E7] pt-4">
                  <span className="font-mono font-extrabold uppercase text-[#1D1D1F] text-[11px] tracking-wider block">
                    Grounded Reason & Multipliers
                  </span>
                  <div className="space-y-2 text-xs sm:text-sm text-[#1D1D1F]">
                    {activeScenario.whyThisCard.pros.map((pro, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 bg-[#F8F9FA] p-3 rounded-xl border border-[#E5E5E7]">
                        <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5 stroke-[2]" />
                        <span className="leading-relaxed font-semibold text-[#1D1D1F]">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Mathematical Calculation Drawer */}
                <div className="border-t border-[#E5E5E7] pt-4">
                  <button
                    onClick={() => toggleCalculation(currentThread.id)}
                    className="flex items-center justify-between w-full font-mono font-bold text-[#0066CC] text-xs sm:text-sm hover:underline cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-[#0066CC]" />
                      <span>Step-by-Step Mathematical Calculation Breakdown</span>
                    </span>
                    {showCalcMap[currentThread.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showCalcMap[currentThread.id] && (
                    <div className="mt-3 p-4 sm:p-5 bg-[#F5F5F7] rounded-2xl border border-[#E5E5E7] space-y-2.5 font-mono text-xs text-[#1D1D1F] animate-in fade-in duration-200">
                      <div className="flex justify-between"><span className="font-semibold text-[#1D1D1F]">Transaction Amount:</span><strong className="text-[#1D1D1F] font-bold">{activeScenario.calculation.transaction}</strong></div>
                      <div className="flex justify-between"><span className="font-semibold text-[#1D1D1F]">Base Earnings:</span><strong className="text-[#1D1D1F] font-bold">{activeScenario.calculation.basePoints}</strong></div>
                      <div className="flex justify-between"><span className="font-semibold text-[#1D1D1F]">Multiplier:</span><strong className="text-[#B06000] font-bold">{activeScenario.calculation.multiplier}</strong></div>
                      <div className="flex justify-between"><span className="font-semibold text-[#1D1D1F]">Point Valuation:</span><strong className="text-[#0066CC] font-bold">{activeScenario.calculation.pointValuation}</strong></div>
                      <div className="flex justify-between border-t border-[#E5E5E7] pt-2"><span className="font-bold text-[#1D1D1F]">Net Return Value:</span><strong className="text-[#137333] text-base">{activeScenario.calculation.totalValue}</strong></div>
                    </div>
                  )}
                </div>

                {/* Verified Source Citation */}
                <div className="bg-[#E6F4EA] border border-[#CEEAD6] p-3.5 rounded-2xl flex items-center gap-3 font-mono text-xs text-[#137333]">
                  <ShieldCheck className="w-5 h-5 shrink-0 stroke-[2]" />
                  <div>
                    <span className="font-bold uppercase block text-[10px]">Verified Bank Source Citation</span>
                    <span className="text-[#1D1D1F] font-bold">
                      {activeScenario.sources[0].issuer} {activeScenario.sources[0].card} T&C ({activeScenario.sources[0].verifiedDate})
                    </span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#E5E5E7]">
                  <button
                    onClick={() => {
                      const c = getCardById(activeScenario.bestCard.cardId);
                      if (c) setSelectedCardModal(c);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#1D1D1F] text-white hover:bg-black font-mono text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 inline-flex items-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Inspect Card Details</span>
                  </button>
                  <Link href="/rewards">
                    <button className="px-4 py-2.5 rounded-xl bg-white border border-[#E5E5E7] hover:bg-[#F5F5F7] font-mono text-xs font-bold text-[#1D1D1F] transition-all cursor-pointer shadow-2xs active:scale-95 inline-flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#0066CC]" />
                      <span>Calculate Reward Scenario →</span>
                    </button>
                  </Link>
                </div>

                {/* Follow-Up Question Chips */}
                <div className="space-y-2 pt-4 border-t border-[#E5E5E7]">
                  <span className="font-mono text-[11px] font-extrabold uppercase text-[#1D1D1F]">Suggested Follow-Up Questions:</span>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {activeScenario.followUps.map((fUp, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => handleNewQuestion(currentThread.scenarioId, fUp)}
                        className="px-3.5 py-1.5 rounded-full bg-[#F0F6FF] text-[#0066CC] border border-[#D2E3FC] hover:bg-[#0066CC] hover:text-white transition-all cursor-pointer font-bold active:scale-95"
                      >
                        {fUp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Detail Modal */}
      <CardDetailModal
        card={selectedCardModal}
        isOpen={!!selectedCardModal}
        onClose={() => setSelectedCardModal(null)}
      />

      <FooterCTA />
    </main>
  );
}


