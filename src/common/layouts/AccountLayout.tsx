import useAuthStore from "@/common/stores/authStore";
import { Outlet, useNavigate } from "react-router-dom";

export default function AccountLayout() {
  const { accessToken } = useAuthStore((state) => state);
  const navigate = useNavigate();
  if (accessToken) {
    navigate("/");
  }
  return <Outlet />;
}
