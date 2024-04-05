import { Breadcrumb, Button } from 'antd';
import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchColor from './FormSearchColor';
import ResultColor from './ResultColor';
import ModalCreateColor from '../modal/ModalCreateColor';

const ListColor = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleClickCreate = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
  };
  return (
    <>
      <ModalCreateColor isModalOpen={isOpenModalCreate} onCancel={handleCancel} />
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: 'List Color',
            },
          ]}
        />

        <Button className="w-32" onClick={handleClickCreate}>
          Create Color
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="List Color" />
        <FormSearchColor />
        <ResultColor />
      </BoxContainer>
    </>
  );
};

export default ListColor;
