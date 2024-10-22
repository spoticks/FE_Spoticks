import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "@/common/components/atoms/Button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import CancellationConfirmModal from "@/pages/MyTicket/components/modal/CancellationConfirmModal";
import useHistoryModal from "@/hooks/useHistoryModal";
import InfoPart from "@/pages/MyTicket/components/modal/InformationModal/InfoPart";
import DetailedTicket from "@/common/components/molecules/DetailedTicket";

interface InformationModal {
  isOpen: boolean;
  onClose: () => void;
  reservationId: number;
}

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

export default function InformationModal({ isOpen, onClose, reservationId }: InformationModal) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useHistoryModal();
  const { data, error, isLoading, isSuccess } = useQuery<GameReservation>({
    queryKey: ["reservationDetail", reservationId],
    queryFn: () => fetchReservationDetails(reservationId),
    enabled: isOpen,
  });

  const isReservationComplete = data?.reservationStatus === "COMPLETE" ? true : false;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed left-1/2 top-1/2 flex min-h-[771px] w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[30px] border border-borders bg-foreground p-[40px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30"
    >
      <div className="mb-5 flex w-full justify-between border-b border-b-borders pb-1">
        <h1 className="font-semibold">예매 정보</h1>
        <button onClick={onClose}>
          <IoIosCloseCircle className="size-5 text-borders transition-all duration-150 hover:text-black" />
        </button>
      </div>
      <section>
        {isLoading && <Loading />}
        {error && <ErrorPage />}
        {isSuccess && data && (
          <div className="mx-4 flex flex-col items-center">
            <DetailedTicket data={data} isReservationComplete={isReservationComplete} />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <InfoPart
                  heading="예매일"
                  content={data.createDate.split("T")[0].split("-").join(".")}
                />
                <InfoPart heading="예매자" content={data.memberName} isRight />
              </div>
              <div className="flex justify-between">
                <InfoPart
                  heading="티켓상태"
                  content={isReservationComplete ? "예매완료" : "예매취소"}
                />
                <InfoPart heading="결제금액" content={data.totalPrice} isRight />
              </div>
              <div className="flex justify-between">
                <InfoPart
                  heading="좌석"
                  content={data.seat.reduce((acc, seat, index) => {
                    return (
                      acc +
                      `${seat.seatPosition}석, ${seat.seatRow}, ${seat.seatNumber} ${index < data.seat.length - 1 ? " | " : ""}`
                    );
                  }, "")}
                  isSeat
                />
                <InfoPart heading="매수" content={`${data.seat.length} 매`} isRight />
              </div>
              <Button
                content={isReservationComplete ? "티켓 취소" : "닫기"}
                onClick={isReservationComplete ? handleModalOpen : onClose}
              />
              <CancellationConfirmModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                reservationId={reservationId}
              />
            </div>
          </div>
        )}
      </section>
    </Modal>
  );
}
