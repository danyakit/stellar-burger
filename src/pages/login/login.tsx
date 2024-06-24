import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  selectUser,
  selectLoginError,
  selectIsUserDataLoading
} from '../../services/slices/userSlice';
import { Navigate } from 'react-router';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loginError = useSelector(selectLoginError);
  const isLoading = useSelector(selectIsUserDataLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return isLoading ? (
    <Preloader />
  ) : user ? (
    <Navigate replace to='/' />
  ) : (
    <LoginUI
      errorText={loginError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
