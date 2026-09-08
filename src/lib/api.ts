export interface ApiUser {
  id: string | number;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

const apiUrl = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '');
const accessKey = 'trustladder_access_token';
const refreshKey = 'trustladder_refresh_token';

export const djangoApiEnabled = Boolean(apiUrl);

function getToken(key: string): string | null {
  return window.localStorage.getItem(key);
}

function saveTokens(tokens: TokenResponse) {
  window.localStorage.setItem(accessKey, tokens.access);
  window.localStorage.setItem(refreshKey, tokens.refresh);
}

export function clearApiTokens() {
  window.localStorage.removeItem(accessKey);
  window.localStorage.removeItem(refreshKey);
}

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  if (!apiUrl) throw new Error('Django API URL is not configured');

  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { detail?: string; [key: string]: unknown } | null;
    throw new Error(body?.detail || Object.values(body ?? {})[0]?.toString() || 'Request failed');
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function getCurrentUser(): Promise<ApiUser> {
  const access = getToken(accessKey);
  if (!access) throw new Error('Not authenticated');
  return request<ApiUser>('/api/auth/me/', {}, access);
}

export async function signInWithApi(email: string, password: string): Promise<ApiUser> {
  const tokens = await request<TokenResponse>('/api/token/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  saveTokens(tokens);
  return getCurrentUser();
}

export async function signUpWithApi(email: string, password: string): Promise<ApiUser> {
  await request('/api/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return signInWithApi(email, password);
}

export async function resetPasswordWithApi(email: string): Promise<void> {
  await request('/api/auth/password-reset/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function signOutFromApi() {
  clearApiTokens();
}
