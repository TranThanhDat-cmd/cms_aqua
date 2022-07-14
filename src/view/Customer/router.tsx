import React from 'react';

import { TeamOutlined } from '@ant-design/icons';
import { IRouter } from '@routers/interface';

export const routerCustomer: IRouter = {
  path: '/customer',
  loader: import('./index'),
  exact: true,
  name: 'customer.name', //translate here for breadcrumb and sidebar
  menu: {
    icon: <TeamOutlined />,
    activePath: /customer/gm,
  },
};

export const routerCustomerHistory: IRouter = {
  path: '/customer/:id',
  loader: import('./page/CustomerHistory/index'),
  exact: true,
  name: 'customerHistory.name', //translate here for breadcrumb and sidebar
};
