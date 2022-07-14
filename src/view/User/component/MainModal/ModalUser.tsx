import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import { IFormContent, renderForm } from '@hoc/FormHelper';
import userPresenter from '@modules/user/presenter';
import ButtonForm from '@shared/components/ButtonForm';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { IPropsModal } from '../../interface';

const ModalUser = (props: IPropsModal) => {
  const { modal, setModal, handleRefresh } = props;
  const [form] = Form.useForm();
  const { formatMessage, intl } = useAltaIntl();
  const [typeModal, setTypeModal] = useState<'EDIT' | 'ADD'>('ADD');
  // JUST FORM
  const formContent: IFormContent[] = React.useMemo<IFormContent[]>(() => {
    return [
      {
        name: 'fullName',
        label: 'user.fullName',
        rules: [{ required: true }, { max: 255 }],
        readOnly: modal.isReadOnly,
      },

      {
        label: 'user.phone',
        rules: [{ required: true }, { pattern: /^\d+$/g }, { max: 255 }],
        name: 'phone',
        readOnly: modal.isReadOnly,
      },
      {
        name: 'userName',
        label: 'user.userName',
        rules: [{ required: true }, { max: 255 }],
        readOnly: typeModal !== 'ADD',
      },
      {
        name: 'password',
        label: 'auth.password',
        hidden: modal.isReadOnly,
        rules: [
          {
            pattern: /^(?=.*\d)(?=.*[a-z]).{8,}$/,
            message: formatMessage('user.invalid_password'),
          },
        ],
        render() {
          return <Input.Password placeholder="********" autoComplete="off" />;
        },
      },
      {
        name: 'confirmPassword',
        label: 'auth.password.confirm',
        hidden: modal.isReadOnly,
        rules: [
          {
            pattern: /^(?=.*\d)(?=.*[a-z]).{8,}$/,
            message: formatMessage('user.invalid_password'),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(formatMessage('require.password_notMatch')));
            },
          }),
        ],
        render() {
          return <Input.Password placeholder="********" autoComplete="off" />;
        },
      },
    ];
  }, [modal.isReadOnly, typeModal]);

  useEffect(() => {
    if (modal.dataEdit !== null) {
      // Call API Get Detail here
      setTypeModal('EDIT');
      form.setFieldsValue(modal.dataEdit);
    } else {
      setTypeModal('ADD');
    }
  }, [form, modal]);
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setModal({ isVisible: false, dataEdit: null });
    form.resetFields();
    handleRefresh();
  };
  const onFinish = (value: any) => {
    //thêm xóa sửa value here

    if (typeModal === 'EDIT') {
      //call api
      userPresenter.updateUser(modal.dataEdit.id, value).then(() => {
        handleCancel();
      });
    } else {
      //call api
      userPresenter.addUser(value).then(() => {
        handleCancel();
      });
    }
  };
  const translateFirstKey = 'user'; //put your translate here

  return (
    <Modal
      className="main-modal"
      title={
        typeModal === 'EDIT'
          ? modal.isReadOnly
            ? formatMessage(`${translateFirstKey}.information`)
            : formatMessage(`${translateFirstKey}.update`)
          : formatMessage(`${translateFirstKey}.create`)
      }
      visible={modal.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <ButtonForm
          isDisabled={modal.isReadOnly ? true : false}
          formName="form-device"
          nameButtonSubmit={typeModal === 'EDIT' ? 'common.update' : 'common.add'}
          onCancelForm={() => handleCancel()}
          onOkForm={() => handleOk()}
        />
      }
      closable={false}
    >
      <Form
        form={form}
        className="main-form" //important
        layout="vertical" //important
        name="basic"
        onFinish={onFinish}
      >
        {renderForm(formContent, intl)}
      </Form>
    </Modal>
  );
};

export default ModalUser;
