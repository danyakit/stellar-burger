import { expect, test, describe } from '@jest/globals';
import { store } from '../../services/store';
import { testIngredients } from './mock';
import ingredientReducer, {
  fetchIngredients,
  initialState,
  getBuns,
  getMains,
  getSauces
} from '.';

describe('[fetchIngredients] загрузка инградиентов ', () => {
  test('Вызов редьюсера fetchIngredients - отображение процесса загрузки', () => {
    const currentState = ingredientReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      fetchIngredients.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера fetchIngredients - завершение загрузки и сохранение данных', () => {
    const currentState = ingredientReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.fulfilled(testIngredients, '')
    );
    let compareState = { ...initialState };
    compareState.ingredients = testIngredients;
    compareState.buns = getBuns(testIngredients);
    compareState.mains = getMains(testIngredients);
    compareState.sauces = getSauces(testIngredients);
    expect(currentState).toEqual({
      ...compareState,
      error: '',
      isLoading: false
    });
  });

  test('Вызов редьюсера fetchIngredients - обработка ошибки', () => {
    const errorText = 'Ошибка';
    const currentState = ingredientReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      ...initialState,
      error: errorText,
      isLoading: false
    });
  });
});
