import InformationCard from "@/pages/MyTicket/components/InformationCard";
import useMyTicketHistory from "@/pages/MyTicket/api/useMyTicketHistory";
import NoTicketHistory from "@/pages/MyTicket/components/NoTicketHistory";

export default function MyTicket() {
  const { data } = useMyTicketHistory();
  return (
    <section className={`${data?.length ? "grid grid-cols-3 gap-4" : "flex flex-1"}`}>
      {/** InformationCard 혹은 정보 없음을 표시할 것. */}
      {data.length ? (
        data.map((el) => <InformationCard content={el} key={el.reservationId} />)
      ) : (
        <NoTicketHistory />
      )}
    </section>
  );
}
