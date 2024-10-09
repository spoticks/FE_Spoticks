import Button from "@/common/components/atoms/Button";
import FormInputField from "@/common/components/molecules/FormInputField";
import { AuthFormType } from "@/common/types/formTypes";
import { validationRules } from "@/common/validationRules";
import onSubmitSignUpForm from "@/pages/SignUp/api/onSubmitSignUpForm";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<AuthFormType>({ mode: "onTouched" });

  return (
    <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmitSignUpForm)}>
      <FormInputField
        label="이메일"
        register={register("email", validationRules.email)}
        error={errors.email}
        inputType="email"
      />
      <FormInputField
        label="이름"
        register={register("name", validationRules.name)}
        error={errors.name}
        inputType="text"
      />
      <FormInputField
        label="휴대전화"
        register={register("phoneNumber", validationRules.phoneNumber)}
        error={errors.phoneNumber}
        inputType="text"
      />
      <FormInputField
        label="비밀번호"
        register={register("password", validationRules.password)}
        error={errors.password}
        inputType="password"
      />
      <FormInputField
        label="비밀번호 재확인"
        register={register("passwordConfirmation", {
          ...validationRules.passwordConfirmation,
          validate: (value) => validationRules.passwordConfirmation.validate(value, getValues),
        })}
        error={errors.passwordConfirmation}
        inputType="password"
      />
      <Button content="회원가입 하기" isValid={isValid} />
    </form>
  );
}
