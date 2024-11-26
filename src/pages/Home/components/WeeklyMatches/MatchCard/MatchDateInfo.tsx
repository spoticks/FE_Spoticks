import formatDate from "@/pages/Home/utils/formatDate";
import Sun from "@/assets/icons8-sun.svg?react";

export default function MatchDateInfo({ gameStartTime }: { gameStartTime: string }) {
  const hours = new Date(gameStartTime).getHours();
  const minutes = new Date(gameStartTime).getMinutes();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* 경기 날짜 및 기상 정보 */}
      <div className="flex w-full justify-center">
        <p className="">{formatDate(gameStartTime)}</p>
        <p className="ml-2 font-bold">
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
        </p>
        <Sun className="size-6" />
      </div>
    </div>
  );
}
