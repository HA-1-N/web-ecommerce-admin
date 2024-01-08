import { ChipStatus } from '@/components/ChipStatus';
import PaginationTable from '@/components/Pagination';
import { ProductQuantityModels } from '@/model/product.model';
import { Button, Space, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';

interface ResultProductQuantityProps {
  productQuantityDetails: ProductQuantityModels[];
}

const ResultProductQuantity = (props: ResultProductQuantityProps) => {
  const { productQuantityDetails } = props;

  const handleClickUpdate = (id: number | undefined) => {};

  const columns: ColumnsType<ProductQuantityModels> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: 100,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      width: 100,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: number) => <ChipStatus value={value} />,
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (values: any, record: ProductQuantityModels) => {
        return (
          <Space size="middle">
            <Button size="small" onClick={() => handleClickUpdate(record?.id)}>
              Update
            </Button>
            <Button size="small" danger>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const data: any = productQuantityDetails?.map((item: ProductQuantityModels) => {
    return {
      key: item.id,
      product: item?.product?.name,
      color: item?.color?.name,
      size: item?.size?.name,
      quantity: item?.quantity,
      status: item?.status,
    };
  });

  const handleChangePage = (newPage: number) => {};

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 1500 }} bordered rowKey="id" />
        <div className="mt-6">
          <PaginationTable page={1} total={10} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultProductQuantity;
