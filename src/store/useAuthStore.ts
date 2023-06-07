import { create } from 'zustand';

import * as authService from '@/services/authService';
import { LoginDTO, User } from '@/types/auth';
import { removeAuth, setAuth } from '@/utils/authUtils';

type AuthState = {
  currentUser: User | null;
  isLoading: boolean;
  login: (values: LoginDTO) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  logOut: () => Promise<void>;
  setIsLoading: (value: boolean) => void;
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
      throw error;
    }
  },
  getCurrentUser: async () => {
    try {
      set({ isLoading: true });
      const currentUser = await authService.getMe();
      set({ currentUser, isLoading: false });
    } catch (error) {
      set({ currentUser: null, isLoading: false });
      throw error;
    }
  },
  logOut: async () => {
    await authService.logout();
    removeAuth();
    set({ currentUser: null });
  },
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useAuthStore;
