import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { Products } from './Products';
import { buy } from '@/utils/request';

vi.mock('@/utils/request', () => ({
  buy: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

const auth = { mode: 'browser' as const, initData: null, userId: 42 };

const items = {
  'Молочный': [{ id: 'p1', name: 'Батончик', img: '', cost: 150, count: 5, group: 'Молочный' }],
};

describe('Products — error handling', () => {
  it('shows error notification on buy failure', async () => {
    vi.mocked(buy).mockRejectedValueOnce(new Error('network error'));
    const setNotification = vi.fn();
    render(
      <Products items={items} auth={auth} refreshData={vi.fn()} setNotification={setNotification} />,
      { wrapper }
    );
    await userEvent.click(screen.getByRole('button', { name: /купить/i }));
    await waitFor(() => {
      expect(setNotification).toHaveBeenCalledWith(expect.stringMatching(/ошибка/i));
    });
  });

  it('calls buy with correct auth and itemId', async () => {
    vi.mocked(buy).mockResolvedValueOnce({});
    render(
      <Products items={items} auth={auth} refreshData={vi.fn()} setNotification={vi.fn()} />,
      { wrapper }
    );
    await userEvent.click(screen.getByRole('button', { name: /купить/i }));
    await waitFor(() => {
      expect(buy).toHaveBeenCalledWith(auth, 'p1');
    });
  });
});
