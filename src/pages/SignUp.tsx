import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignUpFormInput {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignUpFormInput>();
  const onSubmit: SubmitHandler<SignUpFormInput> = (data) => console.log(data);

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
          <Input label="이메일" type="email" register={register("email")} />
          <Input label="이름" register={register("name")} />
          <Input label="전화번호" register={register("phoneNumber")} />
          <Input label="비밀번호" type="password" register={register("password")} />
          <Input
            label="비밀번호 재확인"
            type="password"
            register={register("passwordConfirmation")}
          />
          <Button content="회원가입 하기" />
        </form>
      </section>
    </div>
  );
}
