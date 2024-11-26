import useMainMatch from "@/pages/Home/api/useMainMatch";
import MainMatchInfo from "@/pages/Home/components/MainMatch/MainMatchInfo";
import TicketOffSale from "@/pages/Home/components/MainMatch/TicketOffSale";
import Timer from "@/pages/Home/components/MainMatch/Timer";
import isSaleTimeOff from "@/pages/Home/utils/isSaleTimeOff";

export default function MainMatchContent() {
  const {
    data: { homeTeam, awayTeam, timeOffSale, timeOnSale, gameId, gameStartTime },
  } = useMainMatch();

  const isTicketOnSale = isSaleTimeOff(timeOnSale, timeOffSale);
  return (
    <>
      {isTicketOnSale ? <Timer timeOffSale={timeOffSale} /> : <TicketOffSale />}
      <MainMatchInfo
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        gameId={gameId}
        timeOffSale={timeOffSale}
        timeOnSale={timeOnSale}
        gameStartTime={gameStartTime}
      />
    </>
  );
}
