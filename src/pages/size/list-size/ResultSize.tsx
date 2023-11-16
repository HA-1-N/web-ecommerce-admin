import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import { changePageSearch } from '@/features/size/size.slice';
import { SizeModel } from '@/model/size.model';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

const columns: ColumnsType<SizeModel> = [
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

const ResultSize = () => {
  const dispatch = useAppDispatch();

  const sizeDetails = useAppSelector((state) => state.size.sizeDetails);
  const totalPage = useAppSelector((state) => state.size.totalPage);
  const page = useAppSelector((state) => state.size.pageSearch);

  const handleChangePage = (newPage: number) => {
    dispatch(changePageSearch(newPage));
  };

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={sizeDetails} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={totalPage} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultSize;
