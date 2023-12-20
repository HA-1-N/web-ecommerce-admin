import { BrandModel } from '@/model/brand.model';
import { CategoryModels } from '@/model/category.model';
import { ProductModels } from '@/model/product.model';
import { Button, Space, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ResultProductProps {
  productDetail: ProductModels[] | undefined;
}

const ResultProduct = (props: ResultProductProps) => {
  const { productDetail } = props;

  const navigate = useNavigate();

  const handleClickUpdate = (id: number | undefined) => {
    navigate(`/product/update-product/${id}`);
  };

  const columns: ColumnsType<ProductModels> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (value: BrandModel, record: ProductModels) => value?.name,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (value: CategoryModels, record: ProductModels) => value?.name,
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
      render: (values: any, record: ProductModels) => {
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

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={productDetail} />
      </div>
    </>
  );
};

export default ResultProduct;
