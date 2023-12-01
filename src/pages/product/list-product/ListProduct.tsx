import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchProduct from './FormSearchProduct';
import ResultProduct from './ResultProduct';

const ListProduct = () => {
  const handleClickCreate = () => {};

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
          Create Category
        </Button>
      </div>

      <BoxContainer>
        <HeaderTitle title="List Product" />
        <FormSearchProduct />
        <ResultProduct />
      </BoxContainer>
    </>
  );
};

export default ListProduct;
