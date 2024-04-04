import { getAllColorApi } from '@/api/color.api';
import { getAllIdNameProductApi, getProductCategoryByIdApi, updateProductQuantityApi } from '@/api/product.api';
import { getAllSizeApi } from '@/api/size.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import SelectForm from '@/components/form/SelectForm';
import { openNotification } from '@/features/counter/counterSlice';
import { ColorModels } from '@/model/color.model';
import {
  ProductIdNameModels,
  ProductImageModels,
  ProductQuantityModels,
  UpdateProductQuantityModels,
} from '@/model/product.model';
import { SizeModel } from '@/model/size.model';
import { filterOption, getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row, Upload, UploadFile } from 'antd';
import { DefaultOptionType } from 'antd/es/cascader';
import { RcFile, UploadProps } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

interface FormUpdateProductQuantityProps {
  productQuantityDetail: ProductQuantityModels | null;
  id: number;
}

const FormUpdateProductQuantity = (props: FormUpdateProductQuantityProps) => {
  const { id, productQuantityDetail } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const getProductQuantityImageIds = productQuantityDetail?.productQuantityImages?.map(
    (item: ProductQuantityModels) => item.id,
  );

  const getStatus = productQuantityDetail?.status;

  const initialValues: UpdateProductQuantityModels = {
    productId: productQuantityDetail?.product?.id,
    colorId: productQuantityDetail?.color?.id,
    sizeId: productQuantityDetail?.size?.id,
    quantity: productQuantityDetail?.quantity,
    image: productQuantityDetail?.productQuantityImages || [],
  };

  const [optionProductDetails, setOptionProductDetails] = useState<DefaultOptionType[]>([]);
  const [optionColorDetails, setOptionColorDetails] = useState<DefaultOptionType[]>([]);
  const [optionSizeDetails, setOptionSizeDetails] = useState<DefaultOptionType[]>([]);

  const [fileList, setFileList] = useState<UploadFile[]>(productQuantityDetail?.productQuantityImages);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const getAllProductDetail = async () => {
    try {
      const res = await getAllIdNameProductApi();
      const newData: DefaultOptionType[] = res?.data?.map((item: ProductIdNameModels) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOptionProductDetails(newData);
    } catch (error) {
      dispatch(
        openNotification({
          type: 'error',
          message: getMsgErrorApi(error),
        }),
      );
    }
  };

  const getAllSize = async () => {
    try {
      const res = await getAllSizeApi();
      const newData: DefaultOptionType[] = res?.data?.map((item: SizeModel) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOptionSizeDetails(newData);
    } catch (error) {
      dispatch(
        openNotification({
          type: 'error',
          message: getMsgErrorApi(error),
        }),
      );
    }
  };

  const getAllColor = async () => {
    try {
      const res = await getAllColorApi();
      const newData: DefaultOptionType[] = res?.data?.map((item: ColorModels) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOptionColorDetails(newData);
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
    getAllProductDetail();
    getAllSize();
    getAllColor();
  }, []);

  const buildBodyUpdate = (values: UpdateProductQuantityModels) => {
    const filterProductQuantityImageId = values?.image
      ?.filter((item: ProductImageModels) => {
        if (item?.id) {
          return getProductQuantityImageIds?.includes(item?.id);
        }
      })
      ?.map((item: ProductImageModels) => item?.id);

    const listIdImageDelete = getProductQuantityImageIds?.filter(
      (item: number | undefined) => !filterProductQuantityImageId?.includes(item),
    );

    const newValues = {
      id: id,
      productId: values.productId,
      colorId: values.colorId,
      sizeId: values.sizeId,
      quantity: values.quantity,
      status: getStatus,
      productQuantityDeleteImageIds: listIdImageDelete,
    };

    return newValues;
  };

  const onFinish = (values: UpdateProductQuantityModels) => {
    const formData = new FormData();
    const body = buildBodyUpdate(values);
    const checkOriginFileObj = values?.image?.map((item: UploadFile) => (item?.originFileObj ? true : false));

    formData.append('data', new Blob([JSON.stringify(body)], { type: 'application/json' }));

    if (checkOriginFileObj?.includes(true)) {
      values?.image?.forEach((file: ProductImageModels) => {
        if (file?.originFileObj) {
          formData.append('files', file?.originFileObj as Blob);
        }
      });
    }

    updateProductQuantityApi(formData)
      .then((res) => {
        if (res?.status === 200) {
          dispatch(
            openNotification({
              type: 'success',
              message: 'Cập nhật thành công',
            }),
          );
          navigate('/product/list-product-quantity');
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
    setFileList(productQuantityDetail?.productQuantityImages);
    form.resetFields();
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const checkImageSizeAndRatio = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = window.URL.createObjectURL(file);

      image.onload = () => {
        // Kiểm tra kích thước max 5mb
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

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    form.setFieldValue('image', newFileList);
    setFileList(newFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewOpen(false);

  const normFile = (e: any) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const dummyRequest = (props: any) => {
    const { file, onSuccess } = props;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
              <SelectForm
                showSearch
                optionFilterProp="children"
                label="Product"
                placeholder="Select Product"
                name="productId"
                allowClear
                options={optionProductDetails}
                filterOption={filterOption}
                rules={[{ required: true, message: 'Please select brand!' }]}
              />
            </Col>

            <Col span={12}>
              <SelectForm
                showSearch
                optionFilterProp="children"
                label="Color"
                placeholder="Select Color"
                name="colorId"
                allowClear
                options={optionColorDetails}
                filterOption={filterOption}
                rules={[{ required: true, message: 'Please select brand!' }]}
              />
            </Col>

            <Col span={12}>
              <SelectForm
                showSearch
                optionFilterProp="children"
                label="Size"
                placeholder="Select Size"
                name="sizeId"
                allowClear
                options={optionSizeDetails}
                filterOption={filterOption}
                rules={[{ required: true, message: 'Please select brand!' }]}
              />
            </Col>

            <Col span={12}>
              <InputForm
                label="Quantity"
                placeholder="Enter Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please input your quantity!',
                  },
                ]}
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
                  maxCount={8}
                >
                  {fileList.length >= 8 ? null : uploadButton}
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

export default FormUpdateProductQuantity;
