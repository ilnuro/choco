import { Center, Stack, Title, Text } from '@mantine/core';
import { TelegramLoginWidget } from './TelegramLoginWidget';
import { TelegramUser } from '@/context/AuthContext';

interface Props {
  onAuth: (user: TelegramUser) => void;
}

export function LoginPage({ onAuth }: Props) {
  return (
    <Center h="100vh">
      <Stack align="center" gap="lg">
        <Title order={1}>Chocoshop</Title>
        <Text c="dimmed">Войдите через Telegram чтобы продолжить</Text>
        <TelegramLoginWidget onAuth={onAuth} />
      </Stack>
    </Center>
  );
}
