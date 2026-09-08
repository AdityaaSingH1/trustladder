import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { CONNECTED_SOURCES } from '@/lib/data';
import { ShieldCheck, Lock, Eye, Trash2, KeyRound, Clock, Check, Unplug } from 'lucide-react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[900px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="mono-label">## data_privacy</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Your financial data belongs to you.</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PrivacyCard icon={Check} title="Consent" desc="You choose what to connect. You can disconnect anytime. Nothing is accessed without your explicit permission." color="text-emerald" />
          <PrivacyCard icon={Lock} title="Encryption" desc="All data is encrypted in transit and at rest using bank-grade AES-256 encryption." color="text-blue" />
          <PrivacyCard icon={Eye} title="Data minimisation" desc="We only collect what's needed to calculate your score — no raw transaction dumps, no unnecessary personal details." color="text-violet" />
          <PrivacyCard icon={KeyRound} title="Secure API access" desc="Financial connections use read-only, tokenised access. We never store your credentials." color="text-emerald" />
          <PrivacyCard icon={Clock} title="Limited retention" desc="Financial activity data is retained for 24 months, then automatically purged. You can request early deletion." color="text-amber" />
          <PrivacyCard icon={ShieldCheck} title="No selling" desc="We never sell your data to third parties. Your information is used solely to generate your Trust Score." color="text-blue" />
        </div>

        {/* Connected sources */}
        <div className="mt-8">
          <span className="section-header">## connected_sources</span>
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
                      {s.connected ? `Last sync: ${s.lastSync}` : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {s.connected ? (
                    <>
                      <button className="btn-ghost text-xs">View Data Usage</button>
                      <button className="btn-ghost text-xs text-red-glow hover:text-red">Disconnect</button>
                    </>
                  ) : (
                    <button className="btn-secondary text-xs">Manage Access</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 panel p-5">
          <p className="text-sm text-gray-300">
            Questions about your data? You can request a full export or deletion of your data at any time.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="btn-secondary text-xs">Request Data Export</button>
            <button className="btn-secondary text-xs text-red-glow hover:text-red">Request Deletion</button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function PrivacyCard({ icon: Icon, title, desc, color }: { icon: React.ElementType; title: string; desc: string; color: string }) {
  return (
    <div className="panel panel-hover p-5">
      <Icon className={`h-5 w-5 ${color}`} />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{desc}</p>
    </div>
  );
}

// Fairness page
export function Fairness() {
  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[900px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="mono-label">## fairness</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Built for fairer financial access.</h1>
          <p className="mt-1 text-sm text-gray-400">
            The score evaluates financial behaviour rather than sensitive personal characteristics.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Excluded */}
          <div className="panel p-6">
            <span className="mono-label text-red-glow/70">// never_used</span>
            <p className="mt-1 text-xs text-gray-400">These attributes never influence your score.</p>
            <div className="mt-4 space-y-3">
              {['Religion', 'Caste', 'Gender', 'Political beliefs'].map((attr) => (
                <div key={attr} className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-800 p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-red/10 text-red">
                    <span className="text-lg">✕</span>
                  </span>
                  <span className="text-sm text-gray-400 line-through">{attr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Included */}
          <div className="panel p-6">
            <span className="mono-label text-emerald-glow/70">// what_we_use</span>
            <p className="mt-1 text-xs text-gray-400">Only financial behaviour matters.</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Income behaviour', desc: 'Earnings consistency and trends' },
                { label: 'Repayment behaviour', desc: 'On-time payment history' },
                { label: 'Work consistency', desc: 'Platform tenure and active months' },
                { label: 'Transaction patterns', desc: 'Digital payment regularity' },
              ].map((attr) => (
                <div key={attr.label} className="flex items-center gap-3 rounded-lg border border-emerald/20 bg-emerald/5 p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald/10 text-emerald">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-200">{attr.label}</p>
                    <p className="text-xs text-gray-400">{attr.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 panel p-5">
          <h2 className="text-sm font-semibold text-white">Our fairness commitment</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            TrustLadder is designed to expand access to credit for people underserved by traditional systems.
            We do not use, store, or request sensitive personal characteristics. The score is based entirely on
            observable financial behaviour that any person — regardless of background — can build through
            consistent activity.
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
