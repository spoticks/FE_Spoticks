import { AdminMatchType, PageInfoProps } from "@/common/types/matchTypes";
import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export default function useAdminData(selectedSport: string = "All") {
  return useSuspenseInfiniteQuery<{
    content: AdminMatchType[];
    pageInfo: PageInfoProps;
  }>({
    queryKey: ["matches", selectedSport],
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get(
        `/admin/games?${selectedSport === "All" ? `` : `sport=${selectedSport}`}&page=${pageParam}`,
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.totalPages > lastPage.pageInfo.page
        ? lastPage.pageInfo.page + 1
        : null;
    },
  });
}
