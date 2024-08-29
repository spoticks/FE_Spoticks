import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Modal from "react-modal";

export default function CancellationConfirmModal({
  isOpen,
  onClose,
  reservationId,
}: {
  isOpen: boolean;
  onClose: () => void;
  reservationId: number;
}) {
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="shadow-second fixed left-1/2 top-1/2 w-[394px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-foreground p-[40px] pb-[48px]"
    >
      <section className="flex flex-col items-center">
        <div className="mb-4 text-[20px] font-semibold">티켓을 취소하시겠습니까?</div>
        <p className="mb-8 text-[14px] text-text-tertiary">{`티켓은 경기시작 1시간 전까지 취소 가능하며, 취소내역은 마이페이지 > 예매취소 에서 확인 가능합니다.`}</p>
        <div className="flex w-full justify-around">
          <button className="text-[14px] font-semibold" type="button" onClick={onClose}>
            취소
          </button>
          <button
            className="text-[14px] font-semibold text-Accent"
            type="button"
            onClick={onCancelConfirmClick}
          >
            확인
          </button>
        </div>
      </section>
    </Modal>
  );
}
