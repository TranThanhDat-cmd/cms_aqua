import './style.scss';

import { Space, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import ContactEntity from '@modules/contact/contactEntity';
import contactPresenter from '@modules/contact/contactPresenter';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import DeleteIconComponent from '@shared/components/DeleteIcon';
import InformationIconComponent from '@shared/components/InformationIcon';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';

import ModalComponents from './component/MainModal/ModalContact';
import { IModal } from './interface';
import { routerContact } from './router';

const Contact = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();
  const editContact = useSingleAsync(contactPresenter.updateContact);
  const deleteContact = useSingleAsync(contactPresenter.deleteContact);

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const handleRefresh = () => {
    table.fetchData();
  };
  const columns = [
    {
      dataIndex: 'contactTitle',
      render: (_item: string) => (
        <>
          {_item === '1. Bỏ chai Aquafina nhưng hệ thống không nhận diện được' ? (
            <Tag color="green">{formatMessage('contact.contactTitle.1')}</Tag>
          ) : (
            ''
          )}
          {_item === '2. Hệ thống không tích điểm' ? (
            <Tag color="volcano">{formatMessage('contact.contactTitle.2')}</Tag>
          ) : (
            ''
          )}
          {_item === 'Khác' ? (
            <Tag color="blue">{formatMessage('contact.contactTitle.other')}</Tag>
          ) : (
            ''
          )}
        </>
      ),
    },
    {
      dataIndex: 'contactContent',
    },
    {
      dataIndex: 'createDateTime',
    },
    {
      dataIndex: 'device',
    },
    {
      dataIndex: 'isActive',
      render: (_item: boolean, record: ContactEntity) => (
        <>
          <Switch
            defaultChecked={_item}
            onChange={checked => {
              editContact.execute(record.id, { isActive: checked }).then(() => {
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
          {/* <EditIconComponent
            onClick={() => {
              setModal({
                dataEdit: record,
                isVisible: true,
                isReadOnly: false,
              });
            }}
          /> */}
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
                  deleteContact.execute(record.id).then(() => {
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

  // const arrayAction: IArrayAction[] = [
  //   {
  //     iconType: 'add',
  //     handleAction: () => {
  //       setModal({ dataEdit: null, isVisible: true });
  //     },
  //   },
  // ];

  useEffect(() => {
    table.fetchData();
  }, [table]);

  return (
    <div className="contact">
      <MainTitleComponent breadcrumbs={routerContact} />
      <div className="main-card">
        <TableComponent
          apiServices={contactPresenter.getListContact}
          translateFirstKey="contact"
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          disableFirstCallApi={true}
          hasStt
        />
      </div>
      {/* <RightMenu arrayAction={arrayAction} /> */}
      <ModalComponents modal={modal} handleRefresh={handleRefresh} setModal={setModal} />
    </div>
  );
};

export default Contact;
