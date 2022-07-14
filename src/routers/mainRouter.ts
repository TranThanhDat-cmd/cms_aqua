import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profile/router';
import { routerContact } from '@view/Contact/router';
import { routerCustomer, routerCustomerHistory } from '@view/Customer/router';
import { routerDeviceInfo } from '@view/Device/page/DeviceInfo/router';
import { routerDevice } from '@view/Device/router';
import { routerHomepage } from '@view/Homepage/router';
import { routerPageError } from '@view/PageError/router';
import { routerUser } from '@view/User/router';

import { IRouter } from './interface';

export const privatePage: IRouter[] = [
  routerHomepage,
  routerViewProfile,
  routerCustomer,
  routerContact,
  routerCustomerHistory,
  routerUser,
  routerDevice,
  routerDeviceInfo,
  routerPageError,
];

export const publicPage: IRouter[] = [routerLogin];
