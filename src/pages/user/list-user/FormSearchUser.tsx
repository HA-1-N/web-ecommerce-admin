import DateForm from '@/components/form/DateForm';
import InputForm from '@/components/form/InputForm';
import SelectForm from '@/components/form/SelectForm';
import { OptionGender } from '@/constants/user.constant';
import { FilterUserModel } from '@/model/user.model';
import { formatDate } from '@/utils/date.util';
import { Button, Col, DatePicker, Form, Row } from 'antd';
import dayjs from 'dayjs';
// import dayjs from ""
import React from 'react';

interface FormSearchUserModel {
  getUserFilter: (values: FilterUserModel) => void;
  [key: string]: unknown;
}

const FormSearchUser = (props: FormSearchUserModel) => {
  const { getUserFilter } = props;

  const initialFilterValues: FilterUserModel = {
    name: '',
    email: '',
    gender: '',
    phone: '',
    dateOfBirth: '',
  };

  const buildBody = (values: FilterUserModel) => {
    const formatDateOfBirth = formatDate(values?.dateOfBirth, 'YYYY-MM-DD');
    const body = {
      ...values,
      name: values?.name ? values?.name : null,
      email: values?.email ? values?.email : null,
      gender: values?.gender ? values?.gender : null,
      phone: values?.phone ? values?.phone : null,
      dateOfBirth: formatDateOfBirth,
    };
    return body;
  };

  const onFinish = async (values: FilterUserModel) => {
    const body = buildBody(values);
    getUserFilter(body);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    const body = buildBody(initialFilterValues);
    getUserFilter(body);
  };

  return (
    <>
      <div className="my-4">
        <Form
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 32 }}
          style={{ maxWidth: '100%' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          colon={false}
          layout="vertical"
          initialValues={initialFilterValues}
        >
          <Row gutter={[16, 4]}>
            <Col span={8}>
              <InputForm label="Name" placeholder="Enter Name" name="name" />
            </Col>
            <Col span={8}>
              <InputForm label="Email" placeholder="Enter Email" name="email" />
            </Col>
            <Col span={8}>
              <SelectForm label="Gender" name="gender" placeholder="Select gender" options={OptionGender} />
            </Col>

            <Col span={8}>
              <InputForm label="Phone" placeholder="Enter Phone" name="phone" />
            </Col>

            <Col span={8}>
              <DateForm label="Date Of Birth" name="dateOfBirth" format="DD-MM-YYYY" />
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <div className="flex items-center justify-center mt-4">
              <Button type="primary" size="large" htmlType="submit" className="w-32">
                Submit
              </Button>

              <Button htmlType="reset" size="large" className="ml-2 w-32" onClick={onReset}>
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormSearchUser;
