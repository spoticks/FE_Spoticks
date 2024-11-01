import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg?react";
import useAuthStore from "@/common/stores/authStore";
import isValidMemberId from "@/common/isValidMemberId";

export default function AppLogo() {
  const { memberId } = useAuthStore((state) => ({
    ...state,
  }));

  const linkTo = isValidMemberId(memberId) ? "/" : "/admin";

  return (
    <Link to={linkTo}>
      <Logo className="size-7" />
    </Link>
  );
}
