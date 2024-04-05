import { getAllBrandApi } from '@/api/brand.api';
import { getAllCategoryApi } from '@/api/category.api';
import { getAllColorApi } from '@/api/color.api';
import { filterProductApi } from '@/api/product.api';
import { getAllSizeApi } from '@/api/size.api';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import SelectForm from '@/components/form/SelectForm';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { OptionsStatusProduct } from '@/constants/product.constant';
import { getOptionBrandAsync } from '@/features/brand/brand.slice';
import { getOptionCategoryAsync } from '@/features/category/category.slice';
import { getOptionColorAsync } from '@/features/color/color.slice';
import { openNotification } from '@/features/counter/counterSlice';
import { getOptionSizeAsync } from '@/features/size/size.slice';
import { CategoryModels } from '@/model/category.model';
import { ParamsModel } from '@/model/page.model';
import { FilterProductModels } from '@/model/product.model';
import { filterOption, getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Row } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';

interface FormSearchProductProps {
  getProductFilter: (values: FilterProductModels, params: ParamsModel) => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const FormSearchProduct = (props: FormSearchProductProps) => {
  const { getProductFilter, page, setPage } = props;

  const initialValues: FilterProductModels = {
    name: null,
    status: null,
    brandId: null,
    categoryId: null,
    colorId: [],
    sizeId: [],
    maxPrice: null,
    minPrice: null,
  };

  const dispatch = useAppDispatch();
  const optionSize = useAppSelector((state) => state?.size?.optionSize);
  const optionColor = useAppSelector((state) => state?.color?.optionColor);
  const optionBrand = useAppSelector((state) => state?.brand?.optionBrand);
  const optionCategory = useAppSelector((state) => state?.category?.optionCategory);

  const getAllCategory = async () => {
    dispatch(getOptionCategoryAsync());
  };

  const getAllBrand = async () => {
    dispatch(getOptionBrandAsync());
  };

  const getAllColor = async () => {
    dispatch(getOptionColorAsync());
  };

  const getAllSize = async () => {
    dispatch(getOptionSizeAsync());
  };

  useEffect(() => {
    getAllCategory();
    getAllBrand();
    getAllColor();
    getAllSize();
  }, [dispatch]);

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
    const params = {
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    };
    const body = buildBody(values);
    getProductFilter(body, params);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = async () => {
    const body = buildBody(initialValues);
    const params = {
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    };
    getProductFilter(body, params);
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
          <Row gutter={[16, 8]}>
            <Col span={6}>
              <InputForm label="Name" placeholder="Enter Name" name="name" />
            </Col>

            <Col span={6}>
              <SelectForm
                filterOption={filterOption}
                showSearch
                label="Brand"
                placeholder="Select Brand"
                name="brandId"
                allowClear
                options={optionBrand}
              />
            </Col>

            <Col span={6}>
              <SelectForm
                label="Category"
                placeholder="Select Category"
                name="categoryId"
                options={optionCategory}
                allowClear
                filterOption={filterOption}
                showSearch
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

            <Col span={6}>
              <SelectForm
                label="Color"
                placeholder="Select Color"
                name="colorId"
                allowClear
                options={optionColor}
                mode="multiple"
                filterOption={filterOption}
                showSearch
              />
            </Col>

            <Col span={6}>
              <SelectForm
                label="Size"
                placeholder="Select Size"
                name="sizeId"
                allowClear
                options={optionSize}
                mode="multiple"
                filterOption={filterOption}
                showSearch
              />
            </Col>

            <Col span={6}>
              <InputForm label="Min Price" placeholder="Enter Min Price" name="minPrice" />
            </Col>

            <Col span={6}>
              <InputForm label="Max Price" placeholder="Enter Max Price" name="maxPrice" />
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
