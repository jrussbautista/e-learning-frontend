import { localStorageKeys } from '@/constants';
import { apiClient } from '@/lib/axios';

export const getAccessTokenLocalStorage = (): string | null => {
  const accessToken = window.localStorage.getItem(
    localStorageKeys.ACCESS_TOKEN
  );
  return accessToken;
};

export const removeAccessTokenLocalStorage = () => {
  window.localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
};

export const setTokenLocalStorage = (token: string) => {
  window.localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);
};

export const setAuth = (token: string) => {
  setTokenLocalStorage(token);
  apiClient.defaults.headers.common.Authorization = `Token ${token}`;
};

export const removeAuth = () => {
  removeAccessTokenLocalStorage();
  apiClient.defaults.headers.common.Authorization = ``;
};

const authUtils = {
  getAccessTokenLocalStorage,
  removeAccessTokenLocalStorage,
  setAuth,
  removeAuth,
};
export default authUtils;
