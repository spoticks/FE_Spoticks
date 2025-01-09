import SignUpForm from "@/pages/SignUp/components/SignUpForm";
import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import LinkButton from "@/common/components/atoms/button/LinkButton";
import AppLogo from "@/common/components/atoms/AppLogo";

export default function SignUp() {
  return (
    <section className="flex w-full flex-col items-center pt-12">
      <AppLogo style="size-11 pb-2" />
      <AuthFirstHeading content="회원가입" />
      <span>
        이미 회원이신가요? <LinkButton content="로그인" linkTo="/login" style="btn-red-text" />{" "}
        하세요.
      </span>
      <SignUpForm />
    </section>
  );
}
