import useWeeklyMatch from "@/pages/Home/api/useWeeklyMatch";
import MatchCard from "@/pages/Home/components/WeeklyMatches/MatchCard";

export default function WeeklyMatchList() {
  const { data } = useWeeklyMatch();

  return (
    <>
      {data.map((el) => (
        <MatchCard data={el} key={el.gameId} />
      ))}
    </>
  );
}
