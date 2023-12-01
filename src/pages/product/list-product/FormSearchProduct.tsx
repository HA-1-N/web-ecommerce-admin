import { getAllCategoryApi } from '@/api/category.api';
import { filterProductApi } from '@/api/product.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import SelectForm from '@/components/form/SelectForm';
import { OptionsStatusProduct } from '@/constants/product.constant';
import { openNotification } from '@/features/counter/counterSlice';
import { CategoryModels } from '@/model/category.model';
import { FilterProductModels } from '@/model/product.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Row } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';

const FormSearchProduct = () => {
  const initialValues: FilterProductModels = {
    name: null,
    status: null,
    brandId: null,
    categoryId: null,
    colorId: null,
    sizeId: null,
    maxPrice: null,
    minPrice: null,
  };

  const dispatch = useAppDispatch();

  const [optionCategory, setOptionCategory] = useState<DefaultOptionType[]>([]);

  const getAllCategory = async () => {
    try {
      const res = await getAllCategoryApi();
      const newData: DefaultOptionType[] = res?.data?.map((item: CategoryModels) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOptionCategory(newData);
    } catch (error) {
      dispatch(
        openNotification({
          type: 'error',
          message: getMsgErrorApi(error),
        }),
      );
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const buildBody = (values: FilterProductModels) => {
    const body = {
      ...values,
      name: values?.name ? values?.name : null,
      status: values?.status ? values?.status : null,
      brandId: values?.brandId ? values?.brandId : null,
      categoryId: values?.categoryId ? values?.categoryId : null,
      colorId: values?.colorId ? values?.colorId : null,
      sizeId: values?.sizeId ? values?.sizeId : null,
      maxPrice: values?.maxPrice ? values?.maxPrice : null,
      minPrice: values?.minPrice ? values?.minPrice : null,
    };
    return body;
  };

  const onFinish = async (values: FilterProductModels) => {
    console.log('values...', values);
    const params = {
      page: 0,
      size: 10,
    };
    const body = buildBody(values);
    filterProductApi(body, params).then((res) => {
      console.log('res...', res);
    });
  };

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
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <InputForm label="Name" placeholder="Enter Name" name="name" />
            </Col>

            <Col span={6}>
              <SelectForm label="Status" placeholder="Select Status" name="status" options={OptionsStatusProduct} />
            </Col>

            <Col span={6}>
              <SelectForm
                label="Category"
                placeholder="Select Category"
                name="categoryId"
                options={optionCategory}
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

export default FormSearchProduct;
