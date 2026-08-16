'use client';

import React from 'react';

export type CapabilityStatus =
  | 'LIVE'
  | 'BETA'
  | 'DEMO'
  | 'ROADMAP'
  | 'PLANNED'
  | 'FUTURE VISION'
  | 'VERIFIED'
  | 'RECOVERY ACTIVE'
  | 'EXPIRED'
  | 'BLOCKED'
  | 'PENDING';

export interface StatusBadgeProps {
  status: CapabilityStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  className = '',
}) => {
  let styleClasses = 'bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5E7]';

  switch (status) {
    case 'LIVE':
    case 'VERIFIED':
      styleClasses = 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]';
      break;
    case 'BETA':
    case 'RECOVERY ACTIVE':
      styleClasses = 'bg-[#F0F6FF] text-[#0066CC] border-[#D2E3FC]';
      break;
    case 'DEMO':
    case 'PENDING':
      styleClasses = 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]';
      break;
    case 'ROADMAP':
    case 'PLANNED':
    case 'FUTURE VISION':
      styleClasses = 'bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5E7]';
      break;
    case 'EXPIRED':
    case 'BLOCKED':
      styleClasses = 'bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]';
      break;
  }

  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-mono font-bold uppercase rounded-full border shadow-2xs ${sizeClasses} ${styleClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
};
