import { useAppDispatch, useAppSelector } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { changePageSearch, filterOrderStatusAsync } from '@/features/order-status/order-status.slice';
import { changeFormSearch } from '@/features/size/size.slice';
import { OrderStatusModels } from '@/model/order-status.model';
import { ParamsModel } from '@/model/page.model';
import { Button, Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';

const FormSearchOrderStatus = () => {
  const initialValues: OrderStatusModels = {
    status: '',
  };

  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state?.orderStatus?.pageSearch);
  const formSearch = useAppSelector((state) => state?.orderStatus?.formSearch);
  const countOrderStatus = useAppSelector((state) => state.orderStatus?.countOrderStatus);

  const params: ParamsModel = {
    page: page - 1,
    size: DEFAULT_PAGE_SIZE,
  };

  useEffect(() => {
    dispatch(filterOrderStatusAsync({ body: formSearch, params }));
  }, [page, dispatch, countOrderStatus]);

  const onFinish = async (values: OrderStatusModels) => {
    dispatch(changeFormSearch(values));
    if (page === 1) {
      await dispatch(filterOrderStatusAsync({ body: values, params }));
    } else {
      dispatch(changePageSearch(1));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = async () => {
    dispatch(changeFormSearch(initialValues));
    await dispatch(filterOrderStatusAsync({ body: initialValues, params }));
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
              <InputForm label="Status" placeholder="Enter Status" name="status" />
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

export default FormSearchOrderStatus;
