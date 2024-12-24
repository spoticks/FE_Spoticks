import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/common/utils/axiosInstance";
import { SeatDataProps } from "@/common/types/seatTypes";

export function useReservationQuery(reservationId: string, selectedSection: string) {
  return useQuery<SeatDataProps>({
    queryKey: ["reservation", reservationId, selectedSection],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/games/${reservationId}?seatPosition=${selectedSection}`,
      );
      return response.data;
    },
  });
}
