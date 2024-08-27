import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "./Error";
import InformationCard from "../components/InformationCard";
import { InformationCardProp } from "../type";

export default function MyReservations() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<InformationCardProp[]>({
    queryKey: ["myReservations"],
    queryFn: async () => {
      const res = await axios("http://localhost:3000/reservations");
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
    return <Error />;
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
