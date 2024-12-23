import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const preemptSeats = async (gameId: number, seatIds: number[]) => {
  if (!gameId) {
    throw new Error("Game ID가 필요합니다.");
  }

  const response = await axiosInstance.post(`/games/${gameId}/preempt`, {
    seatIds,
  });

  return response.data;
};

export const usePreemptSeats = (
  gameId: number,
  seatIds: number[],
  onSuccessCallback: () => void,
) => {
  return useMutation<void, AxiosError>({
    mutationFn: () => preemptSeats(gameId, seatIds),
    onSuccess: () => {
      onSuccessCallback();
      alertToast("좌석이 성공적으로 선점되었습니다.", "success");
    },
    onError: (error) => {
      console.error("Reservation failed:", error);
      if (error.response?.status === 403) {
        alertToast("해당 좌석이 이미 선점되었습니다.", "error");
      } else {
        alertToast("좌석 선점에 실패했습니다. 다시 시도해주세요.", "error");
      }
    },
  });
};
