import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Preloader, ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../slices/user';
import { setCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        localStorage.removeItem('refreshToken');
        setCookie('accessToken', '');
      })
      .catch(() => {});
  };
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
