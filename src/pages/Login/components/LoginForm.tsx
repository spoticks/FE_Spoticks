import FormInputField from "@/common/components/molecules/FormInputField";
import useLoginMutation from "@/pages/Login/api/useLoginMutation";
import { LoginFormType } from "@/common/types/formTypes";
import { loginFormSchema } from "@/common/validationSchema";
import { useForm } from "react-hook-form";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import { RED_BUTTON_STYLE_AUTH } from "@/common/buttonStyles";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const { onSubmit } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({ resolver: zodResolver(loginFormSchema), mode: "onTouched" });

  return (
    <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        label="아이디"
        register={register("userName")}
        error={errors.userName}
        inputType="text"
      />
      <FormInputField
        label="비밀번호"
        register={register("password")}
        error={errors.password}
        inputType="password"
      />
      <BasicButton content="로그인 하기" disabled={!isValid} style={RED_BUTTON_STYLE_AUTH} />
    </form>
  );
}
