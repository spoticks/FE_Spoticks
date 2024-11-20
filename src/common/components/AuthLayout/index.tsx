import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import MenuButton from "@/common/components/atoms/button/MenuButton";
import Loading from "@/common/components/atoms/Loading";
import useContent from "@/common/components/AuthLayout/hooks/useContent";
import useAuthStore from "@/common/stores/authStore";
import ErrorPage from "@/pages/ErrorPage";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet } from "react-router-dom";

const myTicketMenu = ["예매완료", "취소내역"];
export default function AuthRoute() {
  const { accessToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
  }));
  const { heading, paragraph } = useContent();
  const { reset } = useQueryErrorResetBoundary();
  // 사용자가 로그인되지 않았으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // 로그인된 경우 해당 라우트를 렌더링
  return (
    <>
      <div className="flex flex-col items-center">
        <AuthFirstHeading content={heading} />
        <p className="mb-5 font-medium text-text-tertiary">{paragraph}</p>
        {location.pathname.includes("/my-tickets") && (
          <div className="mb-4 flex gap-4">
            {myTicketMenu.map((menu) => (
              <MenuButton menu={menu} key={menu} />
            ))}
          </div>
        )}
      </div>
      <hr className="border-1 mb-10 border-borders" />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary
          FallbackComponent={ErrorPage}
          onReset={reset}
          resetKeys={[location.pathname]}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
