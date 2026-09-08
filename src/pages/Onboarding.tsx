import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike, Store, Briefcase, Building2, User, ArrowRight, ArrowLeft, Check, ShieldCheck, Lock, CheckCircle2, Plug, Wallet, Smartphone, Landmark, FileText, Activity } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/lib/auth';

const OCCUPATIONS = [
  { id: 'gig', label: 'Delivery / Gig Worker', icon: Bike },
  { id: 'vendor', label: 'Small Vendor', icon: Store },
  { id: 'freelance', label: 'Freelancer', icon: Briefcase },
  { id: 'business', label: 'Small Business Owner', icon: Building2 },
  { id: 'other', label: 'Other', icon: User },
];

const SOURCES = [
  { id: 'upi', label: 'UPI / Digital Transactions', desc: 'PhonePe, Google Pay, Paytm', icon: Smartphone },
  { id: 'gig', label: 'Gig Platform', desc: 'Swiggy, Zomato, Uber, Ola', icon: Activity },
  { id: 'bank', label: 'Bank Account', desc: 'Statement analysis (read-only)', icon: Landmark },
  { id: 'loan', label: 'Previous Loan History', desc: 'Repayment records', icon: FileText },
  { id: 'business', label: 'Business Activity', desc: 'Sales, inventory, invoices', icon: Wallet },
];

export function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(0);
  const [occupation, setOccupation] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>([]);

  function toggleSource(id: string) {
    setConnected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function finish() {
    completeOnboarding();
    navigate('/app');
  }

  return (
    <div className="min-h-screen bg-ink-900">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-14 max-w-3xl items-center px-4">
          <Logo />
          <div className="ml-6 flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-blue' : i < step ? 'w-6 bg-emerald' : 'w-1.5 bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10">
        {step === 0 && (
          <div className="animate-slide-up">
            <span className="mono-label">## step_01</span>
            <h1 className="mt-2 text-2xl font-semibold text-white">Let's understand your financial journey.</h1>
            <p className="mt-1 text-sm text-gray-400">Select what best describes your work.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {OCCUPATIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setOccupation(o.id)}
                  className={`panel panel-hover flex items-center gap-3 p-4 text-left ${
                    occupation === o.id ? 'border-blue/40 bg-blue/5' : ''
                  }`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-lg border ${occupation === o.id ? 'border-blue/40 bg-blue/10 text-blue' : 'border-white/[0.06] bg-ink-800 text-gray-400'}`}>
                    <o.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-gray-200">{o.label}</span>
                  {occupation === o.id && <Check className="ml-auto h-4 w-4 text-blue" />}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button disabled={!occupation} onClick={() => setStep(1)} className="btn-primary">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-slide-up">
            <span className="mono-label">## step_02</span>
            <h1 className="mt-2 text-2xl font-semibold text-white">Connect your financial activity.</h1>
            <p className="mt-1 text-sm text-gray-400">Optional — but more connections mean a more accurate score.</p>

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald/20 bg-emerald/5 px-3 py-2.5 text-xs text-emerald-glow">
              <ShieldCheck className="h-4 w-4" />
              Your data is used only with your consent. You can disconnect anytime.
            </div>

            <div className="mt-5 space-y-2.5">
              {SOURCES.map((s) => {
                const isOn = connected.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSource(s.id)}
                    className={`panel panel-hover flex w-full items-center gap-3 p-4 text-left ${isOn ? 'border-emerald/30' : ''}`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg border ${isOn ? 'border-emerald/30 bg-emerald/10 text-emerald' : 'border-white/[0.06] bg-ink-800 text-gray-400'}`}>
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-200">{s.label}</p>
                      <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                    {isOn ? (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-emerald"><Plug className="h-3 w-3" /> Connected</span>
                    ) : (
                      <span className="font-mono text-[11px] text-ink-200">Connect</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
              <Lock className="h-3.5 w-3.5" /> Bank-grade encryption · Data minimisation · No raw transaction sharing
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(0)} className="btn-ghost">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button onClick={() => setStep(2)} className="btn-primary">
                {connected.length > 0 ? `Continue with ${connected.length} source${connected.length > 1 ? 's' : ''}` : 'Skip for now'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up text-center">
            <span className="mono-label">## step_03</span>
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald/30 bg-emerald/10">
              <CheckCircle2 className="h-8 w-8 text-emerald" />
            </div>
            <h1 className="mt-5 text-2xl font-semibold text-white">Your profile is ready.</h1>
            <p className="mt-1 text-sm text-gray-400">We are generating your Trust Score now.</p>

            <div className="mx-auto mt-8 max-w-xs">
              <div className="space-y-2.5">
                <StepperStep label="Profile" done />
                <StepperStep label="Financial Activity" done />
                <StepperStep label="Trust Analysis" active />
                <StepperStep label="Score Generated" />
              </div>
            </div>

            <button onClick={finish} className="btn-primary mt-8">
              View My Trust Score <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepperStep({ label, done, active }: { label: string; done?: boolean; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full border ${
          done ? 'border-emerald bg-emerald/20 text-emerald' : active ? 'border-blue bg-blue/20 text-blue' : 'border-white/10 bg-ink-800 text-ink-200'
        }`}
      >
        {done ? <Check className="h-3.5 w-3.5" /> : active ? <span className="h-2 w-2 animate-pulse rounded-full bg-blue" /> : <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />}
      </div>
      <span className={`text-sm ${done || active ? 'text-gray-200' : 'text-gray-500'}`}>{label}</span>
    </div>
  );
}
