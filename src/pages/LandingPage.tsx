import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  CalendarClock,
  Briefcase,
  Repeat,
  ShieldCheck,
  Lock,
  Scale,
  Cpu,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Play,
} from 'lucide-react';
import { Logo, LogoMark } from '@/components/Logo';
import { TrustScoreRing, MiniScoreBar } from '@/components/TrustScoreRing';
import { CountUp } from '@/components/Tooltip';
import { useAuth } from '@/lib/auth';
import { WEIGHTS, calculateScore, categoryForScore, PERSONAS } from '@/lib/data';

const SIGNALS = [
  {
    id: '01',
    label: 'Income Stability',
    weight: '30%',
    icon: TrendingUp,
    measures: 'Earnings consistency, income trend, weekly variance, work frequency, platform ratings',
    line: 'We measure predictable earning behaviour, not simply how much you earn.',
  },
  {
    id: '02',
    label: 'Repayment Behaviour',
    weight: '25%',
    icon: CalendarClock,
    measures: 'Past repayments, late/missed payments, BNPL behaviour, consistency',
    line: 'Your repayment behaviour demonstrates financial discipline.',
  },
  {
    id: '03',
    label: 'Work Longevity',
    weight: '20%',
    icon: Briefcase,
    measures: 'Platform tenure, active months, work gaps, repeat customers, business duration',
    line: 'Consistent work history provides evidence that your income source is sustainable.',
  },
  {
    id: '04',
    label: 'Transaction Consistency',
    weight: '25%',
    icon: Repeat,
    measures: 'Digital transaction frequency, recurring inflows, cash-flow patterns, formal digital income',
    line: 'Recurring financial activity can provide evidence even when traditional documents are missing.',
  },
];

export function LandingPage() {
  const { enterDemo } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink-900 text-gray-300">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-900/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 lg:px-6">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#how" className="text-sm text-gray-400 hover:text-white">How it works</a>
            <a href="#calculator" className="text-sm text-gray-400 hover:text-white">Calculator</a>
            <a href="#ladder" className="text-sm text-gray-400 hover:text-white">Credit Ladder</a>
            <a href="#fairness" className="text-sm text-gray-400 hover:text-white">Fairness</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-ghost hidden sm:inline-flex">Sign in</Link>
            <Link to="/login" className="btn-primary">
              Check My Trust Score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:px-6 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-800 px-3 py-1">
              <span className="status-dot bg-emerald" />
              <span className="font-mono text-xs uppercase tracking-wider text-gray-300">
                Live · 12,840 users building trust
              </span>
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Credit should recognize the work you already do.
            </h1>
            <p className="mt-4 max-w-lg text-balance text-base leading-relaxed text-gray-400">
              TrustLadder uses income stability, repayment behaviour, work history and transaction consistency to create
              a transparent financial trust score for people underserved by traditional credit systems.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  enterDemo('established');
                  navigate('/app');
                }}
                className="btn-primary"
              >
                Check My Trust Score
                <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#how" className="btn-secondary border-white/20 font-semibold hover:border-white/40">
                <Play className="h-4 w-4 flex-shrink-0 fill-current" />
                See How It Works
              </a>
            </div>
            <p className="mt-6 font-mono text-xs text-gray-400">
              From financial activity to financial opportunity.
            </p>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="panel relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 grid-bg-fine opacity-20" />
              <div className="relative flex flex-col items-center">
                <div className="mb-3 flex w-full items-center justify-between">
                  <span className="mono-label">// trust_score</span>
                  <span className="flex items-center gap-1 font-mono text-xs text-emerald">
                    <ArrowUpRight className="h-3 w-3" /> +4.2 this month
                  </span>
                </div>
                <TrustScoreRing score={81.75} size={220} />
                <p className="mt-4 text-center text-sm text-gray-300">
                  You are eligible for{' '}
                  <span className="font-medium text-emerald-glow">higher working-capital credit.</span>
                </p>
                <div className="mt-5 grid w-full grid-cols-2 gap-3">
                  <MiniScoreBar label="Income Stability" score={82} delay={400} />
                  <MiniScoreBar label="Repayment Behaviour" score={71} delay={500} />
                  <MiniScoreBar label="Work Longevity" score={60} delay={600} />
                  <MiniScoreBar label="Transaction Consistency" score={79} delay={700} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
            Traditional credit asks for history. We look for behaviour.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Traditional */}
            <div className="panel p-6">
              <div className="mb-4 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red" />
                <span className="mono-label text-red-glow/80">// Traditional Credit</span>
              </div>
              <FlowDiagram
                steps={['No credit history', 'Loan rejected', 'No opportunity to build history', 'Still no credit history']}
                color="text-red"
                lineColor="bg-red/30"
              />
            </div>
            {/* TrustLadder */}
            <div className="panel p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald" />
                <span className="mono-label text-emerald-glow/80">// TrustLadder</span>
              </div>
              <FlowDiagram
                steps={[
                  'Financial activity',
                  'Trust Score',
                  'Starter Credit',
                  'Successful Repayment',
                  'Higher Trust',
                  'Higher Credit',
                ]}
                color="text-emerald"
                lineColor="bg-emerald/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="mb-10 text-center">
            <span className="mono-label">// how_it_works</span>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Four signals. One transparent score.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNALS.map((s) => (
              <div key={s.id} className="panel panel-hover p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-gray-500">{s.id}</span>
                  <s.icon className="h-5 w-5 text-blue" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">{s.label}</h3>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="font-mono text-xs text-blue-glow">{s.weight}</span>
                  <span className="text-xs text-gray-500">weight</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-400">{s.measures}</p>
                <div className="hairline my-3" />
                <p className="text-xs italic leading-relaxed text-gray-300">"{s.line}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section id="calculator" className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="mb-10 text-center">
            <span className="mono-label">// score_calculator</span>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              See exactly how your score is calculated.
            </h2>
            <p className="mt-2 text-sm text-gray-400">Drag the sliders. The score updates live.</p>
          </div>
          <ScoreCalculator />
        </div>
      </section>

      {/* Credit Ladder preview */}
      <section id="ladder" className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="mb-10 text-center">
            <span className="mono-label">// credit_ladder</span>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Progressive credit access.</h2>
            <p className="mt-2 text-sm text-gray-400">
              As your Trust Score grows, better credit products unlock — never a binary approve or reject.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { lv: '01', range: '0–40', label: 'Building Trust', amt: 'No credit yet', color: 'text-gray-400', border: 'border-white/[0.06]' },
              { lv: '02', range: '41–60', label: 'Starter Trust', amt: 'Up to ₹5,000', color: 'text-amber', border: 'border-amber/30' },
              { lv: '03', range: '61–80', label: 'Growing Trust', amt: '₹25,000–₹50,000', color: 'text-blue', border: 'border-blue/30' },
              { lv: '04', range: '81–100', label: 'High Trust', amt: 'Up to ₹1,00,000', color: 'text-emerald', border: 'border-emerald/30' },
            ].map((t) => (
              <div key={t.lv} className={`panel p-5 ${t.border}`}>
                <span className="font-mono text-3xl font-bold text-gray-500">{t.lv}</span>
                <p className="mt-2 font-mono text-xs text-gray-400">{t.range}</p>
                <h3 className={`mt-1 text-sm font-semibold ${t.color}`}>{t.label}</h3>
                <p className="mt-2 text-xs text-gray-400">{t.amt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fairness */}
      <section id="fairness" className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="panel p-6">
              <div className="mb-3 flex items-center gap-2">
                <Scale className="h-4 w-4 text-blue" />
                <span className="mono-label">// fairness_by_design</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Built for fairer financial access.</h3>
              <p className="mt-2 text-sm text-gray-400">
                The score evaluates financial behaviour rather than sensitive personal characteristics.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="panel p-4">
                <span className="text-xs text-gray-500 mb-2 block">// never_used</span>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li className="line-through">Religion</li>
                  <li className="line-through">Caste</li>
                  <li className="line-through">Gender</li>
                  <li className="line-through">Political beliefs</li>
                </ul>
              </div>
              <div className="panel p-4">
                <span className="text-xs text-gray-500 mb-2 block">// what_we_use</span>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald" /> Income behaviour</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald" /> Repayment behaviour</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald" /> Work consistency</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald" /> Transaction patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo personas */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="mb-10 text-center">
            <span className="mono-label">// demo_mode</span>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Try the product instantly.</h2>
            <p className="mt-2 text-sm text-gray-400">Pick a persona and explore the full dashboard — no signup needed.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {PERSONAS.map((p) => (
              <div
                key={p.id}
                className="panel panel-hover group p-5 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-bold text-blue-glow">{p.score.total}</span>
                    <Sparkles className="h-4 w-4 text-gray-500 group-hover:text-blue" />
                  </div>
                  <p className="mt-1 font-mono text-xs text-gray-400">{p.score.category}</p>
                  <h3 className="mt-3 text-sm font-semibold text-white">{p.name}</h3>
                  <p className="text-xs text-gray-400">{p.occupation}</p>
                  <p className="mt-3 text-xs text-gray-400">
                    Credit: {p.availableCredit === 5000 ? 'Up to ₹5,000' : p.availableCredit === 50000 ? '₹25,000–₹50,000' : 'Up to ₹1,00,000'}
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      enterDemo(p.id);
                      navigate('/app');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-glow hover:underline focus:outline-none"
                    aria-label={`Launch demo for ${p.name}`}
                  >
                    Launch demo <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Engine teaser */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="panel p-6 lg:p-10">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-violet" />
              <span className="mono-label text-violet-glow/80">// trust_engine</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">Transparent today. Smarter tomorrow.</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              The current engine is a fully transparent rule-based model. As more labelled repayment data is collected,
              a machine-learning risk layer will complement — never replace — the transparent score.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald-glow">Current: Rule-Based</span>
              <ArrowRight className="self-center text-gray-400" />
              <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 font-mono text-xs text-violet-glow">Future: ML Risk Prediction</span>
              <ArrowRight className="self-center text-gray-400" />
              <span className="rounded-full border border-blue/30 bg-blue/10 px-3 py-1 font-mono text-xs text-blue-glow">Hybrid Trust Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-6">
          <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl border border-white/10 bg-ink-800 text-blue">
            <LogoMark className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
            Your financial behaviour tells a story. We turn that story into trust.
          </h2>
          <button
            onClick={() => {
              enterDemo('established');
              navigate('/app');
            }}
            className="btn-primary mt-7"
          >
            Check My Trust Score
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 sm:flex-row lg:px-6">
          <Logo />
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald" /> Encrypted</span>
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-blue" /> Consent-driven</span>
            <span className="flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-violet" /> Fair by design</span>
          </div>
          <p className="font-mono text-xs text-gray-400">© 2026 TrustLadder</p>
        </div>
      </footer>
    </div>
  );
}

function FlowDiagram({ steps, color, lineColor }: { steps: string[]; color: string; lineColor: string }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i}>
          <div className={`flex items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-800 px-3 py-2.5`}>
            <span className={`font-mono text-xs ${color}`}>{String(i + 1).padStart(2, '0')}</span>
            <span className="text-sm text-gray-300">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-1">
              <div className={`h-4 w-px ${lineColor}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ScoreCalculator() {
  const [income, setIncome] = useState(82);
  const [repayment, setRepayment] = useState(90);
  const [longevity, setLongevity] = useState(70);
  const [transactions, setTransactions] = useState(85);
  const [showCalculation, setShowCalculation] = useState(false);

  const score = useMemo(
    () => calculateScore(income, repayment, longevity, transactions),
    [income, repayment, longevity, transactions]
  );
  const category = categoryForScore(score);

  const sliders = [
    { label: 'Income Stability', val: income, set: setIncome, weight: '30%' },
    { label: 'Repayment Behaviour', val: repayment, set: setRepayment, weight: '25%' },
    { label: 'Work Longevity', val: longevity, set: setLongevity, weight: '20%' },
    { label: 'Transaction Consistency', val: transactions, set: setTransactions, weight: '25%' },
  ];

  return (
    <div className="panel grid gap-6 p-6 lg:grid-cols-[1fr_1.2fr] lg:p-8">
      <div className="space-y-5">
        {sliders.map((s) => (
          <div key={s.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-300">{s.label}</span>
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs text-blue-glow">{s.weight}</span>
                <span className="font-mono text-sm font-semibold tabular-nums text-white">{s.val}</span>
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={s.val}
              onChange={(e) => s.set(Number(e.target.value))}
              className="slider w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-ink-800 p-6">
        <span className="mono-label mb-3">// live_calculation</span>
        <div className="text-center">
          <CountUp value={score} decimals={2} duration={500} className="font-mono text-5xl font-bold text-white" />
          <span className="font-mono text-lg text-gray-400"> / 100</span>
        </div>
        <span
          className={`mt-2 rounded-full border px-3 py-0.5 font-mono text-xs uppercase tracking-wider ${
            score >= 81
              ? 'border-emerald/30 text-emerald-glow'
              : score >= 61
                ? 'border-blue/30 text-blue-glow'
                : 'border-amber/30 text-amber'
          }`}
        >
          {category}
        </span>
        <div className="hairline mt-5 w-full" />
        <button
          onClick={() => setShowCalculation(!showCalculation)}
          className="mt-3 text-xs text-blue-glow hover:underline focus:outline-none font-sans font-medium animate-pulse-slow"
        >
          {showCalculation ? 'Hide detailed calculation' : 'Show detailed calculation'}
        </button>
        {showCalculation && (
          <div className="mt-4 w-full space-y-1.5 font-mono text-xs">
            <CalcLine label="Income Stability" val={income} weight={WEIGHTS.income} />
            <CalcLine label="Repayment Behaviour" val={repayment} weight={WEIGHTS.repayment} />
            <CalcLine label="Work Longevity" val={longevity} weight={WEIGHTS.longevity} />
            <CalcLine label="Transaction Consistency" val={transactions} weight={WEIGHTS.transactions} />
            <div className="hairline my-1" />
            <div className="flex justify-between text-sm font-semibold text-white">
              <span>TOTAL</span>
              <span className="tabular-nums">{score.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CalcLine({ label, val, weight }: { label: string; val: number; weight: number }) {
  const contribution = (val * weight).toFixed(2);
  return (
    <div className="flex justify-between text-gray-400">
      <span>{label}</span>
      <span className="tabular-nums">
        {val} × {Math.round(weight * 100)}% = {contribution}
      </span>
    </div>
  );
}
