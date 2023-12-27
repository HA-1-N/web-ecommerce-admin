import SelectForm from '@/components/form/SelectForm';
import { OptionsStatusProduct } from '@/constants/product.constant';
import { filterOption } from '@/utils/form.util';
import { Col, Form, Row } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useState } from 'react';

const FormSearchProductQuantity = () => {
  const initialValues = {};

  const [optionProduct, setOptionProduct] = useState<DefaultOptionType[]>([]);
  const [optionSize, setOptionSize] = useState<DefaultOptionType[]>([]);
  const [optionColor, setOptionColor] = useState<DefaultOptionType[]>([]);

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
                // options={optionBrand}
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
                // options={optionBrand}
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
                // options={optionBrand}
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
        </Form>
      </div>
    </>
  );
};

export default FormSearchProductQuantity;
