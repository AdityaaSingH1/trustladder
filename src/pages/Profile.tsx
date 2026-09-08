import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { TrustScoreRing } from '@/components/TrustScoreRing';
import { CONNECTED_SOURCES } from '@/lib/data';
import { Check, Unplug, ShieldCheck, Lock, Eye, Trash2, Scale, Ban } from 'lucide-react';

export function Profile() {
  const { persona, signOut } = useAuth();
  const score = persona.score;
  const initials = persona.name.split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase();

  const journey = [
    { label: 'Account created', done: true },
    { label: 'Profile verified', done: true },
    { label: 'Trust Score generated', done: true },
    { label: 'Starter credit unlocked', done: true },
    { label: 'Successful repayments', done: true },
    { label: 'Higher credit unlocked', done: score.tier >= 4 },
  ];

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1000px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="mono-label">## profile</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Your financial identity.</h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
          {/* Profile card */}
          <div className="panel p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue/15 font-mono text-lg font-bold text-blue">
                {initials}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white">{persona.name}</h2>
                <p className="text-sm text-gray-400">{persona.occupation}</p>
              </div>
            </div>
            <div className="hairline my-4" />
            <div className="space-y-2.5 text-sm">
              <Row label="Trust Score" value={score.total.toFixed(2)} />
              <Row label="Category" value={score.category} />
              <Row label="Credit Tier" value={`Level ${score.tier}`} />
              <Row label="Monthly Income" value={`₹${persona.monthlyIncome.toLocaleString('en-IN')}`} />
              <Row label="Work Days" value={`${persona.workDaysPerMonth} days/month`} />
            </div>
            <div className="hairline my-4" />
            <div>
              <p className="mono-label-dim mb-2">work_platforms</p>
              <div className="flex flex-wrap gap-1.5">
                {['Swiggy', 'Zomato', 'Amazon Flex'].map((p) => (
                  <span key={p} className="rounded-md border border-white/[0.06] bg-ink-800 px-2 py-1 text-xs text-gray-300">{p}</span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="mono-label-dim mb-2">account_verification</p>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald/20 bg-emerald/5 px-2 py-1 text-xs text-emerald-glow">
                <Check className="h-3 w-3" /> Verified
              </span>
            </div>
          </div>

          {/* Financial journey */}
          <div className="panel p-5">
            <span className="mono-label">## financial_journey</span>
            <p className="mt-1 text-sm text-gray-400">Your progress through the TrustLadder system.</p>
            <div className="mt-5 space-y-1">
              {journey.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  {i < journey.length - 1 && (
                    <div className="absolute left-[19px] mt-7 h-6 w-px bg-white/[0.06]" />
                  )}
                  <div
                    className={`relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                      step.done ? 'border-emerald bg-emerald/20' : 'border-white/10 bg-ink-800'
                    }`}
                  >
                    {step.done ? <Check className="h-3.5 w-3.5 text-emerald" /> : <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />}
                  </div>
                  <span className={`text-sm ${step.done ? 'text-gray-200' : 'text-gray-500'}`}>{step.label}</span>
                </div>
              ))}
            </div>
            <div className="hairline my-5" />
            <div className="flex items-center justify-center">
              <TrustScoreRing score={score.total} size={120} compact />
            </div>
          </div>
        </div>

        {/* Connected sources */}
        <div className="mt-6">
          <span className="section-header">## financial_connections</span>
          <div className="mt-3 space-y-2.5">
            {CONNECTED_SOURCES.map((s) => (
              <div key={s.id} className="panel flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.connected ? 'bg-emerald/10 text-emerald' : 'bg-ink-700 text-ink-200'}`}>
                    {s.connected ? <Check className="h-4 w-4" /> : <Unplug className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-200">{s.label}</p>
                    <p className="font-mono text-[11px] text-ink-200">
                      {s.connected ? `Synced ${s.lastSync}` : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {s.connected ? (
                    <>
                      <button className="btn-ghost text-xs">View Usage</button>
                      <button className="btn-ghost text-xs text-red-glow hover:text-red">Disconnect</button>
                    </>
                  ) : (
                    <button className="btn-secondary text-xs">Connect</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={() => signOut()} className="btn-secondary text-red-glow hover:text-red">
            Sign out
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-mono text-gray-200">{value}</span>
    </div>
  );
}
