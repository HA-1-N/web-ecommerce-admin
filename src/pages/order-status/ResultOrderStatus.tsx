import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import { changePageSearch } from '@/features/order-status/order-status.slice';
import { OrderStatusModels } from '@/model/order-status.model';
import { Button, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

const ResultOrderStatus = () => {
  const columns: ColumnsType<OrderStatusModels> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (values: any, record: OrderStatusModels) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleOpenModalUpdate(record)}>
            Update
          </Button>
          {/* <Button danger size="small" onClick={() => handleOpenModalDelete(record)}>
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  const dispatch = useAppDispatch();

  const orderStatusDetail = useAppSelector((state) => state?.orderStatus?.orderStatusDetail);
  const orderStatusDetails = useAppSelector((state) => state?.orderStatus?.orderStatusDetails);
  const page = useAppSelector((state) => state?.orderStatus?.pageSearch);
  const total = useAppSelector((state) => state?.orderStatus?.totalPage);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(0);

  const handleOpenModalUpdate = (record: OrderStatusModels) => {
    console.log('handleOpenModalUpdate', record);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const handleChangePage = (newPage: number) => {
    dispatch(changePageSearch(newPage));
  };

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={orderStatusDetails} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultOrderStatus;
