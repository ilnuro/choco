import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getMain, buy } from './request';

const BASE = 'https://shirokovapp.dfx.li/api/chocoshop';

describe('request — miniapp mode', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({}) }));
  });

  it('getMain sends X-Telegram-Init-Data header, no userId param', async () => {
    await getMain({ mode: 'miniapp', initData: 'test_init_data', userId: undefined });
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      `${BASE}/mainpage`,
      expect.objectContaining({
        headers: expect.objectContaining({ 'X-Telegram-Init-Data': 'test_init_data' }),
      })
    );
    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).not.toContain('userId');
  });

  it('buy sends X-Telegram-Init-Data header, no userId param', async () => {
    await buy({ mode: 'miniapp', initData: 'test_init_data', userId: undefined }, 'item-1');
    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).toContain('itemId=item-1');
    expect(url).not.toContain('userId');
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        headers: expect.objectContaining({ 'X-Telegram-Init-Data': 'test_init_data' }),
      })
    );
  });
});

describe('request — browser mode', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({}) }));
  });

  it('getMain adds ?userId=, no X-Telegram-Init-Data header', async () => {
    await getMain({ mode: 'browser', initData: null, userId: 456 });
    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).toContain('userId=456');
    const [, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect((options.headers as Record<string, string>)['X-Telegram-Init-Data']).toBeUndefined();
  });

  it('buy adds ?userId= and ?itemId=, no header', async () => {
    await buy({ mode: 'browser', initData: null, userId: 456 }, 'item-2');
    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).toContain('userId=456');
    expect(url).toContain('itemId=item-2');
    const [, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect((options.headers as Record<string, string>)['X-Telegram-Init-Data']).toBeUndefined();
  });
});
