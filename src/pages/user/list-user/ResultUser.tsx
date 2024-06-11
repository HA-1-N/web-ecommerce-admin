import PaginationTable from '@/components/Pagination';
import TagRole from '@/components/TagRole';
import { RoleModel } from '@/model/auth.model';
import { UserModel } from '@/model/user.model';
import { formatDate } from '@/utils/date.util';
import { ConvertGender } from '@/utils/user.util';
import { Button, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import ModalUpdateRole from '../modal/ModalUpdateRole';
// import { Link } from 'react-router-dom';

interface ResultUserProps {
  userDetail?: UserModel[] | undefined;
  page: number;
  totalCount: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ResultUser = (props: ResultUserProps) => {
  const { userDetail, page, totalCount, setPage } = props;

  const [openModalUpdate, setOpenModalUpdate] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number | null | undefined>(null);
  const [roles, setRoles] = React.useState<number[]>([]);

  const handleOpenModalUpdate = (value: UserModel) => {
    setOpenModalUpdate(true);
    setId(value?.id);
    const getRoleIds: any = value?.roles?.map((role: RoleModel) => role.id);
    setRoles(getRoleIds);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

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
      render: (value: Date) => {
        const format = formatDate(value, 'DD-MM-YYYY');
        return <div>{format}</div>;
      },
    },

    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (value: RoleModel[]) => {
        return value?.map((i: RoleModel) => <TagRole code={i?.code} text={i?.text} />);
      },
    },

    {
      title: 'Update',
      key: 'update',
      render: (value: UserModel) => (
        <Space size="middle">
          <Button type="default" size="small" onClick={() => handleOpenModalUpdate(value)}>
            Update Role
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {id && roles && (
        <ModalUpdateRole isModalOpen={openModalUpdate} onCancel={handleCloseModalUpdate} roles={roles} id={id} />
      )}
      <div className="mt-10">
        <Table columns={columns} dataSource={userDetail} pagination={false} scroll={{ x: 1500 }} rowKey="id" />
        <div className="mt-6">
          <PaginationTable page={page} total={totalCount} onChangePage={handleChangePage} />
        </div>
      </div>
    </>
  );
};

export default ResultUser;
