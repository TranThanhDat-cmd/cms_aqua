import { IRouter } from '@routers/interface';

export const routerDeviceInfo: IRouter = {
  path: '/device/info/:id',
  loader: import('./index'),
  exact: true,
  name: 'device.information', //translate here for breadcrumb and sidebar
};
