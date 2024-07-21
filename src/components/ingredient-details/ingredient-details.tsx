import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngrediens } from '../../slices/ingredients';
import { useParams } from 'react-router';

export const IngredientDetails: FC = () => {
  const ingredientDatas = useSelector(selectIngrediens);
  const { id } = useParams();
  const ingredientData = ingredientDatas.find((el) => el._id == id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
