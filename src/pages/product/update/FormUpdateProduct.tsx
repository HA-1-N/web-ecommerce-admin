import { CreateProductModels, ProductImageModels, ProductModels, UpdateProductModels } from '@/model/product.model';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Upload, UploadFile, UploadProps } from 'antd';
import InputForm from '@/components/form/InputForm';
import TextAreaForm from '@/components/form/TextAreaForm';
import SelectForm from '@/components/form/SelectForm';
import { filterOption, getMsgErrorApi } from '@/utils/form.util';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { openNotification } from '@/features/counter/counterSlice';
import { RcFile } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { getOptionBrandAsync } from '@/features/brand/brand.slice';
import { getOptionCategoryAsync } from '@/features/category/category.slice';
import { updateProductApi } from '@/api/product.api';
import { useNavigate } from 'react-router-dom';

interface FormUpdateProductProps {
  productDetail: ProductModels | null;
  id: number;
}

const FormUpdateProduct = (props: FormUpdateProductProps) => {
  const { productDetail, id } = props;

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const optionBrand = useAppSelector((state) => state.brand?.optionBrand);
  const optionCategory = useAppSelector((state) => state.category?.optionCategory);

  const getListImageProductId = productDetail?.productImages?.map((item: ProductImageModels) => item?.id);
  const getStatus = productDetail?.status;

  const initialValues = {
    name: productDetail?.name,
    price: productDetail?.price,
    description: productDetail?.description,
    brandId: productDetail?.brand?.id,
    categoryId: productDetail?.category?.id,
    image: productDetail?.productImages,
  };

  const [fileList, setFileList] = useState<UploadFile[] | any>(productDetail?.productImages);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const getAllBrand = async () => {
    dispatch(getOptionBrandAsync());
  };

  const getAllCategory = async () => {
    dispatch(getOptionCategoryAsync());
  };

  useEffect(() => {
    getAllBrand();
    getAllCategory();
  }, []);

  const buildBodyUpdate = (values: UpdateProductModels) => {
    const filterProductImageId = values?.image
      ?.filter((item: ProductImageModels) => {
        if (item?.id) {
          return getListImageProductId?.includes(item?.id);
        }
      })
      ?.map((item: ProductImageModels) => item?.id);

    const productDeleteImageIds = getListImageProductId?.filter(
      (item: number | undefined) => !filterProductImageId?.includes(item),
    );

    const newValues = {
      id: id,
      name: values?.name,
      price: values?.price,
      description: values?.description,
      brandId: values?.brandId,
      categoryId: values?.categoryId,
      status: getStatus,
      productDeleteImageIds: productDeleteImageIds,
    };

    return newValues;
  };

  const onFinish = async (values: UpdateProductModels) => {
    // console.log('Success:', values);
    const formData = new FormData();
    const body = buildBodyUpdate(values);
    const checkOriginFileObj = values?.image?.map((item: ProductImageModels) => (item?.originFileObj ? true : false));

    formData.append(
      'data',
      new Blob([JSON.stringify(body)], {
        type: 'application/json',
      }),
    );

    if (checkOriginFileObj?.includes(true)) {
      values?.image?.forEach((file: ProductImageModels) => {
        if (file?.originFileObj) {
          formData.append('files', file?.originFileObj as Blob);
        }
      });
    }

    updateProductApi(formData)
      .then((res) => {
        if (res) {
          dispatch(
            openNotification({
              type: 'success',
              message: 'Update product success!',
            }),
          );
          navigate('/product/list-product');
        }
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
    setFileList(productDetail?.productImages);
    form.resetFields();
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

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    form.setFieldValue('image', newFileList);
    setFileList(newFileList);
  };

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
          form={form}
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
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
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
