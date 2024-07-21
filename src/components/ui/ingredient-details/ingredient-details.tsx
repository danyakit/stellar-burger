import React, { FC, memo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';
import { useLocation } from 'react-router';
import clsx from 'clsx';

export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({ ingredientData }) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientData;
    const location = useLocation();
    const background = location.state?.background;

    return (
      <div
        className={clsx({
          [styles.content]: true,
          [styles.content_not_modal]: !background
        })}
        data-cy='IngredientDetailsUI'
      >
        {!background && (
          <h2 className={`text text_type_main-large`}>Детали ингредиента</h2>
        )}
        <img
          className={styles.img}
          alt='изображение ингредиента.'
          src={image_large}
        />
        <h3
          className='text text_type_main-medium mt-2 mb-4'
          data-cy='ingredient-name'
        >
          {name}
        </h3>
        <ul className={`${styles.nutritional_values} text_type_main-default`}>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Калории, ккал</p>
            <p className={`text text_type_digits-default`}>{calories}</p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Белки, г</p>
            <p className={`text text_type_digits-default`}>{proteins}</p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Жиры, г</p>
            <p className={`text text_type_digits-default`}>{fat}</p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Углеводы, г</p>
            <p className={`text text_type_digits-default`}>{carbohydrates}</p>
          </li>
        </ul>
      </div>
    );
  }
);
