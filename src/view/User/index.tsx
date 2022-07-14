import './style.scss';

import { Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';

import RightMenu, { IArrayAction } from '@layout/RightMenu';
import UserEntity from '@modules/user/entity';
import userPresenter from '@modules/user/presenter';
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

import ModalComponents from './component/MainModal/ModalUser';
import { IModal } from './interface';
import { routerUser } from './router';

const User = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();
  const deleteUser = useSingleAsync(userPresenter.deleteUser);
  const editUser = useSingleAsync(userPresenter.updateUser);
  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });

  const [search, setSearch] = useState<string>('');

  const idChooses = 'id';
  const handleRefresh = () => {
    table.fetchData({ option: { search: search } });
  };

  useEffect(() => {
    table.fetchData({ option: { search: search } });
  }, [search, table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };
  const columns = [
    {
      dataIndex: 'fullName',
    },
    {
      dataIndex: 'createDateTime',
    },
    {
      dataIndex: 'phone',
    },
    {
      dataIndex: 'isActive',
      render: (_item: boolean, record: UserEntity) => (
        <>
          <Switch
            defaultChecked={_item}
            onChange={checked => {
              editUser.execute(record.id, { isActive: checked }).then(() => {
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
      render: (item: any, record: UserEntity) => (
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
          <InformationIconComponent
            onClick={() => {
              setModal({
                dataEdit: record,
                isVisible: true,
                isReadOnly: true,
              });
            }}
          />
          <DeleteIconComponent
            onClick={() => {
              DeleteConfirm({
                title: formatMessage('customer.confirm.title.delete'),
                content: formatMessage('common.confirm.content.delete'),
                handleOk: () => {
                  deleteUser?.execute(record.id).then(() => {
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

  return (
    <div className="user">
      <MainTitleComponent breadcrumbs={routerUser} />
      <div className="main-card">
        <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
          <div className="d-flex flex-column ">
            <div className="label-select">{formatMessage('common.keyword')}</div>
            <SearchComponent onSearch={handleSearch} placeholder={'common.keyword'} />
          </div>
        </div>
        <TableComponent
          apiServices={userPresenter.getUser}
          translateFirstKey="user"
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

export default User;
