import { UserModel } from '@/model/user.model';
import { formatDate } from '@/utils/date.util';
import { ConvertGender } from '@/utils/user.util';
import { Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

interface ResultUserProps {
  userDetail?: UserModel[] | undefined;
}

const columns: ColumnsType<UserModel> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text: string, record: UserModel) => (
    //   <Space size="middle">
    //     <Link to={`/user/${record.id}`}>{text}</Link>
    //   </Space>
    // ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (value: string, record: UserModel) => {
      return <div>{ConvertGender(value)}</div>;
    },
  },

  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },

  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },

  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
    render: (value: any, record: any) => {
      const format = formatDate(value, 'DD-MM-YYYY');
      return <div>{format}</div>;
    },
  },
];

const ResultUser = (props: ResultUserProps) => {
  const { userDetail } = props;

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={userDetail} />
      </div>
    </>
  );
};

export default ResultUser;
