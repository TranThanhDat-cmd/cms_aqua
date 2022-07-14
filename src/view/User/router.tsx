import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { IRouter } from '@routers/interface';

export const routerUser: IRouter = {
  path: '/user',
  loader: import('./index'),
  exact: true,
  name: 'user.name', //translate here for breadcrumb and sidebar
  menu: {
    icon: <UserOutlined />,
    activePath: /user/gm,
  },
};
