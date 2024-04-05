import { Breadcrumb, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchShippingMethod from './FormSearchShippingMethod';
import ResultShippingMethod from './ResultShippingMethod';
import ModalCreateShippingMethod from './modal/ModalCreateShippingMethod';

const ShippingMethod = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleClickCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
  };

  return (
    <>
      <ModalCreateShippingMethod isModalOpen={isOpenModalCreate} onCancel={handleCancel} />
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: 'List Shipping Method',
            },
          ]}
        />

        <Button className="w-auto" onClick={handleClickCreate}>
          Create Shipping Method
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="Shipping Method" />
        <FormSearchShippingMethod />
        <ResultShippingMethod />
      </BoxContainer>
    </>
  );
};

export default ShippingMethod;
