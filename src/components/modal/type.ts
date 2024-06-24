import { ReactNode } from 'react';

type TitleFunction = () => string;

export type TModalProps = {
  title: string | TitleFunction;
  onClose: () => void;
  children?: ReactNode;
};
