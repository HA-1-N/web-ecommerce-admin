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
        path: '/user/list-user',
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
        path: '/product/list-product',
        icon: <UploadOutlined />,
        label: 'List Product',
        roles: [ROLE_CONSTANT_ENUM.ADMIN],
      },
      {
        key: 'list-product-quantity',
        path: '/product/list-product-quantity',
        icon: <UploadOutlined />,
        label: 'List Product Quantity',
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
        path: '/size/list-size',
        icon: <UploadOutlined />,
        label: 'List-size',
        roles: [ROLE_CONSTANT_ENUM.ADMIN],
      },
    ],
  },
  {
    key: 'color',
    path: '/color/list-color',
    icon: <VideoCameraOutlined />,
    label: 'Color',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
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
        path: '/category/list-category',
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
        path: '/brand/list-brand',
        icon: <UploadOutlined />,
        label: 'List-brand',
        roles: [ROLE_CONSTANT_ENUM.ADMIN],
      },
    ],
  },
  {
    key: 'banner',
    path: '/banner/list-banner',
    icon: <VideoCameraOutlined />,
    label: 'Banner',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
  },
  {
    key: 'hot-category',
    path: '/hot-category/list-hot-category',
    icon: <VideoCameraOutlined />,
    label: 'Hot category',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
  },
  {
    key: 'payment-type',
    path: '/payment-type',
    icon: <VideoCameraOutlined />,
    label: 'Payment Type',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
  },
  {
    key: 'shipping-method',
    path: '/shipping-method',
    icon: <VideoCameraOutlined />,
    label: 'Shipping Method',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
  },
  {
    key: 'order-status',
    path: '/order-status',
    icon: <VideoCameraOutlined />,
    label: 'Order Status',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
  },
  // {
  //   key: 'order',
  //   path: '/order',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Order',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'review',
  //   path: '/review',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Review',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'role',
  //   path: '/role',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Role',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'permission',
  //   path: '/permission',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Permission',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'setting',
  //   path: '/setting',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Setting',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'report',
  //   path: '/report',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Report',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'notification',
  //   path: '/notification',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Notification',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'contact',
  //   path: '/contact',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Contact',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'faq',
  //   path: '/faq',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Faq',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'blog',
  //   path: '/blog',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Blog',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
  // {
  //   key: 'comment',
  //   path: '/comment',
  //   icon: <VideoCameraOutlined />,
  //   label: 'Comment',
  //   roles: [ROLE_CONSTANT_ENUM.ADMIN],
  // },
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
        theme="light"
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
