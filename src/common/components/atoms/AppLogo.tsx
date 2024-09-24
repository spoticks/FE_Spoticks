import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg?react";

export default function AppLogo() {
  return (
    <Link to={"/"}>
      <Logo className="size-7" />
    </Link>
  );
}
