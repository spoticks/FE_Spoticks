import { MatchData } from "@/common/types/matchTypes";
import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useWeeklyMatchQuery() {
  return useSuspenseQuery<MatchData[]>({
    queryKey: ["weeklyMatches"],

    queryFn: async () => {
      return await axiosInstance.get("/games/weekly").then((res) => res.data.content);
    },
  });
}
