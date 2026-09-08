import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { REPAYMENTS, REPAYMENT_HISTORY, formatINR } from '@/lib/data';
import { CalendarClock, Check, AlertCircle, TrendingUp } from 'lucide-react';

export function Repayments() {
  const { persona } = useAuth();

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="mono-label">## repayments</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Repay with your rhythm.</h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
          {/* Next payment */}
          <div className="panel relative overflow-hidden p-6">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald/10 blur-2xl" />
            <div className="relative">
              <span className="mono-label">// next_payment</span>
              <p className="mt-3 font-mono text-3xl font-bold text-white">{formatINR(REPAYMENTS[0].amount)}</p>
              <p className="mt-1 text-sm text-gray-400">Due {REPAYMENTS[0].dueDate}</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1">
                <Check className="h-3.5 w-3.5 text-emerald" />
                <span className="font-mono text-xs text-emerald-glow">On Track</span>
              </div>
            </div>
          </div>

          {/* Consistency */}
          <div className="panel p-6">
            <span className="mono-label">// repayment_consistency</span>
            <div className="mt-4 flex items-end gap-4">
              <span className="font-mono text-4xl font-bold text-emerald">{persona.repaymentConsistency}%</span>
              <span className="mb-1 text-xs text-gray-400">over the last 6 months</span>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-emerald transition-all duration-700"
                style={{ width: `${persona.repaymentConsistency}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-gray-300">
              Consistent repayment is strengthening your Trust Score.
            </p>
          </div>
        </div>

        {/* Upcoming schedule */}
        <div className="mt-6">
          <span className="section-header">## upcoming_schedule</span>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REPAYMENTS.map((r, i) => (
              <div key={r.id} className="panel p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-100">{r.weekLabel}</span>
                  {r.status === 'on-track' ? (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald">
                      <Check className="h-3 w-3" /> ON TRACK
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-ink-200">UPCOMING</span>
                  )}
                </div>
                <p className="mt-2 font-mono text-xl font-bold text-white">{formatINR(r.amount)}</p>
                <p className="mt-1 text-xs text-gray-400 flex items-center gap-1.5">
                  <CalendarClock className="h-3 w-3" /> {r.dueDate}
                </p>
                {i === 0 && (
                  <div className="mt-2 inline-block rounded bg-emerald/10 px-2 py-0.5 font-mono text-[10px] text-emerald-glow">
                    DUE IN 3 DAYS
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="mt-6">
          <span className="section-header">## repayment_history</span>
          <div className="panel mt-3 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-wider text-ink-200">month</th>
                  <th className="px-4 py-2.5 text-right font-mono text-[11px] uppercase tracking-wider text-ink-200">amount</th>
                  <th className="px-4 py-2.5 text-right font-mono text-[11px] uppercase tracking-wider text-ink-200">status</th>
                </tr>
              </thead>
              <tbody>
                {REPAYMENT_HISTORY.map((h) => (
                  <tr key={h.month} className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-gray-300">{h.month}</td>
                    <td className="px-4 py-3 text-right font-mono text-gray-200">{formatINR(h.amount)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-emerald">
                        <Check className="h-3 w-3" /> PAID
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
