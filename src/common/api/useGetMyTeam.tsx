import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyTeamType } from "@/common/types/type";

async function fetchMyTeam() {
  const { data } = await axios.get("http://localhost:3000/myteam/");
  return data;
}
export default function useGetMyTeam() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<MyTeamType[]>({
    queryKey: ["myTeam"],
    queryFn: fetchMyTeam,
  });

  return { data, isLoading, isError };
}
