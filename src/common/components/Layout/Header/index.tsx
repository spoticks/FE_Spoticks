import HeaderNav from "./HeaderNav";
import AuthButtonGroup from "./AuthButtonGroup";
import UserButton from "./UserButton";
import AppLogo from "@/common/components/atoms/AppLogo";
import useAuthStore from "@/common/stores/authStore";
import isValidMemberId from "@/common/utils/isValidMemberId";

export default function Header() {
  const { accessToken, memberId } = useAuthStore((state) => ({
    ...state,
  }));

  return (
    <header className="sticky top-0 flex h-[80px] w-full justify-center border bg-foreground">
      <div className="flex w-full items-center justify-between">
        <AppLogo />
        {isValidMemberId(memberId) && <HeaderNav />}
        {!accessToken ? <AuthButtonGroup /> : <UserButton />}
      </div>
    </header>
  );
}
