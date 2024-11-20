import { Outlet, useLocation } from "react-router-dom";
import Vector from "@/assets/Vector.svg?react";
import Footer from "@/common/components/Layout/Footer";
import Header from "@/common/components/Layout/Header/index";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/pages/ErrorPage";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export default function Layout() {
  const { reset } = useQueryErrorResetBoundary();
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="flex w-content-width flex-1 flex-col items-center pt-[80px]">
        <main className="flex w-full flex-1 flex-col">
          <ErrorBoundary
            FallbackComponent={ErrorPage}
            onReset={reset}
            resetKeys={[location.pathname]}
          >
            <Outlet />
          </ErrorBoundary>
        </main>
        <Vector className="fixed left-0 top-[-20px] -z-50" />
      </div>
      <Footer />
    </div>
  );
}
