import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useTicketCancellationMutation(onClose: () => void, reservationId: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (reservationId: number) => {
      const request1 = axios.delete(`http://localhost:3000/reservation/${reservationId}`);
      const request2 = axios.delete(`http://localhost:3000/reservations/${reservationId}`);
      return Promise.all([request1, request2]);
    },
    onSuccess: () => {
      console.log("성공함!");
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
      onClose();
    },
    onError: (error) => {
      console.log(error, "때문에 실패함");
    },
  });
  function onCancelConfirmClick() {
    // delete 요청 보내기
    mutation.mutate(reservationId);
  }
  return onCancelConfirmClick;
}
