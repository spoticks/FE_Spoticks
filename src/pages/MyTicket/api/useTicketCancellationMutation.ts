import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useTicketCancellationMutation(onClose: () => void, reservationId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (reservationId: number) => {
      await axiosInstance.delete(`reservation/${reservationId}`);
    },
    onSuccess: () => {
      alertToast("예약을 취소했습니다!", "success");
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
      navigate("/profile/my-tickets/my-reservations");
      onClose();
    },
    onError: (error) => {
      alertToast("취소에 실패했습니다!", "error");
    },
  });
  function onCancelConfirmClick() {
    // delete 요청 보내기
    mutation.mutate(reservationId);
  }
  return onCancelConfirmClick;
}
