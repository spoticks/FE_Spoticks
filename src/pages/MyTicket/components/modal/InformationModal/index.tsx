import Modal from "react-modal";
import Button from "@/common/components/atoms/Button";
import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import CancellationConfirmModal from "@/pages/MyTicket/components/modal/CancellationConfirmModal";
import useHistoryModal from "@/hooks/useHistoryModal";
import DetailedTicket from "@/common/components/organisms/DetailedTicket";
import ModalInfo from "@/common/components/organisms/ModalInfo";
import ModalHeader from "@/common/components/molecules/ModalHeader";
import useReservationDetails from "@/pages/MyTicket/api/useReservationDetails";

interface InformationModal {
  isOpen: boolean;
  onClose: () => void;
  reservationId: number;
}

export default function InformationModal({ isOpen, onClose, reservationId }: InformationModal) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useHistoryModal();
  const { data, error, isLoading, isSuccess } = useReservationDetails(reservationId, isOpen);

  const isReservationComplete = data?.reservationStatus === "COMPLETE" ? true : false;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-88 fixed left-1/2 top-1/2 flex min-h-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[30px] border border-borders bg-foreground p-[40px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30"
    >
      <ModalHeader onCloseButtonClick={onClose} content="예매 정보" />
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {isSuccess && data && (
        <div className="mx-4 flex flex-col items-center">
          <DetailedTicket data={data} isReservationComplete={isReservationComplete} />
          <section className="flex flex-col gap-4">
            <ModalInfo
              firstInfoPart={{
                heading: "예매일",
                content: data.createDate.split("T")[0].split("-").join("."),
              }}
              secondInfoPart={{ heading: "예매자", content: data.memberName }}
            />
            <ModalInfo
              firstInfoPart={{
                heading: "티켓상태",
                content: isReservationComplete ? "예매완료" : "예매취소",
              }}
              secondInfoPart={{ heading: "결제금액", content: data.totalPrice }}
            />
            <ModalInfo
              firstInfoPart={{
                heading: "좌석",
                content: data.seat.reduce((acc, seat, index) => {
                  return (
                    acc +
                    `${seat.seatPosition}석, ${seat.seatRow}, ${seat.seatNumber} ${index < data.seat.length - 1 ? " | " : ""}`
                  );
                }, ""),
                isSeat: true,
              }}
              secondInfoPart={{ heading: "매수", content: `${data.seat.length} 매` }}
            />
            <Button
              content={isReservationComplete ? "티켓 취소" : "닫기"}
              onClick={isReservationComplete ? handleModalOpen : onClose}
            />
          </section>
          <CancellationConfirmModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            reservationId={reservationId}
          />
        </div>
      )}
    </Modal>
  );
}
