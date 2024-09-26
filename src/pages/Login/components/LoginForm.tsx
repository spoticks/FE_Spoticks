import Button from "@/common/components/atoms/Button";
import Input from "@/common/components/atoms/Input";
import InputErrorMessage from "@/common/components/atoms/InputErrorMessage";
import useLoginMutation from "@/pages/Login/api/useLoginMutation";
import { validationRules } from "@/validationRules";
import { useForm } from "react-hook-form";

interface LoginFormType {
  email: string;
  password: string;
}
export default function LoginForm() {
  const { onSubmit } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({ mode: "onTouched" });

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
