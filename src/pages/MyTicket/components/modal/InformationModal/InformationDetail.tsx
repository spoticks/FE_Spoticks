import BasicButton from "@/common/components/atoms/button/BasicButton";
import DetailedTicket from "@/common/components/organisms/DetailedTicket";
import ModalInfo from "@/common/components/organisms/ModalInfo";
import useHistoryModal from "@/hooks/useHistoryModal";
import useReservationDetails from "@/pages/MyTicket/hooks/useReservationDetails";
import CancellationConfirmModal from "@/pages/MyTicket/components/modal/CancellationConfirmModal";
interface InformationModal {
  onClose: () => void;
  reservationId: number;
}
export default function InformationDetail({ onClose, reservationId }: InformationModal) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useHistoryModal();
  const { data, isSuccess, isReservationComplete, isGamePassed } =
    useReservationDetails(reservationId);

  return (
    <>
      {isSuccess && data && (
        <div className="mx-4 flex w-full flex-col items-center">
          <DetailedTicket
            game={data.game}
            isReservationComplete={isReservationComplete}
            mySeats={data.seats}
            totalPay={data.totalPrice}
          />
          <section className="flex w-full flex-col gap-4">
            <ModalInfo
              firstInfoPart={{
                heading: "예매일",
                content: data.createdAt.split("T")[0].split("-").join("."),
              }}
              secondInfoPart={{ heading: "예매자", content: data.memberName }}
            />
            <ModalInfo
              firstInfoPart={{
                heading: "티켓상태",
                content: isReservationComplete ? "예매완료" : "예매취소",
              }}
              secondInfoPart={{ heading: "결제금액", content: data.totalPrice + "" }}
            />
            <ModalInfo
              firstInfoPart={{
                heading: "좌석",
                content: data.seats.reduce((acc, seat, index) => {
                  return (
                    acc +
                    `${seat.seatPosition} ${seat.seatRow}열 ${seat.seatNum}번 ${index < data.seats.length - 1 ? ", " : ""}`
                  );
                }, ""),
                isSeat: true,
              }}
              secondInfoPart={{ heading: "매수", content: `${data.seats.length} 매` }}
            />
            <BasicButton
              content={isReservationComplete ? (isGamePassed ? "취소 불가" : "티켓 취소") : "닫기"}
              onClick={isReservationComplete ? handleModalOpen : onClose}
              style={
                isReservationComplete
                  ? "btn-red"
                  : "w-full rounded-[10px] bg-borders px-3 py-2 text-center text-[16px] hover:bg-text-tertiary disabled:cursor-not-allowed disabled:bg-text-tertiary"
              }
              disabled={isGamePassed && isReservationComplete}
            />
          </section>
          <CancellationConfirmModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            reservationId={reservationId}
          />
        </div>
      )}
    </>
  );
}
