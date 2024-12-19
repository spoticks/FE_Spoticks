import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import axios from "axios";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userName } = useAuthStore((state) => state);
  useEffect(() => {
    async function reissueAuth() {
      if (userName) {
        // = 로그인하고 새로고침 한 경우
        try {
          const axiosRefreshInstance = axios.create({
            baseURL: "https://api.spoticks.shop/",
            timeout: 3000,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          const response = await axiosRefreshInstance.post(`/auth/reissue/${userName}`);
          const { token } = response.data;
          useAuthStore.getState().login(token);
        } catch (err) {
          useAuthStore.getState().logout();
          alertToast("다시 로그인 해주세요!", "error");
        }
      }
    }

    reissueAuth();
  }, [userName]);

  return <>{children}</>;
}
