import { Breadcrumb, Result } from 'antd';
import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import ResultOrder from './ResultOrder';
import FormSearchOrder from './FormSearchOrder';

const ListOrder = () => {
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
              title: 'List Order Status',
            },
          ]}
        />
      </div>
      <BoxContainer>
        <HeaderTitle title="Orders" />
        <FormSearchOrder />
        <ResultOrder />
      </BoxContainer>
    </>
  );
};

export default ListOrder;
