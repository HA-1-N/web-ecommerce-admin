import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import React from 'react';
import FormSearchProductQuantity from './FormSearchProductQuantity';
import ResultProductQuantity from './ResultProductQuantity';
import { Breadcrumb, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const ListProductQuantity = () => {
  const navigate = useNavigate();

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
        <ResultProductQuantity />
      </BoxContainer>
    </>
  );
};

export default ListProductQuantity;
