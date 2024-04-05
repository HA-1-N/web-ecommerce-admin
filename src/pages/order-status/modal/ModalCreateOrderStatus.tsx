import { createOrderStatusApi } from '@/api/order-status.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { openNotification } from '@/features/counter/counterSlice';
import { incrementCountOrderStatus } from '@/features/order-status/order-status.slice';
import { OrderStatusModels } from '@/model/order-status.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import React, { useRef } from 'react';

interface ModalCreateOrderStatusProps {
  isModalOpen: boolean;
  onCancel: () => void;
  [key: string]: unknown;
}

const ModalCreateOrderStatus = (props: ModalCreateOrderStatusProps) => {
  const { isModalOpen, onCancel, ...otherProps } = props;

  const initialValues: OrderStatusModels = {
    status: '',
  };

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: OrderStatusModels) => {
    try {
      const res = await createOrderStatusApi(values);
      if (res) {
        dispatch(incrementCountOrderStatus());
        dispatch(
          openNotification({
            message: 'Create Order Status Success',
            type: 'success',
          }),
        );
        form.resetFields();
        onCancel();
      }
    } catch (error) {
      dispatch(
        openNotification({
          message: getMsgErrorApi(error),
          type: 'error',
        }),
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <>
      <Modal
        title="Create Shipping Method"
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
        <div>
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
                  label="Status"
                  placeholder="Enter Status"
                  name="status"
                  rules={[{ required: true, message: 'Please input your status!' }]}
                />
              </Col>
            </Row>
            <Form.Item className="hidden" wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" size="large" htmlType="submit" className="w-32" ref={btnRef}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateOrderStatus;
