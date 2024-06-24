import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser); // userDataSelector - селектор получения пользователя из store
  const userName = user ? user.name : '';
  return <AppHeaderUI userName={userName} />;
};
