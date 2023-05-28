import { AxiosError } from 'axios';
import { create } from 'zustand';

import authService from '@/services/authService';
import { LoginDTO, User } from '@/types/auth';
import { setAuth } from '@/utils/authUtils';
import { getServerError } from '@/utils/errorUtils';

type AuthState = {
  currentUser: User | null;
  login: (values: LoginDTO) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  login: async (values: LoginDTO) => {
    try {
      const { auth_token } = await authService.login(values);
      setAuth(auth_token);
      const currentUser = await authService.getMe();
      set({ currentUser });
    } catch (error) {
      throw getServerError(error);
    }
  },
}));

export default useAuthStore;
