import useWeeklyMatchQuery from "@/pages/Home/api/useWeeklyMatchQuery";
import DragScrollContainer from "@/pages/Home/components/WeeklyMatches/WeeklyMatchList/DragScrollContainer";
import MatchCard from "@/pages/Home/components/WeeklyMatches/MatchCard";
import NoWeeklyMatch from "@/pages/Home/components/WeeklyMatches/WeeklyMatchList/NoWeeklyMatch";

export default function WeeklyMatchList() {
  const { data } = useWeeklyMatchQuery();
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
