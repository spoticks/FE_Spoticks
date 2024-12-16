import { AdminMatchType, GameHistoryType, PageInfoProps } from "@/common/types/matchTypes";
import alertToast from "@/common/utils/alertToast";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  InfiniteData,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollProps {
  onLoadMore: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        {
          content: GameHistoryType | AdminMatchType[];
          pageInfo: PageInfoProps;
        },
        unknown
      >,
      Error
    >
  >;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  totalElements: number;
}

export default function useInfiniteScroll({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  totalElements,
}: UseInfiniteScrollProps) {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (totalElements) {
      if (inView && hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      } else if (!hasNextPage) {
        alertToast("마지막 자료입니다!", "info", "bottom");
      }
    }
  }, [inView, onLoadMore, hasNextPage, isFetchingNextPage, totalElements]);

  return ref;
}
