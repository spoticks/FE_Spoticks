import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStateStore {
  accessToken: string | null;
  userName: string | null;
  memberName: string | null;
}

interface AuthStateActions {
  login: (token: string) => void;
  logout: () => void;
}
interface AuthStore extends AuthStateStore, AuthStateActions {}

const initialState = {
  accessToken: null,
  userName: null,
  memberName: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: (accessToken: string) => {
        const decodedToken = jwtDecode<{ sub: string; memberName: string }>(accessToken);
        set({ accessToken, userName: decodedToken.sub, memberName: decodedToken.memberName });
      },
      logout: () => set(() => initialState),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ userName: state.userName, memberName: state.memberName }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
