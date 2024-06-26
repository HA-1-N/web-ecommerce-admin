import React from 'react';
import { verifyEmailApi } from '@/api/auth.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { openNotification } from '@/features/counter/counterSlice';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ValuesProps {
  email: string;
}

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: ValuesProps) => {
    const params = {
      email: values?.email,
    };
    try {
      const res = await verifyEmailApi(params);
      if (res) {
        navigate('/verify-otp', {
          state: { email: values?.email },
        });
      } else {
        dispatch(
          openNotification({
            type: 'error',
            message: 'Email không tồn tại',
            description: 'Error',
          }),
        );
      }
    } catch (error: any) {
      console.log('error...', error);
      dispatch(
        openNotification({
          type: 'error',
          message: error.message,
          description: 'Error',
        }),
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="h-full flex items-center justify-center min-h-screen">
        <div
          className="bg-white rounded shadow-lg sm:w-4/5 lg:w-3/5 md:w-2/3 xl:w-2/5 max-sm:w-4/5"
          style={{ maxWidth: '600px' }}
        >
          <div className="container">
            <div>
              <h1 className="text-2xl font-bold text-center my-3">Verify Email</h1>
            </div>
            <div className="p-3">
              <Form
                name="basic"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 32 }}
                style={{ maxWidth: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                colon={false}
                layout="vertical"
              >
                <InputForm
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                  placeholder="Enter Email"
                />
                <Form.Item>
                  <Button type="primary" className="w-full mt-3" htmlType="submit">
                    Verify
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
