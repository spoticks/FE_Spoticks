import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg?react";
import useMemberInfo from "@/hooks/useMemberInfo";

export default function AppLogo() {
  const { authority } = useMemberInfo();

  const linkTo = authority === "ROLE_ADMIN" ? "/admin" : "/";

  return (
    <Link to={linkTo}>
      <Logo className="size-7" />
    </Link>
  );
}
