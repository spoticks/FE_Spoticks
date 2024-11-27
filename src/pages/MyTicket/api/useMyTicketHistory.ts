import { GameHistoryType, PageInfoProps } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function useMyTicketHistory() {
  const location = useLocation().pathname;
  const param = location.includes("/profile/my-tickets/my-reservations") ? "COMPLETE" : "CANCEL";

  return useSuspenseInfiniteQuery<{ content: GameHistoryType; pageInfo: PageInfoProps }>({
    queryKey: ["myReservations", param],
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get(`reservation?status=${param}&page=${pageParam}`);
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.totalPages > lastPage.pageInfo.page
        ? lastPage.pageInfo.page + 1
        : null;
    },
  });
}
