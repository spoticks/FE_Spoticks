import Button from "@/common/components/atoms/Button";
import Input from "@/common/components/atoms/Input";
import InputErrorMessage from "@/common/components/atoms/InputErrorMessage";
import useAuthStore from "@/stores/authStore";
import { validationRules } from "@/validationRules";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormType {
  email: string;
  password: string;
}
export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({ mode: "onTouched" });
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
  return (
    <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input label="이메일" type="email" register={register("email", validationRules.email)} />
      <InputErrorMessage error={errors.email} />
      <Input
        label="비밀번호"
        type="password"
        register={register("password", validationRules.password)}
      />
      <InputErrorMessage error={errors.password} />
      <Button content="로그인 하기" isValid={isValid} />
    </form>
  );
}
