import { updateSizeApi } from '@/api/size.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { openNotification } from '@/features/counter/counterSlice';
import { incrementCountSize } from '@/features/size/size.slice';
import { SizeModel } from '@/model/size.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import React, { useRef } from 'react';

interface ModalUpdateSizeProps {
  isModalOpen: boolean;
  onCancel: () => void;
  id: number | undefined;
  sizeDetail: SizeModel | null;
  [key: string]: unknown;
}

interface InitialValuesModels {
  name?: string | null;
}

const ModalUpdateSize = (props: ModalUpdateSizeProps) => {
  const { onCancel, isModalOpen, id, sizeDetail } = props;

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const initialValues: InitialValuesModels = {
    name: sizeDetail?.name,
  };

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: InitialValuesModels) => {
    try {
      const res = await updateSizeApi(values, id);
      if (res) {
        dispatch(incrementCountSize());
        dispatch(
          openNotification({
            message: 'Update Size Success!',
            description: 'You have successfully updated the Size!',
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
        title="Update Size"
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

export default ModalUpdateSize;
