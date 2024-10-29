import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStateStore {
  id: string | null;
  memberName: string | null;
  phoneNumber: string | null;
  accessToken: string | null;
}

interface AuthStateActions {
  login: (token: string, memberName: string, id: string) => void;
  logout: () => void;
}
interface AuthStore extends AuthStateStore, AuthStateActions {}

const initialState = {
  accessToken: null,
  id: null,
  memberName: null,
  phoneNumber: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: (accessToken: string, memberName: string, id: string) =>
        set({ accessToken, memberName, id }),
      logout: () => set(() => initialState),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);

export default useAuthStore;
