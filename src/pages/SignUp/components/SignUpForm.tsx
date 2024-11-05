import { RED_BUTTON_STYLE_AUTH } from "@/common/buttonStyles";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import FormInputField from "@/common/components/molecules/FormInputField";
import { AuthFormType } from "@/common/types/formTypes";
import { signUpFormSchema } from "@/common/validationSchema";
import onSubmitSignUpForm from "@/pages/SignUp/api/onSubmitSignUpForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<AuthFormType>({ resolver: zodResolver(signUpFormSchema), mode: "onTouched" });

  return (
    <form className="my-4 flex w-64 flex-col" onSubmit={handleSubmit(onSubmitSignUpForm)}>
      <FormInputField
        label="아이디"
        register={register("userName")}
        error={errors.userName}
        inputType="text"
      />
      <FormInputField
        label="휴대전화"
        register={register("phoneNumber")}
        error={errors.phoneNumber}
        inputType="text"
      />
      <FormInputField
        label="이름"
        register={register("name")}
        error={errors.name}
        inputType="text"
      />

      <FormInputField
        label="비밀번호"
        register={register("password")}
        error={errors.password}
        inputType="password"
      />
      <FormInputField
        label="비밀번호 재확인"
        register={register("passwordConfirmation")}
        error={errors.passwordConfirmation}
        inputType="password"
      />
      <BasicButton content="회원가입 하기" disabled={!isValid} style={RED_BUTTON_STYLE_AUTH} />
    </form>
  );
}
