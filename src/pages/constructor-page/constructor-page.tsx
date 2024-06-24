import styles from './constructor-page.module.css';
import { useSelector } from '../../services/store';
import { BurgerConstructor, BurgerIngredients } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { selectIsDataLoading } from '../../services/slices/burgersSlice';
import { isLoadingType } from '../../utils/checkLoading';

export const ConstructorPage: FC = () => {
  const isDataLoading = useSelector(selectIsDataLoading);
  const isLoading =
    isDataLoading && !isLoadingType(isDataLoading, 'orderBurger'); // чтобы процесс оформления заказа был иначе отображен

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
