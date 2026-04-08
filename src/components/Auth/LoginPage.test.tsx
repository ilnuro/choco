import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { LoginPage } from './LoginPage';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('LoginPage', () => {
  it('renders heading with shop name', () => {
    render(<LoginPage onAuth={vi.fn()} />, { wrapper });
    expect(screen.getByText(/chocoshop/i)).toBeInTheDocument();
  });

  it('renders TelegramLoginWidget container', () => {
    render(<LoginPage onAuth={vi.fn()} />, { wrapper });
    expect(document.querySelector('[data-testid="tg-widget-container"]')).toBeTruthy();
  });
});
