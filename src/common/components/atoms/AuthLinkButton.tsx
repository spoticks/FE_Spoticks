import { Link } from "react-router-dom";

export default function AuthLinkButton({ linkType }: { linkType: "회원가입" | "로그인" }) {
  return (
    <Link
      className="text-Accent hover:text-button-hovered"
      to={linkType === "회원가입" ? "/sign-up" : "/login"}
    >
      {linkType}
    </Link>
  );
}
