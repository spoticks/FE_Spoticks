import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  userName: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  userName: null,
  login: (token: string, name: string) =>
    set({ isLoggedIn: true, accessToken: token, userName: name }),
  logout: () => set({ isLoggedIn: false, accessToken: null, userName: null }),
}));

export default useAuthStore;
