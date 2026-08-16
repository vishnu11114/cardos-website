export type VerificationStatus =
  | 'VERIFIED'
  | 'SOURCE AVAILABLE'
  | 'ILLUSTRATIVE'
  | 'INCOMPLETE'
  | 'STALE'
  | 'CONFLICTING';

export interface SourceRecord {
  id: string;
  name: string;
  type: 'Issuer T&C' | 'Product Page' | 'Offer Schedule' | 'Regulatory Doc' | 'Manual Review';
  publisher: string;
  ruleExcerpt: string;
  publishedDate?: string;
  effectiveDate?: string;
  lastCheckedDate: string;
  status: VerificationStatus;
  urlLabel: string;
}

export interface RuleHistoryItem {
  id: string;
  cardName: string;
  bank: string;
  category: string;
  previousValue: string;
  currentValue: string;
  effectiveDate: string;
  changeSummary: string;
  sourceDoc: string;
}

export interface ConflictItem {
  id: string;
  topic: string;
  sourceA: {
    name: string;
    value: string;
    effectiveDate: string;
  };
  sourceB: {
    name: string;
    value: string;
    effectiveDate: string;
  };
  resolutionStrategy: string;
  impactOnUser: string;
}

export const trustPrinciples = [
  {
    number: '01',
    title: 'Show the Calculation',
    description: 'Every rupee return reveals its exact formula: Base + Multiplier + Offer - Cap = Net Value.',
  },
  {
    number: '02',
    title: 'Show the Rule',
    description: 'Every yield percentage cites its exact bank clause, MCC code, and monthly cap.',
  },
  {
    number: '03',
    title: 'Show the Source',
    description: 'All financial claims link directly to official bank Schedule of Charges PDFs.',
  },
  {
    number: '04',
    title: 'Show Freshness',
    description: 'All cataloged bank rules display verified check timestamps and freshness dates.',
  },
  {
    number: '05',
    title: 'Flag Uncertainty',
    description: 'If an MCC or cap is unverified, CardOS explicitly flags it instead of guessing.',
  },
  {
    number: '06',
    title: 'Deterministic AI Only',
    description: 'AI Copilot explains verified math only — zero AI hallucination or fabricated numbers.',
  },
  {
    number: '07',
    title: 'Responsible Spending',
    description: 'Optimize planned purchases only — zero gamification, FOMO timers, or debt traps.',
  },
];

export const demoSources: SourceRecord[] = [
  {
    id: 'src_hdfc_infinia_smartbuy',
    name: 'HDFC Bank SmartBuy Terms & Conditions',
    type: 'Issuer T&C',
    publisher: 'HDFC Bank Ltd.',
    ruleExcerpt: '5x Reward Points on SmartBuy Flights & Hotels up to a monthly cap of 15,000 accelerated points per calendar month.',
    publishedDate: '15 Jan 2026',
    effectiveDate: '1 Feb 2026',
    lastCheckedDate: '1 Aug 2026',
    status: 'VERIFIED',
    urlLabel: 'HDFC SmartBuy Official Portal',
  },
  {
    id: 'src_axis_magnus_edge',
    name: 'Axis Bank EDGE Rewards Schedule of Benefits',
    type: 'Issuer T&C',
    publisher: 'Axis Bank Ltd.',
    ruleExcerpt: '12 EDGE Rewards per ₹200 base spend. 5x multiplier on Travel Edge bookings up to ₹25,000 monthly spend limit.',
    publishedDate: '1 Mar 2026',
    effectiveDate: '15 Mar 2026',
    lastCheckedDate: '28 Jul 2026',
    status: 'VERIFIED',
    urlLabel: 'Axis Bank EDGE Rewards Repository',
  },
  {
    id: 'src_sbi_cashback_exclusions',
    name: 'SBI Card Cashback Terms & Category Exclusions',
    type: 'Product Page',
    publisher: 'SBI Cards & Payment Services Ltd.',
    ruleExcerpt: '5% direct cashback on online transactions. Excludes utility bill payments, insurance (MCC 6300), and fuel spends.',
    publishedDate: '10 Feb 2026',
    effectiveDate: '1 Mar 2026',
    lastCheckedDate: '5 Aug 2026',
    status: 'VERIFIED',
    urlLabel: 'SBI Card Schedule of Charges',
  },
  {
    id: 'src_icici_emeralde_forex',
    name: 'ICICI Emeralde Metal Schedule of Charges',
    type: 'Issuer T&C',
    publisher: 'ICICI Bank Ltd.',
    ruleExcerpt: '1.5% Foreign Currency Markup fee on international POS and online merchant transactions.',
    publishedDate: '1 Jan 2026',
    effectiveDate: '1 Jan 2026',
    lastCheckedDate: '20 Jul 2026',
    status: 'VERIFIED',
    urlLabel: 'ICICI Bank Tariff Structure',
  },
  {
    id: 'src_croma_festive_offer',
    name: 'Croma Retail Instant Bank Offer Schedule',
    type: 'Offer Schedule',
    publisher: 'Infiniti Retail / Croma',
    ruleExcerpt: '10% Instant Discount on HDFC Bank Credit Cards on minimum purchase of ₹15,000, max discount ₹1,500.',
    publishedDate: '1 Aug 2026',
    effectiveDate: '1 Aug 2026',
    lastCheckedDate: '6 Aug 2026',
    status: 'SOURCE AVAILABLE',
    urlLabel: 'Croma Bank Offers Directory',
  },
];

export const demoRuleHistory: RuleHistoryItem[] = [
  {
    id: 'hist_axis_magnus_cap',
    cardName: 'Axis Magnus',
    bank: 'Axis Bank',
    category: 'Monthly Spend Cap',
    previousValue: 'Uncapped 25,000 bonus points on ₹1,00,000 monthly spend',
    currentValue: '5x Travel Edge multiplier capped at ₹25,000 monthly spend limit',
    effectiveDate: '1 September 2023',
    changeSummary: 'Axis Bank introduced monthly capping on accelerated travel points to control reward liability.',
    sourceDoc: 'Axis Bank Terms Revision Notice Sep 2023',
  },
  {
    id: 'hist_sbi_cashback_exclusion',
    cardName: 'SBI Cashback Card',
    bank: 'SBI Card',
    category: 'Category Exclusions',
    previousValue: '5% Cashback on utility bill payments and wallet loads',
    currentValue: '5% Cashback on online spends; Utilities, Wallet Loads & Insurance excluded',
    effectiveDate: '1 May 2023',
    changeSummary: 'Updated exclusion list removing 5% cashback on utility payments and financial wallets.',
    sourceDoc: 'SBI Card Policy Update Circular May 2023',
  },
  {
    id: 'hist_hdfc_infinia_gst',
    cardName: 'HDFC Infinia Metal',
    bank: 'HDFC Bank',
    category: 'Annual Fee Waiver',
    previousValue: 'Spend ₹8,00,000 in anniversary year',
    currentValue: 'Spend ₹10,00,000 in anniversary year',
    effectiveDate: '1 January 2024',
    changeSummary: 'Annual fee waiver threshold increased from ₹8 Lakhs to ₹10 Lakhs annual spend.',
    sourceDoc: 'HDFC Bank Infinia Master Agreement Jan 2024',
  },
];

export const demoConflicts: ConflictItem[] = [
  {
    id: 'conflict_utility_mcc',
    topic: 'Utility Bill Payment Cashback Eligibility on HDFC Infinia',
    sourceA: {
      name: 'HDFC SmartBuy Portal Banner',
      value: '3.3% Base Reward Points on all online merchant bill payments',
      effectiveDate: 'Updated June 2026',
    },
    sourceB: {
      name: 'HDFC Master T&C PDF Section 4.2',
      value: 'Utility Spends (MCC 4900) capped at maximum 2,000 points per month',
      effectiveDate: 'Effective 1 Aug 2024',
    },
    resolutionStrategy: 'CardOS applies the conservative 2,000 points monthly cap limit to prevent overestimating reward value.',
    impactOnUser: 'Prevents users from expecting uncapped rewards on large utility payments.',
  },
  {
    id: 'conflict_lounge_spend',
    topic: 'Axis Bank Domestic Lounge Access Requirement',
    sourceA: {
      name: 'Axis Bank Mobile App Card Benefit Page',
      value: 'Complimentary unlimited lounge access for primary cardholders',
      effectiveDate: 'Checked July 2026',
    },
    sourceB: {
      name: 'Axis Bank Lounge Policy Amendment',
      value: 'Minimum ₹50,000 spend in preceding calendar quarter required for lounge access',
      effectiveDate: 'Effective 1 May 2024',
    },
    resolutionStrategy: 'CardOS flags the ₹50,000 quarterly spend requirement before confirming lounge availability.',
    impactOnUser: 'Ensures users do not get turned away at airport lounge reception desks.',
  },
];
