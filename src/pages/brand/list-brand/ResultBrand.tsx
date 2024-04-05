import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import { changePageSearch, deleteBrandAsync, getBrandByIdAsync } from '@/features/brand/brand.slice';
import { BrandModels } from '@/model/brand.model';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import ModalUpdateBrand from '../modal/ModalUpdateBrand';
import ModalDeleteBrand from '../modal/ModalDeleteBrand';

const ResultBrand = () => {
  const columns: ColumnsType<BrandModels> = [
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
      render: (values: any, record: BrandModels) => (
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

  const brandDetail = useAppSelector((state) => state?.brand?.brandDetail);
  const page = useAppSelector((state) => state?.brand?.pageSearch);
  const total = useAppSelector((state) => state?.brand?.totalPage);
  const brandDetails = useAppSelector((state) => state?.brand?.brandDetails);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(0);

  const handleChangePage = (newPage: number) => {
    dispatch(changePageSearch(newPage));
  };

  const handleOpenModalUpdate = (record: BrandModels) => {
    setId(record.id);
    setOpenModalUpdate(true);
    dispatch(getBrandByIdAsync(Number(record.id)));
  };

  const handleOpenModalDelete = (record: BrandModels) => {
    setOpenModalDelete(true);
    setId(record.id);
  };

  const handleCancel = () => {
    setOpenModalUpdate(false);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const deleteBrand = async () => {
    if (id) {
      const res = dispatch(deleteBrandAsync(Number(id)));
    }
  };

  return (
    <>
      <ModalDeleteBrand isModalOpen={openModalDelete} onCancel={handleCloseModalDelete} deleteBrand={deleteBrand} />
      {brandDetail?.id === id && (
        <ModalUpdateBrand brandDetail={brandDetail} id={id} isModalOpen={openModalUpdate} onCancel={handleCancel} />
      )}
      <div className="mt-10">
        <Table columns={columns} dataSource={brandDetails} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultBrand;
