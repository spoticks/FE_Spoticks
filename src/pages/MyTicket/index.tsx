import InformationCard from "@/pages/MyTicket/components/InformationCard";
import useMyTicketHistory from "@/pages/MyTicket/api/useMyTicketHistory";
import NoTicketHistory from "@/pages/MyTicket/components/NoTicketHistory";
import React from "react";
import Loading from "@/common/components/atoms/Loading";
import useInfiniteScroll from "@/pages/MyTicket/hooks/useInfiniteScroll";

export default function MyTicket() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useMyTicketHistory();
  const ref = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
  });

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
