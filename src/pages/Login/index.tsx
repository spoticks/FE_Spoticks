import LoginForm from "@/pages/Login/components/LoginForm";
import AuthLinkButton from "@/common/components/atoms/AuthLinkButton";
import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";

export default function Login() {
  return (
    <section className="flex w-full flex-col justify-center pt-12">
      <AuthFirstHeading content="어서오세요!" />
      <span>
        아직 회원이 아니신가요? <AuthLinkButton buttonText="회원가입" linkTo="sign-up" /> 하세요.
      </span>
      <LoginForm />
    </section>
  );
}
