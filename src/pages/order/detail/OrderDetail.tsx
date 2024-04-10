import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormOrderDetail from './FormOrderDetail';

const OrderDetail = () => {
  const navigate = useNavigate();

  const handleClickReturn = () => {
    navigate('/order');
  };

  return (
    <>
      <Button onClick={handleClickReturn}>Return</Button>
      <BoxContainer>
        <HeaderTitle title="Order Detail" />
        <FormOrderDetail />
      </BoxContainer>
    </>
  );
};

export default OrderDetail;
