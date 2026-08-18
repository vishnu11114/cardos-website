import hdfcCards from './hdfc.json';
import axisCards from './axis.json';
import iciciCards from './icici.json';
import sbiCards from './sbi.json';
import amexCards from './amex.json';

export interface CardPointValuation {
  flightRedemption: number;
  hotelRedemption: number;
  statementCredit: number;
  voucherRedemption: number;
}

export interface AcceleratedCategory {
  category: string;
  merchantName?: string;
  multiplier: string;
  effectiveReturnPercentage: number;
  monthlyCapPoints?: number;
  monthlyCapAmountINR?: number;
  conditions?: string;
}

export interface ExcludedCategory {
  category: 'Fuel' | 'Rent' | 'Utilities' | 'Wallet' | 'Government' | 'Insurance' | 'Jewelry' | 'Education' | string;
  mccCodes?: string[];
  earnsRewards: boolean;
  hasSurcharge: boolean;
  surchargeWaiverCapINR?: number;
}

export interface PartnerTransfer {
  programName: string;
  category: 'Airlines' | 'Hotels';
  ratioCardPoints: number;
  ratioPartnerPoints: number;
  minTransferBlock: number;
}

export interface MilestoneReward {
  spendThresholdINR: number;
  period: 'Quarterly' | 'Annual';
  rewardDescription: string;
  valueINR: number;
}

export interface VerificationMetadata {
  lastUpdated: string;
  verifiedBy: string;
  sourceDocumentUrl: string;
  version: number;
}

export interface DetailedCardSpec {
  id: string;
  bankId: string;
  bankName: string;
  cardName: string;
  variantName: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex' | 'DinersClub';
  tier: 'Entry' | 'Mid' | 'Premium' | 'SuperPremium' | 'Business';
  image: string;
  joiningFee: number;
  annualFee: number;
  annualFeeWaiverThreshold: number;
  feeWaiverExclusions: string[];
  rewardCurrencyName: string;
  baseRewardRatePercentage: number;
  pointValuationINR: CardPointValuation;
  acceleratedCategories: AcceleratedCategory[];
  excludedCategories: ExcludedCategory[];
  voucherMultipliers: Array<{
    platform: string;
    partnerMerchant: string;
    multiplier: string;
    effectiveReturnPercentage: number;
    monthlyCapINR: number;
  }>;
  partnerTransfers: PartnerTransfer[];
  loungeAccess: {
    domestic: {
      visitsPerQuarter: number;
      isSpendBased: boolean;
      quarterlySpendThresholdINR?: number;
      guestAllowed: boolean;
    };
    international: {
      visitsPerYear: number;
      program: string;
    };
  };
  forexMarkupPercentage: number;
  cashWithdrawalFeePercentage: number;
  milestoneRewards: MilestoneReward[];
  verificationMetadata: VerificationMetadata;
}

export const ALL_BANK_DATASETS: DetailedCardSpec[] = [
  ...hdfcCards,
  ...axisCards,
  ...iciciCards,
  ...sbiCards,
  ...amexCards,
] as DetailedCardSpec[];

export const getCardById = (id: string): DetailedCardSpec | undefined => {
  return ALL_BANK_DATASETS.find((c) => c.id === id);
};

export const getCardsByBank = (bankId: string): DetailedCardSpec[] => {
  return ALL_BANK_DATASETS.filter((c) => c.bankId === bankId);
};
