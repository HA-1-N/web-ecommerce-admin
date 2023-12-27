import { getAllBrandApi } from '@/api/brand.api';
import { getAllCategoryApi } from '@/api/category.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import SelectForm from '@/components/form/SelectForm';
import TextAreaForm from '@/components/form/TextAreaForm';
import { openNotification } from '@/features/counter/counterSlice';
import { CategoryModels } from '@/model/category.model';
import { filterOption, getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row, Upload, UploadFile, UploadProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { CreateProductModels } from '@/model/product.model';
import { createProductApi } from '@/api/product.api';
import { useNavigate } from 'react-router-dom';

const FormCreateProduct = () => {
  const initialValues: CreateProductModels = {
    name: '',
    price: '',
    description: '',
    brandId: null,
    categoryId: null,
    image: [],
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [optionCategory, setOptionCategory] = useState<DefaultOptionType[]>([]);
  const [optionBrand, setOptionBrand] = useState<DefaultOptionType[]>([]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // console.log('fileList', fileList);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

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

  const getAllBrand = async () => {
    try {
      const res = await getAllBrandApi();
      const newData: DefaultOptionType[] = res?.data?.map((item: CategoryModels) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOptionBrand(newData);
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
    getAllBrand();
    getAllCategory();
  }, []);

  const buildBody = (values: CreateProductModels) => {
    const newValues = {
      name: values?.name,
      brandId: values?.brandId,
      categoryId: values?.categoryId,
      description: values?.description,
      price: values?.price ? Number(values?.price) : null,
      status: 1,
    };
    return newValues;
  };

  const onFinish = async (values: CreateProductModels) => {
    const formData = new FormData();
    const body = buildBody(values);
    formData.append(
      'data',
      new Blob([JSON.stringify(body)], {
        type: 'application/json',
      }),
    );

    fileList.forEach((file) => {
      formData.append('files', file.originFileObj as Blob);
    });

    createProductApi(formData)
      .then((res) => {
        // console.log('res...', res);
        navigate('/product/list-product');
      })
      .catch((err) => {
        dispatch(
          openNotification({
            type: 'error',
            message: getMsgErrorApi(err),
          }),
        );
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    setFileList([]);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const normFile = (e: any) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
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
                options={optionBrand}
                filterOption={filterOption}
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
                options={optionCategory}
                filterOption={filterOption}
                allowClear
                rules={[{ required: true, message: 'Please select category!' }]}
              />
            </Col>

            <Col span={24}>
              <Form.Item
                name="image"
                label="Upload image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  multiple
                >
                  {fileList.length >= 8 ? null : uploadButton}
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

export default FormCreateProduct;
