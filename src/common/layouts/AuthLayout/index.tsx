import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import MenuButton from "@/common/components/atoms/button/MenuButton";
import CustomErrorBoundary from "@/common/components/atoms/CustomErrorBoundary";
import Loading from "@/common/components/atoms/Loading";
import useHeaderDescription from "@/common/layouts/AuthLayout/hooks/useHeaderDescription";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

const myTicketMenu = ["예매완료", "취소내역"];
export default function AuthLayout() {
  const { pathname } = useLocation();
  const { heading, paragraph } = useHeaderDescription();
  // 로그인된 경우 해당 라우트를 렌더링
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <AuthFirstHeading content={heading} />
        <span className="mb-5 text-[20px] text-text-primary opacity-50">{paragraph}</span>
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
    </div>
  );
}
