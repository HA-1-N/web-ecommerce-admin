import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

const items = [
  {
    key: '/',
    icon: <UserOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'User',
    children: [
      {
        key: 'user/list-user',
        icon: <UserOutlined />,
        label: 'List User',
      },
    ],
  },
  {
    key: 'product',
    icon: <VideoCameraOutlined />,
    label: 'Product',
    children: [
      {
        key: 'product/product-1',
        icon: <UploadOutlined />,
        label: 'Product One',
      },
    ],
  },
  {
    key: 'size',
    icon: <VideoCameraOutlined />,
    label: 'Size',
    children: [
      {
        key: 'size/list-size',
        icon: <UploadOutlined />,
        label: 'List-size',
      },
    ],
  },
];

const LayoutApp = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickItem = (item: any) => {
    const key = item?.key;
    navigate(key);
  };

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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={items}
          onClick={(item) => handleClickItem(item)}
        />
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
