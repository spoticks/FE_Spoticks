import Logo from "../Logo";
import HeaderNav from "./HeaderNav";
import useAuthStore from "../../stores/authStore";
import AuthButtonGroup from "./AuthButtonGroup";
import UserButton from "./UserButton";

export default function Header() {
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  return (
    <header className="fixed z-50 flex h-[80px] w-full justify-center border bg-foreground">
      <div className="flex w-[1280px] items-center">
        <Logo />
        <HeaderNav />
        {!isLoggedIn ? <AuthButtonGroup /> : <UserButton />}
      </div>
    </header>
  );
}
