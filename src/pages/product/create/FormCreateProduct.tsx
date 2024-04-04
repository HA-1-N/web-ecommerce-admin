import { getAllBrandApi } from '@/api/brand.api';
import { getAllCategoryApi } from '@/api/category.api';
import { useAppDispatch, useAppSelector } from '@/app/hook';
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
import { getOptionCategoryAsync } from '@/features/category/category.slice';
import { getOptionBrandAsync } from '@/features/brand/brand.slice';

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

  const optionCategory = useAppSelector((state) => state?.category?.optionCategory);
  const optionBrand = useAppSelector((state) => state?.brand?.optionBrand);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const getAllCategory = async () => {
    dispatch(getOptionCategoryAsync());
  };

  const getAllBrand = async () => {
    dispatch(getOptionBrandAsync());
  };

  useEffect(() => {
    getAllBrand();
    getAllCategory();
  }, [dispatch]);

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

  const checkImageSizeAndRatio = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = window.URL.createObjectURL(file);

      image.onload = () => {
        // Kiểm tra kích thước
        if (file.size / 1024 / 1024 > 5) {
          // Thông báo khi hình ảnh quá lớn
          dispatch(
            openNotification({
              type: 'error',
              message: 'Hình ảnh phải nhỏ hơn 5Mb',
            }),
          );
          reject('Hình ảnh quá lớn');
        } else {
          resolve();
        }
      };

      image.onerror = () => {
        // Thông báo khi không thể đọc hình ảnh
        dispatch(
          openNotification({
            type: 'error',
            message: 'Không thể đọc hình ảnh',
          }),
        );
        reject('Không thể đọc hình ảnh');
      };
    });
  };

  const dummyRequest = (props: any) => {
    const { file, onSuccess } = props;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
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
                  // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  multiple
                  beforeUpload={checkImageSizeAndRatio}
                  accept="image/*"
                  customRequest={dummyRequest}
                  maxCount={2}
                >
                  {fileList.length >= 2 ? null : uploadButton}
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
