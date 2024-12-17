import { GameReservationType } from "@/common/types/matchTypes";
import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

const fetchReservationDetails = async (reservationId: number) => {
  const { data } = await axiosInstance.get(`/reservation/${reservationId}`);
  return data;
};

export default function useReservationDetailQuery(reservationId: number) {
  return useSuspenseQuery<GameReservationType>({
    queryKey: ["reservationDetail", reservationId],
    queryFn: () => fetchReservationDetails(reservationId),
  });
}
