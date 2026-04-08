const BASE = 'https://shirokovapp.dfx.li/api/chocoshop';

export interface RequestAuth {
  mode: 'miniapp' | 'browser' | null;
  initData: string | null;
  userId: number | undefined;
}

// TODO: set to true once backend deploys TelegramAuthMiddleware (see backend-changes.md)
// When true: miniapp sends X-Telegram-Init-Data header instead of ?userId=
const NEW_BACKEND = false;

function buildHeaders(auth: RequestAuth): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (NEW_BACKEND && auth.mode === 'miniapp' && auth.initData) {
    headers['X-Telegram-Init-Data'] = auth.initData;
  }
  return headers;
}

function useUserId(auth: RequestAuth): boolean {
  return auth.userId != null && (!NEW_BACKEND || auth.mode === 'browser');
}

export const getMain = (auth: RequestAuth) => {
  const url = useUserId(auth)
    ? `${BASE}/mainpage?userId=${auth.userId}`
    : `${BASE}/mainpage`;

  return fetch(url, {
    mode: 'cors',
    method: 'GET',
    headers: buildHeaders(auth),
  }).then((res) => res.json());
};

export const buy = (auth: RequestAuth, itemId: string) => {
  const url = useUserId(auth)
    ? `${BASE}/sale?itemId=${itemId}&userId=${auth.userId}`
    : `${BASE}/sale?itemId=${itemId}`;

  return fetch(url, {
    mode: 'cors',
    method: 'POST',
    headers: buildHeaders(auth),
  }).then((res) => res.json());
};
