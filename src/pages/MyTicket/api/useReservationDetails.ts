import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Seat {
  seatPosition: string;
  seatRow: string;
  seatNumber: string;
}

interface GameReservation {
  homeTeamName: string;
  awayTeamName: string;
  gameStartTime: string;
  stadiumName: string;
  reservationStatus: string;
  totalPrice: string;
  createDate: string;
  memberName: string;
  seat: Seat[];
  gameId: number;
  id: string;
  sportName: string;
  timeOffSale: string;
  timeOnSale: string;
}

const fetchReservationDetails = async (reservationId: number) => {
  const { data } = await axios.get(`http://localhost:3000/reservation/${reservationId}`);
  return data;
};

export default function useReservationDetails(reservationId: number, isOpen: boolean) {
  return useQuery<GameReservation>({
    queryKey: ["reservationDetail", reservationId],
    queryFn: () => fetchReservationDetails(reservationId),
    enabled: isOpen,
  });
}
