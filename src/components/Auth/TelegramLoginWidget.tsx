import { useEffect, useRef } from 'react';
import { TelegramUser } from '@/context/AuthContext';

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
  }
}

interface Props {
  onAuth: (user: TelegramUser) => void;
  botName?: string;
}

export function TelegramLoginWidget({ onAuth, botName = 'NewChocoBot' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onTelegramAuth = onAuth;

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    containerRef.current?.appendChild(script);

    return () => {
      delete (window as any).onTelegramAuth;
      script.remove();
    };
  }, [onAuth, botName]);

  return <div data-testid="tg-widget-container" ref={containerRef} />;
}
