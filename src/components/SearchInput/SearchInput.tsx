import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export function SearchInput(props: { filterItems: (searchString: string) => void; value: string; setValue: (v: string) => void }) {
  return <Input
    flex={1}
    radius="xl"
    placeholder="Поиск по товарам"
    leftSection={<IconSearch size={16} />}
    value={props.value}
    onChange={e => {
      props.setValue(e.target.value);
      props.filterItems(e.target.value);
    }}
  />;
}
