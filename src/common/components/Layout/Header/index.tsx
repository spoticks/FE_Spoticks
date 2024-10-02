import HeaderNav from "./HeaderNav";
import AuthButtonGroup from "./AuthButtonGroup";
import UserButton from "./UserButton";
import AppLogo from "@/common/components/atoms/AppLogo";
import useAuthStore from "@/stores/authStore";

export default function Header() {
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  return (
    <header className="sticky top-0 z-50 flex h-[80px] w-full justify-center border bg-foreground">
      <div className="flex w-[1280px] items-center">
        <AppLogo />
        <HeaderNav />
        {!isLoggedIn ? <AuthButtonGroup /> : <UserButton />}
      </div>
    </header>
  );
}
