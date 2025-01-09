import CustomErrorBoundary from "@/common/components/atoms/CustomErrorBoundary";
import Loading from "@/common/components/atoms/Loading";
import MainMatchContent from "@/pages/Home/components/MainMatch/MainMatchContent";
import { Suspense } from "react";

export default function MainMatch() {
  return (
    <div className="flex w-full max-w-[620px] flex-col items-center gap-9">
      <div>
        <h1 className="text-2xl font-bold">
          이번주 <strong className="text-red-500">인기 매치</strong> 입니다!
        </h1>
      </div>
      <Suspense fallback={<Loading />}>
        <CustomErrorBoundary>
          <MainMatchContent />
        </CustomErrorBoundary>
      </Suspense>
    </div>
  );
}
