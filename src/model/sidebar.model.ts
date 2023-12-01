import { ROLE_CONSTANT_ENUM } from './../constants/auth.constant';
export interface MenuItemsModels {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
  roles: ROLE_CONSTANT_ENUM[];
  children?: MenuItemsModels[];
}
