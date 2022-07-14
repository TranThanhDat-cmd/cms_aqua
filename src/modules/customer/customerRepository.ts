import { PaginationEntity } from '@core/pagination/entity';
import httpRepository from '@core/repository/http';
import { OptionEntity, TableEntity } from '@core/table';

import CustomerEntity from './customerEntity';

// API GET
export const getListCustomer = (pagination: PaginationEntity, options: OptionEntity) => {
  const params = new TableEntity(pagination, options);
  return httpRepository.execute({
    path: '/api/customers',
    showSuccess: false,
    showError: false,
    params,
    convert: res => {
      return {
        data: CustomerEntity.createListCustomer(res?.pagedData),
        info: new PaginationEntity(res?.pageInfo),
      };
    },
  });
};
export const getListCustomerHistory = (pagination: PaginationEntity, options: OptionEntity) => {
  const params = new TableEntity(pagination, options);
  return httpRepository.execute({
    path: '/api/customers/getHistory',
    showSuccess: false,
    showError: false,
    params,
    convert: res => {
      return {
        data: CustomerEntity.createListCustomer(res?.pagedData),
        info: new PaginationEntity(res?.pageInfo),
      };
    },
  });
};
//and get detail
export const getDetailCustomer = (id: string) => {
  return httpRepository.execute({
    path: '/api/customers/' + id,
    showSuccess: false,
    showError: false,
    convert: res => {
      return new CustomerEntity(res);
    },
  });
};

//API ADD
export const createCustomer = (payload: any) => {
  return httpRepository.execute({
    path: '/api/customers',
    method: 'post',
    payload,
  });
};

//API EDIT/UPDATE
export const updateCustomer = (id: string, payload: any) => {
  return httpRepository.execute({
    path: `/api/customers/${id}`,
    method: 'put',
    payload,
  });
};

//API DELETE
export const deleteCustomer = (id: string) => {
  return httpRepository.execute({
    path: '/api/customers/' + id,
    method: 'delete',
  });
};
