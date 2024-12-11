import CustomErrorBoundary from "@/common/components/atoms/CustomErrorBoundary";
import Loading from "@/common/components/atoms/Loading";
import WeeklyMatchList from "@/pages/Home/components/WeeklyMatches/WeeklyMatchList";
import { Suspense } from "react";

export default function WeeklyMatches() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold">이번주 경기</h1>
      <Suspense fallback={<Loading />}>
        <CustomErrorBoundary>
          <WeeklyMatchList />
        </CustomErrorBoundary>
      </Suspense>
    </section>
  );
}
