import { addHotCategoryProductApi } from '@/api/hot-category.api';
import { getAllIdNameProductApi } from '@/api/product.api';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import SelectForm from '@/components/form/SelectForm';
import { openNotification } from '@/features/counter/counterSlice';
import { incrementCountProductHotCategory } from '@/features/hot-category/hot-category.slice';
import { ProductIdNameModels } from '@/model/product.model';
import { filterOption, getMsgErrorApi } from '@/utils/form.util';
import { Button, Col, Form, Modal, Row } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ModalAddHotProductCategoryProps {
  isOpen: boolean;
  onCancel: () => void;
  [key: string]: unknown;
}

interface InitialValuesProps {
  productIds: number[];
}

const ModalAddHotProductCategory = (props: ModalAddHotProductCategoryProps) => {
  const { isOpen, onCancel, ...otherProps } = props;

  const params = useParams();
  const getId = Number(params?.id);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const hotCategoryDetail: any = useAppSelector((state) => state.hotCategory.hotCategoryDetail);
  const getProductDetails = hotCategoryDetail ? hotCategoryDetail?.products : [];
  const getProductIds = getProductDetails?.map((item: ProductIdNameModels) => item?.id);

  const [optionProductDetails, setOptionProductDetails] = useState<DefaultOptionType[]>([]);

  const initialValues: InitialValuesProps = {
    productIds: getProductIds,
  };

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

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

  useEffect(() => {
    getAllProductDetail();
  }, []);

  const handleOk = () => {
    btnRef.current.click();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinish = async (values: any) => {
    try {
      const res = await addHotCategoryProductApi(values, getId);
      if (res) {
        dispatch(
          openNotification({
            type: 'success',
            message: 'Add Hot Category Product Success',
          }),
        );
        dispatch(incrementCountProductHotCategory());
        form.resetFields();
        onCancel();
      }
    } catch (error) {
      dispatch(
        openNotification({
          type: 'error',
          message: getMsgErrorApi(error),
        }),
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Create Hot Category"
        open={isOpen}
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
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <SelectForm
                  mode="multiple"
                  showSearch
                  optionFilterProp="children"
                  label="Product"
                  placeholder="Select Product"
                  name="productIds"
                  allowClear
                  options={optionProductDetails}
                  filterOption={filterOption}
                  rules={[{ required: true, message: 'Please select brand!' }]}
                />
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

export default ModalAddHotProductCategory;
