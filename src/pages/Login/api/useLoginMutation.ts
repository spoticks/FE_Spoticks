import useAuthStore from "@/common/stores/authStore";
import axiosInstance from "@/common/utils/axiosInstance";
import alertToast from "@/common/utils/alertToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormType {
  userName: string;
  password: string;
}

export default function useLoginMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    // 로그인 로직인데 주소 및 기타 로직은 api 나오면 수정할 것
    mutationFn: async ({ userName, password }: { userName: string; password: string }) => {
      return await axiosInstance.post("auth/login", { userName, password });
    },
    onSuccess: (res) => {
      const { token } = res.data;
      useAuthStore.getState().login(token);
      navigate("/");
      queryClient.clear();
      alertToast("로그인에 성공했어요!", "success");
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const status = err.response?.status;
        if (status >= 400 && status < 500) {
          alertToast("아이디 혹은 비밀번호를 확인해주세요!", "error");
        }
      } else if (err.request) {
        alertToast("서버로부터 응답이 없습니다!", "error");
      } else {
        alertToast("요청 중 문제가 발생했습니다!", "error");
      }
    },
  });
  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    // 로그인 양식 제출 로직
    loginMutation.mutate(data);
  };

  return { onSubmit };
}
