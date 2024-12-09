import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import MainMatchContent from "@/pages/Home/components/MainMatch/MainMatchContent";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function MainMatch() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <div className="flex w-[620px] flex-col items-center gap-9">
      <div>
        <h1 className="text-2xl font-bold">
          이번주 <strong className="text-red-500">인기 매치</strong> 입니다!
        </h1>
      </div>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary
          FallbackComponent={ErrorPage}
          onReset={reset}
          resetKeys={[location.pathname]}
        >
          <MainMatchContent />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
