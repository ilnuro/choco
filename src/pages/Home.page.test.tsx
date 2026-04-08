import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { HomePage } from './Home.page';

vi.mock('@/utils/request', () => ({
  getMain: vi.fn().mockResolvedValue({
    balance: 1000,
    items: [],
    blocked: false,
  }),
  buy: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>
    <MemoryRouter>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  </MantineProvider>
);

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
    delete (window as any).Telegram;
  });

  it('shows LoginPage when not authenticated (no Telegram, no localStorage)', () => {
    render(<HomePage />, { wrapper });
    expect(screen.getByText(/войдите через telegram/i)).toBeInTheDocument();
  });

  it('shows catalog after browser auth (saved in localStorage)', async () => {
    const freshAuthDate = Math.floor(Date.now() / 1000) - 60;
    localStorage.setItem(
      'tg_auth',
      JSON.stringify({ id: 42, first_name: 'Test', auth_date: freshAuthDate })
    );
    render(<HomePage />, { wrapper });
    await waitFor(() => {
      expect(screen.queryByText(/войдите через telegram/i)).not.toBeInTheDocument();
    });
  });
});
