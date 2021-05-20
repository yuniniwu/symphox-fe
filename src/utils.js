const TOKEN_NAME = 'token';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const getOrderCode = (orderType) => {
  let orderCode;

  switch (orderType) {
    case '已取消':
      orderCode = 3;
      break;
    case '已成立':
      orderCode = 2;
      break;
    case '處理中':
      orderCode = 1;
      break;
    case '已送達':
      orderCode = 4;
      break;

    default:
      orderCode = '';
      break;
  }

  return orderCode;
};
