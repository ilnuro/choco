import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { User } from './User';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('User component', () => {
  it('does NOT show logout button in miniapp mode', () => {
    render(<User user={{}} balance={100} mode="miniapp" onLogout={vi.fn()} />, { wrapper });
    expect(screen.queryByRole('button', { name: /выйти/i })).not.toBeInTheDocument();
  });

  it('shows logout button in browser mode', () => {
    render(<User user={{}} balance={100} mode="browser" onLogout={vi.fn()} />, { wrapper });
    expect(screen.getByRole('button', { name: /выйти/i })).toBeInTheDocument();
  });

  it('calls onLogout when logout button clicked', async () => {
    const onLogout = vi.fn();
    render(<User user={{}} balance={100} mode="browser" onLogout={onLogout} />, { wrapper });
    await userEvent.click(screen.getByRole('button', { name: /выйти/i }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
