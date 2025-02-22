import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userName, accessToken } = useAuthStore((state) => state);
  const { pathname } = useLocation();
  // 로그인이 필요없는 요청을 보내는 페이지에서만 새로고침 했을 때 재로그인 되도록 해야함.
  useEffect(() => {
    async function reissueAuth() {
      if (
        // = 로그인하고 새로고침 한 경우
        userName &&
        !accessToken &&
        // 요청에 굳이 토큰이 필요 없는 페이지들
        !pathname.includes("/reservation") &&
        !pathname.includes("/admin") &&
        !pathname.includes("/profile")
      ) {
        try {
          const response = await axios.post(
            `https://api.spoticks.shop/auth/reissue/${userName}`,
            {},
            {
              withCredentials: true,
            },
          );
          const { token } = response.data;
          useAuthStore.getState().login(token);
        } catch (err) {
          useAuthStore.getState().logout();
          alertToast("다시 로그인 해주세요!", "error");
        }
      }
    }

    reissueAuth();
  }, [userName, accessToken, pathname]);

  return children;
}
