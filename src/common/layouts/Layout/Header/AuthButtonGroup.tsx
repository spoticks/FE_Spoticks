import LinkButton from "@/common/components/atoms/button/LinkButton";

export default function AuthButtonGroup() {
  return (
    <div className="flex w-full max-w-[173px] items-center justify-between text-[18px]">
      <LinkButton content="회원가입" linkTo="/sign-up" style="hover:text-Accent" />
      <LinkButton
        content="로그인"
        linkTo="/login"
        style="rounded-[10px] border border-black px-2 py-1 hover:border-Accent hover:bg-Accent hover:text-foreground"
      />
    </div>
  );
}
