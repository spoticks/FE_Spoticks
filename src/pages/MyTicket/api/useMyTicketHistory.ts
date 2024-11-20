import { InformationCardProp } from "@/common/types/type";
import axiosInstance from "@/common/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function useMyTicketHistory() {
  const location = useLocation().pathname;
  const param = location === "/profile/my-tickets/my-reservations" ? "COMPLETE" : "CANCEL";
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<InformationCardProp[]>({
    queryKey: ["myReservations", param],
    queryFn: async () => {
      const res = await axiosInstance.get(`reservation?status=${param}&page=1`);
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    isError,
  };
}
