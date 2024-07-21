import { expect, test, describe } from '@jest/globals';
import { store, rootReducer } from './store';
import ingredientsSliceReducer, {
  initialState as ingredientsInitialState
} from '../slices/ingredients';
import constructorSliceReducer, {
  initialState as constructorInitialState
} from '../slices/constructorBurger';
import userSliceReducer, {
  initialState as userInitialState
} from '../slices/user';
import feedsSliceReducer, {
  initialState as feedsInitialState
} from '../slices/feeds';
import ordersSliceReducer, {
  initialState as ordersInitialState
} from '../slices/orders';

describe('тесты rootReducer', () => {
  test('проверить корректную инициализацию структуру rootReducer', () => {
    const init = { type: '@@redux/INIT' };
    const state = rootReducer(undefined, init);
    expect(state).toEqual({
      ingredients: ingredientsSliceReducer(undefined, init), // слайс по основным данным
      user: userSliceReducer(undefined, init), // слайс по авторизации и регистрации
      feeds: feedsSliceReducer(undefined, init),
      burgerConstructor: constructorSliceReducer(undefined, init),
      orders: ordersSliceReducer(undefined, init)
    });
  });
  test('проверить корректную инициализацию структуру rootReducer необрабатываемым экшном', () => {
    const init = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, init);
    expect(state).toEqual({
      ingredients: ingredientsSliceReducer(undefined, init), // слайс по основным данным
      user: userSliceReducer(undefined, init), // слайс по авторизации и регистрации
      feeds: feedsSliceReducer(undefined, init),
      burgerConstructor: constructorSliceReducer(undefined, init),
      orders: ordersSliceReducer(undefined, init)
    });
  });
  test('проверить корректную инициализацию rootReducer начальными состояниями', () => {
    expect(store.getState().ingredients).toEqual(ingredientsInitialState);
    expect(store.getState().user).toEqual(userInitialState);
    expect(store.getState().burgerConstructor).toEqual(constructorInitialState);
    expect(store.getState().feeds).toEqual(feedsInitialState);
    expect(store.getState().orders).toEqual(ordersInitialState);
  });
});
