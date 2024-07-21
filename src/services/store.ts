import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsSliceReducer from '../slices/ingredients';
import constructorSliceReducer from '../slices/constructorBurger';
import userSliceReducer from '../slices/user';
import feedsSliceReducer from '../slices/feeds';
import ordersSliceReducer from '../slices/orders';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer, // слайс по основным данным
  user: userSliceReducer, // слайс по авторизации и регистрации
  feeds: feedsSliceReducer,
  burgerConstructor: constructorSliceReducer,
  orders: ordersSliceReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export default store;
