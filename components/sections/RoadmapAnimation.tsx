'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const ROAD = "M -180 620 C 40 620 210 420 350 420 C 500 420 530 620 720 620 C 920 620 950 420 1120 420 C 1290 420 1380 560 1780 600";

const C = {
  ink: "#0f172a",
  muted: "#0f172a",
  faint: "#0f172a",
  road: "#2f333d",
  case: "#3a3f4a",
  lane: "#f5c542",
  amber: "#f5b83d",
  blue: "#2b6ef2",
  slate: "#3a4150",
  green: "#28c76f",
};

// timeline (seconds)
const T = {
  bikeGo: [0.4, 2.8],
  card1: [3.0, 3.7],
  chip1: [3.8, 4.4],
  morph1: [4.9, 5.7],
  busGo: [5.7, 8.1],
  card2: [8.4, 9.0],
  nfc: [9.1, 10.4],
  ok2: [10.4, 11.1],
  chip2: [11.2, 11.8],
  morph2: [12.3, 13.1],
  carGo: [13.1, 15.5],
  doc: [15.8, 16.5],
  write: [16.5, 17.7],
  docOk: [17.7, 18.2],
  chip3: [18.3, 18.9],
  finGo: [19.4, 20.7],
  fin: [20.8, 21.7],
  END: 23.4,
};

// anchor positions (SVG user units, 1600x900 board)
const POS: Record<string, [number, number]> = {
  startPlate: [112, 540],
  b1: [350, 372],
  pin1: [350, 76],
  plate1: [350, 124],
  cap1: [648, 132],
  card1: [648, 250],
  chip1: [648, 404],
  morph1: [470, 574],
  b2: [720, 862],
  pin2: [720, 570],
  plate2: [720, 664],
  cap2: [962, 626],
  card2: [962, 722],
  nfc: [1092, 722],
  ok2: [1298, 706],
  chip2: [1136, 846],
  morph2: [944, 470],
  b3: [1120, 396],
  pin3: [1120, 138],
  plate3: [1120, 188],
  cap3: [1404, 118],
  doc: [1404, 254],
  chip3: [1404, 418],
  finFlag: [1524, 600],
  finOk: [1502, 776],
  finPlate: [1500, 866],
};

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a), 0, 1);
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/* ---------------- art (all centered on origin; buildings sit on origin baseline) --------------- */

function CardArt() {
  const w = 150, h = 95, body = "#0d0d24", acc = "#ec1c3a", txt = "#e6e8f0";
  const by = h / 2 - 30;
  return (
    <g>
      <rect x={-w / 2 + 14} y={-h / 2 + 18} width={w} height={h} rx="14" fill="#1f8bff" opacity="0.95" />
      <g filter="url(#soft)">
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="14" fill={body} />
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="14" fill="url(#gloss)" />
        <text x={w / 2 - 16} y={-h / 2 + 24} textAnchor="end" fontSize="14" fontWeight="600" fill={txt}>Bank</text>
        <rect x={-w / 2 + 18} y={-h / 2 + 28} width="27" height="19" rx="5" fill={acc} />
        {[0, 1, 2].map((i) => {
          const r = 5 + i * 5, wx = w / 2 - 30, wy = -h / 2 + 36;
          return <path key={i} d={`M ${wx} ${wy - r} A ${r} ${r} 0 0 1 ${wx} ${wy + r}`} fill="none" stroke={acc} strokeWidth="2.4" strokeLinecap="round" opacity={0.9 - i * 0.2} />;
        })}
        <circle cx={w / 2 - 35} cy={-h / 2 + 36} r="2" fill={acc} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={-w / 2 + 18 + k * 27} y={by} width={k === 0 ? 22 : 17} height="7" rx="3.5" fill={acc} />)}
        <rect x={-w / 2 + 18} y={by + 16} width="86" height="7" rx="3.5" fill={acc} />
        <circle cx={w / 2 - 38} cy={h / 2 - 22} r="11" fill="#1f8bff" />
        <circle cx={w / 2 - 25} cy={h / 2 - 22} r="11" fill="#f5a623" opacity="0.92" />
      </g>
    </g>
  );
}

function Chip({ label, color, sub }: { label: string; color: string; sub?: string }) {
  const w = label.length * 11 + 108;
  return (
    <g filter="url(#softSm)">
      <rect x={-w / 2} y="-27" width={w} height="54" rx="27" fill="#fff" stroke={color} strokeWidth="3" />
      <circle cx={-w / 2 + 27} cy="0" r="15" fill={C.green} />
      <path d="M -7 0 l 5 6 l 10 -12" transform={`translate(${-w / 2 + 27},0)`} fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x={22} y="7" textAnchor="middle" fontSize="21" fontWeight="800" fill="#0f172a">{label}</text>
      {sub ? <text x={22} y="44" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">{sub}</text> : null}
    </g>
  );
}

function Plate({ label, color, size = 20 }: { label: string; color: string; size?: number }) {
  const w = label.length * (size * 0.62) + 40;
  return (
    <g filter="url(#softSm)">
      <rect x={-w / 2} y={-size} width={w} height={size * 2} rx={size} fill={color} />
      <text x="0" y={size * 0.42} textAnchor="middle" fontSize={size} fontWeight="800" fill="#fff" letterSpacing="0.5">{label}</text>
    </g>
  );
}

function Pin({ n, color }: { n: string; color: string }) {
  return (
    <g filter="url(#softSm)">
      <path d="M 0 26 C -20 -2 -22 -14 -22 -20 A 22 22 0 1 1 22 -20 C 22 -14 20 -2 0 26 Z" fill={color} />
      <circle cx="0" cy="-20" r="16" fill="#fff" />
      <text x="0" y="-14" textAnchor="middle" fontSize="18" fontWeight="800" fill={color}>{n}</text>
    </g>
  );
}

function BikeArt() {
  const green = "#4caf50", ink = "#1a1a1a", skin = "#e8a07a", shirt = "#b8d4a8";
  return (
    <g>
      {[[-22, 14], [24, 14]].map((w, i) => <circle key={i} cx={w[0]} cy={w[1]} r="14" fill="none" stroke={green} strokeWidth="3" />)}
      <path d="M -22 14 L 0 14 L 11 -2 L -5 -2 Z" fill="none" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="24" y1="14" x2="11" y2="-2" stroke={ink} strokeWidth="2.5" />
      <line x1="-22" y1="14" x2="-5" y2="-2" stroke={ink} strokeWidth="2.5" />
      <path d="M 11 -2 L 15 -8 Q 19 -10 21 -6" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="-9" y="-4" width="8" height="3" rx="1.5" fill={ink} />
      <path d="M -3 -3 L 2 7 L 0 14" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M -5 -4 L 6 -15" fill="none" stroke={shirt} strokeWidth="7" strokeLinecap="round" />
      <circle cx="-6" cy="-11" r="6" fill={ink} />
      <path d="M 4 -13 L 15 -7" fill="none" stroke={skin} strokeWidth="3" strokeLinecap="round" />
      <circle cx="9" cy="-19" r="5" fill={skin} />
      <path d="M 4 -21 Q 9 -26 15 -22 L 15 -20 Q 9 -21 4 -19 Z" fill={green} />
    </g>
  );
}

function BusArt() {
  const y = "#f5c542", ink = "#1a1a1a";
  return (
    <g>
      <rect x="-48" y="-24" width="96" height="40" rx="9" fill={y} stroke={ink} strokeWidth="3" />
      <path d="M 36 -8 Q 48 -8 48 4 L 48 12 Q 48 16 44 16 L 36 16 Z" fill={y} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      {[0, 1, 2].map((i) => <rect key={i} x={-42 + i * 18} y="-8" width="14" height="13" rx="3" fill="#bfe3ff" stroke={ink} strokeWidth="2" />)}
      <rect x="14" y="-8" width="12" height="22" rx="2" fill="#bfe3ff" stroke={ink} strokeWidth="2" />
      <rect x="-48" y="2" width="5" height="8" rx="2" fill="#ec1c3a" stroke={ink} strokeWidth="1.5" />
      <circle cx="44" cy="8" r="2.2" fill="#fff5c2" stroke={ink} strokeWidth="1.3" />
      {[[-28, 16], [28, 16]].map((w, i) => (
        <g key={i}><circle cx={w[0]} cy={w[1]} r="10" fill={ink} /><circle cx={w[0]} cy={w[1]} r="5" fill="#d8d8d8" stroke={ink} strokeWidth="1.5" /></g>
      ))}
    </g>
  );
}

function CarArt() {
  const red = "#c0271e", ink = "#1a1a1a";
  return (
    <g>
      <path d="M -50 6 Q -50 -4 -38 -6 L 42 -6 Q 52 -4 52 8 L 52 12 Q 52 16 48 16 L -46 16 Q -50 16 -50 10 Z" fill={red} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M -28 -6 Q -22 -20 -6 -20 L 16 -20 Q 30 -20 35 -6 Z" fill={red} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M -24 -7 Q -19 -16 -8 -16 L -3 -16 L -3 -7 Z" fill="#e8eef2" stroke={ink} strokeWidth="1.6" />
      <path d="M 2 -16 L 14 -16 Q 26 -16 31 -7 L 2 -7 Z" fill="#e8eef2" stroke={ink} strokeWidth="1.6" />
      <circle cx="48" cy="2" r="2.6" fill="#fff3c2" stroke={ink} strokeWidth="1.3" />
      {[[-28, 16], [32, 16]].map((w, i) => (
        <g key={i}><circle cx={w[0]} cy={w[1]} r="11" fill={ink} /><circle cx={w[0]} cy={w[1]} r="5.5" fill="#fff" stroke="#999" strokeWidth="1" /></g>
      ))}
    </g>
  );
}

function Shop({ col }: { col: string }) {
  const bw = 150, bh = 145, left = -bw / 2, top = -bh;
  const win: [number, number][] = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) win.push([left + 20 + c * 40, top + 34 + r * 30]);
  return (
    <g>
      <ellipse cx="0" cy="8" rx="98" ry="15" fill="#1b2a5b" opacity="0.09" />
      <g filter="url(#softSm)">
        <rect x={left} y={top} width={bw} height={bh} rx="8" fill="#fff" stroke={col} strokeWidth="4" />
        <rect x={left - 5} y={top} width={bw + 10} height="20" rx="4" fill={col} />
        {win.map((w, i) => <rect key={i} x={w[0]} y={w[1]} width="26" height="24" rx="2" fill="#e4ebf5" stroke={col} strokeWidth="1.5" />)}
        {[0, 1, 2, 3, 4, 5].map((s) => <rect key={s} x={left + 10 + s * 23} y={top + bh - 44} width="23" height="14" fill={s % 2 ? "#fff" : col} stroke={col} strokeWidth="0.8" />)}
        <rect x={left + 18} y={top + bh - 28} width="50" height="28" rx="2" fill="#bfe3ff" stroke={col} strokeWidth="1.5" />
        <rect x="10" y={top + bh - 28} width="28" height="28" rx="2" fill={col} opacity="0.85" />
      </g>
    </g>
  );
}

function BankBuilding({ col }: { col: string }) {
  const bw = 160, bh = 140, left = -bw / 2, top = -bh;
  const win: [number, number][] = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) win.push([left + 20 + c * 44, top + 42 + r * 34]);
  return (
    <g>
      <ellipse cx="0" cy="8" rx="104" ry="15" fill="#1b2a5b" opacity="0.09" />
      <g filter="url(#softSm)">
        <rect x={left} y={top} width={bw} height={bh} rx="8" fill="#fff" stroke={col} strokeWidth="4" />
        <rect x={left} y={top} width={bw} height="28" rx="8" fill={col} />
        <rect x={left} y={top + 14} width={bw} height="14" fill={col} />
        {win.map((w, i) => <rect key={i} x={w[0]} y={w[1]} width="30" height="26" rx="2" fill="#bfe3ff" stroke={col} strokeWidth="1.5" />)}
        <rect x="-34" y={top + bh - 40} width="68" height="10" rx="3" fill={col} />
        <rect x="-24" y={top + bh - 30} width="48" height="30" rx="3" fill="#bfe3ff" stroke={col} strokeWidth="2" />
      </g>
    </g>
  );
}

function PoliceStation() {
  const bw = 190, bh = 150, left = -bw / 2, top = -bh;
  return (
    <g>
      <ellipse cx="0" cy="8" rx="112" ry="16" fill="#1b2a5b" opacity="0.09" />
      <g filter="url(#softSm)">
        <rect x={left} y={top} width={bw} height={bh} rx="6" fill="#eef1f6" stroke="#c3ccd8" strokeWidth="3" />
        <rect x={left - 6} y={top - 12} width={bw + 12} height="18" rx="4" fill="#3a4150" />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={left + 16 + i * 35} y={top + 22} width="24" height="32" rx="2" fill="#20304f" />)}
        <circle cx="0" cy={top + 40} r="15" fill="#f5b83d" stroke="#c98a10" strokeWidth="2" />
        <path d={`M 0 ${top + 32} l 4 8 h 7 l -5.5 5 l 2 8 l -7.5 -4.5 l -7.5 4.5 l 2 -8 l -5.5 -5 h 7 z`} fill="#fff" />
        <rect x="-56" y={top + 66} width="112" height="26" rx="3" fill="#20304f" />
        <text x="0" y={top + 85} textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff" letterSpacing="2">POLICE</text>
        <rect x={left + 14} y={top + 98} width="10" height="48" fill="#c3ccd8" />
        <rect x={left + bw - 24} y={top + 98} width="10" height="48" fill="#c3ccd8" />
        <rect x="-22" y={top + 104} width="44" height="42" rx="3" fill="#c98a3a" stroke="#8a5a1e" strokeWidth="2" />
        <rect x={left + 36} y={top + 100} width="24" height="40" rx="2" fill="#20304f" />
        <rect x={left + bw - 60} y={top + 100} width="24" height="40" rx="2" fill="#20304f" />
      </g>
    </g>
  );
}

const CONFETTI = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
  const a = (i / 8) * Math.PI * 2;
  return { x: Math.cos(a) * 56, y: Math.sin(a) * 56, c: ["#f5b83d", "#2b6ef2", "#ec1c3a", "#28c76f"][i % 4], r: i % 2 ? 4 : 5.5 };
});

export interface RoadmapAnimationProps {
  title?: string;
  subtitle?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function RoadmapAnimation({
  title = "",
  subtitle = "",
  controls = false,
  autoPlay = true,
  loop = true,
  speed = 0.68,
  style,
  className = "",
}: RoadmapAnimationProps) {
  const elementsRef = useRef<Record<string, SVGElement | HTMLElement | null>>({});
  const [playing, setPlaying] = useState(autoPlay);

  const isPlayingRef = useRef(autoPlay);
  const currentTimeRef = useRef(0);
  const lastTimeRef = useRef(0);

  const getRefSetter = useCallback((key: string) => (node: SVGElement | HTMLElement | null) => {
    elementsRef.current[key] = node;
  }, []);

  useEffect(() => {
    isPlayingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const road = elementsRef.current.road as SVGPathElement | null;
    if (!road) return;

    const LEN = road.getTotalLength();
    const P = (u: number) => road.getPointAtLength(clamp(u, 0, 1) * LEN);
    const ANG = (u: number) => {
      const a = P(u), b = P(Math.min(1, u + 0.004));
      return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    };
    const findT = (x: number) => {
      let best = 0, bd = 1e9;
      for (let i = 0; i <= 400; i++) {
        const u = i / 400, d = Math.abs(P(u).x - x);
        if (d < bd) { bd = d; best = u; }
      }
      return best;
    };

    const S1 = findT(POS.b1[0]), S2 = findT(POS.b2[0]), S3 = findT(POS.b3[0]);

    const reveal = (k: string, p: number, rise = 26) => {
      const el = elementsRef.current[k];
      if (!el) return;
      const e = easeOut(p), base = POS[k];
      const s = p >= 1 ? 1 : 0.86 + 0.16 * e - 0.02 * Math.sin(e * Math.PI);
      el.setAttribute("transform", `translate(${base[0]},${base[1] + (1 - e) * rise}) scale(${s})`);
      el.style.opacity = String(clamp(p * 1.6, 0, 1));
    };

    const fade = (k: string, o: number) => {
      const el = elementsRef.current[k];
      if (el) el.style.opacity = String(clamp(o, 0, 1));
    };

    const vehT = (t: number) => {
      if (t < T.bikeGo[0]) return 0.014;
      if (t < T.bikeGo[1]) return lerp(0.014, S1, easeInOut(seg(t, T.bikeGo[0], T.bikeGo[1])));
      if (t < T.busGo[0]) return S1;
      if (t < T.busGo[1]) return lerp(S1, S2, easeInOut(seg(t, T.busGo[0], T.busGo[1])));
      if (t < T.carGo[0]) return S2;
      if (t < T.carGo[1]) return lerp(S2, S3, easeInOut(seg(t, T.carGo[0], T.carGo[1])));
      if (t < T.finGo[0]) return S3;
      if (t < T.finGo[1]) return lerp(S3, 0.985, easeInOut(seg(t, T.finGo[0], T.finGo[1])));
      return 0.985;
    };

    const draw = (t: number) => {
      const u = vehT(t), pt = P(u), ang = ANG(u);
      const moving = (t > T.bikeGo[0] && t < T.bikeGo[1]) || (t > T.busGo[0] && t < T.busGo[1]) || (t > T.carGo[0] && t < T.carGo[1]) || (t > T.finGo[0] && t < T.finGo[1]);
      const bob = moving ? Math.sin(t * 18) * 1.6 : 0;
      const m1 = seg(t, T.morph1[0], T.morph1[1]), m2 = seg(t, T.morph2[0], T.morph2[1]);
      const squash = 1 + 0.12 * Math.sin(Math.PI * (m1 > 0 && m1 < 1 ? m1 : m2 > 0 && m2 < 1 ? m2 : 0));

      if (elementsRef.current.veh) elementsRef.current.veh.setAttribute("transform", `translate(${pt.x},${pt.y - 26 + bob}) rotate(${ang * 0.55}) scale(${1.62 * squash},${1.62 / squash})`);
      fade("bike", 1 - m1);
      fade("bus", m1 * (1 - m2));
      fade("car", m2);
      if (elementsRef.current.morphRing) {
        const mp = m1 > 0 && m1 < 1 ? m1 : m2 > 0 && m2 < 1 ? m2 : 0;
        elementsRef.current.morphRing.setAttribute("transform", `translate(${pt.x},${pt.y - 24}) scale(${0.4 + mp * 2.2})`);
        elementsRef.current.morphRing.style.opacity = String(mp > 0 ? (1 - mp) * 0.55 : 0);
      }
      if (elementsRef.current.dash) elementsRef.current.dash.setAttribute("stroke-dashoffset", String(-t * 90));

      reveal("cap1", seg(t, T.card1[0] - 0.2, T.card1[0] + 0.3), 10);
      reveal("card1", seg(t, T.card1[0], T.card1[1]));
      reveal("chip1", seg(t, T.chip1[0], T.chip1[1]));
      reveal("morph1", clamp(seg(t, T.morph1[0] - 0.4, T.morph1[0]) - seg(t, T.morph1[1], T.morph1[1] + 0.6), 0, 1), 8);

      reveal("cap2", seg(t, T.card2[0] - 0.2, T.card2[0] + 0.3), 10);
      reveal("card2", seg(t, T.card2[0], T.card2[1]));
      const np = seg(t, T.nfc[0], T.nfc[1]);
      fade("nfc", np > 0 ? 1 : 0);
      if (np > 0) [0, 1, 2].forEach((i) => {
        const el = elementsRef.current["w" + i]; if (!el) return;
        const ph = ((t - T.nfc[0]) * 1.5 - i * 0.3) % 1;
        el.style.opacity = String(ph > 0 ? (1 - ph) * 0.95 : 0);
      });
      reveal("ok2", seg(t, T.ok2[0], T.ok2[1]));
      if (elementsRef.current.ok2check) elementsRef.current.ok2check.setAttribute("stroke-dashoffset", String(46 * (1 - easeOut(seg(t, T.ok2[0] + 0.15, T.ok2[1])))));
      if (elementsRef.current.ok2conf) { const cp = easeOut(seg(t, T.ok2[0] + 0.2, T.ok2[1] + 0.3)); elementsRef.current.ok2conf.setAttribute("transform", `scale(${0.4 + cp * 0.6})`); elementsRef.current.ok2conf.style.opacity = String(cp); }
      reveal("chip2", seg(t, T.chip2[0], T.chip2[1]));
      reveal("morph2", clamp(seg(t, T.morph2[0] - 0.4, T.morph2[0]) - seg(t, T.morph2[1], T.morph2[1] + 0.6), 0, 1), 8);

      reveal("cap3", seg(t, T.doc[0] - 0.2, T.doc[0] + 0.3), 10);
      reveal("doc", seg(t, T.doc[0], T.doc[1]));
      [0, 1, 2, 3].forEach((i) => {
        const el = elementsRef.current["ln" + i]; if (!el) return;
        const p = seg(t, T.write[0] + i * 0.26, T.write[0] + i * 0.26 + 0.34);
        el.setAttribute("transform", `scale(${easeOut(p)},1)`);
      });
      if (elementsRef.current.docOk) { const p = easeOut(seg(t, T.docOk[0], T.docOk[1])); elementsRef.current.docOk.style.opacity = String(p); elementsRef.current.docOk.setAttribute("stroke-dashoffset", String(30 * (1 - p))); }
      reveal("chip3", seg(t, T.chip3[0], T.chip3[1]));

      reveal("finOk", seg(t, T.fin[0], T.fin[1]));
      if (elementsRef.current.finCheck) elementsRef.current.finCheck.setAttribute("stroke-dashoffset", String(46 * (1 - easeOut(seg(t, T.fin[0] + 0.15, T.fin[1])))));
      if (elementsRef.current.finConf) { const cp = easeOut(seg(t, T.fin[0] + 0.2, T.fin[0] + 0.4)); elementsRef.current.finConf.setAttribute("transform", `scale(${0.4 + cp * 0.6})`); elementsRef.current.finConf.style.opacity = String(cp); }

      if (elementsRef.current.bar) elementsRef.current.bar.style.width = (clamp(t / T.END, 0, 1) * 100).toFixed(2) + "%";
    };

    const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      isPlayingRef.current = false;
      currentTimeRef.current = T.END - 1.2;
      draw(currentTimeRef.current);
      return;
    }

    let raf = 0;
    const tick = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000) * speed;
      lastTimeRef.current = now;

      if (isPlayingRef.current) {
        currentTimeRef.current += dt;
        if (currentTimeRef.current > T.END) {
          if (loop) {
            currentTimeRef.current = 0;
          } else {
            currentTimeRef.current = T.END;
            isPlayingRef.current = false;
            setPlaying(false);
          }
        }
      }
      draw(currentTimeRef.current);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loop, speed]);

  const restart = () => {
    currentTimeRef.current = 0;
    isPlayingRef.current = true;
    setPlaying(true);
  };

  const toggle = () => setPlaying((p) => !p);

  const scrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    currentTimeRef.current = clamp((e.clientX - box.left) / box.width, 0, 1) * T.END;
  };

  const btn: React.CSSProperties = {
    font: "600 13px/1 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif",
    color: C.ink,
    background: "#ffffff",
    border: "1px solid #d8dfea",
    borderRadius: 8,
    padding: "9px 14px",
    cursor: "pointer",
  };

  return (
    <div className={className} style={{ width: "100%", ...style }}>
      <svg viewBox="-40 0 1720 860" style={{ width: "100%", height: "auto", display: "block" }} fontFamily="var(--font-geist-sans), Inter, system-ui, -apple-system, sans-serif">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#eaf1fb" /><stop offset="1" stopColor="#f8fafc" /></linearGradient>
          <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.16" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.02" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <radialGradient id="vig" cx="0.5" cy="0.42" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#0b1a3a" stopOpacity="0.07" /></radialGradient>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="11" floodColor="#1b2a5b" floodOpacity="0.2" /></filter>
          <filter id="softSm" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#1b2a5b" floodOpacity="0.18" /></filter>
        </defs>

        {/* Transparent SVG canvas to blend with page background */}

        {title ? <text x="800" y="58" textAnchor="middle" fontSize="30" fontWeight="800" fill={C.ink}>{title}</text> : null}
        {subtitle ? <text x="800" y="90" textAnchor="middle" fontSize="16" fontWeight="600" fill={C.muted}>{subtitle}</text> : null}

        <path d={ROAD} fill="none" stroke="#1b2a5b" strokeWidth="52" strokeLinecap="round" opacity="0.1" transform="translate(0,10)" />
        <path d={ROAD} fill="none" stroke="#ffffff" strokeWidth="50" strokeLinecap="round" />
        <path ref={getRefSetter("road")} d={ROAD} fill="none" stroke="#26292f" strokeWidth="42" strokeLinecap="round" />
        <path ref={getRefSetter("dash")} d={ROAD} fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeDasharray="22 20" />

        <g transform={`translate(${POS.b1[0]},${POS.b1[1]}) scale(1.55)`}><Shop col={C.amber} /></g>
        <g transform={`translate(${POS.b2[0]},${POS.b2[1]}) scale(1.24)`}><BankBuilding col={C.blue} /></g>
        <g transform={`translate(${POS.b3[0]},${POS.b3[1]}) scale(1.16)`}><PoliceStation /></g>

        <g transform={`translate(${POS.pin1[0]},${POS.pin1[1]})`}><Pin n="01" color={C.amber} /></g>
        <g transform={`translate(${POS.pin2[0]},${POS.pin2[1]})`}><Pin n="02" color={C.blue} /></g>
        <g transform={`translate(${POS.pin3[0]},${POS.pin3[1]})`}><Pin n="03" color={C.slate} /></g>
        <g transform={`translate(${POS.plate1[0]},${POS.plate1[1]})`}><Plate label="01  CHOOSE" color={C.amber} size={18} /></g>
        <g transform={`translate(${POS.plate2[0]},${POS.plate2[1]})`}><Plate label="02  TAP & PAY" color={C.blue} size={18} /></g>
        <g transform={`translate(${POS.plate3[0]},${POS.plate3[1]})`}><Plate label="03  PROTECT & RECOVERY" color={C.slate} size={18} /></g>

        {/* stop 01 */}
        <g ref={getRefSetter("cap1")} opacity="0" transform={`translate(${POS.cap1[0]},${POS.cap1[1]})`}>
          <text x="0" y="0" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0f172a">Instant Card Selection</text>
        </g>
        <g ref={getRefSetter("card1")} opacity="0" transform={`translate(${POS.card1[0]},${POS.card1[1]})`}><g transform="scale(1.05)"><CardArt /></g></g>
        <g ref={getRefSetter("chip1")} opacity="0" transform={`translate(${POS.chip1[0]},${POS.chip1[1]})`}><g transform="scale(0.82)"><Chip label="0–6 Months" color={C.amber} sub="selected" /></g></g>
        <g ref={getRefSetter("morph1")} opacity="0" transform={`translate(${POS.morph1[0]},${POS.morph1[1]})`}>
          <text x="0" y="0" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0f172a">Bicycle → Bus</text>
        </g>

        {/* stop 02 */}
        <g ref={getRefSetter("cap2")} opacity="0" transform={`translate(${POS.cap2[0]},${POS.cap2[1]})`}>
          <text x="0" y="0" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0f172a">Contactless Tap & Pay</text>
        </g>
        <g ref={getRefSetter("card2")} opacity="0" transform={`translate(${POS.card2[0]},${POS.card2[1]})`}><g transform="scale(0.95)"><CardArt /></g></g>
        <g ref={getRefSetter("nfc")} opacity="0" transform={`translate(${POS.nfc[0]},${POS.nfc[1]})`}>
          {[0, 1, 2].map((i) => { const rr = 12 + i * 9; return <path key={i} ref={getRefSetter("w" + i)} d={`M 0 ${-rr} A ${rr} ${rr} 0 0 1 0 ${rr}`} fill="none" stroke={C.blue} strokeWidth="3.4" strokeLinecap="round" opacity="0" />; })}
        </g>
        <g ref={getRefSetter("ok2")} opacity="0" transform={`translate(${POS.ok2[0]},${POS.ok2[1]})`}>
          <g ref={getRefSetter("ok2conf")} opacity="0">{CONFETTI.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={c.c} />)}</g>
          <circle cx="0" cy="0" r="36" fill={C.green} filter="url(#softSm)" />
          <path ref={getRefSetter("ok2check")} d="M -15 1 l 11 12 l 19 -23" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="46" strokeDashoffset="46" />
          <text x="0" y="88" textAnchor="middle" fontSize="16" fontWeight="800" fill="#1f9d57">Payment Successful</text>
        </g>
        <g ref={getRefSetter("chip2")} opacity="0" transform={`translate(${POS.chip2[0]},${POS.chip2[1]})`}><g transform="scale(0.82)"><Chip label="0.6–1.5 Years" color={C.blue} sub="selected" /></g></g>
        <g ref={getRefSetter("morph2")} opacity="0" transform={`translate(${POS.morph2[0]},${POS.morph2[1]})`}>
          <text x="0" y="0" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0f172a">Bus → Car</text>
        </g>

        {/* stop 03 */}
        <g ref={getRefSetter("cap3")} opacity="0" transform={`translate(${POS.cap3[0]},${POS.cap3[1]})`}>
          <text x="0" y="0" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0f172a">Auto Dispute Package</text>
        </g>
        <g ref={getRefSetter("doc")} opacity="0" transform={`translate(${POS.doc[0]},${POS.doc[1]})`}>
          <g transform="scale(1.2)" filter="url(#softSm)">
            <rect x="-46" y="-58" width="92" height="116" rx="8" fill="#fff" stroke={C.slate} strokeWidth="3" />
            <rect x="-46" y="-58" width="92" height="22" rx="8" fill={C.slate} />
            <rect x="-46" y="-47" width="92" height="11" fill={C.slate} />
            <path d="M 0 -54 l 8 4 v 7 c 0 5 -4 8 -8 9 c -4 -1 -8 -4 -8 -9 v -7 z" fill="#fff" />
            {[70, 70, 70, 44].map((w, i) => (
              <g key={i} transform={`translate(-34,${-22 + i * 20})`}>
                <rect x="0" y="0" width={w} height="6" rx="3" fill="#e3e8f2" />
                <g ref={getRefSetter("ln" + i)} transform="scale(0,1)"><rect x="0" y="0" width={w} height="6" rx="3" fill="#8e9cb8" /></g>
              </g>
            ))}
            <path ref={getRefSetter("docOk")} d="M 20 40 l 6 6 l 12 -14" fill="none" stroke={C.green} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset="30" opacity="0" />
          </g>
        </g>
        <g ref={getRefSetter("chip3")} opacity="0" transform={`translate(${POS.chip3[0]},${POS.chip3[1]})`}><Chip label="1.5–2.5 Years" color={C.slate} sub="selected" /></g>

        {/* finish */}
        <g ref={getRefSetter("finOk")} opacity="0" transform={`translate(${POS.finOk[0]},${POS.finOk[1]})`}>
          <g ref={getRefSetter("finConf")} opacity="0">{CONFETTI.map((c, i) => <circle key={i} cx={c.x * 1.15} cy={c.y * 1.15} r={c.r} fill={c.c} />)}</g>
          <circle cx="0" cy="0" r="40" fill={C.green} filter="url(#softSm)" />
          <path ref={getRefSetter("finCheck")} d="M -16 1 l 12 13 l 21 -25" fill="none" stroke="#fff" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="46" strokeDashoffset="46" />
        </g>

        {/* vehicle */}
        <circle ref={getRefSetter("morphRing")} cx="0" cy="0" r="26" fill="none" stroke={C.blue} strokeWidth="4" opacity="0" />
        <g ref={getRefSetter("veh")}>
          <ellipse cx="0" cy="18" rx="42" ry="7" fill="#1b2a5b" opacity="0.16" />
          <g ref={getRefSetter("bike")}><BikeArt /></g>
          <g ref={getRefSetter("bus")} opacity="0"><BusArt /></g>
          <g ref={getRefSetter("car")} opacity="0"><CarArt /></g>
        </g>
      </svg>

      {controls ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 4px 0" }}>
          <button type="button" onClick={toggle} style={btn}>{playing ? "Pause" : "Play"}</button>
          <button type="button" onClick={restart} style={btn}>Restart</button>
          <div onClick={scrub} style={{ flex: 1, height: 8, borderRadius: 4, background: "#e3e8f2", cursor: "pointer", overflow: "hidden" }}>
            <div ref={getRefSetter("bar")} style={{ width: "0%", height: "100%", background: C.blue, borderRadius: 4 }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RoadmapAnimation;
