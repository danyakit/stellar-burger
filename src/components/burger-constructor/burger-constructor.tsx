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
  selectIsLoading
} from '../../slices/constructorBurger';
import { selectUser } from '../../slices/user';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectburgerConstructor);
  const isLoading = useSelector(selectIsLoading);
  const orderModalData = useSelector(selectOrderModalData);
  //const isOrder = isLoadingType(isLoading, 'orderBurger');
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || isLoading) return;
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
      orderRequest={isLoading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
