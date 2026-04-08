import { render } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { TelegramLoginWidget } from './TelegramLoginWidget';

describe('TelegramLoginWidget', () => {
  afterEach(() => {
    delete (window as any).onTelegramAuth;
  });

  it('renders container div', () => {
    render(<TelegramLoginWidget onAuth={vi.fn()} />);
    expect(document.querySelector('[data-testid="tg-widget-container"]')).toBeTruthy();
  });

  it('defines window.onTelegramAuth on mount', () => {
    const onAuth = vi.fn();
    render(<TelegramLoginWidget onAuth={onAuth} />);
    expect(typeof (window as any).onTelegramAuth).toBe('function');
  });

  it('calls onAuth when window.onTelegramAuth is invoked', () => {
    const onAuth = vi.fn();
    render(<TelegramLoginWidget onAuth={onAuth} />);
    const fakeUser = { id: 123, first_name: 'Test', auth_date: 1700000000 };
    (window as any).onTelegramAuth(fakeUser);
    expect(onAuth).toHaveBeenCalledWith(fakeUser);
  });

  it('cleans up window.onTelegramAuth on unmount', () => {
    const onAuth = vi.fn();
    const { unmount } = render(<TelegramLoginWidget onAuth={onAuth} />);
    unmount();
    expect((window as any).onTelegramAuth).toBeUndefined();
  });
});
