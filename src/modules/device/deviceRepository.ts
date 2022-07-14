import { PaginationEntity } from '@core/pagination/entity';
import httpRepository from '@core/repository/http';
import { OptionEntity, TableEntity } from '@core/table';

import DeviceEntity from './deviceEntity';

// API GET
export const getListDevice = (pagination: PaginationEntity, options: OptionEntity) => {
  const params = new TableEntity(pagination, options);
  return httpRepository.execute({
    path: '/api/device',
    showSuccess: false,
    showError: false,
    params,
    convert: res => {
      return {
        data: DeviceEntity.createListDevice(res?.pagedData),
        info: new PaginationEntity(res?.pageInfo),
      };
    },
  });
};

// API GET Logs
export const getListDeviceLogs = (pagination?: PaginationEntity, options?: OptionEntity) => {
  const params = new TableEntity(pagination, options);
  return httpRepository.execute({
    path: '/api/device/logs',
    showSuccess: false,
    showError: false,
    params,
    convert: res => {
      return {
        data: DeviceEntity.createListDevice(res?.pagedData),
        info: new PaginationEntity(res?.pageInfo),
      };
    },
  });
};

//and get detail
export const getDetailDevice = (id: string) => {
  return httpRepository.execute({
    path: '/api/device/' + id,
    showSuccess: false,
    showError: false,
    convert: res => {
      return new DeviceEntity(res);
    },
  });
};

//API ADD
export const createDevice = (payload: any) => {
  return httpRepository.execute({
    path: '/api/device/create',
    method: 'post',
    payload,
  });
};

//API EDIT/UPDATE
export const updateDevice = (id: string, payload: any) => {
  return httpRepository.execute({
    path: '/api/device/' + id,
    method: 'put',
    payload,
  });
};

//API DELETE
export const deleteDevice = (id: string) => {
  return httpRepository.execute({
    path: '/api/device/' + id,
    method: 'delete',
  });
};
