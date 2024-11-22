import InformationCard from "@/pages/MyTicket/components/InformationCard";
import useMyTicketHistory from "@/pages/MyTicket/api/useMyTicketHistory";
import NoTicketHistory from "@/pages/MyTicket/components/NoTicketHistory";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "@/common/components/atoms/Loading";

export default function MyTicket() {
  const { data, fetchNextPage, status, isFetchingNextPage, hasNextPage } = useMyTicketHistory();
  console.log(data);
  const { ref, inView } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  console.log(hasNextPage);
  return (
    <>
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
      {isFetchingNextPage && <Loading />}
      <div className="h-80" ref={ref} />
    </>
  );
}
