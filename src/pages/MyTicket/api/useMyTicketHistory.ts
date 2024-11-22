import { GameHistoryType } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function useMyTicketHistory() {
  const location = useLocation().pathname;
  const param = location.includes("/profile/my-tickets/my-reservations") ? "COMPLETE" : "CANCEL";
  const { data } = useSuspenseQuery<GameHistoryType>({
    queryKey: ["myReservations", param],
    queryFn: async () => {
      const res = await axiosInstance.get(`reservation?status=${param}&page=1`);
      return res.data.content;
    },
  });
  return {
    data,
  };
}
