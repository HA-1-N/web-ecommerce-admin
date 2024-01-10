import { useAppDispatch, useAppSelector } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { changeFormSearch, changePageSearch, filterColorAsync } from '@/features/color/color.slice';
import { ColorModels } from '@/model/color.model';
import { ParamsModel } from '@/model/page.model';
import { Button, Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';

const FormSearchColor = () => {
  const initialValues: ColorModels = {
    name: '',
    code: '',
  };

  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state?.color?.pageSearch);
  const formSearch = useAppSelector((state) => state?.color?.formSearch);
  const countColor = useAppSelector((state) => state.color?.countColor);

  const params: ParamsModel = {
    page: page - 1,
    size: DEFAULT_PAGE_SIZE,
  };

  useEffect(() => {
    dispatch(filterColorAsync({ body: formSearch, params }));
  }, [page, dispatch, countColor]);

  const onFinish = async (values: ColorModels) => {
    dispatch(changeFormSearch(values));
    if (page === 1) {
      await dispatch(filterColorAsync({ body: values, params }));
    } else {
      dispatch(changePageSearch(1));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = async () => {
    dispatch(changeFormSearch(initialValues));
    await dispatch(filterColorAsync({ body: initialValues, params }));
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

            <Col span={8}>
              <InputForm label="Code" placeholder="Enter code" name="code" />
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

export default FormSearchColor;
