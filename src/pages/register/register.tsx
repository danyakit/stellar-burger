import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUser,
  selectIsUserDataLoading,
  selectOtherError
} from '../../slices/user';
import { Preloader } from '@ui';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsUserDataLoading);
  const error = useSelector(selectOtherError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .then((action) => {
        localStorage.setItem('refreshToken', action.refreshToken);
        setCookie('accessToken', action.accessToken);
      })
      .catch(() => {
        localStorage.setItem('refreshToken', '');
        setCookie('accessToken', '');
      });
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
