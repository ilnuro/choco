import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getMain, buy } from './request';

const BASE = 'https://shirokovapp.dfx.li/api/chocoshop';

// These tests reflect NEW_BACKEND = false (current state).
// When NEW_BACKEND = true: miniapp sends X-Telegram-Init-Data header instead of ?userId=
describe('request — miniapp mode (NEW_BACKEND=false, uses ?userId=)', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({}) }));
  });

  it('getMain adds ?userId= in miniapp mode', async () => {
    await getMain({ mode: 'miniapp', initData: 'test_init_data', userId: 123 });
    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).toContain('userId=123');
    const [, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect((options.headers as Record<string, string>)['X-Telegram-Init-Data']).toBeUndefined();
  });

  it('buy adds ?userId= and ?itemId= in miniapp mode', async () => {
    await buy({ mode: 'miniapp', initData: 'test_init_data', userId: 123 }, 'item-1');
    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).toContain('itemId=item-1');
    expect(url).toContain('userId=123');
    const [, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect((options.headers as Record<string, string>)['X-Telegram-Init-Data']).toBeUndefined();
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
