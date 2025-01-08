import useAuthStore from "@/common/stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { userName } = useAuthStore((state) => state);
  if (!userName) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
