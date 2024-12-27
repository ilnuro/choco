// import { Welcome } from '../components/Welcome/Welcome';
import { AppShell, ScrollArea, Container } from '@mantine/core';
import { SearchInput } from '../components/SearchInput/SearchInput';
import { Categories } from '../components/Categories/Categories';
import { Products } from '../components/Products/Products';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export function HomePage() {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
      <AppShell.Header>
        <Container py="sm">
          <SearchInput />
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Categories />
        <Products />
      </AppShell.Main>
      <AppShell.Footer>Footer</AppShell.Footer>
    </AppShell>
  );
  return (
    <>

      {/* <ColorSchemeToggle /> */}
    </>
  );
}
