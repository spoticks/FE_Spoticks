import { useQuery } from "@tanstack/react-query";
import { MyTeamType } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";

async function fetchMyTeam() {
  const { data } = await axiosInstance.get("/myteam");
  return data;
}
export default function useGetMyTeam() {
  const { data, isLoading, isError } = useQuery<MyTeamType[]>({
    queryKey: ["myTeam"],
    queryFn: fetchMyTeam,
  });

  return { data, isLoading, isError };
}
