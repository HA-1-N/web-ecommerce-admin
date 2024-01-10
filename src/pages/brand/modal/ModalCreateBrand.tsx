import { createBrandApi } from '@/api/brand.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { incrementCountBrand } from '@/features/brand/brand.slice';
import { openNotification } from '@/features/counter/counterSlice';
import { BrandModels } from '@/model/brand.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import React, { useRef } from 'react';

interface ModalCreateBrandProps {
  isModalOpen: boolean;
  onCancel: () => void;
  [key: string]: unknown;
}

const ModalCreateBrand = (props: ModalCreateBrandProps) => {
  const { onCancel, isModalOpen } = props;

  const initialValues: BrandModels = {
    name: '',
    description: '',
  };

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: any) => {
    createBrandApi(values)
      .then((res) => {
        if (res) {
          dispatch(incrementCountBrand());
          dispatch(
            openNotification({
              message: 'Create Brand Success',
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
        title="Create Brand"
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

              <Col span={24}>
                <InputForm label="Description" placeholder="Enter Description" name="description" />
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

export default ModalCreateBrand;
