import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '../../utils/burger-api';

export interface FeedsState {
  feeds: TOrder[]; // общие заказы
  isLoading: boolean; // процесс загрузки
  error: string;
}

// начальное состояние слайса
export const initialState: FeedsState = {
  feeds: [],
  isLoading: false,
  error: ''
};

export const fetchFeeds = createAsyncThunk('fetchFeeds', getFeedsApi);

/**
 * Слайс дла работы с лентой заказов
 */
const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (sliceState) => sliceState.feeds, // заказы общие
    selectIsDataLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
      });
  }
});

export const { selectFeeds, selectIsDataLoading } = feedsSlice.selectors;
export default feedsSlice.reducer;
