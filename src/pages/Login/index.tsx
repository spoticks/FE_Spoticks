import LoginForm from "@/pages/Login/components/LoginForm";
import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import LinkButton from "@/common/components/atoms/button/LinkButton";
import { RED_TEXT_STYLE_AUTH } from "@/common/buttonStyles";

export default function Login() {
  return (
    <section className="flex w-full flex-col items-center pt-12">
      <AuthFirstHeading content="어서오세요!" />
      <span>
        아직 회원이 아니신가요?{" "}
        <LinkButton content="회원가입" linkTo="/sign-up" style={RED_TEXT_STYLE_AUTH} /> 하세요.
      </span>
      <LoginForm />
    </section>
  );
}
