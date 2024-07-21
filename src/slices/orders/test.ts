import { expect, test, describe } from '@jest/globals';
import { testMyOrders } from './mock';
import ordersSliceReducer, { fetchOrders, initialState } from '.';

describe('[fetchOrders] загрузка ленты своих заказов ', () => {
  test('Вызов редьюсера ordersSlice - отображение процесса загрузки', () => {
    const currentState = ordersSliceReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      fetchOrders.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера ordersSlice - завершение загрузки и сохранение данных', () => {
    const currentState = ordersSliceReducer(
      { ...initialState, isLoading: true },
      fetchOrders.fulfilled(testMyOrders, '')
    );
    expect(currentState).toEqual({
      orders: testMyOrders,
      error: '',
      isLoading: false,
      currentOrder: null
    });
  });

  test('Вызов редьюсера ordersSlice - обработка ошибки', async () => {
    const errorText = 'Ошибка';
    const currentState = ordersSliceReducer(
      { ...initialState, isLoading: true },
      fetchOrders.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      orders: initialState.orders,
      error: errorText,
      isLoading: false,
      currentOrder: null
    });
  });
});
