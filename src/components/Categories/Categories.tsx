import { Group, Button } from '@mantine/core';

export function Categories(props: { groups: string[]; selectedGroup?: string; selectGroup: (g: string | undefined) => void }) {
  return (
    <Group gap={4} pb="sm">
      {props.groups.map(group =>
        <Button
          size="compact-xs"
          radius="xl"
          variant={props.selectedGroup ? props.selectedGroup === group ? 'filled' : 'default' : 'filled'}
          onClick={() => props.selectGroup(props.selectedGroup === group ? undefined : group)}>
            {group}
        </Button>
      )}
    </Group>
  );
}
