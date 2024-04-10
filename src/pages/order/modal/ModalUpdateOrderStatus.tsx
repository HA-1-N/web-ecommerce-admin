import { changeOrderStatusApi } from '@/api/order.api';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import SelectForm from '@/components/form/SelectForm';
import { openNotification } from '@/features/counter/counterSlice';
import { getOptionOrderStatusAsync } from '@/features/order-status/order-status.slice';
import { incrementCountOrder } from '@/features/order/order.slice';
import { filterOption } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import React, { useEffect, useRef } from 'react';

interface ModalUpdateOrderStatusProps {
  isModalOpen: boolean;
  onCancel: () => void;
  status: string | undefined;
  id: number | undefined;
  [key: string]: unknown;
}

const ModalUpdateOrderStatus = (props: ModalUpdateOrderStatusProps) => {
  const { isModalOpen, onCancel, status, id, ...otherProps } = props;

  const initialValues = {
    status: status,
  };

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const optionOrderStatus = useAppSelector((state) => state.orderStatus.optionOderStatus);

  useEffect(() => {
    dispatch(getOptionOrderStatusAsync());
  }, [dispatch]);

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: any) => {
    if (typeof values.status === 'string') {
      dispatch(
        openNotification({
          message: 'Update order status success!',
          type: 'success',
        }),
      );
      onCancel();
    } else {
      console.log('values', values);
      const body = {
        id: id,
        statusId: values.status,
      };
      try {
        const res = await changeOrderStatusApi(body);
        if (res) {
          dispatch(
            openNotification({
              message: 'Change order status success!',
              type: 'success',
            }),
          );
          dispatch(incrementCountOrder());
          onCancel();
        }
      } catch (error) {
        dispatch(
          openNotification({
            message: 'Change order status failed!',
            description: error,
            type: 'error',
          }),
        );
      }
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
                <SelectForm
                  showSearch
                  label="Status"
                  placeholder="Enter Status"
                  name="status"
                  optionFilterProp="children"
                  allowClear
                  options={optionOrderStatus}
                  filterOption={filterOption}
                  rules={[
                    {
                      required: true,
                      message: 'Please select your status!',
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

export default ModalUpdateOrderStatus;
