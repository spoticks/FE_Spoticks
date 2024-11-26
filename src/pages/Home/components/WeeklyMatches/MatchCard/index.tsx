import Sun from "@/assets/icons8-sun.svg?react";
import formatDate from "@/pages/Home/utils/formatDate";
import TeamDisplay from "@/pages/Home/components/WeeklyMatches/MatchCard/TeamDisplay";
import { MatchData } from "@/common/types/type";
import LinkButton from "@/common/components/atoms/button/LinkButton";
import { BASIC_RED_BUTTON_STYLE } from "@/common/buttonStyles";
import isGameDatePast from "@/common/utils/isGameDatePast";
import BasicButton from "@/common/components/atoms/button/BasicButton";

export default function MatchCard({ data }: { data: MatchData }) {
  const { homeTeamName, awayTeamName, gameStartTime, gameId } = data;

  const hours = new Date(gameStartTime).getHours();
  const minutes = new Date(gameStartTime).getMinutes();
  // 서버 재배포 후
  // const isTicketOnSale = isSaleTimeOff(timeOnSale, timeOffSale);
  // 로 바꿀 것
  const isGameStarted = isGameDatePast(gameStartTime);
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-borders bg-foreground p-4">
      {/* 경기 카드*/}
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
      <div className="flex items-center justify-center">
        {/* 팀 정보 */}
        <TeamDisplay teamName={homeTeamName} />
        <span className="mx-4 font-semibold">vs</span>
        <TeamDisplay teamName={awayTeamName} />
      </div>
      {isGameStarted ? (
        <BasicButton
          content="예매불가"
          disabled
          style="w-full px-3 py-2 rounded-[10px] text-[16px] text-center text-foreground disabled:cursor-not-allowed disabled:bg-disabled-button"
        />
      ) : (
        <LinkButton
          content="예매하기"
          linkTo={`/reservation/${gameId}`}
          style={BASIC_RED_BUTTON_STYLE}
        />
      )}
    </div>
  );
}
