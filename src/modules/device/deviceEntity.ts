import moment from 'moment';

class DeviceEntity {
  //copy props from backend:
  id = '';

  deviceName = '';

  deviceCode = '';

  deviceCapacity = '';

  deviceLong: number | undefined;

  deviceLat: number | undefined;

  isActive = true;

  createDateTime = '';

  internalComment = '';

  constructor(device: Partial<DeviceEntity>) {
    if (!device) {
      return;
    }
    Object.assign(this, device);
    // convert entity type here
    this.createDateTime = device.createDateTime ? moment(device.createDateTime).format('DD/MM/YYYY HH:mm:ss') : '';
  }

  static createListDevice(listDevice: Array<Partial<DeviceEntity>>) {
    if (!Array.isArray(listDevice)) {
      return [];
    }
    return listDevice.map((device: Partial<DeviceEntity>) => {
      return new DeviceEntity(device);
    });
  }
}
export default DeviceEntity;
