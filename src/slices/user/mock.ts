import { TLoginData, TRegisterData } from '../../utils/burger-api';

export const testLogin = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGVmYjA5OTdlZGUwMDAxZDA2YmU1NyIsImlhdCI6MTcxODMwMDUxNSwiZXhwIjoxNzE4MzAxNzE1fQ.9DEpsrNnjAekthPUWQX1ud2okh5FORNwnzRx-CYZ_ME',
  refreshToken:
    '63051a8187426b0d6855a300dabd0c2d926f970e18a8873bb526b4ddf217c2b74542a622f141a56f',
  user: {
    email: 'korvin@kati.ru',
    name: 'korvin'
  }
};

export const testUpdate = {
  success: true,
  user: {
    email: 'korvin@kati.ru',
    name: 'korvin1'
  }
};

export const testGet = {
  success: true,
  user: {
    email: 'korvin@kati.ru',
    name: 'korvin'
  }
};

const password = 'password';

export const login: TLoginData = {
  email: testLogin.user.email,
  password
};

export const register: TRegisterData = {
  email: testLogin.user.email,
  name: testLogin.user.name,
  password
};

export const update: TRegisterData = {
  email: testLogin.user.email,
  name: testLogin.user.name + '1',
  password
};

export const errorText = 'Ошибка';
export const errorOldText = 'Какая-то ошибка';
