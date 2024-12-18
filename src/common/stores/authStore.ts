import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStateStore {
  accessToken: string | null;
  userName: string | null;
}

interface AuthStateActions {
  login: (token: string) => void;
  logout: () => void;
}
interface AuthStore extends AuthStateStore, AuthStateActions {}

const initialState = {
  accessToken: null,
  userName: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: (accessToken: string) => {
        const decodedToken = jwtDecode(accessToken);
        set({ accessToken, userName: decodedToken.sub });
      },
      logout: () => set(() => initialState),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
