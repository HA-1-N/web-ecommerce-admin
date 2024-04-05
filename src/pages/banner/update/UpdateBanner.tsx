import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormUpdateBanner from './FormUpdateBanner';

const UpdateBanner = () => {
  const navigate = useNavigate();

  const handleClickReturn = () => {
    navigate('/banner/list-banner');
  };
  return (
    <>
      <Button onClick={handleClickReturn}>Return</Button>
      <BoxContainer>
        <HeaderTitle title="Update Banner" />
        <FormUpdateBanner />
      </BoxContainer>
    </>
  );
};

export default UpdateBanner;
