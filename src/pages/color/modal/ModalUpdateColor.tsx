import { updateColorApi } from '@/api/color.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { incrementCountColor } from '@/features/color/color.slice';
import { openNotification } from '@/features/counter/counterSlice';
import { ColorModels } from '@/model/color.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, ColorPicker, Form, Modal, Row } from 'antd';
import { Color } from 'antd/es/color-picker';
import React, { useRef } from 'react';

interface ModalUpdateColorProps {
  isModalOpen: boolean;
  onCancel: () => void;
  id: number | undefined;
  colorDetail: ColorModels | null;
  [key: string]: unknown;
}

const ModalUpdateColor = (props: ModalUpdateColorProps) => {
  const { isModalOpen, onCancel, colorDetail, id } = props;

  const initialValues: ColorModels = {
    name: colorDetail?.name,
    code: colorDetail?.code,
  };

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: ColorModels) => {
    const getCode = typeof values?.code === 'string' ? values?.code : (values?.code as Color);
    const formatCode = typeof getCode === 'string' ? getCode.toString() : getCode?.toHexString();
    const newValues = {
      ...values,
      id: id,
      code: formatCode,
    };
    try {
      const res = await updateColorApi(newValues);
      if (res) {
        dispatch(incrementCountColor());
        dispatch(
          openNotification({
            message: 'Update Color Success!',
            description: 'You have successfully updated the Color!',
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
        title="Update Color"
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
                <Form.Item name="code" label="Color code" rules={[{ required: true, message: 'Color is required!' }]}>
                  <ColorPicker showText format={'hex'} />
                </Form.Item>
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

export default ModalUpdateColor;
