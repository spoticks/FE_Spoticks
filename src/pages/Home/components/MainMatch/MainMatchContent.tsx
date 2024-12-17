import useMainMatch from "@/pages/Home/api/useMainMatch";
import MainMatchInfo from "@/pages/Home/components/MainMatch/MainMatchInfo";
import TicketOffSale from "@/pages/Home/components/MainMatch/TicketOffSale";
import Timer from "@/pages/Home/components/MainMatch/Timer";
import isSaleTimeOn from "@/pages/Home/utils/isSaleTimeOn";

export default function MainMatchContent() {
  const {
    data: {
      homeTeamName,
      awayTeamName,
      timeOffSale,
      timeOnSale,
      gameId,
      gameStartTime,
      stadiumName,
    },
  } = useMainMatch();

  const isTicketOnSale = isSaleTimeOn(timeOnSale, timeOffSale);
  return (
    <>
      {isTicketOnSale ? <Timer timeOffSale={timeOffSale} /> : <TicketOffSale />}
      <MainMatchInfo
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
        gameId={gameId}
        timeOffSale={timeOffSale}
        timeOnSale={timeOnSale}
        gameStartTime={gameStartTime}
        stadiumName={stadiumName}
      />
    </>
  );
}
