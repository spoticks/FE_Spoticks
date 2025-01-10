import BasicButton from "@/common/components/atoms/button/BasicButton";
import LinkButton from "@/common/components/atoms/button/LinkButton";
import MatchDate from "@/common/components/atoms/MatchDate";
import { MainMatchType } from "@/common/types/matchTypes";
import extractDateData from "@/common/utils/extractDateData";
import MainMatchTeam from "@/pages/Home/components/MainMatch/MainMatchInfo/MainMatchTeam";
import isSaleTimeOn from "@/pages/Home/utils/isSaleTimeOn";

export default function MainMatchInfo({
  homeTeamName,
  awayTeamName,
  gameId,
  timeOffSale,
  timeOnSale,
  gameStartTime,
  stadiumName,
}: Pick<
  MainMatchType,
  | "homeTeamName"
  | "awayTeamName"
  | "gameId"
  | "timeOffSale"
  | "timeOnSale"
  | "gameStartTime"
  | "stadiumName"
>) {
  const isTicketOnSale = isSaleTimeOn(timeOnSale, timeOffSale);
  const { month, day, weekday, hours, minutes } = extractDateData(timeOffSale);
  const match = {
    awayTeamName,
    gameId,
    gameStartTime,
    homeTeamName,
    stadiumName,
    timeOffSale,
    timeOnSale,
  };
  return (
    <div className="flex w-full flex-col items-center justify-center rounded border border-borders bg-foreground p-4">
      <MatchDate gameStartTime={gameStartTime} />
      <span className="mb-2 text-[16px] font-semibold text-text-tertiary">{stadiumName}</span>
      <MainMatchTeam homeTeam={homeTeamName} awayTeam={awayTeamName} />
      {isTicketOnSale ? (
        <LinkButton
          content={`${month}/${day}(${weekday}) ${hours}:${minutes}까지 예매 가능`}
          linkTo={`/reservation/${gameId}`}
          state={{ match: match }}
          style="w-full px-3 py-1 rounded-[10px] bg-Accent text-[16px] text-center text-foreground hover:bg-button-hovered disabled:cursor-not-allowed disabled:bg-disabled-button"
        />
      ) : (
        <BasicButton
          content="예매종료"
          disabled
          style="w-full px-3 py-1 rounded-[10px] text-[16px] text-center text-foreground disabled:cursor-not-allowed disabled:bg-disabled-button"
        />
      )}
    </div>
  );
}
