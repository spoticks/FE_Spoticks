import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStateStore {
  id: string | null;
  userName: string | null;
  phoneNumber: string | null;
  isLoggedIn: boolean;
  accessToken: string | null;
}

interface AuthStateActions {
  login: (token: string, name: string) => void;
  logout: () => void;
}
interface AuthStore extends AuthStateStore, AuthStateActions {}

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  id: null,
  userName: null,
  phoneNumber: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: (token: string, name: string) =>
        set({ isLoggedIn: true, accessToken: token, userName: name }),
      logout: () => set(() => initialState),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);

export default useAuthStore;
