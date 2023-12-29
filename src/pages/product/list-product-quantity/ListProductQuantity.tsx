import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import React, { useEffect, useState } from 'react';
import FormSearchProductQuantity from './FormSearchProductQuantity';
import ResultProductQuantity from './ResultProductQuantity';
import { Breadcrumb, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/app/hook';
import { FilterProductQuantityModels, ProductQuantityModels } from '@/model/product.model';
import { ParamsModel } from '@/model/page.model';
import { filterProductQuantityApi } from '@/api/product.api';
import { DEFAULT_PAGE_SIZE } from '@/constants/page.constant';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';

const ListProductQuantity = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    productId: null,
    colorId: null,
    sizeId: null,
    status: null,
  };

  const [productQuantityDetails, setProductQuantityDetails] = useState<ProductQuantityModels[]>([]);

  const getProductQuantity = async (values: FilterProductQuantityModels, params: ParamsModel) => {
    try {
      const res = await filterProductQuantityApi(values, params);
      setProductQuantityDetails(res?.data);
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
    const params = {
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    };
    getProductQuantity(initialValues, params);
  }, []);

  const handleClickCreate = () => {
    navigate('/product/create-product-quantity');
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
              title: 'List Category Quantity',
            },
          ]}
        />

        <Button onClick={handleClickCreate}>Create Product Quantity</Button>
      </div>

      <BoxContainer>
        <HeaderTitle title="List Product Quantity" />
        <FormSearchProductQuantity />
        <ResultProductQuantity productQuantityDetails={productQuantityDetails} />
      </BoxContainer>
    </>
  );
};

export default ListProductQuantity;
