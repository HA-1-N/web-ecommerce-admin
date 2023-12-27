import { CreateProductModels, ProductModels } from '@/model/product.model';
import React from 'react';
import { Button, Col, Form, Modal, Row, Upload, UploadFile, UploadProps } from 'antd';
import InputForm from '@/components/form/InputForm';
import TextAreaForm from '@/components/form/TextAreaForm';
import SelectForm from '@/components/form/SelectForm';

interface FormUpdateProductProps {
  productDetail: ProductModels | null;
}

const FormUpdateProduct = (props: FormUpdateProductProps) => {
  const { productDetail } = props;

  const initialValues = {
    name: productDetail?.name,
    price: productDetail?.price,
    description: productDetail?.description,
    brandId: productDetail?.brand?.id,
    categoryId: productDetail?.category?.id,
  };

  const onFinish = async (values: CreateProductModels) => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    // form.resetFields();
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
            <Col span={12}>
              <InputForm
                label="Name"
                placeholder="Enter Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <InputForm
                label="Price"
                placeholder="Enter Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please input your price!',
                  },
                ]}
              />
            </Col>
            <Col span={24}>
              <TextAreaForm
                name="description"
                label="Description"
                placeholder="Enter description"
                showCount
                maxLength={500}
              />
            </Col>

            <Col span={12}>
              <SelectForm
                showSearch
                optionFilterProp="children"
                label="Brand"
                placeholder="Select Brand"
                name="brandId"
                allowClear
                // options={optionBrand}
                // filterOption={filterOption}
                rules={[{ required: true, message: 'Please select brand!' }]}
              />
            </Col>

            <Col span={12}>
              <SelectForm
                showSearch
                optionFilterProp="children"
                label="Category"
                placeholder="Select Category"
                name="categoryId"
                // options={optionCategory}
                // filterOption={filterOption}
                allowClear
                rules={[{ required: true, message: 'Please select category!' }]}
              />
            </Col>

            <Col span={24}>
              <Form.Item
                name="image"
                label="Upload image"
                valuePropName="fileList"
                // getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  //   fileList={fileList}
                  //   onPreview={handlePreview}
                  //   onChange={handleChange}
                  multiple
                >
                  {/* {fileList.length >= 8 ? null : uploadButton} */}
                </Upload>
              </Form.Item>
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

export default FormUpdateProduct;
