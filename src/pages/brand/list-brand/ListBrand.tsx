import { Breadcrumb, Button } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchBrand from './FormSearchBrand';
import ResultBrand from './ResultBrand';
import ModalCreateBrand from '../modal/ModalCreateBrand';

const ListBrand = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleClickCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
  };

  return (
    <>
      <ModalCreateBrand isModalOpen={isOpenModalCreate} onCancel={handleCancel} />
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: 'List Brand',
            },
          ]}
        />

        <Button className="w-32" onClick={handleClickCreate}>
          Create Brand
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="List Brand" />
        <FormSearchBrand />
        <ResultBrand />
      </BoxContainer>
    </>
  );
};

export default ListBrand;
