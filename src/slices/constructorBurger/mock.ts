import { TBurgerConstructor } from '@utils-types';
import { TNewOrderResponse } from '../../utils/burger-api';

export const testConstructorBurger: string[] = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0941',
  '643d69a5c3f7b9001cfa0942',
  '643d69a5c3f7b9001cfa093c'
];

export const testOrder: TNewOrderResponse = {
  success: true,
  name: 'Краторный spicy био-марсианский бургер',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093c'
    ],
    _id: '666c31a397ede0001d0709a3',
    status: 'done',
    name: 'Краторный spicy био-марсианский бургер',
    createdAt: '2024-06-14T12:03:47.124Z',
    updatedAt: '2024-06-14T12:03:49.196Z',
    number: 42366
  }
};

export const testOrderResponse: TBurgerConstructor = {
  orderModalData: testOrder.order,
  error: '',
  isLoading: false,
  bun: null,
  ingredients: []
};
