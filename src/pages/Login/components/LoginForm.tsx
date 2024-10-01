import Button from "@/common/components/atoms/Button";
import FormInputField from "@/common/components/molecules/FormInputField";
import useLoginMutation from "@/pages/Login/api/useLoginMutation";
import { LoginFormType } from "@/common/types/formTypes";
import { validationRules } from "@/validationRules";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { onSubmit } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({ mode: "onTouched" });

  return (
    <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        label="이메일"
        register={register("email", validationRules.email)}
        error={errors.email}
        inputType="email"
      />
      <FormInputField
        label="비밀번호"
        register={register("password", validationRules.password)}
        error={errors.password}
        inputType="password"
      />
      <Button content="로그인 하기" isValid={isValid} />
    </form>
  );
}
