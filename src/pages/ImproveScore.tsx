import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { TrustScoreRing } from '@/components/TrustScoreRing';
import { calculateScore } from '@/lib/data';
import { ArrowUpRight, Sparkles, Target, Info } from 'lucide-react';

export function ImproveScore() {
  const { persona } = useAuth();
  const score = persona.score;

  const opportunities = score.factors
    .filter((f) => !f.insufficient)
    .map((f) => {
      const potential = f.id === 'longevity' ? 6 : f.id === 'income' ? 3 : 2;
      const action =
        f.id === 'longevity'
          ? 'Continue consistent activity and reduce gaps in work.'
          : f.id === 'income'
            ? 'Maintain consistent income activity for the next 2 months.'
            : 'Maintain regular recurring digital income activity.';
      return { ...f, potential, action };
    })
    .sort((a, b) => b.potential - a.potential);

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="text-xs text-gray-400 font-medium">Improve Score</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Your score isn't a verdict. It's a roadmap.</h1>
          <p className="mt-1 text-sm text-gray-400">Every recommendation maps to a measurable score factor.</p>
        </div>

        {/* Current score + potential */}
        <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
          <div className="panel relative overflow-hidden p-6">
            <div className="absolute inset-0 grid-bg-fine opacity-20" />
            <div className="relative flex flex-col items-center">
              <span className="text-xs text-gray-400 font-medium mb-2">Current Score</span>
              <TrustScoreRing score={score.total} size={160} compact />
              <p className="mt-3 font-mono text-sm text-emerald-glow">{score.category}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-white">Opportunities</h2>
            {opportunities.map((o) => (
              <div key={o.id} className="panel panel-hover p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue" />
                    <h2 className="text-sm font-semibold text-white">Improve {o.label}</h2>
                  </div>
                  <span className="rounded-full border border-emerald/20 bg-emerald/10 px-2.5 py-0.5 font-mono text-xs text-emerald-glow">
                    Potential +{o.potential}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs">
                  <span className="text-gray-400">Current: <span className="font-mono text-gray-200">{o.score}</span></span>
                  <ArrowUpRight className="h-3 w-3 text-emerald" />
                  <span className="text-gray-400">Potential: <span className="font-mono text-emerald-glow">{o.score + o.potential}</span></span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">{o.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Score Simulator */}
        <div className="mt-8">
          <ScoreSimulator />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function ScoreSimulator() {
  const { persona } = useAuth();
  const baseScore = persona.score.total;

  const factors = persona.score.factors;
  const incomeF = factors.find((f) => f.id === 'income')!;
  const repayF = factors.find((f) => f.id === 'repayment')!;
  const longevityF = factors.find((f) => f.id === 'longevity')!;

  const [incomeMore, setIncomeMore] = useState(false);
  const [repayConsistent, setRepayConsistent] = useState(false);
  const [workConsistent, setWorkConsistent] = useState(false);

  const simIncome = incomeMore ? Math.min(incomeF.score + 8, 100) : incomeF.score;
  const simRepay = repayConsistent ? Math.min(repayF.score + 12, 100) : repayF.score;
  const simLongevity = workConsistent ? Math.min(longevityF.score + 15, 100) : longevityF.score;
  const simTransactions = factors.find((f) => f.id === 'transactions')!.score;

  const simScore = calculateScore(simIncome, simRepay, simLongevity, simTransactions);
  const delta = (simScore - baseScore).toFixed(2);

  const toggles = [
    {
      label: 'If my income becomes more consistent?',
      checked: incomeMore,
      set: setIncomeMore,
      preview: `81.75 → ${Math.min(82 + 8, 100)}`,
    },
    {
      label: 'If I maintain repayments for 3 months?',
      checked: repayConsistent,
      set: setRepayConsistent,
      preview: `81.75 → ${Math.min(90 + 12, 100)}`,
    },
    {
      label: 'If my work activity becomes more consistent?',
      checked: workConsistent,
      set: setWorkConsistent,
      preview: `81.75 → ${Math.min(70 + 15, 100)}`,
    },
  ];

  return (
    <div className="panel p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-violet" />
        <h2 className="text-base font-semibold text-white">What-If Simulator</h2>
      </div>
      <h2 className="text-lg font-semibold text-white">What happens to my score if…?</h2>
      <p className="mt-1 text-sm text-gray-400">Toggle scenarios to see how your score could change.</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          {toggles.map((t) => (
            <button
              key={t.label}
              onClick={() => t.set(!t.checked)}
              className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition-all ${
                t.checked ? 'border-violet/40 bg-violet/5' : 'border-white/[0.06] bg-ink-800 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-9 items-center rounded-full transition-all ${t.checked ? 'bg-violet' : 'bg-ink-400'}`}
                >
                  <div
                    className={`h-3.5 w-3.5 rounded-full bg-white transition-transform ${t.checked ? 'translate-x-4.5' : 'translate-x-0.75'}`}
                    style={{ transform: t.checked ? 'translateX(18px)' : 'translateX(3px)' }}
                  />
                </div>
                <span className="text-sm text-gray-200">{t.label}</span>
              </div>
              {t.checked && <span className="font-mono text-xs text-violet-glow">+active</span>}
            </button>
          ))}
          <div className="flex items-center gap-2 rounded-lg border border-amber/20 bg-amber/5 px-3 py-2.5 text-xs text-amber">
            <Info className="h-3.5 w-3.5" />
            Simulation — not a guaranteed future score.
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-ink-800 p-6">
          <span className="text-xs text-gray-400 font-medium mb-2">Simulated Score</span>
          <div className="text-center">
            <span className="font-mono text-4xl font-bold text-white">{simScore.toFixed(2)}</span>
            <span className="font-mono text-lg text-gray-400"> / 100</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-mono text-xs text-gray-400">from {baseScore.toFixed(2)}</span>
            <span className={`flex items-center gap-0.5 font-mono text-sm ${Number(delta) > 0 ? 'text-emerald' : 'text-gray-400'}`}>
              <ArrowUpRight className="h-3.5 w-3.5" />
              {Number(delta) > 0 ? `+${delta}` : delta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
