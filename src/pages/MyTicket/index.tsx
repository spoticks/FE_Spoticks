import Loading from "@/common/components/atoms/Loading";
import InformationCard from "@/components/InformationCard";
import ErrorPage from "@/pages/ErrorPage";
import useMyTicketHistory from "@/pages/MyTicket/api/useMyTicketHistory";

export default function MyTicket() {
  const { data, isLoading, isError } = useMyTicketHistory();

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
