import { RoleModel } from './auth.model';

export interface FilterUserModel {
  name?: string | null | undefined;
  email?: string | null | undefined;
  gender?: string | null | undefined;
  phone?: string | null | undefined;
  dateOfBirth?: string | null | undefined;
}

export interface UserModel {
  id?: number | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  gender?: string | null | undefined;
  age?: number | null | undefined;
  phone?: string | null | undefined;
  dateOfBirth?: number | null | undefined;
  image?: string | null | undefined;
  roles?: RoleModel[];
}
