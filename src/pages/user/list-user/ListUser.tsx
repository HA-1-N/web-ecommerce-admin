import { Breadcrumb, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import FormSearchUser from './FormSearchUser';
import ResultUser from './ResultUser';
import { FilterUserModel, UserModel } from '@/model/user.model';
import { filterUserApi } from '@/api/user.api';
import { useAppDispatch } from '@/app/hook';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';
import { DEFAULT_PAGE_SIZE, TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { ParamsModel } from '@/model/page.model';

const ListUser = () => {
  const initialValues: FilterUserModel = {
    name: null,
    email: null,
    gender: null,
    phone: null,
    dateOfBirth: null,
  };

  const dispatch = useAppDispatch();

  // const [valuesUpload, setValuesUpload] = useState<FilterUserModel>(initialValues);
  const [userDetail, setUserDetail] = useState<UserModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getUserFilter = async (values: FilterUserModel, params: ParamsModel) => {
    filterUserApi(values, params)
      .then((res) => {
        setUserDetail(res?.data);
        setTotalCount(parseInt(res?.headers[TOTAL_COUNT_HEADER]));
      })
      .catch((err) => {
        dispatch(
          openNotification({
            message: getMsgErrorApi(err),
            type: 'error',
          }),
        );
      });
  };

  useEffect(() => {
    const params = {
      page: page - 1,
      size: DEFAULT_PAGE_SIZE,
    };
    getUserFilter(initialValues, params);
  }, [page]);

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
        <FormSearchUser page={page} getUserFilter={getUserFilter} />
        <ResultUser page={page} totalCount={totalCount} setPage={setPage} userDetail={userDetail} />
      </BoxContainer>
    </>
  );
};

export default ListUser;
