import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import FormSearchSize from './FormSearchSize';
import ResultSize from './ResultSize';
import { Breadcrumb, Button } from 'antd';
import ModalCreateSize from '../modal/ModalCreateSize';

const ListSize = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleClickCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
  };

  return (
    <>
      <ModalCreateSize isModalOpen={isOpenModalCreate} onCancel={handleCancel} />
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: 'List Size',
            },
          ]}
        />

        <Button className="w-32" onClick={handleClickCreate}>
          Create Size
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="List Size" />
        <FormSearchSize />
        <ResultSize />
      </BoxContainer>
    </>
  );
};

export default ListSize;
