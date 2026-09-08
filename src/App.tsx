import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth';
import { LandingPage } from '@/pages/LandingPage';
import { LoginScreen } from '@/pages/LoginScreen';
import { Onboarding } from '@/pages/Onboarding';
import { Dashboard } from '@/pages/Dashboard';
import { ScorePage } from '@/pages/ScorePage';
import { CreditPage } from '@/pages/CreditPage';
import { LoanApplication } from '@/pages/LoanApplication';
import { ImproveScore } from '@/pages/ImproveScore';
import { Repayments } from '@/pages/Repayments';
import { Profile } from '@/pages/Profile';
import { Privacy, Fairness } from '@/pages/PrivacyFairness';
import { TrustEngine } from '@/pages/TrustEngine';
import { LenderDashboard } from '@/pages/LenderDashboard';
import { LenderApplicantProfile } from '@/pages/LenderApplicantProfile';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { LogoMark } from '@/components/Logo';

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900">
      <div className="flex flex-col items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-ink-800 text-blue animate-pulse">
          <LogoMark className="h-7 w-7" />
        </span>
        <span className="font-mono text-xs text-ink-100">// initializing_trust_engine</span>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, demoMode, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;
  if (!user && !demoMode) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

function OnboardingRoute() {
  const { user, demoMode, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user && !demoMode) return <Navigate to="/login" replace />;
  return <Onboarding />;
}

function AppRoutes() {
  const { user, demoMode, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user || demoMode ? <Navigate to="/app" replace /> : <LoginScreen />} />
      <Route path="/onboarding" element={<OnboardingRoute />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/score"
        element={
          <ProtectedRoute>
            <ScorePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/credit"
        element={
          <ProtectedRoute>
            <CreditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/credit/apply"
        element={
          <ProtectedRoute>
            <LoanApplication />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/improve"
        element={
          <ProtectedRoute>
            <ImproveScore />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/repayments"
        element={
          <ProtectedRoute>
            <Repayments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/privacy"
        element={
          <ProtectedRoute>
            <Privacy />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/fairness"
        element={
          <ProtectedRoute>
            <Fairness />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/trust-engine"
        element={
          <ProtectedRoute>
            <TrustEngine />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/lender/applicants"
        element={
          <ProtectedRoute>
            <LenderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/lender/applicants/:id"
        element={
          <ProtectedRoute>
            <LenderApplicantProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
