import getContent from "@/common/components/AuthLayout/utils/getContent";
import { useLocation } from "react-router-dom";

export default function useContent() {
  const location = useLocation();
  console.log(location.pathname);
  const { heading, paragraph } = getContent(location.pathname);

  return { heading, paragraph };
}
