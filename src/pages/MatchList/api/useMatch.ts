import { useQueries } from "@tanstack/react-query";
import axiosInstance from "@/common/utils/axiosInstance";
import { getTeamId } from "@/common/utils/getTeamId";
import { MatchType, PageInfoProps } from "@/common/types/matchTypes";

interface MatchParams {
  sport: string;
  selectedTeam: string;
  page: number;
  onlyHomeGames?: boolean;
}

export function useMatch({ sport, selectedTeam, page, onlyHomeGames = false }: MatchParams) {
  const selectedTeamId =
    selectedTeam !== "전체 일정" && selectedTeam !== "예매 가이드"
      ? getTeamId(sport, selectedTeam)
      : undefined;

  const queries = useQueries({
    queries: [
      {
        queryKey: ["all-schedule", sport, page],
        queryFn: async () => {
          const response = await axiosInstance.get<MatchType>("/games/sports", {
            params: { sport, page },
          });
          return response.data;
        },
        enabled: selectedTeam === "전체 일정" || selectedTeam === "예매 가이드",
      },
      {
        queryKey: ["team-schedule", sport, selectedTeamId, page, onlyHomeGames],
        queryFn: async () => {
          if (!selectedTeamId) return { content: [], pageInfo: {} };

          const params: { page: number; onlyHomeGames?: boolean } = { page };
          if (onlyHomeGames) params.onlyHomeGames = true;

          const response = await axiosInstance.get<MatchType>(`/teams/${selectedTeamId}/games`, {
            params,
          });
          return response.data;
        },
        enabled: !!selectedTeamId,
      },
    ],
  });

  const allScheduleData = queries[0]?.data || {
    content: [],
    pageInfo: {} as PageInfoProps,
  };
  const teamScheduleData = queries[1]?.data || {
    content: [],
    pageInfo: {} as PageInfoProps,
  };

  const isAllScheduleLoading = queries[0]?.isLoading || false;
  const isTeamScheduleLoading = queries[1]?.isLoading || false;

  const isAllScheduleError = queries[0]?.isError || false;
  const isTeamScheduleError = queries[1]?.isError || false;

  const allScheduleError = queries[0]?.error;
  const teamScheduleError = queries[1]?.error;

  const isLoading = isAllScheduleLoading || isTeamScheduleLoading;
  const isError = isAllScheduleError || isTeamScheduleError;
  const error = allScheduleError || teamScheduleError;

  return { allScheduleData, teamScheduleData, isLoading, isError, error };
}
