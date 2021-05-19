import { getAuthToken } from './utils';

const URL = 'https://run.mocky.io/v3/c9182a2f-9d9e-48b0-83a8-af9b6b3ca774';

export const getOrders = () => {
  return fetch(URL).then((response) => {
    response.json();
  });
};
