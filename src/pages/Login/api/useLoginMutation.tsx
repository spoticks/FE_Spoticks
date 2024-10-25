import useAuthStore from "@/common/stores/authStore";
import axiosInstance from "@/common/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormType {
  username: string;
  password: string;
}

export default function useLoginMutation() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    // 로그인 로직인데 주소 및 기타 로직은 api 나오면 수정할 것
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      return await axiosInstance.post("auth/login", { username, password });
    },
    onSuccess: (res) => {
      const accessToken = res.data;
      useAuthStore.getState().login(accessToken);
      navigate("/");
    },
    onError: (err) => {
      console.error("로그인이 실패했습니다! :", err);
    },
  });
  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    // 로그인 양식 제출 로직
    loginMutation.mutate(data);
    console.log(data);
  };

  return { onSubmit };
}
