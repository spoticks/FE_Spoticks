import CalendarDelete from "@/assets/calendar-delete.svg?react";
import { useLocation } from "react-router-dom";

export default function NoTicketHistory() {
  const { pathname } = useLocation();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <CalendarDelete className="" />
      <p className="font-medium">
        {pathname.includes("my-reservations") ? "예매" : "취소"} 내역이 존재하지 않습니다!
      </p>
    </div>
  );
}
