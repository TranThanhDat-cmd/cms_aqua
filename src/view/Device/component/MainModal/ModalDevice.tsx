import { Form, Input, InputNumber, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import { IFormContent, renderForm } from '@hoc/FormHelper';
import devicePresenter from '@modules/device/devicePresenter';
import ButtonForm from '@shared/components/ButtonForm';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { CAPACITY, IPropsModal } from '../../interface';

const ModalDevice = (props: IPropsModal) => {
  const { modal, setModal, handleRefresh } = props;
  const [form] = Form.useForm();
  const { formatMessage, intl } = useAltaIntl();
  const { Option } = Select;
  const updateDevice = useSingleAsync(devicePresenter.updateDevice);
  const createDevice = useSingleAsync(devicePresenter.createDevice);

  const [typeModal, setTypeModal] = useState<'EDIT' | 'ADD'>('ADD');

  const formContent: IFormContent[] = React.useMemo<IFormContent[]>(() => {
    return [
      {
        label: 'device.deviceCode',
        rules: [{ required: true }],
        name: 'deviceCode',
        disabled: typeModal === 'EDIT' ? true : false,
      },
      {
        name: 'deviceName',
        label: 'device.deviceName',
        rules: [{ required: true }],
        readOnly: modal.isReadOnly,
      },
      {
        name: 'internalComment',
        label: 'device.internalComment',
        rules: [{ required: true }],
        readOnly: modal.isReadOnly,
      },
      {
        name: 'deviceCapacity',
        label: 'device.deviceCapacity',
        rules: [{ required: true }],
        render(text) {
          return (
            <Select defaultValue={text}>
              <Option value={CAPACITY.EMPTY}>{formatMessage('device.deviceCapacity.0')}</Option>
              <Option value={CAPACITY.GARBAGE_FULL}>
                {formatMessage('device.deviceCapacity.1')}
              </Option>
              <Option value={CAPACITY.WATER_FULL}>
                {formatMessage('device.deviceCapacity.2')}
              </Option>
              <Option value={CAPACITY.BOTH_FULL}>{formatMessage('device.deviceCapacity.3')}</Option>
            </Select>
          );
        },
      },
      {
        name: 'deviceLong',
        label: 'device.deviceLong',
        rules: [{ required: true }],
        render(text) {
          return <InputNumber disabled={modal.isReadOnly} placeholder={text} autoComplete="off" />;
        },
      },
      {
        name: 'deviceLat',
        label: 'device.deviceLat',
        rules: [{ required: true }],
        render(text) {
          return <InputNumber disabled={modal.isReadOnly} placeholder={text} autoComplete="off" />;
        },
      },
      {
        name: 'devicePassword',
        label: 'device.devicePassword',
        rules: [
          {
            pattern: /^(?=.*\d)(?=.*[a-z]).{8,}$/,
            message: formatMessage('device.invalid_password'),
          },
        ],
        render() {
          return (
            <Input.Password disabled={modal.isReadOnly} placeholder="********" autoComplete="off" />
          );
        },
      },
      {
        name: 'confirmPassword',
        label: 'auth.password.confirm',
        hidden: modal.isReadOnly,
        rules: [
          {
            pattern: /^(?=.*\d)(?=.*[a-z]).{8,}$/,
            message: formatMessage('device.invalid_password'),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('devicePassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(formatMessage('device.password_notMatch')));
            },
          }),
        ],
        render() {
          return <Input.Password placeholder="********" autoComplete="off" />;
        },
      },
    ];
  }, [formatMessage, modal.isReadOnly, typeModal]);

  useEffect(() => {
    if (modal.dataEdit !== null) {
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
    delete value.confirmPassword;
    if (typeModal === 'EDIT') {
      updateDevice.execute(modal.dataEdit.id, value).then(() => handleCancel());
    } else {
      createDevice.execute(value).then(() => handleCancel());
    }
  };

  const translateFirstKey = 'device';

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

export default ModalDevice;
