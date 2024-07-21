import { expect, test, describe } from '@jest/globals';
import { testFeeds } from './mock';
import feedsSliceReducer, { fetchFeeds, initialState } from '.';

describe('[fetchFeeds] загрузка ленты заказов ', () => {
  test('Вызов редьюсера fetchFeeds - отображение процесса загрузки', () => {
    const currentState = feedsSliceReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      fetchFeeds.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера fetchFeeds - завершение загрузки и сохранение данных', () => {
    const currentState = feedsSliceReducer(
      { ...initialState, isLoading: true },
      fetchFeeds.fulfilled(testFeeds, '')
    );
    expect(currentState).toEqual({
      feeds: testFeeds.orders,
      error: '',
      isLoading: false
    });
  });

  test('Вызов редьюсера fetchFeeds - обработка ошибки', async () => {
    const errorText = 'Ошибка';
    const currentState = feedsSliceReducer(
      { ...initialState, isLoading: true },
      fetchFeeds.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      feeds: initialState.feeds,
      error: errorText,
      isLoading: false
    });
  });
});
