import './style.scss';

import { Col, DatePicker, Form, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { IFormContent, renderForm } from '@hoc/FormHelper';
import DeviceEntity from '@modules/device/deviceEntity';
import devicePresenter from '@modules/device/devicePresenter';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { routerDevice } from '@view/Device/router';

import { routerDeviceInfo } from './router';

const DeviceInfo = () => {
  const { formatMessage, intl } = useAltaIntl();

  const table = useTable();
  const [form] = Form.useForm();

  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();
  const { RangePicker } = DatePicker;

  useEffect(() => {
    setFilterOption({ deviceId: id });
    devicePresenter.getDetailDevice(id).then((device: DeviceEntity) => {
      form.setFieldsValue(device);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formContent: IFormContent[] = React.useMemo<IFormContent[]>(() => {
    return [
      {
        label: 'device.deviceCode',
        name: 'deviceCode',
        disabled: true,
      },
      {
        name: 'deviceName',
        label: 'device.deviceName',
        disabled: true,
      },
      {
        name: 'internalComment',
        label: 'device.internalComment',
        disabled: true,
      },
      {
        name: 'deviceCapacity',
        label: 'device.deviceCapacity',
        disabled: true,
      },
      {
        name: 'deviceLong',
        label: 'device.deviceLong',
        disabled: true,
      },
      {
        name: 'deviceLat',
        label: 'device.deviceLat',
        disabled: true,
      },
    ];
  }, []);

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const columns = [
    {
      dataIndex: 'amountNonAqua',
    },
    {
      dataIndex: 'amountAqua',
    },
    {
      dataIndex: 'amountCoin',
    },
    {
      dataIndex: 'timeLog',
      render: (item: string) => {
        return (
          <span>
            {moment(item).format('HH:mm:ss')} {moment(item).format('DD/MM/YYYY')}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  }, [search, filter, table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  const handleChangeTime = (dates: any, datesString: string[]) => {
    setFilterOption({ ...filter, timeStart: datesString[0], timeEnd: datesString[1] });
  };

  return (
    <div className="device-info">
      <MainTitleComponent breadcrumbs={[routerDevice, routerDeviceInfo]} />
      <div className="main-card">
        <Row gutter={46}>
          <Col span={8}>
            <Form
              form={form}
              className="main-form" //important
              layout="vertical" //important
              name="basic"
            >
              {renderForm(formContent, intl, true)}
            </Form>
          </Col>
          <Col span={16}>
            <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
              <div className="d-flex flex-row ">
                <RangePicker showTime format="YYYY/MM/DD HH:mm:ss" onChange={handleChangeTime} />
              </div>
              <div className="d-flex flex-column ">
                <div className="label-select">{formatMessage('common.keyword')}</div>
                <SearchComponent
                  onSearch={handleSearch}
                  placeholder={'common.keyword'}
                  classNames="mb-0 search-table"
                />
              </div>
            </div>
            <TableComponent
              apiServices={devicePresenter.getListDeviceLogs}
              defaultOption={filter}
              translateFirstKey="deviceInfo"
              rowKey={res => res[idChooses]}
              register={table}
              columns={columns}
              disableFirstCallApi={true}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DeviceInfo;
