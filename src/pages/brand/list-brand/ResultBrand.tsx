import PaginationTable from '@/components/Pagination';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

const columns: ColumnsType<any> = [
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
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button size="small">Update</Button>
      </Space>
    ),
  },
];

const ResultBrand = () => {
  const handleChangePage = (newPage: number) => {};

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={[]} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={0} total={10} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultBrand;
