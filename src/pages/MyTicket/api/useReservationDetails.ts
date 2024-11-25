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
  const { data } = await axiosInstance.get(`/reservation/${reservationId}`);
  return data;
};

function getReservationStatus(reservationStatus: string) {
  return reservationStatus === "COMPLETED" ? true : false;
}

function isGameDatePast(gameStartTime: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gameDate = new Date(gameStartTime);
  gameDate.setHours(0, 0, 0, 0);
  // 게임 시작일 <= 오늘
  return gameDate <= today;
}
export default function useReservationDetails(reservationId: number) {
  const { data, isSuccess } = useSuspenseQuery<GameReservation>({
    queryKey: ["reservationDetail", reservationId],
    queryFn: () => fetchReservationDetails(reservationId),
  });
  const isReservationComplete = getReservationStatus(data.reservationStatus);
  const gamePassed = isGameDatePast(data.game.gameStartTime);
  return { data, isSuccess, isReservationComplete, gamePassed };
}
