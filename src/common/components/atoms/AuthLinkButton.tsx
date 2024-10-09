import { Link } from "react-router-dom";

export default function AuthLinkButton({
  buttonText,
  linkTo,
}: {
  buttonText: string;
  linkTo: string;
}) {
  return (
    <Link className="text-Accent hover:text-button-hovered" to={`/${linkTo}`}>
      {buttonText}
    </Link>
  );
}
