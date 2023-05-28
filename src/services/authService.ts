import { User } from '@/types/auth';
import { apiClient } from '@/lib/axios';

const login = async ({
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

const getMe = async (): Promise<User> => {
  const { data } = await apiClient.get('/auth/users/me/');
  return data;
};

const authService = {
  login,
  getMe,
};

export default authService;
