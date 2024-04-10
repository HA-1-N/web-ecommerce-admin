import { filterOrderApi } from '@/api/order.api';
import { useAppSelector } from '@/app/hook';
import ChipOrderStatus from '@/components/ChipOrderStatus';
import PaginationTable from '@/components/Pagination';
import { OrderStatusModels } from '@/model/order-status.model';
import { OrderDetailModels } from '@/model/order.model';
import { ShippingMethodModels } from '@/model/shipping-method.model';
import { Button, Modal, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalUpdateOrderStatus from '../modal/ModalUpdateOrderStatus';

const ResultOrder = () => {
  const columns: ColumnsType<OrderDetailModels> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Order date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (value: any) => <span>{new Date(value).toLocaleDateString()}</span>,
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (values: OrderStatusModels) => <ChipOrderStatus status={values?.status} />,
    },
    {
      title: 'Shipping Method',
      dataIndex: 'shippingMethod',
      key: 'shippingMethod',
      render: (values: ShippingMethodModels) => <span>{values?.method}</span>,
    },
    {
      title: 'Order Total',
      dataIndex: 'orderTotal',
      key: 'orderTotal',
      render: (value: any) => <span>{value?.toLocaleString('en-US')}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (values: any, record: OrderDetailModels) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleClickBtnDetail(record)}>
            Detail
          </Button>
          <Button size="small" onClick={() => handleClickBtnUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();

  const page = useAppSelector((state) => state.order?.pageSearch);
  const total = useAppSelector((state) => state.order?.totalPage);

  const orderDetails: OrderDetailModels[] = useAppSelector((state) => state.order?.orderDetails);

  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);
  const [status, setStatus] = useState<string | undefined>('');
  const [id, setId] = useState<number | undefined>(0);

  const handleClickBtnDetail = (record: OrderDetailModels) => {
    // console.log('handleClickBtnDetail', record);
    navigate(`/order/${record?.id}`);
  };

  const handleClickBtnUpdate = (record: OrderDetailModels) => {
    setStatus(record?.orderStatus?.status);
    setId(record?.id);
    setIsOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setIsOpenModalUpdate(false);
  };

  const handleChangePage = (newPage: number) => {
    console.log('handleChangePage', newPage);
  };

  return (
    <>
      {isOpenModalUpdate && status && id && (
        <ModalUpdateOrderStatus
          id={id}
          isModalOpen={isOpenModalUpdate}
          onCancel={handleCloseModalUpdate}
          status={status}
        />
      )}
      <div className="mt-10">
        <Table columns={columns} dataSource={orderDetails} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultOrder;
