import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useAppSelector } from '@/app/hook';
import { ROLE_CONSTANT_ENUM } from '@/constants/auth.constant';
import RenderMenu from './components/RenderMenu';
import { MenuItemsModels } from '@/model/sidebar.model';
import { RoleModel } from '@/model/auth.model';

const items: MenuItemsModels[] = [
  {
    key: 'dashboard',
    path: '/',
    icon: <UserOutlined />,
    label: 'Dashboard',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
  },
  {
    key: 'user',
    path: 'user',
    icon: <UserOutlined />,
    label: 'User',
    roles: [ROLE_CONSTANT_ENUM.USER, ROLE_CONSTANT_ENUM.ADMIN],
    children: [
      {
        key: 'list-user',
        path: 'user/list-user',
        icon: <UserOutlined />,
        label: 'List User',
        roles: [ROLE_CONSTANT_ENUM.ADMIN],
      },
    ],
  },
  {
    key: 'product',
    path: 'product',
    icon: <VideoCameraOutlined />,
    label: 'Product',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
    children: [
      {
        key: 'list-product',
        path: 'product/list-product',
        icon: <UploadOutlined />,
        label: 'List Product',
        roles: [ROLE_CONSTANT_ENUM.ADMIN],
      },
    ],
  },
  {
    key: 'size',
    path: 'size',
    icon: <VideoCameraOutlined />,
    label: 'Size',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
    children: [
      {
        key: 'list-size',
        path: 'size/list-size',
        icon: <UploadOutlined />,
        label: 'List-size',
        roles: [ROLE_CONSTANT_ENUM.ADMIN],
      },
    ],
  },
  {
    key: 'category',
    path: 'category',
    icon: <VideoCameraOutlined />,
    label: 'Category',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
    children: [
      {
        key: 'list-category',
        path: 'category/list-category',
        icon: <UploadOutlined />,
        label: 'List-category',
        roles: [ROLE_CONSTANT_ENUM.ADMIN],
      },
    ],
  },
  {
    key: 'brand',
    path: 'brand',
    icon: <VideoCameraOutlined />,
    label: 'Brand',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
    children: [
      {
        key: 'list-brand',
        path: 'brand/list-brand',
        icon: <UploadOutlined />,
        label: 'List-brand',
        roles: [ROLE_CONSTANT_ENUM.ADMIN],
      },
    ],
  },
];

const LayoutApp = () => {
  const currentUser = useAppSelector((state) => state?.user?.currentUser);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userRoles: ROLE_CONSTANT_ENUM[] = currentUser?.roles?.map((item: RoleModel) => item?.code);

  return (
    <Layout>
      <Sider
        width={250}
        style={{
          zIndex: '10',
          height: '100vh',
          minHeight: '100vh',
          color: 'white',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'sticky',
          top: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <RenderMenu items={items} userRoles={userRoles} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, position: 'sticky', top: '0' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
