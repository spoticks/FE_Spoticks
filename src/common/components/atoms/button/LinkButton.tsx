import { BaseMatch } from "@/common/types/matchTypes";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  content: string;
  linkTo: string;
  style: string;
  state?: { match: BaseMatch };
}
export default function LinkButton({ content, linkTo, state, style }: LinkButtonProps) {
  return (
    <Link to={linkTo} className={`transition-all duration-300 ${style}`} state={state}>
      {content}
    </Link>
  );
}
