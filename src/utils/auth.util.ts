import { KEY_STORES } from '@/constants/key-store.constant';

export const setLocalStorageToken = (value: any) => {
  localStorage.setItem(KEY_STORES.accessToken, value);
};

export const setLocalStorageId = (id: any) => {
  localStorage.setItem(KEY_STORES.id, id);
};

export const getLocalStorageToken = () => {
  return localStorage.getItem(KEY_STORES.accessToken);
};

export const getLocalStorageId = () => {
  return localStorage.getItem(KEY_STORES.id);
};

export const deleteToken = () => {
  return localStorage.removeItem(KEY_STORES.accessToken);
};

export const clearStorage = () => {
  return localStorage.clear();
};
