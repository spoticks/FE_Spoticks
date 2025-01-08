import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/common/utils/axiosInstance";
import { MyTeamType } from "@/common/types/type";

async function fetchMyTeam() {
  const { data } = await axiosInstance.get("/my-team");
  return data;
}
export default function useMyTeamQuery(isEnabled?: boolean) {
  return useQuery<MyTeamType[]>({
    queryKey: ["myTeam"],
    queryFn: fetchMyTeam,
    enabled: !!isEnabled,
  });
}
