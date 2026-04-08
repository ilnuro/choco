import '@mantine/core/styles.css';
import './styles/override.css';
import { MantineProvider, Container } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <Container py="sm">
          <Router />
        </Container>
      </AuthProvider>
    </MantineProvider>
  );
}
