import PaginationTable from '@/components/Pagination';
import { BrandModels } from '@/model/brand.model';
import { CategoryModels } from '@/model/category.model';
import { ProductModels } from '@/model/product.model';
import { Button, Space, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ResultProductProps {
  productDetail: ProductModels[] | undefined;
  page: number;
  totalCount: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ResultProduct = (props: ResultProductProps) => {
  const { productDetail, page, totalCount, setPage } = props;

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
      render: (value: number, record: ProductModels) => {
        return <>{value?.toLocaleString('en-US')}</>;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value: any, record: ProductModels) => {
        const initValue = 0;
        const arrQuantity: number[] = record?.productQuantities?.map((item) => item.quantity);
        const totalQuantity = arrQuantity?.reduce((accumulator, currentValue) => accumulator + currentValue, initValue);
        return <div>{totalQuantity}</div>;
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (value: BrandModels, record: ProductModels) => value?.name,
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

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={productDetail} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={totalCount} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultProduct;
