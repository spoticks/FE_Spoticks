import axiosInstance from "@/common/utils/axiosInstance";
import { AxiosError } from "axios";
import alertToast from "@/common/utils/alertToast";
import { useMutation } from "@tanstack/react-query";

interface PayProps {
  gameId: number;
  seatIds: number[];
  totalPrice: number;
}

const payReservation = async ({ gameId, seatIds, totalPrice }: PayProps) => {
  const { data } = await axiosInstance.post(`/games/${gameId}/reserve`, {
    seatIds,
    totalPrice,
  });
  return data;
};

export const usePayMutation = (onSuccessCallback: () => void) => {
  return useMutation<void, AxiosError, PayProps>({
    mutationFn: payReservation,
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (error) => {
      console.error("Reservation failed:", error);
      if (error.response?.status === 403) {
        alertToast("해당 좌석은 이미 선점되었습니다.", "error");
      } else if (error.response?.status === 400) {
        alertToast("결제가 현재 불가능합니다. 다시 시도해주세요.", "error");
      } else {
        alertToast("결제 중 오류가 발생했습니다. 다시 시도해주세요.", "error");
      }
    },
  });
};
