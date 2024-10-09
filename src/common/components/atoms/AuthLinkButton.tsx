import { Link } from "react-router-dom";

export default function AuthLinkButton({ linkType, linkTo }: { linkType: string; linkTo: string }) {
  return (
    <Link className="text-Accent hover:text-button-hovered" to={`/${linkTo}`}>
      {linkType}
    </Link>
  );
}
