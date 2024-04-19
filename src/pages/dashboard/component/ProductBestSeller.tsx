/* eslint-disable jsx-a11y/img-redundant-alt */
import { filterHotCategoryApi } from '@/api/hot-category.api';
import { useAppDispatch } from '@/app/hook';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { openNotification } from '@/features/counter/counterSlice';
import { HotCategoryModels } from '@/model/hot-category.model';
import { ProductModels } from '@/model/product.model';
import { getMsgErrorApi } from '@/utils/form.util';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

const ProductBestSeller = () => {
  const columns: ColumnsType<ProductModels> = [
    {
      title: '',
      dataIndex: 'productImages',
      key: 'productImages',
      render: (value: any) => {
        return <img src={value[0]?.url} alt="image" className="w-12 h-auto" />;
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (value: any) => <span className="font-bold">{value}</span>,
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
        return <span className="font-semibold">{value?.toLocaleString('en-US')} VND</span>;
      },
    },
    // {
    //     title: "Amount",
    //     dataIndex: ''
    // }
  ];

  const dispatch = useAppDispatch();

  const [bestSellerProducts, setBestSellerProducts] = useState<ProductModels[]>([]);

  const filterHotcategory = async () => {
    const body = {
      id: null,
    };

    const params = {
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    };

    try {
      const res = await filterHotCategoryApi(body, params);
      const bestSellerProductsDetail = res?.data
        ?.filter((item: HotCategoryModels) => item?.name === 'Best Seller')
        ?.map((i: any) => i?.products)
        ?.flat();
      setBestSellerProducts(bestSellerProductsDetail);
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
    filterHotcategory();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-gray-500">Product Best Seller</h2>
        <Table columns={columns} dataSource={bestSellerProducts?.slice(0, 5)} pagination={false} />
      </div>
    </>
  );
};

export default ProductBestSeller;
