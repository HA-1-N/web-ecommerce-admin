import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import { changePageSearch, getShippingMethodByIdAsync } from '@/features/shipping-method/shipping-method.slice';
import { ShippingMethodModels } from '@/model/shipping-method.model';
import { Button, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import ModalUpdateShippingMethod from './modal/ModalUpdateShippingMethod';

const ResultShippingMethod = () => {
  const columns: ColumnsType<ShippingMethodModels> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (values: any, record: ShippingMethodModels) => (
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

  const shippingMethodDetail = useAppSelector((state) => state?.shippingMethod?.shippingMethodDetail);
  const shippingMethodDetails = useAppSelector((state) => state?.shippingMethod?.shippingMethodDetails);
  const page = useAppSelector((state) => state?.shippingMethod?.pageSearch);
  const total = useAppSelector((state) => state?.shippingMethod?.totalPage);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(0);

  const handleOpenModalUpdate = (record: ShippingMethodModels) => {
    setOpenModalUpdate(true);
    setId(record.id);
    dispatch(getShippingMethodByIdAsync(record.id));
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const handleChangePage = (newPage: number) => {
    dispatch(changePageSearch(newPage));
  };
  return (
    <>
      {shippingMethodDetail?.id === id && (
        <ModalUpdateShippingMethod
          isModalOpen={openModalUpdate}
          onCancel={handleCloseModalUpdate}
          id={id}
          shippingMethodDetail={shippingMethodDetail}
        />
      )}
      <div className="mt-10">
        <Table columns={columns} dataSource={shippingMethodDetails} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultShippingMethod;
