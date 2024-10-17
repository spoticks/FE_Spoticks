import { Link } from "react-router-dom";

interface LinkButtonProps {
  content: string;
  linkTo: string;
  style: string;
}
export default function LinkButton({ content, linkTo, style }: LinkButtonProps) {
  return (
    <Link to={linkTo} className={`transition-all duration-300 ${style}`}>
      {content}
    </Link>
  );
}
