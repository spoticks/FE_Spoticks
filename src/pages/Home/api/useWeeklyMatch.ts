import { MatchData } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useWeeklyMatch() {
  return useSuspenseQuery<MatchData[]>({
    queryKey: ["weeklyMatches"],

    queryFn: async () => {
      return await axiosInstance.get("/games/weekly").then((res) => res.data.content);
    },
  });
}
