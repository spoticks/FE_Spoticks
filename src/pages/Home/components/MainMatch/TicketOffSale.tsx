import Warning from "@/assets/warning.svg?react";

export default function TicketOffSale() {
  return (
    <div className="flex items-center gap-4">
      <Warning className="size-20" />
      <p className="font-bold">예매가 종료되었습니다!</p>
    </div>
  );
}
