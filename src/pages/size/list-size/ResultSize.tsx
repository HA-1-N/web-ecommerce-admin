import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import { changePageSearch, getSizeFindByIdAsync, incrementCountSizeById } from '@/features/size/size.slice';
import { SizeModel } from '@/model/size.model';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import ModalUpdateSize from '../modal/ModalUpdatesize';

const ResultSize = () => {
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
      render: (values: any, record: SizeModel) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleOpenModalUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const dispatch = useAppDispatch();

  const sizeDetail = useAppSelector((state) => state.size.sizeDetail);
  const sizeDetails = useAppSelector((state) => state.size.sizeDetails);
  const totalPage = useAppSelector((state) => state.size.totalPage);
  const page = useAppSelector((state) => state.size.pageSearch);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(0);

  const handleOpenModalUpdate = (record: SizeModel) => {
    setId(record.id);
    setOpenModalUpdate(true);
    dispatch(getSizeFindByIdAsync(Number(record.id)));
  };

  const handleCancel = () => {
    setOpenModalUpdate(false);
  };

  const handleChangePage = (newPage: number) => {
    dispatch(changePageSearch(newPage));
  };

  return (
    <>
      {sizeDetail?.id === id && (
        <ModalUpdateSize sizeDetail={sizeDetail} id={id} isModalOpen={openModalUpdate} onCancel={handleCancel} />
      )}
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
