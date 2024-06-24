import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router';
import {
  selectburgerConstructor,
  orderBurger,
  selectOrderModalData,
  setOrderModalData,
  selectIsDataLoading
} from '../../services/slices/burgersSlice';
import { selectUser } from '../../services/slices/userSlice';
import { isLoadingType } from '../../utils/checkLoading';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectburgerConstructor);
  const isLoading = useSelector(selectIsDataLoading);
  const orderModalData = useSelector(selectOrderModalData);
  const isOrder = isLoadingType(isLoading, 'orderBurger');
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || isOrder) return;
    if (!user) navigate('/login');
    else {
      const ids = [
        constructorItems.bun._id!,
        ...constructorItems.ingredients.map((a) => a._id),
        constructorItems.bun._id!
      ];
      dispatch(orderBurger(ids));
    }
  };
  const closeOrderModal = () => dispatch(setOrderModalData(null));

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isOrder}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
