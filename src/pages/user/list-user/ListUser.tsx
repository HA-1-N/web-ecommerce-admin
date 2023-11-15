import { Breadcrumb, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchUser from './FormSearchUser';
import ResultUser from './ResultUser';
import { FilterUserModel, UserModel } from '@/model/user.model';
import { filterUserApi } from '@/api/user.api';

const ListUser = () => {
  const initialValues: FilterUserModel = {
    name: null,
    email: null,
    gender: null,
    phone: null,
    dateOfBirth: null,
  };

  // const [valuesUpload, setValuesUpload] = useState<FilterUserModel>(initialValues);
  const [userDetail, setUserDetail] = useState<UserModel[]>([]);

  const getUserFilter = async (values: FilterUserModel) => {
    filterUserApi(values)
      .then((res) => {
        setUserDetail(res?.data);
      })
      .catch((err) => {
        console.log('err...', err);
      });
  };

  useEffect(() => {
    getUserFilter(initialValues);
  }, []);

  return (
    <>
      <div>
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: 'List User',
            },
          ]}
        />
      </div>

      <BoxContainer>
        <HeaderTitle title="List User" />
        <FormSearchUser getUserFilter={getUserFilter} />
        <ResultUser userDetail={userDetail} />
      </BoxContainer>
    </>
  );
};

export default ListUser;
