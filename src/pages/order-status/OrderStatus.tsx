import { Breadcrumb, Button } from 'antd';
import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchOrderStatus from './FormSearchOrderStatus';
import ResultOrderStatus from './ResultOrderStatus';
import ModalCreateOrderStatus from './modal/ModalCreateOrderStatus';

const OrderStatus = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleClickCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setIsOpenModalCreate(false);
  };

  return (
    <>
      <ModalCreateOrderStatus isModalOpen={isOpenModalCreate} onCancel={handleCloseModalCreate} />
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: 'List Order Status',
            },
          ]}
        />

        <Button className="w-auto" onClick={handleClickCreate}>
          Create Order Status
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="Order Status" />
        <FormSearchOrderStatus />
        <ResultOrderStatus />
      </BoxContainer>
    </>
  );
};

export default OrderStatus;
