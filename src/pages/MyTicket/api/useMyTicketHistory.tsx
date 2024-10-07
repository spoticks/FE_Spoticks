import { InformationCardProp } from "@/common/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
      // 추후에 reservationStatus를 status로 바꿀 것.
      const res = await axios(`http://localhost:3000/reservations/?reservationStatus=${param}`);
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    isError,
  };
}
