import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import { changePageSearch, getColorByIdAsync } from '@/features/color/color.slice';
import { ColorModels } from '@/model/color.model';
import { Button, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import ModalUpdateColor from '../modal/ModalUpdateColor';

const ResultColor = () => {
  const columns: ColumnsType<ColorModels> = [
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
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Color',
      dataIndex: 'code',
      key: 'color',
      render: (values: any, record: ColorModels) => (
        <div className="w-12 h-6 " style={{ backgroundColor: `${record.code}` }}></div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (values: any, record: ColorModels) => (
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

  const colorDetail = useAppSelector((state) => state?.color?.colorDetail);
  const page = useAppSelector((state) => state?.color?.pageSearch);
  const total = useAppSelector((state) => state?.color?.totalPage);
  const colorDetails = useAppSelector((state) => state?.color?.colorDetails);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(0);

  const handleChangePage = (newPage: number) => {
    dispatch(changePageSearch(newPage));
  };

  const handleOpenModalUpdate = (record: ColorModels) => {
    setId(record.id);
    setOpenModalUpdate(true);
    dispatch(getColorByIdAsync(Number(record.id)));
  };

  const handleOpenModalDelete = (record: ColorModels) => {
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
      {colorDetail?.id === id && (
        <ModalUpdateColor colorDetail={colorDetail} id={id} isModalOpen={openModalUpdate} onCancel={handleCancel} />
      )}
      <div className="mt-10">
        <Table columns={columns} dataSource={colorDetails} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultColor;
