# ⊙ Credit Card OS (v2.0 India)

> **India's Credit Card Operating System** — An intelligence layer that calculates which credit card to swipe for any purchase, explains why, cites verified T&C evidence, and provides safe fraud protection guidance.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 16.3 (Turbopack, App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Vanilla CSS Design Tokens + Tailwind CSS
- **Design System**: Premium White/Light System (`#FFFFFF` canvas, `#F5F5F7` surfaces, `#1D1D1F` typography, `#E5E5E7` subtle borders)
- **Calculations**: Sub-100ms Deterministic Rupee Return Calculation Pipeline
- **Copilot**: Grounded Conversational AI Interface linked to deterministic calculators
- **Motion & 3D**: Framer Motion & Lucide Icons (Smooth 60fps animations with WCAG `prefers-reduced-motion` compliance)

---

## 📁 Repository Structure

```
├── app/
│   ├── page.tsx               # Cinematic Product Homepage
│   ├── product/page.tsx       # System Architecture & Product Map
│   ├── cards/page.tsx         # Credit Card Specification Explorer
│   ├── rewards/page.tsx       # Deterministic Reward Engine & Calculator
│   ├── offers/page.tsx        # Merchant & 5x Gyftr Offer Stacking
│   ├── compare/page.tsx       # Multi-Card Attribute Side-by-Side Comparison
│   ├── copilot/page.tsx       # Conversational AI Copilot Workspace
│   ├── trust/page.tsx         # Trust Center & Verified Source Provenance
│   ├── fraud/page.tsx         # Fraud Support & Dispute Preparation
│   ├── roadmap/page.tsx       # Phased Product Roadmap & MVP Scope Boundary
│   ├── early-access/page.tsx  # Early Adopter Priority Waitlist & Founder Story
│   ├── sitemap.ts             # Production SEO Sitemap
│   ├── robots.ts              # Production Robots Indexing Rules
│   ├── not-found.tsx          # Custom 404 Experience
│   └── error.tsx              # Global Error Boundary
├── components/
│   ├── financial/             # Credit Card Visuals & Calculation Cards
│   ├── layout/                # Navbar, FooterCTA, Navigation
│   ├── sections/              # Homepage Cinematic Modules
│   └── ui/                    # Design System Primitives (Badge, Button, Card)
├── lib/                       # Deterministic Calculators & Demo Data Schemas
└── public/                    # Card Artwork & Optimized Assets
```

---

## 🚀 Development & Build

### Prerequisites
- Node.js `>= 18.17.0`
- npm `>= 9.0.0`

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Validation
```bash
npm run build
```
Generates 15 prerendered static pages with 0 TypeScript/build errors.

---

## 🌐 Public Route Directory

- `/` — Homepage & Platform Overview
- `/product` — Complete Product Intelligence Map
- `/cards` — Credit Card Specification Explorer (14 Cards)
- `/rewards` — Deterministic Reward Engine (Spends up to ₹30 Lakhs)
- `/offers` — Merchant Offer & 5x Voucher Stacking
- `/compare` — Multi-Card Side-by-Side Comparison
- `/copilot` — Conversational AI Copilot Workspace
- `/trust` — Trust Center, Source Provenance & Rule History
- `/fraud` — Fraud Protection & Dispute Preparation Summary
- `/roadmap` — Product Roadmap & MVP Scope Boundary
- `/early-access` — Early Access Waitlist & Startup Story

---

## 🔒 Security & Privacy Commitments

- **No Sensitive Credential Collection**: CardOS never requests card numbers, CVVs, PINs, OTPs, or net banking passwords.
- **Header Protections**: Configured with `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy`.
- **Deterministic Calculation Engine**: Monetary value estimates are calculated mathematically and grounded in cataloged bank T&C agreements.
