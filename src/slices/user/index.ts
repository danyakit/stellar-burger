import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  updateUserApi,
  logoutApi,
  getUserApi,
  registerUserApi,
  loginUserApi
} from '../../utils/burger-api';

interface UserState {
  isLoading: boolean; // идет процесс обмена информацией с сервером
  user: TUser | null; // данные о пользователе авторизованном, если есть, значит авторизация прошла
  loginError: string; // текстовое сообщение об ошибке авторизации, если пустое, нет ошибки
  otherError: string; // текстовое сообщение об иной ошибке
}

// начальное состояние для слайса
export const initialState: UserState = {
  isLoading: false,
  user: null,
  loginError: '',
  otherError: ''
};

export const loginUser = createAsyncThunk('loginUser', loginUserApi);
export const registerUser = createAsyncThunk('registerUser', registerUserApi);
export const updateUser = createAsyncThunk('updateUser', updateUserApi);
export const getUser = createAsyncThunk('getUser', getUserApi);
export const logoutUser = createAsyncThunk('logoutUser', logoutApi);

/**
 * Слайс работы с авторизацией и данными пользователя
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsUserDataLoading: (sliceState) => sliceState.isLoading,
    selectLoginError: (sliceState) => sliceState.loginError,
    selectOtherError: (sliceState) => sliceState.otherError
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.otherError = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.otherError = action.error.message!;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.otherError = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.otherError = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.error.message!;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.otherError = '';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.otherError = action.error.message!;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.otherError = '';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.otherError = action.error.message!;
      })
      .addCase(logoutUser.fulfilled, (state, _) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});

export const {
  selectLoginError,
  selectUser,
  selectIsUserDataLoading,
  selectOtherError
} = userSlice.selectors;
export default userSlice.reducer;
