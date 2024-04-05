import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import { useNavigate } from 'react-router-dom';
import ResultListBanner from './ResultListBanner';

const ListBanner = () => {
  const navigate = useNavigate();
  const handleClickCreate = () => {
    navigate('/banner/create-banner');
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
              title: 'List Brand',
            },
          ]}
        />

        <Button className="w-32" onClick={handleClickCreate}>
          Create Brand
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="List Banner" />
        <ResultListBanner />
      </BoxContainer>
    </>
  );
};

export default ListBanner;
