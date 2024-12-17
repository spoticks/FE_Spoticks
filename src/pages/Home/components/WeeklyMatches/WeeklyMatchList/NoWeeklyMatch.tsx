import Cone from "@/assets/cone.svg?react";

export default function NoWeeklyMatch() {
  return (
    <div className="flex items-center">
      <Cone className="size-28" />
      <div>
        <p className="text-xl font-bold">이번 주에는 경기가 없어요!</p>
        <p className="text-center font-medium text-text-tertiary">~한 주 쉬어갑니다~</p>
      </div>
    </div>
  );
}
