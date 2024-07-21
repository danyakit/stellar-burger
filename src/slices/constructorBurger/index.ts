import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';

import {
  TIngredient,
  TOrder,
  TConstructorIngredient,
  TBurgerConstructor
} from '../../utils/types';
import { v4 as randomId } from 'uuid';

// начальное состояние слайса
export const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: [],
  orderModalData: null,
  isLoading: false,
  error: ''
};

export const orderBurger = createAsyncThunk('orderBurger', orderBurgerApi);

/**
 * Слайс дла работы с конструктором бургера
 */
const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // выбрать булочку
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    // установить/сбросить данные для модального окна вывода результата заказа сделанного
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      if (!action.payload) {
        state.ingredients = [];
        state.bun = null;
      }
      state.orderModalData = action.payload;
    },
    // добавить инградиент в бургер
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: randomId() }
      })
    },
    // удалить инградиент с бургера
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (el) => el.id != action.payload
      );
    },
    // поднять инградиент вверх по порядку
    upIngredient: (state, action: PayloadAction<string>) => {
      for (let i = 1; i < state.ingredients.length; i++)
        if (state.ingredients[i].id === action.payload) {
          const temp = state.ingredients[i - 1];
          state.ingredients[i - 1] = state.ingredients[i];
          state.ingredients[i] = temp;
          break;
        }
    },
    // опустить инградиент вниз по порядку
    downIngredient: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.ingredients.length - 1; i++)
        if (state.ingredients[i].id === action.payload) {
          const temp = state.ingredients[i + 1];
          state.ingredients[i + 1] = state.ingredients[i];
          state.ingredients[i] = temp;
          break;
        }
    }
  },
  selectors: {
    selectburgerConstructor: (sliceState) => sliceState, // конструктор
    selectOrderModalData: (sliceState) => sliceState.orderModalData, // конструктор
    selectIsLoading: (sliceState) => sliceState.isLoading // конструктор
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const {
  selectburgerConstructor,
  selectIsLoading,
  selectOrderModalData
} = constructorSlice.selectors;
export const {
  setBun,
  setOrderModalData,
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient
} = constructorSlice.actions;
export default constructorSlice.reducer;
