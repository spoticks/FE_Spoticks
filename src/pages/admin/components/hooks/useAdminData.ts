import { MainMatchType, PageInfoProps } from "@/common/types/matchTypes";
import axiosInstance from "@/common/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useAdminData(selectedSport: string, currentPage: number) {
  return useQuery<{
    content: MainMatchType[];
    pageInfo: PageInfoProps;
  }>({
    queryKey: ["matches", selectedSport, currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/admin/games?${selectedSport === "All" ? `` : `sport=${selectedSport}`}&page=${currentPage}`,
      );
      return res.data;
    },
  });
}
