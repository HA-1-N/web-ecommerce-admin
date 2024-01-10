import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import { changePageSearch, getCategoryByIdAsync } from '@/features/category/category.slice';
import { CategoryModels } from '@/model/category.model';
import { Button, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import ModalUpdateCategory from '../modal/ModalUpdateCategory';

const ResultCategory = () => {
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
      render: (values: string, record: CategoryModels) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleOpenModalUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const dispatch = useAppDispatch();

  const categoryDetail = useAppSelector((state) => state?.category?.categoryDetail);
  const page = useAppSelector((state) => state?.category?.pageSearch);
  const total = useAppSelector((state) => state?.category?.totalPage);
  const categoryDetails = useAppSelector((state) => state?.category?.categoryDetails);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(0);

  const handleChangePage = (newPage: number) => {
    dispatch(changePageSearch(newPage));
  };

  const handleOpenModalUpdate = (record: CategoryModels) => {
    setId(record.id);
    setOpenModalUpdate(true);
    dispatch(getCategoryByIdAsync(Number(record.id)));
  };

  const handleOpenModalDelete = (record: CategoryModels) => {
    setOpenModalDelete(true);
    setId(record.id);
  };

  const handleCancel = () => {
    setOpenModalUpdate(false);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };
  return (
    <>
      {categoryDetail?.id === id && (
        <ModalUpdateCategory
          categoryDetail={categoryDetail}
          id={id}
          isModalOpen={openModalUpdate}
          onCancel={handleCancel}
        />
      )}
      <div className="mt-10">
        <Table columns={columns} dataSource={categoryDetails} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultCategory;
