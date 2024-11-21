import InformationCard from "@/pages/MyTicket/components/InformationCard";
import useMyTicketHistory from "@/pages/MyTicket/api/useMyTicketHistory";

export default function MyTicket() {
  const { data } = useMyTicketHistory();

  return (
    <section className="grid grid-cols-3 flex-wrap gap-4">
      {/** InformationCard 혹은 정보 없음을 표시할 것. */}
      {data.length ? (
        data.map((el) => <InformationCard content={el} key={el.gameId} />)
      ) : (
        <span>조회 내역이 없습니다!</span>
      )}
    </section>
  );
}
