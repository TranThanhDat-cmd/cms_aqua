import moment from 'moment';

export class AccountPermissionEntity {
  accountPermissionId: string = '';

  permissionCode = '';

  accountId = '';

  accountPermissionCreateAt = '';

  constructor(permission: Partial<AccountPermissionEntity>) {
    if (!permission) {
      return;
    }
    Object.assign(this, permission);
  }

  static createlistPermisison(list?: Array<Partial<AccountPermissionEntity>>) {
    if (list === undefined) {
      return undefined;
    }
    return list.map(ll => {
      return new AccountPermissionEntity(ll);
    });
  }
}
class UserEntity {
  createDateTime = '';

  isActive = false;

  createdBy = '';

  fullName = '';

  userName = '';

  phone = '';

  permissions: AccountPermissionEntity[] = [];

  id = '';

  constructor(user?: Partial<UserEntity>) {
    if (!user) {
      return;
    }
    Object.assign(this, user);
    this.permissions = AccountPermissionEntity.createlistPermisison(user?.permissions) || [];
    this.createDateTime = user?.createDateTime
      ? moment(user?.createDateTime).format('DD/MM/YYYY HH:mm:ss')
      : '';
  }

  static createArrayUser(arrUser: Array<Partial<UserEntity>>): Array<UserEntity> {
    if (!arrUser) {
      return [];
    }
    return arrUser.map(x => new UserEntity(x));
  }
}

export default UserEntity;
