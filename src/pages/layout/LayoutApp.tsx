/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { ROLE_CONSTANT_ENUM } from '@/constants/auth.constant';
import RenderMenu from './components/RenderMenu';
import { MenuItemsModels } from '@/model/sidebar.model';
import { RoleModel } from '@/model/auth.model';
import { clearStorage, getLocalStorageRefreshToken } from '@/utils/auth.util';
import { logoutApi } from '@/api/auth.api';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';

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
  {
    key: 'order',
    path: '/order',
    icon: <VideoCameraOutlined />,
    label: 'Order',
    roles: [ROLE_CONSTANT_ENUM.ADMIN],
  },
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
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state?.user?.currentUser);
  const getRefreshToken = getLocalStorageRefreshToken();

  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userRoles: ROLE_CONSTANT_ENUM[] = currentUser?.roles?.map((item: RoleModel) => item?.code);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickLogout = async () => {
    const params = {
      refreshToken: getRefreshToken,
    };
    try {
      const res = await logoutApi(params.refreshToken);
      if (res) {
        clearStorage();
        window.location.href = '/login';
      }
    } catch (error) {
      dispatch(openNotification({ type: 'error', message: getMsgErrorApi(error), description: 'Error' }));
    }
  };

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
        <img
          className="demo-logo-vertical"
          src="https://img.freepik.com/free-vector/flat-design-cross-country-design-logo_23-2149481837.jpg"
          alt="image"
          style={{
            width: '100%',
            height: 'auto',
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'center',
          }}
        />
        <RenderMenu items={items} userRoles={userRoles} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, position: 'sticky', top: '0', zIndex: 10 }}>
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

          <div className="float-right mr-20 w-50 h-auto cursor-pointer">
            <div className="flex items-center" onClick={handleClick}>
              <img
                src={
                  currentUser?.image
                    ? currentUser?.image
                    : 'https://res.cloudinary.com/dfk460xfr/image/upload/v1717402890/qh33moogyvofjsucjs0x.png'
                }
                alt={'logo user'}
                className="w-10 h-auto flex justify-center py-4"
              />
              <span className="text-black text-lg">{currentUser?.name}</span>
            </div>
          </div>
        </Header>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              right: '70px',
              top: '70px',
              zIndex: 10,
              width: '150px',
            }}
            className="bg-white flex items-center justify-center p-4 hover:bg-gray-300 transition duration-200 ease-in-out hover:ease-in"
          >
            <LogoutOutlined />
            <span className="text-black text-lg ml-2" onClick={handleClickLogout}>
              Logout
            </span>
          </div>
        )}
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
