import axiosInstance from "@/common/utils/axiosInstance";
import { MainMatchType } from "@/pages/Home/components/MainMatch";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useMainMatch() {
  return useSuspenseQuery<MainMatchType>({
    queryKey: ["mainMatch"],
    queryFn: async () => {
      return await axiosInstance.get("/games/mostPopular").then((res) => res.data);
    },
  });
}
