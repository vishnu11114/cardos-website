export interface TimelineEvent {
  time: string;
  actor: string;
  action: string;
  status: string;
  reference?: string;
}

export interface BankHotline {
  bank: string;
  phone: string;
  email: string;
  webLockUrl: string;
}

export interface ScamEducationCard {
  id: string;
  title: string;
  warningSigns: string[];
  doAction: string;
  dontAction: string;
}

export interface FraudCaseDemoData {
  caseId: string;
  status: string;
  disputedAmount: string;
  provisionalCredit: string;
  card: string;
  merchant: string;
  incidentType: string;
  assignedSpecialist: {
    name: string;
    role: string;
    location: string;
    initials: string;
  };
  timeline: TimelineEvent[];
  documents: {
    title: string;
    type: string;
    verified: boolean;
  }[];
}

export const bankHotlines: BankHotline[] = [
  { bank: 'HDFC Bank', phone: '1800 266 4332', email: 'support@hdfcbank.com', webLockUrl: 'https://netbanking.hdfcbank.com' },
  { bank: 'ICICI Bank', phone: '1800 108 0', email: 'customer.care@icicibank.com', webLockUrl: 'https://icicibank.com' },
  { bank: 'SBI Card', phone: '1860 180 1290', email: 'customercare@sbicard.com', webLockUrl: 'https://sbicard.com' },
  { bank: 'American Express', phone: '1800 419 2121', email: 'india.customercare@aexp.com', webLockUrl: 'https://americanexpress.com' },
];

export const scamEducationCards: ScamEducationCard[] = [
  {
    id: 'phishing',
    title: 'Phishing & Fake SMS',
    warningSigns: [
      'SMS with urgent link claiming card is blocked.',
      'Fake domain (e.g., hdfc-verify-login.cc).',
      'Requests for OTP or CVV on web form.',
    ],
    doAction: 'Call number on the back of your card.',
    dontAction: 'Never click SMS links or share OTPs.',
  },
  {
    id: 'otp_scam',
    title: 'Fake Refund & Impersonation Calls',
    warningSigns: [
      'Caller claiming accidental excess refund.',
      'Requests to install screen-share apps.',
      'Urgent threats of legal action.',
    ],
    doAction: 'Hang up and log incident in CardOS.',
    dontAction: 'Never grant remote screen access.',
  },
];

export const fraudCaseDemoData: FraudCaseDemoData = {
  caseId: 'CCOS-2048-FRD',
  status: 'PREPARING DISPUTE',
  disputedAmount: '₹12,499',
  provisionalCredit: 'Eligible under RBI 3-Day Zero Liability',
  card: 'HDFC Infinia Metal Edition (•••• 4821)',
  merchant: 'Unrecognized Online Merchant (MCC 5399)',
  incidentType: 'Unauthorized Card Transaction',
  assignedSpecialist: {
    name: 'Ananya Sharma',
    role: 'Financial Crime Advocate Concept',
    location: 'Bangalore Operations Desk',
    initials: 'AS',
  },
  timeline: [
    { time: '10:42 AM', actor: 'User', action: 'Unauthorized transaction reported (₹12,499)', status: 'REPORTED' },
    { time: '10:44 AM', actor: 'CardOS Engine', action: 'Issued RBI zero-liability triage checklist', status: 'TRIAGED' },
    { time: '10:47 AM', actor: 'Evidence Vault', action: 'Compiled SMS alert & MCC breakdown', status: 'EVIDENCE ORGANIZED' },
    { time: '10:51 AM', actor: 'CardOS Generator', action: 'Generated 1-click RBI Ombudsman dispute letter', status: 'TEMPLATE READY', reference: 'HDFC-DISPUTE-TEMPLATE' },
    { time: 'Next Step', actor: 'User Action Required', action: 'Call bank hotline & record complaint reference ID', status: 'USER ACTION REQUIRED' },
  ],
  documents: [
    { title: 'RBI Zero-Liability Nodal Dispute Form (PDF)', type: 'Official Template', verified: true },
    { title: 'Transaction SMS Verification Logs', type: 'SMS Evidence', verified: true },
    { title: 'Merchant MCC Classification Audit', type: 'System Evidence', verified: true },
  ],
};
