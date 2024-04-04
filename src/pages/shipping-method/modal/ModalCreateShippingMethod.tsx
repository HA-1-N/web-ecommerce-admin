import { createShippingMethodApi } from '@/api/shipping-method.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import InputNumberForm from '@/components/form/InputNumberForm';
import { openNotification } from '@/features/counter/counterSlice';
import { incrementCountShippingMethod } from '@/features/shipping-method/shipping-method.slice';
import { ShippingMethodModels } from '@/model/shipping-method.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import React, { useRef } from 'react';

interface ModalCreateShippingMethodProps {
  isModalOpen: boolean;
  onCancel: () => void;
  [key: string]: unknown;
}

const ModalCreateShippingMethod = (props: ModalCreateShippingMethodProps) => {
  const { isModalOpen, onCancel, ...otherProps } = props;

  const initialValues: ShippingMethodModels = {
    method: '',
    price: 0,
  };

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: ShippingMethodModels) => {
    // console.log('values...', values);
    try {
      const res = await createShippingMethodApi(values);
      if (res) {
        dispatch(incrementCountShippingMethod());
        dispatch(
          openNotification({
            message: 'Create Shipping Method Success',
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
                  label="Method"
                  placeholder="Enter Method"
                  name="method"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your method!',
                    },
                  ]}
                />
              </Col>

              <Col span={24}>
                <InputNumberForm
                  label="Price"
                  placeholder="Enter Price"
                  name="price"
                  min={0}
                  max={1000000}
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your price!',
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
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateShippingMethod;
