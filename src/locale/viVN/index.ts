import viVN from 'antd/lib/locale/vi_VN';

import auth from './auth';
import common from './common';
import contact from './contact';
import customer from './customer';
import device from './device';
import Form from './form';
import pageError from './pageError';
import profile from './profile';
import roles from './roles';
import server from './server';
import user from './user';

export default {
  ...viVN,
  ...common,
  ...server,
  ...auth,
  ...pageError,
  ...roles,
  ...user,
  ...customer,
  ...device,
  ...profile,
  ...contact,
  Form,
};
