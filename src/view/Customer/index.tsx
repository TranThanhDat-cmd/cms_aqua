import './style.scss';

import { Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';

import CustomerEntity from '@modules/customer/customerEntity';
import customerPresenter from '@modules/customer/customerPresenter';
import InformationIconComponent from '@shared/components/InformationIcon';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { routerCustomer, routerCustomerHistory } from './router';

const Customer = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();
  const history = useHistory();
  const editCustomer = useSingleAsync(customerPresenter.updateCustomer);
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
      dataIndex: 'customerName',
    },
    {
      dataIndex: 'customerEmail',
    },
    {
      dataIndex: 'customerPhone',
    },
    {
      dataIndex: 'customerCoin',
    },
    {
      dataIndex: 'isActive',
      render: (_item: boolean, record: CustomerEntity) => (
        <>
          <Switch
            defaultChecked={_item}
            onChange={checked => {
              editCustomer.execute(record.id, { isActive: checked }).then(() => {
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
      render: (_item: any, record: any) => (
        <Space>
          <InformationIconComponent
            onClick={() => {
              history.push(generatePath(routerCustomerHistory.path, { id: record.id }));
            }}
            tooltip="common.history"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="customer">
      <MainTitleComponent breadcrumbs={routerCustomer} />
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
          apiServices={customerPresenter.getListCustomer}
          translateFirstKey="customer"
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          disableFirstCallApi={true}
          hasStt={true}
        />
      </div>
    </div>
  );
};

export default Customer;
