import { Link } from "react-router-dom";
import Button from "../Button";

export default function AuthButtonGroup() {
  return (
    <div className="flex items-center gap-6 text-[18px]">
      <Link to={"/sign-up"}>
        <Button content="회원가입" />
      </Link>
      <Link to={"/login"}>
        <Button content="로그인" />
      </Link>
    </div>
  );
}
