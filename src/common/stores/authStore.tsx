import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStateStore {
  id: string | null;
  userName: string | null;
  phoneNumber: string | null;
  accessToken: string | null;
}

interface AuthStateActions {
  login: (token: string) => void;
  logout: () => void;
}
interface AuthStore extends AuthStateStore, AuthStateActions {}

const initialState = {
  accessToken: null,
  id: null,
  userName: null,
  phoneNumber: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: (token: string) => set({ accessToken: token }),
      logout: () => set(() => initialState),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);

export default useAuthStore;
