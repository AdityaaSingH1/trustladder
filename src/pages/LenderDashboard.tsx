import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Navbar, BottomNav } from '@/components/Navbar';
import { LENDER_APPLICANTS, formatINR } from '@/lib/data';
import type { LenderApplicant } from '@/types';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, TrendingUp, Building2, Users, Percent, IndianRupee } from 'lucide-react';

export function LenderDashboard() {
  const { persona } = useAuth();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');

  const filtered = LENDER_APPLICANTS.filter((a) => {
    if (query && !a.name.toLowerCase().includes(query.toLowerCase()) && !a.occupation.toLowerCase().includes(query.toLowerCase())) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (tierFilter !== 'all' && a.tier !== Number(tierFilter)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="mono-label">## lender_workspace</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Applicant portfolio overview.</h1>
        </div>

        {/* Stat row */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="total_applicants" value="1,284" icon={Users} color="text-blue" />
          <StatCard label="avg_trust_score" value="68.4" icon={TrendingUp} color="text-emerald" />
          <StatCard label="active_credit" value="₹18.6 Cr" icon={IndianRupee} color="text-blue" />
          <StatCard label="repayment_rate" value="94.8%" icon={Percent} color="text-emerald" />
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-200" />
            <input
              type="text"
              placeholder="Search applicants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field pl-10"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="field w-auto">
            <option value="all">All statuses</option>
            <option value="On Track">On Track</option>
            <option value="Review">Review</option>
            <option value="New">New</option>
            <option value="Flagged">Flagged</option>
          </select>
          <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)} className="field w-auto">
            <option value="all">All tiers</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
          </select>
          <span className="font-mono text-xs text-ink-200">{filtered.length} results</span>
        </div>

        {/* Table */}
        <div className="panel mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-wider text-ink-200">applicant</th>
                <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-wider text-ink-200">trust</th>
                <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-wider text-ink-200">income</th>
                <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-wider text-ink-200">repay</th>
                <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-wider text-ink-200">longev</th>
                <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-wider text-ink-200">trans</th>
                <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-wider text-ink-200">suggested</th>
                <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-wider text-ink-200">status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr
                  key={a.id}
                  className={`border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`}
                >
                  <td className="px-4 py-3">
                    <Link to={`/app/lender/applicants/${a.id}`} className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue/15 font-mono text-[10px] font-semibold text-blue">
                        {a.name.split(' ').map((s) => s[0]).join('').slice(0, 2)}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-200 hover:text-blue-glow">{a.name}</p>
                        <p className="text-xs text-gray-500">{a.occupation}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono tabular-nums font-semibold ${a.trustScore >= 81 ? 'text-emerald' : a.trustScore >= 61 ? 'text-blue-glow' : a.trustScore >= 41 ? 'text-amber' : 'text-ink-100'}`}>
                      {a.trustScore.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-gray-300">{a.income}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-gray-300">{a.repayment}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-gray-300">{a.longevity}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-gray-300">{a.transactions}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-blue-glow">{formatINR(a.suggestedLimit)}</td>
                  <td className="px-4 py-3 text-right">
                    <StatusBadge status={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-gray-400">No applicants match your filters.</div>
          )}
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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'On Track': 'border-emerald/30 bg-emerald/10 text-emerald-glow',
    Review: 'border-amber/30 bg-amber/10 text-amber',
    New: 'border-blue/30 bg-blue/10 text-blue-glow',
    Flagged: 'border-red/30 bg-red/10 text-red-glow',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] ${map[status] || ''}`}>
      {status}
    </span>
  );
}
