import { useParams, useNavigate } from 'react-router-dom';
import { Navbar, BottomNav } from '@/components/Navbar';
import { TrustScoreRing } from '@/components/TrustScoreRing';
import { Drawer } from '@/components/Drawer';
import { LENDER_APPLICANTS, formatINR, SCORE_HISTORY } from '@/lib/data';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, TrendingUp, ShieldCheck, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip } from 'recharts';

export function LenderApplicantProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [whyOpen, setWhyOpen] = useState(false);

  const applicant = LENDER_APPLICANTS.find((a) => a.id === id);

  if (!applicant) {
    return (
      <div className="min-h-screen bg-ink-900">
        <Navbar />
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <p className="text-sm text-gray-400">Applicant not found.</p>
          <button onClick={() => navigate('/app/lender/applicants')} className="btn-secondary mt-4">
            <ArrowLeft className="h-4 w-4" /> Back to applicants
          </button>
        </div>
      </div>
    );
  }

  const factors = [
    { label: 'Income Stability', score: applicant.income, weight: 30 },
    { label: 'Repayment Behaviour', score: applicant.repayment, weight: 25 },
    { label: 'Work Longevity', score: applicant.longevity, weight: 20 },
    { label: 'Transaction Consistency', score: applicant.transactions, weight: 25 },
  ];

  const riskLevel = applicant.trustScore >= 81 ? 'Low Risk' : applicant.trustScore >= 61 ? 'Moderate Risk' : 'Higher Risk';
  const riskColor = applicant.trustScore >= 81 ? 'text-emerald' : applicant.trustScore >= 61 ? 'text-amber' : 'text-red-glow';

  const incomeTrend = [
    { month: 'Apr', income: 22000 },
    { month: 'May', income: 24500 },
    { month: 'Jun', income: 26000 },
    { month: 'Jul', income: 27800 },
    { month: 'Aug', income: 28500 },
  ];

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-6">
        <button onClick={() => navigate('/app/lender/applicants')} className="btn-ghost mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to applicants
        </button>

        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue/15 font-mono text-lg font-bold text-blue">
            {applicant.name.split(' ').map((s) => s[0]).join('').slice(0, 2)}
          </span>
          <div>
            <h1 className="text-xl font-semibold text-white">{applicant.name}</h1>
            <p className="text-sm text-gray-400">{applicant.occupation} · Level {applicant.tier}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
          {/* Score + risk */}
          <div className="panel relative overflow-hidden p-6">
            <div className="absolute inset-0 grid-bg-fine opacity-20" />
            <div className="relative flex flex-col items-center">
              <span className="mono-label mb-2">// trust_score</span>
              <TrustScoreRing score={applicant.trustScore} size={160} compact />
              <div className="mt-4 w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Risk indicator</span>
                  <span className={`font-mono font-medium ${riskColor}`}>{riskLevel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Suggested limit</span>
                  <span className="font-mono text-blue-glow">{formatINR(applicant.suggestedLimit)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Credit tier</span>
                  <span className="font-mono text-gray-200">Level {applicant.tier}</span>
                </div>
              </div>
              <button onClick={() => setWhyOpen(true)} className="btn-secondary mt-4 w-full">
                <Info className="h-3.5 w-3.5" /> Why this recommendation?
              </button>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="space-y-3">
            <span className="mono-label">## score_breakdown</span>
            {factors.map((f) => (
              <div key={f.label} className="panel p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-200">{f.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-blue-glow">{f.weight}%</span>
                    <span className="font-mono text-lg font-bold tabular-nums text-white">{f.score}</span>
                  </div>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${f.score >= 81 ? 'bg-emerald' : f.score >= 61 ? 'bg-blue' : 'bg-amber'}`}
                    style={{ width: `${f.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Income trend */}
        <div className="mt-6 panel p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="mono-label">// income_trend</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-emerald">
              <TrendingUp className="h-3 w-3" /> +29.5% over 5 months
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={incomeTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <RTooltip contentStyle={{ background: '#16181E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} fill="url(#incomeG)" dot={{ fill: '#3B82F6', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Additional info grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="work_history" value="14 months" detail="Primary platform tenure" />
          <InfoCard label="repayment_history" value={`${applicant.repayment >= 70 ? 'Strong' : applicant.repayment >= 50 ? 'Fair' : 'Limited'}`} detail="Based on past instalments" />
          <InfoCard label="transaction_consistency" value={`${applicant.transactions}/100`} detail="Digital payment regularity" />
          <InfoCard label="repayment_risk" value={riskLevel} detail="Based on trust score" color={riskColor} />
        </div>
      </div>

      <Drawer
        open={whyOpen}
        onClose={() => setWhyOpen(false)}
        title="// recommendation_explanation"
        subtitle="Why this credit limit was suggested"
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-white/[0.06] bg-ink-800 p-4">
            <p className="mono-label-dim mb-1">suggested_credit_limit</p>
            <p className="font-mono text-2xl font-bold text-blue-glow">{formatINR(applicant.suggestedLimit)}</p>
          </div>
          <div>
            <p className="mono-label-dim mb-2">reasoning</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" />
                Trust Score of {applicant.trustScore.toFixed(2)} places this applicant in Level {applicant.tier}.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" />
                Income Stability score of {applicant.income} supports regular repayment capacity.
              </li>
              <li className="flex items-start gap-2">
                {applicant.repayment >= 70 ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" /> : <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber" />}
                Repayment Behaviour score of {applicant.repayment} indicates {applicant.repayment >= 70 ? 'strong' : 'moderate'} repayment discipline.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue" />
                The recommendation is based on transparent, weighted score factors — not a black-box AI decision.
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-blue/20 bg-blue/5 p-3 text-xs text-blue-glow">
            This is an explainable recommendation. Lenders retain final approval authority.
          </div>
        </div>
      </Drawer>

      <BottomNav />
    </div>
  );
}

function InfoCard({ label, value, detail, color = 'text-white' }: { label: string; value: string; detail: string; color?: string }) {
  return (
    <div className="panel p-4">
      <span className="mono-label-dim">{label}</span>
      <p className={`mt-1.5 font-mono text-lg font-bold ${color}`}>{value}</p>
      <p className="mt-0.5 text-xs text-gray-500">{detail}</p>
    </div>
  );
}
