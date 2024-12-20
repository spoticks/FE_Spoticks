import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import MenuButton from "@/common/components/atoms/button/MenuButton";
import CustomErrorBoundary from "@/common/components/atoms/CustomErrorBoundary";
import Loading from "@/common/components/atoms/Loading";
import useHeaderDescription from "@/common/components/AuthLayout/hooks/useHeaderDescription";
import useAuthStore from "@/common/stores/authStore";
import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const myTicketMenu = ["예매완료", "취소내역"];
export default function AuthLayout() {
  const { userName } = useAuthStore((state) => state);
  const { pathname } = useLocation();
  const { heading, paragraph } = useHeaderDescription();
  // 사용자가 로그인되지 않았으면 로그인 페이지로 리다이렉트
  if (!userName) {
    return <Navigate to="/login" />;
  } // 로그인된 경우 해당 라우트를 렌더링
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
      {pathname.includes("my-team") ? (
        <Outlet />
      ) : (
        <Suspense fallback={<Loading />}>
          <CustomErrorBoundary>
            <Outlet />
          </CustomErrorBoundary>
        </Suspense>
      )}
    </>
  );
}
