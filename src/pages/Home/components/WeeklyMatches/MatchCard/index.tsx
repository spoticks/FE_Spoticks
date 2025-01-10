import { MatchData } from "@/common/types/matchTypes";
import LinkButton from "@/common/components/atoms/button/LinkButton";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import MatchDateInfo from "@/pages/Home/components/WeeklyMatches/MatchCard/MatchDateInfo";
import WeeklyMatchTeam from "@/pages/Home/components/WeeklyMatches/MatchCard/WeeklyMatchTeam";
import isSaleTimeOn from "@/pages/Home/utils/isSaleTimeOn";
import extractDateData from "@/common/utils/extractDateData";

export default function MatchCard({ data }: { data: MatchData }) {
  const {
    homeTeamName,
    awayTeamName,
    gameStartTime,
    gameId,
    latitude,
    longitude,
    timeOffSale,
    timeOnSale,
    stadiumName,
  } = data;

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
    <div className="flex flex-col items-center justify-between rounded-2xl border border-borders bg-foreground p-4">
      {/* 경기 카드*/}
      <MatchDateInfo
        gameStartTime={gameStartTime}
        latitude={latitude}
        longitude={longitude}
        gameId={gameId}
      />
      <p className="mb-2 text-[16px] font-semibold text-text-tertiary">{stadiumName}</p>
      <WeeklyMatchTeam homeTeamName={homeTeamName} awayTeamName={awayTeamName} />
      {!isTicketOnSale ? (
        <BasicButton
          content="예매종료"
          disabled
          style="w-full px-3 py-2 rounded-[10px] text-[16px] text-center text-foreground disabled:cursor-not-allowed disabled:bg-disabled-button"
        />
      ) : (
        <LinkButton
          content={`${month}/${day}(${weekday}) ${hours}:${minutes}까지 예매 가능`}
          linkTo={`/reservation/${gameId}`}
          state={{ match: match }}
          style="btn-red"
        />
      )}
    </div>
  );
}
