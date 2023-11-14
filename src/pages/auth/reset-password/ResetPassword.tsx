import { resetPasswordApi } from '@/api/auth.api';
import { useAppDispatch } from '@/app/hook';
import { openNotification } from '@/features/counter/counterSlice';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('values...', values);
    const body = {
      email: values.email,
      password: values.password,
    };
    resetPasswordApi(body)
      .then((res) => {
        if (!!res && res?.status === 200) {
          navigate('/login');
          dispatch(
            openNotification({
              message: res?.data,
              description: 'Please login with your new password!',
              type: 'success',
            }),
          );
        }
      })
      .catch((err) => {
        console.log('err...', err);
        dispatch(
          openNotification({
            type: 'error',
            message: err.message,
            description: 'Error',
          }),
        );
      });
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
              <h1 className="text-2xl font-bold text-center my-3">Reset Password</h1>
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
                <Form.Item
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
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="New password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" className="w-full mt-3" htmlType="submit">
                    Submit
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

export default ResetPassword;
