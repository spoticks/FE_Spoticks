import { useSuspenseQuery } from "@tanstack/react-query";
import { MyTeamType } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";

async function fetchMyTeam() {
  const { data } = await axiosInstance.get("/myteam");
  return data;
}
export default function useMyTeamQuery() {
  return useSuspenseQuery<MyTeamType[]>({
    queryKey: ["myTeam"],
    queryFn: fetchMyTeam,
  });
}
