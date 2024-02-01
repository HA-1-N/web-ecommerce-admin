import InputForm from '@/components/form/InputForm';
import { Button, Col, Form, Row, Space, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusCircleOutlined, MinusCircleOutlined, InboxOutlined, CloseOutlined } from '@ant-design/icons';
import UploadFileIcon from '@/components/icons/UploadFileIcon';
import { openNotification } from '@/features/counter/counterSlice';
import { useAppDispatch } from '@/app/hook';
import { BannerModels } from '@/model/banner.model';
import { getBannerByIdApi, updateBannerApi } from '@/api/banner.api';
import { getMsgErrorApi } from '@/utils/form.util';

const FormUpdateBanner = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const getId = Number(params?.id);

  const [form] = Form.useForm();

  const initValues: BannerModels = {
    title: '',
    link: '',
    content: '',
    image: '',
  };

  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [initialValues, setInitialValues] = useState<BannerModels>(initValues);

  const buildInitValue = (item: BannerModels) => {
    const newValues = {
      title: item?.title,
      link: item?.link,
      content: item?.content,
      image: item?.image,
    };
    return newValues;
  };

  const getBannerById = async () => {
    try {
      const res = await getBannerByIdApi(getId);
      setUploadedImage(res?.data?.image);
      setInitialValues(buildInitValue(res?.data));
      form.setFieldsValue(buildInitValue(res?.data));
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
    getBannerById();
  }, []);

  const buildBody = (values: BannerModels) => {
    const getImageFile = values?.image as any;
    const newValues = {
      id: getId,
      title: values?.title,
      link: values?.link,
      content: values?.content,
      image: !getImageFile?.file ? values?.image : '',
    };
    return newValues;
  };

  const updateBanner = async (data: FormData) => {
    updateBannerApi(data)
      .then((res) => {
        if (res) {
          navigate('/banner/list-banner');
          dispatch(
            openNotification({
              type: 'success',
              message: 'Cập nhật banner thành công',
            }),
          );
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

  const onFinish = (values: BannerModels) => {
    const getImageFile = values?.image as any;
    if (getImageFile?.file) {
      const formData = new FormData();
      const body = buildBody(values);
      formData.append(
        'data',
        new Blob([JSON.stringify(body)], {
          type: 'application/json',
        }),
      );
      const file = getImageFile?.file?.originFileObj;
      formData.append('file', file as File);
      updateBanner(formData);
    } else {
      const formData = new FormData();
      const body = buildBody(values);
      formData.append(
        'data',
        new Blob([JSON.stringify(body)], {
          type: 'application/json',
        }),
      );
      updateBanner(formData);
    }
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
    setUploadedImage(null);
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
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <InputForm
                    label="Title"
                    placeholder="Enter title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your title!',
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <InputForm
                    label="Link"
                    placeholder="Enter link"
                    name="link"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please input your link!',
                    //   },
                    // ]}
                  />
                </Col>
                <Col span={24}>
                  <InputForm
                    label="Content"
                    placeholder="Enter content"
                    name="content"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please input your content!',
                    //   },
                    // ]}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Form.Item label="Image" name={'image'} rules={[{ required: true, message: 'Vui lòng nhập hình ảnh!' }]}>
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
          <div className="mt-5" style={{ textAlign: 'center' }}>
            <Space>
              <Button type="primary" htmlType="submit" className="w-32">
                Lưu
              </Button>
              <Button onClick={() => navigate('/banner/list-banner')} className="w-32">
                Quay lại
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    </>
  );
};

export default FormUpdateBanner;
