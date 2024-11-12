import useAxios from "@/hooks/useAxios";
import { MatchType } from "@/common/types/type";
import { getTeamId } from "@/common/utils/getTeamId";

interface MatchApiParams {
  sport: string;
  selectedTeam: string;
}

export function useMatchApi({ sport, selectedTeam }: MatchApiParams) {
  console.log(sport, selectedTeam);
  const selectedTeamId = getTeamId(sport, selectedTeam);
  const url = selectedTeam === "전체 일정" ? `/admin/games` : `/teams/${selectedTeamId}/games`;
  const params = selectedTeam === "전체 일정" ? { sport } : undefined;

  return useAxios<MatchType>(["matches", sport, selectedTeam], {
    config: {
      url,
      method: "GET",
    },
    params,
  });
}
