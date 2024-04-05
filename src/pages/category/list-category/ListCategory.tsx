import { Breadcrumb, Button } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchCategory from './FormSearchCategory';
import ResultCategory from './ResultCategory';
import ModalCreateCategory from '../modal/ModalCreateCategory';

const ListCategory = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleClickCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
  };

  return (
    <>
      <ModalCreateCategory isModalOpen={isOpenModalCreate} onCancel={handleCancel} />
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
        <HeaderTitle title="List Category" />
        <FormSearchCategory />
        <ResultCategory />
      </BoxContainer>
    </>
  );
};

export default ListCategory;
