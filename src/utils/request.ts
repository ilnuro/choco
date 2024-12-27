const buy = (itemId: string, userId: number) =>
    fetch(`https://shirokovapp.dfx.li/api/chocoshop/sale?userId=${userId}&itemId=${itemId}`, { mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
        .then(res => res.json());

const getMain = (userId: number) =>
    fetch(`https://shirokovapp.dfx.li/api/chocoshop/mainpage?userId=${userId}`, { mode: 'cors', method: 'GET', headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
        .then(res => res.json());

export { getMain, buy };
