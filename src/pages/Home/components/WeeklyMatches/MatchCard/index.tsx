import Button from "@/common/components/atoms/Button";
import { MatchData } from "@/type";
import Sun from "@/assets/icons8-sun.svg?react";
import formatDate from "@/pages/Home/utils/formatDate";
import TeamDisplay from "@/pages/Home/components/WeeklyMatches/MatchCard/TeamDisplay";

export default function MatchCard({ data }: { data: MatchData }) {
  const { homeTeamName, awayTeamName, gameStartTime } = data;

  const hours = new Date(gameStartTime).getHours();
  const minutes = new Date(gameStartTime).getMinutes();

  return (
    <div className="flex size-52 flex-col items-center justify-between rounded-2xl border border-borders bg-foreground p-4">
      {/* 경기 카드*/}
      <div className="justify-even flex items-center gap-2">
        {/* 경기 날짜 및 기상 정보 */}
        <span>
          <span className="">{formatDate(gameStartTime)}</span>
          <span className="ml-2 font-bold">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
          </span>
        </span>
        <Sun className="mt-[-0.3rem] size-6" />
      </div>
      <div className="flex items-center justify-center">
        {/* 팀 정보 */}
        <TeamDisplay teamName={homeTeamName} />
        <span className="mx-4 font-semibold">vs</span>
        <TeamDisplay teamName={awayTeamName} />
      </div>
      <Button content="예매하기" />
    </div>
  );
}
