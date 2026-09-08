import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Gauge,
  CreditCard,
  TrendingUp,
  CalendarClock,
  Shield,
  Lock,
  Scale,
  Cpu,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Building2,
  X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/components/Logo';
import { NOTIFICATIONS } from '@/lib/data';
import type { Role } from '@/types';

const borrowerNav = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, mono: 'overview' },
  { to: '/app/score', label: 'My Trust Score', icon: Gauge, mono: 'trust_score' },
  { to: '/app/credit', label: 'Credit', icon: CreditCard, mono: 'credit' },
  { to: '/app/improve', label: 'Improve Score', icon: TrendingUp, mono: 'improve' },
  { to: '/app/repayments', label: 'Repayments', icon: CalendarClock, mono: 'repayments' },
];

const secondaryNav = [
  { to: '/app/trust-engine', label: 'Trust Engine', icon: Cpu, mono: 'engine' },
  { to: '/app/privacy', label: 'Privacy', icon: Lock, mono: 'privacy' },
  { to: '/app/fairness', label: 'Fairness', icon: Scale, mono: 'fairness' },
  { to: '/app/profile', label: 'Profile', icon: UserIcon, mono: 'profile' },
];

const lenderNav = [
  { to: '/app', label: 'Workspace', icon: Building2, mono: 'workspace' },
  { to: '/app/lender/applicants', label: 'Applicants', icon: UserIcon, mono: 'applicants' },
];

export function Navbar() {
  const { user, persona, role, setRole, signOut, demoMode } = useAuth();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const nav = role === 'lender' ? lenderNav : borrowerNav;
  const initials = (persona.name || 'User').split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase();

  useEffect(() => {
    setMobileNav(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-900/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-6">
            <Logo to="/app" />
            <nav className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      active ? 'bg-white/[0.06] text-white' : 'text-gray-400 hover:bg-white/[0.03] hover:text-gray-200'
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Role switcher */}
            <RoleSwitcher role={role} onChange={setRole} />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative rounded-lg p-2 text-gray-400 hover:bg-white/[0.05] hover:text-gray-200"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald" />
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-white/10 bg-ink-800 p-2 shadow-2xl">
                    <div className="flex items-center justify-between px-2 py-2">
                      <span className="mono-label">// notifications</span>
                      <span className="font-mono text-[10px] text-ink-200">{NOTIFICATIONS.length} new</span>
                    </div>
                    <div className="space-y-1">
                      {NOTIFICATIONS.map((n) => (
                        <div
                          key={n.id}
                          className="rounded-lg p-2.5 hover:bg-white/[0.03]"
                        >
                          <div className="flex items-start gap-2.5">
                            <NotifIcon icon={n.icon} tone={n.tone} />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-gray-200">{n.title}</p>
                              <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400">{n.body}</p>
                              <p className="mt-1 font-mono text-[10px] text-ink-200">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Avatar menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-ink-800 py-1 pl-1 pr-2 hover:border-white/10"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue/20 font-mono text-[10px] font-semibold text-blue">
                  {initials}
                </span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-white/10 bg-ink-800 p-2 shadow-2xl">
                    <div className="px-2.5 py-2">
                      <p className="text-sm font-medium text-white">{persona.name}</p>
                      <p className="text-xs text-gray-400">{persona.occupation}</p>
                      {demoMode && (
                        <span className="mt-1 inline-block rounded bg-violet/20 px-1.5 py-0.5 font-mono text-[10px] text-violet-glow">
                          DEMO MODE
                        </span>
                      )}
                    </div>
                    <div className="hairline my-1.5" />
                    {role === 'borrower' &&
                      secondaryNav.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-gray-300 hover:bg-white/[0.04] hover:text-white"
                        >
                          <item.icon className="h-3.5 w-3.5 text-gray-400" />
                          {item.label}
                        </Link>
                      ))}
                    <div className="hairline my-1.5" />
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-gray-300 hover:bg-white/[0.04] hover:text-white"
                    >
                      <LogOut className="h-3.5 w-3.5 text-gray-400" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile nav toggle */}
            <button
              onClick={() => setMobileNav(true)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/[0.05] lg:hidden"
              aria-label="Open menu"
            >
              <LayoutDashboard className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer nav */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileNav(false)} />
          <div className="absolute left-0 top-0 h-full w-72 border-r border-white/10 bg-ink-850 p-4">
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button onClick={() => setMobileNav(false)} className="rounded-md p-1.5 text-gray-400 hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-1">
              {[...nav, ...secondaryNav].map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      active ? 'bg-white/[0.06] text-white' : 'text-gray-400 hover:bg-white/[0.03] hover:text-gray-200'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function RoleSwitcher({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  return (
    <div className="hidden items-center rounded-lg border border-white/[0.06] bg-ink-800 p-0.5 sm:flex">
      <button
        onClick={() => onChange('borrower')}
        className={`rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all ${
          role === 'borrower' ? 'bg-blue/20 text-blue-glow' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        Borrower
      </button>
      <button
        onClick={() => onChange('lender')}
        className={`rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all ${
          role === 'lender' ? 'bg-violet/20 text-violet-glow' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        Lender
      </button>
    </div>
  );
}

function NotifIcon({ icon, tone }: { icon: string; tone: string }) {
  const color =
    tone === 'positive' ? 'text-emerald bg-emerald/10' : tone === 'attention' ? 'text-amber bg-amber/10' : 'text-blue bg-blue/10';
  const map: Record<string, React.ReactNode> = {
    'trend-up': <TrendingUp className="h-3.5 w-3.5" />,
    unlock: <Shield className="h-3.5 w-3.5" />,
    calendar: <CalendarClock className="h-3.5 w-3.5" />,
    activity: <TrendingUp className="h-3.5 w-3.5" />,
    refresh: <TrendingUp className="h-3.5 w-3.5" />,
  };
  return <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ${color}`}>{map[icon]}</span>;
}

export function BottomNav() {
  const location = useLocation();
  const { role } = useAuth();
  const items = role === 'lender' ? lenderNav : borrowerNav.slice(0, 5);
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] bg-ink-900/95 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] font-medium transition-all ${
                active ? 'text-blue-glow' : 'text-gray-500'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label.split(' ')[0]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
