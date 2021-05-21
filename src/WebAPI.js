import { getAuthToken, getOrderCode } from './utils';

const ORDERS_API = 'http://localhost:3310/orders';
const LOGIN_API = 'http://localhost:3310/login';
const GET_ME_API = 'http://localhost:3310/me';

export const getOrders = () => {
  return fetch(ORDERS_API).then((res) => {
    return res.json();
  });
};

export const postOrders = (order) => {
  const token = getAuthToken();
  return fetch(ORDERS_API, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: order.product_name,
      logo: order.logo_url,
      status: order.order_status,
      status_code: getOrderCode(order.order_status),
    }),
  }).then((response) => {
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
