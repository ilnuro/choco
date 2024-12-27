import { Card, Image, Text, Flex, Grid, ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

function ProductCard(props: { imageUrl: string, name: string, price: number }) {
  return (
    <Card shadow="none" padding="xs" radius="md" withBorder h="100%">
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
        <Text fw={500}>{Number(props.price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Text>
        <ActionIcon variant="filled" size="sm" radius="lg">
          <IconPlus stroke={3} />
        </ActionIcon>
      </Flex>
    </Card>
  );
}

export function Products() {
  return (
    <Grid>
      <Grid.Col span={6}>
        <ProductCard
          imageUrl="https://cdn.lentochka.lenta.com/resample/webp/250x250/photo/73103/9b384fa7-77c3-4f82-b3be-8aab1ca95f41.png"
          name="Батончик TWIX Xtra с карамелью и печеньем, 82г"
          price={77.11}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <ProductCard
          imageUrl="https://cdn.lentochka.lenta.com/resample/webp/250x250/photo/580825/5e39ebf3-b80f-4288-ae4d-b5631a36cf81.png"
          name="Шоколадные батончики SNICKERS Super с карамелью, арахисом и нугой, 80г"
          price={59.99}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <ProductCard
          imageUrl="https://cdn.lentochka.lenta.com/resample/webp/250x250/photo/72202/3339695ad286a637.png"
          name="Вафли KINDER Bueno в молочном шоколаде, 43г"
          price={89.48}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <ProductCard
          imageUrl="https://cdn.lentochka.lenta.com/resample/webp/250x250/photo/282741/a67d7cef-b180-49b5-8a33-3ab0d76cb122.png"
          name="Пирожное бисквитное KINDER Молочный ломтик с молочной начинкой, 28г"
          price={55.99}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <ProductCard
          imageUrl="https://cdn.lentochka.lenta.com/resample/webp/250x250/photo/369170/dd202b3a-a80b-4cdc-baee-0751d1ffeb95.png"
          name="Напиток LIPTON Холодный зеленый чай негазированный, 0.5л"
          price={79.99}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <ProductCard
          imageUrl="https://cdn.lentochka.lenta.com/resample/webp/250x250/photo/658606/0d5c3f46-d864-4c23-82bd-00a688a66275.png"
          name="Напиток ДОБРЫЙ Апельсин сильногазированный, 0.33л"
          price={64.99}
        />
      </Grid.Col>
    </Grid>
  );
}
