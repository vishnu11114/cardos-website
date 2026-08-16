'use client';

import React from 'react';

interface ContextSubNavProps {
  currentChapterId: string;
  pageTitle: string;
  badgeLabel?: string;
  badgeType?: 'green' | 'blue' | 'purple' | 'gold' | 'red';
  siblingLinks?: { href: string; label: string; active?: boolean }[];
}

export const ContextSubNav: React.FC<ContextSubNavProps> = () => {
  return null;
};
