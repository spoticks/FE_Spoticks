import { MatchDataProps } from "@/common/types/type";
import Barcode from "@/assets/Barcode.svg?react";
import extractDateAndTime from "@/common/utils/extractDateAndTime";

interface DetailedTicketProps {
  data: MatchDataProps;
  isReservationComplete?: boolean;
  mySeats?: string[];
  totalPay?: string;
}

export default function DetailedTicket({
  data,
  isReservationComplete,
  mySeats,
  totalPay,
}: DetailedTicketProps) {
  const { date, hours, minutes } = extractDateAndTime(data.gameStartTime);
  return (
    <div
      className={`mb-6 flex w-full flex-col items-start rounded-[10px] ${isReservationComplete === true || isReservationComplete === undefined ? "bg-Accent" : "bg-borders"} px-5 py-6 drop-shadow-first`}
    >
      <h2 className="mb-4 w-full border-b-2 border-b-text-secondary pb-2 text-[20px] font-bold">
        {data.homeTeamName} vs {data.awayTeamName}
      </h2>
      <div className="mb-2 flex flex-col">
        <div className="text-[14px] text-text-secondary">{data.stadiumName}</div>
        <div className="text-[14px]">
          {date} {hours}:{minutes}
        </div>
      </div>
      {totalPay && mySeats ? (
        <div className="flex w-full justify-end font-bold">
          총 {mySeats.length} 매 {totalPay}원
        </div>
      ) : (
        <Barcode className="h-[30px]" />
      )}
    </div>
  );
}
