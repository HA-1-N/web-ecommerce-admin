import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import React from 'react';
import FormCreateProductQuantity from './FormCreateProductQuantity';

const CreateProductQuantity = () => {
  return (
    <>
      <BoxContainer>
        <HeaderTitle title="Create Product Quantity" />
        <FormCreateProductQuantity />
      </BoxContainer>
    </>
  );
};

export default CreateProductQuantity;
