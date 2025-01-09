import HeaderNav from "./HeaderNav";
import AuthButtonGroup from "./AuthButtonGroup";
import UserButton from "./UserButton";
import AppLogo from "@/common/components/atoms/AppLogo";
import useMemberInfo from "@/hooks/useMemberInfo";
import useAuthStore from "@/common/stores/authStore";

export default function Header() {
  const authority = useMemberInfo();
  const { userName } = useAuthStore((state) => state);
  return (
    <header className="sticky top-0 z-50 flex h-[80px] w-full items-center justify-center border border-b-borders bg-foreground shadow-first">
      <div className="flex w-full max-w-[1280px] items-center justify-between">
        <AppLogo />
        {authority !== "ROLE_ADMIN" && <HeaderNav />}
        {!userName ? <AuthButtonGroup /> : <UserButton />}
      </div>
    </header>
  );
}
