import BasicButton from "@/common/components/atoms/button/BasicButton";
import LinkButton from "@/common/components/atoms/button/LinkButton";
import MatchDate from "@/common/components/molecules/MatchDate";
import { MainMatchType } from "@/pages/Home/components/MainMatch";
import MainMatchTeam from "@/pages/Home/components/MainMatch/MainMatchInfo/MainMatchTeam";
import isSaleTimeOn from "@/pages/Home/utils/isSaleTimeOn";

export default function MainMatchInfo({
  homeTeam,
  awayTeam,
  gameId,
  timeOffSale,
  timeOnSale,
  gameStartTime,
}: Pick<
  MainMatchType,
  "homeTeam" | "awayTeam" | "gameId" | "timeOffSale" | "timeOnSale" | "gameStartTime"
>) {
  const isTicketOnSale = isSaleTimeOn(timeOnSale, timeOffSale);
  return (
    <div className="flex w-full flex-col items-center justify-center rounded border border-borders bg-foreground p-4">
      <MatchDate gameStartTime={gameStartTime} />
      <MainMatchTeam homeTeam={homeTeam} awayTeam={awayTeam} />
      {isTicketOnSale ? (
        <LinkButton
          content="예매하기"
          linkTo={`/reservation/${gameId}`}
          style="w-full px-3 py-1 rounded-[10px] bg-Accent text-[16px] text-center text-foreground hover:bg-button-hovered disabled:cursor-not-allowed disabled:bg-disabled-button"
        />
      ) : (
        <BasicButton
          content="예매불가"
          disabled
          style="w-full px-3 py-1 rounded-[10px] text-[16px] text-center text-foreground disabled:cursor-not-allowed disabled:bg-disabled-button"
        />
      )}
    </div>
  );
}
