import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi, getOrderByNumberApi } from '../../utils/burger-api';

export interface OrdersState {
  orders: TOrder[]; // заказы текущего клиента
  isLoading: boolean; // процесс загрузки
  currentOrder: TOrder | null; // текущий заказ для отображения
  error: string;
}

// начальное состояние слайса
export const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  currentOrder: null,
  error: ''
};

export const fetchOrders = createAsyncThunk('fetchOrders', getOrdersApi);
export const getOrder = createAsyncThunk('getOrder', getOrderByNumberApi);

/**
 * Слайс дла работы с заказами текущего пользователя
 */
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState) => sliceState.orders, // заказы пользователя
    selectIsLoading: (sliceState) => sliceState.isLoading, // процесс згрузки
    selectCurrentOrder: (sliceState) => sliceState.currentOrder // выбранный заказ
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.currentOrder = null;
        state.error = '';
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.orders[0];
      });
  }
});

export const { selectIsLoading, selectOrders, selectCurrentOrder } =
  ordersSlice.selectors;
export default ordersSlice.reducer;
