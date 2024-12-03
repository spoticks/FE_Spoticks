import getHeaderDescription from "@/common/components/AuthLayout/utils/getHeaderDescription";
import { useLocation } from "react-router-dom";

export default function useAuthHeading() {
  const location = useLocation();
  const { heading, paragraph } = getHeaderDescription(location.pathname);

  return { heading, paragraph };
}
