import { getAllColorApi } from '@/api/color.api';
import { createProductQuantityApi, getAllIdNameProductApi } from '@/api/product.api';
import { getAllSizeApi } from '@/api/size.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import SelectForm from '@/components/form/SelectForm';
import { openNotification } from '@/features/counter/counterSlice';
import { ColorModels } from '@/model/color.model';
import { ProductIdNameModels, CreateProductQuantityModels } from '@/model/product.model';
import { SizeModel } from '@/model/size.model';
import { filterOption, getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row, Upload, UploadFile } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { RcFile, UploadProps } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const FormCreateProductQuantity = () => {
  const initialValues = {
    productId: null,
    colorId: null,
    sizeId: null,
    quantity: null,
    image: [],
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [optionProductDetails, setOptionProductDetails] = useState<DefaultOptionType[]>([]);
  const [optionColorDetails, setOptionColorDetails] = useState<DefaultOptionType[]>([]);
  const [optionSizeDetails, setOptionSizeDetails] = useState<DefaultOptionType[]>([]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
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

  const buildBody = (values: CreateProductQuantityModels) => {
    const newValues = {
      productId: values?.productId,
      colorId: values?.colorId,
      sizeId: values?.sizeId,
      quantity: values?.quantity ? Number(values?.quantity) : null,
      status: 1,
    };
    return newValues;
  };

  const onFinish = async (values: CreateProductQuantityModels) => {
    console.log('values...', values);
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

    createProductQuantityApi(formData)
      .then((res) => {
        if (res?.status) {
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
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  multiple
                  maxCount={8}
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

export default FormCreateProductQuantity;
