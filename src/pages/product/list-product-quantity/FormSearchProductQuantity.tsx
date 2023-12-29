import { useAppDispatch, useAppSelector } from '@/app/hook';
import SelectForm from '@/components/form/SelectForm';
import { OptionsStatusProduct } from '@/constants/product.constant';
import { getOptionColorAsync } from '@/features/color/color.slice';
import { getOptionProductAsync } from '@/features/product/product.slice';
import { getOptionSizeAsync } from '@/features/size/size.slice';
import { filterOption } from '@/utils/form.util';
import { Button, Col, Form, Row } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';

const FormSearchProductQuantity = () => {
  const initialValues = {};

  const dispatch = useAppDispatch();

  const optionColor = useAppSelector((state) => state?.color?.optionColor);
  const optionSize = useAppSelector((state) => state?.size?.optionSize);
  const optionProduct = useAppSelector((state) => state?.product?.optionProduct);

  useEffect(() => {
    dispatch(getOptionColorAsync());
    dispatch(getOptionSizeAsync());
    dispatch(getOptionProductAsync());
  }, []);

  const onFinish = async (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = async () => {};

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
          <Row gutter={[16, 8]}>
            <Col span={6}>
              <SelectForm
                filterOption={filterOption}
                showSearch
                label="Product"
                placeholder="Select Product"
                name="productId"
                allowClear
                options={optionProduct}
              />
            </Col>
            <Col span={6}>
              <SelectForm
                filterOption={filterOption}
                showSearch
                label="Color"
                placeholder="Select Color"
                name="colorId"
                allowClear
                options={optionColor}
              />
            </Col>
            <Col span={6}>
              <SelectForm
                filterOption={filterOption}
                showSearch
                label="Size"
                placeholder="Select Size"
                name="size"
                allowClear
                options={optionSize}
              />
            </Col>
            <Col span={6}>
              <SelectForm
                label="Status"
                placeholder="Select Status"
                name="status"
                options={OptionsStatusProduct}
                allowClear
              />
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

export default FormSearchProductQuantity;
