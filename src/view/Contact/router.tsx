import React from 'react';

import { TeamOutlined } from '@ant-design/icons';
import { IRouter } from '@routers/interface';

export const routerContact: IRouter = {
  path: '/contact',
  loader: import('./index'),
  exact: true,
  name: 'contact.name', //translate here for breadcrumb and sidebar
  menu: {
    icon: <TeamOutlined />,
  },
};
