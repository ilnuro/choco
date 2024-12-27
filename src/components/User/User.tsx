import { Avatar, Group, Text } from '@mantine/core';

export function User(props: { balance?: number, user: { photo_url?: string } }) {
    return (
        <Group>
            <Text size="sm">{Number(props.balance).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Text>
            <Avatar src={props.user.photo_url} alt="it's me" />
        </Group>
    );
}
