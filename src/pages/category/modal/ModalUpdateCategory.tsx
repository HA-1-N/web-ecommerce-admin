import { updateCategoryApi } from '@/api/category.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { incrementCountCategory } from '@/features/category/category.slice';
import { openNotification } from '@/features/counter/counterSlice';
import { CategoryModels } from '@/model/category.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import React, { useRef } from 'react';
interface ModalUpdateCategoryProps {
  isModalOpen: boolean;
  onCancel: () => void;
  id: number | undefined;
  categoryDetail: CategoryModels | null;
  [key: string]: unknown;
}

const ModalUpdateCategory = (props: ModalUpdateCategoryProps) => {
  const { categoryDetail, id, isModalOpen, onCancel } = props;

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const initialValues: CategoryModels = {
    name: categoryDetail?.name,
    description: categoryDetail?.description,
  };

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: CategoryModels) => {
    try {
      const res = await updateCategoryApi(values, id);
      if (res) {
        dispatch(incrementCountCategory());
        dispatch(
          openNotification({
            message: 'Update Category Success!',
            description: 'You have successfully updated the Category!',
            type: 'success',
          }),
        );
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
        title="Update Category"
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
            form={form}
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

export default ModalUpdateCategory;
