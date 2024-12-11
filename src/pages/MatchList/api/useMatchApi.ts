import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/common/utils/axiosInstance";
import { getTeamId } from "@/common/utils/getTeamId";
import { MatchType } from "@/common/types/matchTypes";

interface MatchApiParams {
  sport: string;
  selectedTeam: string;
  page: number;
}

export function useMatchApi({ sport, selectedTeam, page }: MatchApiParams) {
  const selectedTeamId = getTeamId(sport, selectedTeam);
  const url = selectedTeam === "전체 일정" ? `/games/sports` : `/teams/${selectedTeamId}/games`;
  const params = selectedTeam === "전체 일정" ? { sport, page } : { page };

  const { data, error, isLoading } = useQuery({
    queryKey: ["matches", sport, selectedTeam, page, url, params],
    queryFn: async () => {
      const response = await axiosInstance.get<MatchType>(url, { params });
      return response.data;
    },
    // {
    //   keepPreviousData: true,
    // },
  });

  return { data, error, isLoading };
}
