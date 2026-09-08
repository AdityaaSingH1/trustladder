import { Navbar, BottomNav } from '@/components/Navbar';
import { Cpu, ArrowRight, Check, GitBranch, Brain, Layers } from 'lucide-react';

export function TrustEngine() {
  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[900px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="mono-label">## trust_engine</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Transparent today. Smarter tomorrow.</h1>
          <p className="mt-1 text-sm text-gray-400">
            We don't claim the current score is ML-generated. Here's exactly what runs today and what comes next.
          </p>
        </div>

        {/* Current engine */}
        <div className="panel p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <Check className="h-4 w-4" />
            </span>
            <span className="mono-label text-emerald-glow/80">current_engine</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-white">Transparent Rule-Based Scoring</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Your score is calculated using a fully transparent weighted model: Income Stability (30%), Repayment
            Behaviour (25%), Work Longevity (20%), and Transaction Consistency (25%). Every factor, weight, and
            contribution is visible and explainable — no black box.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: 'Income', w: '30%' },
              { label: 'Repayment', w: '25%' },
              { label: 'Longevity', w: '20%' },
              { label: 'Transactions', w: '25%' },
            ].map((f) => (
              <div key={f.label} className="rounded-lg border border-white/[0.06] bg-ink-800 p-3 text-center">
                <p className="font-mono text-lg font-bold text-blue-glow">{f.w}</p>
                <p className="mt-0.5 text-xs text-gray-400">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-4">
          <ArrowRight className="h-5 w-5 text-ink-200" />
        </div>

        {/* Future engine */}
        <div className="panel p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet/10 text-violet">
              <Brain className="h-4 w-4" />
            </span>
            <span className="mono-label text-violet-glow/80">future_engine</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-white">Machine Learning Risk Prediction</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Once sufficient labelled repayment data is collected, a machine-learning model will complement the
            rule-based score — never replace it. The ML layer predicts repayment risk, not the trust score itself.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/[0.06] bg-ink-800 p-4">
              <p className="mono-label-dim mb-2">candidate_models</p>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li className="flex items-center gap-2"><GitBranch className="h-3.5 w-3.5 text-violet" /> Logistic Regression</li>
                <li className="flex items-center gap-2"><Layers className="h-3.5 w-3.5 text-violet" /> Random Forest</li>
                <li className="flex items-center gap-2"><Brain className="h-3.5 w-3.5 text-violet" /> Gradient Boosting</li>
              </ul>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-ink-800 p-4">
              <p className="mono-label-dim mb-2">candidate_outputs</p>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li>Probability of repayment</li>
                <li>Repayment risk estimate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-4">
          <ArrowRight className="h-5 w-5 text-ink-200" />
        </div>

        {/* Hybrid */}
        <div className="panel p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue/10 text-blue">
              <Layers className="h-4 w-4" />
            </span>
            <span className="mono-label text-blue-glow/80">hybrid_model</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-white">Rule-Based Trust + ML Risk → Future Trust Engine</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            The future engine combines the explainable rule-based trust score with ML-driven risk prediction,
            giving lenders a transparent trust signal plus a data-informed risk assessment.
          </p>
        </div>

        <div className="mt-6 panel p-5">
          <div className="flex items-center gap-2 text-sm text-amber">
            <Cpu className="h-4 w-4" />
            <span>ML is presented as a future upgrade. The current engine is fully rule-based and transparent.</span>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
