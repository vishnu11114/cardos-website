export type ProductMaturityStage = 'AVAILABLE IN PROTOTYPE' | 'PLANNED MVP' | 'NEXT' | 'FUTURE';

export interface RoadmapPhase {
  phase: string;
  title: string;
  timeline: string;
  status: ProductMaturityStage;
  tagline: string;
  deliverables: string[];
  keyObjective: string;
}

export interface MetricDefinition {
  category: 'North Star' | 'Activation' | 'Engagement' | 'Trust & Evidence' | 'Retention';
  name: string;
  definition: string;
  whyItMatters: string;
  mvpGoal: string;
}

export const productMaturityPhases: RoadmapPhase[] = [
  {
    phase: 'PHASE 0',
    title: 'Interactive Product Prototype',
    timeline: 'CURRENT',
    status: 'AVAILABLE IN PROTOTYPE',
    tagline: 'High-fidelity frontend product design and deterministic logic testing.',
    deliverables: [
      'Cards Explorer & Spec Database across 14 top Indian credit cards',
      'Deterministic Reward Calculation Engine for spends up to ₹30 Lakhs',
      'Merchant Offer & Gyftr 5x Voucher Stacking Explorer',
      'Multi-Card Attribute Side-by-Side Comparison Engine',
      'Conversational AI Copilot interface linked to rule calculators',
      'Verified T&C Source Provenance Directory & Evidence Inspector',
      'Safety-first Fraud Support & Dispute Preparation Summary generator',
    ],
    keyObjective: 'Demonstrate complete product UX and deterministic rule architecture to early users and advisors.',
  },
  {
    phase: 'PHASE 1',
    title: 'Decision Intelligence MVP',
    timeline: 'PLANNED MVP',
    status: 'PLANNED MVP',
    tagline: 'Focus on the core wedge: "Which card should I swipe for this purchase, and why?"',
    deliverables: [
      'Personal Card Wallet (Users add their owned card portfolio)',
      'Instant Merchant & Category Search (Croma, Amazon, Flight, Dining)',
      'Deterministic Rupee Return Calculator with live offer rules',
      'Best Card Recommendation Engine with itemized value breakdown',
      'Inspectable Evidence & Assumption Drawers for every claim',
      'Basic Conversational Copilot over structured card knowledge',
    ],
    keyObjective: 'Validate whether multi-card users repeatedly rely on CardOS for high-value purchase decisions.',
  },
  {
    phase: 'PHASE 2',
    title: 'Personal Reward Intelligence',
    timeline: 'NEXT',
    status: 'NEXT',
    tagline: 'Personalized benefit tracking, fee waivers, and milestone progress.',
    deliverables: [
      'Annual Fee Waiver Tracker (Progress toward ₹2L / ₹10L spend targets)',
      'Quarterly Milestone Bonus Planner (e.g. HDFC Infinia ₹1.5L target)',
      'Airport Lounge Access Counter & Guest Pass Tracker',
      'Airmiles & Hotel Partner Conversion Ratio Optimizer',
      'Expiry Alerts for Merchant Offers & Reward Points',
    ],
    keyObjective: 'Drive 30-day user retention by optimizing ongoing card benefits and preventing expired rewards.',
  },
  {
    phase: 'PHASE 3',
    title: 'Connected Financial Intelligence',
    timeline: 'FUTURE',
    status: 'FUTURE',
    tagline: 'Automated statement ingestion and reward reconciliation.',
    deliverables: [
      'Consent-based Statement Parsing (Auto-detect owned cards & fees)',
      'Reward Point Reconciliation (Verify if bank credited full 5x points)',
      'Merchant Descriptor Resolution Engine (Map obscure statement names)',
      'Personalized Monthly Reward Audit Statement',
    ],
    keyObjective: 'Eliminate manual card entry and automatically audit whether banks honored promised multipliers.',
  },
  {
    phase: 'PHASE 4',
    title: 'Protection & Human Recovery',
    timeline: 'FUTURE',
    status: 'FUTURE',
    tagline: 'Comprehensive fraud navigation and dispute assistance.',
    deliverables: [
      'Self-guided Dispute Package Builder for disputed charges',
      'Official Issuer Chargeback Routing Directory',
      'Human Recovery Specialist consultations for complex appeals',
      'Merchant Dispute Communication Templates',
    ],
    keyObjective: 'Provide calm, structured assistance when users experience unauthorized transactions or scams.',
  },
  {
    phase: 'PHASE 5',
    title: 'Payment Intelligence OS',
    timeline: 'FUTURE',
    status: 'FUTURE',
    tagline: 'Long-term vision: Autonomous smart payment routing.',
    deliverables: [
      'Smart Payment Routing API for e-commerce checkouts',
      'Tap-to-Pay / NFC Smart Wallet Integration',
      'Dynamic Merchant Partner Offers & Instant Discount APIs',
    ],
    keyObjective: 'Automate payment selection at checkout to guarantee the optimal card is swiped every time.',
  },
];

export const mvpMetricsFramework: MetricDefinition[] = [
  {
    category: 'North Star',
    name: 'Optimized Purchase Decisions',
    definition: 'Number of real purchase decisions where a user consults CardOS to select their card.',
    whyItMatters: 'Measures core product-market fit and decision utility.',
    mvpGoal: '10,000 decisions/month',
  },
  {
    category: 'Activation',
    name: 'Wallet Onboarding Completion',
    definition: 'Percentage of new users who add 2+ owned cards to their wallet.',
    whyItMatters: 'Demonstrates willingness to set up card context.',
    mvpGoal: '70% activation rate',
  },
  {
    category: 'Engagement',
    name: 'Searches Per Active User',
    definition: 'Average number of merchant searches or calculation queries per user monthly.',
    whyItMatters: 'Indicates high habit formation for purchase planning.',
    mvpGoal: '4.5 queries/user/month',
  },
  {
    category: 'Trust & Evidence',
    name: 'Evidence Inspection Rate',
    definition: 'Percentage of recommendation views where the user opens the Evidence Drawer.',
    whyItMatters: 'Validates that inspectable T&C citations build user trust.',
    mvpGoal: '25% inspection rate',
  },
  {
    category: 'Retention',
    name: '30-Day Decision Retention',
    definition: 'Percentage of users returning to check card recommendations 30 days after signup.',
    whyItMatters: 'Proves long-term decision utility beyond initial curiosity.',
    mvpGoal: '45% 30-day retention',
  },
];

export const businessModelOptions = [
  {
    title: 'Consumer Premium Subscription',
    description: 'Pro tier for power reward optimizers unlocking advanced milestone tracking, lounge pass counters, and custom airmiles conversion calculators.',
  },
  {
    title: 'Commercial Partner Referrals',
    description: 'Commissions on new card applications when users discover relevant card lineups. Must remain strictly transparent and separate from objective spend recommendations.',
  },
  {
    title: 'Merchant Offer Infrastructure APIs',
    description: 'B2B API enabling e-commerce merchants to display optimal bank card discounts directly on product pages to reduce cart abandonment.',
  },
  {
    title: 'Enterprise Issuer Intelligence',
    description: 'Anonymized benchmarking analytics for card issuers to understand competitive reward yields and user fee-waiver friction points.',
  },
];
