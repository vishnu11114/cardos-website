import { DetailedCardSpec } from '../schema/cardSchema';
import hdfcCards from './hdfc.json';
import axisCards from './axis.json';
import iciciCards from './icici.json';
import sbiCards from './sbi.json';
import amexCards from './amex.json';

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
