import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

export default function useLogout(setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  const { logout } = useAuthStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleLogout() {
    logout();
    setIsPopoverOpen(false);
    alertToast("로그아웃 되었습니다!", "info");

    queryClient.clear();
    if (pathname.startsWith("/profile") || pathname.startsWith("/admin")) {
      navigate("/", { replace: true });
    } else if (pathname.startsWith("/reservation")) {
      navigate(-1);
    }
  }

  return { handleLogout };
}
