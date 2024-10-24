import useAuthStore from "@/common/stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const { accessToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
  }));

  // 사용자가 로그인되지 않았으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // 로그인된 경우 해당 라우트를 렌더링
  return <Outlet />;
}
