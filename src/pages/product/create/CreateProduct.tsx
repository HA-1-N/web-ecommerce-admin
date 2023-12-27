import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import React from 'react';
import FormCreateProduct from './FormCreateProduct';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();

  const handleClickReturn = () => {
    navigate('/product/list-product');
  };

  return (
    <>
      <Button onClick={handleClickReturn}>Return</Button>
      <BoxContainer>
        <HeaderTitle title="Create Product" />
        <FormCreateProduct />
      </BoxContainer>
    </>
  );
};

export default CreateProduct;
