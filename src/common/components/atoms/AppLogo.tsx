import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function AppLogo() {
  return (
    <Link to={"/"}>
      <img src={logo} className="size-7" />
    </Link>
  );
}
