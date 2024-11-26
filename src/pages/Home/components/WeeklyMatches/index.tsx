import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import WeeklyMatchList from "@/pages/Home/components/WeeklyMatches/WeeklyMatchList";
import useDragScroll from "@/pages/Home/hooks/useDragScroll";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function WeeklyMatches() {
  const { containerRef, onDragStart, onDragMove, onDragEnd } = useDragScroll();
  const { reset } = useQueryErrorResetBoundary();
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">이번주 경기</h1>
      <div
        className="hide-scrollbar flex w-full snap-x gap-4 overflow-scroll"
        ref={containerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <Suspense fallback={<Loading />}>
          <ErrorBoundary
            FallbackComponent={ErrorPage}
            onReset={reset}
            resetKeys={[location.pathname]}
          >
            <WeeklyMatchList />
          </ErrorBoundary>
        </Suspense>
      </div>
    </>
  );
}
