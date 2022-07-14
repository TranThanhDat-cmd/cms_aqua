import './style.scss';

import { Space, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import RightMenu, { IArrayAction } from '@layout/RightMenu';
import DeviceEntity from '@modules/device/deviceEntity';
import devicePresenter from '@modules/device/devicePresenter';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import DeleteIconComponent from '@shared/components/DeleteIcon';
import EditIconComponent from '@shared/components/EditIconComponent';
import InformationIconComponent from '@shared/components/InformationIcon';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';

import ModalComponents from './component/MainModal/ModalDevice';
import { IModal } from './interface';
import { routerDevice } from './router';

const Device = () => {
  const table = useTable();
  const history = useHistory();
  const { formatMessage } = useAltaIntl();

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });
  const [search, setSearch] = useState<string>('');

  const deleteDevice = useSingleAsync(devicePresenter.deleteDevice);
  const updateDevice = useSingleAsync(devicePresenter.updateDevice);

  const handleRefresh = () => {
    table.fetchData({ option: { search: search } });
  };

  const idChooses = 'id';
  const columns = [
    {
      dataIndex: 'deviceCode',
    },
    {
      dataIndex: 'deviceName',
    },
    {
      dataIndex: 'internalComment',
    },
    {
      dataIndex: 'deviceCapacity',
      render: (_item: number) => (
        <>
          {_item === 0 ? <Tag color="red">{formatMessage('device.deviceCapacity.0')}</Tag> : ''}
          {_item === 1 ? <Tag color="volcano">{formatMessage('device.deviceCapacity.1')}</Tag> : ''}
          {_item === 2 ? <Tag color="lime">{formatMessage('device.deviceCapacity.2')}</Tag> : ''}
          {_item === 3 ? <Tag color="green">{formatMessage('device.deviceCapacity.3')}</Tag> : ''}
        </>
      ),
    },
    {
      dataIndex: 'createDateTime',
    },
    {
      dataIndex: 'isActive',
      render: (_item: boolean, record: DeviceEntity) => (
        <>
          <Switch
            defaultChecked={_item}
            onChange={checked => {
              updateDevice.execute(record.id, { isActive: checked }).then(() => {
                handleRefresh();
              });
            }}
          />
          {_item ? (
            <label style={{ color: '#336cc8' }}>{formatMessage('common.statusActive')}</label>
          ) : (
            <label style={{ color: 'red' }}>{formatMessage('common.statusDeactive')}</label>
          )}
        </>
      ),
    },
    {
      dataIndex: 'action',
      render: (_item: any, record: DeviceEntity) => (
        <Space>
          <EditIconComponent
            onClick={() => {
              setModal({
                dataEdit: record,
                isVisible: true,
                isReadOnly: false,
              });
            }}
          />
          <InformationIconComponent onClick={() => history.push(`/device/info/${record.id}`)} />
          <DeleteIconComponent
            onClick={() => {
              DeleteConfirm({
                title: formatMessage('device.confirm.title.delete'),
                content: formatMessage('device.confirm.content.delete'),
                handleOk: () => {
                  deleteDevice.execute(record.id).then(() => {
                    handleRefresh();
                  });
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'add',
      handleAction: () => {
        setModal({ dataEdit: null, isVisible: true });
      },
    },
  ];

  useEffect(() => {
    table.fetchData({ option: { search: search } });
  }, [search, table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  return (
    <div className="device">
      <MainTitleComponent breadcrumbs={routerDevice} />
      <div className="main-card">
        <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
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
          apiServices={devicePresenter.getListDevice}
          translateFirstKey="device"
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          disableFirstCallApi={true}
          hasStt={true}
        />
      </div>
      <RightMenu arrayAction={arrayAction} />
      <ModalComponents modal={modal} handleRefresh={handleRefresh} setModal={setModal} />
    </div>
  );
};

export default Device;
