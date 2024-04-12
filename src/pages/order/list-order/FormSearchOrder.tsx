import { useAppDispatch, useAppSelector } from '@/app/hook';
import DateForm from '@/components/form/DateForm';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { changeFormSearch, changePageSearch, filterOrderAsync } from '@/features/order/order.slice';
import { OrderModels } from '@/model/order.model';
import { ParamsModel } from '@/model/page.model';
import { formatDate } from '@/utils/date.util';
import { Button, Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';

const FormSearchOrder = () => {
  const initialValues: OrderModels = {
    orderDate: '',
  };

  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state?.order?.pageSearch);
  const formSearch = useAppSelector((state) => state?.order?.formSearch);
  const countOrder = useAppSelector((state) => state.order?.countOrder);

  const params: ParamsModel = {
    page: page - 1,
    size: DEFAULT_PAGE_SIZE,
  };

  useEffect(() => {
    dispatch(filterOrderAsync({ body: formSearch, params }));
  }, [page, dispatch, countOrder]);

  const onFinish = async (values: OrderModels) => {
    // console.log('onFinish', values);

    const formatOrderDate = values?.orderDate ? formatDate(values?.orderDate, 'YYYY-MM-DD') : null;
    const newValues: OrderModels = {
      ...values,
      orderDate: formatOrderDate,
    };

    dispatch(changeFormSearch(newValues));
    if (page === 1) {
      await dispatch(filterOrderAsync({ body: newValues, params }));
    } else {
      dispatch(changePageSearch(1));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = async () => {
    dispatch(changeFormSearch(initialValues));
    await dispatch(filterOrderAsync({ body: initialValues, params }));
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
              <DateForm label="Order Date" name="orderDate" format="DD-MM-YYYY" />
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

export default FormSearchOrder;
