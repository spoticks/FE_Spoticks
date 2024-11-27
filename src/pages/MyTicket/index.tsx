import InformationCard from "@/pages/MyTicket/components/InformationCard";
import useMyTicketHistory from "@/pages/MyTicket/api/useMyTicketHistory";
import NoTicketHistory from "@/pages/MyTicket/components/NoTicketHistory";
import React from "react";
import Loading from "@/common/components/atoms/Loading";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function MyTicket() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useMyTicketHistory();
  const totalElements = data.pages[0].pageInfo.totalElements;
  const ref = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalElements,
  });
  return (
    <>
      <section className={`${totalElements ? "grid grid-cols-3 gap-4" : "flex flex-1"}`}>
        {totalElements ? (
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
      {totalElements ? <div className="h-40" ref={ref} /> : null}
    </>
  );
}
