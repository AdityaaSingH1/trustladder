import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import {
  clearApiTokens,
  djangoApiEnabled,
  getCurrentUser,
  resetPasswordWithApi,
  signInWithApi,
  signOutFromApi,
  signUpWithApi,
  type ApiUser,
} from '@/lib/api';
import { DEFAULT_PERSONA, PERSONAS } from '@/lib/data';
import type { DemoPersona, Role } from '@/types';

interface AuthState {
  session: Session | null;
  user: User | ApiUser | null;
  loading: boolean;
  role: Role;
  persona: DemoPersona;
  isNewUser: boolean;
  demoMode: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  setRole: (r: Role) => void;
  setPersona: (id: string) => void;
  enterDemo: (personaId: string) => void;
  exitDemo: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRoleState] = useState<Role>('borrower');
  const [persona, setPersonaState] = useState<DemoPersona>(DEFAULT_PERSONA);
  const [isNewUser, setIsNewUser] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (djangoApiEnabled) {
      getCurrentUser()
        .then((apiUser) => {
          if (mounted) setUser(apiUser);
        })
        .catch(() => clearApiTokens())
        .finally(() => {
          if (mounted) setLoading(false);
        });
      return () => {
        mounted = false;
      };
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      role,
      persona,
      isNewUser,
      demoMode,
      async signIn(email, password) {
        if (djangoApiEnabled) {
          try {
            const apiUser = await signInWithApi(email, password);
            setUser(apiUser);
            setIsNewUser(false);
            return { error: null };
          } catch (error) {
            return { error: friendlyAuthError(error instanceof Error ? error.message : '') };
          }
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: friendlyAuthError(error.message) };
        setIsNewUser(false);
        return { error: null };
      },
      async signUp(email, password) {
        if (djangoApiEnabled) {
          try {
            const apiUser = await signUpWithApi(email, password);
            setUser(apiUser);
            setIsNewUser(true);
            return { error: null };
          } catch (error) {
            return { error: friendlyAuthError(error instanceof Error ? error.message : '') };
          }
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) return { error: friendlyAuthError(error.message) };
        setIsNewUser(true);
        return { error: null };
      },
      async signInWithGoogle() {
        if (djangoApiEnabled) {
          window.location.assign(`${import.meta.env.VITE_API_URL}/api/auth/google/`);
          return;
        }
        await supabase.auth.signInWithOAuth({ provider: 'google' });
      },
      async resetPassword(email) {
        if (djangoApiEnabled) {
          try {
            await resetPasswordWithApi(email);
            return { error: null };
          } catch (error) {
            return { error: friendlyAuthError(error instanceof Error ? error.message : '') };
          }
        }
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) return { error: friendlyAuthError(error.message) };
        return { error: null };
      },
      async signOut() {
        setDemoMode(false);
        setRoleState('borrower');
        setPersonaState(DEFAULT_PERSONA);
        if (djangoApiEnabled) {
          await signOutFromApi();
          setUser(null);
          setSession(null);
          return;
        }
        await supabase.auth.signOut();
      },
      setRole(r) {
        setRoleState(r);
      },
      setPersona(id) {
        const p = PERSONAS.find((x) => x.id === id);
        if (p) setPersonaState(p);
      },
      enterDemo(personaId) {
        const p = PERSONAS.find((x) => x.id === personaId) ?? DEFAULT_PERSONA;
        setPersonaState(p);
        setDemoMode(true);
        setIsNewUser(false);
        setRoleState('borrower');
      },
      exitDemo() {
        setDemoMode(false);
        setPersonaState(DEFAULT_PERSONA);
      },
      completeOnboarding() {
        setIsNewUser(false);
      },
    }),
    [session, user, loading, role, persona, isNewUser, demoMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function friendlyAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'That email and password did not match. Try again.';
  if (msg.includes('User already registered')) return 'An account with this email already exists. Try signing in.';
  if (msg.includes('Email not confirmed')) return 'Check your inbox for a confirmation link before signing in.';
  return 'Something went wrong. Please try again.';
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
