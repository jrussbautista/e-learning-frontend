import { create } from 'zustand';

import authService from '@/services/authService';
import { LoginDTO, User } from '@/types/auth';
import { setAuth } from '@/utils/authUtils';
import { getServerError } from '@/utils/errorUtils';

type AuthState = {
  currentUser: User | null;
  isLoading: boolean;
  login: (values: LoginDTO) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  logOut: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isLoading: true,
  login: async (values: LoginDTO) => {
    try {
      const { auth_token } = await authService.login(values);
      setAuth(auth_token);
      const currentUser = await authService.getMe();
      set({ currentUser, isLoading: false });
    } catch (error) {
      set({ currentUser: null, isLoading: false });
      throw getServerError(error);
    }
  },
  getCurrentUser: async () => {
    try {
      const currentUser = await authService.getMe();
      set({ currentUser, isLoading: false });
    } catch (error) {
      set({ currentUser: null, isLoading: false });
      throw getServerError(error);
    }
  },
  logOut: () => {
    set({ currentUser: null, isLoading: false });
  },
}));

export default useAuthStore;
