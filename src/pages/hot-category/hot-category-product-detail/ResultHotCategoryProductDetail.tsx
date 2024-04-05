import { deleteHotCategoryProductApi, findHotCategoryByIdApi } from '@/api/hot-category.api';
import { getProductByHotCategoryApi } from '@/api/product.api';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import PaginationTable from '@/components/Pagination';
import ModalConfirmDelete from '@/components/modal/ModalConfirmDelete';
import { DEFAULT_PAGE_SIZE, TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { openNotification } from '@/features/counter/counterSlice';
import { incrementCountProductHotCategory } from '@/features/hot-category/hot-category.slice';
import { HotCategoryProductModels } from '@/model/hot-category.model';
import { ParamsModel } from '@/model/page.model';
import { ProductModels } from '@/model/product.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ResultHotCategoryProductDetail = () => {
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            danger
            onClick={() => {
              handleDelete(record);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const params = useParams();
  const getId = Number(params?.id);

  const countProductHotCategory = useAppSelector((state) => state.hotCategory.countProductHotCategory);

  const [hotCategoryProductDetail, setHotCategoryProductDetail] = useState<ProductModels[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState<number>(0);

  const handleChangePage = (newPage: number) => {
    setPage(page);
  };

  const paramsUp: ParamsModel = {
    page: page - 1,
    size: DEFAULT_PAGE_SIZE,
  };

  const getHotCategoryDetail = async () => {
    try {
      const res = await getProductByHotCategoryApi(getId, paramsUp);
      const getHotCategoryProducts = res?.data;
      setHotCategoryProductDetail(getHotCategoryProducts);
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

  useEffect(() => {
    getHotCategoryDetail();
  }, [page, countProductHotCategory]);

  const deleteHotCategoryProduct = async () => {
    const body = {
      productId: idProduct,
    };
    deleteHotCategoryProductApi(body, getId)
      .then((res) => {
        dispatch(
          openNotification({
            type: 'success',
            message: 'Delete product hot category success',
          }),
        );
        dispatch(incrementCountProductHotCategory());
        setOpenModalDelete(false);
      })
      .catch((err) => {
        dispatch(
          openNotification({
            type: 'error',
            message: getMsgErrorApi(err),
          }),
        );
      });
  };

  const handleDelete = async (record: any) => {
    setIdProduct(record?.id);
    setOpenModalDelete(true);
  };

  const handleCancelModalDelete = () => {
    setOpenModalDelete(false);
  };

  return (
    <>
      <ModalConfirmDelete
        isModalOpen={openModalDelete}
        onCancel={handleCancelModalDelete}
        deleteFunc={deleteHotCategoryProduct}
        title="Delete Product Hot Category"
        titleName="Product"
      />
      <div className="mt-10">
        <Table columns={columns} dataSource={hotCategoryProductDetail} pagination={false} />
        <div className="mt-6">
          <PaginationTable page={page} total={total} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultHotCategoryProductDetail;
