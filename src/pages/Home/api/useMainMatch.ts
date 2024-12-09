import { MainMatchType } from "@/common/types/matchTypes";
import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useMainMatch() {
  return useSuspenseQuery<MainMatchType>({
    queryKey: ["mainMatch"],
    queryFn: async () => {
      return await axiosInstance.get("/games/mostPopularasd").then((res) => res.data);
    },
  });
}
