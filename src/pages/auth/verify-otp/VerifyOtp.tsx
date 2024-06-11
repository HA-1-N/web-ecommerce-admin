import { verifyOtpApi } from '@/api/auth.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Form } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const onFinish = async (values: any) => {
    const newValues = {
      email: email ? email : '',
      otp: values?.otp,
    };

    try {
      const res = await verifyOtpApi(newValues);
      if (res) {
        navigation('/reset-password', {
          state: { email: email },
        });
        dispatch(
          openNotification({
            type: 'success',
            message: res?.data,
            description: 'Success',
          }),
        );
      }
    } catch (error) {
      dispatch(
        openNotification({
          type: 'error',
          message: getMsgErrorApi(error),
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
              <h1 className="text-2xl font-bold text-center my-3">Verify OTP</h1>
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
                  name="otp"
                  label="OTP"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your OTP!',
                    },
                  ]}
                  placeholder="Enter OTP"
                />
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-full">
                    Verify OTP
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

export default VerifyOtp;
