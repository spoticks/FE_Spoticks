import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function useLogoutMutation(
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { logout } = useAuthStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await axiosInstance.post("auth/logout");
    },
    onSuccess: () => {
      logout();
      setIsPopoverOpen(false);
      alertToast("로그아웃 되었습니다!", "info");
      queryClient.clear();
      if (pathname.startsWith("/profile") || pathname.startsWith("/admin")) {
        navigate("/", { replace: true });
      } else if (pathname.startsWith("/reservation")) {
        navigate(-1);
      }
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const status = err.response?.status;
        if (status >= 400 && status < 500) {
          alertToast("잘못된 요청입니다! 요청 주소를 확인해주세요!", "error");
        }
      } else if (err.request) {
        alertToast("서버로부터 응답이 없습니다!", "error");
      } else {
        alertToast("요청 중 문제가 발생했습니다!", "error");
      }
    },
  });
  function handleLogout() {
    logoutMutation.mutate();
  }

  return { handleLogout };
}
