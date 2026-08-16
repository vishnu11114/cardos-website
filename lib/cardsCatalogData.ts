import cardSettingsJson from './card-image-settings.json';

export interface CardDisplaySettings {
  zoom: number;
  scale: number;
  positionX: number;
  positionY: number;
}

export interface CardSpec {
  id: string;
  name: string;
  shortName: string;
  bank: string;
  category: 'Premium' | 'Travel' | 'Cashback' | 'Entry-Level' | 'Business';
  joiningFee?: string;
  annualFee: string;
  feeWaiver: string;
  rewardRate: string;
  lounge: string;
  forexMarkup: string;
  image: string;
  imageScale?: number;
  imageDisplaySettings?: CardDisplaySettings;
  tag: string;
  network: 'Visa Infinite' | 'Mastercard World Elite' | 'American Express' | 'RuPay Select';
  transferPartners: string[];
  evidenceSource: string;
  highlights: string[];
  milestones: string;
  welcomeOffer: string;
}

const getDisplaySettings = (key: string): CardDisplaySettings | undefined => {
  const cardData = (cardSettingsJson.cards as Record<string, CardDisplaySettings>)[key];
  if (!cardData) return undefined;
  return {
    zoom: cardData.zoom ?? 1.0,
    scale: cardData.scale ?? 1.0,
    positionX: cardData.positionX ?? 0,
    positionY: cardData.positionY ?? 0,
  };
};

export const ALL_CARD_CATALOG: CardSpec[] = [
  {
    id: 'amex_platinum',
    name: 'American Express Platinum Card',
    shortName: 'AMEX',
    bank: 'American Express',
    category: 'Premium',
    joiningFee: '₹60,000 + GST',
    annualFee: '₹60,000 + GST',
    feeWaiver: 'Bespoke Membership Privileges (No standard fee waiver)',
    rewardRate: '5x - 10x Membership Rewards Points',
    lounge: 'Unlimited Centurion, Executive & Priority Pass Lounges (Global)',
    forexMarkup: '3.5% + GST',
    image: '/cards/amex-platinum.png',
    imageDisplaySettings: getDisplaySettings('amex-platinum'),
    tag: 'Ultra Luxury & Centurion Lounge',
    network: 'American Express',
    transferPartners: ['Marriott Bonvoy', 'Taj InnerCircle', 'British Airways Executive Club', 'Singapore KrisFlyer', 'Hilton Honors'],
    evidenceSource: 'American Express India Platinum Terms & Privileges 2026',
    highlights: [
      'Access to exclusive American Express Centurion Lounges globally with complimentary gourmet dining & spa',
      '10x Membership Rewards points on Taj Hotels, Marriott Bonvoy & luxury fine dining partner network',
      '1:1 points transfer ratio to 10+ premium international airline and luxury hotel loyalty programs',
      '24/7 Dedicated Amex Platinum Concierge for bespoke travel, dining, and event reservations',
      'Complimentary elite tier statuses in Marriott Bonvoy Gold Elite & Hilton Honors Gold',
    ],
    milestones: '135,000 Membership Rewards points on joining & annual spend milestones',
    welcomeOffer: '135,000 Membership Rewards points or Taj / Postcard Hotel vouchers upon fee payment',
  },
  {
    id: 'hdfc_infinia',
    name: 'HDFC Infinia Metal Edition Credit Card',
    shortName: 'HDFC',
    bank: 'HDFC Bank',
    category: 'Premium',
    joiningFee: '₹12,500 + GST',
    annualFee: '₹12,500 + GST',
    feeWaiver: 'Spend ₹10 Lakhs in anniversary year',
    rewardRate: '5x Points on SmartBuy (16.6% Value)',
    lounge: 'Unlimited Domestic & International Lounge (Primary + Add-on)',
    forexMarkup: '2.0% + GST',
    image: '/cards/hdfc-infinia.png',
    imageDisplaySettings: getDisplaySettings('hdfc-infinia'),
    tag: 'Highest Value Return',
    network: 'Visa Infinite',
    transferPartners: ['Air India Flying Returns', 'Singapore KrisFlyer', 'Etihad Guest', 'Accor Live Limitless', 'Taj InnerCircle'],
    evidenceSource: 'HDFC Bank SmartBuy Terms & Conditions August 2026',
    highlights: [
      '5 reward points per ₹150 base spend (3.33% return value)',
      '5x reward points on Flight & Hotel bookings via SmartBuy portal (up to 15,000 points/month cap)',
      '1:1 Air Miles transfer ratio across 10+ airline and hotel partner programs',
      'Unlimited complimentary golf games and coaching sessions at select Indian & global courses',
      'Medical emergency cover up to ₹50 Lakhs when travelling overseas',
    ],
    milestones: '12,500 Reward Points bonus on fee payment & anniversary renewal',
    welcomeOffer: '12,500 Reward Points upon fee payment and card activation',
  },
  {
    id: 'icici_emeralde',
    name: 'ICICI Bank Emeralde Credit Card',
    shortName: 'ICICI',
    bank: 'ICICI Bank',
    category: 'Premium',
    joiningFee: '₹12,000 + GST',
    annualFee: '₹12,000 + GST',
    feeWaiver: 'Spend ₹15 Lakhs in previous year',
    rewardRate: '4 ICICI Rewards / ₹100 Spends',
    lounge: 'Unlimited Domestic & International Lounge Access',
    forexMarkup: '1.5% + GST',
    image: '/cards/icici-emeralde.png',
    imageDisplaySettings: getDisplaySettings('icici-emeralde'),
    tag: 'Low 1.5% Forex Fee',
    network: 'Visa Infinite',
    transferPartners: ['InterMiles', 'Air India Flying Returns', 'British Airways Executive Club'],
    evidenceSource: 'ICICI Bank Emeralde Schedule of Charges 2026',
    highlights: [
      'Low 1.5% foreign currency markup fee for international transactions & foreign e-commerce',
      'Unlimited complimentary airport lounge visits nationwide with no quarterly spend threshold',
      'Cancellation cover up to ₹12,000 on flight & hotel bookings for up to 2 claims per year',
      'Complimentary golf rounds (2 per month) based on spend evaluation',
      'Unlimited airport spa access at select airport locations across India',
    ],
    milestones: '10,000 ICICI reward points bonus on achieving ₹15 Lakhs spend threshold',
    welcomeOffer: '12,000 ICICI Reward Points on payment of joining fee',
  },
  {
    id: 'axis_atlas',
    name: 'Axis Bank Atlas Credit Card',
    shortName: 'AXIS',
    bank: 'Axis Bank',
    category: 'Travel',
    joiningFee: '₹5,000 + GST',
    annualFee: '₹5,000 + GST',
    feeWaiver: 'Spend ₹15 Lakhs in card anniversary year',
    rewardRate: '5 EDGE Miles / ₹100 Travel (1 EM = 2 Miles)',
    lounge: 'Up to 18 Domestic & 12 International Lounge Visits / year',
    forexMarkup: '3.5% + GST',
    image: '/cards/axis-atlas.png',
    imageDisplaySettings: getDisplaySettings('axis-atlas'),
    tag: '5x EDGE Miles on Travel',
    network: 'Visa Infinite',
    transferPartners: ['Accor Live Limitless', 'Singapore KrisFlyer', 'Qatar Airways Privilege Club', 'Air India Flying Returns', 'Vistara', 'Etihad Guest', 'Marriott Bonvoy', 'Japan Airlines'],
    evidenceSource: 'Axis Bank Atlas Credit Card Benefits Schedule 2026',
    highlights: [
      'Earn 5 EDGE Miles per ₹100 spend on direct flight and hotel bookings (up to 10,000 EDGE Miles/month)',
      '1 EDGE Mile = 2 Partner Miles/Points across 16+ global airline & hotel loyalty programs (10% travel value return)',
      'Tier-based membership (Silver, Gold, Platinum) with up to 10,000 bonus EDGE Miles on spend milestones',
      '2 EDGE Miles per ₹100 spend on all other eligible retail and online spends',
      'Up to 18 domestic and 12 international lounge visits per year with Tier upgrade unlocks',
    ],
    milestones: '5,000 to 10,000 bonus EDGE Miles on achieving ₹3L / ₹7.5L / ₹15L spend tiers',
    welcomeOffer: '5,000 bonus EDGE Miles (worth 10,000 Partner Miles) on first transaction within 30 days',
  },
  {
    id: 'sbi_elite',
    name: 'SBI Card ELITE',
    shortName: 'SBI',
    bank: 'SBI Card',
    category: 'Premium',
    joiningFee: '₹4,999 + GST',
    annualFee: '₹4,999 + GST',
    feeWaiver: 'Spend ₹10 Lakhs in previous year',
    rewardRate: '5x Reward Points (10 Points / ₹100 Spends)',
    lounge: '6 Intl & 8 Domestic Lounge Visits per year',
    forexMarkup: '1.99% + GST',
    image: '/cards/sbi-elite.png',
    imageDisplaySettings: getDisplaySettings('sbi-elite'),
    tag: 'Low 1.99% Forex Fee & Club Vistara',
    network: 'Visa Infinite',
    transferPartners: ['Club Vistara', 'Trident Privilege', 'BookMyShow Movies Voucher'],
    evidenceSource: 'SBI Card ELITE Schedule of Charges 2026',
    highlights: [
      'Low 1.99% foreign currency markup fee for international transactions & foreign e-commerce',
      '5x Reward Points (10 Points per ₹100 spend) on Dining, Departmental Stores & Grocery purchases',
      'Complimentary Club Vistara Silver Tier membership & Trident Privilege Red Tier membership',
      'Free movie tickets worth ₹6,000 every year (2 tickets up to ₹250 each per month on BookMyShow)',
      '6 complimentary International Priority Pass lounge visits & 8 domestic lounge visits per year',
    ],
    milestones: '10,000 to 15,000 bonus Reward Points on achieving ₹3L / ₹4L / ₹5L / ₹8L annual spend tiers',
    welcomeOffer: 'Welcome e-Gift Voucher worth ₹5,000 from Yatra, Hush Puppies, Pantaloons or Shoppers Stop',
  },
  {
    id: 'federal_imperio',
    name: 'Federal Bank Imperio Credit Card',
    shortName: 'FEDERAL',
    bank: 'Federal Bank',
    category: 'Entry-Level',
    joiningFee: 'Lifetime Free (₹0)',
    annualFee: 'Lifetime Free (₹0)',
    feeWaiver: 'Lifetime Free (No spend requirement)',
    rewardRate: '3x Rewards on Utility, 2x Rewards on Dining',
    lounge: '2 Domestic Lounge Visits per quarter (Spend based)',
    forexMarkup: '2.5% + GST',
    image: '/cards/federal-imperio.png',
    imageDisplaySettings: getDisplaySettings('federal-imperio'),
    tag: 'Lifetime Free Lifestyle Card',
    network: 'Visa Infinite',
    transferPartners: ['Statement Credit Cashback', 'Brand Gift Vouchers'],
    evidenceSource: 'Federal Bank Imperio Credit Card Terms 2026',
    highlights: [
      'Lifetime Free positioning with zero annual fee and zero membership charges forever',
      'Accelerated reward points on grocery, dining, healthcare & utility bill payments',
      '2 domestic airport lounge visits per quarter across major Indian airports',
      '1% fuel surcharge waiver at all petrol stations across India',
    ],
    milestones: 'Bonus reward points on achieving quarterly spend targets',
    welcomeOffer: 'Welcome gift voucher or 1,000 bonus reward points on first transaction',
  },
  {
    id: 'indusind_pioneer_legacy',
    name: 'IndusInd Bank Pioneer Legacy Credit Card',
    shortName: 'INDUSIND',
    bank: 'IndusInd Bank',
    category: 'Premium',
    joiningFee: '₹15,000 + GST',
    annualFee: '₹15,000 + GST',
    feeWaiver: 'Spend ₹10 Lakhs in previous year',
    rewardRate: '2 Reward Points / ₹100 (1 Point = ₹1 Cash)',
    lounge: 'Unlimited Domestic & Priority Pass International Lounge Access',
    forexMarkup: '1.5% + GST',
    image: '/cards/indusind-pioneer-legacy.png',
    imageDisplaySettings: getDisplaySettings('indusind-pioneer-legacy'),
    tag: 'Low 1.5% Forex Fee & 1:1 Cash Return',
    network: 'Mastercard World Elite',
    transferPartners: ['Vistara', 'InterMiles', 'Direct Statement Credit'],
    evidenceSource: 'IndusInd Bank Pioneer Legacy Tariff Guide 2026',
    highlights: [
      '1 Reward Point = ₹1 Cash credit directly against monthly credit card statement balance',
      'Unlimited domestic and Priority Pass international airport lounge visits for cardholder',
      'Buy 1 Get 1 free movie tickets on BookMyShow up to ₹1,000 discount per ticket',
      'Low 1.5% foreign currency markup fee for international offline and online purchases',
    ],
    milestones: '15,000 bonus reward points on reaching ₹10 Lakhs annual spend',
    welcomeOffer: 'Oberoi Gift Voucher / Luxury brand vouchers worth ₹15,000 on card activation',
  },
  {
    id: 'kotak_cashback_plus',
    name: 'Kotak Cashback+ Credit Card',
    shortName: 'KOTAK',
    bank: 'Kotak Mahindra Bank',
    category: 'Cashback',
    joiningFee: '₹499 + GST',
    annualFee: '₹499 + GST',
    feeWaiver: 'Spend ₹2 Lakhs in previous year',
    rewardRate: '5% Cashback on Online Shopping & Food',
    lounge: '4 Domestic Lounge Visits per year',
    forexMarkup: '3.5% + GST',
    image: '/cards/kotak-cashback-plus.png',
    imageDisplaySettings: getDisplaySettings('kotak-cashback-plus'),
    tag: '5% Direct Online Cashback',
    network: 'Visa Infinite',
    transferPartners: ['Direct Cash Statement Credit'],
    evidenceSource: 'Kotak Mahindra Bank Cashback+ Benefit Schedule 2026',
    highlights: [
      '5% direct cashback on top online merchants (Amazon, Flipkart, Swiggy, Zomato)',
      '1.5% flat cashback on all offline retail spends credited directly into statement',
      'Fee waiver on achieving ₹200,000 spend threshold in card anniversary year',
      '1% fuel surcharge waiver up to ₹3,000 spend per transaction',
    ],
    milestones: 'Annual fee reversed automatically upon crossing ₹2 Lakhs spend threshold',
    welcomeOffer: '₹500 Cashback voucher on completing ₹10,000 spends in first 60 days',
  },
  {
    id: 'idfc_gaj',
    name: 'IDFC FIRST Bank Gaj Credit Card',
    shortName: 'IDFC',
    bank: 'IDFC FIRST Bank',
    category: 'Business',
    joiningFee: '₹10,000 + GST',
    annualFee: '₹10,000 + GST',
    feeWaiver: 'Spend ₹8 Lakhs in anniversary year',
    rewardRate: '10x Rewards on Spends > ₹30,000/month',
    lounge: 'Unlimited Domestic & International Lounge + Spa',
    forexMarkup: '0.99% + GST',
    image: '/cards/idfc-gaj.png',
    imageDisplaySettings: getDisplaySettings('idfc-gaj'),
    tag: 'Ultra Low 0.99% Forex & Heavy Metal',
    network: 'Visa Infinite',
    transferPartners: ['Club Vistara', 'Air India Flying Returns', 'Luxury Brand Vouchers'],
    evidenceSource: 'IDFC FIRST Bank Gaj Credit Card Terms 2026',
    highlights: [
      'Ultra-low 0.99% foreign currency markup fee on international transactions worldwide',
      'Premium heavy metal card construction with never-expiring reward points',
      'Unlimited domestic & international airport lounge visits + complimentary airport spa visits',
      'Interest-free ATM cash withdrawal worldwide for up to 48 days',
    ],
    milestones: '10x rewards unlocked automatically on monthly spends exceeding ₹30,000',
    welcomeOffer: 'Taj / Luxury Hotel stay voucher worth ₹10,000 on card activation',
  },
];

export const getCardById = (id: string): CardSpec | undefined => {
  return ALL_CARD_CATALOG.find((c) => c.id === id);
};

export const getCardsByIssuer = (bankName: string): CardSpec[] => {
  if (bankName === 'ALL') return ALL_CARD_CATALOG;
  return ALL_CARD_CATALOG.filter((c) => c.bank.toLowerCase().includes(bankName.toLowerCase()));
};

export const getCardsByCategory = (category: string): CardSpec[] => {
  if (category === 'ALL') return ALL_CARD_CATALOG;
  return ALL_CARD_CATALOG.filter((c) => c.category === category);
};
