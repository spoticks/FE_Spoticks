import useTicketCancellationMutation from "@/pages/MyTicket/api/useTicketCancellationMutation";
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
  const onCancelConfirmClick = useTicketCancellationMutation(onClose, reservationId);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed left-1/2 top-1/2 w-[394px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-foreground p-[40px] pb-[48px] shadow-second"
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
