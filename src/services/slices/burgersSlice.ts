import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TConstructorIngredient,
  TBurgerConstructor,
  TOrder
} from '../../utils/types';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi,
  getIngredientsApi,
  getFeedsApi
} from '../../utils/burger-api';
import { v4 as randomId } from 'uuid';
import {
  Loadings,
  activateLoadingType,
  deactivateLoadingType
} from '../../utils/checkLoading';

interface BurgerState {
  ingredients: TIngredient[]; // инградинеты
  buns: TIngredient[]; // булочки
  mains: TIngredient[]; // основа
  sauces: TIngredient[]; // соусы
  feeds: TOrder[]; // общие заказы
  orders: TOrder[]; // заказы текущего клиента
  burgerConstructor: TBurgerConstructor; // состояние текущее конструкутора бургера
  isLoading: Loadings; // процесс загрузки
  currentOrder: TOrder | null; // текущий заказ для отображения
}

const initialState: BurgerState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  feeds: [],
  orders: [],
  burgerConstructor: {
    bun: null,
    ingredients: [],
    orderModalData: null
  },
  isLoading: null,
  currentOrder: null
};

export const fetchIngredients = createAsyncThunk(
  'fetchIngredients',
  getIngredientsApi
);
export const fetchFeeds = createAsyncThunk('fetchFeeds', getFeedsApi);
export const orderBurger = createAsyncThunk('orderBurger', orderBurgerApi);
export const fetchOrders = createAsyncThunk('fetchOrders', getOrdersApi);
export const getOrder = createAsyncThunk('getOrder', getOrderByNumberApi);

const burgerSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.burgerConstructor.bun = action.payload;
    },

    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      if (!action.payload) {
        state.burgerConstructor.ingredients = [];
        state.burgerConstructor.bun = null;
      }
      state.burgerConstructor.orderModalData = action.payload;
    },

    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.burgerConstructor.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: randomId() }
      })
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (el) => el.id != action.payload
        );
    },

    upIngredient: (state, action: PayloadAction<string>) => {
      for (let i = 1; i < state.burgerConstructor.ingredients.length; i++)
        if (state.burgerConstructor.ingredients[i].id === action.payload) {
          const temp = state.burgerConstructor.ingredients[i - 1];
          state.burgerConstructor.ingredients[i - 1] =
            state.burgerConstructor.ingredients[i];
          state.burgerConstructor.ingredients[i] = temp;
          break;
        }
    },

    downIngredient: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.burgerConstructor.ingredients.length - 1; i++)
        if (state.burgerConstructor.ingredients[i].id === action.payload) {
          const temp = state.burgerConstructor.ingredients[i + 1];
          state.burgerConstructor.ingredients[i + 1] =
            state.burgerConstructor.ingredients[i];
          state.burgerConstructor.ingredients[i] = temp;
          break;
        }
    }
  },
  selectors: {
    selectIngrediens: (sliceState) => sliceState.ingredients, // инградиенты
    selectBuns: (sliceState) => sliceState.buns, // булочки
    selectMain: (sliceState) => sliceState.mains, // основы
    selectSauce: (sliceState) => sliceState.sauces, // соусы
    selectburgerConstructor: (sliceState) => sliceState.burgerConstructor, // конструктор
    selectFeeds: (sliceState) => sliceState.feeds, // заказы общие
    selectOrders: (sliceState) => sliceState.orders, // заказы пользователя
    selectIsDataLoading: (sliceState) => sliceState.isLoading, // процесс згрузки
    selectOrderModalData: (sliceState) =>
      sliceState.burgerConstructor.orderModalData, // состояние заказа после заказа
    selectCurrentOrder: (sliceState) => sliceState.currentOrder // выбранный заказ
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = activateLoadingType(
          state.isLoading,
          'fetchIngredients'
        );
      })
      .addCase(fetchIngredients.rejected, (state, _) => {
        state.isLoading = deactivateLoadingType(
          state.isLoading,
          'fetchIngredients'
        );
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = deactivateLoadingType(
          state.isLoading,
          'fetchIngredients'
        );
        state.ingredients = action.payload;
        state.buns = state.ingredients.filter((el) => el.type === 'bun');
        state.mains = state.ingredients.filter((el) => el.type === 'main');
        state.sauces = state.ingredients.filter((el) => el.type === 'sauce');
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = activateLoadingType(state.isLoading, 'fetchFeeds');
      })
      .addCase(fetchFeeds.rejected, (state, _) => {
        state.isLoading = deactivateLoadingType(state.isLoading, 'fetchFeeds');
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = deactivateLoadingType(state.isLoading, 'fetchFeeds');
        state.feeds = action.payload.orders;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = activateLoadingType(state.isLoading, 'fetchOrders');
      })
      .addCase(fetchOrders.rejected, (state, _) => {
        state.isLoading = deactivateLoadingType(state.isLoading, 'fetchOrders');
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = deactivateLoadingType(state.isLoading, 'fetchOrders');
        state.orders = action.payload;
      })
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = activateLoadingType(state.isLoading, 'orderBurger');
      })
      .addCase(orderBurger.rejected, (state, _) => {
        state.isLoading = deactivateLoadingType(state.isLoading, 'orderBurger');
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = deactivateLoadingType(state.isLoading, 'orderBurger');
        state.burgerConstructor.orderModalData = action.payload.order;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = activateLoadingType(state.isLoading, 'fetchOrder');
        state.currentOrder = null;
      })
      .addCase(getOrder.rejected, (state, _) => {
        state.isLoading = deactivateLoadingType(state.isLoading, 'fetchOrder');
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = deactivateLoadingType(state.isLoading, 'fetchOrder');
        state.currentOrder = action.payload.orders[0];
      });
  }
});

export const {
  selectOrderModalData,
  selectIsDataLoading,
  selectOrders,
  selectIngrediens,
  selectBuns,
  selectFeeds,
  selectMain,
  selectSauce,
  selectCurrentOrder,
  selectburgerConstructor
} = burgerSlice.selectors;
export const {
  setOrderModalData,
  setBun,
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient
} = burgerSlice.actions;
export default burgerSlice.reducer;
