import { Link } from "react-router-dom";
import SignUpForm from "@/pages/SignUp/components/SignUpForm";

export default function SignUp() {
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
      <SignUpForm />
    </section>
  );
}
