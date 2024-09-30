import { Link } from "react-router-dom";
import Button from "../common/components/atoms/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpForm, validationRules } from "../validationRules";
import FormInputField from "@/common/components/molecules/FormInputField";

export default function SignUp() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<SignUpForm>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    const { passwordConfirmation, ...formData } = data;
    // 회원가입 양식 제출 로직
    console.log(passwordConfirmation, formData);
  };

  return (
    <section className="flex w-full flex-col justify-center pt-12">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <span>
        이미 회원이신가요?{" "}
        <Link className="text-Accent hover:text-button-hovered" to={"/login"}>
          로그인
        </Link>{" "}
        하세요.
      </span>
      <form className="my-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
    </section>
  );
}
