import './style.scss';

import { DatePicker } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import customerPresenter from '@modules/customer/customerPresenter';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { routerCustomer, routerCustomerHistory } from '@view/Customer/router';

const CustomerHistory = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();
  const { RangePicker } = DatePicker;

  useEffect(() => {
    setFilterOption({ customerId: id });
  }, [id]);

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const columns: ColumnsType = [
    {
      dataIndex: 'customer',
      title: 'customer.customerName',
      render(customer) {
        return <span>{customer?.customerName}</span>;
      },
    },
    {
      dataIndex: 'device',
      title: 'deviceInfo.internalComment',
      render(device) {
        return <span>{device?.internalComment}</span>;
      },
    },
    {
      dataIndex: 'amountNoneAqua',
    },
    {
      dataIndex: 'amountAqua',
    },
    {
      dataIndex: 'amountCoin',
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
    <div className="customer-history">
      <MainTitleComponent breadcrumbs={[routerCustomer, routerCustomerHistory]} />
      <div className="main-card">
        <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
          <div className="d-flex flex-row ">
            <RangePicker onChange={handleChangeTime} />
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
          apiServices={customerPresenter.getListCustomerHistory}
          defaultOption={filter}
          translateFirstKey="customerHistory"
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          hasStt={true}
          disableFirstCallApi={true}
        />
      </div>
    </div>
  );
};

export default CustomerHistory;
