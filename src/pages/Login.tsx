import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { validationRules } from "../validationRules";
import InputErrorMessage from "../components/InputErrorMessage";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../stores/authStore";
interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onTouched" });
  const loginMutation = useMutation({
    // 로그인 로직인데 주소 및 기타 로직은 api 나오면 수정할 것
    mutationFn: (loginData: LoginForm) => axios.post("http://localhost:3000/login", loginData),
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
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    // 로그인 양식 제출 로직
    loginMutation.mutate(data);
    console.log(data);
  };
  return (
    <section className="flex w-full flex-col justify-center pt-12">
      {" "}
      <h1 className="text-2xl font-bold">어서오세요!</h1>
      <span>
        아직 회원이 아니신가요?{" "}
        <Link className="text-Accent hover:text-button-hovered" to={"/sign-up"}>
          회원가입
        </Link>{" "}
        하세요.
      </span>
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
    </section>
  );
}
