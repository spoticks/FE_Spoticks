import { MatchData } from "@/common/types/type";
import LinkButton from "@/common/components/atoms/button/LinkButton";
import { BASIC_RED_BUTTON_STYLE } from "@/common/buttonStyles";
import isGameDatePast from "@/common/utils/isGameDatePast";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import MatchDateInfo from "@/pages/Home/components/WeeklyMatches/MatchCard/MatchDateInfo";
import WeeklyMatchTeam from "@/pages/Home/components/WeeklyMatches/MatchCard/WeeklyMatchTeam";

export default function MatchCard({ data }: { data: MatchData }) {
  const { homeTeamName, awayTeamName, gameStartTime, gameId } = data;

  /* 서버 재배포 후
  const isTicketOnSale = isSaleTimeOff(timeOnSale, timeOffSale);
  로 바꿀 것
  */
  const isGameStarted = isGameDatePast(gameStartTime);
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-borders bg-foreground p-4">
      {/* 경기 카드*/}
      <MatchDateInfo gameStartTime={gameStartTime} />
      <WeeklyMatchTeam homeTeamName={homeTeamName} awayTeamName={awayTeamName} />
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
