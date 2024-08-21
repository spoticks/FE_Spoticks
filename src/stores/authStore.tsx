import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  userName: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
}
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      userName: null,
      login: (token: string, name: string) =>
        set({ isLoggedIn: true, accessToken: token, userName: name }),
      logout: () => set({ isLoggedIn: false, accessToken: null, userName: null }),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);

export default useAuthStore;
