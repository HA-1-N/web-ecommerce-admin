import { createHotCategoryApi } from '@/api/hot-category.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { openNotification } from '@/features/counter/counterSlice';
import { incrementCountHotCategory } from '@/features/hot-category/hot-category.slice';
import { HotCategoryModels } from '@/model/hot-category.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import React, { useRef } from 'react';

interface ModalCreateHotCategoryProps {
  isModalOpen: boolean;
  onCancel: () => void;
  [key: string]: unknown;
}

const ModalCreateHotCategory = (props: ModalCreateHotCategoryProps) => {
  const { isModalOpen, onCancel, ...otherProps } = props;

  const initialValues: HotCategoryModels = {
    name: '',
  };

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinish = async (values: HotCategoryModels) => {
    createHotCategoryApi(values)
      .then((res) => {
        if (res) {
          dispatch(incrementCountHotCategory());
          dispatch(
            openNotification({
              message: 'Create Hot Category Success',
              type: 'success',
            }),
          );
          form.resetFields();
          onCancel();
        }
      })
      .catch((err) => {
        // console.log('err...', err);
        dispatch(
          openNotification({
            message: getMsgErrorApi(err),
            type: 'error',
          }),
        );
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Create Hot Category"
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
                  label="Name"
                  placeholder="Enter Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
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

export default ModalCreateHotCategory;
