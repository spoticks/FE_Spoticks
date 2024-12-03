import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface SeatType {
  seatPosition: string;
  seatRow: number;
  seatNum: number;
}

const fetchReservationDetails = async (reservationId: number) => {
  const { data } = await axiosInstance.get(`/reservation/${reservationId}`);
  return data;
};

export default function useReservationDetailQuery(reservationId: number) {
  return useSuspenseQuery({
    queryKey: ["reservationDetail", reservationId],
    queryFn: () => fetchReservationDetails(reservationId),
  });
}
