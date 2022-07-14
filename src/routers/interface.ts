import React, { ReactNode } from 'react';

import { RootState } from '@modules';
import { Selector } from '@reduxjs/toolkit';

export type IRouter = {
  loader?: any;
  path: string;
  permissionCode?: string | 'ALLOW';
  component?: React.FC<any>;
  isPrivate?: boolean;
  exact?: boolean;
  name?: string;
  masterLayout?: boolean;
  menu?: {
    icon?: ReactNode;
    hideInNavbar?: boolean;
    exact?: boolean;
    activePath?: RegExp;
    generatePath?: (params: any) => string;
    selector?: Selector<RootState, any>;
  };
  routes?: Array<IRouter>;
  external?: boolean;
};
