// src/utils/request.ts
const BASE = 'https://shirokovapp.dfx.li/api/chocoshop';

export interface RequestAuth {
  mode: 'miniapp' | 'browser' | null;
  initData: string | null;
  userId: number | undefined;
}

function buildHeaders(auth: RequestAuth): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (auth.mode === 'miniapp' && auth.initData) {
    headers['X-Telegram-Init-Data'] = auth.initData;
  }
  return headers;
}

export const getMain = (auth: RequestAuth) => {
  const url =
    auth.mode === 'browser' && auth.userId != null
      ? `${BASE}/mainpage?userId=${auth.userId}`
      : `${BASE}/mainpage`;

  return fetch(url, {
    mode: 'cors',
    method: 'GET',
    headers: buildHeaders(auth),
  }).then((res) => res.json());
};

export const buy = (auth: RequestAuth, itemId: string) => {
  const url =
    auth.mode === 'browser' && auth.userId != null
      ? `${BASE}/sale?itemId=${itemId}&userId=${auth.userId}`
      : `${BASE}/sale?itemId=${itemId}`;

  return fetch(url, {
    mode: 'cors',
    method: 'POST',
    headers: buildHeaders(auth),
  }).then((res) => res.json());
};
