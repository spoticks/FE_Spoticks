import useMainMatch from "@/pages/Home/api/useMainMatch";
import MainMatchInfo from "@/pages/Home/components/MainMatch/MainMatchInfo";
import TicketOffSale from "@/pages/Home/components/MainMatch/TicketOffSale";
import Timer from "@/pages/Home/components/MainMatch/Timer";
import isSaleTimeOff from "@/pages/Home/utils/isSaleTimeOff";

export interface MainMatchType {
  awayTeam: string;
  gameId: number;
  gameStartTime: string;
  homeTeam: string;
  sport: string;
  stadium: string;
  timeOffSale: string;
  timeOnSale: string;
}
export default function MainMatch() {
  const {
    data: { homeTeam, awayTeam, timeOffSale, timeOnSale, gameId },
  } = useMainMatch();
  const isTicketOnSale = isSaleTimeOff(timeOnSale, timeOffSale);

  return (
    <div className="flex w-[620px] flex-col items-center gap-9">
      <div>
        <h1 className="text-2xl font-bold">
          이번주 <strong className="text-red-500">인기 매치</strong> 입니다!
        </h1>
      </div>

      {isTicketOnSale ? <Timer mainMatchStartTime={timeOffSale} /> : <TicketOffSale />}
      <MainMatchInfo
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        gameId={gameId}
        timeOffSale={timeOffSale}
        timeOnSale={timeOnSale}
      />
    </div>
  );
}
