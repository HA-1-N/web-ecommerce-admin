import { filterPaymentTypeApi } from '@/api/payment-type.api';
import { useAppDispatch } from '@/app/hook';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import PaginationTable from '@/components/Pagination';
import InputForm from '@/components/form/InputForm';
import { DEFAULT_PAGE_SIZE, TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { openNotification } from '@/features/counter/counterSlice';
import { ParamsModel } from '@/model/page.model';
import { PaymentTypeModels } from '@/model/payment-type.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Breadcrumb, Button, Col, Form, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import ModalCreatePaymentType from './modal/ModalCreatePaymentType';

const ListPaymentType = () => {
  const initialValues = {
    type: '',
  };

  const dispatch = useAppDispatch();

  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
  const [paymentTypeDetail, setPaymentTypeDetail] = useState<PaymentTypeModels[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getPaymentTypeFilter = async (values: PaymentTypeModels, params: ParamsModel) => {
    filterPaymentTypeApi(values, params)
      .then((res) => {
        setPaymentTypeDetail(res?.data);
        setTotalCount(parseInt(res?.headers[TOTAL_COUNT_HEADER]));
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

  useEffect(() => {
    const params = {
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    };
    getPaymentTypeFilter(initialValues, params);
  }, []);

  const onFinish = async (values: PaymentTypeModels) => {
    const params = {
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    };
    getPaymentTypeFilter(values, params);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = async () => {
    const params = {
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    };
    getPaymentTypeFilter(initialValues, params);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleClickCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCloseCreate = () => {
    setIsOpenModalCreate(false);
  };

  const columns: ColumnsType<PaymentTypeModels> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  return (
    <>
      <ModalCreatePaymentType isModalOpen={isOpenModalCreate} onCancel={handleCloseCreate} />
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: 'List Color',
            },
          ]}
        />

        <Button className="w-auto" onClick={handleClickCreate}>
          Create Payment Type
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="List Payment Type" />
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
                <InputForm label="Type" placeholder="Enter Type" name="type" />
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

        <div className="mt-10">
          <Table columns={columns} dataSource={paymentTypeDetail} pagination={false} />
          <div className="mt-6">
            <PaginationTable page={page} total={totalCount} onChangePage={handleChangePage} />
          </div>
        </div>
      </BoxContainer>
    </>
  );
};

export default ListPaymentType;
