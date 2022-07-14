import { ReactNode } from 'react';

export interface IModal {
  isVisible: boolean;
  dataEdit: any;
  isReadOnly?: boolean;
}

export interface IPropsModal {
  handleRefresh: () => void;
  modal: IModal;
  setModal: (arg: any) => void;
}
export interface IFormContent {
  label?: string;
  name: string;
  render?: ReactNode;
  rules?: any;
}

export enum CAPACITY {
  EMPTY = 0,
  GARBAGE_FULL = 1,
  WATER_FULL = 2,
  BOTH_FULL = 3,
}
