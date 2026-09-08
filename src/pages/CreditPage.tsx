import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { CREDIT_TIERS, formatINR, CREDIT_PRODUCTS } from '@/lib/data';
import { Link } from 'react-router-dom';
import { Lock, Check, ArrowRight, CreditCard, TrendingUp, ShieldCheck, CalendarClock, ArrowUpRight } from 'lucide-react';

export function CreditPage() {
  const { persona } = useAuth();
  const score = persona.score;
  const currentTier = score.tier;

  const tiers = [...CREDIT_TIERS].reverse(); // show highest first on desktop

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="mono-label">## credit</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Credit designed around your financial journey.</h1>
        </div>

        {/* Stat row */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="available_credit" value={formatINR(persona.availableCredit)} icon={CreditCard} color="text-emerald" />
          <StatCard label="suggested_credit" value={formatINR(persona.suggestedCredit)} icon={TrendingUp} color="text-blue" />
          <StatCard label="trust_score" value={score.total.toFixed(2)} icon={ShieldCheck} color="text-emerald" />
          <StatCard label="risk_level" value={score.total >= 81 ? 'Low · Strong Trust' : score.total >= 61 ? 'Moderate' : 'Building'} icon={ArrowUpRight} color={score.total >= 81 ? 'text-emerald' : 'text-amber'} />
        </div>

        {/* Credit Ladder */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="section-header">## credit_ladder</span>
            <span className="font-mono text-[11px] text-emerald">YOU ARE HERE → LEVEL {currentTier}</span>
          </div>

          {/* Desktop vertical ladder */}
          <div className="hidden lg:block">
            <div className="relative space-y-0">
              {tiers.map((tier, i) => {
                const unlocked = tier.level <= currentTier;
                const isCurrent = tier.level === currentTier;
                return (
                  <div key={tier.level} className="relative flex items-stretch gap-4">
                    {/* Connector line */}
                    {i < tiers.length - 1 && (
                      <div className="absolute left-[19px] top-12 h-full w-px bg-white/[0.06]" />
                    )}
                    {/* Node */}
                    <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 mt-1.5"
                      style={{
                        borderColor: unlocked ? tierColor(tier.color) : 'rgba(255,255,255,0.08)',
                        background: unlocked ? `${tierColor(tier.color)}20` : '#16181E',
                      }}
                    >
                      {unlocked ? (
                        <Check className="h-4 w-4" style={{ color: tierColor(tier.color) }} />
                      ) : (
                        <Lock className="h-4 w-4 text-ink-300" />
                      )}
                    </div>
                    {/* Card */}
                    <div
                      className={`panel mb-3 flex flex-1 items-center justify-between p-4 transition-all ${isCurrent ? 'border-emerald/30 shadow-glow-emerald' : ''}`}
                      style={isCurrent ? { borderColor: 'rgba(16,185,129,0.3)' } : undefined}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-ink-100">LEVEL {tier.level}</span>
                          <span className="font-mono text-xs text-ink-200">· {tier.range} ·</span>
                          <span className="text-sm font-semibold text-white">{tier.label}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-400">{tier.amount}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isCurrent && (
                          <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-[11px] text-emerald-glow">
                            YOU ARE HERE
                          </span>
                        )}
                        {unlocked && !isCurrent && (
                          <span className="font-mono text-[11px] text-ink-200">unlocked</span>
                        )}
                        {!unlocked && (
                          <span className="font-mono text-[11px] text-ink-300">locked</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:hidden">
            {[...CREDIT_TIERS].map((tier) => {
              const unlocked = tier.level <= currentTier;
              const isCurrent = tier.level === currentTier;
              return (
                <div
                  key={tier.level}
                  className={`panel flex-shrink-0 w-40 p-4 ${isCurrent ? 'border-emerald/30' : ''}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2"
                    style={{ borderColor: unlocked ? tierColor(tier.color) : 'rgba(255,255,255,0.08)' }}
                  >
                    {unlocked ? <Check className="h-3.5 w-3.5" style={{ color: tierColor(tier.color) }} /> : <Lock className="h-3.5 w-3.5 text-ink-300" />}
                  </div>
                  <p className="mt-2 font-mono text-xs text-ink-100">LEVEL {tier.level}</p>
                  <p className="font-mono text-[11px] text-ink-200">{tier.range}</p>
                  <h3 className="mt-1 text-sm font-semibold text-white">{tier.label}</h3>
                  <p className="mt-1 text-xs text-gray-400">{tier.amount}</p>
                  {isCurrent && (
                    <span className="mt-2 inline-block rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 font-mono text-[10px] text-emerald-glow">
                      YOU ARE HERE
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Product cards */}
        <div className="mt-8">
          <span className="section-header">## credit_products</span>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {CREDIT_PRODUCTS.map((p) => (
              <div key={p.id} className={`panel panel-hover p-5 ${p.recommended ? 'border-emerald/20' : ''}`}>
                {p.recommended && (
                  <span className="mb-3 inline-block rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-glow">
                    RECOMMENDED FOR YOU
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <p className="mt-1 font-mono text-sm text-blue-glow">{p.range}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{p.description}</p>
                <div className="mt-4">
                  <p className="mono-label-dim mb-2">common_uses</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.uses.map((u) => (
                      <span key={u} className="rounded-md border border-white/[0.06] bg-ink-800 px-2 py-1 text-xs text-gray-300">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to="/app/credit/apply" className={`mt-5 inline-flex ${p.recommended ? 'btn-primary' : 'btn-secondary'}`}>
                  {p.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Income-aligned repayment */}
        <div className="mt-8 panel relative overflow-hidden p-6">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue/10 blur-2xl" />
          <div className="relative">
            <span className="mono-label">## repay_with_your_rhythm</span>
            <h2 className="mt-2 text-lg font-semibold text-white">Income-aligned repayment.</h2>
            <p className="mt-1 text-sm text-gray-400">
              Gig workers earn daily and weekly, not monthly. Your repayment plan should match.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <FlowBox label="Weekly earnings" value={formatINR(8500)} color="text-white" />
              <ArrowRight className="h-4 w-4 text-ink-200" />
              <FlowBox label="Suggested repayment" value={formatINR(1250)} color="text-blue-glow" />
              <ArrowRight className="h-4 w-4 text-ink-200" />
              <FlowBox label="Remaining income" value={formatINR(7250)} color="text-emerald-glow" />
            </div>

            {/* Weekly calendar */}
            <div className="mt-5">
              <p className="mono-label-dim mb-2">weekly_schedule</p>
              <div className="grid grid-cols-7 gap-1.5">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div
                    key={day}
                    className={`rounded-lg border p-2 text-center ${i === 4 ? 'border-blue/40 bg-blue/10' : 'border-white/[0.06] bg-ink-800'}`}
                  >
                    <p className="font-mono text-[10px] text-ink-100">{day}</p>
                    <p className={`mt-1 font-mono text-xs ${i === 4 ? 'text-blue-glow' : 'text-ink-200'}`}>
                      {i === 4 ? formatINR(1250) : '—'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/app/repayments" className="btn-secondary mt-5 inline-flex">
              <CalendarClock className="h-3.5 w-3.5" /> View Repayment Plan
            </Link>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between">
        <span className="mono-label-dim">{label}</span>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <p className={`mt-2 font-mono text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function FlowBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-ink-800 px-4 py-3">
      <p className="mono-label-dim">{label}</p>
      <p className={`mt-1 font-mono text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}

function tierColor(color: string): string {
  const map: Record<string, string> = {
    ink: '#525967',
    amber: '#F59E0B',
    blue: '#3B82F6',
    emerald: '#10B981',
  };
  return map[color] || '#3B82F6';
}
