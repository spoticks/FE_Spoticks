import isGameDatePast from "@/common/utils/isGameDatePast";
import useReservationDetailQuery from "@/pages/MyTicket/api/useReservationDetailQuery";

function getReservationStatus(reservationStatus: string) {
  return reservationStatus === "COMPLETED" ? true : false;
}

export default function useReservationDetails(reservationId: number) {
  const { data, isSuccess } = useReservationDetailQuery(reservationId);
  const isReservationComplete = getReservationStatus(data.reservationStatus);
  const isGamePassed = isGameDatePast(data.game.gameStartTime);
  return { data, isSuccess, isReservationComplete, isGamePassed };
}
