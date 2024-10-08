import LoginForm from "@/pages/Login/components/LoginForm";
import AuthLinkButton from "@/common/components/atoms/AuthLinkButton";

export default function Login() {
  return (
    <section className="flex w-full flex-col justify-center pt-12">
      <h1 className="text-2xl font-bold">어서오세요!</h1>
      <span>
        아직 회원이 아니신가요? <AuthLinkButton linkType="회원가입" /> 하세요.
      </span>
      <LoginForm />
    </section>
  );
}
