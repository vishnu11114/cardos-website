import {
  Home,
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  Target,
  ArrowRight,
} from 'lucide-react';

export interface ProductChapter {
  id: string;
  num: string;
  label: string;
  shortLabel: string;
  deepPath?: string;
  deepLabel: string;
  icon: React.ElementType;
  description: string;
}

export const PRODUCT_CHAPTERS: ProductChapter[] = [
  {
    id: 'home',
    num: '01',
    label: 'Home',
    shortLabel: 'Home',
    deepPath: '/product',
    deepLabel: 'Product Experience',
    icon: Home,
    description: 'System Introduction & Card Intelligence',
  },
  {
    id: 'choose',
    num: '02',
    label: 'CHOOSE',
    shortLabel: 'Choose',
    deepPath: '/product',
    deepLabel: 'Product Intelligence',
    icon: Layers,
    description: 'Card Selection & Issuer Ecosystem',
  },
  {
    id: 'pay',
    num: '03',
    label: 'PAY',
    shortLabel: 'Pay',
    deepPath: '/rewards',
    deepLabel: 'Reward Engine',
    icon: Compass,
    description: 'Purchase Evaluation & Rupee Valuation',
  },
  {
    id: 'protect',
    num: '04',
    label: 'PROTECT',
    shortLabel: 'Protect',
    deepPath: '/fraud',
    deepLabel: 'Protection Center',
    icon: ShieldCheck,
    description: 'Trust Shield & Dispute Recovery',
  },
  {
    id: 'how',
    num: '05',
    label: 'HOW',
    shortLabel: 'How',
    deepPath: '/#how',
    deepLabel: 'System Mechanism',
    icon: Sparkles,
    description: 'How Credit Card OS Works',
  },
  {
    id: 'roadmap',
    num: '06',
    label: 'Roadmap',
    shortLabel: 'Roadmap',
    deepPath: '/roadmap',
    deepLabel: 'Product Horizon',
    icon: Target,
    description: 'Phased Rollout & Scope Pipeline',
  },
  {
    id: 'early-access',
    num: '07',
    label: 'Early Access',
    shortLabel: 'Access',
    deepPath: '/early-access',
    deepLabel: 'Join Waitlist',
    icon: ArrowRight,
    description: 'Founder Story & Priority Access',
  },
];

export const getChapterById = (id: string): ProductChapter | undefined => {
  const cleanId = id.replace('#', '');
  return PRODUCT_CHAPTERS.find((c) => c.id === cleanId);
};

export const getChapterByDeepPath = (pathname: string): ProductChapter | undefined => {
  return PRODUCT_CHAPTERS.find((c) => c.deepPath === pathname);
};
