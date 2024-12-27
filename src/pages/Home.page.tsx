import { AppShell, Container, LoadingOverlay, Flex, Notification } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { useEffect, useState } from 'react';
import { SearchInput } from '../components/SearchInput/SearchInput';
import { User } from '../components/User/User';
import { Categories } from '../components/Categories/Categories';
import { Products } from '../components/Products/Products';
import { getMain } from '@/utils/request';
import { Blocked } from '@/components/Blocked/Blocked';

declare global {
  interface Window {
    Telegram:any;
  }
}

export function HomePage() {
  const [loading, setLoading] = useState(true);
  const [tgUser, setTgUser] = useState<{ id?: number; photo_url?: string }>({});
  const [balance, setBalance] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);
  const [allItems, setAllItems] = useState<{ [x: string]: {}[] }>({});
  const [items, setItems] = useState({});
  const [notification, setNotification] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>();

  const filterItems = (searchString: string) => {
    if (searchString.length === 0) {
      const byGroup = selectedGroup ? { [selectedGroup]: allItems[selectedGroup] } : allItems;
      setItems(byGroup);
    } else {
      const filtered: { [x: string]: {}[] } = {};
      const byGroup = selectedGroup ? { [selectedGroup]: allItems[selectedGroup] } : allItems;

      Object.entries(byGroup).forEach(([group, groupItems]) => {
        const filteredItems = (groupItems as { name: string }[]).filter((item: { name: string }) =>
          matchSorter([item.name], searchString, { threshold: matchSorter.rankings.CONTAINS }).length !== 0
        );
        if (filteredItems.length > 0) filtered[group] = filteredItems;
      });
      setItems(filtered);
    }
  };

  const selectGroup = (group: string | undefined) => {
    setSearchValue('');
    setSelectedGroup(group);
    if (group) {
      setItems({ [group]: allItems[group] });
    } else {
      setItems(allItems);
    }
  };

  const refreshData = (id?: number) => {
    getMain(id || tgUser.id!).then(res => {
      setBalance(res.balance);
      const itemsData = res.items.reduce(
        (acc: { [key: string]: Array<{}> }, item: { group: string }) => {
          if (!acc[item.group]) acc[item.group] = [];
          acc[item.group].push(item);
          return acc;
        }, {} as { [key: string]: Array<{}> }
      );
      setGroups(Object.keys(itemsData));
      setItems(itemsData);
      setAllItems(itemsData);
      setBlocked(res.blocked);
      setLoading(false);
    });
  };

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const params = new URLSearchParams(window.Telegram.WebApp.initData);
    const userData = Object.fromEntries(params);
    const parsedUser = userData.user ? JSON.parse(userData.user) : {};
    setTgUser(parsedUser);
    refreshData(parsedUser.id);
  }, []);

  if (blocked) return <Blocked />;

  return (
    <AppShell header={{ height: 60 }}>
      {notification && <Notification withCloseButton={false} title={notification} style={{ zIndex: 110, position: 'absolute' }} />}
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <AppShell.Header>
        <Container py="sm">
        <Flex
          gap="md"
          direction="row"
          wrap="wrap"
        >
          <SearchInput filterItems={filterItems} value={searchValue} setValue={setSearchValue} />
          <User user={tgUser} balance={balance} />
        </Flex>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Categories groups={groups} selectedGroup={selectedGroup} selectGroup={selectGroup} />
        <Products items={items} userId={tgUser.id} refreshData={refreshData} setNotification={(n: string | undefined) => setNotification(n)} />
      </AppShell.Main>
    </AppShell>
  );
}
