export interface EngineCardResult {
  rank: number;
  name: string;
  bank: string;
  image: string;
  totalValue: number;
  baseReward: number;
  acceleratedReward: number;
  offerValue: number;
  milestoneContribution: number;
  effectiveRate: string;
  ruleTraces: {
    rule: string;
    passed: boolean;
  }[];
  calculation: {
    transaction: string;
    eligibleSpend: string;
    basePoints: string;
    multiplier: string;
    capRemaining: string;
    pointValuation: string;
    netValue: string;
  };
}

export interface EngineSimulation {
  merchant: string;
  category: string;
  mcc: string;
  amount: number;
  channel: string;
  goal: string;
  cards: EngineCardResult[];
}

export const getSimulationResult = (
  merchantId: string,
  amount: number,
  goal: string
): EngineCardResult[] => {
  // Deterministic calculation logic based on parameters
  if (merchantId === 'insurance') {
    return [
      {
        rank: 1,
        name: 'SBI Cashback Credit Card',
        bank: 'SBI Card',
        image: '/cards/sbi-elite.png',
        totalValue: amount * 0.01,
        baseReward: amount * 0.01,
        acceleratedReward: 0,
        offerValue: 0,
        milestoneContribution: 0,
        effectiveRate: '1.00% Net Return',
        ruleTraces: [
          { rule: 'Online payment channel verified', passed: true },
          { rule: 'Base 1% cashback applicable to insurance category', passed: true },
          { rule: '5% accelerated cashback excluded for MCC 6300 (Insurance)', passed: false },
          { rule: 'Excluded from milestone target', passed: false },
        ],
        calculation: {
          transaction: `₹${amount.toLocaleString('en-IN')}`,
          eligibleSpend: `₹${amount.toLocaleString('en-IN')}`,
          basePoints: '1% Direct Cashback',
          multiplier: 'Excluded from 5x',
          capRemaining: 'Uncapped base',
          pointValuation: '1 pt = ₹1.00',
          netValue: `₹${(amount * 0.01).toLocaleString('en-IN')}`,
        },
      },
      {
        rank: 2,
        name: 'HDFC Infinia Metal Edition',
        bank: 'HDFC Bank',
        image: '/cards/hdfc-infinia.png',
        totalValue: 0,
        baseReward: 0,
        acceleratedReward: 0,
        offerValue: 0,
        milestoneContribution: 0,
        effectiveRate: '0.00% (Excluded Category)',
        ruleTraces: [
          { rule: 'Insurance transactions (MCC 6300) excluded from base rewards', passed: false },
          { rule: 'SmartBuy 5x accelerator excluded for insurance', passed: false },
          { rule: 'Excluded from quarterly ₹1.5L milestone calculation', passed: false },
        ],
        calculation: {
          transaction: `₹${amount.toLocaleString('en-IN')}`,
          eligibleSpend: '₹0 (Excluded Category)',
          basePoints: '0 pts',
          multiplier: '0x',
          capRemaining: 'Exclusion rule applied',
          pointValuation: '₹0',
          netValue: '₹0',
        },
      },
      {
        rank: 3,
        name: 'Axis Bank Atlas Credit Card',
        bank: 'Axis Bank',
        image: '/cards/axis-atlas.png',
        totalValue: 0,
        baseReward: 0,
        acceleratedReward: 0,
        offerValue: 0,
        milestoneContribution: 0,
        effectiveRate: '0.00% (Excluded Category)',
        ruleTraces: [
          { rule: 'Insurance spending excluded from EDGE Rewards', passed: false },
        ],
        calculation: {
          transaction: `₹${amount.toLocaleString('en-IN')}`,
          eligibleSpend: '₹0',
          basePoints: '0 pts',
          multiplier: '0x',
          capRemaining: 'Excluded',
          pointValuation: '₹0',
          netValue: '₹0',
        },
      },
    ];
  }

  if (merchantId === 'makemytrip' || goal === 'travel') {
    const infiniaVal = Math.round(amount * 0.166);
    const axisVal = Math.round(amount * 0.10);
    const sbiVal = Math.round(amount * 0.05);

    return [
      {
        rank: 1,
        name: 'HDFC Infinia Metal Edition Credit Card',
        bank: 'HDFC Bank',
        image: '/cards/hdfc-infinia.png',
        totalValue: infiniaVal,
        baseReward: Math.round(amount * 0.033),
        acceleratedReward: Math.round(amount * 0.133),
        offerValue: 0,
        milestoneContribution: Math.round(amount * 0.02),
        effectiveRate: '16.60% Flight Return',
        ruleTraces: [
          { rule: 'SmartBuy Flight Portal portal booking verified', passed: true },
          { rule: '5x SmartBuy multiplier applied', passed: true },
          { rule: 'Monthly SmartBuy cap (15,000 pts) remaining', passed: true },
          { rule: 'Adds spend toward Q3 ₹1.5L milestone', passed: true },
        ],
        calculation: {
          transaction: `₹${amount.toLocaleString('en-IN')}`,
          eligibleSpend: `₹${amount.toLocaleString('en-IN')}`,
          basePoints: `${Math.round(amount / 30)} pts`,
          multiplier: '5x SmartBuy Multiplier',
          capRemaining: '₹15,000 bonus pts cap remaining',
          pointValuation: '1 Reward Point = ₹1.00 (Flight Redemption)',
          netValue: `₹${infiniaVal.toLocaleString('en-IN')}`,
        },
      },
      {
        rank: 2,
        name: 'Axis Bank Atlas Credit Card',
        bank: 'Axis Bank',
        image: '/cards/axis-atlas.png',
        totalValue: axisVal,
        baseReward: Math.round(amount * 0.02),
        acceleratedReward: Math.round(amount * 0.08),
        offerValue: 0,
        milestoneContribution: 0,
        effectiveRate: '10.00% AirMiles Yield',
        ruleTraces: [
          { rule: '5x EDGE Miles on direct flight bookings', passed: true },
          { rule: '1:1 AirMiles conversion ratio verified', passed: true },
        ],
        calculation: {
          transaction: `₹${amount.toLocaleString('en-IN')}`,
          eligibleSpend: `₹${amount.toLocaleString('en-IN')}`,
          basePoints: `${Math.round(amount / 50)} EDGE Miles`,
          multiplier: '5x Travel Edge Accelerator',
          capRemaining: 'Monthly cap active',
          pointValuation: '1 EDGE Mile = ₹1.00 AirMile',
          netValue: `₹${axisVal.toLocaleString('en-IN')}`,
        },
      },
      {
        rank: 3,
        name: 'SBI Cashback Credit Card',
        bank: 'SBI Card',
        image: '/cards/sbi-elite.png',
        totalValue: sbiVal,
        baseReward: sbiVal,
        acceleratedReward: 0,
        offerValue: 0,
        milestoneContribution: 0,
        effectiveRate: '5.00% Direct Cashback',
        ruleTraces: [
          { rule: '5% direct cashback on online flight spend', passed: true },
        ],
        calculation: {
          transaction: `₹${amount.toLocaleString('en-IN')}`,
          eligibleSpend: `₹${amount.toLocaleString('en-IN')}`,
          basePoints: '5% Statement Credit',
          multiplier: 'Flat 5%',
          capRemaining: '₹5,000 monthly cashback cap',
          pointValuation: '1 pt = ₹1.00',
          netValue: `₹${sbiVal.toLocaleString('en-IN')}`,
        },
      },
    ];
  }

  // Default: Amazon / Shopping
  const infiniaVal = Math.round(amount * 0.0833);
  const sbiVal = Math.round(amount * 0.05);
  const axisVal = Math.round(amount * 0.04);

  return [
    {
      rank: 1,
      name: 'HDFC Infinia Metal Edition',
      bank: 'HDFC Bank',
      image: '/cards/hdfc-infinia.png',
      totalValue: infiniaVal,
      baseReward: Math.round(amount * 0.033),
      acceleratedReward: Math.round(amount * 0.05),
      offerValue: 0,
      milestoneContribution: 0,
      effectiveRate: '8.33% Voucher Value',
      ruleTraces: [
        { rule: 'SmartBuy Amazon Gyftr voucher purchase verified', passed: true },
        { rule: '5x SmartBuy multiplier applied', passed: true },
        { rule: 'Monthly cap remaining', passed: true },
      ],
      calculation: {
        transaction: `₹${amount.toLocaleString('en-IN')}`,
        eligibleSpend: `₹${amount.toLocaleString('en-IN')}`,
        basePoints: `${Math.round(amount / 30)} pts`,
        multiplier: '5x SmartBuy Multiplier',
        capRemaining: '₹15,000 monthly cap remaining',
        pointValuation: '1 Pt = ₹1.00 (Flight Redemption)',
        netValue: `₹${infiniaVal.toLocaleString('en-IN')}`,
      },
    },
    {
      rank: 2,
      name: 'SBI Cashback Credit Card',
      bank: 'SBI Card',
      image: '/cards/sbi-elite.png',
      totalValue: sbiVal,
      baseReward: sbiVal,
      acceleratedReward: 0,
      offerValue: 0,
      milestoneContribution: 0,
      effectiveRate: '5.00% Direct Cashback',
      ruleTraces: [
        { rule: '5% direct cashback on Amazon online spend', passed: true },
      ],
      calculation: {
        transaction: `₹${amount.toLocaleString('en-IN')}`,
        eligibleSpend: `₹${amount.toLocaleString('en-IN')}`,
        basePoints: '5% Direct Statement Cashback',
        multiplier: 'Flat 5%',
        capRemaining: '₹5,000 monthly cap remaining',
        pointValuation: '1 pt = ₹1.00',
        netValue: `₹${sbiVal.toLocaleString('en-IN')}`,
      },
    },
    {
      rank: 3,
      name: 'Axis Bank Atlas Credit Card',
      bank: 'Axis Bank',
      image: '/cards/axis-atlas.png',
      totalValue: axisVal,
      baseReward: Math.round(amount * 0.02),
      acceleratedReward: Math.round(amount * 0.02),
      offerValue: 0,
      milestoneContribution: 0,
      effectiveRate: '4.00% EDGE Value',
      ruleTraces: [
        { rule: 'Base EDGE Rewards applied', passed: true },
      ],
      calculation: {
        transaction: `₹${amount.toLocaleString('en-IN')}`,
        eligibleSpend: `₹${amount.toLocaleString('en-IN')}`,
        basePoints: `${Math.round(amount / 50)} EDGE Miles`,
        multiplier: '2x Base Rate',
        capRemaining: 'Standard cap',
        pointValuation: '1 EDGE Mile = ₹0.80',
        netValue: `₹${axisVal.toLocaleString('en-IN')}`,
      },
    },
  ];
};
