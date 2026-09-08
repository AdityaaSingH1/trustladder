export type ScoreCategory = 'Building Trust' | 'Starter Trust' | 'Growing Trust' | 'High Trust';
export type CreditTier = 1 | 2 | 3 | 4;
export type Role = 'borrower' | 'lender';

export interface ScoreFactor {
  id: 'income' | 'repayment' | 'longevity' | 'transactions';
  label: string;
  score: number;
  weight: number;
  weightPct: number;
  description: string;
  trend: number;
  insight: string;
  insufficient?: boolean;
}

export interface TrustScoreData {
  total: number;
  category: ScoreCategory;
  tier: CreditTier;
  trend: number;
  factors: ScoreFactor[];
}

export interface CreditProduct {
  id: string;
  name: string;
  range: string;
  rangeRaw: [number, number];
  description: string;
  uses: string[];
  cta: string;
  recommended?: boolean;
}

export interface RepaymentItem {
  id: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'on-track' | 'upcoming';
  weekLabel: string;
}

export interface NotificationItem {
  id: string;
  icon: 'trend-up' | 'unlock' | 'calendar' | 'activity' | 'refresh';
  title: string;
  body: string;
  time: string;
  tone: 'positive' | 'info' | 'attention';
}

export interface DemoPersona {
  id: string;
  name: string;
  role: Role;
  occupation: string;
  score: TrustScoreData;
  availableCredit: number;
  suggestedCredit: number;
  monthlyIncome: number;
  repaymentConsistency: number;
  workDaysPerMonth: number;
  incomeConsistency: number;
  digitalRegularity: number;
}

export interface ScoreHistoryPoint {
  month: string;
  score: number;
}

export interface LenderApplicant {
  id: string;
  name: string;
  occupation: string;
  trustScore: number;
  income: number;
  repayment: number;
  longevity: number;
  transactions: number;
  suggestedLimit: number;
  status: 'On Track' | 'Review' | 'New' | 'Flagged';
  tier: CreditTier;
}

export interface ConnectedSource {
  id: string;
  label: string;
  connected: boolean;
  lastSync?: string;
}
