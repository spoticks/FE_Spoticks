import { Link } from "react-router-dom";
import Button from "../Button";
import Logo from "../Logo";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="fixed flex h-[80px] w-full justify-center border bg-foreground">
      <div className="flex w-[1280px] items-center">
        <Logo />
        <HeaderNav />
        <div className="flex w-32 items-center justify-between text-[18px]">
          <Link to={"/sign-up"}>
            <Button content="회원가입" />
          </Link>
          <Link to={"/login"}>
            <Button content="로그인" />
          </Link>
        </div>
      </div>
    </header>
  );
}
