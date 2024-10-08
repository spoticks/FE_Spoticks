import SignUpForm from "@/pages/SignUp/components/SignUpForm";
import AuthLinkButton from "@/common/components/atoms/AuthLinkButton";

export default function SignUp() {
  return (
    <section className="flex w-full flex-col justify-center pt-12">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <span>
        이미 회원이신가요? <AuthLinkButton linkType="로그인" /> 하세요.
      </span>
      <SignUpForm />
    </section>
  );
}
