import { useLocation } from "react-router-dom";

export default function useExcludeHeaderFooter() {
  const location = useLocation();

  const excludeHeaderFooterRoutes = ["/login", "/sign-up"];

  const shouldExcludeHeaderFooter = excludeHeaderFooterRoutes.includes(location.pathname);

  return shouldExcludeHeaderFooter;
}
