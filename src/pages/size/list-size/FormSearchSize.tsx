import { useAppDispatch, useAppSelector } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { changeFormSearch, changePageSearch, filterSizeAsync } from '@/features/size/size.slice';
import { ParamsModel } from '@/model/page.model';
import { SizeModel } from '@/model/size.model';
import { Button, Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';

const FormSearchSize = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.size.pageSearch);

  const initialValues: SizeModel = {
    name: '',
  };

  const params: ParamsModel = {
    page: page - 1,
    size: DEFAULT_PAGE_SIZE,
  };

  useEffect(() => {
    dispatch(filterSizeAsync({ body: initialValues, params }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onFinish = async (values: SizeModel) => {
    await dispatch(changeFormSearch(values));
    if (page === 1) {
      await dispatch(filterSizeAsync({ body: values, params }));
    } else {
      dispatch(changePageSearch(1));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = async () => {
    dispatch(changeFormSearch(initialValues));
    await dispatch(filterSizeAsync({ body: initialValues, params }));
    dispatch(changePageSearch(1));
  };

  return (
    <>
      <div className="mt-4">
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
          initialValues={initialValues}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <InputForm label="Name" placeholder="Enter Name" name="name" />
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

export default FormSearchSize;
