import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/common/utils/axiosInstance";

interface StadiumApiParams {
  teamId: number | null;
}

export interface StadiumType {
  id: number;
  stadiumName: string;
  stadiumType: string;
  latitude: number;
  longitude: number;
}

export function useStadiumApi({ teamId }: StadiumApiParams) {
  const url = `/teams/${teamId}/stadium`;

  const { data, error, isLoading } = useQuery({
    queryKey: ["stadium", teamId, url],
    queryFn: async () => {
      const response = await axiosInstance.get<StadiumType>(url);
      return response.data;
    },
    enabled: !!teamId,
  });

  return { data, error, isLoading };
}

export default useStadiumApi;
