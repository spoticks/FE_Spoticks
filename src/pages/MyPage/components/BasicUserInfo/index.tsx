import BasicUserInfoForm from "@/pages/MyPage/components/BasicUserInfo/BasicUserInfoForm";
import LinkButton from "@/common/components/atoms/button/LinkButton";
import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function BasicUserInfo() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <section>
      <div className="flex w-64 flex-col">
        <div className="flex justify-between text-sm">
          <h2>기본 정보</h2>
          {/** 여기서 아이디, 이메일, 이름, 전화번호 불러오기 */}
          <LinkButton
            content="탈퇴하기"
            linkTo="/profile/account-deletion"
            style="text-borders hover:text-Accent"
          />
        </div>
        <hr className="border-1 mb-4 border-borders" />
        <Suspense fallback={<Loading />}>
          <ErrorBoundary
            FallbackComponent={ErrorPage}
            onReset={reset}
            resetKeys={[location.pathname]}
          >
            <BasicUserInfoForm />
          </ErrorBoundary>
        </Suspense>
      </div>
    </section>
  );
}
