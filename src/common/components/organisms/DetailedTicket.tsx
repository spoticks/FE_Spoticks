import { InformationCardProp, SeatType } from "@/common/types/matchTypes";
import Barcode from "@/assets/Barcode.svg?react";
import extractDateData from "@/common/utils/extractDateData";

interface DetailedTicketProps {
  game: InformationCardProp;
  isReservationComplete?: boolean;
  mySeats?: SeatType[] | string[];
  totalPay?: number;
}

export default function DetailedTicket({
  game,
  isReservationComplete,
  mySeats,
  totalPay,
}: DetailedTicketProps) {
  const { date, hours, minutes } = extractDateData(game.gameStartTime);
  return (
    <div
      className={`mb-6 flex w-full flex-col items-start rounded-[10px] ${isReservationComplete === true || isReservationComplete === undefined ? "bg-Accent" : "bg-borders"} px-5 py-6 drop-shadow-first`}
    >
      <p className="w-full text-[20px] font-bold">{game.homeTeamName}</p>
      <p className="w-full text-[20px] font-bold">vs</p>
      <p className="w-full text-[20px] font-bold">{game.awayTeamName}</p>
      <hr className="border-1 my-1 w-full border-text-secondary" />
      <div className="mb-2 flex flex-col">
        <div className="text-[14px] text-text-secondary">{game.stadiumName}</div>
        <div className="text-[14px]">
          {date} {hours}:{minutes}
        </div>
      </div>
      {!isReservationComplete ? (
        <div className="w-full font-bold">
          총 {mySeats?.length} 매 {totalPay}원
        </div>
      ) : (
        <Barcode className="h-[30px]" />
      )}
    </div>
  );
}
