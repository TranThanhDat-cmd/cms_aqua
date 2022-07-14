import moment from 'moment';

class CustomerEntity {
  //copy props from backend:
  createdAt = '';

  id = '';

  constructor(customer: Partial<CustomerEntity>) {
    if (!customer) {
      return;
    }
    Object.assign(this, customer);
    // convert entity type here
    this.createdAt = customer.createdAt ? moment(customer.createdAt).format('DD/MM/YYYY') : '';
  }

  static createListCustomer(listCustomer: Array<Partial<CustomerEntity>>) {
    if (!Array.isArray(listCustomer)) {
      return [];
    }
    return listCustomer.map((customer: Partial<CustomerEntity>) => {
      return new CustomerEntity(customer);
    });
  }
}
export default CustomerEntity;
