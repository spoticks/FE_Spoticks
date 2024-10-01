import Loading from "@/common/components/atoms/Loading";
import { InformationCardProp } from "@/common/types/type";
import InformationCard from "@/components/InformationCard";
import ErrorPage from "@/pages/ErrorPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function MyHistory() {
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

  if (isLoading) {
    return (
      <div className="w-full gap-[40px]">
        <Loading />
      </div>
    );
  }
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="flex flex-wrap gap-[40px]">
        {/** InformationCard 혹은 정보 없음을 표시할 것. */}
        {data.length ? (
          data.map((el) => <InformationCard content={el} key={el.gameId} />)
        ) : (
          <span>조회 내역이 없습니다!</span>
        )}
      </div>
    </>
  );
}
