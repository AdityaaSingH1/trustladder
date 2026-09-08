import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { TrustScoreRing } from '@/components/TrustScoreRing';
import { SCORE_HISTORY, formatINR, categoryForScore } from '@/lib/data';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowUpRight, ArrowRight, CreditCard, CalendarClock, Activity, Wallet, Briefcase, Repeat, ShieldCheck } from 'lucide-react';
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RTooltip,
  Area,
  AreaChart,
} from 'recharts';

export function Dashboard() {
  const { persona } = useAuth();
  const score = persona.score;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = persona.name.split(' ')[0];

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">
            {greeting}, {firstName}
          </h1>
          <p className="mt-0.5 text-sm text-gray-400">Here's how your financial trust is progressing.</p>
        </div>

        {/* Top grid */}
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_0.9fr]">
          {/* Hero score card */}
          <div className="panel relative overflow-hidden p-5">
            <div className="absolute inset-0 grid-bg-fine opacity-20" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">Trust Score</span>
                <span className="flex items-center gap-1 font-mono text-xs text-emerald">
                  <ArrowUpRight className="h-3 w-3" /> +{score.trend} this month
                </span>
              </div>
              <div className="flex items-center gap-5">
                <TrustScoreRing score={score.total} size={160} compact />
                <div className="flex-1">
                  <p className="font-mono text-xs uppercase tracking-wider text-emerald-glow">{score.category}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    You're currently eligible for{' '}
                    <span className="font-medium text-emerald-glow">higher credit access.</span>
                  </p>
                  <Link to="/app/credit" className="btn-primary mt-3 inline-flex">
                    Explore Credit
                    <svg className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Score trend */}
          <div className="panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">Score Trend</span>
              <span className="font-mono text-xs text-emerald">+18.75 in 5 months</span>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={SCORE_HISTORY} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <RTooltip
                  contentStyle={{ background: '#16181E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#7C8595', fontFamily: 'JetBrains Mono' }}
                />
                <Area type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} fill="url(#scoreG)" dot={{ fill: '#10B981', r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="mt-2 text-xs text-gray-400">Your consistent financial behaviour is improving your trust profile.</p>
          </div>

          {/* Financial health */}
          <div className="panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">Financial Health</span>
              <Activity className="h-3.5 w-3.5 text-blue" />
            </div>
            <div className="space-y-3">
              <HealthRow icon={Wallet} label="Monthly income" value={formatINR(persona.monthlyIncome)} />
              <HealthRow icon={TrendingUp} label="Income consistency" value={`${persona.incomeConsistency}%`} pct={persona.incomeConsistency} />
              <HealthRow icon={Briefcase} label="Work activity" value={`${persona.workDaysPerMonth} days/mo`} pct={(persona.workDaysPerMonth / 30) * 100} />
              <HealthRow icon={Repeat} label="Digital regularity" value={`${persona.digitalRegularity}%`} pct={persona.digitalRegularity} />
              <HealthRow icon={CalendarClock} label="Repayment consistency" value={`${persona.repaymentConsistency}%`} pct={persona.repaymentConsistency} />
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="mt-6">
          <div className="mb-3 flex items-baseline gap-3">
            <h2 className="text-base font-semibold text-white">Score Breakdown</h2>
            <Link to="/app/score" className="text-xs text-blue-glow hover:underline">View details →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {score.factors.map((f) => (
              <div key={f.id} className="panel panel-hover p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">{String(score.factors.indexOf(f) + 1).padStart(2, '0')}</span>
                  <span className="font-mono text-xs text-blue-glow">{f.weightPct}%</span>
                </div>
                <h2 className="mt-1.5 text-sm font-semibold text-white">{f.label}</h2>
                {f.insufficient ? (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-amber-400/90">Insufficient History</span>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                      This does not negatively affect your score.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-mono text-2xl font-bold tabular-nums text-white">{f.score}</span>
                      <span className="font-mono text-xs text-gray-400">/100</span>
                      {f.trend > 0 && (
                        <span className="ml-auto flex items-center gap-0.5 font-mono text-xs text-emerald">
                          <ArrowUpRight className="h-3 w-3" /> {f.trend}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-blue transition-all duration-700"
                        style={{ width: `${f.score}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400">{f.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Insight + Credit teaser */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="panel p-5">
            <span className="text-xs text-gray-400 font-medium">What's Affecting Your Score</span>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium text-emerald-glow">Positive factors</p>
                <ul className="space-y-2">
                  {score.factors.filter((f) => !f.insufficient && f.score >= 70).length > 0 ? (
                    score.factors.filter((f) => !f.insufficient && f.score >= 70).map((f) => (
                      <li key={f.id} className="flex items-start gap-2 text-xs text-gray-300">
                        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald" />
                        {f.insight}
                      </li>
                    ))
                  ) : (
                    <li className="text-xs italic text-gray-500">No positive factors identified yet</li>
                  )}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-amber">Improvement opportunities</p>
                <ul className="space-y-2">
                  {score.factors.filter((f) => f.insufficient || f.score < 75).length > 0 ? (
                    score.factors.filter((f) => f.insufficient || f.score < 75).map((f) => (
                      <li key={f.id} className="flex items-start gap-2 text-xs text-gray-300">
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber" />
                        {f.insight}
                      </li>
                    ))
                  ) : (
                    <li className="text-xs italic text-gray-500">No improvement opportunities identified yet</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="panel relative overflow-hidden p-5">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald/10 blur-2xl" />
            <div className="relative">
              <span className="text-xs text-gray-400 font-medium">Credit Access</span>
              <div className="mt-3 flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-emerald" />
                <div>
                  <p className="font-mono text-2xl font-bold text-white">{formatINR(persona.availableCredit)}</p>
                  <p className="text-xs text-gray-400">Available credit</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-300">
                You're in <span className="font-medium text-emerald-glow">{categoryForScore(score.total)}</span> — Level {score.tier}.
              </p>
              <div className="mt-4 flex gap-2">
                <Link to="/app/credit" className="btn-primary">
                  Explore Credit
                  <svg className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link to="/app/improve" className="btn-secondary">
                  <TrendingUp className="h-3.5 w-3.5" /> Improve Score
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function HealthRow({ icon: Icon, label, value, pct }: { icon: React.ElementType; label: string; value: string; pct?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 flex-shrink-0 text-gray-400" />
      <span className="flex-1 text-xs text-gray-400">{label}</span>
      <span className="font-mono text-xs tabular-nums text-gray-300">{value}</span>
      {pct !== undefined && (
        <div className="hidden h-1 w-12 overflow-hidden rounded-full bg-white/[0.06] sm:block">
          <div className="h-full rounded-full bg-blue" style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
}
