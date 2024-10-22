import { MatchDataProps } from "@/common/types/type";
import Barcode from "@/assets/Barcode.svg?react";

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
  return (
    <div
      className={`mb-6 flex w-[380px] flex-col items-start rounded-[10px] ${isReservationComplete === true || isReservationComplete === undefined ? "bg-Accent" : "bg-borders"} px-[31px] py-[33px] drop-shadow-first`}
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
