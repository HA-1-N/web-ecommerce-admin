import { ROLE_CONSTANT_ENUM } from '@/constants/auth.constant';
import { MenuItemsModels } from '@/model/sidebar.model';
import { Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface RenderMenuProps {
  items: MenuItemsModels[];
  userRoles: ROLE_CONSTANT_ENUM[];
}

const RenderMenu = (props: RenderMenuProps) => {
  const { items, userRoles } = props;

  const navigate = useNavigate();
  const location = useLocation();
  // const pathName = location?.pathname;

  const [currentSelectedKeys, setCurrentSelectedKeys] = useState<string>('dashboard');
  const [currentOpenKeys, setCurrentOpenKeys] = useState<string[]>([]);

  const rootSubmenuKeys = items
    .map((item) => {
      if (item.children) {
        return item.key;
      }
      return undefined;
    })
    .filter((item) => item);

  const checkAccess = (item: MenuItemsModels, userRoles: ROLE_CONSTANT_ENUM[]): boolean => {
    if (
      item?.roles?.some((role: ROLE_CONSTANT_ENUM) => userRoles?.includes(role)) ||
      (item?.children && item?.children?.some((child: MenuItemsModels) => checkAccess(child, userRoles)))
    ) {
      return true;
    }

    return false;
  };

  // check permissions
  const checkPermissions = (items: MenuItemsModels[], userRoles: ROLE_CONSTANT_ENUM[]): MenuItemsModels[] => {
    return items.reduce((allowedItems: MenuItemsModels[], currentItem: MenuItemsModels) => {
      if (checkAccess(currentItem, userRoles)) {
        const newItem: MenuItemsModels = { ...currentItem };
        if (newItem.children) {
          newItem.children = checkPermissions(newItem.children, userRoles);
        }
        allowedItems.push(newItem);
      }
      return allowedItems;
    }, []);
  };

  const handleClickItem = (item: MenuItemsModels) => {
    const pathName = item?.path;
    navigate(pathName);
    setCurrentSelectedKeys(item?.key);
  };

  const allowedItems = checkPermissions(items, userRoles);

  useEffect(() => {
    const pathname = location.pathname;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element?.children) {
        element?.children?.forEach((child) => {
          if (child.path === pathname) {
            setCurrentSelectedKeys(child.key);
            setCurrentOpenKeys([element.key]);
          }
        });
      } else {
        if (element.path === pathname) {
          setCurrentSelectedKeys(element.key);
        }
      }
    }
  }, [location.pathname, items]);

  const renderSubMenu = (subMenu: MenuItemsModels) => {
    return (
      <SubMenu key={subMenu.key} icon={subMenu.icon} title={subMenu.label}>
        {subMenu.children &&
          subMenu.children.map((child: MenuItemsModels) => {
            if (checkAccess(child, userRoles)) {
              return (
                <Menu.Item key={child.key} onClick={() => handleClickItem(child)}>
                  {child.label}
                </Menu.Item>
              );
            }
            return null;
          })}
      </SubMenu>
    );
  };

  const onOpenChange = (keys: any) => {
    // console.log('keys', keys);
    const latestOpenKey = keys.find((key: any) => currentOpenKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setCurrentOpenKeys(keys);
    } else {
      setCurrentOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[currentSelectedKeys]}
      openKeys={currentOpenKeys}
      onOpenChange={onOpenChange}
    >
      {allowedItems.map((item: MenuItemsModels) => {
        if (item.children) {
          return renderSubMenu(item);
        } else {
          return (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => handleClickItem(item)}>
              {item.label}
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};

export default RenderMenu;
