import { GameHistoryType, PageInfoProps } from "@/common/types/type";
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
          content: GameHistoryType;
          pageInfo: PageInfoProps;
        },
        unknown
      >,
      Error
    >
  >;
  hasNextPage: boolean;
}

export default function useInfiniteScroll({ onLoadMore, hasNextPage }: UseInfiniteScrollProps) {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      onLoadMore();
    } else if (!hasNextPage) {
      alertToast("마지막 자료입니다!", "info", "bottom");
    }
  }, [inView, onLoadMore, hasNextPage]);

  return ref;
}
