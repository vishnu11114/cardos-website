export interface CopilotScenario {
  id: string;
  prompt: string;
  category: string;
  amount: string;
  processingSteps: string[];
  bestCard: {
    name: string;
    cardId: string;
    bank: string;
    image: string;
    expectedValue: string;
    baseReward: string;
    acceleratedReward: string;
    offerBonus: string;
    milestoneValue: string;
    effectiveRate: string;
  };
  whyThisCard: {
    pros: string[];
    cons: string[];
  };
  alternatives: {
    name: string;
    expectedValue: string;
    percentageWidth: number;
  }[];
  calculation: {
    transaction: string;
    basePoints: string;
    multiplier: string;
    offerBenefit: string;
    capRemaining: string;
    pointValuation: string;
    totalValue: string;
  };
  sources: {
    issuer: string;
    card: string;
    rule: string;
    verifiedDate: string;
  }[];
  followUps: string[];
}

export const copilotScenarios: Record<string, CopilotScenario> = {
  amazon: {
    id: 'amazon',
    prompt: "I'm spending ₹45,000 on Amazon India. Which card should I use for maximum return?",
    category: 'E-Commerce / Shopping',
    amount: '₹45,000',
    processingSteps: [
      'Checking your catalog of 12 Indian credit cards...',
      'Identifying merchant: Amazon India (MCC 5399)',
      'Checking active SmartBuy & Gyftr voucher rules...',
      'Evaluating monthly accelerated reward caps...',
      'Comparing HDFC Infinia 5x vs Axis Magnus 5x vs SBI 5%...',
      'Deterministic calculation & grounded explanation ready.',
    ],
    bestCard: {
      name: 'HDFC Infinia Metal Edition',
      cardId: 'hdfc_infinia',
      bank: 'HDFC Bank',
      image: '/cards/hdfc-infinia.png',
      expectedValue: '₹3,750',
      baseReward: '₹1,500 (5 pts / ₹150)',
      acceleratedReward: '₹2,250 (5x SmartBuy Multiplier)',
      offerBonus: '₹0 (Direct Voucher Purchase)',
      milestoneValue: 'Progresses Q3 ₹1.5L Target',
      effectiveRate: '8.33% Net Return',
    },
    whyThisCard: {
      pros: [
        '5x SmartBuy voucher multiplier active on Amazon Vouchers.',
        '100% 1:1 AirMiles flight redemption value.',
        'Adds ₹45,000 toward your Q3 ₹1,50,000 milestone bonus.',
      ],
      cons: [
        'Requires purchasing voucher via SmartBuy prior to Amazon checkout.',
      ],
    },
    alternatives: [
      { name: 'HDFC Infinia Metal (Recommended)', expectedValue: '₹3,750 (8.33%)', percentageWidth: 100 },
      { name: 'SBI Cashback Credit Card', expectedValue: '₹2,250 (5.00%)', percentageWidth: 60 },
      { name: 'Axis Bank Magnus / Reserve', expectedValue: '₹1,800 (4.00%)', percentageWidth: 48 },
    ],
    calculation: {
      transaction: '₹45,000',
      basePoints: '1,500 reward points (5 pts / ₹150)',
      multiplier: '5x SmartBuy Multiplier (7,500 total points)',
      offerBenefit: '₹0 (Voucher Purchase Path)',
      capRemaining: '₹15,000 monthly SmartBuy points cap remaining',
      pointValuation: '1 Reward Point = ₹0.50 - ₹1.00 (Flight Redemption)',
      totalValue: '₹3,750 Net Value Return',
    },
    sources: [
      {
        issuer: 'HDFC Bank',
        card: 'Infinia Metal Edition',
        rule: 'SmartBuy 5x Reward Points on Amazon Vouchers (Max 15,000 bonus pts/month)',
        verifiedDate: 'August 2026',
      },
      {
        issuer: 'SBI Card',
        card: 'SBI Cashback Card',
        rule: '5% Direct Statement Cashback on online spends (Max ₹5,000/month)',
        verifiedDate: 'August 2026',
      },
    ],
    followUps: [
      'Show me step-by-step mathematical calculation',
      'Compare HDFC Infinia vs SBI Cashback Card for Amazon',
      'Are there active bank sale offers on Amazon?',
    ],
  },
  travel: {
    id: 'travel',
    prompt: "Which card is best for booking ₹85,000 international flight tickets?",
    category: 'Travel & Flights',
    amount: '₹85,000',
    processingSteps: [
      'Checking airline & hotel partner transfer ratios...',
      'Identifying spend category: Flight Booking (MCC 4511)',
      'Checking SmartBuy Travel vs Axis Travel Edge portals...',
      'Comparing 1:1 AirMiles conversion options...',
      'Grounded recommendation generated.',
    ],
    bestCard: {
      name: 'HDFC Infinia Metal Edition',
      cardId: 'hdfc_infinia',
      bank: 'HDFC Bank',
      image: '/cards/hdfc-infinia.png',
      expectedValue: '₹14,110',
      baseReward: '₹2,833 (5 pts / ₹150)',
      acceleratedReward: '₹11,277 (5x SmartBuy Travel)',
      offerBonus: '₹0',
      milestoneValue: 'Unlocks Annual Fee Waiver Spend Milestone',
      effectiveRate: '16.60% Net Return',
    },
    whyThisCard: {
      pros: [
        '5x Reward Points on direct flight bookings via SmartBuy portal.',
        '1:1 Air Miles transfer ratio to 10+ partners including Singapore KrisFlyer & Air India.',
        'Includes complimentary worldwide medical emergency & trip delay cover.',
      ],
      cons: [
        'SmartBuy monthly points cap applies if total monthly booking exceeds ₹1.5 Lakhs.',
      ],
    },
    alternatives: [
      { name: 'HDFC Infinia Metal (Recommended)', expectedValue: '₹14,110 (16.6%)', percentageWidth: 100 },
      { name: 'Axis Bank Magnus / Reserve', expectedValue: '₹8,500 (10.0%)', percentageWidth: 60 },
      { name: 'ICICI Emeralde Private Metal', expectedValue: '₹5,100 (6.0%)', percentageWidth: 36 },
    ],
    calculation: {
      transaction: '₹85,000',
      basePoints: '2,833 reward points (5 pts / ₹150)',
      multiplier: '5x SmartBuy Travel Multiplier (14,110 total points)',
      offerBenefit: '₹0 (Direct Flight Portal)',
      capRemaining: '₹15,000 monthly travel point ceiling',
      pointValuation: '1 Reward Point = ₹1.00 for Air Ticket Booking',
      totalValue: '₹14,110 Net Value Return',
    },
    sources: [
      {
        issuer: 'HDFC Bank',
        card: 'Infinia Metal Edition',
        rule: 'SmartBuy Flights 5x Reward Multiplier (100% 1:1 AirMiles ratio)',
        verifiedDate: 'August 2026',
      },
    ],
    followUps: [
      'Show me airline transfer partners for HDFC Infinia',
      'What is the foreign exchange fee if I buy overseas flights?',
      'Does Infinia provide complimentary airport lounge access?',
    ],
  },
  croma: {
    id: 'croma',
    prompt: "I'm buying a ₹1,20,000 laptop on Croma. What card and offer combination should I choose?",
    category: 'Electronics',
    amount: '₹1,20,000',
    processingSteps: [
      'Evaluating ₹1,20,000 electronics spend at Croma / Apple...',
      'Checking instant bank sale offers vs reward point yield...',
      'Comparing HDFC Instant Cashback vs ICICI Instant Off...',
      'Optimal stacking strategy calculated.',
    ],
    bestCard: {
      name: 'ICICI Emeralde Private Metal',
      cardId: 'icici_emeralde',
      bank: 'ICICI Bank',
      image: '/cards/icici-emeralde.png',
      expectedValue: '₹10,000',
      baseReward: '₹1,800 (6 pts / ₹100)',
      acceleratedReward: '₹0',
      offerBonus: '₹10,000 (Instant Bank Sale Discount)',
      milestoneValue: 'Progresses ₹15L Annual Spend Target',
      effectiveRate: '9.83% Net Return',
    },
    whyThisCard: {
      pros: [
        '₹10,000 instant bank sale discount applied directly at payment POS.',
        'Low 1.5% forex markup fee if buying from international retail site.',
      ],
      cons: [
        'Instant discount overrides reward point multiplier on sale items.',
      ],
    },
    alternatives: [
      { name: 'ICICI Emeralde Private (Recommended)', expectedValue: '₹11,800 (9.83%)', percentageWidth: 100 },
      { name: 'HDFC Infinia Metal Edition', expectedValue: '₹10,000 (8.33%)', percentageWidth: 85 },
      { name: 'SBI Cashback Credit Card', expectedValue: '₹5,000 (4.16%)', percentageWidth: 42 },
    ],
    calculation: {
      transaction: '₹1,20,000',
      basePoints: '7,200 ICICI Reward Points (6 pts / ₹100)',
      multiplier: '1x Standard Earnings',
      offerBenefit: '₹10,000 Instant Bank Discount at POS checkout',
      capRemaining: 'Instant discount limit 1 per card per month',
      pointValuation: '1 ICICI Reward Point = ₹0.25 Statement Credit',
      totalValue: '₹11,800 Net Potential Value',
    },
    sources: [
      {
        issuer: 'ICICI Bank',
        card: 'Emeralde Private Metal',
        rule: 'Electronics Partner Instant Bank Sale Discount (Croma / Apple Store)',
        verifiedDate: 'August 2026',
      },
    ],
    followUps: [
      'Should I take No-Cost EMI or pay full upfront?',
      'Show me warranty & purchase protection terms',
    ],
  },
};

export const getCopilotScenario = (id: string): CopilotScenario => {
  return copilotScenarios[id] || copilotScenarios.amazon;
};
