import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useForm } from '../../hooks/useForm';
import {
  updateUser,
  selectUser,
  selectIsUserDataLoading
} from '../../slices/user';
import { FormValues } from '../../components/ui/pages/profile/type';

type ProfileFormFields = {
  name?: string;
  email?: string;
  password?: string;
};

export const Profile: FC = () => {
  const user = useSelector(selectUser); // userDataSelector - селектор получения пользователя из store
  const isLoading = useSelector(selectIsUserDataLoading);
  const dispatch = useDispatch();

  if (!user) return null;
  const { values, handleChange, setValues, reset } = useForm<FormValues>({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: values.name,
        email: values.email,
        password: values.password
      })
    );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    reset();
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <ProfileUI
      formValue={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
