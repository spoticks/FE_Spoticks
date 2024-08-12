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
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "유효한 이메일 형식을 입력해주세요.",
    },
  },
  name: {
    required: "이름을 입력해주세요.",
  },
  phoneNumber: {
    required: "전화번호를 입력해주세요.",
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: "유효한 전화번호를 입력해주세요.",
    },
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    },
  },
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<SignUpForm>();
  const formValues = watch();
  const onSubmit: SubmitHandler<SignUpForm> = () => console.log(formValues);

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
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <Input label="이름" register={register("name", validationRules.name)} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <Input label="전화번호" register={register("phoneNumber", validationRules.phoneNumber)} />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}

          <Input
            label="비밀번호"
            type="password"
            register={register("password", validationRules.password)}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <Input
            label="비밀번호 재확인"
            type="password"
            register={register("passwordConfirmation", {
              required: "비밀번호를 재확인해주세요.",
              validate: (value) =>
                value === getValues("password") || "비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.passwordConfirmation && (
            <p className="text-red-500">{errors.passwordConfirmation.message}</p>
          )}

          <Button content="회원가입 하기" />
        </form>
      </section>
    </div>
  );
}
