import { BasicInformationType } from "@/common/types/formTypes";
import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler } from "react-hook-form";

export default function useUpdatePhoneNumberMutation() {
  const queryClient = useQueryClient();

  const updatePhoneNumberMutation = useMutation({
    mutationFn: async ({ phoneNumber }: BasicInformationType) =>
      await axiosInstance.patch(`/members/me`, { phoneNumber }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        { queryKey: ["memberInfo"], exact: true },
        { throwOnError: true },
      );
      alertToast("전화번호를 성공적으로 변경했습니다!", "success", "top");
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const status = err.response?.status;
        if (status >= 400 && status < 500) {
          alertToast(
            "요청하신 정보를 변경할 수 없습니다! 번호를 확인하신 후 다시 시도해주세요!",
            "error",
            "top",
          );
        }
      } else if (err.request) {
        alertToast("서버로부터 응답이 없습니다!", "error", "top");
      } else {
        alertToast("요청 중 문제가 발생했습니다!", "error", "top");
      }
    },
  });
  const onSubmit: SubmitHandler<{ phoneNumber: string }> = (data) => {
    // 로그인 양식 제출 로직
    updatePhoneNumberMutation.mutate(data);
  };
  return onSubmit;
}
