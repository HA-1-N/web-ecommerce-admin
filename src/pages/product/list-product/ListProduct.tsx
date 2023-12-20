import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchProduct from './FormSearchProduct';
import ResultProduct from './ResultProduct';
import { FilterProductModels, ProductModels } from '@/model/product.model';
import { filterProductApi } from '@/api/product.api';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';
import { ParamsModel } from '@/model/page.model';

const ListProduct = () => {
  const initialValues: FilterProductModels = {
    name: null,
    status: null,
    brandId: null,
    categoryId: null,
    colorId: [],
    sizeId: [],
    maxPrice: null,
    minPrice: null,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState<ProductModels[]>([]);

  const getProductFilter = async (values: FilterProductModels, params: ParamsModel) => {
    filterProductApi(values, params)
      .then((res) => {
        setProductDetail(res?.data);
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

  useEffect(() => {
    const params = {
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    };

    getProductFilter(initialValues, params);
  }, []);

  const handleClickCreate = () => {
    navigate('/product/create-product');
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: 'List Category',
            },
          ]}
        />

        <Button className="w-32" onClick={handleClickCreate}>
          Create Product
        </Button>
      </div>

      <BoxContainer>
        <HeaderTitle title="List Product" />
        <FormSearchProduct getProductFilter={getProductFilter} />
        <ResultProduct productDetail={productDetail} />
      </BoxContainer>
    </>
  );
};

export default ListProduct;
