import { getAuthToken, getOrderCode } from './utils';

const LOCAL = 'http://localhost:3310';

const HEROKU = 'https://salty-refuge-24417.herokuapp.com';

const POST_API = `${HEROKU}/api/orders_collection`;
const ORDERS_API = `${HEROKU}/orders`;
const LOGIN_API = `${HEROKU}/login`;
const GET_ME_API = `${HEROKU}/me`;

export const getOrders = () => {
  return fetch(ORDERS_API).then((res) => {
    return res.json();
  });
};

export const postOrders = (orders) => {
  const token = getAuthToken();
  return fetch(POST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orders),
  }).then((res) => {
    res.json();
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
