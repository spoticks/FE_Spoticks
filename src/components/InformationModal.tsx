import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import barcode from "../assets/Barcode.svg";
import Button from "./Button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Error from "../pages/Error";
import { useState } from "react";
import CancellationConfirmModal from "./CancellationConfirmModal";

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
}
const fetchReservationDetails = async (reservationId: number) => {
  const { data } = await axios.get(`http://localhost:3000/reservation/${reservationId}`);
  return data;
};

export default function InformationModal({ isOpen, onClose, reservationId }: InformationModal) {
  const { data, error, isLoading, isSuccess } = useQuery<GameReservation>({
    queryKey: ["reservationDetail", reservationId],
    queryFn: () => fetchReservationDetails(reservationId),
    enabled: isOpen,
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleCancelButton() {
    setIsConfirmOpen(true);
  }
  function onCloseConfirmModal() {
    setIsConfirmOpen(false);
  }
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
        {error && <Error />}
        {isSuccess && data && (
          <>
            <div
              className={`mb-6 flex w-[380px] flex-col items-start rounded-[10px] ${isReservationComplete ? "bg-Accent" : "bg-borders"} px-[31px] py-[33px] drop-shadow-first`}
            >
              <h2 className="mb-4 w-full border-b-2 border-b-text-secondary pb-2 text-[20px] font-bold">
                {data.homeTeamName} vs {data.awayTeamName}
              </h2>
              <div className="mb-2 flex flex-col">
                <div className="text-[14px] text-text-secondary">{data.stadiumName}</div>
                <div className="text-[14px]">
                  {data.gameStartTime.split("T")[0].split("-").join(":")}{" "}
                  {data.gameStartTime.split("T")[1].slice(0, 5)}
                </div>
              </div>
              <img src={barcode} className="h-[30px]" />
            </div>
            <div className="flex w-[380px] flex-col gap-4">
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
                onClick={isReservationComplete ? handleCancelButton : onClose}
              />
              <CancellationConfirmModal
                isOpen={isConfirmOpen}
                onClose={onCloseConfirmModal}
                reservationId={reservationId}
              />
            </div>
          </>
        )}
      </section>
    </Modal>
  );
}

function InfoPart({
  heading,
  content,
  isRight,
  isSeat,
}: {
  heading: string;
  content: string;
  isRight?: true;
  isSeat?: true;
}) {
  return (
    <div className={`flex flex-col ${isSeat && "w-3/4"} ${isRight && "items-end"}`}>
      <div className="text-[16px] text-text-secondary">{heading}</div>
      <div className={`text-[16px] ${isSeat && "break-keep"}`}>{content}</div>
    </div>
  );
}
