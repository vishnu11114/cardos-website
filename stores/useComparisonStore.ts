import { create } from 'zustand';

export interface CardItem {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  rewardRate: string;
  image: string;
}

interface ComparisonState {
  selectedCards: CardItem[];
  addCard: (card: CardItem) => boolean;
  removeCard: (id: string) => void;
  clearAll: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  toggleMinimized: () => void;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  selectedCards: [
    {
      id: 'hdfc_infinia',
      name: 'HDFC Infinia Metal',
      issuer: 'HDFC Bank',
      annualFee: 12500,
      rewardRate: '3.3% - 16.6%',
      image: '/cards/hdfc-infinia.png',
    },
    {
      id: 'axis_magnus',
      name: 'Axis Bank Atlas',
      issuer: 'Axis Bank',
      annualFee: 5000,
      rewardRate: '5 EDGE Miles / ₹100',
      image: '/cards/axis-atlas.png',
    },
  ],
  addCard: (card) => {
    const { selectedCards } = get();
    if (selectedCards.length >= 4) return false;
    if (selectedCards.some((c) => c.id === card.id)) return true;
    set({ selectedCards: [...selectedCards, card], isOpen: true, isMinimized: false });
    return true;
  },
  removeCard: (id) => {
    set((state) => {
      const nextCards = state.selectedCards.filter((c) => c.id !== id);
      return {
        selectedCards: nextCards,
        isMinimized: nextCards.length === 0 ? false : state.isMinimized,
      };
    });
  },
  clearAll: () => set({ selectedCards: [], isMinimized: false }),
  isOpen: true,
  setIsOpen: (open) => set({ isOpen: open }),
  isMinimized: false,
  setIsMinimized: (minimized) => set({ isMinimized: minimized }),
  toggleMinimized: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));
