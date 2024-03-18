import { createPaymentTypeApi } from '@/api/payment-type.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { openNotification } from '@/features/counter/counterSlice';
import { PaymentTypeModels } from '@/model/payment-type.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import React, { useRef } from 'react';

interface ModalCreatePaymentTypeProps {
  isModalOpen: boolean;
  onCancel: () => void;
  [key: string]: unknown;
}

const ModalCreatePaymentType = (props: ModalCreatePaymentTypeProps) => {
  const { isModalOpen, onCancel, ...otherProps } = props;

  const initialValues: PaymentTypeModels = {
    type: '',
  };

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: PaymentTypeModels) => {
    createPaymentTypeApi(values)
      .then((res) => {
        if (res) {
          dispatch(
            openNotification({
              message: 'Create Payment Type Success',
              type: 'success',
            }),
          );
          form.resetFields();
          onCancel();
        }
      })
      .catch((err) => {
        dispatch(
          openNotification({
            type: 'error',
            message: getMsgErrorApi(err),
          }),
        );
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Modal
        title="Create Color"
        open={isModalOpen}
        onCancel={onCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} className="w-28">
            Submit
          </Button>,
          <Button key="back" onClick={handleCancel} className="w-28">
            Cancel
          </Button>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 32 }}
          style={{ maxWidth: '100%' }}
          autoComplete="off"
          colon={false}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={initialValues}
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <InputForm
                label="Type"
                placeholder="Enter Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Please input your type!',
                  },
                ]}
              />
            </Col>
          </Row>
          <Form.Item className="hidden" wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" size="large" htmlType="submit" className="w-32" ref={btnRef}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreatePaymentType;
