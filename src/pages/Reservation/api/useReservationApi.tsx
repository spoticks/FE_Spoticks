import { useQuery } from "@tanstack/react-query";
import { seatDataProps } from "../type";
import axiosInstance from "@/common/utils/axiosInstance";

export function useReservationApi(reservationId: string, selectedSection: string) {
  return useQuery<seatDataProps>({
    queryKey: ["reservation", reservationId, selectedSection],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/games/${reservationId}?seatPosition=${selectedSection}`,
      );
      return response.data;
    },
  });
}
