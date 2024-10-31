import HeaderNav from "./HeaderNav";
import AuthButtonGroup from "./AuthButtonGroup";
import UserButton from "./UserButton";
import AppLogo from "@/common/components/atoms/AppLogo";
import useAuthStore from "@/common/stores/authStore";

export default function Header() {
  const { accessToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
  }));

  return (
    <header className="sticky top-0 flex h-[80px] w-full justify-center border bg-foreground">
      <div className="flex w-[1280px] items-center">
        <AppLogo />
        <HeaderNav />
        {!accessToken ? <AuthButtonGroup /> : <UserButton />}
      </div>
    </header>
  );
}
