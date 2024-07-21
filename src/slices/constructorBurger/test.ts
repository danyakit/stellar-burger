import { expect, test, describe } from '@jest/globals';
import { testIngredients } from '../ingredients/mock';
import constructorBurgerReducer, {
  initialState,
  setBun,
  removeIngredient,
  upIngredient,
  orderBurger,
  addIngredient
} from '.';
import { testConstructorBurger, testOrder, testOrderResponse } from './mock';

describe('[constructor] - редактирование', () => {
  test('обработка экшена установки булки', () => {
    const beginState = Object.assign({}, initialState);
    const newState = constructorBurgerReducer(
      beginState,
      setBun(testIngredients[0])
    );
    const { bun } = newState;
    expect(bun).toEqual(testIngredients[0]);
  });

  test('обработка экшена добавления и удаления инградиента', () => {
    const beginState = Object.assign({}, initialState);
    const newState = constructorBurgerReducer(
      beginState,
      addIngredient(testIngredients[1])
    );
    const { ingredients } = newState;
    expect(ingredients.length).toBe(1);
    expect(ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0941');
    const newStateForDel = constructorBurgerReducer(
      newState,
      removeIngredient(ingredients[0].id)
    );
    expect(newStateForDel.ingredients.length).toBe(0);
  });

  test('обработка экшена изменения порядка ингредиентов в начинке;', () => {
    const beginState = Object.assign({}, initialState);
    let newState = constructorBurgerReducer(
      beginState,
      addIngredient(testIngredients[1])
    );
    newState = constructorBurgerReducer(
      newState,
      addIngredient(testIngredients[2])
    );
    newState = constructorBurgerReducer(
      newState,
      addIngredient(testIngredients[3])
    );
    expect(newState.ingredients.length).toBe(3);
    const newStateForOrder = constructorBurgerReducer(
      newState,
      upIngredient(newState.ingredients[1].id)
    );
    expect(newStateForOrder.ingredients[0]._id).toEqual(testIngredients[2]._id);
    expect(newStateForOrder.ingredients[1]._id).toEqual(testIngredients[1]._id);
    expect(newStateForOrder.ingredients[2]._id).toEqual(testIngredients[3]._id);
  });
});

describe('[constructor] - отправка заказа', () => {
  test('Вызов редьюсера orderBurger - отображение процесса загрузки', () => {
    const currentState = constructorBurgerReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      orderBurger.pending('', testConstructorBurger)
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера orderBurger - завершение загрузки и сохранение данных', () => {
    const currentState = constructorBurgerReducer(
      { ...initialState, isLoading: true },
      orderBurger.fulfilled(testOrder, '', testConstructorBurger)
    );
    expect(currentState).toEqual(testOrderResponse);
  });

  test('Вызов редьюсера orderBurger - обработка ошибки', () => {
    const errorText = 'Ошибка';
    const currentState = constructorBurgerReducer(
      { ...initialState, isLoading: true },
      orderBurger.rejected(
        new Error(errorText),
        '',
        testOrder.order.ingredients
      )
    );
    expect(currentState).toEqual({
      ...initialState,
      error: errorText,
      isLoading: false
    });
  });
});
