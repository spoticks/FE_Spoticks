import useWeeklyMatch from "@/pages/Home/api/useWeeklyMatch";
import DragScrollContainer from "@/pages/Home/components/WeeklyMatches/WeeklyMatchList/DragScrollContainer";
import MatchCard from "@/pages/Home/components/WeeklyMatches/MatchCard";
import NoWeeklyMatch from "@/pages/Home/components/WeeklyMatches/WeeklyMatchList/NoWeeklyMatch";

export default function WeeklyMatchList() {
  const { data } = useWeeklyMatch();
  return (
    <>
      {data.length ? (
        <DragScrollContainer>
          {data.map((el) => (
            <MatchCard data={el} key={el.gameId} />
          ))}
        </DragScrollContainer>
      ) : (
        <NoWeeklyMatch />
      )}
    </>
  );
}
