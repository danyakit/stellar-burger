import { expect, test, describe } from '@jest/globals';
import {
  testLogin,
  testUpdate,
  testGet,
  login,
  errorText,
  errorOldText,
  register,
  update
} from './mock';
import userSliceReducer, {
  loginUser,
  registerUser,
  updateUser,
  getUser,
  initialState
} from '.';

describe('[loginUser] ', () => {
  test('Вызов редьюсера loginUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, loginError: errorOldText },
      loginUser.pending('', login)
    );
    expect(currentState).toEqual({
      ...initialState,
      loginError: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера loginUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      loginUser.fulfilled(testLogin, '', login)
    );
    expect(currentState).toEqual({
      user: testLogin.user,
      isLoading: false,
      loginError: '',
      otherError: ''
    });
  });

  test('Вызов редьюсера loginUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      loginUser.rejected(new Error(errorText), '', login)
    );
    expect(currentState).toEqual({
      loginError: errorText,
      isLoading: false,
      otherError: '',
      user: null
    });
  });
});

describe('[registerUser] ', () => {
  test('Вызов редьюсера registerUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, otherError: errorOldText },
      registerUser.pending('', register)
    );
    expect(currentState).toEqual({
      ...initialState,
      otherError: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера registerUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      registerUser.fulfilled(testLogin, '', register)
    );
    expect(currentState).toEqual({
      user: testLogin.user,
      isLoading: false,
      loginError: '',
      otherError: ''
    });
  });

  test('Вызов редьюсера registerUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      registerUser.rejected(new Error(errorText), '', register)
    );
    expect(currentState).toEqual({
      otherError: errorText,
      isLoading: false,
      user: null,
      loginError: ''
    });
  });
});

describe('[updateUser] ', () => {
  test('Вызов редьюсера updateUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, otherError: errorOldText },
      updateUser.pending('', update)
    );
    expect(currentState).toEqual({
      ...initialState,
      otherError: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера updateUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      updateUser.fulfilled(testUpdate, '', update)
    );
    expect(currentState).toEqual({
      user: testUpdate.user,
      isLoading: false,
      loginError: '',
      otherError: ''
    });
  });

  test('Вызов редьюсера updateUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      updateUser.rejected(new Error(errorText), '', update)
    );
    expect(currentState).toEqual({
      otherError: errorText,
      isLoading: false,
      user: initialState.user,
      loginError: ''
    });
  });
});

describe('[getUser] ', () => {
  test('Вызов редьюсера getUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, otherError: errorOldText },
      getUser.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      otherError: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера getUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      getUser.fulfilled(testGet, '')
    );
    expect(currentState).toEqual({
      user: testGet.user,
      isLoading: false,
      loginError: '',
      otherError: ''
    });
  });

  test('Вызов редьюсера getUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      getUser.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      otherError: errorText,
      isLoading: false,
      user: initialState.user,
      loginError: ''
    });
  });
});
