'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CreditCard } from 'lucide-react';

const CARDS = [
  { key: 'axis', img: '/cards/axis-atlas.png', name: 'Axis Atlas', num: '•••• 2109' },
  { key: 'amex', img: '/cards/amex-platinum.png', name: 'Amex Platinum', num: '•••• 7997' },
  { key: 'sbi', img: '/cards/sbi-elite.png', name: 'SBI Elite', num: '•••• 9012' },
  { key: 'kotak', img: '/cards/kotak-cashback-plus.png', name: 'Kotak Cashback+', num: '•••• 3456' },
  { key: 'idfc', img: '/cards/idfc-gaj.png', name: 'IDFC Gaj', num: '•••• 3456' },
];

const FLOW = ['OPEN', 'FACE ID', 'WALLET', 'TAP', 'PAID'];

const css = `
@keyframes nfcPing{0%{transform:translate(-50%,-50%) scale(.15);opacity:1}100%{transform:translate(-50%,-50%) scale(3.6);opacity:0}}
@keyframes nfcPulse{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes cardIdle{0%,100%{transform:rotateX(5deg) rotateY(-6deg) translateY(0)}50%{transform:rotateX(2deg) rotateY(-2deg) translateY(-5px)}}
@keyframes sheen{0%{transform:translateX(-150%) skewX(-20deg)}100%{transform:translateX(250%) skewX(-20deg)}}
@keyframes fidRotate{to{transform:rotate(360deg)}}
@keyframes fidDots{0%,100%{opacity:.2;transform:scale(.9)}50%{opacity:1;transform:scale(1.1)}}
@keyframes appleCheck{0%{transform:scale(.4);opacity:0}65%{transform:scale(1.12);opacity:1}100%{transform:scale(1);opacity:1}}
@keyframes laserScan{0%,100%{transform:translateY(-12px);opacity:.2}50%{transform:translateY(12px);opacity:.9}}
@keyframes posGlow{0%,100%{filter:drop-shadow(0 24px 44px rgba(15,30,70,.28))}50%{filter:drop-shadow(0 24px 44px rgba(11,132,254,.35))}}
@media (max-width: 640px) {
  .pay-demo-stage {
    transform: scale(0.84);
    transform-origin: center center;
    height: 490px !important;
  }
}
@media (max-width: 400px) {
  .pay-demo-stage {
    transform: scale(0.74);
    transform-origin: center center;
    height: 440px !important;
  }
}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;

export const CardOSPayDemo = () => {
  const [phase, setPhase] = useState(0);
  const [fidStatus, setFidStatus] = useState('Position face in frame');
  const [fidDone, setFidDone] = useState(false);
  const [fidStep, setFidStep] = useState<'icon' | 'scanning' | 'done'>('icon');
  const [selected, setSelected] = useState<number | null>(null);
  const [tapping, setTapping] = useState(false);
  const [nfcActive, setNfcActive] = useState(false);
  const [posState, setPosState] = useState('PRESENT CARD');
  const [posAmt, setPosAmt] = useState('₹4,500');
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  const timers = useRef<NodeJS.Timeout[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const after = useCallback((ms: number, fn: () => void) => {
    const timer = setTimeout(fn, ms);
    timers.current.push(timer);
  }, []);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearAll, [clearAll]);

  const flowIdx = phase === 0 ? 0 : phase === 1 ? 1 : phase === 2 ? 2 : phase < 5 ? 3 : 4;

  const pickCard = useCallback((idx: number) => {
    clearAll();
    setSelected(idx);
    setPhase(2);
    after(700, () => {
      setPhase(3);
      after(1300, () => {
        setTapping(true);
        after(1650, () => {
          setNfcActive(true);
          setPosState('READING…');
          after(1400, () => {
            setNfcActive(false);
            setPhase(4);
            setPosState('AUTHORISING');
            after(1900, () => {
              setPhase(5);
              setPosAmt('APPROVED');
              setPosState('REMOVE CARD');
              after(900, () => setTapping(false));
            });
          });
        });
      });
    });
  }, [after, clearAll]);

  const startFlow = useCallback(() => {
    clearAll();
    setPhase(1);
    setFidDone(false);
    setFidStep('icon');
    setFidStatus('Position face in frame');
    after(700, () => {
      setFidStep('scanning');
      setFidStatus('Verifying Face ID…');
    });
    after(2100, () => {
      setFidStep('done');
      setFidDone(true);
      setFidStatus('✓ Face ID Verified');
    });
    after(2900, () => {
      setPhase(2);
      // Auto pick Axis Atlas after Face ID
      after(800, () => {
        pickCard(0);
      });
    });
  }, [after, clearAll, pickCard]);

  // Scroll trigger IntersectionObserver to run animation smoothly on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAutoTriggered) {
          setHasAutoTriggered(true);
          startFlow();
        }
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoTriggered, startFlow]);

  const restart = () => {
    clearAll();
    setPhase(0);
    setSelected(null);
    setTapping(false);
    setNfcActive(false);
    setPosState('PRESENT CARD');
    setPosAmt('₹4,500');
    setFidDone(false);
    setFidStep('icon');
    startFlow();
  };

  const card = selected != null ? CARDS[selected] : CARDS[0];
  const showPos = phase >= 3;

  const phoneTransform =
    phase === 1
      ? 'translate(-58%,-50%) rotateY(-2deg) rotateX(9deg)'
      : tapping
        ? 'translate(-46%,-49%) rotateY(14deg) rotateX(2deg) rotateZ(-3deg) scale(.99)'
        : phase === 5
          ? 'translate(-52%,-50%) rotateY(-8deg) rotateX(3deg)'
          : 'translate(-58%,-50%) rotateY(-10deg) rotateX(3deg)';

  const S = styles;
  return (
    <section id="pay" suppressHydrationWarning ref={containerRef} style={{ ...S.page, scrollMarginTop: '80px' }}>
      <style>{css}</style>

      {/* ── CENTERED TOP FEATURE HEADER ── */}
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#800020]">
          <span className="font-serif italic font-normal text-[#800020]">
            UPCOMING FEATURE
          </span>
        </h2>
        <p className="text-sm sm:text-base font-mono font-bold text-[#1D1D1F] tracking-wide">
          Future Tap & Pay Concept
        </p>
      </div>

      {/* ── MAIN LEFT-ALIGNED SECTION HEADER ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            PAY. <br />
            <span className="font-serif italic font-normal text-[#0066CC]">
              Use the right card & Tap to Pay seamlessly.
            </span>
          </h2>

          <p className="text-base text-[#6E6E73] leading-relaxed font-sans">
            CardOS eliminates friction at checkout with 1-Tap NFC payment, routing every transaction to your optimum card with instant rupee valuation and 5x voucher multipliers.
          </p>
        </div>
      </div>

      {/* ── 3D STAGE & SIDE STATUS PANEL GRID ── */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4">
        {/* LEFT: 3D INTERACTIVE STAGE */}
        <div className="lg:col-span-8 relative overflow-hidden">
          <div className="pay-demo-stage" style={S.scene}>
            <div style={S.floor} />

            {/* ── ISOMETRIC POS — half hidden behind the phone ── */}
            <div
              style={{
                ...S.pos,
                opacity: showPos ? 1 : 0,
                transform: showPos
                  ? 'translate(-96px,-58%) scale(.94)'
                  : 'translate(60px,-160px) scale(.8)',
                animation: showPos && phase >= 3 ? 'posGlow 2.4s ease-in-out infinite' : 'none',
              }}
            >
              <PosTerminal amt={posAmt} state={posState} nfcHot={nfcActive} />
              <div style={S.posShadow} />
            </div>

            {/* ── PHONE (main focus, in front) ── */}
            <div
              style={{ ...S.phone, transform: phoneTransform }}
              onClick={() => phase === 0 && startFlow()}
            >
              <div style={S.frame} />
              <div style={{ ...S.btn, right: -4, top: 118, height: 58 }} />
              <div style={{ ...S.btn, left: -4, top: 100, height: 32 }} />
              <div style={{ ...S.btn, left: -4, top: 142, height: 60 }} />

              <div style={S.screen}>
                {/* 0 HOME */}
                <Screen on={phase === 0}>
                  <StatusBar />
                  <div style={S.home}>
                    <div style={S.logo}>CardOS</div>
                    <div style={S.logoSub}>SMART WALLET</div>
                    <button
                      style={S.payBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        startFlow();
                      }}
                    >
                      Pay now
                    </button>
                    <div style={S.tapHint}>Tap the phone to begin</div>
                  </div>
                </Screen>

                {/* 1 REALISTIC APPLE FACE ID */}
                <Screen on={phase === 1}>
                  <StatusBar />
                  <div style={S.fid}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                      <div style={S.fidT}>Face ID</div>
                      <div style={{ ...S.fidS, color: fidDone ? '#30D158' : '#0B84FE' }}>
                        {fidStatus}
                      </div>
                    </div>
                  </div>
                </Screen>

                {/* 2 WALLET */}
                <Screen on={phase === 2}>
                  <StatusBar />
                  <div style={S.wlt}>
                    <div style={S.wltHead}>
                      <span style={S.wltTitle}>Wallet</span>
                      <span style={S.wltAdd}>+</span>
                    </div>
                    <div style={S.wStack}>
                      {CARDS.map((c, i) => (
                        <div
                          key={c.key}
                          onClick={(e) => {
                            e.stopPropagation();
                            pickCard(i);
                          }}
                          style={{
                            ...S.wCard,
                            top: selected === i ? 8 : i * 55,
                            zIndex: selected === i ? 30 : 10 - i,
                            opacity: selected != null && selected !== i ? 0 : 1,
                            transform:
                              selected === i
                                ? 'scale(1.05)'
                                : selected != null
                                  ? 'translateY(64px) scale(.9)'
                                  : 'none',
                            boxShadow:
                              selected === i
                                ? '0 22px 44px rgba(0,90,220,.42)'
                                : '0 10px 24px rgba(15,30,70,.25), 0 2px 6px rgba(15,30,70,.12)',
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={c.img} alt={c.name} style={S.wImg} />
                          <div style={S.wGlare} />
                        </div>
                      ))}
                    </div>
                    <div style={S.wltFoot}>Tap a card to pay</div>
                  </div>
                </Screen>

                {/* 3 PAY READY */}
                <Screen on={phase === 3}>
                  <StatusBar />
                  <div style={S.pay}>
                    <div style={S.payArcs}>
                      {[
                        { w: 22, h: 11, o: 1, d: '0s' },
                        { w: 34, h: 17, o: 0.55, d: '.2s' },
                        { w: 48, h: 24, o: 0.25, d: '.4s' },
                      ].map((a, i) => (
                        <div
                          key={i}
                          style={{
                            width: a.w,
                            height: a.h,
                            opacity: a.o,
                            border: '2.6px solid #0B84FE',
                            borderBottom: 'none',
                            borderRadius: '80px 80px 0 0',
                            animation: `nfcPulse 1.6s ease-in-out ${a.d} infinite`,
                          }}
                        />
                      ))}
                    </div>
                    <div style={S.payCardHolder}>
                      <div style={S.payCard}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.img} alt={card.name} style={{ width: '100%', display: 'block' }} />
                        <div style={S.sheen} />
                      </div>
                    </div>
                    <div style={S.payAmt}>₹4,500</div>
                    <div style={S.payHold}>Hold near reader</div>
                  </div>
                </Screen>

                {/* 4 PROCESSING */}
                <Screen on={phase === 4}>
                  <StatusBar />
                  <div style={S.proc}>
                    <div style={S.ring} />
                    <div style={S.procT}>Processing…</div>
                  </div>
                </Screen>

                {/* 5 DONE */}
                <Screen on={phase === 5}>
                  <StatusBar />
                  <div style={S.done}>
                    <div style={S.doneC}>
                      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                        <path
                          d="M10 20 L17 27 L30 12"
                          stroke="#fff"
                          strokeWidth="3.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="55"
                          strokeDashoffset={phase === 5 ? 0 : 55}
                          style={{ transition: 'stroke-dashoffset .6s ease .2s' }}
                        />
                      </svg>
                    </div>
                    <div style={S.doneL}>PAYMENT DONE</div>
                    <div style={S.doneA}>₹4,500</div>
                    <div style={S.doneCd}>
                      {card.name} {card.num}
                    </div>
                  </div>
                </Screen>
              </div>

              <div style={S.glare} />

              {/* ── EXPANDING DYNAMIC ISLAND (Exact Apple iOS 17/18 Dynamic Island Face ID Animation) ── */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: phase === 1 ? 98 : 90,
                  height: phase === 1 ? 98 : 26,
                  borderRadius: phase === 1 ? 26 : 16,
                  background: '#000000',
                  border: phase === 1 ? '1.5px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: phase === 1 ? '0 16px 36px rgba(0,0,0,0.65)' : 'none',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {phase === 1 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    {/* 1. Initial State: Lime Green Apple Face ID Face Icon (Screenshot 3) */}
                    {fidStep === 'icon' && (
                      <div style={{ animation: 'appleCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
                        <svg width="54" height="54" viewBox="0 0 56 56" fill="none">
                          <circle cx="28" cy="28" r="25" stroke="#30D158" strokeWidth="3" />
                          <rect x="20" y="19" width="3" height="6" rx="1.5" fill="#30D158" />
                          <rect x="33" y="19" width="3" height="6" rx="1.5" fill="#30D158" />
                          <path d="M28 22 V30 H31" stroke="#30D158" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M20 36 Q28 43 36 36" stroke="#30D158" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}

                    {/* 2. Scanning State: Lime Green 3D Orbital Spinning Ring (Screenshot 1) */}
                    {fidStep === 'scanning' && (
                      <div style={{ position: 'relative', width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="54" height="54" viewBox="0 0 56 56" fill="none" style={{ animation: 'fidRotate 1s linear infinite' }}>
                          <ellipse cx="28" cy="28" rx="23" ry="15" stroke="#30D158" strokeWidth="3.2" strokeDasharray="35 15" transform="rotate(-25 28 28)" />
                          <ellipse cx="28" cy="28" rx="23" ry="15" stroke="#30D158" strokeWidth="2" strokeDasharray="20 20" opacity="0.6" transform="rotate(35 28 28)" />
                        </svg>
                      </div>
                    )}

                    {/* 3. Verified State: Lime Green Checkmark inside Circle (Screenshot 2) */}
                    {fidStep === 'done' && (
                      <div style={{ animation: 'appleCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
                        <svg width="54" height="54" viewBox="0 0 56 56" fill="none">
                          <circle cx="28" cy="28" r="25" stroke="#30D158" strokeWidth="3.5" fill="none" />
                          <path d="M18 28 L25 35 L38 20" stroke="#30D158" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={S.cam} />
                )}
              </div>

              <div
                style={{
                  ...S.phShadow,
                  transform: tapping ? 'translateX(84px) scaleX(.78)' : 'none',
                  opacity: tapping ? 0.65 : 1,
                }}
              />
            </div>

            {/* NFC waves at contact point */}
            {nfcActive && (
              <div style={{ position: 'absolute', left: '58%', top: '42%', zIndex: 26, pointerEvents: 'none' }}>
                {[0, 430, 860].map((d) => (
                  <div
                    key={d}
                    style={{
                      position: 'absolute',
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      border: '2.2px solid rgba(11,132,254,.6)',
                      boxShadow: '0 0 14px rgba(11,132,254,.35), inset 0 0 8px rgba(11,132,254,.15)',
                      animation: `nfcPing 1.3s ease-out ${d}ms infinite`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: SIDE STATUS & CONTROLS PANEL */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white border border-[#E7E7E7] shadow-xl rounded-3xl space-y-6">
            {/* Live Status Badge Header */}
            <div className="flex items-center justify-between border-b border-[#E7E7E7] pb-4">
              <span className="text-xs font-mono font-bold uppercase text-[#999999]">Live Transaction Status</span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${phase === 5
                  ? 'text-[#16A34A] bg-[#ECFDF5] border-[#A7F3D0]'
                  : 'text-[#2563EB] bg-[#EFF6FF] border-[#BFDBFE]'
                }`}>
                <span className={`w-2 h-2 rounded-full ${phase === 5 ? 'bg-[#16A34A]' : 'bg-[#2563EB] animate-ping'}`} />
                {narration(phase, nfcActive)[0]}
              </span>
            </div>

            {/* Status Text Narration */}
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                {narration(phase, nfcActive)[0]}
              </h3>
              <p className="text-sm text-[#666666] font-medium leading-relaxed">
                {narration(phase, nfcActive)[1]}
              </p>
            </div>

            {/* Step Timeline Progress */}
            <div className="space-y-2.5 pt-2 border-t border-[#F0F0F0]">
              {FLOW.map((stepName, i) => (
                <div key={stepName} className="flex items-center justify-between text-xs font-mono">
                  <span className={`font-semibold ${flowIdx >= i ? 'text-[#111111]' : 'text-[#A1A1AA]'}`}>
                    {i + 1}. {stepName}
                  </span>
                  <span className={`text-[11px] font-bold ${flowIdx >= i ? 'text-[#0B84FE]' : 'text-[#D4D4D8]'}`}>
                    {flowIdx > i ? '✓ Done' : flowIdx === i ? '● Active' : '○ Waiting'}
                  </span>
                </div>
              ))}
            </div>

            {/* Replay & Action Control Button */}
            <div className="pt-4 border-t border-[#E7E7E7] flex items-center justify-center">
              {phase === 5 && (
                <button
                  onClick={restart}
                  className="w-full py-3 bg-[#111111] hover:bg-[#000000] text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Tap and Pay</span>
                </button>
              )}
              {phase === 0 && (
                <button
                  onClick={startFlow}
                  className="w-full py-3 bg-[#0B84FE] hover:bg-[#0066CC] text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Tap and Pay</span>
                </button>
              )}
              {phase > 0 && phase < 5 && (
                <div className="w-full py-3 bg-[#FAFAFA] border border-[#E7E7E7] text-[#86868B] text-xs font-mono font-bold rounded-2xl text-center">
                  Processing step {phase + 1} of 5…
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Sub-components ───────────────────────────────────────────────────────────
function Screen({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        opacity: on ? 1 : 0,
        pointerEvents: on ? 'auto' : 'none',
        transition: 'opacity .55s ease',
      }}
    >
      {children}
    </div>
  );
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  const iconColor = dark ? '#FFFFFF' : '#1D1D1F';
  return (
    <div
      style={{
        height: 44,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 22px 6px',
        flexShrink: 0,
        color: iconColor,
        zIndex: 60,
        position: 'relative',
      }}
    >
      {/* Authentic iOS Time */}
      <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", letterSpacing: '-0.2px' }}>
        9:41
      </span>

      {/* Authentic Apple iOS Status Icons (5G Signal + Wi-Fi + Battery) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* 5G Cellular Signal (4 Ascending Rounded Bars) */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="8" width="2.8" height="3" rx="0.8" fill={iconColor} />
          <rect x="4.2" y="5.5" width="2.8" height="5.5" rx="0.8" fill={iconColor} />
          <rect x="8.4" y="3" width="2.8" height="8" rx="0.8" fill={iconColor} />
          <rect x="12.6" y="0" width="2.8" height="11" rx="0.8" fill={iconColor} />
        </svg>

        {/* Wi-Fi Wave Icon */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M0.8 3.2C4.4 -0.4 10.6 -0.4 14.2 3.2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3.2 5.8C5.6 3.4 9.4 3.4 11.8 5.8" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5.6 8.4C6.6 7.4 8.4 7.4 9.4 8.4" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="7.5" cy="9.8" r="0.9" fill={iconColor} />
        </svg>

        {/* Battery Container Pill & Tip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <div
            style={{
              width: 22,
              height: 11.5,
              borderRadius: 3.5,
              border: `1.4px solid ${iconColor}`,
              padding: 1.2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '85%',
                height: '100%',
                borderRadius: 1.2,
                backgroundColor: iconColor,
              }}
            />
          </div>
          <div
            style={{
              width: 1.2,
              height: 4,
              borderRadius: '0 1px 1px 0',
              backgroundColor: iconColor,
              opacity: 0.8,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PosTerminal({ amt, state, nfcHot }: { amt: string; state: string; nfcHot: boolean }) {
  const approved = amt === 'APPROVED';
  return (
    <svg width="330" height="300" viewBox="0 0 330 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', filter: 'drop-shadow(0 24px 44px rgba(15,30,70,.28))' }}>
      <path d="M200 30 L288 82 L288 208 L226 262 L156 220 L156 96 Z" fill="#16181d" stroke="#0a0b0e" strokeWidth="2.5" />
      <path d="M196 22 L262 60 L244 78 L178 40 Z" fill="#dfe3ea" stroke="#0a0b0e" strokeWidth="2.5" />
      <path d="M192 36 L238 62" stroke="#8a90a0" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 130 L178 40 L266 92 L148 232 Z" fill="#c9ced8" stroke="#0a0b0e" strokeWidth="2.5" />
      <path d="M150 78 L226 122 L188 172 L112 128 Z" fill="#eef1f6" stroke="#0a0b0e" strokeWidth="2.5" />
      <text x="164" y="120" fontFamily="-apple-system,Inter,sans-serif" fontSize="15" fontWeight="800" fill={approved ? '#0aa856' : '#16181d'} textAnchor="middle" transform="rotate(30 164 120)">
        {amt}
      </text>
      <text x="166" y="136" fontFamily="-apple-system,Inter,sans-serif" fontSize="7.5" fontWeight="700" fill={state === 'READING…' ? '#0B84FE' : '#8a90a0'} textAnchor="middle" letterSpacing="1" transform="rotate(30 166 136)">
        {state}
      </text>
      <g stroke="#0a0b0e" strokeWidth="2" fill="#eef1f6">
        <path d="M96 148 L114 138 L126 146 L108 156 Z" />
        <path d="M118 162 L136 152 L148 160 L130 170 Z" />
        <path d="M140 176 L158 166 L170 174 L152 184 Z" />
        <path d="M82 162 L100 152 L112 160 L94 170 Z" />
        <path d="M104 176 L122 166 L134 174 L116 184 Z" />
        <path d="M126 190 L144 180 L156 188 L138 198 Z" />
        <path d="M68 176 L86 166 L98 174 L80 184 Z" />
        <path d="M90 190 L108 180 L120 188 L102 198 Z" />
        <path d="M112 204 L130 194 L142 202 L124 212 Z" />
      </g>
      <path d="M56 216 L100 190 L128 206 L84 232 Z" fill="#16181d" stroke="#0a0b0e" strokeWidth="2.5" />
      <path d="M62 216 L100 194 L122 206 L84 228 Z" fill="none" stroke="#0B84FE" strokeWidth="3" />
      <path d="M20 238 L72 208 L96 222 L44 252 Z" fill="#eef1f6" stroke="#0a0b0e" strokeWidth="2.5" />
      <path d="M20 238 L72 208 L96 222 L44 252 Z" fill="none" stroke="#0B84FE" strokeWidth="2" opacity=".6" />
      <path d="M234 122 L272 144 L272 182 L234 160 Z" fill="rgba(11,132,254,.08)" stroke="#0B84FE" strokeWidth={nfcHot ? 4.5 : 3.5} strokeLinejoin="round">
        <animate attributeName="stroke-opacity" values="1;.45;1" dur="1.6s" repeatCount="indefinite" />
      </path>
      <g stroke="#0B84FE" strokeWidth="2.6" fill="none" opacity={nfcHot ? 1 : 0.7}>
        <path d="M247 148 Q253 144 259 148" />
        <path d="M243 155 Q253 147 263 155" />
        <path d="M239 162 Q253 150 267 162" />
      </g>
      <text x="253" y="196" fontFamily="-apple-system,Inter,sans-serif" fontSize="8" fontWeight="800" fill="#0B84FE" textAnchor="middle" letterSpacing="1.2" transform="rotate(30 253 196)">
        TAP HERE
      </text>
      <circle cx="252" cy="106" r="5.5" fill="#2bd576">
        <animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function narration(phase: number, nfc: boolean) {
  if (phase === 0) return ['Open CardOS', 'Tap the phone or press Play to start'];
  if (phase === 1) return ['Face ID', 'Apple Face ID scan — facial contour mesh verified'];
  if (phase === 2) return ['Wallet', 'Your cards — tap the one you want to pay with'];
  if (phase === 3 && nfc) return ['Tap to pay', 'NFC field active between phone and terminal'];
  if (phase === 3) return ['Payment ready', 'Terminal arriving behind the phone…'];
  if (phase === 4) return ['Processing', 'Encrypted handshake with the bank'];
  return ['Payment complete', 'Terminal approved — receipt on phone'];
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
    background: 'linear-gradient(180deg, #FDFCF9 0%, #FFFFFF 65%, #F7F5F0 100%)',
    minHeight: 'auto',
    color: '#1D1D1F',
    overflowX: 'hidden',
    paddingTop: '60px',
    paddingBottom: '20px',
    scrollMarginTop: '80px',
  },
  hero: { textAlign: 'center', padding: '12px 24px 6px' },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: '#0B84FE', textTransform: 'uppercase', marginBottom: 13 },
  h1: { fontSize: 'clamp(42px,7vw,80px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-.045em', marginBottom: 15, margin: 0, color: '#1D1D1F' },
  sub: { fontSize: 15.5, color: '#52525B', maxWidth: 380, margin: '15px auto 0', lineHeight: 1.6, fontWeight: 500 },
  progress: { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px auto 20px', flexWrap: 'wrap' },
  pl: { fontSize: 10, fontWeight: 800, letterSpacing: '.12em', transition: 'color .4s' },
  psep: { fontSize: 11, color: '#A1A1AA', padding: '0 11px' },
  scene: { position: 'relative', maxWidth: 1020, height: 580, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1500 },
  floor: { position: 'absolute', bottom: 36, left: '10%', right: '10%', height: 160, background: 'radial-gradient(ellipse at 50% 100%, rgba(215, 205, 190, 0.35), transparent 72%)', pointerEvents: 'none' },
  pos: { position: 'absolute', left: '50%', top: '50%', transition: 'all 1.4s cubic-bezier(.35,1.1,.4,1)', zIndex: 12 },
  posShadow: { position: 'absolute', bottom: -16, left: '12%', right: '12%', height: 26, background: 'radial-gradient(ellipse, rgba(160, 150, 135, 0.25), transparent 70%)', filter: 'blur(8px)' },
  phone: { position: 'absolute', left: '50%', top: '50%', width: 254, height: 512, transformStyle: 'preserve-3d', transition: 'transform 1.6s cubic-bezier(.5,.03,.16,1)', zIndex: 20, cursor: 'pointer' },
  frame: { position: 'absolute', inset: 0, borderRadius: 56, background: 'linear-gradient(145deg, #2b2e36 0%, #4a505d 30%, #1a1c22 65%, #3c414d 100%)', boxShadow: 'inset 0 2px 3px rgba(255,255,255,.9), inset 0 -2px 4px rgba(0,0,0,.6), 0 32px 64px rgba(30,25,20,.18), 0 10px 24px rgba(30,25,20,.12)' },
  btn: { position: 'absolute', width: 4, background: 'linear-gradient(90deg,#484c56,#8f95a5 50%,#33363e)', borderRadius: 2.5, boxShadow: '0 1px 2px rgba(0,0,0,.4)' },
  screen: { position: 'absolute', inset: 9, borderRadius: 48, overflow: 'hidden', background: '#FFFFFF' },
  glare: { position: 'absolute', inset: 9, borderRadius: 48, background: 'linear-gradient(110deg,rgba(255,255,255,.45) 0%,rgba(255,255,255,.08) 22%,transparent 40%,transparent 74%,rgba(255,255,255,.15) 100%)', pointerEvents: 'none', zIndex: 80 },
  cam: { width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 34% 30%,#2a3548,#0a0e18 72%)', boxShadow: 'inset 0 0 3px rgba(90,150,255,.6)' },
  phShadow: { position: 'absolute', bottom: -46, left: '4%', right: '4%', height: 36, background: 'radial-gradient(ellipse, rgba(160, 150, 135, 0.3), transparent 66%)', filter: 'blur(10px)', transition: 'all 1.6s cubic-bezier(.5,.03,.16,1)' },
  home: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, paddingBottom: 44, background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)' },
  logo: { fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', color: '#1D1D1F' },
  logoSub: { fontSize: 9.5, color: '#71717A', letterSpacing: '.18em', fontWeight: 600 },
  payBtn: { marginTop: 24, fontSize: 13.5, fontWeight: 700, color: '#fff', background: 'linear-gradient(160deg,#1e8bff,#0058e0)', border: 'none', borderRadius: 100, padding: '14px 36px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(11,132,254,.4), inset 0 1px 1px rgba(255,255,255,.35)', fontFamily: 'inherit' },
  tapHint: { fontSize: 9.5, color: '#A1A1AA', marginTop: 10, fontWeight: 500 },
  fid: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, paddingBottom: 36, background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)' },
  fidT: { fontSize: 14, fontWeight: 700, color: '#1D1D1F' },
  fidS: { fontSize: 10.5, fontWeight: 600, minHeight: 15, transition: 'color .3s' },
  wlt: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F2EB 100%)' },
  wltHead: { padding: '12px 24px 13px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  wltTitle: { fontSize: 20, fontWeight: 800, letterSpacing: '-.02em', color: '#1D1D1F' },
  wltAdd: { width: 27, height: 27, borderRadius: '50%', background: '#EAE6DF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#1D1D1F' },
  wStack: { flex: 1, position: 'relative', padding: '0 19px' },
  wCard: { position: 'absolute', left: 19, right: 19, height: 126, borderRadius: 13, transition: 'all .6s cubic-bezier(.3,1.25,.45,1)', cursor: 'pointer', overflow: 'hidden' },
  wImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  wGlare: { position: 'absolute', inset: 0, background: 'linear-gradient(118deg,rgba(255,255,255,.2) 0%,transparent 36%)', pointerEvents: 'none' },
  wltFoot: { padding: 10, textAlign: 'center', fontSize: 10, color: '#71717A', fontWeight: 600 },
  pay: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px 30px', background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)' },
  payArcs: { display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: 3, marginBottom: 16 },
  payCardHolder: { width: 188, perspective: 750 },
  payCard: { width: 188, borderRadius: 13, overflow: 'hidden', boxShadow: '0 16px 32px rgba(20,15,10,.14), 0 4px 10px rgba(20,15,10,.08)', animation: 'cardIdle 3.2s ease-in-out infinite', position: 'relative' },
  sheen: { position: 'absolute', top: '-20%', bottom: '-20%', width: '52%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent)', animation: 'sheen 3.2s ease-in-out infinite', pointerEvents: 'none' },
  payAmt: { fontSize: 27, fontWeight: 800, letterSpacing: '-.025em', marginTop: 18, color: '#1D1D1F' },
  payHold: { marginTop: 9, fontSize: 10.5, color: '#0B84FE', fontWeight: 700 },
  proc: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15, paddingBottom: 40 },
  ring: { width: 52, height: 52, border: '4px solid #EAE6DF', borderTopColor: '#0B84FE', borderRadius: '50%', animation: 'spin .8s linear infinite' },
  procT: { fontSize: 14, fontWeight: 700, color: '#1D1D1F' },
  done: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 22px 34px' },
  doneC: { width: 76, height: 76, borderRadius: '50%', background: 'linear-gradient(150deg,#1e8bff,#0058e0)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 36px rgba(11,132,254,.42), inset 0 1px 2px rgba(255,255,255,.35)', animation: 'doneBounce .7s cubic-bezier(.34,1.56,.64,1)' },
  doneL: { fontSize: 10, fontWeight: 800, letterSpacing: '.14em', color: '#0B84FE', marginTop: 8 },
  doneA: { fontSize: 32, fontWeight: 800, letterSpacing: '-.03em', color: '#1D1D1F' },
  doneCd: { fontSize: 11, color: '#71717A', fontWeight: 600 },
  narr: { textAlign: 'center', marginTop: 6, minHeight: 44 },
  narrT: { fontSize: 11.5, fontWeight: 800, letterSpacing: '.12em', color: '#0B84FE', textTransform: 'uppercase' },
  narrD: { fontSize: 13.5, color: '#52525B', marginTop: 3, fontWeight: 600 },
  ctl: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '14px 0 60px', minHeight: 44 },
  cb: { fontSize: 13, fontWeight: 700, padding: '11px 26px', borderRadius: 100, border: '1px solid #E4E0D7', background: '#FFFFFF', color: '#1D1D1F', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(0,0,0,0.05)' },
  cbPri: { background: 'linear-gradient(160deg,#1e8bff,#0058e0)', color: '#fff', border: 'none', boxShadow: '0 6px 18px rgba(11,132,254,.35)' },
};
