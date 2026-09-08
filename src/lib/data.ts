import type {
  ConnectedSource,
  CreditProduct,
  DemoPersona,
  LenderApplicant,
  NotificationItem,
  RepaymentItem,
  ScoreCategory,
  ScoreHistoryPoint,
  TrustScoreData,
} from '@/types';

export const WEIGHTS = {
  income: 0.3,
  repayment: 0.25,
  longevity: 0.2,
  transactions: 0.25,
} as const;

export function categoryForScore(score: number): ScoreCategory {
  if (score <= 40) return 'Building Trust';
  if (score <= 60) return 'Starter Trust';
  if (score <= 80) return 'Growing Trust';
  return 'High Trust';
}

export function tierForScore(score: number): 1 | 2 | 3 | 4 {
  if (score <= 40) return 1;
  if (score <= 60) return 2;
  if (score <= 80) return 3;
  return 4;
}

export function calculateScore(
  income: number,
  repayment: number,
  longevity: number,
  transactions: number
): number {
  const total =
    income * WEIGHTS.income +
    repayment * WEIGHTS.repayment +
    longevity * WEIGHTS.longevity +
    transactions * WEIGHTS.transactions;
  return Math.round(total * 100) / 100;
}

// ---- Persona: Rahul Sharma (Established Worker) ----
const rahulFactors: TrustScoreData = {
  total: 81.75,
  category: 'High Trust',
  tier: 4,
  trend: 4.2,
  factors: [
    {
      id: 'income',
      label: 'Income Stability',
      score: 82,
      weight: 0.3,
      weightPct: 30,
      trend: 2.1,
      description: 'Your earnings have remained relatively consistent over the last 3 months.',
      insight: 'Consistent weekly income is your strongest signal.',
    },
    {
      id: 'repayment',
      label: 'Repayment Behaviour',
      score: 90,
      weight: 0.25,
      weightPct: 25,
      trend: 3.5,
      description: 'You have made 12 of 12 repayments on time over the last 6 months.',
      insight: 'No recent missed repayments strengthens your profile.',
    },
    {
      id: 'longevity',
      label: 'Work Longevity',
      score: 70,
      weight: 0.2,
      weightPct: 20,
      trend: 1.0,
      description: 'You have been active on your primary platform for 14 months with a 2-month gap.',
      insight: 'Work longevity is currently your weakest factor.',
    },
    {
      id: 'transactions',
      label: 'Transaction Consistency',
      score: 85,
      weight: 0.25,
      weightPct: 25,
      trend: 2.4,
      description: 'You maintain regular recurring digital inflows across 3 platforms.',
      insight: 'Strong transaction regularity provides evidence of formal income.',
    },
  ],
};

const newToCreditFactors: TrustScoreData = {
  total: 47,
  category: 'Starter Trust',
  tier: 2,
  trend: 6.0,
  factors: [
    {
      id: 'income',
      label: 'Income Stability',
      score: 58,
      weight: 0.3,
      weightPct: 30,
      trend: 4,
      description: 'Your earnings vary week to week but show an upward trend.',
      insight: 'Maintain consistent income activity for the next 2 months.',
    },
    {
      id: 'repayment',
      label: 'Repayment Behaviour',
      score: 0,
      weight: 0.25,
      weightPct: 25,
      trend: 0,
      description: 'We need more repayment activity to evaluate this factor.',
      insight: 'New to credit? That is okay. Your lack of borrowing history is not treated as a default.',
      insufficient: true,
    },
    {
      id: 'longevity',
      label: 'Work Longevity',
      score: 52,
      weight: 0.2,
      weightPct: 20,
      trend: 2,
      description: 'You have been active for 4 months with occasional gaps.',
      insight: 'Continue consistent activity to build work history.',
    },
    {
      id: 'transactions',
      label: 'Transaction Consistency',
      score: 61,
      weight: 0.25,
      weightPct: 25,
      trend: 5,
      description: 'Digital transaction frequency is growing week over week.',
      insight: 'Keep using digital payments to strengthen this signal.',
    },
  ],
};

const growingVendorFactors: TrustScoreData = {
  total: 68,
  category: 'Growing Trust',
  tier: 3,
  trend: 3.4,
  factors: [
    {
      id: 'income',
      label: 'Income Stability',
      score: 71,
      weight: 0.3,
      weightPct: 30,
      trend: 2.8,
      description: 'Your shop earnings are consistent with mild seasonal variation.',
      insight: 'Stable weekly sales support your income signal.',
    },
    {
      id: 'repayment',
      label: 'Repayment Behaviour',
      score: 64,
      weight: 0.25,
      weightPct: 25,
      trend: 1.5,
      description: 'You have repaid 8 of 10 instalments on time.',
      insight: 'Increasing repayment consistency will lift your score meaningfully.',
    },
    {
      id: 'longevity',
      label: 'Work Longevity',
      score: 75,
      weight: 0.2,
      weightPct: 20,
      trend: 1.2,
      description: 'Your business has been active for 22 months.',
      insight: 'Long business tenure supports sustainability.',
    },
    {
      id: 'transactions',
      label: 'Transaction Consistency',
      score: 80,
      weight: 0.25,
      weightPct: 25,
      trend: 3.0,
      description: 'You process regular daily UPI receipts.',
      insight: 'Transaction consistency is your strongest factor.',
    },
  ],
};

export const PERSONAS: DemoPersona[] = [
  {
    id: 'new-credit',
    name: 'Priya Nair',
    role: 'borrower',
    occupation: 'Delivery Partner',
    score: newToCreditFactors,
    availableCredit: 5000,
    suggestedCredit: 5000,
    monthlyIncome: 18500,
    repaymentConsistency: 0,
    workDaysPerMonth: 18,
    incomeConsistency: 58,
    digitalRegularity: 61,
  },
  {
    id: 'growing-vendor',
    name: 'Amit Patel',
    role: 'borrower',
    occupation: 'Small Vendor',
    score: growingVendorFactors,
    availableCredit: 50000,
    suggestedCredit: 25000,
    monthlyIncome: 42000,
    repaymentConsistency: 80,
    workDaysPerMonth: 26,
    incomeConsistency: 71,
    digitalRegularity: 80,
  },
  {
    id: 'established',
    name: 'Rahul Sharma',
    role: 'borrower',
    occupation: 'Delivery Partner',
    score: rahulFactors,
    availableCredit: 100000,
    suggestedCredit: 50000,
    monthlyIncome: 28500,
    repaymentConsistency: 96,
    workDaysPerMonth: 24,
    incomeConsistency: 82,
    digitalRegularity: 85,
  },
];

export const DEFAULT_PERSONA = PERSONAS[2];

export const SCORE_HISTORY: ScoreHistoryPoint[] = [
  { month: 'Apr', score: 63 },
  { month: 'May', score: 67 },
  { month: 'Jun', score: 71 },
  { month: 'Jul', score: 76 },
  { month: 'Aug', score: 81.75 },
];

export const CREDIT_PRODUCTS: CreditProduct[] = [
  {
    id: 'working-capital',
    name: 'Working Capital Credit',
    range: '₹25,000 – ₹50,000',
    rangeRaw: [25000, 50000],
    description:
      'Flexible credit for inventory, vehicle maintenance, work equipment, or bridging income gaps between pay cycles.',
    uses: ['Inventory', 'Vehicle maintenance', 'Work equipment', 'Income gaps'],
    cta: 'Check Eligibility',
    recommended: true,
  },
  {
    id: 'flexible-credit',
    name: 'Flexible Credit',
    range: 'Up to ₹1,00,000',
    rangeRaw: [50000, 100000],
    description:
      'A higher credit line that unlocks as your Trust Score grows — designed for established workers with strong repayment history.',
    uses: ['Business expansion', 'Large purchases', 'Emergency buffer'],
    cta: 'Notify Me',
  },
];

export const REPAYMENTS: RepaymentItem[] = [
  { id: 'r1', amount: 1250, dueDate: 'Fri 28 Aug', status: 'on-track', weekLabel: 'This week' },
  { id: 'r2', amount: 1250, dueDate: 'Fri 04 Sep', status: 'upcoming', weekLabel: 'Next week' },
  { id: 'r3', amount: 1250, dueDate: 'Fri 11 Sep', status: 'upcoming', weekLabel: 'Week 3' },
  { id: 'r4', amount: 1250, dueDate: 'Fri 18 Sep', status: 'upcoming', weekLabel: 'Week 4' },
];

export const REPAYMENT_HISTORY = [
  { month: 'Jul 2026', status: 'paid', amount: 5000 },
  { month: 'Jun 2026', status: 'paid', amount: 5000 },
  { month: 'May 2026', status: 'paid', amount: 5000 },
  { month: 'Apr 2026', status: 'paid', amount: 4750 },
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    icon: 'trend-up',
    title: 'Trust Score increased by 4 points',
    body: 'Your consistent financial behaviour improved your score from 77.75 to 81.75.',
    time: '2h ago',
    tone: 'positive',
  },
  {
    id: 'n2',
    icon: 'unlock',
    title: 'Unlocked Level 4 credit access',
    body: 'You are now eligible for higher credit up to ₹1,00,000.',
    time: '2h ago',
    tone: 'positive',
  },
  {
    id: 'n3',
    icon: 'calendar',
    title: 'Repayment due in 3 days',
    body: '₹1,250 is due on Friday 28 August. You are on track.',
    time: '5h ago',
    tone: 'info',
  },
  {
    id: 'n4',
    icon: 'activity',
    title: 'Income consistency improved',
    body: 'Your weekly income variance decreased by 12% this month.',
    time: '1d ago',
    tone: 'positive',
  },
  {
    id: 'n5',
    icon: 'refresh',
    title: 'Score recalculated',
    body: 'Your Trust Score was updated using the latest 30 days of financial activity.',
    time: '1d ago',
    tone: 'info',
  },
];

export const CONNECTED_SOURCES: ConnectedSource[] = [
  { id: 'upi', label: 'UPI / Digital Transactions', connected: true, lastSync: '2h ago' },
  { id: 'gig', label: 'Gig Platform', connected: true, lastSync: '1h ago' },
  { id: 'bank', label: 'Bank Account', connected: false },
  { id: 'loan', label: 'Previous Loan History', connected: true, lastSync: '6h ago' },
];

export const LENDER_APPLICANTS: LenderApplicant[] = [
  {
    id: 'a1',
    name: 'Rahul Sharma',
    occupation: 'Delivery Partner',
    trustScore: 81.75,
    income: 82,
    repayment: 90,
    longevity: 70,
    transactions: 85,
    suggestedLimit: 50000,
    status: 'On Track',
    tier: 4,
  },
  {
    id: 'a2',
    name: 'Amit Patel',
    occupation: 'Small Vendor',
    trustScore: 68,
    income: 71,
    repayment: 64,
    longevity: 75,
    transactions: 80,
    suggestedLimit: 35000,
    status: 'On Track',
    tier: 3,
  },
  {
    id: 'a3',
    name: 'Priya Nair',
    occupation: 'Delivery Partner',
    trustScore: 47,
    income: 58,
    repayment: 0,
    longevity: 52,
    transactions: 61,
    suggestedLimit: 5000,
    status: 'New',
    tier: 2,
  },
  {
    id: 'a4',
    name: 'Sunita Devi',
    occupation: 'Freelance Tailor',
    trustScore: 59,
    income: 62,
    repayment: 55,
    longevity: 68,
    transactions: 58,
    suggestedLimit: 5000,
    status: 'Review',
    tier: 2,
  },
  {
    id: 'a5',
    name: 'Karthik Reddy',
    occupation: 'Ride-share Driver',
    trustScore: 73,
    income: 76,
    repayment: 78,
    longevity: 65,
    transactions: 72,
    suggestedLimit: 40000,
    status: 'On Track',
    tier: 3,
  },
  {
    id: 'a6',
    name: 'Meena Joshi',
    occupation: 'Small Business Owner',
    trustScore: 88,
    income: 90,
    repayment: 92,
    longevity: 85,
    transactions: 86,
    suggestedLimit: 75000,
    status: 'On Track',
    tier: 4,
  },
  {
    id: 'a7',
    name: 'Imran Khan',
    occupation: 'Gig Worker',
    trustScore: 42,
    income: 50,
    repayment: 38,
    longevity: 45,
    transactions: 48,
    suggestedLimit: 5000,
    status: 'Flagged',
    tier: 2,
  },
  {
    id: 'a8',
    name: 'Lakshmi Iyer',
    occupation: 'Freelancer',
    trustScore: 65,
    income: 70,
    repayment: 60,
    longevity: 62,
    transactions: 68,
    suggestedLimit: 30000,
    status: 'Review',
    tier: 3,
  },
];

export const ADMIN_STATS = {
  users: 12840,
  activeBorrowers: 4821,
  avgTrustScore: 67.8,
  successfulRepayments: 93.4,
  creditUnlocked: 8.4,
};

export const SCORE_DISTRIBUTION = [
  { range: '0–40', count: 1820 },
  { range: '41–60', count: 4310 },
  { range: '61–80', count: 4850 },
  { range: '81–100', count: 1860 },
];

export const CREDIT_TIER_DISTRIBUTION = [
  { tier: 'Level 1', count: 1820 },
  { tier: 'Level 2', count: 2490 },
  { tier: 'Level 3', count: 3120 },
  { tier: 'Level 4', count: 5410 },
];

export const REPAYMENT_PERFORMANCE = [
  { month: 'Apr', rate: 91.2 },
  { month: 'May', rate: 92.0 },
  { month: 'Jun', rate: 92.8 },
  { month: 'Jul', rate: 93.6 },
  { month: 'Aug', rate: 94.8 },
];

export const MONTHLY_NEW_USERS = [
  { month: 'Apr', users: 980 },
  { month: 'May', users: 1240 },
  { month: 'Jun', users: 1510 },
  { month: 'Jul', users: 1820 },
  { month: 'Aug', users: 2140 },
];

export const SCORE_IMPROVEMENT_TREND = [
  { month: 'Apr', avg: 58.2 },
  { month: 'May', avg: 61.5 },
  { month: 'Jun', avg: 64.1 },
  { month: 'Jul', avg: 66.0 },
  { month: 'Aug', avg: 67.8 },
];

export const CREDIT_TIERS = [
  {
    level: 1,
    range: '0–40',
    label: 'No Credit Yet',
    amount: '—',
    color: 'ink',
  },
  {
    level: 2,
    range: '41–60',
    label: 'Starter Credit',
    amount: 'Up to ₹5,000',
    color: 'amber',
  },
  {
    level: 3,
    range: '61–80',
    label: 'Working Capital',
    amount: '₹25,000 – ₹50,000',
    color: 'blue',
  },
  {
    level: 4,
    range: '81–100',
    label: 'Higher Credit',
    amount: 'Up to ₹1,00,000',
    color: 'emerald',
  },
] as const;

export function formatINR(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}
