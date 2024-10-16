import SignUpForm from "@/pages/SignUp/components/SignUpForm";
import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import LinkButton from "@/common/components/atoms/LinkButton";

export default function SignUp() {
  return (
    <section className="flex w-full flex-col justify-center pt-12">
      <AuthFirstHeading content="회원가입" />
      <span>
        이미 회원이신가요?{" "}
        <LinkButton
          content="로그인"
          linkTo="/login"
          style="text-Accent hover:text-button-hovered"
        />{" "}
        하세요.
      </span>
      <SignUpForm />
    </section>
  );
}
