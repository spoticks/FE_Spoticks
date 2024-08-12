import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignUpForm {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
}
const validationRules = {
  email: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "유효한 이메일 형식을 입력해주세요.",
    },
  },
  name: {
    required: "이름을 입력해주세요.",
    pattern: {
      value: /^[a-zA-Z가-힣]{2,}$/,
      message: "이름은 최소 두 글자 이상의 한글 또는 영문만 입력 가능합니다.",
    },
  },
  phoneNumber: {
    required: "전화번호를 입력해주세요.",
    pattern: {
      value: /^010-\d{4}-\d{4}$/,
      message: "유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)",
    },
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    pattern: {
      value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
      message: "비밀번호는 영문, 숫자, 특수문자를 포함한 최소 8자 이상이어야 합니다.",
    },
  },
  passwordConfirmation: {
    required: "비밀번호를 재확인해주세요.",
    validate: (value: string, getValues: () => SignUpForm) =>
      value === getValues().password || "비밀번호가 일치하지 않습니다.",
  },
};

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SignUpForm>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    const { passwordConfirmation, ...formData } = data;
    console.log(passwordConfirmation, formData);
  };

  return (
    <div className="flex w-full flex-col justify-center pt-12">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <span>
        이미 회원이신가요?{" "}
        <Link className="text-Accent hover:text-button-hovered" to={"/login"}>
          로그인
        </Link>{" "}
        하세요.
      </span>
      <section className="my-4">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input label="이메일" type="email" register={register("email", validationRules.email)} />
          <Input label="이름" register={register("name", validationRules.name)} />
          <Input label="전화번호" register={register("phoneNumber", validationRules.phoneNumber)} />
          <Input
            label="비밀번호"
            type="password"
            register={register("password", validationRules.password)}
          />
          <Input
            label="비밀번호 재확인"
            type="password"
            register={register("passwordConfirmation", {
              ...validationRules.passwordConfirmation,
              validate: (value) => validationRules.passwordConfirmation.validate(value, getValues),
            })}
          />
          <Button content="회원가입 하기" />
        </form>
      </section>
    </div>
  );
}
