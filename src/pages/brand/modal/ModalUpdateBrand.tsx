import { updateBrandApi } from '@/api/brand.api';
import { useAppDispatch } from '@/app/hook';
import InputForm from '@/components/form/InputForm';
import { incrementCountBrand } from '@/features/brand/brand.slice';
import { openNotification } from '@/features/counter/counterSlice';
import { BrandModels } from '@/model/brand.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import React, { useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import UploadFileIcon from '@/components/icons/UploadFileIcon';

interface ModalUpdateBrandProps {
  isModalOpen: boolean;
  onCancel: () => void;
  id: number | undefined;
  brandDetail: BrandModels | null;
  [key: string]: unknown;
}

const ModalUpdateBrand = (props: ModalUpdateBrandProps) => {
  const { brandDetail, id, isModalOpen, onCancel } = props;

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const [uploadedImage, setUploadedImage] = useState<string>(brandDetail?.image || '');

  const initialValues: BrandModels = {
    name: brandDetail?.name,
    description: brandDetail?.description,
    image: brandDetail?.image,
  };

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const buildBody = (values: BrandModels) => {
    const getImageFile = values?.image as any;
    const newValues = {
      name: values?.name,
      description: values?.description || '',
      image: !getImageFile?.file ? values?.image : '',
    };

    return newValues;
  };

  const onFinish = async (values: BrandModels) => {
    const getImageFile = values?.image as any;
    const formData = new FormData();
    const body = buildBody(values);
    formData.append(
      'data',
      new Blob([JSON.stringify(body)], {
        type: 'application/json',
      }),
    );

    if (getImageFile?.file) {
      const file = getImageFile?.file?.originFileObj;
      formData.append('file', file as File);
    }

    try {
      const res = await updateBrandApi(formData, id);
      if (res) {
        dispatch(incrementCountBrand());
        dispatch(
          openNotification({
            message: 'Update Brand Success!',
            description: 'You have successfully updated the Brand!',
            type: 'success',
          }),
        );
        onCancel();
      }
    } catch (error) {
      dispatch(
        openNotification({
          message: getMsgErrorApi(error),
          type: 'error',
        }),
      );
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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

  const handleChange = (info: any) => {
    if (info.file.originFileObj) {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setUploadedImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setUploadedImage('');
    form.setFieldValue('image', '');
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      form.setFieldValue('image', e);
      return e;
    }
    if (e.file.originFileObj) {
      form.setFieldValue('image', e);
    }
    return e && e.fileList;
  };

  const dummyRequest = (props: any) => {
    const { file, onSuccess } = props;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <>
      <Modal
        title="Update Brand"
        open={isModalOpen}
        onCancel={onCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} className="w-28">
            Submit
          </Button>,
          <Button key="back" onClick={handleCancel} className="w-28">
            Cancel
          </Button>,
        ]}
      >
        <div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 32 }}
            style={{ maxWidth: '100%' }}
            autoComplete="off"
            colon={false}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={initialValues}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
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

              <Col span={24}>
                <InputForm label="Description" placeholder="Enter Description" name="description" />
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Image"
                  name={'image'}
                  rules={[{ required: true, message: 'Vui lòng nhập hình ảnh!' }]}
                >
                  <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger
                      showUploadList={false}
                      onChange={handleChange}
                      beforeUpload={checkImageSizeAndRatio}
                      accept="image/*"
                      customRequest={dummyRequest}
                    >
                      {uploadedImage ? (
                        <div style={{ position: 'relative' }}>
                          <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%' }} />
                          <Button
                            shape="circle"
                            danger
                            ghost
                            size="small"
                            icon={<CloseOutlined />}
                            style={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
                            onClick={handleDeleteImage}
                          />
                        </div>
                      ) : (
                        <>
                          <p className="ant-upload-text">Chọn ảnh để tải lên</p>
                          <p className="ant-upload-drag-icon">
                            <UploadFileIcon />
                          </p>
                          <p className="ant-upload-text">Định dạng JPEG, PNG, JPG</p>
                          <p className="ant-upload-text">Dung lượng tối đa 5MB</p>
                          <p className="ant-upload-text">Tỷ lệ phù hợp 3:2</p>
                        </>
                      )}
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className="hidden" wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" size="large" htmlType="submit" className="w-32" ref={btnRef}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdateBrand;
