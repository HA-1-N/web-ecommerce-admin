import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormUpdateProductQuantity from './FormUpdateProductQuantity';
import { useAppDispatch } from '@/app/hook';
import { getProductCategoryByIdApi } from '@/api/product.api';
import { ProductQuantityModels } from '@/model/product.model';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';

const UpdateProductQuantity = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  const id = Number(params?.id);

  const [productQuantityDetail, setProductQuantityDetail] = useState<ProductQuantityModels | null>(null);

  const handleClickReturn = () => {
    navigate('/product/list-product-quantity');
  };

  const getProductQuantityById = async () => {
    try {
      const res = await getProductCategoryByIdApi(id);
      setProductQuantityDetail(res?.data);
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
    getProductQuantityById();
  }, []);

  return (
    <>
      <Button onClick={handleClickReturn}>Return</Button>
      <BoxContainer>
        <HeaderTitle title="Update Product Quantity" />
        {productQuantityDetail ? (
          <FormUpdateProductQuantity productQuantityDetail={productQuantityDetail} id={id} />
        ) : (
          <></>
        )}
      </BoxContainer>
    </>
  );
};

export default UpdateProductQuantity;
