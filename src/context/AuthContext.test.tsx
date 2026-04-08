import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    delete (window as any).Telegram;
  });

  it('mode is null before init', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.mode).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('login saves user to localStorage and sets browser mode', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const fakeUser = { id: 123, first_name: 'Ivan', auth_date: Math.floor(Date.now() / 1000) };
    act(() => {
      result.current.login(fakeUser);
    });
    expect(result.current.mode).toBe('browser');
    expect(result.current.user?.id).toBe(123);
    expect(result.current.isAuthenticated).toBe(true);
    const stored = JSON.parse(localStorage.getItem('tg_auth') ?? '{}');
    expect(stored.id).toBe(123);
  });

  it('logout clears localStorage and state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login({ id: 123, first_name: 'Ivan', auth_date: Math.floor(Date.now() / 1000) });
    });
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('tg_auth')).toBeNull();
  });

  it('restores session from localStorage if not expired', () => {
    const freshAuthDate = Math.floor(Date.now() / 1000) - 60;
    localStorage.setItem('tg_auth', JSON.stringify({ id: 456, first_name: 'Anna', auth_date: freshAuthDate }));
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.id).toBe(456);
    expect(result.current.mode).toBe('browser');
  });

  it('does not restore expired localStorage session (> 7 days)', () => {
    const oldAuthDate = Math.floor(Date.now() / 1000) - 8 * 24 * 3600;
    localStorage.setItem('tg_auth', JSON.stringify({ id: 789, first_name: 'Old', auth_date: oldAuthDate }));
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('tg_auth')).toBeNull();
  });
});
