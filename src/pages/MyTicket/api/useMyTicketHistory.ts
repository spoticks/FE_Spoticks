import { GameHistoryType, PageInfoProps } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function useMyTicketHistory() {
  const location = useLocation().pathname;
  const param = location.includes("/profile/my-tickets/my-reservations") ? "COMPLETE" : "CANCEL";

  return useInfiniteQuery<{ content: GameHistoryType; pageInfo: PageInfoProps }>({
    queryKey: ["myReservations", param],
    queryFn: async () => {
      const res = await axiosInstance.get(`reservation?status=${param}&page=1`);
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pageInfo.page + 1,
  });
}
