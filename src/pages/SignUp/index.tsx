import SignUpForm from "@/pages/SignUp/components/SignUpForm";
import AuthLinkButton from "@/common/components/atoms/AuthLinkButton";
import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";

export default function SignUp() {
  return (
    <section className="flex w-full flex-col justify-center pt-12">
      <AuthFirstHeading content="회원가입" />
      <span>
        이미 회원이신가요? <AuthLinkButton buttonText="로그인" linkTo="login" /> 하세요.
      </span>
      <SignUpForm />
    </section>
  );
}
