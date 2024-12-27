import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export function Blocked() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="red" title="Ошибка" icon={icon}>
      Ваш пользователь заблокирован. Обратитесь куда надо.
    </Alert>
  );
}
