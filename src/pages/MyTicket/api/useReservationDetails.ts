import { InformationCardProp } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface SeatType {
  seatPosition: string;
  seatRow: number;
  seatNum: number;
}

interface GameReservation {
  createdAt: string;
  memberName: string;
  reservationStatus: "CANCELED" | "COMPLETED";
  seats: SeatType[];
  totalPrice: number;
  game: InformationCardProp;
}

const fetchReservationDetails = async (reservationId: number) => {
  console.log(reservationId);
  const { data } = await axiosInstance.get(`/reservation/${reservationId}`);
  return data;
};

export default function useReservationDetails(reservationId: number) {
  return useSuspenseQuery<GameReservation>({
    queryKey: ["reservationDetail", reservationId],
    queryFn: () => fetchReservationDetails(reservationId),
  });
}
