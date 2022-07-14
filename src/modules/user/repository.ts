import { PaginationEntity } from '@core/pagination/entity';
import httpRepository from '@core/repository/http';
import { OptionEntity, TableEntity } from '@core/table';
import UserEntity, { AccountPermissionEntity } from '@modules/user/entity';

const addUser = (payload: any) => {
  return httpRepository.execute({
    path: '/api/users/create',
    method: 'post',
    payload,
    config: { isPrivate: true },
  });
};
const updateUser = (id: string, payload: any) => {
  return httpRepository.execute({
    path: `/api/users/${id}`,
    method: 'put',
    payload,
    config: { isPrivate: true },
  });
};

const deleteUser = (id: any) => {
  return httpRepository.execute({
    path: `/api/users/${id}`,
    method: 'delete',
    config: { isPrivate: true },
  });
};

const getUser = async (pagination: PaginationEntity, options: OptionEntity) => {
  const params = new TableEntity(pagination, options);
  return httpRepository
    .execute({
      path: '/api/users',
      params,
      showError: false,
      showSuccess: false,
    })
    .then((dataListGroup: any) => {
      return Promise.resolve({
        data: UserEntity.createArrayUser(dataListGroup.pagedData),
        info: new PaginationEntity(dataListGroup.pageInfo),
      });
    });
};

const getDetailUser = (id: any) => {
  return httpRepository.execute({
    path: `/api/users/${id}`,
    showError: false,
    showSuccess: false,
    convert: res => new UserEntity(res),
  });
};

const getPermission = () => {
  return httpRepository.execute({
    path: '/api/Permissions',
    showSuccess: false,
    convert: res => AccountPermissionEntity.createlistPermisison(res),
  });
};

export default {
  getDetailUser,
  addUser,
  updateUser,
  deleteUser,
  getPermission,
  getUser,
};
