import { getAuthToken } from './utils';

const GET_ORDERS_API =
  'https://c7da2a10-6af5-4016-9789-2ef6a699796e.mock.pstmn.io/getOrders';

const LOGIN_API =
  'https://c7da2a10-6af5-4016-9789-2ef6a699796e.mock.pstmn.io/login';

const GET_ME_API =
  'https://c7da2a10-6af5-4016-9789-2ef6a699796e.mock.pstmn.io/me';

export const getOrders = () => {
  return fetch(GET_ORDERS_API).then((response) => {
    return response.json();
  });
};

export const login = (username, password) => {
  return fetch(LOGIN_API, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(GET_ME_API, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
