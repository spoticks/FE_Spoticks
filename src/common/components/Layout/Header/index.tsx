import HeaderNav from "./HeaderNav";
import AuthButtonGroup from "./AuthButtonGroup";
import UserButton from "./UserButton";
import AppLogo from "@/common/components/atoms/AppLogo";
import useMemberInfo from "@/hooks/useMemberInfo";

export default function Header() {
  const { authority } = useMemberInfo();

  return (
    <header className="sticky top-0 flex h-[80px] w-full justify-center border bg-foreground">
      <div className="flex w-content-width items-center justify-between">
        <AppLogo />
        {authority !== "ROLE_ADMIN" && <HeaderNav />}
        {!authority.length ? <AuthButtonGroup /> : <UserButton />}
      </div>
    </header>
  );
}
