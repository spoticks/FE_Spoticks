import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStateStore {
  accessToken: string | null;
}

interface AuthStateActions {
  login: (token: string) => void;
  logout: () => void;
}
interface AuthStore extends AuthStateStore, AuthStateActions {}

const initialState = {
  accessToken: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: (accessToken: string) => set({ accessToken }),
      logout: () => set(() => initialState),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);

export default useAuthStore;
