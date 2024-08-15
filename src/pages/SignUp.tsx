import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import InputErrorMessage from "../components/InputErrorMessage";
import { SignUpForm, validationRules } from "../validationRules";

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
        <Input label="이메일" type="email" register={register("email", validationRules.email)} />
        <InputErrorMessage error={errors.email} />
        <Input label="이름" register={register("name", validationRules.name)} />
        <InputErrorMessage error={errors.name} />
        <Input label="휴대전화" register={register("phoneNumber", validationRules.phoneNumber)} />
        <InputErrorMessage error={errors.phoneNumber} />
        <Input
          label="비밀번호"
          type="password"
          register={register("password", validationRules.password)}
        />
        <InputErrorMessage error={errors.password} />
        <Input
          label="비밀번호 재확인"
          type="password"
          register={register("passwordConfirmation", {
            ...validationRules.passwordConfirmation,
            validate: (value) => validationRules.passwordConfirmation.validate(value, getValues),
          })}
        />
        <InputErrorMessage error={errors.passwordConfirmation} />
        <Button content="회원가입 하기" isValid={isValid} />
      </form>
    </section>
  );
}
