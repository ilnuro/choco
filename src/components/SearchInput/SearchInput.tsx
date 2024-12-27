import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export function SearchInput() {
  return <Input radius="xl" placeholder="Поиск по товарам" leftSection={<IconSearch size={16} />} />;
}
