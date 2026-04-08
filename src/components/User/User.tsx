import { Avatar, Group, Text, ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { AuthMode } from '@/context/AuthContext';

interface Props {
  balance?: number;
  user: { photo_url?: string };
  mode: AuthMode;
  onLogout?: () => void;
}

export function User({ balance, user, mode, onLogout }: Props) {
  return (
    <Group>
      <Text size="sm">
        {Number(balance).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
      </Text>
      <Avatar src={user.photo_url} alt="user avatar" />
      {mode === 'browser' && onLogout && (
        <Tooltip label="Выйти">
          <ActionIcon variant="subtle" color="gray" onClick={onLogout} aria-label="Выйти">
            <IconLogout size={18} />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
}
