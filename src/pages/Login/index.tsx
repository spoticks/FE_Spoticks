import { Link } from "react-router-dom";
import LoginForm from "@/pages/Login/components/LoginForm";

export default function Login() {
  return (
    <section className="flex w-full flex-col justify-center pt-12">
      <h1 className="text-2xl font-bold">어서오세요!</h1>
      <span>
        아직 회원이 아니신가요?{" "}
        <Link className="text-Accent hover:text-button-hovered" to={"/sign-up"}>
          회원가입
        </Link>{" "}
        하세요.
      </span>
      <LoginForm />
    </section>
  );
}
