import { deleteBannerApi, getAllBannerApi } from '@/api/banner.api';
import { useAppDispatch } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import ModalConfirmDelete from '@/components/modal/ModalConfirmDelete';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { openNotification } from '@/features/counter/counterSlice';
import { BannerModels } from '@/model/banner.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultListBanner = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [bannerDetail, setBannerDetail] = useState<BannerModels[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [countBanner, setCountBanner] = useState<number>(0);
  const [id, setId] = useState<number>(0);

  const getBanner = async () => {
    const params = {
      page: page - 1,
      size: 10,
    };
    try {
      const res = await getAllBannerApi(params);
      setBannerDetail(res?.data);
      setTotal(parseInt(res?.headers[TOTAL_COUNT_HEADER]) || 0);
    } catch (error) {
      dispatch(
        openNotification({
          type: 'error',
          message: getMsgErrorApi(error),
        }),
      );
    }
  };

  const deleteBanner = async () => {
    try {
      const res = await deleteBannerApi(id);
      if (res) {
        dispatch(
          openNotification({
            type: 'success',
            message: res?.data,
          }),
        );
        setCountBanner(countBanner + 1);
        setOpenModalDelete(false);
      }
    } catch (error) {
      dispatch(
        openNotification({
          type: 'error',
          message: getMsgErrorApi(error),
        }),
      );
    }
  };

  useEffect(() => {
    getBanner();
  }, [countBanner]);

  const handleClickUpdate = (id: number | undefined) => {
    navigate(`/banner/update-banner/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    setOpenModalDelete(true);
    setId(Number(id));
  };

  const handleCancel = () => {
    setOpenModalDelete(false);
  };

  const columns: ColumnsType<BannerModels> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
    },

    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (values: any, record: BannerModels) => {
        return (
          <Space size="middle">
            <Button size="small" onClick={() => handleClickUpdate(record?.id)}>
              Update
            </Button>
            <Button size="small" danger onClick={() => handleDelete(record?.id)}>
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
      <ModalConfirmDelete
        isModalOpen={openModalDelete}
        onCancel={handleCancel}
        title={'Modal delete banner'}
        titleName="banner"
        deleteFunc={deleteBanner}
      />
      <div className="mt-10">
        <Table columns={columns} dataSource={bannerDetail} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultListBanner;
