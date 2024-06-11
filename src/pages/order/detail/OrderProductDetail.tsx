import { ColorModels } from '@/model/color.model';
import { OrderDetailModels } from '@/model/order.model';
import { SizeModel } from '@/model/size.model';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';

interface OrderProductDetailProps {
  orderDetail: OrderDetailModels;
}

const OrderProductDetail = (props: OrderProductDetailProps) => {
  const { orderDetail } = props;

  const columns: ColumnsType<OrderDetailModels> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'product',
      key: 'product',
      render: (value: any) => {
        return <span>{value?.name}</span>;
      },
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (value: ColorModels) => {
        return <span>{value?.name}</span>;
      },
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (value: SizeModel) => {
        return <span>{value?.name}</span>;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'product',
      key: 'product',
      render: (value: any) => {
        return <span>{value?.price?.toLocaleString('en-US')}</span>;
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value: number) => {
        return <span>{value?.toLocaleString('en-US')}</span>;
      },
    },
  ];

  return (
    <>
      <div className="mt-10">
        <h2>Order Product</h2>
        <Table columns={columns} dataSource={orderDetail?.orderProducts} pagination={false} />
      </div>
    </>
  );
};

export default OrderProductDetail;
