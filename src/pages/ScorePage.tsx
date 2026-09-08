import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { TrustScoreRing, MiniScoreBar } from '@/components/TrustScoreRing';
import { Drawer } from '@/components/Drawer';
import { Tooltip } from '@/components/Tooltip';
import { SCORE_HISTORY } from '@/lib/data';
import { ArrowUpRight, ArrowDownRight, HelpCircle, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RTooltip,
} from 'recharts';

export function ScorePage() {
  const { persona } = useAuth();
  const score = persona.score;
  const [drawerFactor, setDrawerFactor] = useState<string | null>(null);

  const activeFactor = score.factors.find((f) => f.id === drawerFactor);

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="text-xs text-gray-400 font-medium">My Trust Score</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Your Trust Score, fully explained.</h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          {/* Score ring + summary */}
          <div className="panel relative overflow-hidden p-6">
            <div className="absolute inset-0 grid-bg-fine opacity-20" />
            <div className="relative flex flex-col items-center">
              <span className="text-xs text-gray-400 font-medium mb-3">Trust Score</span>
              <TrustScoreRing score={score.total} size={200} />
              <div className="mt-4 flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-1">
                <ArrowUpRight className="h-3 w-3 text-emerald" />
                <span className="font-mono text-xs text-emerald-glow">+{score.trend} this month</span>
              </div>
              <p className="mt-4 text-center text-sm text-gray-300">
                Your consistent financial behaviour is improving your trust profile.
              </p>
            </div>
          </div>

          {/* Score breakdown panels */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-white">Score Breakdown</h2>
            {score.factors.map((f) => (
              <div key={f.id} className="panel panel-hover p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gray-500">{String(score.factors.indexOf(f) + 1).padStart(2, '0')}</span>
                    <h2 className="text-sm font-semibold text-white">{f.label}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-blue-glow">{f.weightPct}% weight</span>
                    <button
                      onClick={() => setDrawerFactor(f.id)}
                      className="rounded-md p-1 text-gray-400 hover:bg-white/5 hover:text-blue-glow"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                {f.insufficient ? (
                  <div className="mt-3 flex items-center gap-3 rounded-lg border border-amber/20 bg-amber/5 px-3 py-2.5">
                    <Info className="h-4 w-4 flex-shrink-0 text-amber" />
                    <div>
                      <span className="text-sm font-medium text-amber-400/90">Insufficient History</span>
                      <p className="mt-0.5 text-xs text-gray-400">
                        This does not negatively affect your score. We need more repayment activity to evaluate this factor.
                      </p>
                      <Tooltip content="New to credit? That's okay. Your lack of borrowing history is not treated as a default.">
                        <span className="mt-1 inline-flex cursor-help items-center gap-1 text-xs text-amber/80 underline decoration-dotted">
                          <Info className="h-3 w-3" /> New to credit? That's okay.
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold tabular-nums text-white">{f.score}</span>
                      <span className="font-mono text-xs text-ink-100">/ 100</span>
                      <span className={`ml-auto flex items-center gap-0.5 font-mono text-xs ${f.trend > 0 ? 'text-emerald' : 'text-gray-400'}`}>
                        {f.trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {f.trend > 0 ? `+${f.trend}` : f.trend}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${f.score >= 81 ? 'bg-emerald' : f.score >= 61 ? 'bg-blue' : 'bg-amber'}`}
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

        {/* Score trend chart */}
        <div className="mt-6 panel p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Trust Score Journey</span>
            <span className="font-mono text-xs text-emerald">+18.75 points in 5 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={SCORE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreJourney" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <RTooltip
                contentStyle={{ background: '#16181E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#7C8595', fontFamily: 'JetBrains Mono' }}
              />
              <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} fill="url(#scoreJourney)" dot={{ fill: '#3B82F6', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-gray-300">Your consistent financial behaviour is improving your trust profile.</p>
        </div>

        {/* Insight panel */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="panel p-5">
            <span className="text-xs text-gray-400 font-medium">Positive Factors</span>
            <ul className="mt-4 space-y-2.5">
              {score.factors.filter((f) => !f.insufficient && f.score >= 70).length > 0 ? (
                score.factors.filter((f) => !f.insufficient && f.score >= 70).map((f) => (
                  <li key={f.id} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" />
                    {f.insight}
                  </li>
                ))
              ) : (
                <li className="text-xs italic text-gray-500">No positive factors identified yet</li>
              )}
            </ul>
          </div>
          <div className="panel p-5">
            <span className="text-xs text-gray-400 font-medium">Improvement Opportunities</span>
            <ul className="mt-4 space-y-2.5">
              {score.factors.filter((f) => f.insufficient || f.score < 75).length > 0 ? (
                score.factors.filter((f) => f.insufficient || f.score < 75).map((f) => (
                  <li key={f.id} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber" />
                    {f.insight}
                  </li>
                ))
              ) : (
                <li className="text-xs italic text-gray-500">No improvement opportunities identified yet</li>
              )}
            </ul>
          </div>
        </div>

        {/* Explainability */}
        <div className="mt-6 panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Why This Score</h2>
            <span className="font-mono text-xs text-gray-400">transparent_weighted_model</span>
          </div>
          <div className="space-y-1.5 rounded-lg border border-white/[0.06] bg-ink-800 p-4 font-mono text-sm">
            {score.factors.map((f) => (
              <div key={f.id} className="flex justify-between text-gray-300">
                <span>{f.label.padEnd(28)}</span>
                <span className="tabular-nums">
                  {f.insufficient ? '—'.padStart(2) : f.score} × {f.weightPct}% ={' '}
                  {f.insufficient ? '—' : (f.score * f.weight).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="hairline my-1" />
            <div className="flex justify-between text-sm font-bold text-white">
              <span>TOTAL</span>
              <span className="tabular-nums">{score.total.toFixed(2)}</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-400">Your score is calculated using a transparent weighted model. No black box.</p>
        </div>

        {/* Mini bars */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {score.factors.map((f, i) => (
            <div key={f.id} className="panel p-4">
              <MiniScoreBar label={f.label} score={f.score} delay={i * 100} />
            </div>
          ))}
        </div>
      </div>

      {/* Why drawer */}
      <Drawer
        open={!!activeFactor}
        onClose={() => setDrawerFactor(null)}
        title={activeFactor ? `// ${activeFactor.id}_factor` : ''}
        subtitle={activeFactor?.label}
      >
        {activeFactor && (
          <div className="space-y-4">
            <div className="rounded-lg border border-white/[0.06] bg-ink-800 p-4">
              <p className="mono-label-dim mb-1">score</p>
              <p className="font-mono text-3xl font-bold text-white">
                {activeFactor.insufficient ? '—' : activeFactor.score}
                <span className="text-sm text-ink-100"> / 100</span>
              </p>
              <p className="mono-label-dim mt-2 mb-1">weight</p>
              <p className="font-mono text-lg text-blue-glow">{activeFactor.weightPct}%</p>
            </div>
            <div>
              <p className="mono-label-dim mb-1">what this measures</p>
              <p className="text-sm leading-relaxed text-gray-300">{activeFactor.description}</p>
            </div>
            <div>
              <p className="mono-label-dim mb-1">insight</p>
              <p className="text-sm leading-relaxed text-gray-300">{activeFactor.insight}</p>
            </div>
            <div>
              <p className="mono-label-dim mb-1">contribution to score</p>
              <p className="font-mono text-sm text-gray-300">
                {activeFactor.insufficient ? '—' : `${activeFactor.score} × ${activeFactor.weightPct}% = ${(activeFactor.score * activeFactor.weight).toFixed(2)}`}
              </p>
            </div>
          </div>
        )}
      </Drawer>

      <BottomNav />
    </div>
  );
}
