import { useState } from "react";
import { useLocation } from "react-router-dom";
import PayModal from "@/pages/Reservation/components/PayModal";
import { usePreemptSeats } from "../../api/usePreemptSeats";
import { Seat } from "@/common/types/seatTypes";

interface SelectedSeatsSummaryProps {
  selectedSeats: Seat[];
  selectedSection: string;
  gameId?: number;
  seatPrice: number;
}

export default function SelectedSeats({
  selectedSeats,
  selectedSection,
  gameId,
  seatPrice,
}: SelectedSeatsSummaryProps) {
  const location = useLocation();
  const matchData = location.state?.match;
  const seatIds = selectedSeats.map((seat) => seat.id);
  const totalPay = selectedSeats.reduce((total) => total + seatPrice, 0);
  const mySeats = selectedSeats.map((seat: Seat) => {
    return `${selectedSection} ${Math.ceil(seat.id / 10)}열 ${seat.id}번`;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSuccessCallback = () => {
    setIsModalOpen(true);
  };

  const { mutate: handleNextStep, isPending } = usePreemptSeats(
    gameId!,
    seatIds,
    onSuccessCallback,
  );

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center">
        {selectedSeats?.map((seat) => (
          <div
            key={seat.id}
            className="m-1 flex flex-col items-center rounded-md border border-text-tertiary bg-foreground p-1 text-xs"
          >
            <h3>
              {selectedSection} {Math.ceil(seat.id / 10)}열 {seat.id}번
            </h3>
            <h3>{seatPrice}원</h3>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-1 flex flex-col">
          <h3 className="text-[18px] font-bold">총 {selectedSeats.length} 매</h3>
          <h3 className="text-[20px] font-bold">{totalPay}원</h3>
        </div>
        <button
          onClick={() => handleNextStep()}
          disabled={isPending}
          className={`cursor-pointer rounded-[10px] px-5 py-1 text-white ${
            isPending ? "bg-gray-400" : "bg-Accent"
          }`}
        >
          {isPending ? "확인 중..." : "다음 단계"}
        </button>

        {isModalOpen && (
          <PayModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            gameId={gameId}
            mySeats={mySeats}
            matchData={matchData}
            totalPay={totalPay}
            seatIds={seatIds}
          />
        )}
      </div>
    </div>
  );
}
