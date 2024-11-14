import { PasswordResettingType } from "@/common/types/formTypes";
import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler } from "react-hook-form";

export default function usePasswordResettingMutation() {
  const passwordResettingMutation = useMutation({
    mutationFn: async ({ password, newPassword }: PasswordResettingType) =>
      await axiosInstance.patch(`/members/password`, { password, newPassword }),
    onSuccess: () => {
      alertToast("비밀번호를 성공적으로 변경했습니다!", "success", "top");
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const status = err.response?.status;
        if (status >= 400 && status < 500) {
          alertToast("현재 비밀번호를 다시 확인해주세요!", "error", "top");
        }
      } else if (err.request) {
        alertToast("서버로부터 응답이 없습니다!", "error", "top");
      } else {
        alertToast("요청 중 문제가 발생했습니다!", "error", "top");
      }
    },
  });
  const onSubmit: SubmitHandler<PasswordResettingType> = (data) => {
    // 로그인 양식 제출 로직
    passwordResettingMutation.mutate(data);
  };
  return onSubmit;
}
