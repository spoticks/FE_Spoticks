import useAuthStore from "@/common/stores/authStore";
import { AccountDeletionFormType } from "@/common/types/formTypes";
import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function useAccountDeletion() {
  const navigation = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const accountDeletionMutation = useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      return await axiosInstance.delete("/members", {
        data: { input: password },
      });
    },
    onSuccess: () => {
      logout();
      navigation("/");
      alertToast("성공적으로 탈퇴처리 되었습니다.", "success");
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const status = err.response?.status;
        if (status >= 400 && status < 500) {
          switch (status) {
            case 401:
              alertToast("비밀번호를 다시 확인해주세요!", "error");
              break;
            case 403:
              alertToast("로그인이 만료되었습니다. 다시 로그인 해 주세요!", "error");
          }
        } else if (status >= 500) {
          alertToast("서버에 문제가 발생했습니다! 잠시 후 다시 시도해주세요!", "error");
        }
      } else if (err.request) {
        alertToast("서버로부터 응답이 없습니다!", "error");
      } else {
        alertToast("요청 중 문제가 발생했습니다!", "error");
      }
    },
  });
  const onSubmit: SubmitHandler<AccountDeletionFormType> = (data) => {
    // 로그인 양식 제출 로직
    accountDeletionMutation.mutate(data);
  };
  return onSubmit;
}
