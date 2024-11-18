import useAxios from "@/hooks/useAxios";
import { MatchType } from "@/common/types/type";
import { getTeamId } from "@/common/utils/getTeamId";

interface MatchApiParams {
  sport: string;
  selectedTeam: string;
  page: number;
}

export function useMatchApi({ sport, selectedTeam, page }: MatchApiParams) {
  console.log(sport, selectedTeam);
  const selectedTeamId = getTeamId(sport, selectedTeam);
  const url = selectedTeam === "전체 일정" ? `/games/sports` : `/teams/${selectedTeamId}/games`;
  const params = selectedTeam === "전체 일정" ? { sport, page } : undefined;

  return useAxios<MatchType>(["matches", sport, selectedTeam, String(page)], {
    config: {
      url,
      method: "GET",
    },
    params,
  });
}
