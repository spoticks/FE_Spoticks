import axiosInstance from "@/common/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetMemberInfo() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["memberInfo"],
    queryFn: () => axiosInstance.get(`/members/me`).then((res) => res.data),
  });

  return { isLoading, data, isError };
}
