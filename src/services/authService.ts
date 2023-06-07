import { User } from '@/types/auth';
import { apiClient } from '@/lib/axios';

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ auth_token: string }> => {
  const { data } = await apiClient.post('/auth/token/login/', {
    email,
    password,
  });
  return data;
};

export const logout = (): Promise<void> => {
  return apiClient.post('/auth/token/logout/');
};

export const getMe = async (): Promise<User> => {
  const { data } = await apiClient.get('/auth/users/me/');
  return data;
};
