import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { changePageSearch, getAllHotCategoryAsync } from '@/features/hot-category/hot-category.slice';
import { HotCategoryModels } from '@/model/hot-category.model';
import { ParamsModel } from '@/model/page.model';
import { Button, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultHotCategory = () => {
  const columns: ColumnsType<HotCategoryModels> = [
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
      render: (values: any, record: HotCategoryModels) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleClickBtnDetail(record)}>
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state?.hotCategory?.pageSearch);
  const total = useAppSelector((state) => state?.hotCategory?.totalPage);
  const count = useAppSelector((state) => state?.hotCategory?.countHotCategory);
  const hotCategoryDetails = useAppSelector((state) => state?.hotCategory?.hotCategoryDetails);

  const params: ParamsModel = {
    page: page - 1,
    size: DEFAULT_PAGE_SIZE,
  };

  useEffect(() => {
    dispatch(getAllHotCategoryAsync({ params }));
  }, [dispatch, page, count]);

  const handleChangePage = (newPage: number) => {
    dispatch(changePageSearch(newPage));
  };

  const handleClickBtnDetail = (record: HotCategoryModels) => {
    navigate(`/hot-category/${Number(record?.id)}/hot-category-product-detail`);
  };

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={hotCategoryDetails} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultHotCategory;
