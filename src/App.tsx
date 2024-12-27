import '@mantine/core/styles.css';
import './styles/override.css';
import { MantineProvider, Container } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container py="sm">
        <Router />
      </Container>
    </MantineProvider>
  );
}
