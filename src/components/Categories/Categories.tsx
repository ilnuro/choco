import { Group, Button } from '@mantine/core';

export function Categories() {
  return (
    <Group gap={4} pb="sm">
      <Button size="compact-xs" radius="xl" variant="filled">Батончики</Button>
      <Button size="compact-xs" radius="xl" variant="filled">Напитки</Button>
      <Button size="compact-xs" radius="xl" variant="filled">Мороженое</Button>
      <Button size="compact-xs" radius="xl" variant="filled">Снеки</Button>
      <Button size="compact-xs" radius="xl" variant="filled">Остальное</Button>
    </Group>
  );
}
