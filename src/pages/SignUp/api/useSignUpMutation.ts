import { AuthFormType } from "@/common/types/formTypes";
import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function useSignUpMutation() {
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: async ({ userName, password, memberName, phoneNumber }: AuthFormType) => {
      return await axiosInstance.post("join", { userName, password, memberName, phoneNumber });
    },
    onSuccess: () => {
      navigate("/login");
      alertToast("회원가입 되었습니다! 환영합니다!", "success");
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const status = err.response?.status;
        if (status >= 400 && status < 500) {
          alertToast(
            "회원가입을 진행할 수 없습니다! 중복 검사를 통과한 후 다시 시도해주세요!",
            "error",
          );
        }
      } else if (err.request) {
        alertToast("서버로부터 응답이 없습니다!", "error");
      } else {
        alertToast("요청 중 문제가 발생했습니다!", "error");
      }
    },
  });
  const onSubmit: SubmitHandler<AuthFormType> = (data) => {
    // 로그인 양식 제출 로직
    signUpMutation.mutate(data);
  };

  return { onSubmit };
}
