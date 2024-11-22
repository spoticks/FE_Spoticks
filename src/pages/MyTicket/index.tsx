import InformationCard from "@/pages/MyTicket/components/InformationCard";
import useMyTicketHistory from "@/pages/MyTicket/api/useMyTicketHistory";
import NoTicketHistory from "@/pages/MyTicket/components/NoTicketHistory";
import React from "react";

export default function MyTicket() {
  const { data, fetchNextPage } = useMyTicketHistory();
  console.log("data.pages[0].content = ", data?.pages[0].content);

  return (
    <section className={`${data ? "grid grid-cols-3 gap-4" : "flex flex-1"}`}>
      {data ? (
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content.map((item) => (
              <InformationCard content={item} key={item.reservationId} />
            ))}
          </React.Fragment>
        ))
      ) : (
        <NoTicketHistory />
      )}
    </section>
  );
}
