import useAuthStore from "@/common/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormType {
  email: string;
  password: string;
}

export default function useLoginMutation() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    // 로그인 로직인데 주소 및 기타 로직은 api 나오면 수정할 것
    mutationFn: (loginData: LoginFormType) => axios.post("http://localhost:3000/login", loginData),
    onSuccess: (res) => {
      // 본 로직
      // const user = res.data[0];
      // console.log(res);
      // localStorage.setItem("accessToken", user.accessToken);
      // localStorage.setItem("username", user.username);

      // 임시 로직
      localStorage.setItem("accessToken", "1234");
      useAuthStore.getState().login("1234", "홍길동님");
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
