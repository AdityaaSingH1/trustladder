import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { formatINR } from '@/lib/data';
import { ArrowRight, ArrowLeft, Check, Loader2, Wallet, Wrench, Bike, AlertCircle, Briefcase, Package } from 'lucide-react';

const PURPOSES = [
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'vehicle', label: 'Vehicle maintenance', icon: Bike },
  { id: 'equipment', label: 'Equipment', icon: Wrench },
  { id: 'emergency', label: 'Emergency', icon: AlertCircle },
  { id: 'working', label: 'Working capital', icon: Briefcase },
  { id: 'other', label: 'Other', icon: Wallet },
];

const REPAYMENT_PREFS = [
  { id: 'weekly', label: 'Weekly', desc: 'Aligns with gig income rhythm' },
  { id: 'biweekly', label: 'Bi-weekly', desc: 'Every two weeks' },
  { id: 'monthly', label: 'Monthly', desc: 'Traditional monthly cycle' },
];

export function LoanApplication() {
  const { persona } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(25000);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [repayment, setRepayment] = useState<string>('weekly');
  const [submitted, setSubmitted] = useState(false);

  const weeklyRepayment = Math.round((amount / 20) / 4); // rough weekly over ~20 weeks
  const steps = ['Amount', 'Purpose', 'Repayment', 'Review'];

  if (submitted) {
    return (
      <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
        <Navbar />
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald/30 bg-emerald/10">
            <Check className="h-8 w-8 text-emerald" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-white">Application submitted.</h1>
          <p className="mt-2 text-sm text-gray-400">
            Your application for {formatINR(amount)} is being reviewed. We'll notify you once it's approved.
          </p>
          <div className="panel mt-6 p-4 text-left">
            <p className="mono-label mb-2">// application_summary</p>
            <Row label="Amount" value={formatINR(amount)} />
            <Row label="Purpose" value={PURPOSES.find((p) => p.id === purpose)?.label || '—'} />
            <Row label="Repayment" value={REPAYMENT_PREFS.find((r) => r.id === repayment)?.label || '—'} />
            <Row label="Estimated weekly repayment" value={formatINR(weeklyRepayment)} />
            <Row label="Trust Score" value={persona.score.total.toFixed(2)} />
            <Row label="Credit tier" value={`Level ${persona.score.tier} · ${persona.score.category}`} />
          </div>
          <button onClick={() => navigate('/app/credit')} className="btn-primary mt-6">
            Back to Credit <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-6 lg:px-6">
        <button onClick={() => (step === 0 ? navigate('/app/credit') : setStep(step - 1))} className="btn-ghost mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <span className="mono-label">## credit_application</span>
        <h1 className="mt-1 text-xl font-semibold text-white">Apply for credit.</h1>

        {/* Stepper */}
        <div className="mt-4 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[11px] ${
                  i < step ? 'border-emerald bg-emerald/20 text-emerald' : i === step ? 'border-blue bg-blue/20 text-blue' : 'border-white/10 bg-ink-800 text-ink-200'
                }`}
              >
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={`text-xs ${i === step ? 'text-white' : 'text-gray-500'}`}>{s}</span>
              {i < steps.length - 1 && <div className="mx-1 h-px w-6 bg-white/[0.08]" />}
            </div>
          ))}
        </div>

        <div className="panel mt-6 p-6">
          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-white">How much do you need?</h2>
              <p className="mt-1 text-sm text-gray-400">Choose an amount between {formatINR(5000)} and {formatINR(100000)}.</p>
              <div className="mt-6 text-center">
                <span className="font-mono text-4xl font-bold text-white">{formatINR(amount)}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="slider mt-4 w-full"
              />
              <div className="mt-1 flex justify-between font-mono text-[11px] text-ink-200">
                <span>{formatINR(5000)}</span>
                <span>{formatINR(100000)}</span>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => setStep(1)} className="btn-primary">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-white">What's the purpose?</h2>
              <p className="mt-1 text-sm text-gray-400">This helps us recommend the right product.</p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {PURPOSES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPurpose(p.id)}
                    className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                      purpose === p.id ? 'border-blue/40 bg-blue/5' : 'border-white/[0.06] bg-ink-800 hover:border-white/10'
                    }`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${purpose === p.id ? 'bg-blue/10 text-blue' : 'bg-ink-700 text-gray-400'}`}>
                      <p.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-gray-200">{p.label}</span>
                    {purpose === p.id && <Check className="ml-auto h-4 w-4 text-blue" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button disabled={!purpose} onClick={() => setStep(2)} className="btn-primary">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-white">Repayment preference</h2>
              <p className="mt-1 text-sm text-gray-400">Pick a rhythm that matches your income.</p>
              <div className="mt-5 space-y-2.5">
                {REPAYMENT_PREFS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRepayment(r.id)}
                    className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition-all ${
                      repayment === r.id ? 'border-blue/40 bg-blue/5' : 'border-white/[0.06] bg-ink-800 hover:border-white/10'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-200">{r.label}</p>
                      <p className="text-xs text-gray-400">{r.desc}</p>
                    </div>
                    {repayment === r.id && <Check className="h-4 w-4 text-blue" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => setStep(3)} className="btn-primary">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-white">Review your application.</h2>
              <div className="mt-4 space-y-2 rounded-lg border border-white/[0.06] bg-ink-800 p-4">
                <Row label="Requested amount" value={formatINR(amount)} />
                <Row label="Purpose" value={PURPOSES.find((p) => p.id === purpose)?.label || '—'} />
                <Row label="Repayment preference" value={REPAYMENT_PREFS.find((r) => r.id === repayment)?.label || '—'} />
                <Row label="Estimated weekly repayment" value={formatINR(weeklyRepayment)} />
                <Row label="Your Trust Score" value={persona.score.total.toFixed(2)} />
                <Row label="Credit tier" value={`Level ${persona.score.tier} · ${persona.score.category}`} />
              </div>

              {/* Mini schedule */}
              <div className="mt-4">
                <p className="mono-label-dim mb-2">repayment_schedule_preview</p>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((w) => (
                    <div key={w} className="rounded-lg border border-white/[0.06] bg-ink-800 p-2 text-center">
                      <p className="font-mono text-[10px] text-ink-100">Week {w}</p>
                      <p className="mt-0.5 font-mono text-xs text-blue-glow">{formatINR(weeklyRepayment)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="btn-primary mt-6 w-full"
              >
                <Check className="h-4 w-4" /> Submit Application
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-mono text-gray-200">{value}</span>
    </div>
  );
}
