import { PaginationEntity } from '@core/pagination/entity';
import httpRepository from '@core/repository/http';
import { OptionEntity, TableEntity } from '@core/table';

import ContactEntity from './contactEntity';

// API GET
export const getListContact = (pagination: PaginationEntity, options?: OptionEntity) => {
  const params = new TableEntity(pagination, options);
  return httpRepository.execute({
    path: '/api/contact',
    showSuccess: false,
    showError: false,
    params,
    convert: res => {
      return {
        data: ContactEntity.createListContact(res?.pagedData),
        info: new PaginationEntity(res?.pageInfo),
      };
    },
  });
};
//and get detail
export const getDetailContact = (id: string) => {
  return httpRepository.execute({
    path: '/api/contact/' + id,
    showSuccess: false,
    showError: false,
    convert: res => {
      return new ContactEntity(res);
    },
  });
};

//API ADD
export const createContact = (payload: any) => {
  return httpRepository.execute({
    path: '/api/contact',
    method: 'post',
    payload,
  });
};

//API EDIT/UPDATE
export const updateContact = (id: string, payload: any) => {
  return httpRepository.execute({
    path: '/api/contact/' + id,
    method: 'put',
    payload,
  });
};

//API DELETE
export const deleteContact = (id: string) => {
  return httpRepository.execute({
    path: '/api/contact/' + id,
    method: 'delete',
  });
};
