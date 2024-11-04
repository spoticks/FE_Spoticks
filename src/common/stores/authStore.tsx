import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStateStore {
  memberId: number | null;
  memberName: string | null;
  phoneNumber: string | null;
  accessToken: string | null;
}

interface AuthStateActions {
  login: (token: string, memberName: string, memberId: number) => void;
  logout: () => void;
}
interface AuthStore extends AuthStateStore, AuthStateActions {}

const initialState = {
  accessToken: null,
  memberId: null,
  memberName: null,
  phoneNumber: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: (accessToken: string, memberName: string, memberId: number) =>
        set({ accessToken, memberName, memberId }),
      logout: () => set(() => initialState),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);

export default useAuthStore;
