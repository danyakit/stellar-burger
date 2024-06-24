import { ChangeEvent, SyntheticEvent } from 'react';

export type FormValues = {
  name: string;
  email: string;
  password: string;
};

export type ProfileUIProps = {
  formValue: FormValues;
  isFormChanged: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
};
