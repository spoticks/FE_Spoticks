import { useState } from "react";
import { Seat } from "../../type";
import ModalPortal from "../Modal/Portal";
import PayModal from "../PayModal";
import { useLocation } from "react-router-dom";

interface SelectedSeatsSummaryProps {
  selectedSeats: Seat[];
  selectedSection: string;
  gameId: number;
}

export default function SelectedSeats({
  selectedSeats,
  selectedSection,
  gameId,
}: SelectedSeatsSummaryProps) {
  const location = useLocation();
  const matchData = location.state?.match;

  const [isModalOpen, setIsModalOpen] = useState(false);
  let mySeats = [];
  const totalPay = selectedSeats
    .reduce((total, seat) => total + Number(seat.price), 0)
    .toLocaleString();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const seatMap: string[] = selectedSeats.map((seat: Seat) => {
    return `${selectedSection} ${Math.ceil(seat.id / 10)}열 ${seat.id}번`;
  });
  mySeats = seatMap;

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center">
        {selectedSeats?.map((seat) => (
          <div
            key={seat.id}
            className="m-1 flex flex-col items-center rounded-md border border-text-tertiary bg-foreground p-1 text-xs"
          >
            <div>
              {selectedSection} {Math.ceil(seat.id / 10)}열 {seat.id}번
            </div>
            <div>{seat.price}원</div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-1 flex flex-col">
          <div className="text-[18px] font-bold">총 {selectedSeats.length} 매</div>
          <div className="text-[20px] font-bold">{totalPay}원</div>
        </div>
        <button
          onClick={handleOpenModal}
          className="cursor-pointer rounded-[10px] bg-Accent px-5 py-1 text-white"
        >
          다음 단계
        </button>
        {isModalOpen && (
          <ModalPortal>
            <PayModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              gameId={gameId}
              mySeats={mySeats}
              matchData={matchData}
              totalPay={totalPay}
            />
          </ModalPortal>
        )}
      </div>
    </div>
  );
}
