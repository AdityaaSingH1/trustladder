import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { LogoMark } from '@/components/Logo';
import { TrustScoreRing } from '@/components/TrustScoreRing';
import { PERSONAS } from '@/lib/data';

export function LoginScreen() {
  const { signIn, signUp, signInWithGoogle, resetPassword, enterDemo } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fn = mode === 'signin' ? signIn : signUp;
    const { error } = await fn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    if (mode === 'signup') navigate('/onboarding');
    else navigate('/app');
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setError('Enter your email above first.');
      return;
    }
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) setError(error);
    else setResetSent(true);
  }

  function passwordStrength(pw: string): { label: string; pct: number; color: string } {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const map = [
      { label: 'Too short', pct: 0, color: 'bg-ink-400' },
      { label: 'Weak', pct: 20, color: 'bg-red' },
      { label: 'Fair', pct: 40, color: 'bg-amber' },
      { label: 'Good', pct: 60, color: 'bg-blue' },
      { label: 'Strong', pct: 80, color: 'bg-emerald' },
      { label: 'Excellent', pct: 100, color: 'bg-emerald' },
    ];
    return map[Math.min(score, 5)];
  }

  const strength = passwordStrength(password);

  return (
    <div className="flex min-h-screen bg-ink-900">
      {/* Left brand panel — 60% */}
      <div className="relative hidden w-[60%] flex-col justify-between overflow-hidden border-r border-white/[0.06] bg-ink-850 p-10 lg:flex">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-ink-800 text-blue">
            <LogoMark className="h-6 w-6" />
          </span>
          <span className="font-mono text-base font-semibold text-white">
            Trust<span className="text-blue">Ladder</span>
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="panel relative p-8">
            <div className="absolute inset-0 grid-bg-fine opacity-30 rounded-xl" />
            <div className="relative">
              <TrustScoreRing score={81.75} size={240} />
            </div>
          </div>
          <div className="mt-6 space-y-1 text-center">
            <p className="font-mono text-xs text-ink-100">// 12,840 users</p>
            <p className="font-mono text-xs text-ink-100">// 81.75 avg trust score</p>
          </div>
          <h1 className="mt-6 max-w-md text-center text-2xl font-semibold leading-snug text-white">
            Turn financial behaviour into financial opportunity.
          </h1>
          <p className="mt-2 max-w-sm text-center text-sm text-gray-400">
            Your work, repayment and financial consistency can build your path to better credit.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald" /> Bank-grade encryption
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-blue" /> Consent-driven data
          </span>
        </div>
      </div>

      {/* Right auth panel — 40% */}
      <div className="flex w-full flex-col justify-center bg-ink-900 px-6 py-10 lg:w-[40%] lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile brand */}
          <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-ink-800 text-blue">
              <LogoMark className="h-5 w-5" />
            </span>
            <span className="font-mono text-sm font-semibold text-white">
              Trust<span className="text-blue">Ladder</span>
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              {mode === 'signin' ? 'Welcome back to TrustLadder' : 'Create your TrustLadder account'}
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              {mode === 'signin' ? 'Sign in to view your Trust Score.' : 'Start building your financial trust profile.'}
            </p>
          </div>

          {/* Google */}
          <button
            onClick={() => signInWithGoogle()}
            className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-all hover:bg-gray-100 active:scale-[0.98]"
          >
            <GoogleIcon className="h-4 w-4" />
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-200">or continue with email</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red/30 bg-red/10 px-3.5 py-2.5 text-sm text-red-glow">
              {error}
            </div>
          )}
          {resetSent && (
            <div className="mb-4 rounded-lg border border-emerald/30 bg-emerald/10 px-3.5 py-2.5 text-sm text-emerald-glow">
              Password reset link sent. Check your inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mono-label mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-200" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="field pl-10"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="mono-label">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setShowReset((v) => !v)}
                    className="text-xs text-gray-400 hover:text-blue-glow"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-200" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-200 hover:text-gray-300"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {mode === 'signup' && password.length > 0 && (
                <div className="mt-2">
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.pct}%` }} />
                  </div>
                  <span className="mt-1 block font-mono text-[10px] text-ink-100">strength: {strength.label}</span>
                </div>
              )}
            </div>

            {showReset && mode === 'signin' && (
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary w-full"
                disabled={loading}
              >
                Send reset link
              </button>
            )}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
              className="font-medium text-blue-glow hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-200">
            By continuing you agree to our{' '}
            <Link to="/privacy" className="underline hover:text-gray-300">Terms</Link> and{' '}
            <Link to="/privacy" className="underline hover:text-gray-300">Privacy Policy</Link>.
          </p>

          {/* Demo access */}
          <div className="mt-6 rounded-lg border border-white/[0.06] bg-ink-850 p-3">
            <p className="mono-label mb-2">// demo_access</p>
            <div className="space-y-1.5">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    enterDemo(p.id);
                    navigate('/app');
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-gray-300 hover:bg-white/[0.04]"
                >
                  <span>{p.name} — {p.occupation}</span>
                  <span className="font-mono tabular-nums text-blue-glow">{p.score.total}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
