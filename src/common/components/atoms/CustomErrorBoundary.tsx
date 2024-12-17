import ErrorPage from "@/pages/ErrorPage";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";

export default function CustomErrorBoundary({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onReset={reset} resetKeys={[location.pathname]}>
      {children}
    </ErrorBoundary>
  );
}
