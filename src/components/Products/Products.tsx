import { Card, Image, Text, Flex, Grid, Button, LoadingOverlay } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';
import { buy } from '@/utils/request';

function ProductCard(props: {
    refreshData: (id?: number) => void;
    setNotification: (notification: string | undefined) => void;
    id: string;
    imageUrl: string;
    name: string;
    cost: number;
    count: number;
    userId?: number
  }) {
  const [loading, setLoading] = useState(false);
  const buyItem = () => {
    setLoading(true);
    buy(props.id, props.userId!).then(() => {
      props.refreshData();
      props.setNotification(`Вы успешно купили ${props.name}`);
      setLoading(false);
      setTimeout(() => {
        props.setNotification(undefined);
      }, 1500);
    });
  };

  return (
    <Card shadow="none" padding="xs" radius="md" withBorder h="100%">
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Card.Section>
        <Image
          src={props.imageUrl}
          h={100}
          fit="contain"
          alt={props.name}
          p={15}
        />
      </Card.Section>

      <Text fz="12px" lh={1} pb={20} flex={1}>{props.name}</Text>
      <Flex justify="space-between">
        <div>
          <Text fw={500}>
            {Number(props.cost).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
          </Text>
          <Text fz="12px" lh={1} flex={1}>{props.count} шт.</Text>
        </div>
        <Button size="compact-sm" leftSection={<IconShoppingCart size={14} stroke={2} />} onClick={buyItem}>
          Купить
        </Button>
      </Flex>
    </Card>
  );
}

export function Products(props: {
    items: {
      [key: string]: Array<{
        cost: number; count: number; group: string; id: string; img: string; name: string
      }>
    }
    userId?: number;
    refreshData: (id?: number) => void;
    setNotification: (notification: string | undefined) => void;
  }) {
  return (
    <Grid>
      {Object.entries(props.items).map(([group, items]) => (
        <>
          <Grid.Col span={12}><Text>{group}</Text></Grid.Col>
          {items.map(item => (
            <Grid.Col span={6}>
              <ProductCard
                id={item.id}
                imageUrl={item.img}
                name={item.name}
                cost={item.cost}
                count={item.count}
                userId={props.userId}
                setNotification={props.setNotification}
                refreshData={props.refreshData}
              />
            </Grid.Col>
          ))}
        </>
      ))}
    </Grid>
  );
}
