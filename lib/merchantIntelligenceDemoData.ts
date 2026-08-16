export interface MerchantOffer {
  id: string;
  title: string;
  type: 'Bank Sale Offer' | 'Reward Accelerator' | 'Card Specific' | 'Voucher Multiplier';
  bank: string;
  minSpend: string;
  maxDiscount: string;
  expiry: string;
  status: 'ACTIVE' | 'ENDING SOON' | 'UPCOMING';
  stackable: boolean;
  source: string;
  conditions: string[];
}

export interface MerchantProfile {
  id: string;
  name: string;
  category: 'E-Commerce / Shopping' | 'Travel & Flights' | 'Dining & Food' | 'Electronics' | 'Luxury & Hotels' | 'Entertainment & Movies' | 'Fuel & Utility';
  mcc: string;
  mccStatus: 'MCC Confirmed' | 'MCC Observed' | 'MCC Likely';
  descriptors: string[];
  logoIcon: string;
  image?: string;
  channels: {
    id: string;
    label: string;
    multiplier: string;
    bestCard: string;
    bestCardId: string;
    expectedValue: string;
  }[];
  offers: MerchantOffer[];
  stackingExample: {
    baseReward: string;
    acceleratedReward: string;
    bankOffer: string;
    merchantDiscount: string;
    totalDirectValue: string;
    conflictNotice?: string;
  };
}

export const merchantProfiles: Record<string, MerchantProfile> = {
  amazon: {
    id: 'amazon',
    name: 'Amazon India',
    category: 'E-Commerce / Shopping',
    mcc: '5399',
    mccStatus: 'MCC Confirmed',
    descriptors: ['AMZN SELLER SERVICES', 'AMAZON PAY INDIA', 'AMAZON MARKETPLACE', 'AMZN DIGIT'],
    logoIcon: '🛒',
    image: '/merchants/amazon.png',
    channels: [
      { id: 'gyftr', label: 'Gyftr Voucher Portal', multiplier: '5x Reward Points', bestCard: 'HDFC Infinia Metal Edition', bestCardId: 'hdfc_infinia', expectedValue: '16.60% Return' },
      { id: 'direct', label: 'Direct Online Checkout', multiplier: '5% Direct Cashback', bestCard: 'SBI Cashback Credit Card', bestCardId: 'sbi_cashback', expectedValue: '5.00% Return' },
      { id: 'pay', label: 'Amazon Pay Balance', multiplier: '5% Unlimited Earnings', bestCard: 'Amazon Pay ICICI Card', bestCardId: 'icici_emeralde', expectedValue: '5.00% Return' },
    ],
    offers: [
      {
        id: 'amzn_off_1',
        title: '10% Instant Bank Sale Discount',
        type: 'Bank Sale Offer',
        bank: 'HDFC / ICICI Bank',
        minSpend: '₹5,000',
        maxDiscount: '₹1,500',
        expiry: '15 Aug 2026',
        status: 'ENDING SOON',
        stackable: false,
        source: 'Verified from HDFC & ICICI Official Feeds',
        conditions: ['Valid on minimum purchase of ₹5,000', 'Maximum instant discount ₹1,500 per card account', 'Excludes Amazon Pay Gift Card purchases'],
      },
      {
        id: 'amzn_off_2',
        title: '5x SmartBuy Gyftr Multiplier',
        type: 'Reward Accelerator',
        bank: 'HDFC Bank',
        minSpend: '₹250',
        maxDiscount: 'Uncapped (15k monthly pts)',
        expiry: '31 Dec 2026',
        status: 'ACTIVE',
        stackable: true,
        source: 'HDFC SmartBuy Portal T&C August 2026',
        conditions: ['Purchased via SmartBuy Gyftr portal', 'Maximum 15,000 bonus points per calendar month', 'Valid for HDFC Infinia and Diners Black'],
      },
    ],
    stackingExample: {
      baseReward: '₹450',
      acceleratedReward: '₹2,250 (5x Gyftr)',
      bankOffer: '₹1,500 (Instant Off)',
      merchantDiscount: '₹500',
      totalDirectValue: '₹4,700',
      conflictNotice: 'System recommendation: 10% Instant Bank Sale Discount yields higher net value than 5x Voucher for purchases under ₹15,000.',
    },
  },
  makemytrip: {
    id: 'makemytrip',
    name: 'MakeMyTrip',
    category: 'Travel & Flights',
    mcc: '4511',
    mccStatus: 'MCC Confirmed',
    descriptors: ['MMT INDIA PVT LTD', 'MAKEMYTRIP FLIGHTS', 'MMT HOTELS'],
    logoIcon: '✈️',
    image: '/merchants/makemytrip.png',
    channels: [
      { id: 'smartbuy', label: 'SmartBuy Travel Portal', multiplier: '5x Reward Points', bestCard: 'HDFC Infinia Metal Edition', bestCardId: 'hdfc_infinia', expectedValue: '16.60% Return' },
      { id: 'direct', label: 'Direct MMT Website', multiplier: '5x EDGE Miles', bestCard: 'Axis Bank Magnus / Reserve', bestCardId: 'axis_magnus', expectedValue: '10.00% Return' },
    ],
    offers: [
      {
        id: 'mmt_off_1',
        title: '₹2,500 Instant Discount on International Flights',
        type: 'Bank Sale Offer',
        bank: 'ICICI / Axis Bank',
        minSpend: '₹30,000',
        maxDiscount: '₹2,500',
        expiry: '25 Aug 2026',
        status: 'ACTIVE',
        stackable: true,
        source: 'MakeMyTrip Official Partner Feed',
        conditions: ['Valid on minimum flight booking of ₹30,000', 'Code MMTSALE active at payment checkout', 'Limited to 1 transaction per user per month'],
      },
    ],
    stackingExample: {
      baseReward: '₹1,500',
      acceleratedReward: '₹18,500 (5x SmartBuy)',
      bankOffer: '₹2,500 (Instant Off)',
      merchantDiscount: '₹0',
      totalDirectValue: '₹22,500',
    },
  },
  swiggy: {
    id: 'swiggy',
    name: 'Swiggy Food',
    category: 'Dining & Food',
    mcc: '5812',
    mccStatus: 'MCC Confirmed',
    descriptors: ['BUNDL TECHNOLOGIES', 'SWIGGY DINEOUT', 'ZOMATO MEDIA PVT'],
    logoIcon: '🍔',
    image: '/merchants/swiggy.png',
    channels: [
      { id: 'direct', label: 'Swiggy App Pay', multiplier: '10% Direct Cashback', bestCard: 'SBI Cashback Credit Card', bestCardId: 'sbi_cashback', expectedValue: '10.00% Return' },
      { id: 'dineout', label: 'Swiggy Dineout POS', multiplier: '10x Reward Points', bestCard: 'HDFC Infinia Metal Edition', bestCardId: 'hdfc_infinia', expectedValue: '16.60% Return' },
    ],
    offers: [
      {
        id: 'swiggy_off_1',
        title: '10% Instant Cashback on Food Orders',
        type: 'Card Specific',
        bank: 'HDFC / SBI Card',
        minSpend: '₹100',
        maxDiscount: '₹1,500 / month',
        expiry: '31 Dec 2026',
        status: 'ACTIVE',
        stackable: true,
        source: 'Swiggy HDFC Co-Branded Terms August 2026',
        conditions: ['Auto-applied at checkout for Swiggy Food & Instamart', 'Capped at ₹1,500 monthly total cashback', 'Valid on all online transactions'],
      },
    ],
    stackingExample: {
      baseReward: '₹120',
      acceleratedReward: '₹1,080 (10x Dineout)',
      bankOffer: '₹1,200 (Instant Off)',
      merchantDiscount: '₹0',
      totalDirectValue: '₹2,400',
    },
  },
  apple: {
    id: 'apple',
    name: 'Apple Store India',
    category: 'Electronics',
    mcc: '5732',
    mccStatus: 'MCC Confirmed',
    descriptors: ['APPLE INDIA PVT LTD', 'IMAGINE STORES', 'UNICORN APPLE RESELLER'],
    logoIcon: '🍎',
    image: '/merchants/apple.png',
    channels: [
      { id: 'smartbuy', label: 'SmartBuy Apple Portal', multiplier: '5x Reward Points', bestCard: 'HDFC Infinia Metal Edition', bestCardId: 'hdfc_infinia', expectedValue: '16.60% Return' },
      { id: 'direct', label: 'Apple Official Online', multiplier: '₹10,000 Instant Cashback', bestCard: 'ICICI Emeralde Private Metal', bestCardId: 'icici_emeralde', expectedValue: '7.50% Return' },
    ],
    offers: [
      {
        id: 'apple_off_1',
        title: '₹10,000 Instant Cashback on MacBook Pro',
        type: 'Bank Sale Offer',
        bank: 'HDFC Bank',
        minSpend: '₹89,900',
        maxDiscount: '₹10,000',
        expiry: '30 Sep 2026',
        status: 'ACTIVE',
        stackable: true,
        source: 'Apple India Official Retail Partner Feed',
        conditions: ['Valid on HDFC Credit Cards & EasyEMI transactions', 'Instant cashback credited directly at checkout', 'Limit 1 claim per card per quarter'],
      },
    ],
    stackingExample: {
      baseReward: '₹4,500',
      acceleratedReward: '₹16,000 (5x SmartBuy)',
      bankOffer: '₹10,000 (Instant Off)',
      merchantDiscount: '₹0',
      totalDirectValue: '₹30,500',
    },
  },
  taj: {
    id: 'taj',
    name: 'Taj Hotels & Resorts',
    category: 'Luxury & Hotels',
    mcc: '7011',
    mccStatus: 'MCC Confirmed',
    descriptors: ['INDIAN HOTELS CO LTD', 'TAJ PALACE HOTELS', 'TAJ RESERVATIONS'],
    logoIcon: '🏰',
    image: '/merchants/taj.png',
    channels: [
      { id: 'amex', label: 'Amex Fine Hotels & Resorts', multiplier: '3x Rewards + Gold Status', bestCard: 'American Express Platinum Card', bestCardId: 'amex_platinum', expectedValue: '20.00% Return' },
      { id: 'direct', label: 'Direct Taj Website', multiplier: '1:1 Taj InnerCircle Transfer', bestCard: 'HDFC Infinia Metal Edition', bestCardId: 'hdfc_infinia', expectedValue: '16.60% Return' },
    ],
    offers: [
      {
        id: 'taj_off_1',
        title: '₹45,000 Taj Stay Voucher Welcome Gift',
        type: 'Card Specific',
        bank: 'Amex India',
        minSpend: '₹0 (Welcome Benefit)',
        maxDiscount: '₹45,000',
        expiry: '31 Dec 2026',
        status: 'ACTIVE',
        stackable: true,
        source: 'Amex Platinum Member Benefit Guide 2026',
        conditions: ['Issued upon annual fee payment and card setup', 'Valid for room stay and dining at participating Taj properties', 'Advance reservation mandatory'],
      },
    ],
    stackingExample: {
      baseReward: '₹6,000',
      acceleratedReward: '₹24,000 (Points Transfer)',
      bankOffer: '₹45,000 (Taj Voucher)',
      merchantDiscount: '₹5,000',
      totalDirectValue: '₹80,000',
    },
  },
  emirates: {
    id: 'emirates',
    name: 'Emirates Airlines',
    category: 'Travel & Flights',
    mcc: '4511',
    mccStatus: 'MCC Confirmed',
    descriptors: ['EMIRATES AIRLINES', 'EMIRATES DUBAI', 'EK FLIGHTS ONLINE'],
    logoIcon: '✈️',
    image: '/merchants/emirates.png',
    channels: [
      { id: 'skywards', label: 'Emirates Direct Skywards', multiplier: '5x Skywards Miles Transfer', bestCard: 'American Express Platinum Card', bestCardId: 'amex_platinum', expectedValue: '18.50% Return' },
      { id: 'edge', label: 'Axis EDGE Miles Transfer', multiplier: '5:4 Transfer Ratio', bestCard: 'Axis Bank Magnus / Reserve', bestCardId: 'axis_magnus', expectedValue: '12.00% Return' },
    ],
    offers: [
      {
        id: 'ek_off_1',
        title: '15% Discount on Business & First Class Fares',
        type: 'Card Specific',
        bank: 'Amex / HDFC Infinia',
        minSpend: '₹1,20,000',
        maxDiscount: '15% Off Total Tariff',
        expiry: '31 Dec 2026',
        status: 'ACTIVE',
        stackable: true,
        source: 'Emirates Luxury Travel Partnership 2026',
        conditions: ['Valid on flights departing from India (DEL/BOM/BLR/MAA)', 'Promo code AMEXEK active at checkout', 'Includes complimentary chauffeur-drive service'],
      },
    ],
    stackingExample: {
      baseReward: '₹4,500',
      acceleratedReward: '₹22,500 (Skywards Miles)',
      bankOffer: '₹18,000 (15% Instant Partner Off)',
      merchantDiscount: '₹0',
      totalDirectValue: '₹45,000',
    },
  },
};

export const getMerchantById = (id: string): MerchantProfile | undefined => {
  return merchantProfiles[id] || Object.values(merchantProfiles)[0];
};

export const getAllMerchants = (): MerchantProfile[] => {
  return Object.values(merchantProfiles);
};
