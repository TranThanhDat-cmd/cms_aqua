import React from 'react';

import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { IRouter } from '@routers/interface';

export const routerDevice: IRouter = {
  path: '/device',
  loader: import('./index'),
  exact: true,
  name: 'device.name', //translate here for breadcrumb and sidebar
  menu: {
    icon: <FundProjectionScreenOutlined />,
    activePath: /device/gm,
  },
};
