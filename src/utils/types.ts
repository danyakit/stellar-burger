export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TBurgerConstructor = {
  bun: Partial<TIngredient> | null;
  ingredients: TConstructorIngredient[];
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TUserState = {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя - проверен ли в независимости от результата
  isAuthenticated: boolean; // успешно авторизован?
  loginUserRequest: boolean;
  loginError: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';
