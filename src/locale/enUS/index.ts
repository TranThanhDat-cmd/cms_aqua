import enUS from 'antd/lib/locale/en_US';

import contact from '@locale/viVN/contact';
import roles from '@locale/viVN/roles';

import auth from './auth';
import common from './common';
import customer from './customer';
import device from './device';
import pageError from './pageError';
import server from './server';
import user from './user';

export default {
  ...enUS,
  ...common,
  ...server,
  ...auth,
  ...pageError,
  ...roles,
  ...user,
  ...device,
  ...customer,
  ...contact,
};
