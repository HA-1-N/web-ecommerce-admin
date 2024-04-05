import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormUpdateProduct from './FormUpdateProduct';
import { ProductModels } from '@/model/product.model';
import { getProductByIdApi } from '@/api/product.api';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const id = Number(params?.id);

  const [productDetail, setProductDetail] = useState<ProductModels | null>(null);

  const getProductById = async () => {
    try {
      const res: any = await getProductByIdApi(id);
      setProductDetail(res?.data);
    } catch (err) {
      dispatch(
        openNotification({
          type: 'error',
          message: getMsgErrorApi(err),
        }),
      );
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  const handleClickReturn = () => {
    navigate('/product/list-product');
  };

  return (
    <>
      <Button onClick={handleClickReturn}>Return</Button>
      <BoxContainer>
        <HeaderTitle title="Update Product" />
        {productDetail ? <FormUpdateProduct productDetail={productDetail} id={id} /> : <></>}
      </BoxContainer>
    </>
  );
};

export default UpdateProduct;
