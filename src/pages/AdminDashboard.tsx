import { Navbar, BottomNav } from '@/components/Navbar';
import { CountUp } from '@/components/Tooltip';
import {
  ADMIN_STATS,
  SCORE_DISTRIBUTION,
  CREDIT_TIER_DISTRIBUTION,
  REPAYMENT_PERFORMANCE,
  MONTHLY_NEW_USERS,
  SCORE_IMPROVEMENT_TREND,
} from '@/lib/data';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RTooltip,
  CartesianGrid,
} from 'recharts';
import { Users, TrendingUp, Percent, IndianRupee } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-ink-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        <div className="mb-6">
          <span className="mono-label">## admin_analytics</span>
          <h1 className="mt-1 text-xl font-semibold text-white">Platform analytics overview.</h1>
        </div>

        {/* Stat row */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="users" value={ADMIN_STATS.users.toLocaleString('en-IN')} icon={Users} color="text-blue" />
          <StatCard label="active_borrowers" value={ADMIN_STATS.activeBorrowers.toLocaleString('en-IN')} icon={Users} color="text-emerald" />
          <StatCard label="avg_trust_score" value={ADMIN_STATS.avgTrustScore.toString()} icon={TrendingUp} color="text-blue" />
          <StatCard label="successful_repayments" value={`${ADMIN_STATS.successfulRepayments}%`} icon={Percent} color="text-emerald" />
          <StatCard label="credit_unlocked" value={`₹${ADMIN_STATS.creditUnlocked} Cr`} icon={IndianRupee} color="text-emerald" />
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <ChartCard title="trust_score_distribution" subtitle="Users by score range">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SCORE_DISTRIBUTION} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="range" tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <RTooltip contentStyle={{ background: '#16181E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="credit_tier_distribution" subtitle="Users by credit level">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={CREDIT_TIER_DISTRIBUTION} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="tier" tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <RTooltip contentStyle={{ background: '#16181E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="repayment_performance" subtitle="Monthly repayment rate">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={REPAYMENT_PERFORMANCE} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis domain={[88, 100]} tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <RTooltip contentStyle={{ background: '#16181E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="monthly_new_users" subtitle="User growth">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_NEW_USERS} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <RTooltip contentStyle={{ background: '#16181E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="users" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="score_improvement_trend" subtitle="Average score over time" full>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={SCORE_IMPROVEMENT_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 75]} tick={{ fill: '#7C8595', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <RTooltip contentStyle={{ background: '#16181E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="avg" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
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
      <p className={`mt-2 font-mono text-xl font-bold ${color}`}>
        <CountUp value={Number(value.replace(/[^0-9.]/g, ''))} decimals={value.includes('.') ? 1 : 0} />
        {value.includes('Cr') && ' Cr'}
        {value.includes('%') && '%'}
        {value.includes('₹') && '₹'}
      </p>
    </div>
  );
}

function ChartCard({ title, subtitle, children, full }: { title: string; subtitle: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`panel p-5 ${full ? 'lg:col-span-2' : ''}`}>
      <div className="mb-3">
        <span className="mono-label">## {title}</span>
        <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
