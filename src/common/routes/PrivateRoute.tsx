import useAuthStore from "@/common/stores/authStore";
import useMemberInfo from "@/hooks/useMemberInfo";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { userName } = useAuthStore((state) => state);
  const { pathname } = useLocation();
  const authority = useMemberInfo();
  if (!userName) {
    return <Navigate to="/login" />;
  }
  if (pathname.startsWith("/admin") && authority !== "ROLE_ADMIN") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
