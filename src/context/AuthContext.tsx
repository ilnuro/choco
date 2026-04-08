import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TelegramWebApp {
  initData: string;
  expand: () => void;
}

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebApp };
  }
}

export type AuthMode = 'miniapp' | 'browser' | null;

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
}

interface AuthState {
  mode: AuthMode;
  user: TelegramUser | null;
  initData: string | null;
  isAuthenticated: boolean;
  login: (user: TelegramUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export const STORAGE_KEY = 'tg_auth';
const SESSION_TTL_SECONDS = 7 * 24 * 3600;

function loadStoredSession(): TelegramUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user: TelegramUser = JSON.parse(raw);
    const age = Math.floor(Date.now() / 1000) - user.auth_date;
    if (age > SESSION_TTL_SECONDS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    const tgInitData = window.Telegram?.WebApp?.initData;

    if (tgInitData) {
      setMode('miniapp');
      setInitData(tgInitData);
      const params = new URLSearchParams(tgInitData);
      const raw = params.get('user');
      if (raw) {
        try {
          setUser(JSON.parse(raw));
        } catch {
          // initData present but user field not parseable — continue without user object
        }
      }
    } else {
      const stored = loadStoredSession();
      if (stored) {
        setMode('browser');
        setUser(stored);
      }
    }
  }, []);

  const login = (newUser: TelegramUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setMode('browser');
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMode(null);
    setUser(null);
    setInitData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        mode,
        user,
        initData,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
