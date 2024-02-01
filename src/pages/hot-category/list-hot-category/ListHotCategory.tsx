import { Breadcrumb, Button } from 'antd';
import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import ResultHotCategory from './ResultHotCategory';
import ModalCreateHotCategory from '../modal/ModalCreateHotCategory';
import { Link } from 'react-router-dom';

const ListHotCategory = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleClickCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
  };
  return (
    <>
      <ModalCreateHotCategory isModalOpen={isOpenModalCreate} onCancel={handleCancel} />
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: (
                <Link to={'/'}>
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              title: 'List Hot Category',
            },
          ]}
        />

        <Button className="w-auto" onClick={handleClickCreate}>
          Create Hot Category
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="List Hot Category" />
        <ResultHotCategory />
      </BoxContainer>
    </>
  );
};

export default ListHotCategory;
