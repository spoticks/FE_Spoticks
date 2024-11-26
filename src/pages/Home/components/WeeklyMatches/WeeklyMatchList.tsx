import { MatchData } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";
import MatchCard from "@/pages/Home/components/WeeklyMatches/MatchCard";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function WeeklyMatchList() {
  const { data } = useSuspenseQuery<MatchData[]>({
    queryKey: ["weeklyMatches"],

    queryFn: async () => {
      return await axiosInstance.get("/games/weekly").then((res) => res.data.content);
    },
  });

  return (
    <>
      {data.map((el) => (
        <MatchCard data={el} key={el.gameId} />
      ))}
    </>
  );
}
