import moment from 'moment';

class ContactEntity {
  //copy props from backend:
  createDateTime = '';

  id = '';

  isActive = true;

  internalComment = '';

  contactContent = '';

  createdBy = '';

  contactTitle = '';

  deviceId = '';

  contactEmail = '';

  device = '';

  constructor(contact: Partial<ContactEntity>) {
    if (!contact) {
      return;
    }
    Object.assign(this, contact);
    // convert entity type here
    this.createDateTime = contact.createDateTime
      ? moment(contact.createDateTime).format('DD/MM/YYYY')
      : '';
  }

  static createListContact(listContact: Array<Partial<ContactEntity>>) {
    if (!Array.isArray(listContact)) {
      return [];
    }
    return listContact.map((contact: Partial<ContactEntity>) => {
      return new ContactEntity(contact);
    });
  }
}
export default ContactEntity;
